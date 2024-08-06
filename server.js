const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.PASS_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const router = require('./route/main');
const auth = require('./api/auth');
const categories = require('./api/categories');
const products = require('./api/products');
const codes = require('./api/codes');
const stocks = require('./api/stocks');
const imageslider = require('./api/imageslider');
const config = require('./api/config');
const order = require('./api/order');

app.use('/', router);
app.use('/api/auth', auth);
app.use('/api/categories', categories);
app.use('/api/products', products);
app.use('/api/codes', codes);
app.use('/api/stocks', stocks);
app.use('/api/imageslider', imageslider);
app.use('/api/config', config);
app.use('/api/order', order);

app.use((req, res, next) => {
    const message = req.session.message;
    req.session.message = null;
    res.status(404).render('notfound', { title: 'ERROR', message, user: req.user });
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});