const mongoose = require('mongoose');
const recurringBillSchema = new mongoose.Schema({
  user_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
  },
  amount: {
    type: Number,
    required: true,
  },
  next_due_date: {
    type: Date,
    required: true,
  },
  bill: {
      type: String,
      required: true,
  },
  date:{
    type:Date,
    default:Date.now
  }
});

const RecurringBill = mongoose.model('RecurringBill', recurringBillSchema);

module.exports = RecurringBill;
