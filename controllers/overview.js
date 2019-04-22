const dateUtil = require('../utils/date-util');
const arrayUtil = require('../utils/array-util');
const lineChart = require('../models/line-chart');
const doughnutChart = require('../models/doughnut-chart');
const displayUtil = require('../utils/display-util');
const jsonUtil = require('../utils/json-util');

const lineChartButton = document.getElementById('line-chart-button');
const lineChartContainer = document.getElementById('line-chart-container');
const doughnutChartButton = document.getElementById('doughnut-chart-button');
const doughnutChartContainer = document.getElementById('doughnut-chart-container');
const headerTopContainer = document.getElementById('header-top');
const noTransactionsContainer = document.getElementById('no-transactions');
const buttonContainer = document.getElementById('button-container');

function createAndDisplayLineChart(json) {
    const lineChartElement = document.getElementById('line-chart');


    let currency = '$';
    let userLimit = 3000;
    const userSettings = localStorage.getItem('user-settings');
    const userSettingsJson = JSON.parse(userSettings);
    if (jsonUtil.isValidJson(userSettingsJson)) {
        if (userSettingsJson.currency) {
            currency = userSettingsJson.currency;
        }
        if(!isNaN(parseFloat(userSettingsJson.limit))) {
            userLimit = userSettingsJson.limit;
        }
    }


    // Array to represent a straight line on the chart
    const limit = new Array(31).fill(userLimit);

    const lineChartLabels = arrayUtil.incrementFill(1, 31);

    const firstDayOfCurrentMonth = dateUtil.getFirstDayInMonth(0);
    const lastDayOfCurrentMonth = new Date();

    const firstDayOfPreviousMonth = dateUtil.getFirstDayInMonth(1);
    const lastDayOfPreviousMonth = dateUtil.getLastDayInMonth(1);

    const currentMonthTransactions = jsonUtil.getTransactionsInDateRange(json, firstDayOfCurrentMonth, lastDayOfCurrentMonth);
    const currentMonthDailySpendingArray = jsonUtil.getDailySpending(currentMonthTransactions, lastDayOfCurrentMonth.getDate());

    const previousMonthTransactions = jsonUtil.getTransactionsInDateRange(json, firstDayOfPreviousMonth, lastDayOfPreviousMonth);
    const previousMonthDailySpendingArray = jsonUtil.getDailySpending(previousMonthTransactions, lastDayOfPreviousMonth.getDate());

    lineChart.createChart(lineChartElement, lineChartLabels, currentMonthDailySpendingArray, previousMonthDailySpendingArray, limit, currency);

    displayUtil.displayElement(lineChartContainer);
}

function createDoughnutChart(json) {
    const doughnutChartElement = document.getElementById('doughnut-chart');

    const firstDayOfCurrentMonth = dateUtil.getFirstDayInMonth(0);
    const lastDayOfCurrentMonth = new Date();

    const currentMonthSpending = jsonUtil.getTransactionsInDateRange(json, firstDayOfCurrentMonth, lastDayOfCurrentMonth);
    const categories = jsonUtil.getCategories(currentMonthSpending);

    let totalSpendingInCategories = [];
    for (let category of categories) {
        const spendingPerCategory = jsonUtil.getTransactionsByCategory(currentMonthSpending, category);
        const totalSpendingPerCategory = jsonUtil.getTotalSpent(spendingPerCategory);
        totalSpendingInCategories.push(totalSpendingPerCategory);
    }

    doughnutChart.createChart(doughnutChartElement, categories, totalSpendingInCategories);
}

// retrieving the list of transactions from local storage
const transactionsJson = jsonUtil.parseJson(localStorage.getItem('ls-transactions'));
if (jsonUtil.isValidJson(transactionsJson)) {
    const spendingJson = jsonUtil.getTransactionsByType(transactionsJson, 'Expense');

    if (jsonUtil.isValidJson(spendingJson)) {
        displayUtil.hideElement(noTransactionsContainer);
        displayUtil.displayElement(headerTopContainer);
        displayUtil.displayElement(buttonContainer);

        createAndDisplayLineChart(spendingJson);
        createDoughnutChart(spendingJson);

        doughnutChartButton.addEventListener('click', () => {
            displayUtil.toggleElements(lineChartContainer, doughnutChartContainer);
        });

        lineChartButton.addEventListener('click', () => {
            displayUtil.toggleElements(doughnutChartContainer, lineChartContainer);
        });
    }
}
