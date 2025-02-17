const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// Manage Users
router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Approve/Block User
router.put('/user/:id', auth, async (req, res) => {
    const { status } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.status = status;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Moderate Products
router.get('/products', auth, async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Approve/Reject Product
router.put('/product/:id', auth, async (req, res) => {
    const { status } = req.body;

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        product.status = status;
        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Generate Reports
router.get('/reports', auth, async (req, res) => {
    try {
        const orders = await Order.find();
        const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();

        res.json({
            totalSales,
            totalUsers,
            totalProducts
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
