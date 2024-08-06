const express = require('express');
const router = express.Router();
const connectMysql = require('../lib/mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

function generateToken() {
    const randomString = Math.random().toString(36).substring(2, 12).toUpperCase();
    return randomString;
}

router.post('/register', [
    body('username').isLength({ min: 1 }).withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords must match');
        }
        return true;
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.message = errors.array().map(err => err.msg).join(', ');
        return res.redirect('/signup');
    }

    const { username, email, password } = req.body;

    connectMysql.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], async (err, results) => {
        if (err) {
            req.session.message = 'An error occurred during registration.';
            return res.redirect('/signup');
        }

        if (results.length > 0) {
            req.session.message = 'Username or email already exists.';
            return res.redirect('/signup');
        }

        try {
            const token = generateToken();
            const hashedPassword = await bcrypt.hash(password, 10);

            connectMysql.query('INSERT INTO users (username, email, password, token) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, token], (err, results) => {
                if (err) {
                    req.session.message = 'An error occurred during registration.';
                    return res.redirect('/signup');
                }

                res.redirect('/signin');
            });
        } catch (error) {
            console.error('Error during registration:', error.message);
            req.session.message = 'An error occurred during registration.';
            return res.redirect('/signup');
        }
    });
});

router.post('/login', [
    body('username').isLength({ min: 1 }).withMessage('Username is required'),
    body('password').isLength({ min: 1 }).withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.message = errors.array().map(err => err.msg).join(', ');
        return res.redirect('/signin');
    }

    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';

    connectMysql.query(query, [username], async (err, result) => {
        if (err) {
            console.error(err);
            req.session.message = 'Internal Server Error';
            return res.redirect('/signin');
        }

        if (result.length === 0) {
            req.session.message = 'Invalid username or password';
            return res.redirect('/signin');
        }

        const user = result[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            req.session.message = 'Invalid username or password';
            return res.redirect('/signin');
        }

        const token = jwt.sign({ id: user.id }, process.env.KEY_AUTH, { expiresIn: '1h' });
        res.cookie('token_webshop', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 });
        res.cookie('token_provider', user.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 });

        res.redirect('/');
    });
});

router.post('/logout', (req, res) => {
    res.clearCookie('token_webshop');
    res.clearCookie('token_provider');
    res.redirect('/signin');
});

module.exports = router;