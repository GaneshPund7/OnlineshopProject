const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    adminName: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}
    , {
        timestamps: true
    })
module.exports = mongoose.model('adminData', adminSchema);
