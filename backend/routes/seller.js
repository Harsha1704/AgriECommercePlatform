const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// Upload Product
router.post('/product', auth, async (req, res) => {
    const { name, description, price, quantity, category, image } = req.body;

    try {
        const product = new Product({
            seller: req.user.id,
            name,
            description,
            price,
            quantity,
            category,
            image
        });

        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Manage Orders
router.get('/orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ seller: req.user.id });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Track Earnings
router.get('/earnings', auth, async (req, res) => {
    try {
        const orders = await Order.find({ seller: req.user.id });
        const totalEarnings = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        res.json({ totalEarnings });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
