const SettingsFormValidator = require('../utils/validate/settings-validate');
const jsonUtil = require('../utils/json-util');

const settingsForm = document.getElementById('settings-form');
const settingsFormValidator = new SettingsFormValidator('settings-form');

settingsForm.addEventListener('submit', () => {
    if (SettingsFormValidator.prototype.isValid) {
        const limit = parseFloat(document.getElementById('limit').value);
        const currency = document.getElementById('currency').value;

        const userSettings = localStorage.getItem('user-settings');
        let userSettingsJson = JSON.parse(userSettings);
        if (!jsonUtil.isValidJson(userSettingsJson)) {
            userSettingsJson = {};
        }

        if (!isNaN(limit)) {
            userSettingsJson.limit = limit;
        }

        if (currency) {
            userSettingsJson.currency = currency;
        }

        let userSettingsStr = JSON.stringify(userSettingsJson);
        localStorage.setItem('user-settings', userSettingsStr);
    }
});
