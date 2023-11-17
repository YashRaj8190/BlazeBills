import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/groups');
        // const response =[
        //     {
        //       "name": "Tech Enthusiasts",
        //       "admin": "JohnDoe",
        //       "members": ["JohnDoe", "JaneDoe", "BobSmith"]
        //     },
        //   ];          
        setGroups(response);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="min-h-screen dark:bg-slate-800 dark:text-white">
      <h2 className="text-3xl font-bold py-5   text-center">All Groups</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-10 gap-y-10">
        {groups && groups.map((group) => (
          <div key={group._id} className="bg-violet-800 text-white rounded-lg shadow-md flex items-center justify-center h-40 w-3/4 ">
          <h3 className="text-center text-xl font-semibold">{group.name}</h3>
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default AllGroups;
