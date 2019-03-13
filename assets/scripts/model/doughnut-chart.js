const Chart = require('chart.js');

Chart.defaults.global.defaultFontSize = 14;

new Chart(document.getElementById('doughnut-chart'), {
    type: 'doughnut',
    data: {
        labels: ['Rent', 'Tuition', 'Bills', 'Gas', 'Insurance'],
        datasets: [
            {
                label: '$',
                backgroundColor: ['#3e95cd', '#8e5ea2','#3cba9f','#e8c3b9','#c45850'],
                data: [600,1000,234,112,75]
            }
        ]
    },
    options: {
        responsive: false
    }
});