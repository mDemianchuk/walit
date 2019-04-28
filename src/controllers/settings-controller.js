const SettingsFormValidator = require('../utils/validate/settings-validate');

function updateCurrency(currency, userSettings) {
    return new Promise(async (resolve, reject) => {
        if (currency) {
            console.log('updating currency');
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
    return new Promise(async (resolve, reject) => {
        if (goal && !isNaN(goal)) {
            console.log('updating goal');
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
    return new Promise(async (resolve, reject) => {
        if (limit && !isNaN(limit)) {
            console.log('updating limit');
            await userSettings.update({
                limit: limit
            }).then(() => {
                resolve(userSettings);
            });
        }
        resolve(userSettings);
    });
}

document.addEventListener('DOMContentLoaded', event => {
    const settingsForm = document.getElementById('settings-form');
    const settingsFormValidator = new SettingsFormValidator('settings-form');

    settingsForm.addEventListener('submit', (form) => {
        form.preventDefault();

        if (SettingsFormValidator.prototype.isValid) {
            const currency = document.getElementById('currency').value;
            const goal = parseFloat(document.getElementById('goal').value);
            const limit = parseFloat(document.getElementById('limit').value);
            const user = firebase.auth().currentUser;
            if (user) {
                const userSettings = firebase.firestore().collection(user.uid).doc('settings');

                updateCurrency(currency, userSettings)
                    .then(() => updateGoal(goal, userSettings))
                    .then(() => updateLimit(limit, userSettings))
                    .then(() => {
                        alert('User settings are successfully updated');
                        settingsForm.submit();
                    });

            } else {
                alert('You\'re not signed in')
            }
        }
    });
});
