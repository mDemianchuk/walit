const Chart = require('chart.js');

function displayChart(element, labels, backgroundColor, data) {
  new Chart(element, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        label: '$',
        backgroundColor: backgroundColor,
        data: data
      }]
    },
    options: {
      legend: {
        labels: {
          fontFamily: "'Poppins', sans-serif"
        }
      }
    }
  });
}

module.exports = {
  displayChart
};
