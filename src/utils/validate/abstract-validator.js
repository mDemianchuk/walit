const FormValidator = require('validate-js');

class AbstractFormValidator {
    constructor(formName, validationRules) {
        this.isValid = false;
        this.formName = formName;

        this.setValid = (element) => {
            element.className = element.className.replace('-invalid', '');
            element.removeAttribute('title');
        };

        this.setInvalid = (element, errorMessage) => {
            if (!element.className.includes('-invalid')) {
                element.className += '-invalid';
                element.setAttribute('title', errorMessage);
            }
        };

        this.validationCallback = (errors, event) => {
            let errorsLength = errors.length;
            if (errorsLength === 0) {
                this.isValid = true;
            } else if (errorsLength > 0) {
                const errorMessage = errors[0].message;
                const invalidElement = document.getElementsByName(errors[0].name)[0];
                invalidElement.onclick = () => {
                    this.setValid(invalidElement);
                };
                this.setInvalid(invalidElement, errorMessage);
            }
        };

        this.validator = new FormValidator(this.formName, validationRules, this.validationCallback);
        this.validator.setMessage('required', '%s is required.');
        this.validator.setMessage('min_length', '%s must be at least 8 characters in length.');
    }
}

module.exports = AbstractFormValidator;