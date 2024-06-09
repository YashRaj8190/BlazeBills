const express =require('express');
const groupTransactionController=require('../controller/grouptransactioncontroller');
const router=express.Router();
const authenticate=require('../Middleware/AuthMiddleware');
router.post('/user/grouptransaction',authenticate,groupTransactionController.addGroupTransaction);
router.post('/user/getusersgrouptransaction',authenticate,groupTransactionController.getUsersGroupTransaction);
router.post('/user/getsinglegrouptransaction',authenticate,groupTransactionController.getSingleGroupTransaction);
router.post('/user/updatesinglegrouptransaction',authenticate,groupTransactionController.updateSingleGroupTransaction);
module.exports=router;