const express = require('express');
const OrderRroute =  express.Router();
const { getProduct, getProductByID} = require('./order.controller');
const { verifyAdminToken } = require('../../admin/admin.service');
const { verifyUserToken } = require('../../user/user.service');

OrderRroute.get('/', getProduct);
OrderRroute.get('/:id', getProductByID);
// OrderRroute.put('/:id',verifyUserToken, updateProduct);
OrderRroute.delete('/:id',verifyUserToken);

module.exports = OrderRroute;