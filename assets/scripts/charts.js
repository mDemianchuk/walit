const dateUtil = require('./utils/date-util.js');
const arrayUtil = require('./utils/array-util.js');
const lineChart = require('./model/line-chart');
const doughnutChart = require('./model/doughnut-chart');

// Canvas element
let lineChartElement = document.getElementById('line-chart');

// Randomly filled arrays
let currentMonthData = arrayUtil.randomFill(dateUtil.getNumberOfDaysInCurrentMonth(), 15);
let previousMonthData = arrayUtil.randomFill(dateUtil.getNumberOfDaysInPreviousMonth(), 15);
let lineChartLabels = arrayUtil.incrementFill(1, 31);

// Array to represent a straight line on the chart
let limit = new Array(31).fill(3000);

lineChart.displayChart(lineChartElement, lineChartLabels, currentMonthData, previousMonthData, limit);

// Canvas element
let doughnutChartElement = document.getElementById('doughnut-chart');

let doughnutChartLabels = ['Rent', 'Tuition', 'Bills', 'Gas', 'Insurance'];
let backgroundColors = ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'];
let data = [600, 1000, 234, 112, 75];

doughnutChart.displayChart(doughnutChartElement, doughnutChartLabels, backgroundColors, data);