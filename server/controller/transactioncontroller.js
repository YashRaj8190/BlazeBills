
const Transactiondetails = require('../models/transactionSchema');

class Transactioncontroller {
  static addTransactiondetails = async (req, res) => {
    try {
      console.log(req.body);
     const {user_id}=req.body;
     const {transactionType,description,category,amount}=req.body.formData;
      const newTransaction = await Transactiondetails.create({transactionType,description,category,amount,user_id});
      console.log(newTransaction);
      res.status(200).json({ message: "new Transaction is added successfully" });
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  static getTransactiondetails = async (req, res) => {
    // last week transection amount
    
    if (req.body.view === '7') {
      try {
        const today = new Date();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);

        const transactions = await Transactiondetails.find({
          user_id:req.body.user_id,
          date: { $gte: oneWeekAgo, $lte: today },
        }).sort({date:-1});
        const totalAmountByDay = {};

        transactions.forEach((transaction) => {
          const dateKey = transaction.date.toISOString().split('T')[0];

          if (totalAmountByDay[dateKey] === undefined) {
            totalAmountByDay[dateKey] = 0;
          }

          totalAmountByDay[dateKey] += transaction.amount;
        });
          
        res.status(200).json(totalAmountByDay);
      } catch (err) {

        res.status(500).json({ error: 'Failed to retrieve data' });
      }
    }
    // monthly total transaction amount
    if (req.body.view === '30') {
      try {
        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);

        const transactions = await Transactiondetails.find({
          user_id:req.body.user_id,
          date: { $gte: oneYearAgo, $lte: today },
        }).sort({date:1});

        const monthlyTotals = {};

        transactions.forEach((transaction) => {
          const date = new Date(transaction.date);
          const year = date.getFullYear();
          const month = date.getMonth() + 1; // Add 1 because months are 0-indexed

          const key = `${year}-${month}`;

          if (!monthlyTotals[key]) {
            monthlyTotals[key] = 0;
          }

          monthlyTotals[key] += transaction.amount;
        });
       
        res.status(200).json(monthlyTotals);
      }
      catch (err) {
        res.status(500).json({ message: err.message });
      }

    };
    // yearly transaction amount
    if (req.body.view === '365') {
      try {
        const transactions = await Transactiondetails.find({user_id:req.body.user_id}).sort({date:-1});

        const yearlyTotals = {};

        transactions.forEach((transaction) => {
          const date = new Date(transaction.date);
          const year = date.getFullYear();
          const key = year;

          if (!yearlyTotals[key]) {
            yearlyTotals[key] = 0;
          }

          yearlyTotals[key] += transaction.amount;
        });
        
        res.status(200).json(yearlyTotals);
      }
      catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  }
  static getAllTransactiondetails=async(req,res)=>{
    try{
      
      const transactions=await Transactiondetails.find({user_id:req.body._id}).sort({date:-1});
        res.status(200).json(transactions);
    }
    catch(err){
      res.status(501).json({message:err.message});
    }
    
  }

}
module.exports = Transactioncontroller;