const FORM_ITEMS_TYPE_MAP = {
    sectionHeader: FormApp.ItemType.SECTION_HEADER,
    pageBreak: FormApp.ItemType.PAGE_BREAK,
    text: FormApp.ItemType.TEXT,
    checkbox: FormApp.ItemType.CHECKBOX,
    checkboxGrid: FormApp.ItemType.CHECKBOX_GRID,
    date: FormApp.ItemType.DATE,
    dateTime: FormApp.ItemType.DATETIME,
    duration: FormApp.ItemType.DURATION,
    grid: FormApp.ItemType.GRID,
    image: FormApp.ItemType.IMAGE,
    list: FormApp.ItemType.LIST,
    multipleChoise: FormApp.ItemType.MULTIPLE_CHOICE,
    pageBreak: FormApp.ItemType.PAGE_BREAK,
    scale: FormApp.ItemType.SCALE,
    time: FormApp.ItemType.TIME,
    video: FormApp.ItemType.VIDEO,
    fileUpload: FormApp.ItemType.FILE_UPLOAD,
}

const FORM_ITEMS_CREATE_METHODS_MAP = {
    [FORM_ITEMS_TYPE_MAP.sectionHeader]: formInstance => formInstance.addSectionHeaderItem(),
    [FORM_ITEMS_TYPE_MAP.pageBreak]: formInstance => formInstance.addPageBreakItem(),
    [FORM_ITEMS_TYPE_MAP.text]: formInstance => formInstance.addTextItem(),
    [FORM_ITEMS_TYPE_MAP.checkbox]: formInstance => formInstance.addCheckboxItem(),
}

const FORM_ITEMS_GET_METHODS_MAP = {
    [FORM_ITEMS_TYPE_MAP.sectionHeader]: formItem => formItem.asSectionHeaderItem(),
    [FORM_ITEMS_TYPE_MAP.pageBreak]: formItem => formItem.asPageBreakItem(),
    [FORM_ITEMS_TYPE_MAP.text]: formItem => formItem.asTextItem(),
    [FORM_ITEMS_TYPE_MAP.checkbox]: formItem => formItem.asCheckboxItem(),
}
