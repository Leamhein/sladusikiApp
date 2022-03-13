class _FormService {
    getFormById(formId) {
        return FormApp.openById(formId);
    }

    getFormResponses(formInstance) {
        return formInstance.getResponses();
    }

    deleteAllResponses(formInstance) {
        formInstance.deleteAllResponses();
    }

    getFormItem(formInstance, itemType, itemTitle) {
        const formItem = formInstance.getItems(itemType).find(item => {
            return item.getTitle() === itemTitle;
        });

        return formItem && FORM_ITEMS_GET_METHODS_MAP[itemType](formItem);
    }

    createItem(form, itemType, itemTitle, itemHelpTitle) {
        const formItem = FORM_ITEMS_CREATE_METHODS_MAP[itemType](form);

        if (itemTitle) {
            formItem.setTitle(itemTitle);
        }

        if (itemHelpTitle) {
            formItem.setHelpText(itemHelpTitle);
        }

        return formItem;
    }

    removeItem(formInstance, itemInstance) {
        const itemIndex = itemInstance.getIndex();
        
        formInstance.deleteItem(itemIndex);
    }

    setValidationToItem(itemInstance, validationObj) {
        itemInstance.setValidation(validationObj);
    }

    removeValidationFromItem(itemInstance) {
        itemInstance.clearValidation();
    }
}
