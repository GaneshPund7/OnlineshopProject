const express = require('express');
const createOrder = require('./payment.controller');
const paymentRoute = express.Router();

paymentRoute.post('/', createOrder);

module.exports = paymentRoute;