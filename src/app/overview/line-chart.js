new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
        // days of the month
        labels: fillArray(1,31,31),
        datasets: [{
            label: "Spent this month",
            data: [86,86,100,106,107, 200, 500, 634, 800, 1110],
            pointRadius: 0,
            borderWidth: 1,
            borderColor: "#000",
            fill: false,
        }, {
            label: 'Limit',
            fill: 'top',
            backgroundColor: "rgba(255,0,0,0.1)",
            borderColor: "#FF0000",
            borderWidth: 1,
            pointRadius: 0,
            borderDash: [10],
            // straight line
            data: fillArray(1000,1000,31),
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

function fillArray(start, end, len) {
    if(start == end) {
        return Array(len).fill(start);
    } else {
        var arr = new Array(len);
        for(var i = start; i <= end; i++) {
            arr[i-1] = i;
        }
        return arr;
    }
}


