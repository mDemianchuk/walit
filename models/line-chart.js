const Chart = require('chart.js');

function createChart(element, labels, currentMonthData, previousMonthData, limit) {
  new Chart(element, {
    type: 'line',
    data: {
      // x axis - days of the month
      labels: labels,
      datasets: [{
        label: 'Spent this month',
        data: currentMonthData,
        pointRadius: 1,
        borderWidth: 1,
        borderColor: '#000',
        fill: false,
      }, {
        label: 'Spent previous month',
        data: previousMonthData,
        pointRadius: 1,
        borderWidth: 1,
        borderDash: [3],
        borderColor: 'rgba(0,0,0,0.3)',
        fill: false,
      }, {
        label: 'Limit',
        // straight line
        data: limit,
        pointRadius: 0,
        borderWidth: 1,
        borderDash: [10],
        borderColor: '#FF0000',
        backgroundColor: 'rgba(255,0,0,0.1)',
        fill: 'top',
      }, ]
    },
    options: {
      legend: {
        labels: {
          fontFamily: "'Poppins', sans-serif"
        }
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    }
  });
}

module.exports = {
  createChart
};
