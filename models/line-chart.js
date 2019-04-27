const Chart = require('chart.js');

function createChart(element, lineChartLabels, currentMonthData, previousMonthData, labels, limit, currency) {
    new Chart(element, {
        type: 'line',
        data: {
            // x axis - days of the month
            labels: lineChartLabels,
            datasets: [{
                label: currentMonthData.label,
                data: currentMonthData.data,
                pointRadius: 1,
                borderWidth: 1,
                borderColor: '#000',
                fill: false,
            }, {
                label: previousMonthData.label,
                data: previousMonthData.data,
                pointRadius: 1,
                borderWidth: 1,
                borderDash: [3],
                borderColor: 'rgba(0,0,0,0.3)',
                fill: false,
            }, {
                label: labels.labels[1],
                // straight line
                data: limit,
                pointRadius: 0,
                borderWidth: 1,
                borderDash: [10],
                borderColor: labels.borderColor,
                backgroundColor: labels.backgroundColor,
                fill: 'top',
            }]
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
                    ticks: {
                        callback: function (value, index, values) {
                            return currency + value;
                        }
                    }
                }]
            }
        }
    });
}

module.exports = {
    createChart
};
