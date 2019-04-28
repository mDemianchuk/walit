module.exports = {
  entry: {
    transactions: './src/controllers/transactions-controller.js',
    settings: './src/controllers/settings-controller.js',
    overview: './src/controllers/overview-controller.js',
    login: './src/controllers/login-controller.js',
    login_validate: './src/utils/validate/login-validate.js',
    signup: './src/controllers/signup-controller.js',
    signup_validate: './src/utils/validate/signup-validate.js',
    transactions_validate: './src/utils/validate/transactions-validate.js'
  },
  output: {
    path: __dirname + '/public/scriptBundles',
    filename: '[name].js'
  }
};
