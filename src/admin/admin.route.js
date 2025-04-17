const express = require('express');
const { getAdmin, 
     addAdmin,
     updateAdmin, 
     deleteAdmin,
     forgetPassword, 
     verifyOtp, 
     updatePassword, 
      } = require('./admin.controller')
      const {verifyToken} = require('./admin.service');
const verifyUser = require('../../auth/admin-sign-in/admin.login');
// const verifyUser = require('../auth/user-login/user.login');
const route = express.Router();

route.get('/', getAdmin);
route.post('/', addAdmin);
route.put('/:id', updateAdmin);
route.delete('/:id', deleteAdmin);

route.post('/admin-login', verifyUser);
route.post('/forgot-password', forgetPassword);
route.post('/verify-otp', verifyOtp);
route.post('/update-password', updatePassword);

route.get('/verifyToken', verifyToken ,(req, res)=>{
res.send("You can access this properties")
});

module.exports = route;
