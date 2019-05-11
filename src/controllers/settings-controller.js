const daoHelper = require('../dao/dao-helper');
const authHelper = require('../dao/auth-helper');
const redirectUtil = require('../utils/redirect-util');
const settingsValidator = require('../utils/validate/settings-validator');

document.addEventListener('DOMContentLoaded', () => {
    authHelper.addSignInObserver(user => {
        if (authHelper.isSignedIn(user)) {
            getUserSettingsDocument(user.uid)
                .then(userSettingsDocument => loadPage(userSettingsDocument));
        } else {
            redirectUtil.redirectToPage('/login');
        }
    });
});

function getUserSettingsDocument(userId) {
    return new Promise(resolve => {
        daoHelper.getDocument(`walit-settings/${userId}`)
            .then(userSettingsDocument => resolve(userSettingsDocument));
    });
}

function loadPage(userSettingsDocument) {
    const settingsForm = document.getElementById('settings-form');
    const settingsFormValidator = settingsValidator.getSettingsValidator('settings-form');

    settingsForm.addEventListener('submit', (form) => {
        form.preventDefault();

        if (settingsFormValidator.isValid) {
            const newCurrencyValue = document.getElementById('currency').value;
            const newGoalValue = parseFloat(document.getElementById('goal').value);
            const newLimitValue = parseFloat(document.getElementById('limit').value);

            let newCurrency = null;
            let newGoal = null;
            let newLimit = null;

            if (isValidCurrency(newCurrencyValue)) {
                newCurrency = {
                    currency: newCurrencyValue
                };
            }

            if (isValidAmount(newGoalValue)) {
                newGoal = {
                    goal: newGoalValue
                };
            }

            if (isValidAmount(newLimitValue)) {
                newLimit = {
                    limit: newLimitValue
                };
            }

            updateSettings(userSettingsDocument, newCurrency, newGoal, newLimit)
                .then(() => settingsForm.submit());
        }
    });
}

function updateSettings(userSettingsDocument, newCurrency, newGoal, newLimit) {
    return new Promise(resolve => {
        updateField(userSettingsDocument, newCurrency)
            .then(() => updateField(userSettingsDocument, newGoal))
            .then(() => updateField(userSettingsDocument, newLimit))
            .then(() => resolve());
    });
}

function updateField(userSettingsDocument, newField) {
    return new Promise(resolve => {
        if (newField) {
            daoHelper.updateDocumentField(userSettingsDocument, newField)
                .then(() => resolve())
        } else {
            resolve();
        }
    });
}

function isValidCurrency(currency) {
    return currency;
}

function isValidAmount(amount) {
    return amount && !isNaN(amount);
}
