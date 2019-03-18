const Transaction = require('./model/transaction');
const jsonUtil = require('./utils/json-util');
const dateUtil = require('./utils/date-util');

function displayTable() {
    for (let transaction of transactionList) {
        displayTransaction(transaction);
    }
}

function displayTransaction(transaction) {
    transactionDiv.style.display = 'block';

    let transactionTable = document.getElementById('transaction-table');

    let row = transactionTable.insertRow();

    let dateColumn = row.insertCell(0);
    dateColumn.innerHTML = dateUtil.getShortDate(transaction.date);

    let descriptionColumn = row.insertCell(1);
    descriptionColumn.innerHTML = transaction.description;

    let categoryColumn = row.insertCell(2);
    categoryColumn.innerHTML = transaction.category;

    let amountColumn = row.insertCell(3);
    amountColumn.innerHTML = transaction.amount;

    let typeColumn = row.insertCell(4);
    typeColumn.innerHTML = transaction.type;
}

let transactionDiv = document.getElementById('transactions');
transactionDiv.style.display = 'none';

let jsonString = localStorage.getItem('transactions');

let transactionList = (jsonString === null) ? [] : jsonUtil.jsonToList(jsonString);
if (transactionList.length > 0) {
    displayTable();
}

let addButton = document.getElementById('add-button');
addButton.addEventListener('click', () => {
    let date = new Date(document.getElementById('date').value);
    let type = document.getElementById('type').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    let amount = document.getElementById('amount').value;

    let transaction = new Transaction(date, type, description, category, amount);
    transactionList.push(transaction);

    jsonString = JSON.stringify(transactionList);
    localStorage.setItem('transactions', jsonString);
    displayTransaction(transaction);
});

// TODO: implement editing/removing a transaction