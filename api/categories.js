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
    body('name').isLength({ min: 1 }).withMessage('Category name is required'),
    body('detail').isLength({ min: 1 }).withMessage('Category detail is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { image, name, detail } = req.body;
    const token = generateToken();

    const query = `INSERT INTO categories (image, name, detail, token) VALUES (?, ?, ?, ?)`;
    const values = [image, name, detail, token];

    connectMysql.query(query, values, (err, result) => {
        if (err) {
            req.session.message = 'Error inserting category';
            return res.redirect('/admin/createcategories');
        }
        req.session.message = 'Category created successfully';
        return res.redirect('/admin/createcategories');
    });
});

router.post('/delete/:token', async (req, res) => {
    const categoryToken = req.params.token;
    
    const query = `DELETE FROM categories WHERE token = ?`;
    
    connectMysql.query(query, [categoryToken], (err, result) => {
        if (err) {
            req.session.message = 'Error deleting category';
            return res.redirect('/admin/managecategories');
        }
        req.session.message = 'Category deleted successfully';
        return res.redirect('/admin/managecategories');
    });
});

module.exports = router;