const settingsValidator = require('../utils/validate/settings-validator');

document.addEventListener('DOMContentLoaded', () => {
    const settingsForm = document.getElementById('settings-form');
    const settingsFormValidator = settingsValidator.getSettingsValidator('settings-form');

    settingsForm.addEventListener('submit', event => {
        event.preventDefault();
        if (settingsFormValidator.isValid) {
            settingsForm.submit()
        }
    });
});