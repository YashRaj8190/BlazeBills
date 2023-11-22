import React from 'react';
import { FaRegClock, FaComment } from 'react-icons/fa';

const CommentItem = ({ comment }) => {
  // Convert the date string to a JavaScript Date object
  const commentDate = new Date(comment.date);
  const user=JSON.parse(localStorage.getItem('user'));
  
  return (
    <li className="mb-4">
      <div className="flex items-center dark:text-white dark:bg-slate-800">
        <div className="mr-2">
          <FaRegClock className="text-blue-500" />
        </div>
        <div>
          <p className="text-gray-700 dark:text-white dark:bg-slate-800">
            <strong>{comment && user.phone===comment.commentedBy.phone?"You":comment.commentedBy.name}</strong>
          </p>
          <p className="text-gray-700 dark:text-white dark:bg-slate-800">
            {/* Format the date using toLocaleString or other formatting options */}
            <strong>{commentDate.toLocaleString()}</strong>
          </p>
          <p className="text-gray-800 dark:text-white dark:bg-slate-800">{comment.comment}</p>
        </div>
        <div className="ml-auto">
          <FaComment className="text-green-500" />
        </div>
      </div>
    </li>
  );
};

export default CommentItem;
