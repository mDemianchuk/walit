const express = require('express');
const router = express.Router();
const daoHelper = require('../src/dao/dao-helper');
const authHelper = require('../src/dao/auth-helper');
const validatorUtil = require('../src/utils/validate/validator-util');

router.get('/', (req, res) => {
    authHelper.getUserIdIfSignedIn()
        .then(() => res.render('settings'))
        .catch(() => res.redirect('/login'));
});

router.post('/', (req, res) => {
    let goalToUpdate = null;
    const newGoal = req.body.goal;
    if (validatorUtil.isValidNumber(newGoal)) {
        goalToUpdate = {
            goal: newGoal
        };
    }

    let limitToUpdate = null;
    const newLimit = req.body.limit;
    if (validatorUtil.isValidNumber(newLimit)) {
        limitToUpdate = {
            limit: newLimit
        };
    }

    let currencyToUpdate = null;
    const newCurrency = req.body.currency;
    if (validatorUtil.isValidString(newCurrency)) {
        currencyToUpdate = {
            currency: newCurrency
        };
    }

    authHelper.getUserIdIfSignedIn()
        .then(userId => getUserSettingsDocument(userId))
        .then(userSettingsDocument => daoHelper.updateDocumentFieldIfValid(userSettingsDocument, goalToUpdate))
        .then(userSettingsDocument => daoHelper.updateDocumentFieldIfValid(userSettingsDocument, limitToUpdate))
        .then(userSettingsDocument => daoHelper.updateDocumentFieldIfValid(userSettingsDocument, currencyToUpdate))
        .then(() => res.redirect('/overview'))
        .catch(() => res.redirect('/login'));
});

function getUserSettingsDocument(userId) {
    return daoHelper.getDocumentByPath(`walit-settings/${userId}`);
}

module.exports = router;
