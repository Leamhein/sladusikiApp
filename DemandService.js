const QUANTITY_TYPES = {
	CURRENT: 'currentQuantity',
	COMMITED: 'commitedQuantity',
	COMPLETED: 'completedQuantity',
}

class DemandService {
	
	getDemands() {
		return sheetService.getCollection(
			this.columnMapping.item,
			this.columnMapping.comments,
		).map(row => new Demand(...row))
		.filter(demand => demand.currentQuantity > 0);
	}

	getSingleDemand(rowIndex) {
		const row =sheetService.getRecord(
			rowIndex,
			this.columnMapping.item,
			this.columnMapping.comments
		);
		return new Demand(...row);
	}
  
  onTaskCreated(item, quantity) {
		this.updateDemandQuantity(item, quantity, QUANTITY_TYPES.CURRENT, QUANTITY_TYPES.COMMITED);
	}

	onTaskCompleted(item, quantity) {
		this.updateDemandQuantity(item, quantity, QUANTITY_TYPES.COMMITED, QUANTITY_TYPES.COMPLETED);
	}

	onTaskCancelled(item, quantity) {
		this.updateDemandQuantity(item, quantity, QUANTITY_TYPES.COMMITED, QUANTITY_TYPES.CURRENT);
	}

	updateDemandQuantity(demandItem, delta, fromQuantityType, toQuantityType) {
		//TODO Optimize: consider using 1 range
		const demandItems = sheetService.getColumn(this.columnMapping.item);
		const demandRowIndex = demandItems.findIndex(item => item.toString() === demandItem);
    if (demandRowIndex === -1) {
      throw new Error(`Demand with item ${demandItem} not found`);
    }
		const demand = this.getSingleDemand(demandRowIndex + sheetService._startRow);
		sheetService.writeToCell(
			demandRowIndex + sheetService._startRow,
			this.columnMapping[fromQuantityType],
			parseInt(demand[fromQuantityType] || 0) - parseInt(delta)
		);
		sheetService.writeToCell(
			demandRowIndex + sheetService._startRow,
			this.columnMapping[toQuantityType],
			parseInt(demand[toQuantityType] || 0) + parseInt(delta)
		);
	}
}

DemandService.prototype.columnMapping = {
  item: 3,
  [QUANTITY_TYPES.CURRENT]: 4,
  [QUANTITY_TYPES.COMMITED]: 5,
  [QUANTITY_TYPES.COMPLETED]: 6,
  date: 7,
  time: 8,
  comments: 9,
};

const demandService = new DemandService();