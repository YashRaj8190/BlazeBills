const mongoose= require('mongoose');
const commentSchema=new mongoose.Schema({
    transactionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'GroupTransaction',
        required:true,
    },
    commentedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    comment:{
     type:String,
     required:true,
    }
});
const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;