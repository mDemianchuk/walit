const FormValidator = require('./validate.js');

function CustomValidator(elementName, validationRules) {
    CustomValidator.prototype.isValid = false;

    function callback(errors, event) {
        let errorsLength = errors.length;
        if (errorsLength === 0) {
            CustomValidator.prototype.isValid = true;
        } else if (errorsLength > 0) {
            let invalidElement = document.getElementsByName(errors[0].name)[0];
            setInvalid(invalidElement);
            setValidOnClick(invalidElement);
            console.log(errors[0].message);
        }
    }

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

    this.validator = new FormValidator(elementName, validationRules, callback);

    this.validator.setMessage('required', '%s is required.');
}

module.exports = CustomValidator;