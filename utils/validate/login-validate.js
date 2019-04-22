const FormValidator = require('validate-js');

function setInvalid(element) {
    element.className = 'invalid';
    element.onclick = () => {
        element.className = 'valid';
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
        setInvalid(document.getElementsByName(errors[0].name)[0]);
        console.log(errors[0].message);
    }
};

let validator = new FormValidator('login-form', validationRules, callback);
validator.setMessage('required', '%s is required.');
validator.setMessage('min_length', '%s must be at least 8 characters in length.');