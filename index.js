const express = require('express');
const compression = require("compression");
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./db');
const cron=require('node-cron');
const orderRoutes = require('./routes/order');
const deliveryBoyRoutes = require('./routes/deliveryBoy');
const customerRoutes = require('./routes/customer');
const orders=require('./controllers/order')



let port=null
if(process.env.Environment==='development'){
    port=8000
}else{
    port=process.env.PORT
}

const app = express();

app.use(cors({ origin:'http://localhost:3000' }));
// orders.createOrders();
connectDB();
app.use(express.json({ limit: '100mb', extended: true }));
app.use(cookieParser());
app.use(compression());

process.setMaxListeners(Infinity);

//routes
// app.use('/api', dailyRoutes);
app.use('/api', orderRoutes);
app.use('/api', customerRoutes);
app.use('/api', deliveryBoyRoutes);


cron.schedule('0 0 * * *', orders.createOrders);


app.listen(port, () => { console.log(`server is running on port ${port}`) });
