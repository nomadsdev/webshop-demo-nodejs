const express = require('express');
const router = express.Router();
const connectMysql = require('../lib/mysql');

const tokenProvider = require('../middleware/tokenProvider');
const checkLogin = require('../middleware/checkLogin');
const checkAdmin = require('../middleware/checkAdmin');
const proFile = require('../middleware/proFile');
const config = require('../middleware/config');

router.get('/', tokenProvider, config, (req, res) => {
    const sqlProduct = `SELECT * FROM products`;
    const sqlCategories = `SELECT * FROM categories`;
    const sqlStock = `SELECT prefer_token AS token, COUNT(*) AS stock_count 
                      FROM stock 
                      WHERE status <> 1
                      GROUP BY prefer_token;`;
    const sqlImageSlider = `SELECT * FROM image_slider`;

    connectMysql.query(sqlProduct, (err, productsResults) => {
        connectMysql.query(sqlCategories, (err, categoriesResults) => {
            connectMysql.query(sqlStock, (err, stockResults) => {
                connectMysql.query(sqlImageSlider, (err, imageSliderResults) => {
                    const stockMap = {};
                    stockResults.forEach(stock => {
                        stockMap[stock.token] = stock.stock_count;
                    });
                    productsResults = productsResults.map(product => {
                        return {
                            ...product,
                            stock_count: stockMap[product.token] || 0
                        };
                    });
                    res.render('index', { 
                        title: 'Home', 
                        user: req.user, 
                        products: productsResults, 
                        categories: categoriesResults, 
                        imageslider: imageSliderResults 
                    });
                });
            });
        });
    });
});
router.get('/products', tokenProvider, config, (req, res) => {
    const sqlProduct = `SELECT * FROM products`;
    const sqlCategories = `SELECT * FROM categories`;
    const sqlStock = `SELECT prefer_token AS token, COUNT(*) AS stock_count 
                      FROM stock 
                      WHERE status <> 1
                      GROUP BY prefer_token;`;
    
    connectMysql.query(sqlProduct, (err, productsResults) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).send('Error fetching products');
        }

        connectMysql.query(sqlCategories, (err, categoriesResults) => {
            if (err) {
                console.error('Error fetching categories:', err);
                return res.status(500).send('Error fetching categories');
            }

            connectMysql.query(sqlStock, (err, stockResults) => {
                if (err) {
                    console.error('Error fetching stock:', err);
                    return res.status(500).send('Error fetching stock');
                }

                const stockMap = {};
                stockResults.forEach(stock => {
                    stockMap[stock.token] = stock.stock_count;
                });

                productsResults = productsResults.map(product => {
                    return {
                        ...product,
                        stock_count: stockMap[product.token] || 0
                    };
                });

                res.render('products', { title: 'Products', user: req.user, products: productsResults, categories: categoriesResults });
            });
        });
    });
});
router.get('/product/:token', tokenProvider, config, (req, res) => {
    const productToken = req.params.token;
    const sqlProduct = `SELECT * FROM products WHERE token = ?`;
    const sqlStock = `SELECT COUNT(*) AS stock_count 
                      FROM stock 
                      WHERE prefer_token = ? AND status <> 1`;

    connectMysql.query(sqlProduct, [productToken], (err, productResults) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).send('Error fetching product');
        }

        connectMysql.query(sqlStock, [productToken], (err, stockResults) => {
            if (err) {
                console.error('Error fetching stock:', err);
                return res.status(500).send('Error fetching stock');
            }

            const product = productResults[0];
            const stock_count = (stockResults.length > 0) ? stockResults[0].stock_count : 0;

            res.render('productdetails', { title: product.name, user: req.user, product: { ...product, stock_count } });
        });
    });
});
router.get('/category/:token', tokenProvider, config, (req, res) => {
    const categoryToken = req.params.token;

    const sqlCategory = 'SELECT * FROM categories WHERE token = ?';
    const sqlProducts = `SELECT * FROM products 
                         WHERE crefer_token = ?`;
    const sqlStock = `SELECT prefer_token AS token, COUNT(*) AS stock_count 
                      FROM stock 
                      WHERE status <> 1 
                      GROUP BY prefer_token`;

    connectMysql.query(sqlCategory, [categoryToken], (err, categoryResults) => {
        if (err) {
            console.error('Error fetching category:', err);
            return res.status(500).send('Error fetching category');
        }

        const category = categoryResults[0];

        connectMysql.query(sqlProducts, [categoryToken], (err, productResults) => {
            if (err) {
                console.error('Error fetching products:', err);
                return res.status(500).send('Error fetching products');
            }

            connectMysql.query(sqlStock, (err, stockResults) => {
                if (err) {
                    console.error('Error fetching stock:', err);
                    return res.status(500).send('Error fetching stock');
                }

                const stockMap = {};
                stockResults.forEach(stock => {
                    stockMap[stock.token] = stock.stock_count;
                });

                productResults = productResults.map(product => {
                    return {
                        ...product,
                        stock_count: stockMap[product.token] || 0
                    };
                });

                res.render('categoryproducts', {
                    title: category.name,
                    user: req.user,
                    category: category,
                    products: productResults
                });
            });
        });
    });
});
router.get('/signin', tokenProvider, checkLogin, config, (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    res.render('signin', { title: 'Sign In', user: req.user, message });
});
router.get('/signup', tokenProvider, checkLogin, config, (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    res.render('signup', { title: 'Sign Up', user: req.user, message });
});
router.get('/profile', tokenProvider, proFile, config, (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    res.render('profile', { title: 'Profile', user: req.user, stock: req.stock, message });
});
router.get('/profile/fillcode', tokenProvider, proFile, config, (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    res.render('fillcode', { title: "Fill Code", user: req.user, message })
});
router.get('/admin', tokenProvider, checkAdmin, config, (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    res.render('admin', { title: 'Admin', user: req.user, message });
});
router.get('/admin/config', tokenProvider, checkAdmin, config, (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    const sqlConfig = 'SELECT * FROM config';
    connectMysql.query(sqlConfig, (err, configresults) => {
        if (!configresults || configresults.length === 0) {
            return res.status(404).send('No configuration found');
        }
        const configs = configresults[0];
        res.render('config', { title: 'Config Web Site', user: req.user, message, configs });
    });
});
router.get('/admin/generatekeycode', tokenProvider, checkAdmin, config, (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    res.render('generatekeycode', { title: "code generation", user: req.user, message })
});
router.get('/admin/createcategories', tokenProvider, checkAdmin, config, (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    res.render('createcategories', { title: 'Create Categories', user: req.user, message });
});
router.get('/admin/createimageslider', tokenProvider, checkAdmin, config, (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    res.render('createimageslider', { title: 'Create Image Slider', user: req.user, message });
});
router.get('/admin/createproducts', tokenProvider, checkAdmin, config, (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    const sqlCategories = `SELECT * FROM categories`;
    connectMysql.query(sqlCategories, (err, categoriesresults) => {
        res.render('createproducts', { title: 'Create Products', user: req.user, message, categories: categoriesresults });
    });
});
router.get('/admin/manageproducts', tokenProvider, checkAdmin, config, (req, res) => {
    const message = req.session.message;
    req.session.message = null;

    const sqlProduct = `SELECT * FROM products`;
    const sqlStock = `SELECT prefer_token AS token, COUNT(*) AS stock_count 
                      FROM stock 
                      WHERE status <> 1
                      GROUP BY prefer_token`;

    connectMysql.query(sqlProduct, (err, productresults) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).send('Error fetching products');
        }

        connectMysql.query(sqlStock, (err, stockresults) => {
            if (err) {
                console.error('Error fetching stock:', err);
                return res.status(500).send('Error fetching stock');
            }

            const stockMap = {};
            stockresults.forEach(stock => {
                stockMap[stock.token] = stock.stock_count;
            });

            productresults = productresults.map(product => {
                return {
                    ...product,
                    stock_count: stockMap[product.token] || 0
                };
            });

            res.render('manageproducts', { 
                title: 'Manage Products', 
                user: req.user, 
                message, 
                products: productresults 
            });
        });
    });
});
router.get('/admin/managecategories', tokenProvider, checkAdmin, config, (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    const sqlCategories = `SELECT * FROM categories`;
    connectMysql.query(sqlCategories, (err, categoriesresults) => {
        res.render('managecategories', { title: 'Manage Categories', user: req.user, message, categories: categoriesresults });
    });
});
router.get('/admin/managestock', tokenProvider, checkAdmin, config, (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    const sqlStock = `
        SELECT stock.*, products.name AS product_name
        FROM stock
        LEFT JOIN products ON stock.prefer_token = products.token
    `;
    const sqlProduct = `SELECT * FROM products`;
    connectMysql.query(sqlStock, (err, stockresults) => {
        connectMysql.query(sqlProduct, (err, productsresults) => {
            res.render('managestock', { title: 'Manage Stock', user: req.user, message, stocks: stockresults, products: productsresults });
        });
    });
});

module.exports = router;