const express = require('express');
const compression = require("compression");
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./db');
const cron=require('node-cron');
const orders=require('./controllers/order')


const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const deliveryBoyRoutes = require('./routes/deliveryBoy');
const customerRoutes = require('./routes/customer');
// const { createOrders}=require('./controllers/order')

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
app.use('/api', authRoutes);


// cron.schedule('0 0 * * *', orders.createOrders);
// orders.createOrders();


const port = 8000;
app.listen(port, () => { console.log(`server is running on port ${port}`) });
