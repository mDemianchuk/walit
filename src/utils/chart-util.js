const dateUtil = require('./date-util');
const arrayUtil = require('./array-util');
const jsonUtil = require('../utils/json-util');
const lineChart = require('../models/line-chart');
const doughnutChart = require('../models/doughnut-chart');

const incomeLabels = {
    labels: ['Made', 'Monthly goal'],
    borderColor: '#rgba(46, 204, 113, 1)',
    backgroundColor: 'rgba(46, 204, 113, 0.1)'
};

const expenseLabels = {
    labels: ['Spent', 'Monthly limit'],
    borderColor: '#FF0000',
    backgroundColor: 'rgba(255,0,0,0.1)',
};

function createLineChart(type, chartElementId, transactions, userMax, userCurrency) {

    const labels = (type === 'Income') ? incomeLabels : expenseLabels;

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

module.exports = {
    createLineChart,
    createDoughnutChart
};