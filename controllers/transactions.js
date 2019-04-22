const Transaction = require('../models/transaction');
const jsonUtil = require('../utils/json-util');
const dateUtil = require('../utils/date-util');
const displayUtil = require('../utils/display-util');
const CustomValidator = require('../utils/validate/transactions-validate');

function displayTable(condition) {
    for (let transaction of transactionsJson) {
        if (condition(transaction)) {
            addTransactionToTable(transaction);
        }
    }
}

function addTransactionToTable(transaction) {
    // creating a row in transactions table for a new transaction
    let row = transactionTableBody.insertRow();
    row.id = transaction.uuid;
    let dateColumn = row.insertCell(0);
    dateColumn.innerHTML = dateUtil.getShortDate(transaction.date);
    dateColumn.className = "date";
    let descriptionColumn = row.insertCell(1);
    descriptionColumn.innerHTML = transaction.description;
    descriptionColumn.className = "description";
    let categoryColumn = row.insertCell(2);
    categoryColumn.innerHTML = transaction.category;
    categoryColumn.className = "category";
    let amountColumn = row.insertCell(3);
    amountColumn.innerHTML = transaction.amount;
    amountColumn.className = "amount";
    let typeColumn = row.insertCell(4);
    typeColumn.innerHTML = transaction.type;
    typeColumn.className = "type";

    let actionsColumn = row.insertCell(5);

    let editButton = document.createElement("button");

    editButton.className = "edit-transaction-button";

    let editButtonIcon = document.createElement("span");
    editButtonIcon.className = "icon";

    let editIClass = document.createElement("i");
    editIClass.classList.add("fas", "fa-edit");
    editButtonIcon.append(editIClass);
    editButton.append(editButtonIcon);

    let editButtonText = document.createElement("div");
    editButtonText.innerText = "Edit";

    editButton.append(editButtonText);

    let deleteButton = document.createElement("button");

    deleteButton.className = "delete-transaction-button";

    let deleteButtonIcon = document.createElement("span");
    deleteButtonIcon.className = "icon";

    let deleteIClass = document.createElement("i");
    deleteIClass.classList.add("fas", "fa-delete");
    deleteButtonIcon.append(deleteIClass);
    deleteButton.append(deleteButtonIcon);

    let deleteButtonText = document.createElement("div");
    deleteButtonText.innerText = "Delete";

    deleteButton.append(deleteButtonText);

    actionsColumn.append(editButton, deleteButton);

    // displaying the container as it now contains at least one transaction
    displayUtil.displayElement(transactionContainer);
}

function clearTable() {
    while (transactionTableBody.firstChild) {
        transactionTableBody.removeChild(transactionTableBody.firstChild);
    }
}

let transactionContainer = document.getElementById('transactions-container');
let transactionTableBody = document.getElementById('transactions-table-body');

let addTransactionButton = document.getElementById('add-transaction-button');
let findTransactionsButton = document.getElementById('find-transactions-button');
let editTransactionButtons = document.getElementsByClassName('edit-transaction-button');
let deleteTransactionButtons = document.getElementsByClassName('delete-transaction-button');

let addTransactionModal = document.getElementById('add-transaction-modal');
let findTransactionsModal = document.getElementById('find-transactions-modal');
let editTransactionModal = document.getElementById('edit-transaction-modal');

// input buttons
let addTransactionForm = document.getElementById('add-transaction-form');
let findTransactionsForm = document.getElementById('find-transactions-form');
let editTransactionForm = document.getElementById('edit-transaction-form');

// add transaction form validation
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

// edit transaction form validation
const editTransactionFormValidationRules = [{
    name: 'edit-description',
    display: 'Description',
    rules: 'required|alpha_numeric'
}, {
    name: 'edit-category',
    display: 'Category',
    rules: 'required|alpha_numeric'
}, {
    name: 'edit-date',
    display: 'Date',
    rules: 'required'
}, {
    name: 'edit-how-often',
    display: 'How Often',
    rules: 'required'
}, {
    name: 'edit-amount',
    display: 'Amount',
    rules: 'required'
}, {
    name: 'edit-type',
    display: 'Type',
    rules: 'required'
}];

