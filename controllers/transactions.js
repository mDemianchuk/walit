const Transaction = require('../models/transaction');
const jsonUtil = require('../utils/json-util');
const dateUtil = require('../utils/date-util');
const displayUtil = require('../utils/display-util');
const CustomValidator = require('../utils/validate/transactions-validate');

function displayTable(condition) {
  for (let transaction of transactionList) {
    if (condition(transaction)) {
      addTransactionToTable(transaction);
    }
  }
}

function addTransactionToTable(transaction) {

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

  // displaying the container as it now contains at least one transaction
  displayUtil.displayElement(transactionContainer);
}

function clearTable() {
  while (transactionTableBody.firstChild) {
    transactionTableBody.removeChild(transactionTableBody.firstChild);
  }
}

let processAddTransactionForm = function() {
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
    transactionList.push(transaction);

    // storing the list to local storage
    jsonString = JSON.stringify(transactionList);
    localStorage.setItem('ls-transactions', jsonString);

    // adding as a row in the transactions table
    addTransactionToTable(transaction);
  }
};

let processFindTransactionsForm = function() {
  if (CustomValidator.prototype.isValid) {

    // getting the values from the input form
    let dateAfter = new Date(document.getElementById('find-date-after').value);
    let dateBefore = new Date(document.getElementById('find-date-before').value);
    let type = document.getElementById('find-type').value;
    let description = document.getElementById('find-description').value;
    let category = document.getElementById('find-category').value;
    let lessThan = document.getElementById('find-less-than').value;
    let moreThan = document.getElementById('find-more-than').value;

    clearTable();

    let condition = (transaction) => {
      if (transaction.amount < lessThan) {
        return true;
      }
    };

    for (let transaction of transactionList) {
      if (condition(transaction)) {
        addTransactionToTable(transaction);
      }
    }
  }
  // addTransactionToTable(condition);
};

let transactionContainer = document.getElementById('transactions-container');
let transactionTableBody = document.getElementById('transactions-table-body');

let addTransactionButton = document.getElementById('add-transaction-button');
let findTransactionsButton = document.getElementById('find-transactions-button');

let addTransactionModal = document.getElementById('add-transaction-modal');
let findTransactionsModal = document.getElementById('find-transactions-modal');

// input buttons
let addTransactionForm = document.getElementById('add-transaction-form');
let findTransactionsForm = document.getElementById('find-transactions-form');


// add transaction form validation
let addTransactionFormValidationRules = [{
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

let addTransactionFormValidator = new CustomValidator('add-transaction-form', addTransactionFormValidationRules);

// find transactions form validation
let findTransactionsFormValidationRules = [{
  name: 'find-description',
  display: 'Description',
  rules: 'alpha_numeric'
}, {
  name: 'find-category',
  display: 'Category',
  rules: 'alpha_numeric'
}, {
  name: 'find-type',
  display: 'Type',
  rules: 'alpha_numeric'
} , {
  name: 'find-date-after',
  display: 'After the date',
  rules: ''
} ,{
  name: 'find-date-before',
  display: 'Before the date',
  rules: ''
} ,{
  name: 'find-less-than',
  display: 'Less than',
  rules: ''
} ,{
  name: 'find-more-than',
  display: 'More than',
  rules: ''
}];

let findTransactionsFormValidator = new CustomValidator('find-transactions-form', findTransactionsFormValidationRules);


// retrieving the list of transactions from local storage
let jsonString = localStorage.getItem('ls-transactions');

// if the list doesn't exist create a new one
let transactionList = (jsonString === null) ? [] : jsonUtil.jsonToList(jsonString);
if (transactionList.length > 0) {
  displayTable((transaction) => true);
}

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


addTransactionForm.addEventListener('submit', processAddTransactionForm);
findTransactionsForm.addEventListener('submit', processFindTransactionsForm);

// TODO: implement edit/delete/find a transaction
