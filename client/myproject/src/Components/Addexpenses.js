import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TransactionForm() {
  const userString = localStorage.getItem("user");
    const userObject = JSON.parse(userString);
    const user_id=userObject._id;
    
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    transactionType: '',
    description: '',
    amount: '',
    category: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      await axios.post("http://localhost:5000/user/addtransaction",{formData,user_id}).then((res)=>{
        
        console.log('Transaction added');
        navigate("/dashboard");
      }) 
    }
    catch(error){
      if(error.response.data.message){
        alert(error.response.data.message);
      }
      else{
        alert(error.response.data);
      }
      
    }
    navigate("/dashboard");
  };

  return (
    <div 
     style={{color:"black",opacity:"1"}} className="  h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500"
    >
      <form
        onSubmit={handleSubmit}
        style={{width:"400px"}} className="bg-opacity-20 bg-white bg-blur-lg backdrop-filter backdrop-blur-lg backdrop-saturate-150 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 transition-transform duration-300 ease-in-out transform hover:scale-105"
      >
        

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transactionType">
            Transaction Type
          </label>
          <input
            type="text"
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        
       

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
