const express=require('express');
const router = express.Router();
const {deleteOrders,cancelOrder,getAllDinnerOrders,getAllLunchOrders,orderDelivery } = require('../controllers/order');


// router.put('/orders', requireSignin, adminMiddleware, createOrder);
router.get('/newOrders/dinner',getAllDinnerOrders);
router.get('/newOrders/lunch',getAllLunchOrders);
router.delete('/deleteOrders',deleteOrders);
router.put('/customer/:customerId/order/:orderId',cancelOrder)
router.put('/customer/:customerId/order/delivery/:orderId',orderDelivery)


module.exports = router;