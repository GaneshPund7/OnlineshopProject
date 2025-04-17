const express = require('express');
const OrderRroute =  express.Router();
const { getProduct, addProdcut, updateProduct, deleteProduct} = require('./order.controller');
const { verifyAdminToken } = require('../../admin/admin.service');
const { verifyUserToken } = require('../../user/user.service');

OrderRroute.get('/',verifyUserToken, getProduct);
OrderRroute.post('/',verifyUserToken, addProdcut);
// OrderRroute.put('/:id',verifyUserToken, updateProduct);
OrderRroute.delete('/:id',verifyUserToken, deleteProduct);

module.exports = OrderRroute;