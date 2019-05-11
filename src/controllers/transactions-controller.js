const uuid = require('uuid/v1');
const jsonUtil = require('../utils/json-util');
const dateUtil = require('../utils/date-util');
const displayUtil = require('../utils/display-util');
const transactionValidator = require('../utils/validate/transactions-validator');

const transactionContainer = document.getElementById('transactions-container');
const editTransactionModal = document.getElementById('edit-transaction-modal');
const buttonContainer = document.getElementById('button-container');
const addTransactionButton = document.getElementById('add-transaction-button');
const filterTransactionsButton = document.getElementById('filter-transactions-button');

const addTransactionModal = document.getElementById('add-transaction-modal');
const filterTransactionsModal = document.getElementById('filter-transactions-modal');

const addTransactionForm = document.getElementById('add-transaction-form');
const filterTransactionsForm = document.getElementById('filter-transactions-form');
const editTransactionForm = document.getElementById('edit-transaction-form');

const headerTopContainer = document.getElementById('header-top');
const noTransactionsContainer = document.getElementById('no-transactions');
const signOutButton = document.getElementById('sign-out');
const loader = document.getElementById('loader');

function addAndDisplayTransactions(userId, userTransactions, transactionsJson) {
    const transactionTableBody = document.getElementById('transactions-table-body');

    for (let transaction of transactionsJson) {

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
        editButton.className = 'edit-transaction-button';

        let editButtonIcon = document.createElement('span');
        editButtonIcon.className = 'icon';

        let editIClass = document.createElement('i');
        editIClass.classList.add('fas', 'fa-edit');

        editButtonIcon.append(editIClass);
        editButton.append(editButtonIcon);

        editButton.addEventListener('click', () => {
                document.getElementById('edit-id').value = transaction.uuid;
                document.getElementById('edit-description').value = transaction.description;
                document.getElementById('edit-date').value = transactionDate;
                document.getElementById('edit-type').value = transaction.type;
                document.getElementById('edit-category').value = transaction.category;
                document.getElementById('edit-amount').value = transaction.amount;
                displayUtil.displayElement(editTransactionModal);
            }
        );

        let deleteButton = document.createElement('button');
        deleteButton.className = 'delete-transaction-button';

        let deleteButtonIcon = document.createElement('span');
        deleteButtonIcon.className = 'icon';

        let deleteIClass = document.createElement('i');
        deleteIClass.classList.add('fas', 'fa-trash-alt');
        deleteButtonIcon.append(deleteIClass);
        deleteButton.append(deleteButtonIcon);

        deleteButton.addEventListener('click', () => {
                if (confirm(`Are you sure you want to delete transaction: ${transaction.description} ?`)) {
                    userTransactions.doc(`${userId}/transactions/${transaction.uuid}`)
                        .delete()
                        .then(() => {
                            window.location.replace('/transactions');
                        });
                }
            }
        );

        actionsColumn.append(editButton, deleteButton);
    }
    displayUtil.displayElement(transactionContainer);
}

function clearTable() {
    const transactionTableBody = document.getElementById('transactions-table-body');
    const emptyTableBody = document.createElement('tbody');
    emptyTableBody.setAttribute('id', 'transactions-table-body');
    transactionTableBody.parentNode.replaceChild(emptyTableBody, transactionTableBody);
}

