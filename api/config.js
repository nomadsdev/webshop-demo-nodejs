const express = require('express');
const router = express.Router();
const connectMysql = require('../lib/mysql');

router.post('/', (req, res) => {
    const { image, name, description, fb, dis, color } = req.body;

    let query = 'UPDATE config SET ';
    const values = [];
    const setStatements = [];

    if (image) {
        setStatements.push('image = ?');
        values.push(image);
    }
    if (name) {
        setStatements.push('name = ?');
        values.push(name);
    }
    if (description) {
        setStatements.push('description = ?');
        values.push(description);
    }
    if (fb) {
        setStatements.push('fb = ?');
        values.push(fb);
    }
    if (dis) {
        setStatements.push('dis = ?');
        values.push(dis);
    }
    if (color) {
        setStatements.push('color = ?');
        values.push(color);
    }

    if (setStatements.length === 0) {
        req.session.message = 'No changes made';
        return res.redirect('/admin/config');
    }

    query += setStatements.join(', ');
    query += ' WHERE id = 1';

    connectMysql.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating config:', err);
            req.session.message = 'Error updating config';
            return res.redirect('/admin/config');
        }
        req.session.message = 'Config updated successfully';
        res.redirect('/admin/config');
    });
});

module.exports = router;