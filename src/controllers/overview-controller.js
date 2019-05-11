const daoHelper = require('../dao/dao-helper');
const authHelper = require('../dao/auth-helper');
const chartUtil = require('../utils/chart-util');
const displayUtil = require('../utils/display-util');
const redirectUtil = require('../utils/redirect-util');

document.addEventListener('DOMContentLoaded', () => {
    const signOutButton = document.getElementById('sign-out');

    authHelper.addSignInObserver(user => {
        if (authHelper.isSignedIn(user)) {
            retrieveUserData(user.uid)
                .then(userData => loadPage(userData));

            signOutButton.addEventListener('click', () => {
                authHelper.signOut()
                    .catch(error => alert(error));
            });
        } else {
            redirectUtil.redirectToPage('/login');
        }
    });
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

function retrieveUserSettings(userId) {
    return new Promise(resolve => {
        daoHelper.getDocumentByPath(`walit-settings/${userId}`)
            .then(document => daoHelper.getDocumentData(document))
            .then(userSettings => resolve(userSettings));
    });
}

function loadPage(userData) {
    const loaderAnimation = document.getElementById('loader');
    const chartTypeSwitch = document.getElementById('chart-type-switch');
    const transactionTypeSwitch = document.getElementById('transaction-type-switch');
    const toggleButtonContainer = document.getElementById('toggle-container');
    const headerTopContainer = document.getElementById('header-top');
    const noTransactionsContainer = document.getElementById('no-transactions');
    const incomeLineChartContainer = document.getElementById('income-line-chart-container');
    const expenseLineChartContainer = document.getElementById('expense-line-chart-container');
    const incomeDoughnutChartContainer = document.getElementById('income-doughnut-chart-container');
    const expenseDoughnutChartContainer = document.getElementById('expense-doughnut-chart-container');

    displayUtil.hideElement(loaderAnimation);

    if (isEnoughTransactionsToDisplay(userData)) {
        createCharts(userData);

        displayUtil.displayElement(toggleButtonContainer);
        displayUtil.displayElement(incomeLineChartContainer);
        displayUtil.displayElement(headerTopContainer);

        activateSwitchElement(transactionTypeSwitch,
            incomeLineChartContainer,
            expenseLineChartContainer,
            incomeDoughnutChartContainer,
            expenseDoughnutChartContainer
        );

        activateSwitchElement(chartTypeSwitch,
            incomeLineChartContainer,
            incomeDoughnutChartContainer,
            expenseLineChartContainer,
            expenseDoughnutChartContainer
        );

    } else {
        displayUtil.displayElement(noTransactionsContainer);
    }
}

function isEnoughTransactionsToDisplay(userData) {
    return userData.income.length > 0 && userData.expense.length > 0;
}

function createCharts(userData) {
    const userIncome = userData.income;
    const userExpense = userData.expense;
    const userCurrency = userData.settings.currency;
    const userGoal = userData.settings.goal;
    const userLimit = userData.settings.limit;

    chartUtil.createDoughnutChart('income-doughnut-chart', userIncome);
    chartUtil.createDoughnutChart('expense-doughnut-chart', userExpense);
    chartUtil.createLineChart('Income', 'income-line-chart', userIncome, userGoal, userCurrency);
    chartUtil.createLineChart('Expense', 'expense-line-chart', userExpense, userLimit, userCurrency);
}

function activateSwitchElement(switchElement, container1, container2, container3, container4) {
    switchElement.addEventListener('change', () => {
        if (switchElement.checked) {
            if (displayUtil.isVisible(container1)) {
                displayUtil.toggleElements(container1, container2);
            } else if (displayUtil.isVisible(container3)) {
                displayUtil.toggleElements(container3, container4);
            }
        } else {
            if (displayUtil.isVisible(container2)) {
                displayUtil.toggleElements(container2, container1);
            } else if (displayUtil.isVisible(container4)) {
                displayUtil.toggleElements(container4, container3);
            }
        }
    });
}