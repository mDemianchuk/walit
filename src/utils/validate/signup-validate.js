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

function SignupFormValidator(elementName) {
    SignupFormValidator.prototype.isValid = false;

    function callback(errors, event) {
        let errorsLength = errors.length;
        if (errorsLength === 0) {
            SignupFormValidator.prototype.isValid = true;
        } else if (errorsLength > 0) {
            const errorMessage = errors[0].message;
            const invalidElement = document.getElementsByName(errors[0].name)[0];
            setInvalid(invalidElement, errorMessage);
            setValidOnClick(invalidElement);
        }
    }

    let validationRules = [{
        name: 'email',
        display: 'E-mail Address',
        rules: 'required|valid_email'
    }, {
        name: 'password',
        display: 'Password',
        rules: 'required|min_length[6]|max_length[20]'
    }, {
        name: 'password-confirm',
        display: 'Confirm Password',
        rules: 'required|matches[password]'
    }];

    this.validator = new FormValidator('signup-form', validationRules, callback);
    this.validator.setMessage('required', '%s is required.');
    this.validator.setMessage('min_length', '%s must be at least 8 characters in length.');
}

module.exports = SignupFormValidator;

