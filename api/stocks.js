const express = require('express');
const router = express.Router();
const connectMysql = require('../lib/mysql');

function generateToken() {
    const randomString = Math.random().toString(36).substring(2, 12).toUpperCase();
    return randomString;
}

router.post('/create', (req, res) => {
    const { prefer_token, data } = req.body;
    const token = generateToken();

    const query = `INSERT INTO stock (prefer_token, data, urefer_token, status, token) VALUES (?, ?, ?, ?, ?)`;
    const values = [prefer_token, data, null, 0, token];

    connectMysql.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            req.session.message = 'Error inserting Stocks';
            return res.redirect('/admin/managestock');
        }
        req.session.message = 'Stocks created successfully';
        return res.redirect('/admin/managestock');
    });
});

module.exports = router;