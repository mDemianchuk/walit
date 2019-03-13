const TransactionManager = require('./model/transaction-manager');
const Transaction = require('./model/transaction');

let transactionManager = new TransactionManager();

let addBtn = document.getElementById('add-button');

addBtn.addEventListener('click', () => {
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    let amount = document.getElementById('amount').value;
    let date = new Date(document.getElementById('date').value);
    let type = document.getElementById('type').value;

    let transaction = new Transaction(date, type, description, category, amount);
    transactionManager.addTransaction(transaction);
    console.log(transaction);
});