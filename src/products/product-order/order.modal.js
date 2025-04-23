
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userdata' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productdetails' }],
    totalAmount: Number,
    status: { type: String, default: 'Pending' }
  }, { timestamps: true });

module.exports = mongoose.model('productOrderDetails', orderSchema);
