const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        default: Date.now,
        expires: 60
    },
    otp: {
        type: Number,
        default: Date.now,
        expires: 60
    }
})
module.exports = mongoose.model('verifyOtp', otpSchema);