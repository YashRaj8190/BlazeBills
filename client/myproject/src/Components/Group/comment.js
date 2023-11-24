import React from 'react';
import { FaRegClock, FaComment } from 'react-icons/fa';
const CommentItem = ({ comment }) => {
  // Convert the date string to a JavaScript Date object
  console.log(comment);
  const commentDate = new Date(comment.date);
  const user=JSON.parse(localStorage.getItem('user'));
  
  return (
    <li className="mb-4">
  <div className="flex items-center dark:text-white dark:bg-slate-800">
    <div className='mr-5'>
      <FaComment className="text-green-500" />
    </div>
    <div className="text-gray-700 dark:text-white dark:bg-slate-800">
    
      <strong> {comment && user.phone === comment.commentedBy.phone ? "You" : comment.commentedBy.name}</strong> | 
      <strong>{commentDate.toLocaleString()}</strong> 
      <p className="text-gray-800 dark:text-white dark:bg-slate-800">{comment.comment}</p>
    </div>
    
  </div>
</li>
  );
};

export default CommentItem;