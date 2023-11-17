const Group = require('../models/groupSchema');
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
        try {
            const userPhone = req.body.phone; // Assuming userPhone is the variable containing the user's phone number fetched through his details
        
            const groups = await Group.find({ 'members.phone': userPhone });
        
            res.json(groups);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Some error occurred' });
          } 
    }
}
module.exports=groupController;