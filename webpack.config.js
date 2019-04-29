module.exports = {
  entry: {
    transactions_controller: './src/controllers/transactions-controller.js',
    settings_controller: './src/controllers/settings-controller.js',
    overview_controller: './src/controllers/overview-controller.js',
    login_controller: './src/controllers/login-controller.js',
    signup_controller: './src/controllers/signup-controller.js',
  },
  output: {
    path: __dirname + '/public/scriptBundles',
    filename: '[name].js'
  }
};
