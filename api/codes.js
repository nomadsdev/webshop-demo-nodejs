const express = require('express');
const router = express.Router();
const connectMysql = require('../lib/mysql');
const crypto = require('crypto');

function generateCode() {
    return crypto.randomBytes(16).toString('hex');
}

function generateToken() {
    const randomString = Math.random().toString(36).substring(2, 12).toUpperCase();
    return randomString;
}

router.post('/generatecode', (req, res) => {
    const { points } = req.body;
    const code = generateCode();
    const token = generateToken();

    if (points === undefined || points <= 0) {
        return res.json({ success: false, message: 'Invalid points' });
    }

    const query = 'INSERT INTO codes (code, points, status, prefer_token, token) VALUES (?, ?, ?, ?, ?)';
    connectMysql.query(query, [code, points, 0, null, token], (err, results) => {
        if (err) {
            req.session.message = 'An error occurred while generating the code';
            return res.redirect('/admin/generatekeycode');
        }
        req.session.message = `${code}`;
        return res.redirect('/admin/generatekeycode');
    });
});

router.post('/fillcode', (req, res) => {
    const { code } = req.body;
    const tokenprovider = req.cookies.token_provider

    if (!code || !tokenprovider) {
        req.session.message = 'Code and tokenprovider are required';
        return res.redirect('/profile/fillcode');
    }

    const query = 'SELECT * FROM codes WHERE code = ? AND status = 0';
    connectMysql.query(query, [code], (err, results) => {
        if (err) {
            req.session.message = 'An error occurred while checking the code';
            return res.redirect('/profile/fillcode');
        }

        if (results.length === 0) {
            req.session.message = 'Invalid code or code already used';
            return res.redirect('/profile/fillcode');
        }

        const codeData = results[0];
        const points = codeData.points;

        const updateCodeQuery = 'UPDATE codes SET prefer_token = ?, status = 1 WHERE code = ?';
        connectMysql.query(updateCodeQuery, [tokenprovider, code], (err, updateResults) => {
            if (err) {
                req.session.message = 'An error occurred while updating the code';
                return res.redirect('/profile/fillcode');
            }

            const updateUserQuery = 'UPDATE users SET points = points + ? WHERE token = ?';
            connectMysql.query(updateUserQuery, [points, tokenprovider], (err, userResults) => {
                if (err) {
                    req.session.message = 'An error occurred while updating user points';
                    return res.redirect('/profile/fillcode');
                }

                req.session.message = 'Successfully!';
                return res.redirect('/profile/fillcode');
            });
        });
    });
});

router.post('/delete/:token', (req, res) => {
    const { token } = req.params;

    const query = 'DELETE FROM codes WHERE token = ?';
    connectMysql.query(query, [token], (err, results) => {
        if (err) {
            console.error('Error deleting code:', err.message);
            req.session.message = 'An error occurred while deleting the code.';
            return res.redirect('/admin/managecodes');
        }

        req.session.message = 'Code deleted successfully.';
        res.redirect('/admin/managecodes');
    });
});

module.exports = router;