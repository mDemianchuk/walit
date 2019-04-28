function incrementFill(start, end) {
    let arr = new Array(end);
    for (let i = start; i <= end; i++) {
        arr[i - 1] = i;
    }
    return arr;
}

module.exports = {
    incrementFill,
};
