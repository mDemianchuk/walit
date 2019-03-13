const Chart = require('chart.js');
const dateUtil = require('./../utils/date-util');
const arrayUtil = require('./../utils/array-util');

new Chart(document.getElementById('line-chart'), {
    type: 'line',
    data: {
        // x axis - days of the month
        labels: arrayUtil.incrementFill(1, 31),
        datasets: [{
            label: 'Spent this month',
            data: arrayUtil.randomFill(dateUtil.getNumberOfDaysInCurrentMonth(), 15),
            pointRadius: 1,
            borderWidth: 1,
            borderColor: '#000',
            fill: false,
        }, {
            label: 'Spent previous month',
            data: arrayUtil.randomFill(dateUtil.getNumberOfDaysInPreviousMonth(), 15),
            pointRadius: 0,
            borderWidth: 1,
            borderDash: [3],
            borderColor: 'rgba(0,0,0,0.3)',
            fill: false,
        }, {
            label: 'Limit',
            // straight line
            data: new Array(31).fill(3000),
            pointRadius: 0,
            borderWidth: 1,
            borderDash: [10],
            borderColor: '#FF0000',
            backgroundColor: 'rgba(255,0,0,0.1)',
            fill: 'top',
        },
        ]
    },
    options: {
        responsive: false,
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

