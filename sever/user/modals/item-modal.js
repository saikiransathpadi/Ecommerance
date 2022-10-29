const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    item_name: { type: String, required: true },
    item_id: { type: String, unique: true },
    item_category: { type: String, required: true },
    item_image: String,
    price: {type: Number, required: true},
});

const itemModal = mongoose.model('item', itemSchema);
module.exports = itemModal;
