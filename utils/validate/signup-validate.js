const FormValidator = require('./validate.js');

function setInvalid(element) {
  element.className = 'invalid';
  element.onclick = () => {
    element.className = 'valid';
  }
}

let validationRules = [{
  name: 'first-name',
  display: 'First Name',
  rules: 'required|alpha_numeric'
}, {
  name: 'last-name',
  display: 'Last Name',
  rules: 'required|alpha_numeric'
}, {
  name: 'username',
  display: 'Username',
  rules: 'required|alpha_numeric'
}, {
  name: 'password',
  display: 'Password',
  rules: 'required|min_length[8]'
}, {
  name: 'password-confirm',
  display: 'Confirm Password',
  rules: 'required|matches[password]'
}, {
  name: 'email',
  display: 'E-mail Address',
  rules: 'required|valid_email'
}];

let callback = function(errors, event) {
  let errorsLength = errors.length;
  if (errorsLength > 0) {
    setInvalid(document.getElementsByName(errors[0].name)[0]);
    console.log(errors[0].message);
  }
};

let validator = new FormValidator('signup-form', validationRules, callback);
validator.setMessage('required', '%s is required.');
validator.setMessage('min_length', '%s must be at least 8 characters in length.');
