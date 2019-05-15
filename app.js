const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.route('/')
    .get((req, res) => res.redirect('/overview'))
    .post((req, res) => res.redirect('/overview'));

app.route('/login')
    .get((req, res) => res.render('login'))
    .post((req, res) => res.redirect('/overview'));

app.route('/sign-up')
    .get((req, res) => res.render('sign-up'))
    .post((req, res) => res.redirect('/login'));

app.route('/overview')
    .get((req, res) => res.render('overview'));

app.route('/transactions')
    .get((req, res) => res.render('transactions'))
    .post((req, res) => res.redirect('/transactions'));

app.route('/settings')
    .get((req, res) => res.render('settings'))
    .post((req, res) => res.redirect('/overview'));

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});