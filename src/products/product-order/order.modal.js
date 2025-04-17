
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productOrderDetails' }],
    totalAmount: Number,
    status: { type: String, default: 'Pending' }
  }, { timestamps: true });

module.exports = mongoose.model('productOrderDetails', orderSchema);
