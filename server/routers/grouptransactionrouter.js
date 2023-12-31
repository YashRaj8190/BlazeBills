const express =require('express');
const groupTransactionController=require('../controller/grouptransactioncontroller');
const router=express.Router();
router.post('/user/grouptransaction',groupTransactionController.addGroupTransaction);
router.post('/user/getusersgrouptransaction',groupTransactionController.getUsersGroupTransaction);
router.post('/user/getsinglegrouptransaction',groupTransactionController.getSingleGroupTransaction);
router.post('/user/updatesinglegrouptransaction',groupTransactionController.updateSingleGroupTransaction);
module.exports=router;