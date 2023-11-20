import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print';

const Transaction = () => {
    const [transaction, setTransaction] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [filterData, setFilteredData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [isfiltredDate, setIsFilteredDate] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const dropdownRef = useRef(null);
    const userString = localStorage.getItem("user");
    const userObject = JSON.parse(userString);

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });



    useEffect(() => {
        axios.post('http://localhost:5000/user/getalltransaction', userObject)
            .then(response => {
                setTransaction(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
            });
    }, [transaction.length]);

    const closeDropdown = () => {
        setDropdownOpen(false);
    };
    const handleFilter = () => {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        endDateObj.setHours(23, 59, 59, 999);
        const presentDate = Date.now();
        if (startDateObj > endDateObj) {
            alert("start date can not be greater then end date");
            return;
        }
        if (endDateObj > presentDate) {
            alert("please enter valid date");
            return;
        }

        // Filter the data based on the date range
        const filtered = transaction.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate >= startDateObj && itemDate <= endDateObj;
        });

        // Update the filtered data state
        setFilteredData(filtered);
        setIsFilteredDate(true);

        // Your other filter logic or actions can be added here
        console.log("Filtering data...", filtered);
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

    let data = [];
    if (!isfiltredDate) {
        data = transaction.map(trans => ({
            date: new Date(trans.date).toLocaleString(),
            transactionType: trans.transactionType,
            category: trans.category,
            description: trans.description,
            amount: trans.amount,
        }));
    }
    else {
        data = filterData.map(trans => ({
            date: new Date(trans.date).toLocaleString(),
            transactionType: trans.transactionType,
            category: trans.category,
            description: trans.description,
            amount: trans.amount,
        }));
    }
    const removehandleFilter = () => {
        setIsFilteredDate(false);
        setStartDate("");
        setEndDate("");
    }
    const handleViewClick = (expensereciept) => {
        // Set the image source and update the state to show the image
        setImageSrc(`http://localhost:5000/${expensereciept}`);
        setShowImage(true);
    };

    return (
        <div className="dark:bg-slate-800 dark:text-white h-screen">

            <h2 className="text-2xl text-center font-semibold dark:text-white py-5">Transaction History</h2>
            <div className="flex justify-center p-4 space-x-4">
                <div className="flex flex-col items-center">
                    <label htmlFor="startDate" className="text-gray-600">Start Date</label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border p-2 mt-1"
                    />
                </div>

                <div className="flex flex-col items-center">
                    <label htmlFor="endDate" className="text-gray-600">End Date</label>
                    <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border p-2 mt-1"
                    />
                </div>

                {!isfiltredDate ?
                    <button
                        onClick={handleFilter}
                        style={{ height: '40px', marginTop: '30px' }}
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
                    >Filter
                    </button>
                    : <button
                        onClick={removehandleFilter}
                        style={{ height: '40px', marginTop: '30px' }}
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
                    >
                        Remove Filter
                    </button>}
            </div>


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
                            <button onClick={handlePrint}>Generate PDF</button>
                        </div>

                    )}
                </div>
            </div>

            <div ref={componentRef}>
                <table className="min-w-full border border-gray-300 divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-800 dark:text-yellow-500">Transaction Date</th>
                            <th className="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-800 dark:text-yellow-500">Transaction Type</th>
                            <th className="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-800 dark:text-yellow-500">Category</th>
                            <th className="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-800 dark:text-yellow-500">Description</th>
                            <th className="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-800 dark:text-yellow-500">Amount</th>
                            <th className="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-800 dark:text-yellow-500">reciept</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isfiltredDate && transaction && transaction.map((transactions) => (
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
                                {transactions.expensereciept ? (
                                    <button
                                        onClick={() => handleViewClick(transactions.expensereciept)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        View
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        className="bg-gray-300 text-gray-500 cursor-not-allowed font-bold py-1 px-4 rounded"
                                    >
                                        View
                                    </button>
                                )}


                            </tr>
                        ))}
                        {isfiltredDate && filterData && filterData.map((transactions) => (
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
                    {showImage && (
                        <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-80">
                            <div className="relative bg-white p-4 rounded-lg shadow-md">
                                <img src={imageSrc} alt="Expense Receipt" className="max-w-full max-h-80 h-auto" />
                                <button
                                    className="absolute top-0 right-0 mt-0 mr-0 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                    onClick={() => setShowImage(false)}
                                >
                                    X
                                </button>

                            </div>

                        </div>
                    )}
                </table>
            </div>
        </div>
    );
}

export default Transaction;
