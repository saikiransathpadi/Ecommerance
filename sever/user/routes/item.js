const express = require('express');
const itemModal = require('../modals/item-modal');
const uuid = require('uuid');

const router = express.Router();

router.get('/', (req, res) => {
    itemModal.find().then((itemData) => {
        res.status(200).send({ item: itemData });
    });
});

router.post('/add', (req, res) => {
    itemModal
        .insertMany([
            ...req.body.items.map((item) => {
                return {
                    ...item,
                    item_id: uuid.v4(),
                };
            }),
        ])
        .then((itemData) => {
            res.status(200).send('Data Added Successfully');
        })
        .catch((e) => res.status(400).send(e.message));
});

module.exports = router;
