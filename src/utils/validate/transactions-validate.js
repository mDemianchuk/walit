const FormValidator = require('validate-js');

function setInvalid(element, errorMessage) {
    if (!element.className.includes('-invalid')) {
        element.className += '-invalid';
        element.setAttribute('title', errorMessage);
    }
}

function setValidOnClick(element) {
    element.onclick = () => {
        element.className = element.className.replace('-invalid', '');
        element.removeAttribute('title');
    }
}

function AddTransactionValidator(elementName) {
    AddTransactionValidator.prototype.isValid = false;

    function callback(errors, event) {
        let errorsLength = errors.length;
        if (errorsLength === 0) {
            AddTransactionValidator.prototype.isValid = true;
        } else if (errorsLength > 0) {
            const errorMessage = errors[0].message;
            const invalidElement = document.getElementsByName(errors[0].name)[0];
            setInvalid(invalidElement, errorMessage);
            setValidOnClick(invalidElement);
        }
    }

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

    this.validator = new FormValidator(elementName, validationRules, callback);

    this.validator.registerCallback('valid_date', (value) => {
        const date = new Date(value);
        return (!isNaN(date.getDate()));
    }).setMessage('valid_date', '%s should be a valid date.');

    this.validator.registerCallback('after_date', (value) => {
        const date = new Date(value);
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate());
        return (date < tomorrow);
    }).setMessage('after_date', '%s should not be after tomorrow.');

    this.validator.registerCallback('before_date', (value) => {
        const date = new Date(value);
        const yearFromToday = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        return (date > yearFromToday);
    }).setMessage('before_date', '%s should not be earlier than a year from now.');

    this.validator.setMessage('required', '%s is required.');
}

function FilterTransactionsValidator(elementName) {
    FilterTransactionsValidator.prototype.isValid = false;

    function callback(errors, event) {
        let errorsLength = errors.length;
        if (errorsLength === 0) {
            FilterTransactionsValidator.prototype.isValid = true;
        } else if (errorsLength > 0) {
            const errorMessage = errors[0].message;
            const invalidElement = document.getElementsByName(errors[0].name)[0];
            setInvalid(invalidElement, errorMessage);
            setValidOnClick(invalidElement);
        }
    }

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

    let dateAfter = null;
    let lessThen = null;

    this.validator = new FormValidator(elementName, validationRules, callback);

    this.validator.registerCallback('valid_date', (value) => {
        const date = new Date(value);
        return (!isNaN(date.getDate()));
    }).setMessage('valid_date', '%s should be a valid date.');

    this.validator.registerCallback('after_date', (value) => {
        dateAfter = new Date(value);
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate());
        return (dateAfter < tomorrow);
    }).setMessage('before_date', '%s should not be after tomorrow.');

    this.validator.registerCallback('before_date', (value) => {
        const date = new Date(value);
        return (dateAfter < date);
    }).setMessage('before_date', '%s should not be earlier than or the same as \'After the date\'.');

    this.validator.registerCallback('get_less_than', (value) => {
        lessThen = parseFloat(value);
        return true;
    });

    this.validator.registerCallback('less_than_prev', (value) => {
        if (lessThen) {
            return lessThen > parseFloat(value);
        }
        return true;
    }).setMessage('less_than_prev', '%s should not be less than or equal to \'Less than\'');

    this.validator.setMessage('required', '%s is required.');
}

function EditTransactionValidator(elementName) {
    EditTransactionValidator.prototype.isValid = false;

    function callback(errors, event) {
        let errorsLength = errors.length;
        if (errorsLength === 0) {
            EditTransactionValidator.prototype.isValid = true;
        } else if (errorsLength > 0) {
            const errorMessage = errors[0].message;
            const invalidElement = document.getElementsByName(errors[0].name)[0];
            setInvalid(invalidElement, errorMessage);
            setValidOnClick(invalidElement);
        }
    }

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

    this.validator = new FormValidator(elementName, validationRules, callback);

    this.validator.registerCallback('valid_date', (value) => {
        const date = new Date(value);
        return (!isNaN(date.getDate()));
    }).setMessage('valid_date', '%s should be a valid date.');

    this.validator.registerCallback('after_date', (value) => {
        const date = new Date(value);
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate());
        return (date < tomorrow);
    }).setMessage('after_date', '%s should not be after tomorrow.');

    this.validator.registerCallback('before_date', (value) => {
        const date = new Date(value);
        const yearFromToday = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        return (date > yearFromToday);
    }).setMessage('before_date', '%s should not be earlier than a year from now.');
    this.validator.setMessage('required', '%s is required.');
}

module.exports = {
    AddTransactionValidator,
    FilterTransactionsValidator,
    EditTransactionValidator
};