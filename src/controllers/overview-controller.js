const dateUtil = require('../utils/date-util');
const arrayUtil = require('../utils/array-util');
const lineChart = require('../models/line-chart');
const doughnutChart = require('../models/doughnut-chart');
const displayUtil = require('../utils/display-util');
const jsonUtil = require('../utils/json-util');

const transactionTypeSwitch = document.getElementById('transaction-type-switch');
const chartTypeSwitch = document.getElementById('chart-type-switch');
const toggleContainer = document.getElementById('toggle-container');
const expenseLineChartContainer = document.getElementById('expense-line-chart-container');
const expenseDoughnutChartContainer = document.getElementById('expense-doughnut-chart-container');
const incomeLineChartContainer = document.getElementById('income-line-chart-container');
const incomeDoughnutChartContainer = document.getElementById('income-doughnut-chart-container');
const headerTopContainer = document.getElementById('header-top');
const noTransactionsContainer = document.getElementById('no-transactions');
const signOutButton = document.getElementById('sign-out');
const loader = document.getElementById('loader');

function createLineChart(chartElementId, transactions, labels, userMax, userCurrency) {
    const lineChartElement = document.getElementById(chartElementId);

    // Array to represent a straight line on the chart
    const borderLine = new Array(31).fill(userMax);

    const lineChartLabels = arrayUtil.incrementFill(1, 31);

    const firstDayOfCurrentMonth = dateUtil.getFirstDayInMonth(0);
    const lastDayOfCurrentMonth = new Date();

    const firstDayOfPreviousMonth = dateUtil.getFirstDayInMonth(1);
    const lastDayOfPreviousMonth = dateUtil.getLastDayInMonth(1);

    const currentMonthTransactions = jsonUtil.getTransactionsInDateRange(transactions, firstDayOfCurrentMonth, lastDayOfCurrentMonth);
    const currentMonthTransactionsArray = jsonUtil.getTransactionsByDay(currentMonthTransactions, lastDayOfCurrentMonth.getDate());

    const previousMonthTransactions = jsonUtil.getTransactionsInDateRange(transactions, firstDayOfPreviousMonth, lastDayOfPreviousMonth);
    const previousMonthTransactionsArray = jsonUtil.getTransactionsByDay(previousMonthTransactions, lastDayOfPreviousMonth.getDate());

    let currentMonthData = {
        label: `${labels.labels[0]} this month`,
        data: currentMonthTransactionsArray,
    };

    let previousMonthData = {
        label: `${labels.labels[0]} previous month`,
        data: previousMonthTransactionsArray,
    };

    lineChart.createChart(lineChartElement, lineChartLabels, currentMonthData, previousMonthData, labels, borderLine, userCurrency);
}

function createDoughnutChart(chartElementId, transactions) {
    const doughnutChartElement = document.getElementById(chartElementId);

    const firstDayOfCurrentMonth = dateUtil.getFirstDayInMonth(0);
    const lastDayOfCurrentMonth = new Date();

    const currentMonthSpending = jsonUtil.getTransactionsInDateRange(transactions, firstDayOfCurrentMonth, lastDayOfCurrentMonth);
    const categories = jsonUtil.getCategories(currentMonthSpending);

    let totalSpendingInCategories = [];
    for (let category of categories) {
        const spendingPerCategory = jsonUtil.getTransactionsByCategory(currentMonthSpending, category);
        const totalSpendingPerCategory = jsonUtil.getTotal(spendingPerCategory);
        totalSpendingInCategories.push(totalSpendingPerCategory);
    }

    doughnutChart.createChart(doughnutChartElement, categories, totalSpendingInCategories);
}

async function loadThePage(userId, userSettings, userTransactions) {
    signOutButton.addEventListener('click', () => {
        firebase.auth().signOut();
    });

    const userCurrency = userSettings.currency;
    const userGoal = userSettings.goal;
    const userLimit = userSettings.limit;

    const incomeJson = [];
    const expenseJson = [];

    userTransactions.doc(userId)
        .collection('transactions')
        .where('type', '==', 'Income')
        .get()
        .then(snap => {
            snap.forEach((doc) => {
                incomeJson.push(doc.data());
            });
        })
        .then(() => {
            const incomeLabels = {
                labels: ['Made', 'Monthly goal'],
                borderColor: '#rgba(46, 204, 113, 1)',
                backgroundColor: 'rgba(46, 204, 113, 0.1)'
            };

            createLineChart('income-line-chart', incomeJson, incomeLabels, userGoal, userCurrency);
            createDoughnutChart('income-doughnut-chart', incomeJson);
        });

    await userTransactions.doc(userId)
        .collection('transactions')
        .where('type', '==', 'Expense')
        .get()
        .then(snap => {
            snap.forEach((doc) => {
                expenseJson.push(doc.data());
            });
        })
        .then(() => {
            const expenseLabels = {
                labels: ['Spent', 'Monthly limit'],
                borderColor: '#FF0000',
                backgroundColor: 'rgba(255,0,0,0.1)',
            };

            createLineChart('expense-line-chart', expenseJson, expenseLabels, userLimit, userCurrency);
            createDoughnutChart('expense-doughnut-chart', expenseJson);
        });

    displayUtil.hideElement(loader);

    if (expenseJson.length === 0 || incomeJson.length === 0) {
        displayUtil.displayElement(noTransactionsContainer);
    } else {
        displayUtil.displayElement(toggleContainer);
        displayUtil.displayElement(incomeLineChartContainer);
        displayUtil.displayElement(headerTopContainer);

        transactionTypeSwitch.addEventListener('change', () => {
            if (transactionTypeSwitch.checked) {
                if (incomeLineChartContainer.style.display === 'block') {
                    displayUtil.toggleElements(incomeLineChartContainer, expenseLineChartContainer);
                } else if (incomeDoughnutChartContainer.style.display === 'block') {
                    displayUtil.toggleElements(incomeDoughnutChartContainer, expenseDoughnutChartContainer);
                }
            } else {
                if (expenseLineChartContainer.style.display === 'block') {
                    displayUtil.toggleElements(expenseLineChartContainer, incomeLineChartContainer);
                } else if (expenseDoughnutChartContainer.style.display === 'block') {
                    displayUtil.toggleElements(expenseDoughnutChartContainer, incomeDoughnutChartContainer);
                }
            }
        });

        chartTypeSwitch.addEventListener('change', () => {
            if (chartTypeSwitch.checked) {
                if (expenseLineChartContainer.style.display === 'block') {
                    displayUtil.toggleElements(expenseLineChartContainer, expenseDoughnutChartContainer);
                } else if (incomeLineChartContainer.style.display === 'block') {
                    displayUtil.toggleElements(incomeLineChartContainer, incomeDoughnutChartContainer);
                }
            } else {
                if (incomeDoughnutChartContainer.style.display === 'block') {
                    displayUtil.toggleElements(incomeDoughnutChartContainer, incomeLineChartContainer);
                } else if (expenseDoughnutChartContainer.style.display === 'block') {
                    displayUtil.toggleElements(expenseDoughnutChartContainer, expenseLineChartContainer);
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let userSettings = null;
            firebase.firestore()
                .collection('walit-settings')
                .doc(user.uid)
                .get()
                .then(settings => {
                    userSettings = settings.data();
                })
                .then(() => {
                    const userTransactions = firebase.firestore()
                        .collection('walit-transactions');
                    loadThePage(user.uid, userSettings, userTransactions)
                });
        } else {
            window.location.replace('/login');
        }
    });
});
