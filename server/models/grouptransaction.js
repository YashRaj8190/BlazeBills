const mongoose= require('mongoose');
const groupTransactionSchema=new mongoose.Schema({
    groupId:{
        type:String,
        required:true
    },
   transactionFrom:{
    type:Object,
    required:true
},
amount:{
    type:Number,
    required:true
},
expenseDetails:{
    type:String,
    required:true
},
transactionMembers:{
    type:Array,
    required:true
},
date:{
    type:Date,
    default:Date.now()

}
});
const GroupTransaction=mongoose.model('GroupTransaction',groupTransactionSchema);
module.exports=GroupTransaction;