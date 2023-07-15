const express=require('express');
const router=express.Router();

const {createCustomer,updateCustomer,getAllCustomers,customerOrderHistory,getCustomer,deletCustomers} =require('../controllers/customers');
const {isAdmin} =require('../helpers/authMiddleware')

router.post('/createCustomer',createCustomer);
router.put('/updateCustomer/:customerId',updateCustomer);
router.get('/getAllCustomers',getAllCustomers);
router.get('/getCustomer/:customerId',getCustomer);
router.get('/orderHistory/:customerId',customerOrderHistory);
router.delete('/deleteCustomers',deletCustomers);




module.exports=router;