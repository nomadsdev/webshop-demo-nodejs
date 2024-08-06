const express = require('express');
const router = express.Router();
const connectMysql = require('../lib/mysql');
const { body, validationResult } = require('express-validator');

function generateToken() {
    const randomString = Math.random().toString(36).substring(2, 12).toUpperCase();
    return randomString;
}

router.post('/create', [
    body('image').isURL().withMessage('Invalid URL for image'),
    body('name').isLength({ min: 1 }).withMessage('Product name is required'),
    body('detail').isLength({ min: 1 }).withMessage('Product detail is required'),
    body('price').isDecimal().withMessage('Price must be a valid number'),
    body('crefer_token').isLength({ min: 1 }).withMessage('Category is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.message = 'Error inserting product';
        return res.redirect('/admin/createproducts');
    }

    const { image, name, detail, price, crefer_token } = req.body;
    const token = generateToken();

    const query = `INSERT INTO products (image, name, detail, price, crefer_token, token) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [image, name, detail, price, crefer_token, token];

    connectMysql.query(query, values, (err, result) => {
        if (err) {
            req.session.message = 'Error inserting product';
            return res.redirect('/admin/createproducts');
        }
        req.session.message = 'Product created successfully';
        return res.redirect('/admin/createproducts');
    });
});

router.post('/delete/:token', (req, res) => {
    const token = req.params.token;

    const query = 'DELETE FROM products WHERE token = ?';

    connectMysql.query(query, [token], (err, result) => {
        if (err) {
            req.session.message = 'Error deleting product';
            return res.redirect('/admin/manageproducts');
        }

        req.session.message = 'Product deleted successfully';
        return res.redirect('/admin/manageproducts');
    });
});

module.exports = router;