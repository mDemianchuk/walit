const AbstractFormValidator = require('./abstract-validator');

function getLoginValidator(elementName) {
    const validationRules = [{
        name: 'email',
        display: 'E-mail Address',
        rules: 'required|valid_email'
    }, {
        name: 'password',
        display: 'Password',
        rules: 'required|min_length[6]|max_length[20]'
    }];

    return new AbstractFormValidator(elementName, validationRules);
}

module.exports = {
    getLoginValidator
};