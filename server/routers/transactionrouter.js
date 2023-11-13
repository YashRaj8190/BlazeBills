const express=require('express');
const Transactioncontroller=require('../controller/transactioncontroller');
const router=express.Router();
router.post('/user/addtransaction',Transactioncontroller.addTransactiondetails);
router.post('/user/gettransaction',Transactioncontroller.getTransactiondetails);
router.post('/user/getalltransaction',Transactioncontroller.getAllTransactiondetails);
module.exports=router;