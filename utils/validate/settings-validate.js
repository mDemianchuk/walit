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

function SettingsFormValidator(elementName) {
    SettingsFormValidator.prototype.isValid = false;

    function callback(errors, event) {
        let errorsLength = errors.length;
        if (errorsLength === 0) {
            SettingsFormValidator.prototype.isValid = true;
        } else if (errorsLength > 0) {
            const errorMessage = errors[0].message;
            const invalidElement = document.getElementsByName(errors[0].name)[0];
            setInvalid(invalidElement, errorMessage);
            setValidOnClick(invalidElement);
        }
    }

    const validationRules = [{
        name: 'password_old',
        display: 'Password',
        rules: 'min_length[8]|max_length[20]|callback_present'
    }, {
        name: 'password',
        display: 'New Password',
        rules: 'required|min_length[8]|max_length[20]',
        depends: () => {
            return present;
        }
    }, {
        name: 'password_confirm',
        display: 'Confirm Password',
        rules: 'required|matches[password]',
        depends: () => {
            return present;
        }
    }, {
        name: 'limit',
        display: 'Limit',
        rules: 'decimal|less_than[9999]|greater_than[0]'
    }, {
        name: 'goal',
        display: 'Goal',
        rules: 'decimal|less_than[9999]|greater_than[0]'
    }];

    let present = false;

    this.validator = new FormValidator(elementName, validationRules, callback);

    this.validator.registerCallback('present', (value) => {
        present = true;
        return true;
    });

    this.validator.setMessage('required', '%s is required.');
}

module.exports = SettingsFormValidator;