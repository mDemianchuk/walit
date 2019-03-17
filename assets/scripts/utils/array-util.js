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

module.exports = {
    incrementFill,
    randomFill
};