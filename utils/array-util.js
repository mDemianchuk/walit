function incrementFill(start, end) {
    let arr = new Array(end);
    for (let i = start; i <= end; i++) {
        arr[i - 1] = i;
    }
    return arr;
}

function jsonFill(transactionsJson, fromDate, toDate) {
    let sizeOfArray = toDate.getDate();
    let arr = new Array(sizeOfArray).fill(0);

    let sum = 0;
    for(let i = 0; i < sizeOfArray; i++) {
        arr[i] += sum;
        for (let key in transactionsJson) {
            let transaction = transactionsJson[key];
            let transactionDate = transaction.date;
            let transactionDay = transactionDate.getDate();
            if (i === transactionDay && fromDate < transactionDate && transactionDate < toDate) {
                sum += parseInt(transaction.amount);
                arr[i] += parseInt(transaction.amount);
            }
        }
    }

    return arr;
}

module.exports = {
    incrementFill,
    jsonFill
};
