
const mongoose = require('mongoose');
const productdetails = mongoose.Schema({

    productName: { type: String },
    brand: { type: String },
    model: { type: String },
    processor: { type: String },
    ram: { type: String },
    storage: { type: String },
    graphics: { type: String },
    display: { type: String },
    operatingSystem: { type: String },
    ports: { type: String },
    connectivity: { type: String },
    battery: { type: String },
    weight: { type: String },
    price: { type: Number },
    stock: { type: Number },
    imageUrl: { type: String },
    description:
        { type: String },
}
    , {
        timestamps: true
    })
module.exports = mongoose.model('productdetails', productdetails);
