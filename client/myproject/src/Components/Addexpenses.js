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
//validate all fields of form
  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (key !== 'expensereciept' && formData[key].trim() === '') {
        alert(`Please fill in all fields.`);
        return;
      }
    }
    if (!/^[+]?\d*\.?\d+$/.test(formData.amount)) {
      alert('Please enter a valid positive number for the amount.');
      return;
    }
    for (const key in formData) {
      if (key !== 'expensereciept' && formData[key].trim() === '') {
        alert(`Please fill in all fields.`);
        return;
      }
    }


    try {
      // Use FormData to handle file upload
      const formDataWithFile = new FormData();
      formDataWithFile.append('transactionType', formData.transactionType);
      formDataWithFile.append('description', formData.description);
      formDataWithFile.append('amount', formData.amount);
      formDataWithFile.append('category', formData.category);
      formDataWithFile.append('expensereciept', file);

      await axios.post(`http://localhost:5000/user/addtransaction/${user_id}`,formDataWithFile,{
        headers:{
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        }
      }).then((res) => {
        alert('Transaction added');
        console.log(res.data);
        navigate("/dashboard");
      });
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert(error.response.data);
      }
    }
  };

  const backgroundImageUrl =
  'https://wallup.net/wp-content/uploads/2017/11/23/502910-Firewatch-night-forest.jpg';

  return (
    <div 
     style={{
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
     className=" h-[92vh] flex items-center justify-center pb-10"
    >
      <form
        onSubmit={handleSubmit}
        style={{ width: "400px" }} className=" bg-white dark:text-white bg-opacity-30 backdrop-blur-sm dark:bg-black dark:bg-opacity-50 dark:backdrop-blur-sm
        bg-blur-lg backdrop-filter shadow-md rounded-lg px-8 pt-6 pb-6 mb-4 "
      >
        <div className='m-4'><h1 className='text-4xl font-bold text-center text-black dark:text-white'>ADD EXPENSE</h1></div>

        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2 dark:text-white" htmlFor="transactionType">
            Transaction Type
          </label>
          <input
            type="text"
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline dark:text-black "
          />
        </div>

        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2 dark:text-white" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline dark:text-black  "
          />
        </div>

        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2 dark:text-white" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus: -none focus:shadow-outline dark:text-black "
          />
        </div>

        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2 dark:text-white " htmlFor="category">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline dark:text-black "
          >
            <option value="">Select a category</option>
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Transportation">Transportation</option>
            <option value="Dining">Dining</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Clothing">Clothing</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Technology">Technology</option>
            <option value="Miscellaneous">Miscellaneous</option>

          </select>
        </div>

        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2 dark:text-white" htmlFor="expensereciept">
            Expense Reciept
          </label>
          <input
            type="file"
            name="expensereciept"
            onChange={handleChange}
            accept="image/*"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline dark:text-white "
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
