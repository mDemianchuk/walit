module.exports = {
  entry: {
    transactions: './controllers/transactions.js',
    overview: './controllers/overview.js',
    login_validate: './utils/validate/login-validate.js',
    signup_validate: './utils/validate/signup-validate.js',
    transactions_validate: './utils/validate/transactions-validate.js'
  },
  output: {
    path: __dirname + '/public/scriptBundles',
    filename: '[name].js'
  }
};
