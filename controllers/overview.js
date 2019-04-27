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

function createLineChart(chartElementId, json, labels, userMax, userCurrency) {
    const lineChartElement = document.getElementById(chartElementId);

    // Array to represent a straight line on the chart
    const borderLine = new Array(31).fill(userMax);

    const lineChartLabels = arrayUtil.incrementFill(1, 31);

    const firstDayOfCurrentMonth = dateUtil.getFirstDayInMonth(0);
    const lastDayOfCurrentMonth = new Date();

    const firstDayOfPreviousMonth = dateUtil.getFirstDayInMonth(1);
    const lastDayOfPreviousMonth = dateUtil.getLastDayInMonth(1);

    const currentMonthTransactions = jsonUtil.getTransactionsInDateRange(json, firstDayOfCurrentMonth, lastDayOfCurrentMonth);
    const currentMonthTransactionsArray = jsonUtil.getTransactionsByDay(currentMonthTransactions, lastDayOfCurrentMonth.getDate());

    const previousMonthTransactions = jsonUtil.getTransactionsInDateRange(json, firstDayOfPreviousMonth, lastDayOfPreviousMonth);
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

function createDoughnutChart(chartElementId, json) {
    const doughnutChartElement = document.getElementById(chartElementId);

    const firstDayOfCurrentMonth = dateUtil.getFirstDayInMonth(0);
    const lastDayOfCurrentMonth = new Date();

    const currentMonthSpending = jsonUtil.getTransactionsInDateRange(json, firstDayOfCurrentMonth, lastDayOfCurrentMonth);
    const categories = jsonUtil.getCategories(currentMonthSpending);

    let totalSpendingInCategories = [];
    for (let category of categories) {
        const spendingPerCategory = jsonUtil.getTransactionsByCategory(currentMonthSpending, category);
        const totalSpendingPerCategory = jsonUtil.getTotal(spendingPerCategory);
        totalSpendingInCategories.push(totalSpendingPerCategory);
    }

    doughnutChart.createChart(doughnutChartElement, categories, totalSpendingInCategories);
}

// retrieving the list of transactions from local storage
const transactionsJson = jsonUtil.parseJson(localStorage.getItem('ls-transactions'));
if (jsonUtil.isValidJson(transactionsJson)) {
    const incomeJson = jsonUtil.getTransactionsByType(transactionsJson, 'Income');
    const expenseJson = jsonUtil.getTransactionsByType(transactionsJson, 'Expense');

    let userCurrency = '$';
    let userLimit = 3000;
    let userGoal = 4000;
    const userSettings = localStorage.getItem('user-settings');
    const userSettingsJson = JSON.parse(userSettings);
    if (jsonUtil.isValidJson(userSettingsJson)) {
        if (userSettingsJson.currency) {
            userCurrency = userSettingsJson.currency;
        }
        if (userSettingsJson.limit && !isNaN(parseFloat(userSettingsJson.limit))) {
            userLimit = userSettingsJson.limit;
        }
        if (userSettingsJson.goal && !isNaN(parseFloat(userSettingsJson.goal))) {
            userGoal = userSettingsJson.goal;
        }
    }

    const expenseLabels = {
        labels: ['Spent', 'Monthly limit'],
        borderColor: '#FF0000',
        backgroundColor: 'rgba(255,0,0,0.1)',
    };

    const incomeLabels = {
        labels: ['Made', 'Monthly goal'],
        borderColor: '#rgba(46, 204, 113, 1)',
        backgroundColor: 'rgba(46, 204, 113, 0.1)'
    };

    createLineChart('income-line-chart', incomeJson, incomeLabels, userGoal, userCurrency);
    createDoughnutChart('income-doughnut-chart', incomeJson);
    createLineChart('expense-line-chart', expenseJson, expenseLabels, userLimit, userCurrency);
    createDoughnutChart('expense-doughnut-chart', expenseJson);

    displayUtil.hideElement(noTransactionsContainer);
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
