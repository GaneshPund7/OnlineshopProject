const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const user = require('./src/user/user.route');
const admin = require('./src/admin/admin.route');
const cors = require('cors');
const os = require('os');
const mongoose = require('mongoose');
const cluster = require('cluster');
const productRoute = require('./src/products/stock/stock.route');
const OrderRroute = require('./src/products/product-order/order.route');
const paymentRoute = require('./utils/payments/payment.route');
const MONOURL = 'mongodb://localhost:27017/nimapinfotech';

const app = express();
const PORT = process.env.PORT || 3000;
const cpus = os.cpus().length;
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

if(cluster.isMaster){
    console.log(`Worker is running ${process.pid} is running`);
   
    for (let i = 0; i <=cpus; i++) {
        cluster.fork(); 
    }

    cluster.on('exit', (worker, signal)=>{
        console.log(`Worker is ${worker.process.pid} is died`);
        console.log('Server is restarting please wait..!');  
        setTimeout(() => {
            cluster.fork();
        }, 2000);
    })
}
else{
    // Error Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong..!' });
});

// Start Server
mongoose.connect(process.env.MONGO_ATLAS_KEY).then(()=> { console.log(`Database connected successfuly..!`)})
app.listen(PORT, () => {
    console.log(`Server is running on PORT localhost:${PORT}`);
});
}
