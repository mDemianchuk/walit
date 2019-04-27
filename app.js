const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

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
    .post((req, res) => res.redirect('/transactions'));

app.route('/transactions/update/')
    .post((req, res) => {
        console.log(req.body);
        // res.send("updated " + req.body.edit-description)
        console.log(req.body.edit_description);
        //Connect using MongoClient
        mongo.connect(url, {useNewUrlParser: true}, function (err, client) {
            if (err) throw err;
            let db = client.db('walit');
            db.collection("transaction").findOne({"uuid": req.params.editId}, function (err, result) {
                if (err) throw err;
                if (result == null) {
                    console.log("nothing found");
                } else {
                    console.log(result);
                }
                client.close();
            });
        });

    });

app.route('/transactions/delete/:id')
    .delete((req, res) => res.send("deleted " + req.params.id))
    .post((req, res) => res.redirect('/transactions'));

app.route('/settings')
    .get((req, res) => res.sendFile(path.join(__dirname + '/public/html/settings.html')))
    .post((req, res) => res.redirect('/overview'));

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});