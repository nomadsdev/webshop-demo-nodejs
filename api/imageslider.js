const express = require('express');
const router = express.Router();
const connectMysql = require('../lib/mysql');

function generateToken() {
    const randomString = Math.random().toString(36).substring(2, 12).toUpperCase();
    return randomString;
}

router.post('/create', (req, res) => {
    const { image } = req.body;
    const token = generateToken();
    
    if (!image) {
        req.session.message = 'Image URL is required';
        return res.redirect('/admin/createimageslider');
    }

    const sql = 'INSERT INTO image_slider (image, token) VALUES (?, ?)';
    
    connectMysql.query(sql, [image, token], (err, results) => {
        if (err) {
            req.session.message = 'Error adding image slider';
            return res.redirect('/admin/createimageslider');
        }
        req.session.message = 'Image slider added successfully';
        return res.redirect('/admin/createimageslider');
    });
});

// https://placehold.co/1280x400/ed9e13/fff

module.exports = router;