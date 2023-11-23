
const RecurringBill=require('../models/recurringbills');
const storeNotification = async (userId, billId,notificationData) => {
    try {
      // Create a new instance of the Notification model
      const newNotification = {
        billId:billId,
        user_id: userId,
        title: notificationData.title,
        body: notificationData.body,
      };
  
      // Save the new notification to the database
      
  
      console.log(`Notification saved for user ${userId}:`, newNotification);
      return newNotification;
    } catch (error) {
      console.error(`Error storing notification for user ${userId}:`, error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };
const  findUpcomingBills = async (user_id) => {
    // Implement the logic to find upcoming bills
    // For simplicity, this example fetches bills due within the next 24 hours
    const now = new Date();
    const twentyFourHoursFromNow = new Date(now.getTime() + 24*2* 60 * 60 * 1000);
  
    return await RecurringBill.find({
        next_due_date: {
          $lte: twentyFourHoursFromNow,
        },
        user_id: user_id, // Assuming user_id is a variable containing the user ID
      });
  };
class billController{
    static  addBill = async (req, res) => {
        console.log(req.body);
        try {
            const user_id=req.body.user_id;
          const { amount, next_due_date, bill } = req.body.billData;
      
          // Create a new instance of the RecurringBill model
          const newBill = new RecurringBill({
            user_id,
            amount,
            next_due_date,
            bill,
          });
      
          // Save the new bill to the database
          const savedBill = await newBill.save();
      
          // Respond with the saved bill
          res.status(201).json(savedBill);
        } catch (error) {
          console.error('Error adding bill:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };
    
      
      static sendNotificationsForUpcomingBills = async (user_id) => {
        try {
          let storedNotifications = [];
          const upcomingBills = await findUpcomingBills(user_id);
      
          // Use Promise.all to wait for all asynchronous operations to complete
          await Promise.all(
            upcomingBills.map(async (bill) => {
              const newNotification = await storeNotification(bill.user_id,bill._id, {
                title: 'Upcoming Bill',
                body: `You have a bill of $${bill.amount} due on ${bill.next_due_date}`,
              });
              storedNotifications.push(newNotification);
            })
          );
      
          // Now, the storedNotifications array should be populated
          //console.log(storedNotifications);
          
          return storedNotifications;
        } catch (error) {
          console.error('Error in recurring bills job:', error);
        }
      };
      static triggerNotification=async (req, res) => {
        try {
            const user_id=req.params.user_id;
          // Call the function to send notifications
          const upcomingBills=await billController.sendNotificationsForUpcomingBills(user_id);
          res.status(200).json({ message: 'Notifications triggered successfully.',upcomingBills });
        } catch (error) {
          console.error('Error triggering notifications:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
      static romoveBill=async(req,res)=>{
        try {
            // Find the bill by ID and remove it
            const billId=req.body.billId;
            console.log(req.body);
            const removebill = await RecurringBill.deleteOne({_id:billId});
        
            if (!removebill) {
              return res.status(404).json({ message: 'Bill not found' });
            }
        
            res.status(200).json({ message: 'Bill removed successfully', removebill });
          } catch (error) {
            console.error('Error removing bill:', error);
            res.status(500).json({ message: 'Internal server error' });
          }
      }
      
}
module.exports=billController;