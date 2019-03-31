function jsonToList(jsonString) {
  let transactionList = JSON.parse(jsonString);
  for (let transaction of transactionList) {
    transaction.date = new Date(transaction.date - 1);
  }
  return transactionList;
}

module.exports = {
  jsonToList
};
