const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
    const token = req.cookies.token_webshop;
    const tokenProvider = req.cookies.token_provider;

    if (token || tokenProvider) {
        return res.redirect('/');
    }

    jwt.verify(token, process.env.KEY_AUTH, (err, decoded) => {
        next()
    });
};