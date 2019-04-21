function parseJson(jsonString) {
    if (!jsonString) {
        return {};
    }

    let transactionsJson = JSON.parse(jsonString);

    for (let transaction of transactionsJson) {
        transaction.date = new Date(transaction.date);
    }

    return transactionsJson;
}

function getTransactionsInDateRange(transactionsJson, fromDate, toDate) {
    return transactionsJson.filter((transaction) => fromDate < transaction['date'] && transaction['date'] < toDate);
}

function getTransactionsByCategory(transactionsJson, category) {
    return transactionsJson.filter((transaction) => transaction.category === category);
}

function getTransactionsByType(transactionsJson, type) {
    return transactionsJson.filter((transaction) => transaction.type === type);
}

function getTotalSpent(transactionsJson) {
    let totalSpent = 0;
    for (let key in transactionsJson) {
        if (transactionsJson.hasOwnProperty(key)) {
            let transaction = transactionsJson[key];
            totalSpent += parseInt(transaction.amount);
        }
    }
    return totalSpent;
}

function getDailySpending(transactionsJson, numberOfDays) {
    let dailySpending = new Array(numberOfDays).fill(0);
    let totalSpent = 0;

    for (let i = 0; i < numberOfDays; i++) {
        dailySpending[i] += totalSpent;
        for (let transaction of transactionsJson) {
            let transactionDate = transaction.date;
            let transactionDay = transactionDate.getDate();
            if (i === transactionDay) {
                totalSpent += parseInt(transaction.amount);
                dailySpending[i] += parseInt(transaction.amount);
            }
        }
    }

    return dailySpending;
}

function getCategories(transactionsJson) {
    let categoriesSet = new Set();

    for (let transaction of transactionsJson) {
        categoriesSet.add(transaction.category);
    }

    return Array.from(categoriesSet);
}

module.exports = {
    parseJson,
    getTransactionsInDateRange,
    getTransactionsByCategory,
    getTransactionsByType,
    getTotalSpent,
    getDailySpending,
    getCategories
};