const addTransactionFormValidator = new CustomValidator('add-transaction-form', addTransactionFormValidationRules);
const editTransactionFormValidator = new CustomValidator('edit-transaction-form', addTransactionFormValidationRules);
// find transactions form validation
const findTransactionsFormValidationRules = [{
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

const findTransactionsFormValidator = new CustomValidator('find-transactions-form', findTransactionsFormValidationRules);


// retrieving the list of transactions from local storage
let transactionsJson = jsonUtil.parseJson(localStorage.getItem('ls-transactions'));
transactionsJson = jsonUtil.sortJsonByProperty(transactionsJson, 'date');

if (transactionsJson) {
    displayTable((transaction) => true);
}

// adding event listeners
addTransactionButton.addEventListener('click', () => {
    displayUtil.displayElement(addTransactionModal);
});

findTransactionsButton.addEventListener('click', () => {
    displayUtil.displayElement(findTransactionsModal);
});

//add action listeners to edit buttons
for(var i = 0; i < editTransactionButtons.length; i++){
        let currentButton = editTransactionButtons[i];
        let parentTr = currentButton.parentNode.parentNode;

        currentButton.addEventListener('click', () => {
            document.getElementById('edit-id').value = parentTr.id;
            document.getElementById('edit-description').value = parentTr.querySelector(".description").innerHTML;
            document.getElementById('edit-date').value = parentTr.querySelector(".date").innerHTML;
            document.getElementById('edit-type').value = parentTr.querySelector(".type").innerHTML;
            document.getElementById('edit-category').value = parentTr.querySelector(".category").innerHTML;
            document.getElementById('edit-amount').value = parentTr.querySelector(".amount").innerHTML;
            displayUtil.displayElement(editTransactionModal);
        }
    );
}

//add action listeners to delete buttons
for(var i = 0; i < deleteTransactionButtons.length; i++){
    let currentButton = deleteTransactionButtons[i];
    let parentTr = currentButton.parentNode.parentNode;

    currentButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete transaction: ' + parentTr.querySelector(".description").innerHTML + "?")) {
                var xhttp = new XMLHttpRequest();
                xhttp.open("DELETE", "http://localhost:3000/transactions/delete/" + parentTr.id, true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.onload = function(){
                    console.log(this.response);
                    document.getElementById('transactions-table-body').removeChild(parentTr);
                };

                xhttp.send();
            } else {

            }

        }
    );
}



window.addEventListener('click', (event) => {
    if (event.target === addTransactionModal) {
        displayUtil.hideElement(addTransactionModal);
    } else if (event.target === findTransactionsModal) {
        displayUtil.hideElement(findTransactionsModal);
    }
});

addTransactionForm.addEventListener('submit', (e) => {
    if (CustomValidator.prototype.isValid) {
        e.preventDefault();
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

        // adding as a row in the transactions table
        addTransactionToTable(transaction);
    }
});


findTransactionsForm.addEventListener('submit', () => {
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

        for (let transaction of transactionsJson) {
            if (condition(transaction)) {
                addTransactionToTable(transaction);
            }
        }
    }
});

editTransactionForm.addEventListener('submit', () => {
    console.log("Edit is working");
    if (CustomValidator.prototype.isValid) {
        // getting the values from the input form
        let uuid = document.getElementById('edit-id').value;
        let date = new Date(document.getElementById('edit-date').value);
        let type = document.getElementById('edit-type').value;
        let description = document.getElementById('edit-description').value;
        let category = document.getElementById('edit-category').value;
        let amount = document.getElementById('edit-amount').value;

        // creating a new Transaction object
        let oldTransaction = transactionsJson.filter((transaction) => transaction.uuid === uuid);
        console.log("Old transaction " + oldTransaction);
        let transaction = new Transaction(date, type, description, category, amount);
        oldTransaction = transaction;
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "http://localhost:3000/transactions/update/" + uuid, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onload = function(){
            console.log(this.response);
        };
        xhttp.send();
    }
});


// TODO: implement edit/delete/find a transaction
