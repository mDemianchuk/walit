const AbstractFormValidator = require('./abstract-validator');

function getSignUpValidator(elementName) {
    const validationRules = [{
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

    return new AbstractFormValidator(elementName, validationRules);
}

module.exports = {
    getSignUpValidator
};