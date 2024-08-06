const express = require('express');
const router = express.Router();
const pool = require('../lib/mysql2');

function generateToken() {
    const randomString = Math.random().toString(36).substring(2, 12).toUpperCase();
    return randomString;
}

router.post('/purchase', async (req, res) => {
    const { prefer_token, quantity } = req.body;
    const tokenProvider = req.cookies.token_provider;

    if (!prefer_token || !quantity || !tokenProvider) {
        req.session.message = 'Missing required fields';
        res.redirect(`/products/${prefer_token}`);
    }

    try {
        const [productRows] = await pool.query('SELECT * FROM products WHERE token = ?', [prefer_token]);

        if (productRows.length === 0) {
            req.session.message = 'Product not found';
            res.redirect(`/products/${prefer_token}`);
        }

        const product = productRows[0];
        const price = product.price;

        const [userRows] = await pool.query('SELECT points FROM users WHERE token = ?', [tokenProvider]);

        if (userRows.length === 0) {
            req.session.message = 'User not found';
            res.redirect(`/products/${prefer_token}`);
        }

        let userPoints = userRows[0].points;
        const totalCost = price * quantity;

        if (userPoints < totalCost) {
            req.session.message = 'Insufficient points';
            res.redirect(`/products/${prefer_token}`);
        }

        userPoints -= totalCost;

        await pool.query('UPDATE users SET points = ? WHERE token = ?', [userPoints, tokenProvider]);

        const orderToken = generateToken();
        const [stockRows] = await pool.query('SELECT * FROM stock WHERE prefer_token = ? AND status != 1 LIMIT 1', [prefer_token]);

        if (stockRows.length === 0) {
            req.session.message = 'No available stock found';
            res.redirect(`/products/${prefer_token}`);
        }

        const stock = stockRows[0];
        const sreferToken = stock.token;

        await pool.query('UPDATE stock SET status = 1, urefer_token = ? WHERE token = ?', [tokenProvider, sreferToken]);
        await pool.query('INSERT INTO orders (prefer_token, urefer_token, quantity, srefer_token, token) VALUES (?, ?, ?, ?, ?)', [prefer_token, tokenProvider, quantity, sreferToken, orderToken]);

        req.session.message = 'Order placed successfully';
        res.redirect(`/products/${prefer_token}`);
    } catch (error) {
        console.error(error);
        req.session.message = 'Internal server error';
        res.redirect(`/products/${prefer_token}`);
    }
});

module.exports = router;