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

let validationRules = [{
    name: 'username',
    display: 'Username',
    rules: 'required|alpha_numeric|min_length[6]|max_length[20]'
}, {
    name: 'password',
    display: 'Password',
    rules: 'required|min_length[8]|max_length[20]'
}];

let callback = function(errors, event) {
    let errorsLength = errors.length;
    if (errorsLength > 0) {
        const errorMessage = errors[0].message;
        const invalidElement = document.getElementsByName(errors[0].name)[0];
        setInvalid(invalidElement, errorMessage);
        setValidOnClick(invalidElement);
    }
};

let validator = new FormValidator('login-form', validationRules, callback);
validator.setMessage('required', '%s is required.');
validator.setMessage('min_length', '%s must be at least 8 characters in length.');