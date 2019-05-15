const express = require('express');
const app = express();
const path = require('path');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signUpRouter = require('./routes/sign-up');
const settingsRouter = require('./routes/settings');
const overviewRouter = require('./routes/overview');
// const transactionsRouter = require('./routes/transactions');
const daoInitializer = require('./src/dao/dao-initializer');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/sign-up', signUpRouter);
app.use('/settings', settingsRouter);
app.use('/overview', overviewRouter);
// app.use('/transactions', transactionsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));

daoInitializer.initializeDataBase();