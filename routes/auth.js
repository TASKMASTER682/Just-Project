const express=require('express');
const router=express.Router();

const {signin,requireSignin,adminMiddleware,authMiddleware}=require('../controllers/auth');


router.post('/signin',signin);


module.exports=router;