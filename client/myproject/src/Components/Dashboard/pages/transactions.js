import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CSVLink } from 'react-csv';

const Transaction = () => {
    const [transaction, setTransaction] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const userString = localStorage.getItem("user");
    const userObject = JSON.parse(userString);

    useEffect(() => {
        axios.post('http://localhost:5000/user/getalltransaction', userObject)
            .then(response => {
                setTransaction(response.data);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
            });
    }, [setTransaction]);

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isDropdownOpen]);

    const headers = [
        { label: 'Transaction Date', key: 'date' },
        { label: 'Transaction Type', key: 'transactionType' },
        { label: 'Category', key: 'category' },
        { label: 'Description', key: 'description' },
        { label: 'Amount', key: 'amount' },
    ];

    const data = transaction.map(trans => ({
        date: new Date(trans.date).toLocaleString(),
        transactionType: trans.transactionType,
        category: trans.category,
        description: trans.description,
        amount: trans.amount,
    }));

    return (
        <div className="dark:bg-slate-800 dark:text-white h-screen">

            <h2 className="text-2xl text-center font-semibold dark:text-white py-5">Transaction History</h2>

            <div className="flex justify-end mb-4">
                <div className="relative inline-block mr-4" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200"
                    >
                        Export
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-gray-500 border rounded shadow-lg">
                        <CSVLink
                            data={data}
                            headers={headers}
                            filename="expense_report.csv"
                            className="block w-full text-left px-4 py-2 text-sm text-white-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-300"
                            onClick={closeDropdown}
                        >
                            Export to CSV
                        </CSVLink>
                    </div>
                    
                    )}
                </div>
            </div>

            <div>
                <table className="min-w-full border border-gray-300 divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-800 dark:text-yellow-500">Transaction Date</th>
                            <th className="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-800 dark:text-yellow-500">Transaction Type</th>
                            <th className="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-800 dark:text-yellow-500">Category</th>
                            <th className="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-800 dark:text-yellow-500">Description</th>
                            <th className="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-800 dark:text-yellow-500">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaction && transaction.map((transactions) => (
                            <tr key={transactions.id} className="hover:bg-gray-100 hover:text-black">
                                <td className="py-2 px-4 font-semibold">{new Date(transactions.date).toLocaleDateString()} {new Date(transactions.date).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric',
                                    hour12: true // or false for 24-hour format
                                })}</td>
                                <td className="py-2 px-4 font-semibold">{transactions.transactionType}</td>
                                <td className="py-2 px-4 font-semibold">{transactions.category}</td>
                                <td className="py-2 px-4 font-semibold">{transactions.description}</td>
                                <td className="py-2 px-4 font-semibold">{transactions.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Transaction;
