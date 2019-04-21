const SettingsFormValidator = require('../utils/validate/settings-validate');

const settingsForm = document.getElementById('settings-form');
const settingsFormValidator = new SettingsFormValidator('settings-form');

settingsForm.addEventListener('submit', () => {
    if (SettingsFormValidator.prototype.isValid) {
        const limit = parseFloat(document.getElementById('limit').value);
        const currency = document.getElementById('currency').value;

        const userSettings = localStorage.getItem('user-settings');
        const userSettingsJson = JSON.parse(userSettings);
        

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
