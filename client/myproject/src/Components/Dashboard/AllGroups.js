import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllGroups = () => {
  const [groups, setGroups] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  //fetching all groups in which user is included
  useEffect(() => {
    const fetchData = async () => {
        try {
            const userPhone = user.phone;
            const response = await axios.post('http://localhost:5000/user/getusersgroups', { userPhone }, {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                }
            });
            
            setGroups(response.data);
            //console.log("all groups", response.data);
            setIsDataFetched(true);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Axios error (e.g., network error, timeout, etc.)
                //console.error('Axios error fetching groups:', error);
                if (error.response) {
                  // Server responded with a non-success status code
                  if (error.response.status === 401) {
                      // Handle unauthorized access, e.g., redirect to login page
                      alert("Unauthorized access. Redirecting to login.");
                      // You can navigate to the login page or show a login modal here.
                  } else {
                      alert('Server error:', error.response.data);
                  }
              }
            }  else {
                // Something else went wrong
                alert('Error fetching groups:', error.message);
            }
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
    <div className="min-h-[82vh] dark:bg-slate-800 dark:text-white">
      <h2 className="text-3xl font-bold py-5 text-center">All Groups</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-10 gap-y-10">
        {groups.map((group) => (
          <Link to={`/dashboard/addgroupexpense/${group._id}`}>
          <div key={group._id} className="bg-violet-800 text-white rounded-lg shadow-md flex flex-col items-center justify-center h-40 w-3/4">
            <h3 className="text-center text-4xl font-semibold">{group.groupName}</h3>
            <div className="mt-2"> 
            {/* if user is admin of group then show "you" otherwise admin name */}
              {group.admin.phone === user.phone ? (
                <p className="text-center text-xl font-semibold">Created by: You</p>
              ) : (
                <p className="text-center text-xl font-semibold">
                  Created by: {group.admin.name} 
                </p>
              )}
            </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllGroups;
