const uuid = require("uuid/v1");

function Transaction(date, type, description, category, amount) {
  this.uuid = uuid();
  this.date = date;
  this.type = type;
  this.description = description;
  this.category = category;
  this.amount = amount;
}

module.exports = Transaction;
