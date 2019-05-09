const AbstractFormValidator = require('./abstract-validator');

function getSettingsValidator(elementName) {
    const validationRules = [{
        name: 'limit',
        display: 'Limit',
        rules: 'decimal|less_than[999999]|greater_than[0]'
    }, {
        name: 'goal',
        display: 'Goal',
        rules: 'decimal|less_than[999999]|greater_than[0]'
    }];

    return new AbstractFormValidator(elementName, validationRules);
}

module.exports = {
    getSettingsValidator
};