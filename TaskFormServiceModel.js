class ContactItemConfig {
    constructor(
        title,
        helpTitle,
        type,
        validation,
    ) {
        this.title = title;
        this.helpTitle = helpTitle;
        this.type = type;
        this.validation = validation;
    }
}

const CONTACT_SECTION_ITEMS_LIST = [
    new ContactItemConfig(
        'Email',
        null,
        FORM_ITEMS_TYPE_MAP.text,
        FormApp.createTextValidation().setHelpText('Should be email address').requireTextIsEmail().build(),
    ),
    new ContactItemConfig(
        'Name',
        null,
        FORM_ITEMS_TYPE_MAP.text,
        null,
    ),
    new ContactItemConfig(
        'Phone',
        'phone number, 9 digits',
        FORM_ITEMS_TYPE_MAP.text,
        FormApp.createTextValidation().setHelpText('Should be 9 digits').requireTextMatchesPattern('[0-9]{9}').build(),
    ),
    // new ContactItemConfig(
    //     'Subscription',
    //     'If you want to get emails with the new demands, please tick the checbox',
    //     FORM_ITEMS_TYPE_MAP.checkbox,
    //     null,
    // ),
];

const DEMAND_SECTION_ITEMS_LIST = [
    new ContactItemConfig(
        'Commited Date/Time',
        'Please include date and time by which you are planning to deliver the Items',
        FORM_ITEMS_TYPE_MAP.text,
        null,
    ),
];