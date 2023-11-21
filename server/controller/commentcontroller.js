const Comment=require('../models/commentSchema');
class CommentController{
    static addComment= async (req, res) => {
        try {
          const { transactionId, commentedBy, comment } = req.body;
      
          // Create a new comment instance
          const newComment = new Comment({
            transactionId,
            commentedBy,
            comment,
          });
      
          // Save the comment to the database
          const savedComment = await newComment.save();
      
          res.status(201).json(savedComment);
        } catch (error) {
          console.error(error.message);
          res.status(500).json({ error: 'Server Error' });
        }
      };
      static getCommentsByTransactionId=async(req,res)=>{
        try{
            console.log(req.body);
            const {transactionId}=req.body;
            const comments=await Comment.find({transactionId}).populate('commentedBy',['name','phone']).sort({ date: 'desc' });
            res.status(200).json(comments);
  
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Server Error' });
          }
      }
}
module.exports=CommentController;