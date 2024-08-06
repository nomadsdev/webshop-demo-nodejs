const connectMysql = require('../lib/mysql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
    const token = req.cookies.token_webshop;
    const tokenProvider = req.cookies.token_provider;

    if (!token || !tokenProvider) {
        return res.redirect('/signin');
    }

    jwt.verify(token, process.env.KEY_AUTH, (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err.message);
            return res.redirect('/signin');
        }

        const query = 'SELECT * FROM users WHERE id = ? AND token = ?';
        connectMysql.query(query, [decoded.id, tokenProvider], (err, result) => {
            if (err) {
                console.error('Database query error:', err.message);
                return res.redirect('/signin');
            }

            if (result.length === 0) {
                return res.redirect('/signin');
            }

            req.user = result[0];

            if (req.user.role !== 1) {
                return res.redirect('/');
            }

            next();
        });
    });
};