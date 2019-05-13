function getTransactionsInDateRange(transactionsJson, dateAfter, dateBefore) {
    return transactionsJson.filter((transaction) => {
        return dateAfter < transaction.date.toDate() && transaction.date.toDate() < dateBefore;
    });
}

function getTransactionsAfterDate(transactionsJson, dateAfter) {
    return transactionsJson.filter((transaction) => dateAfter < transaction.date.toDate());
}

function getTransactionsBeforeDate(transactionsJson, dateBefore) {
    return transactionsJson.filter((transaction) => transaction.date.toDate() < dateBefore);
}

function getTransactionsLessThan(transactionsJson, lessThan) {
    return transactionsJson.filter((transaction) => transaction.amount < lessThan);
}

function getTransactionsMoreThan(transactionsJson, moreThan) {
    return transactionsJson.filter((transaction) => transaction.amount > moreThan);
}

function getTransactionsByCategory(transactionsJson, category) {
    return transactionsJson.filter((transaction) => transaction.category === category);
}

function getTransactionsByType(transactionsJson, type) {
    return transactionsJson.filter((transaction) => transaction.type === type);
}

function getTotal(transactionsJson) {
    let total = 0;
    for (let key in transactionsJson) {
        if (transactionsJson.hasOwnProperty(key)) {
            let transaction = transactionsJson[key];
            total += parseFloat(transaction.amount);
        }
    }
    return total;
}

function getTransactionsByDay(transactionsJson, numberOfDays) {
    let transactionsByDay = new Array(numberOfDays).fill(0);
    let total = 0;

    for (let i = 0; i < numberOfDays; i++) {
        for (let transaction of transactionsJson) {
            let transactionDate = transaction.date.toDate();
            let transactionDay = transactionDate.getDate();
            if (i + 1 === transactionDay) {
                total += parseFloat(transaction.amount);
            }
        }

        transactionsByDay[i] += total;
    }

    return transactionsByDay;
}

function getCategories(transactionsJson) {
    let categoriesSet = new Set();

    for (let transaction of transactionsJson) {
        categoriesSet.add(transaction.category);
    }

    return Array.from(categoriesSet);
}

module.exports = {
    getTransactionsInDateRange,
    getTransactionsAfterDate,
    getTransactionsBeforeDate,
    getTransactionsLessThan,
    getTransactionsMoreThan,
    getTransactionsByCategory,
    getTransactionsByType,
    getTotal,
    getTransactionsByDay,
    getCategories
};
