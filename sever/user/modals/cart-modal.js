const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    item_id: {
        type: String,
        required: true,
    },
    item_name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const cartModal = mongoose.model('cart', cartSchema);
module.exports = cartModal;
