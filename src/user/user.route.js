const express = require('express');
const { getUser, 
     addUser,
     updateUser, 
     deleteUser,
     forgetPassword, 
     verifyOtp, 
     updatePassword, 
      } = require('./user.controller');
      const {verifyToken} = require('./user.service');
const verifyUser = require('../../auth/user-sign-in/user.login');
// const verifyUser = require('../auth/user-login/user.login');
const route = express.Router();

route.get('/', getUser);
route.post('/', addUser);
route.put('/:id', updateUser);
route.delete('/:id', deleteUser);

route.post('/login', verifyUser);
route.post('/forgot-password', forgetPassword);
route.post('/verify-otp', verifyOtp);
route.post('/update-password', updatePassword);

module.exports = route;
