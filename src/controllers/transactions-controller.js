const generateUuid = require('uuid/v1');
const daoHelper = require('../dao/dao-helper');
const authHelper = require('../dao/auth-helper');
const jsonUtil = require('../utils/json-util');
const dateUtil = require('../utils/date-util');
const displayUtil = require('../utils/display-util');
const redirectUtil = require('../utils/redirect-util');
const validatorUtil = require('../utils/validate/validator-util');
const transactionValidator = require('../utils/validate/transactions-validator');

let userId;
let userCurrency;
let userTransactions;

document.addEventListener('DOMContentLoaded', () => {
    const user = authHelper.getCurrentUser();
    userId = user.uid;
    retrieveUserData()
        .then(userData => loadPage(userData));
});

function retrieveUserData() {
    return new Promise(resolve => {
        retrieveUserCurrency()
            .then(currency => userCurrency = currency)
            .then(() => retrieveUserTransactions())
            .then(transactions => userTransactions = transactions)
            .then(() => resolve());
    });
}

function retrieveUserCurrency() {
    return new Promise(resolve => {
        daoHelper.getDocumentByPath(`walit-settings/${userId}`)
            .then(document => daoHelper.getDocumentData(document))
            .then(userSettings => resolve(userSettings.currency));
    });
}

function retrieveUserTransactions() {
    return new Promise(resolve => {
        daoHelper.getCollectionByPath(`walit-transactions/${userId}/transactions`)
            .then(userTransactionsCollection => daoHelper.sortCollectionByField(userTransactionsCollection, 'date'))
            .then(sortedUserTransactionsCollection => daoHelper.getCollectionData(sortedUserTransactionsCollection))
            .then(userTransactions => resolve(userTransactions));
    });
}

function retrieveTransactionDocument(transactionId) {
    return new Promise(resolve => {
        daoHelper.getDocumentByPath(`walit-transactions/${userId}/transactions/${transactionId}`)
            .then(transactionDocument => resolve(transactionDocument));
    });
}

function loadPage() {
    const loader = document.getElementById('loader');
    const buttonContainer = document.getElementById('button-container');

    displayUtil.hideElement(loader);
    displayUtil.displayElement(buttonContainer);

    const addTransactionModal = document.getElementById('add-transaction-modal');
    const addTransactionButton = document.getElementById('add-transaction-button');
    const addTransactionForm = document.getElementById('add-transaction-form');
    const addTransactionFormValidator = transactionValidator.getAddTransactionValidator('add-transaction-form');

    onClickDisplayModalContainer(addTransactionButton, addTransactionModal);
    onClickHideModalContainer(addTransactionModal);

    addTransactionForm.addEventListener('submit', event => {
        event.preventDefault();

        if (addTransactionFormValidator.isValid) {
            let description = document.getElementById('add-description').value;
            let category = document.getElementById('add-category').value;
            let date = new Date(document.getElementById('add-date').value);
            date.setDate(date.getDate() + 1);
            let amount = parseFloat(document.getElementById('add-amount').value);
            let type = document.getElementById('add-type').value;
            let uuid = generateUuid();

            const newTransaction = {
                description: description,
                category: category,
                date: date,
                amount: amount,
                type: type,
                uuid: uuid
            };

            retrieveTransactionDocument(uuid)
                .then(newTransactionDocument => daoHelper.setDocumentField(newTransactionDocument, newTransaction))
                .then(() => addTransactionForm.submit());
        }
    });

    if (isEnoughTransactions(userTransactions)) {
        const headerTopContainer = document.getElementById('header-top');
        displayUtil.displayElement(headerTopContainer);

        createAndDisplayTransactionsTable(userTransactions);

        const editTransactionModal = document.getElementById('edit-transaction-modal');
        const editTransactionForm = document.getElementById('edit-transaction-form');
        const editTransactionFormValidator = transactionValidator.getEditTransactionValidator('edit-transaction-form');

        onClickHideModalContainer(editTransactionModal);

        editTransactionForm.addEventListener('submit', event => {
            event.preventDefault();

            if (editTransactionFormValidator.isValid) {
                let uuid = document.getElementById('edit-id').value;
                let date = new Date(document.getElementById('edit-date').value);
                date.setDate(date.getDate() + 1);
                let type = document.getElementById('edit-type').value;
                let description = document.getElementById('edit-description').value;
                let category = document.getElementById('edit-category').value;
                let amount = parseFloat(document.getElementById('edit-amount').value);

                const newTransaction = {
                    description: description,
                    category: category,
                    date: date,
                    amount: amount,
                    type: type
                };

                retrieveTransactionDocument(uuid)
                    .then(newTransactionDocument => daoHelper.updateDocumentFieldIfValid(newTransactionDocument, newTransaction))
                    .then(() => editTransactionForm.submit())
            }
        });

        const filterTransactionsButton = document.getElementById('filter-transactions-button');
        const filterTransactionsModal = document.getElementById('filter-transactions-modal');
        const filterTransactionsForm = document.getElementById('filter-transactions-form');
        const filterTransactionsFormValidator = transactionValidator.getFilterTransactionsValidator('filter-transactions-form');

        onClickDisplayModalContainer(filterTransactionsButton, filterTransactionsModal);
        onClickHideModalContainer(filterTransactionsModal);

        filterTransactionsForm.addEventListener('submit', event => {
            event.preventDefault();

            if (filterTransactionsFormValidator.isValid) {
                let dateAfter = new Date(document.getElementById('filter-date-after').value);
                dateAfter.setDate(dateAfter.getDate() + 1);
                let dateBefore = new Date(document.getElementById('filter-date-before').value);
                dateBefore.setDate(dateBefore.getDate() + 1);
                let type = document.getElementById('filter-type').value;
                let category = document.getElementById('filter-category').value;
                let lessThan = parseFloat(document.getElementById('filter-less-than').value);
                let moreThan = parseFloat(document.getElementById('filter-more-than').value);

                let filteredTransactions = userTransactions;

                if (validatorUtil.isValidDate(dateAfter)) {
                    filteredTransactions = jsonUtil.getTransactionsAfterDate(filteredTransactions, dateAfter);
                }
                if (validatorUtil.isValidDate(dateBefore)) {
                    filteredTransactions = jsonUtil.getTransactionsBeforeDate(filteredTransactions, dateBefore);
                }
                if (validatorUtil.isValidString(type)) {
                    filteredTransactions = jsonUtil.getTransactionsByType(filteredTransactions, type);
                }
                if (validatorUtil.isValidString(category)) {
                    filteredTransactions = jsonUtil.getTransactionsByCategory(filteredTransactions, category);
                }
                if (validatorUtil.isValidNumber(lessThan)) {
                    filteredTransactions = jsonUtil.getTransactionsLessThan(filteredTransactions, lessThan);
                }
                if (validatorUtil.isValidNumber(moreThan)) {
                    filteredTransactions = jsonUtil.getTransactionsMoreThan(filteredTransactions, moreThan);
                }
                if (isEnoughTransactions(filteredTransactions)) {
                    clearTable();
                    createAndDisplayTransactionsTable(filteredTransactions);
                    filterTransactionsModal.click();
                } else {
                    alert('No transactions for given filters');
                }
            }
        });
    } else {
        const noTransactionsContainer = document.getElementById('no-transactions');
        const filterTransactionsButton = document.getElementById('filter-transactions-button');

        displayUtil.displayElement(noTransactionsContainer);
        displayUtil.hideElement(filterTransactionsButton);
    }
}

