const express=require('express');
const Authcontroller=require('../controller/authcontroller');
const router=express.Router();
router.post('/user/signup',Authcontroller.userSignUp);
router.post('/user/login',Authcontroller.userLogin);
module.exports=router;