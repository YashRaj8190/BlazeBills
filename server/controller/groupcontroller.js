const Group = require('../models/groupSchema');
const User = require('../models/UserSchema');
class groupController {
    static createGroup = async (req, res) => {
        try {
            const { groupName, admin, members } = req.body;
            const newGroup = new Group({
                groupName,
                admin,
                members,
            });

            await newGroup.save();

            res.status(201).json({ message: 'Group created successfully' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Some error occurred' });
        }
    }
    static getUsersGroup=async(req,res)=>{
        console.log("all",req.body);
        try {
            const UserPhoneNumber = req.body.userPhone; // Assuming userPhone is the variable containing the user's phone number fetched through his details
            const groups = await Group.find({ 
                $or: [
                    { 'admin.phone': UserPhoneNumber },
                    { 'members.phone': UserPhoneNumber }
                  ]
            });
        
            res.status(200).json(groups);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Some error occurred' });
          } 
    }
    static getSingleGroup=async(req,res)=>{
        
        try {
            const groupId = req.body.groupId; 
            const group = await Group.find({ _id:groupId});
        
            res.status(200).json(group);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Some error occurred' });
          } 
    }
    static checkUser = async (req, res) => {
        const { phone } = req.body;
      
        try {
          // Check if a user with the provided phone number exists
          const user = await User.findOne({ phone });
          // Return a response indicating whether the user exists
          res.status(200).json({ exists: !!user });
        } catch (error) {
          console.error('Error checking user existence:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}
module.exports=groupController;