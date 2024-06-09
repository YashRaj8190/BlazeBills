const express =require('express');
const router=express.Router();
const billController=require('../controller/billcontroller');
const authenticate=require('../Middleware/AuthMiddleware');
router.post('/user/addbill',authenticate,billController.addBill);
router.post('/trigger-notifications/:user_id',authenticate, billController.triggerNotification);
router.post('/removebill',authenticate, billController.romoveBill);
module.exports=router;