function isEnoughTransactions(transactions) {
    return transactions.length > 0;
}

function onClickDisplayModalContainer(modalContainerButton, modalContainer) {
    modalContainerButton.addEventListener('click', () => {
        displayUtil.displayElement(modalContainer);
    });
}

function onClickHideModalContainer(modalContainer) {
    window.addEventListener('click', (event) => {
        if (event.target === modalContainer) {
            displayUtil.hideElement(modalContainer);
        }
    });
}

function clearTable() {
    const transactionTableBody = document.getElementById('transactions-table-body');
    const emptyTableBody = document.createElement('tbody');
    emptyTableBody.setAttribute('id', 'transactions-table-body');
    transactionTableBody.parentNode.replaceChild(emptyTableBody, transactionTableBody);
}

function createAndDisplayTransactionsTable(transactions) {
    const transactionContainer = document.getElementById('transactions-container');
    const transactionTableBody = document.getElementById('transactions-table-body');

    for (let transaction of transactions) {
        createTransactionRow(transaction, transactionTableBody);
    }
    displayUtil.displayElement(transactionContainer);
}

function createTransactionRow(transaction, transactionTableBody) {

    let row = transactionTableBody.insertRow();
    row.id = transaction.uuid;

    const transactionDate = dateUtil.getShortDate(transaction.date.toDate());
    let dateColumn = row.insertCell(0);
    dateColumn.innerHTML = transactionDate;
    dateColumn.className = 'date';

    let descriptionColumn = row.insertCell(1);
    descriptionColumn.innerHTML = transaction.description;
    descriptionColumn.className = 'description';

    let categoryColumn = row.insertCell(2);
    categoryColumn.innerHTML = transaction.category;
    categoryColumn.className = 'category';

    let amountColumn = row.insertCell(3);
    amountColumn.innerHTML = transaction.amount;
    amountColumn.className = 'amount';

    let typeColumn = row.insertCell(4);
    typeColumn.innerHTML = transaction.type;
    typeColumn.className = 'type';

    let actionsColumn = row.insertCell(5);

    let editButton = document.createElement('button');
    let editButtonSpan = document.createElement('span');
    let editButtonIcon = document.createElement('i');
    editButton.className = 'edit-transaction-button';
    editButtonSpan.className = 'icon';
    editButtonIcon.classList.add('fas', 'fa-edit');
    editButtonSpan.append(editButtonIcon);
    editButton.append(editButtonSpan);

    let deleteButton = document.createElement('button');
    let deleteButtonSpan = document.createElement('span');
    let deleteButtonIcon = document.createElement('i');
    deleteButton.className = 'delete-transaction-button';
    deleteButtonSpan.className = 'icon';
    deleteButtonIcon.classList.add('fas', 'fa-trash-alt');
    deleteButtonSpan.append(deleteButtonIcon);
    deleteButton.append(deleteButtonSpan);

    actionsColumn.append(editButton, deleteButton);

    const editTransactionModal = document.getElementById('edit-transaction-modal');
    onClickDisplayModalContainer(editButton, editTransactionModal);
    editButton.addEventListener('click', () => {
            document.getElementById('edit-id').value = transaction.uuid;
            document.getElementById('edit-description').value = transaction.description;
            document.getElementById('edit-date').value = transactionDate;
            document.getElementById('edit-type').value = transaction.type;
            document.getElementById('edit-category').value = transaction.category;
            document.getElementById('edit-amount').value = transaction.amount;
        }
    );

    deleteButton.addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete ${transaction.description}?`)) {
                retrieveTransactionDocument(transaction.uuid)
                    .then(transactionDocument => daoHelper.deleteDocument(transactionDocument))
                    .then(() => redirectUtil.redirectToPage('/transactions'));
            }
        }
    );
}
