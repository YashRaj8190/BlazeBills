import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TransactionForm() {
  const userString = localStorage.getItem("user");
  const userObject = JSON.parse(userString);
  const user_id = userObject._id;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    transactionType: '',
    description: '',
    amount: '',
    category: '',
  });
  const [file,setFile]=useState([]);

  const handleChange = (e) => {
    if (e.target.name === 'expensereciept') {
      // Handle file input separately
      setFile(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use FormData to handle file upload
      const formDataWithFile = new FormData();
      formDataWithFile.append('transactionType', formData.transactionType);
      formDataWithFile.append('description', formData.description);
      formDataWithFile.append('amount', formData.amount);
      formDataWithFile.append('category', formData.category);
      formDataWithFile.append('expensereciept', file);

      await axios.post(`http://localhost:5000/user/addtransaction/${user_id}`,formDataWithFile).then((res) => {
        alert('Transaction added');
        console.log(res.data);
        navigate("/dashboard");
      });
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert(error.response.data);
      }
    }
  };

  return (
    <div 
     style={{color:"black",opacity:"1"}} className="  h-[82vh] flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 "
    >
      <form
        onSubmit={handleSubmit}
        style={{ width: "400px" }} className="bg-opacity-20 bg-white dark:text-white dark:bg-slate-800 bg-blur-lg backdrop-filter  shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 transition-transform duration-100 ease-in-out transform hover:scale-110"
      >
        <div className='m-4'><h1 className='text-4xl font-bold text-center text-gray-800 dark:text-white'>ADD EXPENSE</h1></div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="transactionType">
            Transaction Type
          </label>
          <input
            type="text"
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-slate-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-slate-800 "
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: -none focus:shadow-outline dark:text-white dark:bg-slate-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white " htmlFor="category">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-slate-800"
          >
            <option value="">Select a category</option>
            <option value="groceries">Groceries</option>
            <option value="utilities">Utilities</option>
            <option value="transportation">Transportation</option>
            <option value="dining">Dining</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="expensereciept">
            expensereciept
          </label>
          <input
            type="file"
            name="expensereciept"
            onChange={handleChange}
            accept="image/*"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-slate-800"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
