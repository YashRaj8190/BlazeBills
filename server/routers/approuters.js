const express=require('express');
const Authcontroller=require('../controller/authcontroller');
const router=express.Router();
router.post('/user/signup',Authcontroller.userSignUp);
router.post('/user/login',Authcontroller.userLogin);
router.post('/sendotp',Authcontroller.otpSender);
router.post('/verifyotp',Authcontroller.verifyOtp);
router.post('/resetpassword',Authcontroller.resetPassword);
module.exports=router;