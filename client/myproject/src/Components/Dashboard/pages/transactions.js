import axios from "axios";
import { useState,useEffect } from "react";

const Transaction = () => {
    const [transaction, setTransaction] = useState([]);
    const userString = localStorage.getItem("user");
    const userObject = JSON.parse(userString);

    useEffect(() => {
        axios.post('http://localhost:5000/user/getalltransaction',userObject)
        .then(response => {
            setTransaction(response.data);
        })
        .catch(error => {
            console.error('Error fetching transactions :', error);
        });
    }, [setTransaction]);

    return (  
        <div className="dark:bg-slate-800 dark:text-white h-screen overflow-x-auto">
            <h2 className="text-2xl text-center font-semibold dark:text-white py-5">Transaction History</h2>
      <table class="min-w-full border border-gray-300 divide-y divide-gray-300">
    <thead>
        <tr >
            <th class="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-800 dark:text-yellow-500">Transaction Date</th>
            <th class="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-800 dark:text-yellow-500">Transaction Type</th>
            <th class="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-800 dark:text-yellow-500">Category</th>
            <th class="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-800 dark:text-yellow-500">Description</th>
            <th class="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-800 dark:text-yellow-500">Amount</th>
        </tr>
    </thead>
    <tbody>
        {transaction && transaction.map((transactions) => (
            <tr key={transactions.id} class="hover:bg-gray-100 hover:text-black">
                <td class="py-2 px-4 font-semibold">{new Date(transactions.date).toLocaleDateString()} {new Date(transactions.date).toLocaleTimeString('en-US', { 
  hour: 'numeric', 
  minute: 'numeric', 
  second: 'numeric',
  hour12: true // or false for 24-hour format
})}</td>
                <td class="py-2 px-4 font-semibold">{transactions.transactionType}</td>
                <td class="py-2 px-4 font-semibold">{transactions.category}</td>
                <td class="py-2 px-4 font-semibold">{transactions.description}</td>
                <td class="py-2 px-4 font-semibold">{transactions.amount}</td>
            </tr>
        ))}
    </tbody>
</table>
        </div>
    );
}
 
export default Transaction;