const Transaction = require('../models/transaction');
const jsonUtil = require('../utils/json-util');
const dateUtil = require('../utils/date-util');
const displayUtil = require('../utils/display-util');
const CustomValidator = require('../utils/validate/transactions-validate');

const transactionContainer = document.getElementById('transactions-container');
const transactionTableBody = document.getElementById('transactions-table-body');

const addTransactionButton = document.getElementById('add-transaction-button');
const findTransactionsButton = document.getElementById('find-transactions-button');

const addTransactionModal = document.getElementById('add-transaction-modal');
const findTransactionsModal = document.getElementById('find-transactions-modal');

const addTransactionForm = document.getElementById('add-transaction-form');
const findTransactionsForm = document.getElementById('find-transactions-form');

const headerTopContainer = document.getElementById('header-top');
const noTransactionsContainer = document.getElementById('no-transactions');


const addTransactionFormValidationRules = [{
    name: 'add-description',
    display: 'Description',
    rules: 'required|alpha_numeric'
}, {
    name: 'add-category',
    display: 'Category',
    rules: 'required|alpha_numeric'
}, {
    name: 'add-date',
    display: 'Date',
    rules: 'required'
}, {
    name: 'add-how-often',
    display: 'How Often',
    rules: 'required'
}, {
    name: 'add-amount',
    display: 'Amount',
    rules: 'required'
}, {
    name: 'add-type',
    display: 'Type',
    rules: 'required'
}];

const findTransactionsFormValidationRules = [{
    name: 'find-category',
    display: 'Category',
    rules: 'alpha_numeric'
}, {
    name: 'find-type',
    display: 'Type',
    rules: 'alpha_numeric'
}, {
    name: 'find-date-after',
    display: 'After the date',
    rules: ''
}, {
    name: 'find-date-before',
    display: 'Before the date',
    rules: ''
}, {
    name: 'find-less-than',
    display: 'Less than',
    rules: ''
}, {
    name: 'find-more-than',
    display: 'More than',
    rules: ''
}];

//form validators
const addTransactionFormValidator = new CustomValidator('add-transaction-form', addTransactionFormValidationRules);
const findTransactionsFormValidator = new CustomValidator('find-transactions-form', findTransactionsFormValidationRules);

function addAndDisplayTransactions(transactionsJson) {
    for (let transaction of transactionsJson) {
        // creating a row in transactions table for a new transaction
        let row = transactionTableBody.insertRow();

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

    displayUtil.displayElement(transactionContainer);
}

// retrieving the list of transactions from local storage
const filteredJson = jsonUtil.parseJson(localStorage.getItem('filtered-transactions'));
let transactionsJson = jsonUtil.parseJson(localStorage.getItem('ls-transactions'));

if(jsonUtil.isValidJson(filteredJson)) {
    transactionsJson = filteredJson;
}

if (jsonUtil.isValidJson(transactionsJson)) {
    transactionsJson = jsonUtil.sortJsonByProperty(transactionsJson, 'date');
    displayUtil.hideElement(noTransactionsContainer);
    displayUtil.displayElement(headerTopContainer);
    addAndDisplayTransactions(transactionsJson);
    localStorage.setItem('filtered-transactions', '');
}

// adding event listeners
addTransactionButton.addEventListener('click', () => {
    displayUtil.displayElement(addTransactionModal);
});

findTransactionsButton.addEventListener('click', () => {
    displayUtil.displayElement(findTransactionsModal);
});

window.addEventListener('click', (event) => {
    if (event.target === addTransactionModal) {
        displayUtil.hideElement(addTransactionModal);
    } else if (event.target === findTransactionsModal) {
        displayUtil.hideElement(findTransactionsModal);
    }
});

addTransactionForm.addEventListener('submit', () => {
    if (CustomValidator.prototype.isValid) {
        // getting the values from the input form
        let date = new Date(document.getElementById('add-date').value);
        let type = document.getElementById('add-type').value;
        let description = document.getElementById('add-description').value;
        let category = document.getElementById('add-category').value;
        let amount = document.getElementById('add-amount').value;

        // creating a new Transaction object
        let transaction = new Transaction(date, type, description, category, amount);

        // adding to the list of transactions
        transactionsJson.push(transaction);

        // storing the list to local storage
        let jsonString = JSON.stringify(transactionsJson);
        localStorage.setItem('ls-transactions', jsonString);
    }
});

findTransactionsForm.addEventListener('submit', () => {
    if (CustomValidator.prototype.isValid) {
        // getting the values from the input form
        let dateAfter = new Date(document.getElementById('find-date-after').value);
        let dateBefore = new Date(document.getElementById('find-date-before').value);
        let type = document.getElementById('find-type').value;
        let category = document.getElementById('find-category').value;
        let lessThan = parseInt(document.getElementById('find-less-than').value);
        let moreThan = parseInt(document.getElementById('find-more-than').value);

        let filteredTransactions = transactionsJson;

        if (!isNaN(dateAfter.getDate())) {
            filteredTransactions = jsonUtil.getTransactionsAfterDate(filteredTransactions, dateAfter);
        }
        if (!isNaN(dateBefore.getDate())) {
            filteredTransactions = jsonUtil.getTransactionsBeforeDate(filteredTransactions, dateBefore);
        }
        if (type) {
            filteredTransactions = jsonUtil.getTransactionsByType(filteredTransactions, type);
        }
        if (category) {
            filteredTransactions = jsonUtil.getTransactionsByCategory(filteredTransactions, category);
        }
        if (lessThan) {
            filteredTransactions = jsonUtil.getTransactionsLessThan(filteredTransactions, lessThan);
        }
        if (moreThan) {
            filteredTransactions = jsonUtil.getTransactionsMoreThan(filteredTransactions, moreThan);
        }

        let filteredTransactionsStr = JSON.stringify(filteredTransactions);
        localStorage.setItem('filtered-transactions', filteredTransactionsStr);
    }
});

// TODO: implement edit/delete/find a transaction
