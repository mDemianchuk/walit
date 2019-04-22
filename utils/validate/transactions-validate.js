const FormValidator = require('validate-js');

function setInvalid(element) {
    if (!element.className.includes('-invalid')) {
        element.className += '-invalid';
    }
}

function setValidOnClick(element) {
    element.onclick = () => {
        element.className = element.className.replace('-invalid', '');
    }
}

function AddTransactionValidator(elementName) {
    AddTransactionValidator.prototype.isValid = false;

    function callback(errors, event) {
        let errorsLength = errors.length;
        if (errorsLength === 0) {
            AddTransactionValidator.prototype.isValid = true;
        } else if (errorsLength > 0) {
            let invalidElement = document.getElementsByName(errors[0].name)[0];
            setInvalid(invalidElement);
            setValidOnClick(invalidElement);
            console.log(errors[0].message);
        }
    }

    const validationRules = [{
        name: 'add-description',
        display: 'Description',
        rules: 'required|min_length[2]|max_length[30]'
    }, {
        name: 'add-category',
        display: 'Category',
        rules: 'required|min_length[2]|max_length[20]'
    }, {
        name: 'add-date',
        display: 'Date',
        rules: 'required|callback_valid_date|callback_after_date|callback_before_date'
    }, {
        name: 'add-how-often',
        display: 'How Often',
        rules: 'required'
    }, {
        name: 'add-amount',
        display: 'Amount',
        rules: 'required|decimal|less_than[9999]|more_than[0]'
    }, {
        name: 'add-type',
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
        tomorrow.setDate(tomorrow.getDate() - 1);
        return (date < tomorrow);
    }).setMessage('after_date', '%s should not be after tomorrow.');

    this.validator.registerCallback('before_date', (value) => {
        const date = new Date(value);
        const yearFromToday = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        return (date > yearFromToday);
    }).setMessage('before_date', '%s should not be earlier than a year from now.');

    this.validator.setMessage('required', '%s is required.');
}

function FindTransactionsValidator(elementName) {
    FindTransactionsValidator.prototype.isValid = false;

    function callback(errors, event) {
        let errorsLength = errors.length;
        if (errorsLength === 0) {
            FindTransactionsValidator.prototype.isValid = true;
        } else if (errorsLength > 0) {
            let invalidElement = document.getElementsByName(errors[0].name)[0];
            setInvalid(invalidElement);
            setValidOnClick(invalidElement);
            console.log(errors[0].message);
        }
    }

    const validationRules = [{
        name: 'find-category',
        display: 'Category',
        rules: 'min_length[2]|max_length[20]'
    }, {
        name: 'find-date-after',
        display: 'After the date',
        rules: 'callback_valid_date|callback_after_date'
    }, {
        name: 'find-date-before',
        display: 'Before the date',
        rules: 'callback_valid_date|callback_before_date'
    }, {
        name: 'find-less-than',
        display: 'Less than',
        rules: 'decimal|less_than[9999]|more_than[0]|callback_get_less_than'
    }, {
        name: 'find-more-than',
        display: 'More than',
        rules: 'decimal|less_than[9999]|more_than[0]|callback_less_than_prev'
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
        tomorrow.setDate(tomorrow.getDate() - 1);
        return (dateAfter < tomorrow);
    }).setMessage('before_date', '%s should not be after tomorrow.');

    this.validator.registerCallback('before_date', (value) => {
        const date = new Date(value);
        return (dateAfter < date);
    }).setMessage('before_date', '%s should not be earlier than \'After the date\'.');

    this.validator.registerCallback('get_less_than', (value) => {
        lessThen = parseFloat(value);
        return true;
    });

    this.validator.registerCallback('less_than_prev', (value) => {
        return lessThen < parseFloat(value);
    }).setMessage('less_than_prev', '%s should be less than \'Less than\'');

    this.validator.setMessage('required', '%s is required.');
}

module.exports = {
    AddTransactionValidator,
    FindTransactionsValidator
};