const AbstractFormValidator = require('./abstract-validator');

function getAddTransactionValidator(elementName) {
    const validationRules = [{
        name: 'add_description',
        display: 'Description',
        rules: 'required|min_length[2]|max_length[30]'
    }, {
        name: 'add_category',
        display: 'Category',
        rules: 'required|min_length[2]|max_length[20]'
    }, {
        name: 'add_date',
        display: 'Date',
        rules: 'required|callback_valid_date|callback_after_date|callback_before_date'
    }, {
        name: 'add_amount',
        display: 'Amount',
        rules: 'required|decimal|less_than[999999]|greater_than[0]'
    }, {
        name: 'add_type',
        display: 'Type',
        rules: 'required'
    }];

    const addTransactionValidator = new AbstractFormValidator(elementName, validationRules);

    addTransactionValidator.validator.registerCallback('valid_date', (value) => {
        const date = new Date(value);
        return (!isNaN(date.getDate()));
    }).setMessage('valid_date', '%s should be a valid date.');

    addTransactionValidator.validator.registerCallback('after_date', (value) => {
        const date = new Date(value);
        date.setDate(date.getDate() + 1);
        let today = new Date();
        return (date < today);
    }).setMessage('after_date', '%s should not be after today.');

    addTransactionValidator.validator.registerCallback('before_date', (value) => {
        const date = new Date(value);
        date.setDate(date.getDate() + 1);
        const yearFromToday = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        return (date > yearFromToday);
    }).setMessage('before_date', '%s should not be earlier than a year from now.');

    return addTransactionValidator;
}

function getFilterTransactionsValidator(elementName) {
    const validationRules = [{
        name: 'filter-category',
        display: 'Category',
        rules: 'min_length[2]|max_length[20]'
    }, {
        name: 'filter-date-after',
        display: 'Date',
        rules: 'callback_valid_date|callback_after_date'
    }, {
        name: 'filter-date-before',
        display: 'Date',
        rules: 'callback_valid_date|callback_before_date'
    }, {
        name: 'filter-less-than',
        display: 'Amount',
        rules: 'decimal|less_than[999999]|greater_than[0]|callback_get_less_than'
    }, {
        name: 'filter-more-than',
        display: 'Amount',
        rules: 'decimal|less_than[999999]|greater_than[0]|callback_less_than_prev'
    }];

    const filterTransactionsValidator = new AbstractFormValidator(elementName, validationRules);

    let dateAfter = null;
    let lessThen = null;

    filterTransactionsValidator.validator.registerCallback('valid_date', (value) => {
        const date = new Date(value);
        return (!isNaN(date.getDate()));
    }).setMessage('valid_date', '%s should be a valid date.');

    filterTransactionsValidator.validator.registerCallback('after_date', (value) => {
        dateAfter = new Date(value);
        dateAfter.setDate(dateAfter.getDate() + 1);
        let today = new Date();
        return (dateAfter < today);
    }).setMessage('before_date', '%s should not be after today.');

    filterTransactionsValidator.validator.registerCallback('before_date', (value) => {
        if(dateAfter) {
            const dateBefore = new Date(value);
            dateBefore.setDate(dateBefore.getDate() + 1);
            return (dateAfter < dateBefore);
        }
        return true;
    }).setMessage('before_date', '%s should not be earlier than or the same as \'After the date\'.');

    filterTransactionsValidator.validator.registerCallback('get_less_than', (value) => {
        lessThen = parseFloat(value);
        return true;
    });

    filterTransactionsValidator.validator.registerCallback('less_than_prev', (value) => {
        if (lessThen) {
            return lessThen > parseFloat(value);
        }
        return true;
    }).setMessage('less_than_prev', '%s should not be less than or equal to \'Less than\'');

    return filterTransactionsValidator;
}

function getEditTransactionValidator(elementName) {
    const validationRules = [{
        name: 'edit_description',
        display: 'Description',
        rules: 'required|min_length[2]|max_length[30]'
    }, {
        name: 'edit_category',
        display: 'Category',
        rules: 'required|min_length[2]|max_length[20]'
    }, {
        name: 'edit_date',
        display: 'Date',
        rules: 'required|callback_valid_date|callback_after_date|callback_before_date'
    }, {
        name: 'edit_amount',
        display: 'Amount',
        rules: 'required|decimal|less_than[999999]|greater_than[0]'
    }, {
        name: 'edit_type',
        display: 'Type',
        rules: 'required'
    }];

    const editTransactionsValidator = new AbstractFormValidator(elementName, validationRules);

    editTransactionsValidator.validator.registerCallback('valid_date', (value) => {
        const date = new Date(value);
        return (!isNaN(date.getDate()));
    }).setMessage('valid_date', '%s should be a valid date.');

    editTransactionsValidator.validator.registerCallback('after_date', (value) => {
        const date = new Date(value);
        date.setDate(date.getDate() + 1);
        let today = new Date();
        return (date < today);
    }).setMessage('after_date', '%s should not be after today.');

    editTransactionsValidator.validator.registerCallback('before_date', (value) => {
        const date = new Date(value);
        const yearFromToday = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        return (date > yearFromToday);
    }).setMessage('before_date', '%s should not be earlier than a year from now.');

    return editTransactionsValidator;
}

module.exports = {
    getAddTransactionValidator,
    getEditTransactionValidator,
    getFilterTransactionsValidator
};
