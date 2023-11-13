import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const dataObject = {
    '2023-01-01': 100,
    '2023-01-02': 120,
    '2023-01-03': 130,
    '2023-02-04': 140,
    '2023-03-05': 150,
    '2023-03-06': 400,
    '2023-03-07': 150,
    
};

const convertObjectToArray = (dataObject) => {
    return Object.entries(dataObject).map(([date, expenses]) => {
        return { date, expenses }
    });
};

const data = convertObjectToArray(dataObject);

function Chart(){
    const [view, setView] = useState('7');

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
        <div className= "p-8 h-full">
            
            <div className="flex justify-center"><h1 className="font-extrabold text-6xl mb-4 text-gray-800 font-serif">Expenses Analytics</h1></div>

            {/* Choose View */}
            <div className="mb-8 mt-5 flex items-center justify-center" >
                <label className="text-gray-700 font-bold mb-1 mr-2 font-serif text-2xl">Choose View : </label>
                <select
                    className="w-40 h-10 bg-blue-300 border border-blue-800 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    value={view}
                    onChange={(e) => {return ( setView(e.target.value) ) }}
                >   
                    <option value="7">Weekly</option>
                    <option value="30">Monthly</option>
                    <option value="365">Yearly</option>
                </select>
            </div>

            {(data.length === 0) ? 
                <div className="flex items-center justify-center text-6xl h-3/5">
                    <h1 className="font-bold text-red-800 font-serif" >No Data Available !!!</h1>
                </div> :
                <div className="flex justify-center mt-15">
            <ResponsiveContainer width="80%" height={380}>
                <BarChart data={data} >
                <XAxis dataKey="date" tick={{ fontSize: 14 , fontWeight: 'bold' , fill: 'black'  }}/>
                <YAxis tick={{ fontSize: 14 , fontWeight: 'bold' , fill: 'black'  }}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="expenses" fill="#7E354D"  stroke="#3D0C02" strokeWidth={2} name = {currentView} />
                </BarChart>
            </ResponsiveContainer> </div>}
            </div>
    );
};

export default Chart;
