const Chart = require('chart.js');
const colorPalette = ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#c6501f', '#a595de', '#e80bac', '#81e2f4'];

function displayChart(element, labels, data) {
  new Chart(element, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        backgroundColor: colorPalette,
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
