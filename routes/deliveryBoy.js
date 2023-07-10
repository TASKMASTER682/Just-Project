const express=require('express');
const router = express.Router();


// const { requireSignin, adminMiddleware} = require('../controllers/auth');
const { createDeliveryBoy,getDeliveryBoys,getSingleBoy,loginBoy,signout,deletBoys } = require('../controllers/deliveryBoy');

router.post('/deliveryBoy', createDeliveryBoy);
router.get('/getDeliveryBoys', getDeliveryBoys);
router.get('/getDeliveryBoys/:deliveryId', getSingleBoy);
router.post('/deliverySignin', loginBoy);
router.get('/signout', signout);
router.delete('/deleteDelivery',deletBoys);




module.exports = router;