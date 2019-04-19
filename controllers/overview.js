const dateUtil = require('../utils/date-util');
const arrayUtil = require('../utils/array-util');
const lineChart = require('../models/line-chart');
const doughnutChart = require('../models/doughnut-chart');
const displayUtil = require('../utils/display-util');

let lineChartButton = document.getElementById('line-chart-button');
let lineChartContainer = document.getElementById('line-chart-container');
let doughnutChartButton = document.getElementById('doughnut-chart-button');
let doughnutChartContainer = document.getElementById('doughnut-chart-container');

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

/* Line Chart */

let lineChartElement = document.getElementById('line-chart');

// Randomly filled arrays
let currentMonthData = arrayUtil.randomFill(dateUtil.getNumberOfDaysInCurrentMonth(), 15);
let previousMonthData = arrayUtil.randomFill(dateUtil.getNumberOfDaysInPreviousMonth(), 15);
let lineChartLabels = arrayUtil.incrementFill(1, 31);

// Array to represent a straight line on the chart
let limit = new Array(31).fill(3000);

lineChart.displayChart(lineChartElement, lineChartLabels, currentMonthData, previousMonthData, limit);

/* End of Line Chart */


/* Doughnut Chart */

let doughnutChartElement = document.getElementById('doughnut-chart');

let doughnutChartLabels = ['Rent', 'Tuition', 'Bills', 'Gas', 'Insurance'];
let backgroundColors = ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'];
let data = [600, 1000, 234, 112, 75];

doughnutChart.displayChart(doughnutChartElement, doughnutChartLabels, backgroundColors, data);

/* End of Doughnut Chart */
