function parseJson(jsonString) {
    if (!jsonString) {
        return [];
    }

    let transactionsJson = JSON.parse(jsonString);

    for (let transaction of transactionsJson) {
        transaction.date = new Date(transaction.date);
    }

    return transactionsJson;
}

function getTransactionsInDateRange(transactionsJson, dateAfter, dateBefore) {
    return transactionsJson.filter((transaction) => dateAfter < transaction.date && transaction.date < dateBefore);
}

function getTransactionsAfterDate(transactionsJson, dateAfter) {
    return transactionsJson.filter((transaction) => dateAfter < transaction.date);
}

function getTransactionsBeforeDate(transactionsJson, dateBefore) {
    return transactionsJson.filter((transaction) => transaction.date < dateBefore);
}

function getTransactionsLessThan(transactionsJson, lessThan) {
    return transactionsJson.filter((transaction) => lessThan < transaction.amount);
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

function getTransactionByUuid(transactionsJson, transactionUuid) {
    return transactionsJson.filter((transaction) => transaction.uuid === transactionUuid);
}

function updateTransactionByUuid(transactionsJson, newTransaction) {
    transactionsJson.forEach(function (transaction) {
        if (transaction.uuid === newTransaction.uuid) {
            transaction.date = newTransaction.date;
            transaction.type = newTransaction.type;
            transaction.description = newTransaction.description;
            transaction.category = newTransaction.category;
            transaction.amount = newTransaction.amount;
        }
    });
}

function deleteTransactionByUuid(transactionsJson, transactionUuid) {
    return transactionsJson.filter((transaction) => transaction.uuid !== transactionUuid);
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
        transactionsByDay[i] += total;
        for (let transaction of transactionsJson) {
            let transactionDate = transaction.date;
            let transactionDay = transactionDate.getDate();
            if (i === transactionDay) {
                total += parseFloat(transaction.amount);
                transactionsByDay[i] += parseFloat(transaction.amount);
            }
        }
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

function sortJsonByProperty(transactionsJson, property) {
    return transactionsJson.sort((a, b) => (a[property] < b[property]) ? 1 : -1)
}

function isValidJson(json) {
    return !(json === undefined || json === null || json.length === 0);
}

module.exports = {
    parseJson,
    getTransactionsInDateRange,
    getTransactionsAfterDate,
    getTransactionsBeforeDate,
    getTransactionsLessThan,
    getTransactionsMoreThan,
    getTransactionsByCategory,
    getTransactionsByType,
    getTotal,
    getTransactionsByDay,
    getCategories,
    sortJsonByProperty,
    isValidJson,
    getTransactionByUuid,
    updateTransactionByUuid,
    deleteTransactionByUuid
};
