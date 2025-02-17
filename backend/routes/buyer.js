const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// Search Products
router.get('/search', async (req, res) => {
    const { query, category } = req.query;

    try {
        let products;
        if (category) {
            products = await Product.find({
                name: { $regex: query, $options: 'i' },
                category
            });
        } else {
            products = await Product.find({
                name: { $regex: query, $options: 'i' }
            });
        }

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add to Cart
router.post('/cart', auth, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const cartItem = {
            product: productId,
            quantity
        };

        const user = await User.findById(req.user.id);
        user.cart.push(cartItem);
        await user.save();

        res.json(user.cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Place Order
router.post('/order', auth, async (req, res) => {
    const { items, totalAmount, paymentMethod } = req.body;

    try {
        const order = new Order({
            user: req.user.id,
            items,
            totalAmount,
            paymentMethod
        });

        await order.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
