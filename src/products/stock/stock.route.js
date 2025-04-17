const express = require('express');
const productRoute =  express.Router();
const { getProduct, addProdcut, updateProduct, deleteProduct} = require('./stock.controller');
const { verifyAdminToken } = require('../../admin/admin.service');

productRoute.get('/', getProduct);
productRoute.post('/',verifyAdminToken, addProdcut);
productRoute.put('/:id',verifyAdminToken, updateProduct);
productRoute.delete('/:id',verifyAdminToken, deleteProduct);

module.exports = productRoute;