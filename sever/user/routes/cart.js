const { Router } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
const cartModal = require('../modals/cart-modal');

const router = express.Router();

router.post('/add', async (req, res) => {
    console.log(req.headers.authorization, req.body, process.env.SECRET_KEY);
    try {
        const username = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        console.log(username);
        const item = await cartModal.find({ item_id: req.body.item_id, username });
        if (item.length > 0) {
            const resp = await cartModal.updateOne({ item_id: req.body.item_id, username }, { quantity: item[0].quantity + 1 });
            return res.status(200).send('updated sucessfully');
        }
        cartModal
            .create({ username, ...req.body, quantity: 1 })
            .then(() => {
                res.status(200).send('item added to cart sucessfully');
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.get('/', (req, res) => {
    try {
        const username = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        cartModal.find({ username: username }).then((cart) => {
            res.status(200).send({ cart: cart });
        });
    } catch (err) {
        res.status(400).send('User not authorized');
    }
});

router.delete('/remove/:id', (req, res) => {
    cartModal
        .deleteOne({ item_id: req.params.id })
        .then(() => {
            res.status(200).send('item removeded from cart sucssfully');
        })
        .catch(() => {
            res.status(400).send(err);
        });
});

module.exports = router;