async function loadThePage(userId, userTransactions) {
    const addTransactionFormValidator = transactionValidator.getAddTransactionValidator('add-transaction-form');
    const filterTransactionsFormValidator = transactionValidator.getFilterTransactionsValidator('filter-transactions-form');
    const editTransactionFormValidator = transactionValidator.getEditTransactionValidator('edit-transaction-form');

    signOutButton.addEventListener('click', () => {
        daoUtil.signOut()
            .catch((error) => alert(error));
    });

    let transactionsJson = [];

    await userTransactions.doc(userId)
        .collection('transactions')
        .orderBy('date', 'desc')
        .get()
        .then(snap => {
            snap.forEach((doc) => {
                transactionsJson.push(doc.data());
            });
        });

    displayUtil.hideElement(loader);
    displayUtil.displayElement(buttonContainer);

    // adding event listeners
    addTransactionButton.addEventListener('click', () => {
        displayUtil.displayElement(addTransactionModal);
    });

    addTransactionForm.addEventListener('submit', (form) => {
        form.preventDefault();

        if (addTransactionFormValidator.isValid) {
            // getting the values from the input form
            let description = document.getElementById('add-description').value;
            let category = document.getElementById('add-category').value;
            let date = new Date(document.getElementById('add-date').value);
                date.setDate(date.getDate() + 1);
            let amount = parseFloat(document.getElementById('add-amount').value);
            let type = document.getElementById('add-type').value;
            let newUuid = uuid();

            const newTransactionRef = userTransactions.doc(`${userId}/transactions/${newUuid}`);

            const newTransaction = {
                description: description,
                category: category,
                date: date,
                amount: amount,
                type: type,
                uuid: newUuid
            };

            newTransactionRef.set(newTransaction)
                .then(() => addTransactionForm.submit())
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === addTransactionModal) {
            displayUtil.hideElement(addTransactionModal);
        } else if (event.target === filterTransactionsModal) {
            displayUtil.hideElement(filterTransactionsModal);
        } else if (event.target === editTransactionModal) {
            displayUtil.hideElement(editTransactionModal);
        }
    });

    if (transactionsJson.length === 0) {
        displayUtil.displayElement(noTransactionsContainer);
        displayUtil.hideElement(filterTransactionsButton);
    } else {
        displayUtil.displayElement(headerTopContainer);
        addAndDisplayTransactions(userId, userTransactions, transactionsJson);

        filterTransactionsButton.addEventListener('click', () => {
            displayUtil.displayElement(filterTransactionsModal);
        });

        filterTransactionsForm.addEventListener('submit', (form) => {
            form.preventDefault();

            if (filterTransactionsFormValidator.isValid) {
                // getting the values from the input form
                let dateAfter = new Date(document.getElementById('filter-date-after').value);
                    dateAfter.setDate(dateAfter.getDate() + 1);
                let dateBefore = new Date(document.getElementById('filter-date-before').value);
                    dateBefore.setDate(dateBefore.getDate() + 1);
                let type = document.getElementById('filter-type').value;
                let category = document.getElementById('filter-category').value;
                let lessThan = parseFloat(document.getElementById('filter-less-than').value);
                let moreThan = parseFloat(document.getElementById('filter-more-than').value);

                let filteredTransactions = [];

                userTransactions.doc(userId)
                    .collection('transactions')
                    .get()
                    .then(snap => {
                        snap.forEach(doc => filteredTransactions.push(doc.data()))
                    })
                    .then(async () => {
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
                        if (!isNaN(lessThan)) {
                            filteredTransactions = jsonUtil.getTransactionsLessThan(filteredTransactions, lessThan);
                        }
                        if (!isNaN(moreThan)) {
                            filteredTransactions = jsonUtil.getTransactionsMoreThan(filteredTransactions, moreThan);
                        }
                        if (filteredTransactions.length > 0) {
                            clearTable();
                            filteredTransactions = jsonUtil.sortJsonByProperty(filteredTransactions, 'date');
                            addAndDisplayTransactions(userId, userTransactions, filteredTransactions);
                            filterTransactionsModal.click();
                        } else {
                            alert('No transactions for given filters');
                        }
                    })
            }
        });

        editTransactionForm.addEventListener('submit', (form) => {
            form.preventDefault();

            if (editTransactionFormValidator.isValid) {
                // getting the values from the input form
                let uuid = document.getElementById('edit-id').value;
                let date = new Date(document.getElementById('edit-date').value);
                    date.setDate(date.getDate() + 1);
                let type = document.getElementById('edit-type').value;
                let description = document.getElementById('edit-description').value;
                let category = document.getElementById('edit-category').value;
                let amount = parseFloat(document.getElementById('edit-amount').value);

                const newTransactionRef = userTransactions.doc(`${userId}/transactions/${uuid}`);

                const newTransaction = {
                    description: description,
                    category: category,
                    date: date,
                    amount: amount,
                    type: type,
                };

                newTransactionRef.update(newTransaction)
                    .then(() => editTransactionForm.submit())
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const userTransactions = firebase.firestore()
                .collection('walit-transactions');
            loadThePage(user.uid, userTransactions)
        } else {
            window.location.replace('/login');
        }
    });
});