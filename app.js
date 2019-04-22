const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.route('/')
	.get((req, res) => res.redirect('/login'))
	.post((req, res) => res.redirect('/login'));

app.route('/login')
	.get((req, res) => res.sendFile(path.join(__dirname + '/public/html/login.html')))
	.post((req, res) => res.redirect('/overview'));

app.route('/signup')
	.get((req, res) => res.sendFile(path.join(__dirname + '/public/html/signup.html')))
	.post((req, res) => res.redirect('/login'));

app.route('/overview')
	.get((req, res) => res.sendFile(path.join(__dirname + '/public/html/overview.html')));

app.route('/transactions')
	.get((req, res) => res.sendFile(path.join(__dirname + '/public/html/transactions.html')))
	.post((req, res) => res.redirect('/transactions'))

app.route('/transactions/update/:id')
	.put((req, res) => {
		console.log(req.params.id);
		res.send("updated " + req.params.id)
	});

app.route('/transactions/delete/:id')
	.delete((req, res) => res.send("deleted " + req.params.id));

app.listen(port, () => {
	console.log(`App listening on port ${port}!`)
});