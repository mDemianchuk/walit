module.exports = {
  entry: {
    transactions_controller: './src/controllers/transactions-controller.js',
    settings_controller: './src/controllers/settings-controller.js',
    overview_controller: './src/controllers/overview-controller.js',
    login_controller: './src/controllers/login-controller.js',
    sign_up_controller: './src/controllers/sign-up-controller.js',
  },
  output: {
    path: __dirname + '/public/scriptBundles',
    filename: '[name].js'
  }
};
