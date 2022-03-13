class SheetService {
  constructor(sheet) {
    this.sheet = sheet;
    this._startRow = 3;
  }

  getSingleValue(row, col) {
    return this.sheet.getRange(row, col).getValue();
  }

  getRecord(row, colStart, colEnd) {
    const numberOfColumns = colEnd - colStart + 1;
    return this.getSpreadsheetValues(row, colStart, 1, numberOfColumns)[0].map(item => item.value);
  }

  getCollection(colStart, colEnd) {
    const numberOfColumns = colEnd - colStart + 1;
    return this.sheet.getRange(this._startRow, colStart, this.sheet.getMaxRows() - 1, numberOfColumns)
      .getValues().filter(row => row.some(value => value !== ''));
  }

  getColumn(col) {
    return this.getSpreadsheetValues(this._startRow, col).map(value => value[0].value);
  }

  pushToRange(records, mapping) {
    const keys = Object.keys(records[0]);
    const rangeStartColumn = mapping[keys[0]];

    const processedRecords = records.map(rec => keys.reduce((acc, key) => {
      acc[mapping[key]] = rec[key];
      return acc;
    }, {})
    );
    // processedRecord is a model, where keys are replaced by corresponding
    // column indexes from the spreadsheet

    let emptyRowIndex;
    processedRecords.forEach((record) => {
      if (!emptyRowIndex) {
        emptyRowIndex = this._startRow + this.sheet
          .getRange(this._startRow, rangeStartColumn, this.sheet.getMaxRows() - 1)
          .getValues()
          .flat()
          .findIndex(value => value === '');
      } else {
        emptyRowIndex++;
      }

      for (const columnIndex in record) {
        this.sheet.getRange(emptyRowIndex, columnIndex).setValues([[record[columnIndex]]]);
      }

      Object.keys(record).forEach(key => {
        const responseItemColumnRange = this.sheet.getRange(emptyRowIndex, key);

        responseItemColumnRange.setValues([[record[key]]])
      });

    });
  }

  writeToCell(row, col, value) {
    const cell = this.sheet.getRange(row, col, 1, 1).getCell(1, 1);
    cell.setValue(value);
  }

  getSpreadsheetValues(row, column, rowsNum = null, colNums = 1) {
    return this.sheet
      .getRange(row, column, rowsNum ? rowsNum : this.sheet.getMaxRows() - 1, colNums)
      .getValues()
      .filter(values => values.some(value => value !== ''))
      .map((values, index) => {
        return values.map((value, columnShift) => ({
          row: row + index,
          column: column + columnShift,
          value,
        }));
      });
  }
}

const sheetService = new SheetService(
  SpreadsheetApp.getActive().getSheetByName("Opolska114")
);