const express =require('express');
const router=express.Router();
const billController=require('../controller/billcontroller');
router.post('/user/addbill',billController.addBill);
router.post('/trigger-notifications/:user_id', billController.triggerNotification);
router.post('/removebill', billController.romoveBill);
module.exports=router;