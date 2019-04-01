module.exports = {
  entry: {
    transactions: './assets/scripts/transactions.js',
    overview: './assets/scripts/overview.js',
    login_validate: './assets/scripts/utils/validate/login-validate.js',
    signup_validate: './assets/scripts/utils/validate/signup-validate.js',
    transactions_validate: './assets/scripts/utils/validate/transactions-validate.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
};
