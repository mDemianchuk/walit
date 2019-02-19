new Chart(document.getElementById('line-chart'), {
    type: 'line',
    data: {
        // x axis - days of the month
        labels: incrementFill(1, 31),
        datasets: [{
            label: 'Spent this month',
            data: randomFill(getNumberOfDaysInCurrentMonth(), 15),
            pointRadius: 1,
            borderWidth: 1,
            borderColor: '#000',
            fill: false,
        }, {
            label: 'Spent previous month',
            data: randomFill(getNumberOfDaysInPreviousMonth(), 15),
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
        title: {
            display: true,
            text: 'Spent in February'
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

function incrementFill(start, end) {
    let arr = new Array(end);
    for (let i = start; i <= end; i++) {
        arr[i - 1] = i;
    }
    return arr;
}

function randomFill(len, step) {
    let arr = new Array(len);
    let sum = 0;
    for (let i = 1; i <= len; i++) {
        sum += i * (Math.floor(Math.random() * step) + 1);
        arr[i - 1] = sum;
    }
    return arr;
}

function getNumberOfDaysInCurrentMonth() {
    return new Date().getDate();
}

function getNumberOfDaysInPreviousMonth() {
    let currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0).getDate();
}
