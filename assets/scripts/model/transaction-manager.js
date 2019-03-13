function TransactionManager() {

    this.transactionMap = new Map();
    this.categorySet = new Set();

    this.addTransaction = function (transaction) {
        this.transactionMap.set(transaction.uuid, transaction);
        this.categorySet.add(transaction.category);
    };

    this.removeTransaction = function (uuid) {
        this.transactionMap.delete(uuid);
    };

    this.getTransactionByUUID = function (uuid) {
        return this.transactionMap.get(uuid);
    };

    this.getAllTransactions = function () {
        return this.transactionMap.values();
    };

    this.getTransactionsByType = function (type) {
        let transactionList = [];
        for (let transaction of this.transactionMap.values()) {
            if (transaction.type === type) {
                transactionList.push(transaction);
            }
        }
        return transactionList;
    };

    this.getTransactionsByCategory = function (category) {
        let transactionList = [];
        for (let transaction of this.transactionMap.values()) {
            if (transaction.category === category) {
                transactionList.push(transaction);
            }
        }
        return transactionList;
    };

    this.getTransactionsByMonth = function (month) {
        let transactionList = [];
        for(let transaction of this.transactionMap.values())
        {
            if(transaction.date.getMonth() === month){
                transactionList.push(transactionList);
            }
        }
        return transactionList;
    }

    this.getCategorySet = function () {
        return Array.from(this.categorySet);
    }
}

module.exports = TransactionManager;