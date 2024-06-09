import React, { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Chart(){
    const navigate=useNavigate();
    const convertObjectToArray = (dataObject) => {
        return Object.entries(dataObject).map(([date, expenses]) => {
            return { date, expenses }
        });
    };
    const [view, setView] = useState('7');
    const [data,setdata]=useState([]);
    
   
    
    const handelechange=async(e)=>{
        setView(e.target.value);
    }
    useEffect(() => {
        const user_id = JSON.parse(localStorage.getItem('user'))._id;
        console.log(user_id);
    
        try {
            axios.post("http://localhost:5000/user/gettransaction", { view, user_id }, {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                }
            })
            .then((res) => {
                const newData = convertObjectToArray(res.data);
                setdata(newData);
                console.log(res);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    // Handle unauthorized access, e.g., redirect to login page
                    alert("Unauthorized access. Redirecting to login.");
                    navigate('/');
                    // You can navigate to the login page or show a login modal here.
                } else {
                    console.error("Error fetching data:", error);
                    alert("Some error occurred", error);
                }
            });
        } catch (err) {
            console.log(err);
            alert("Some error occurred", err);
        }
    }, [view]);
   
      
    let currentView = "Weekly Expenses";

    switch(view){
        case '7' :
        currentView = "Weekly Expenses";
        break ;
        case '30' :
        currentView = "Monthly Expenses";
        break ;
        case '365' :
        currentView = "Yearly Expenses";
        break ;            
    }
    
    return (
        <div className= "p-8 h-full  dark:bg-slate-900 dark:text-white min-h-screen">
            
            <div className="flex justify-center"><h1 className="font-extrabold text-6xl mb-4 text-gray-800 font-serif dark:text-white">Expenses Analytics</h1></div>

            {/* Choose View */}
            <div className="mb-8 mt-5 flex items-center justify-center " >
                <label className="text-gray-700 font-bold mb-1 mr-2 font-serif text-2xl dark:text-white">Choose View : </label>
                <select
                    className="w-40 h-10 bg-blue-200 dark:bg-black border border-blue-800 rounded-md py-2 px-4 focus:outline-none focus:border-blue-300"
                    value={view}
                    onChange={handelechange}
                >   
                    <option value="7">Weekly</option>
                    <option value="30">Monthly</option>
                    <option value="365">Yearly</option>
                </select>
            </div>

            {(data.length === 0) ? 
                <div className="flex items-center justify-center text-6xl h-3/5">
                    <h1 className="font-bold text-red-800 font-serif dark:text-yellow-400" >No Data Available !!!</h1>
                </div> :
                <div className="flex justify-center mt-15  dark:bg-slate-900 dark:text-white">
            <ResponsiveContainer width="80%" height={380}>
                <BarChart data={data} >
                <XAxis dataKey="date" tick={{ fontSize: 14 , fontWeight: 'bold' , fill: 'orange'  }}/>
                <YAxis tick={{ fontSize: 14 , fontWeight: 'bold' , fill: 'orange' }}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="expenses" fill="#7E354D"  stroke="#3D0C02" strokeWidth={2} name = {currentView} />
                </BarChart>
            </ResponsiveContainer> </div>}
            </div>
    );
};

export default Chart;