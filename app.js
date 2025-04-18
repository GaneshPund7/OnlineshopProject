const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const user = require('./src/user/user.route');
const admin = require('./src/admin/admin.route');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoute = require('./src/products/stock/stock.route');
const OrderRroute = require('./src/products/product-order/order.route');
const paymentRoute = require('./utils/payments/payment.route');
const MONOURL = 'mongodb://localhost:27017/nimapinfotech';
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/user', user);
app.use('/admin', admin);
app.use('/product', productRoute);
app.use('/product-order', OrderRroute);
app.use('/payment', paymentRoute);
app.use('/order', OrderRroute);


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Start Server
mongoose.connect(MONOURL).then(()=>{ console.log(`Database connected successfuly..!`);
})
app.listen(PORT, () => {
    console.log(`Server is running on PORT localhost:${PORT}`);
});
