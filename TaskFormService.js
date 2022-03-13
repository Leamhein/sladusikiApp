class TaskFormService extends _FormService {
    constructor() {
        super();
        this._TASK_FORM_ID = '12LpCBWRJh8WaBKtxfrUl1JO2K1w8LWcDN5F6X-rNC4k';
        this._DEMAND_SECTION_LABEL = 'Demands';
        this._CONTACT_SECTION_LABEL = 'Contact';
        this._formInstance = this.getFormById(this._TASK_FORM_ID);
    }

    getTaskForm() {
        return this._formInstance;
    }

    setTaskForm(demand) {
        this._setContactSection();
        this._setDemandsSection(demand);
    }

    _setDemandsSection(demands) {
        const demandSection = this.getFormItem(this._formInstance, FORM_ITEMS_TYPE_MAP.pageBreak, this._DEMAND_SECTION_LABEL);

        if (!demandSection) {
            this.createItem(this._formInstance, FORM_ITEMS_TYPE_MAP.pageBreak, this._DEMAND_SECTION_LABEL);
            this._addDemandHardcodedItems();
            demands.filter(item => item.currentQuantity > 0).forEach(this._addDemandItem.bind(this));
        } else {
            demands.forEach(demand => {
                const demandFormItem = this.getFormItem(this._formInstance, FORM_ITEMS_TYPE_MAP.text, demand.item);
                const updatedDemandHelpTitle = this._generateDemandsHelpTitle(demand);

                if (!demandFormItem && demand.currentQuantity > 0) {
                    this._addDemandItem(demand);
                }

                if (demandFormItem && demand.currentQuantity <= 0) {
                    this.removeItem(this._formInstance, demandFormItem);
                }

                if (demandFormItem && demand.currentQuantity > 0 && updatedDemandHelpTitle !== demandFormItem.getHelpText()) {
                    this._updateDemandItem(demandFormItem, demand);
                }
            });
        }
    }

    _addDemandHardcodedItems() {
        DEMAND_SECTION_ITEMS_LIST.forEach(this._addFormItemByItemConfig.bind(this));
    }

    _addDemandItem(demand) {
        const demandHelpTitle = this._generateDemandsHelpTitle(demand);
        const demandFormItem = this.createItem(this._formInstance, FORM_ITEMS_TYPE_MAP.text, demand.item, demandHelpTitle);
        const demandItemValidation = this._generateDemandItemValidation(demand);

        this.setValidationToItem(demandFormItem, demandItemValidation);
    }

    _updateDemandItem(demandFormItem, demand) {
        const updatedDemandHelpTitle = this._generateDemandsHelpTitle(demand);
        const demandItemValidation = this._generateDemandItemValidation(demand);

        demandFormItem.setHelpText(updatedDemandHelpTitle);
        this.removeValidationFromItem(demandFormItem);
        this.setValidationToItem(demandFormItem, demandItemValidation)
    }

    _generateDemandsHelpTitle(demand) {
        return `require up to ${demand.currentQuantity} items`;
    }

    _generateDemandItemValidation(demand) {
        return FormApp.createTextValidation()
            .setHelpText(`Should be a number between 1 and ${demand.currentQuantity}`)
            .requireNumberBetween(1, demand.currentQuantity)
            .build();
    }

    _setContactSection() {
        const contactSection = this.getFormItem(this._formInstance, FORM_ITEMS_TYPE_MAP.pageBreak, this._CONTACT_SECTION_LABEL);

        if (!contactSection) {
            this.createItem(this._formInstance, FORM_ITEMS_TYPE_MAP.pageBreak, this._CONTACT_SECTION_LABEL);

            CONTACT_SECTION_ITEMS_LIST.forEach(this._addFormItemByItemConfig.bind(this));
        }
    }

    _addFormItemByItemConfig(itemConfig) {
        const item = this.createItem(this._formInstance, itemConfig.type, itemConfig.title, itemConfig.helpTitle);

        if (itemConfig.validation) {
            this.setValidationToItem(item, itemConfig.validation);
        }
    }
}