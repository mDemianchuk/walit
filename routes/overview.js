const express = require('express');
const router = express.Router();
const authHelper = require('../src/dao/auth-helper');
const daoHelper = require('../src/dao/dao-helper');

router.get('/', (req, res) => {
    authHelper.getUserIdIfSignedIn()
        .then(userId => retrieveUserData(userId))
        .then(userData => res.render('overview', userData))
        .catch(() => res.redirect('/login'));
});

function retrieveUserData(userId) {
    const userData = {};

    return new Promise(resolve => {
        retrieveUserSettings(userId)
            .then(userSettings => userData.settings = userSettings)
            .then(() => retrieveUserTransactionsByType(userId, 'Income'))
            .then((userIncome) => userData.income = userIncome)
            .then(() => retrieveUserTransactionsByType(userId, 'Expense'))
            .then((userExpense) => userData.expense = userExpense)
            .then(() => resolve(userData));
    });
}

function retrieveUserSettings(userId) {
    return new Promise(resolve => {
        daoHelper.getDocumentByPath(`walit-settings/${userId}`)
            .then(document => daoHelper.getDocumentData(document))
            .then(userSettings => resolve(userSettings));
    });
}

function retrieveUserTransactionsByType(userId, transactionsType) {
    const transactionTypeCondition = {
        fieldPath: 'type',
        opStr: '==',
        value: transactionsType
    };

    return new Promise(resolve => {
        daoHelper.getCollectionByPath(`walit-transactions/${userId}/transactions`)
            .then(userTransactionsCollection =>
                daoHelper.getCollectionWithCondition(userTransactionsCollection, transactionTypeCondition))
            .then(sameTypeTransactionsCollection => daoHelper.getCollectionData(sameTypeTransactionsCollection))
            .then(sameTypeTransactions => resolve(sameTypeTransactions));
    });
}

module.exports = router;

