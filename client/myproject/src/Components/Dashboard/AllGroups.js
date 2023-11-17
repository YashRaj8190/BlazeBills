import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllGroups = () => {
  const [groups, setGroups] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const userPhone = user.phone;
        const response = await axios.post('http://localhost:5000/user/getusersgroups', { userPhone });
        setGroups(response.data);
        console.log(response.data);
        setIsDataFetched(true);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isDataFetched) {
      console.log('All group data fetched successfully');
    }
  }, [isDataFetched]);

  return (
    <div className="min-h-screen dark:bg-slate-800 dark:text-white">
      <h2 className="text-3xl font-bold py-5 text-center">All Groups</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-10 gap-y-10">
        {groups.map((group) => (
          <Link to={`/dashboard/addgroupexpense/${group._id}`}>
          <div key={group._id} className="bg-violet-800 text-white rounded-lg shadow-md flex items-center justify-center h-40 w-3/4">
            <h3 className="text-center text-xl font-semibold">{group.groupName}</h3>
            {group.admin.phone===user.phone? "created by: You":<h3 className="text-center text-xl font-semibold">created by: {group.admin.name} phone:{group.admin.phone}</h3>}
            
          </div> 
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllGroups;
