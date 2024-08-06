const connectMysql = require('../lib/mysql');

const getConfig = (req, res, next) => {
    const sqlConfig = 'SELECT * FROM config';

    connectMysql.query(sqlConfig, (err, configResults) => {
        if (err) {
            console.error('Error fetching config:', err);
            return res.status(500).send('Error fetching config');
        }

        if (!configResults || configResults.length === 0) {
            res.locals.config = {};
            return next();
        }

        res.locals.config = configResults[0];
        next();
    });
};

module.exports = getConfig;