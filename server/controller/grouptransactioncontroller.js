const GroupTransaction=require('../models/grouptransaction');


class groupTransactionController{
    static addGroupTransaction=async(req,res)=>{
        //console.log(req.body);
        try{
            //const {groupId,amount,expenseDetails,selectedMembers,expenseAdmin}=req.body;
            //{groupId,amount,expenseDetails,transactionMembers:selectedMembers,transactionFrom:expenseAdmin}
        const newGroupTransaction=await GroupTransaction.create(req.body);
        res.status(200).json({message:"groupTransaction successfully added",data:newGroupTransaction});
        }
        catch(err){
            res.status(500).json({message:"some error occured",error:err});
        }
        
    }
    static getUsersGroupTransaction=async(req,res)=>{
        //console.log(req.body);
        try{

            const usersGroupTransaction=await GroupTransaction.find({
                $or:[
                    { transactionFrom: req.body.phone },
    { transactionMembers: { $elemMatch: { phone:req.body.phone } } }
                   
                ]
        })
            res.status(200).json({message:"all data successfully fatched ", data:usersGroupTransaction});
        }
        catch(err){
            res.status(500).json({message:"unable to fetch transactions",error:err});
        }
    }
}
module.exports=groupTransactionController;