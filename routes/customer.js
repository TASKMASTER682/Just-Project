const express=require('express');
const router=express.Router();

const {createCustomer,updateCustomer,getAllCustomers,customerOrderHistory} =require('../controllers/customers');
// const { requireSignin, adminMiddleware} = require('../controllers/auth');

router.post('/createCustomer',createCustomer);
router.put('/updateCustomer/:id',updateCustomer);
router.get('/getAllCustomers',getAllCustomers);
router.get('/orderHistory/:customerId',customerOrderHistory);


// requireSignin,adminMiddleware,

// const {signup,signin,signout,forgotPassword, resetPassword,preSignup}=require('../controllers/auth');

// const {runValidation}=require('../validators');
// const {userSignupValidator,userSigninValidator, forgotPasswordValidator,resetPasswordValidator}=require('../validators/auth')

// router.post('/pre-signup', userSignupValidator, runValidation, preSignup);
// router.post('/signup',signup);
// router.post('/signin',userSigninValidator,runValidation,signin);
// router.get('/signout',signout);
// router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
// router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword);


module.exports=router;