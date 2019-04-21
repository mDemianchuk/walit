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

// hidden by default
displayUtil.hideElement(doughnutChartContainer);

doughnutChartButton.addEventListener('click', () => {
    toggleCharts(lineChartContainer, doughnutChartContainer);
});

lineChartButton.addEventListener('click', () => {
    toggleCharts(doughnutChartContainer, lineChartContainer);
});

function toggleCharts(chart1, chart2) {
    displayUtil.hideElement(chart1);
    displayUtil.displayElement(chart2);
}

const transactionsJson = jsonUtil.parseJson(localStorage.getItem('ls-transactions'));
const spendingJson = jsonUtil.getTransactionsByType(transactionsJson, 'Expense');

/* Line Chart */
if (spendingJson) {
    const lineChartElement = document.getElementById('line-chart');

    // Array to represent a straight line on the chart
    const limit = new Array(31).fill(3000);

    const lineChartLabels = arrayUtil.incrementFill(1, 31);

    const firstDayOfCurrentMonth = dateUtil.getFirstDayInMonth(0);
    const lastDayOfCurrentMonth = new Date();

    const firstDayOfPreviousMonth = dateUtil.getFirstDayInMonth(1);
    const lastDayOfPreviousMonth = dateUtil.getLastDayInMonth(1);

    const currentMonthTransactions = jsonUtil.getTransactionsInDateRange(spendingJson, firstDayOfCurrentMonth, lastDayOfCurrentMonth);
    const currentMonthDailySpendingArray = jsonUtil.getDailySpending(currentMonthTransactions, lastDayOfCurrentMonth.getDate());

    const previousMonthTransactions = jsonUtil.getTransactionsInDateRange(spendingJson, firstDayOfPreviousMonth, lastDayOfPreviousMonth);
    const previousMonthDailySpendingArray = jsonUtil.getDailySpending(previousMonthTransactions, lastDayOfPreviousMonth.getDate());

    lineChart.displayChart(lineChartElement, lineChartLabels, currentMonthDailySpendingArray, previousMonthDailySpendingArray, limit);
}
/* End of Line Chart */


/* Doughnut Chart */
if (spendingJson) {
    const doughnutChartElement = document.getElementById('doughnut-chart');

    const firstDayOfCurrentMonth = dateUtil.getFirstDayInMonth(0);
    const lastDayOfCurrentMonth = new Date();

    const currentMonthSpending = jsonUtil.getTransactionsInDateRange(spendingJson, firstDayOfCurrentMonth, lastDayOfCurrentMonth);
    const categories = jsonUtil.getCategories(currentMonthSpending);

    let totalSpendingInCategories = [];
    for (let category of categories) {
        const spendingPerCategory = jsonUtil.getTransactionsByCategory(currentMonthSpending, category);
        const totalSpendingPerCategory = jsonUtil.getTotalSpent(spendingPerCategory);
        totalSpendingInCategories.push(totalSpendingPerCategory);
    }

    doughnutChart.displayChart(doughnutChartElement, categories, totalSpendingInCategories);
}
/* End of Doughnut Chart */
