const connectMysql = require('../lib/mysql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
    const token = req.cookies.token_webshop;
    const tokenProvider = req.cookies.token_provider;

    if (!token || !tokenProvider) {
        req.user = null;
        return next();
    }

    jwt.verify(token, process.env.KEY_AUTH, (err, decoded) => {
        if (err) {
            req.user = null;
            return next();
        }

        const query = 'SELECT * FROM users WHERE id = ? AND token = ?';
        connectMysql.query(query, [decoded.id, tokenProvider], (err, result) => {
            if (err || result.length === 0) {
                req.user = null;
                return next();
            }
            req.user = result[0];
            next();
        });
    });
};