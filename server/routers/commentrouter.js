const CommentController=require('../controller/commentcontroller');
const express=require('express');
const router=express.Router();
const authenticate=require('../Middleware/AuthMiddleware');
router.post('/user/addcomment',authenticate,CommentController.addComment);
router.post('/user/getcommentbytransactionid',authenticate,CommentController.getCommentsByTransactionId);
module.exports=router;