const CommentController=require('../controller/commentcontroller');
const express=require('express');
const router=express.Router();
router.post('/user/addcomment',CommentController.addComment);
router.post('/user/getcommentbytransactionid',CommentController.getCommentsByTransactionId);
module.exports=router;