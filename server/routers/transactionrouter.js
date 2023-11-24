const express=require('express');
const multer=require('multer');
const Transactioncontroller=require('../controller/transactioncontroller');
const router=express.Router();
//storing images in files
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,`public/upload/`);
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`);
    },
});
const upload=multer({storage:storage});
router.post('/user/addtransaction/:user_id',upload.single("expensereciept"),Transactioncontroller.addTransactiondetails);
router.post('/user/gettransaction',Transactioncontroller.getTransactiondetails);
router.post('/user/getalltransaction',Transactioncontroller.getAllTransactiondetails);
module.exports=router;