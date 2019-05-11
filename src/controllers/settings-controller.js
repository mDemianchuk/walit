const daoHelper = require('../dao/dao-helper');
const authHelper = require('../dao/auth-helper');
const redirectUtil = require('../utils/redirect-util');
const validatorUtil = require('../utils/validate/validator-util');
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
        daoHelper.getDocumentByPath(`walit-settings/${userId}`)
            .then(userSettingsDocument => resolve(userSettingsDocument));
    });
}

function loadPage(userSettingsDocument) {
    const settingsForm = document.getElementById('settings-form');
    const settingsFormValidator = settingsValidator.getSettingsValidator('settings-form');

    settingsForm.addEventListener('submit', event => {
        event.preventDefault();

        if (settingsFormValidator.isValid) {
            const newCurrencyValue = document.getElementById('currency').value;
            const newGoalValue = parseFloat(document.getElementById('goal').value);
            const newLimitValue = parseFloat(document.getElementById('limit').value);

            let newCurrency = null;
            let newGoal = null;
            let newLimit = null;

            if (validatorUtil.isValidString(newCurrencyValue)) {
                newCurrency = {
                    currency: newCurrencyValue
                };
            }

            if (validatorUtil.isValidNumber(newGoalValue)) {
                newGoal = {
                    goal: newGoalValue
                };
            }

            if (validatorUtil.isValidNumber(newLimitValue)) {
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