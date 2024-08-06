const mysql = require('mysql');
require('dotenv').config();

const connectMysql = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA,
});

connectMysql.connect((err) => {
    if (err) {
        console.error('Error connection Mysql');
    }
    console.log('Connected to Mysql');
});

module.exports = connectMysql;