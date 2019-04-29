const SettingsFormValidator = require('../utils/validate/settings-validate');

function updateCurrency(currency, userSettings) {
    return new Promise(async (resolve) => {
        if (currency) {
            await userSettings.update({
                currency: currency
            }).then(() => {
                resolve(userSettings);
            });
        }
        resolve(userSettings);
    });
}

function updateGoal(goal, userSettings) {
    return new Promise(async (resolve) => {
        if (goal && !isNaN(goal)) {
            await userSettings.update({
                goal: goal
            }).then(() => {
                resolve(userSettings);
            });
        }
        resolve(userSettings);
    });
}

function updateLimit(limit, userSettings) {
    return new Promise(async (resolve) => {
        if (limit && !isNaN(limit)) {
            await userSettings.update({
                limit: limit
            }).then(() => {
                resolve(userSettings);
            });
        }
        resolve(userSettings);
    });
}

function loadThePage(userSettings) {
    const settingsForm = document.getElementById('settings-form');
    const settingsFormValidator = new SettingsFormValidator('settings-form');

    settingsForm.addEventListener('submit', (form) => {
        form.preventDefault();

        if (SettingsFormValidator.prototype.isValid) {
            const currency = document.getElementById('currency').value;
            const goal = parseFloat(document.getElementById('goal').value);
            const limit = parseFloat(document.getElementById('limit').value);

            updateCurrency(currency, userSettings)
                .then(() => updateGoal(goal, userSettings))
                .then(() => updateLimit(limit, userSettings))
                .then(() => settingsForm.submit());
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const userSettings = firebase.firestore()
                .collection('walit-settings')
                .doc(user.uid);
            loadThePage(userSettings);
        } else {
            window.location.replace('/login');
        }
    });
});
