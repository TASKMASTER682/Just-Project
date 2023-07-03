const express=require('express');
const router = express.Router();


// const { requireSignin, adminMiddleware} = require('../controllers/auth');
const { createDeliveryBoy,getDeliveryBoys,getSingleBoy } = require('../controllers/deliveryBoy');

router.post('/deliveryBoy', createDeliveryBoy);
router.get('/getDeliveryBoys', getDeliveryBoys);
router.get('/getDeliveryBoys/:deliveryId', getSingleBoy);




module.exports = router;