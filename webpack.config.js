module.exports = {
    entry: {
        charts: './assets/scripts/charts.js',
        transactions: './assets/scripts/transactions.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    }
};