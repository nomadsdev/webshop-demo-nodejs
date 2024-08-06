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

        const queryUser = 'SELECT * FROM users WHERE id = ? AND token = ?';
        const queryStock = 'SELECT * FROM stock WHERE urefer_token = ?';

        connectMysql.query(queryUser, [decoded.id, tokenProvider], (err, resultUser) => {
            if (err) {
                console.error('Database query error:', err.message);
                return res.redirect('/signin');
            }

            if (resultUser.length === 0) {
                return res.redirect('/signin');
            }

            const user = resultUser[0];

            connectMysql.query(queryStock, [tokenProvider], (err, resultStock) => {
                if (err) {
                    console.error('Database query error:', err.message);
                    return res.redirect('/signin');
                }

                const stock = resultStock || [];

                req.user = user;
                req.stock = stock;

                next();
            });
        });
    });
};