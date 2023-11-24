import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print';
import { Download } from "lucide-react";

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


    //fetching all past transactions 
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
    //filtering data according to users requirement
    const handleFilter = () => {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        endDateObj.setHours(23, 59, 59, 999);
        const presentDate = new Date();
        const modifiedDate = new Date(presentDate);
        modifiedDate.setHours(23, 59, 59, 999);

        if (startDateObj > endDateObj) {
            alert("start date can not be greater then end date");
            return;
        }
        if (endDateObj >modifiedDate) {
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


    // opening and closing of dropdown when user clicks on page
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
    //set up header for csv file
    const headers = [
        { label: 'Transaction Date', key: 'date' },
        { label: 'Transaction Type', key: 'transactionType' },
        { label: 'Category', key: 'category' },
        { label: 'Description', key: 'description' },
        { label: 'Amount', key: 'amount' },
    ];
    //store data to show in csv file
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
    //fetching the image 
    const handleViewClick = (expensereciept) => {
        // Set the image source and update the state to show the image
        setImageSrc(`http://localhost:5000/${expensereciept}`);
        setShowImage(true);
    };

    return (
        <div className="dark:bg-slate-800 dark:text-white h-[82vh] overflow-x-auto">

            <h2 className="text-5xl text-center font-bold dark:text-white py-5 font-serif">Transaction History</h2>
            <div className="flex justify-center p-4 space-x-4 gap-4">
                <div className="flex order-3 items-end">
                    <div className="relative mr-4" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!isDropdownOpen)}
                            className=" text-white bg-amber-700 px-4 py-2 rounded-lg hover:bg-amber-800 flex gap-2 "
                        >
                            <Download /> Download Report
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute w-40 bg-amber-300 border rounded shadow-lg flex-col">
                                <CSVLink
                                    data={data}
                                    headers={headers}
                                    filename="expense_report.csv"
                                    className="w-full px-7 py-5 text-white-800"
                                    onClick={closeDropdown}
                                >
                                    Export to CSV
                                </CSVLink>
                                <button className="w-full px-4 py-2 text-white-800" onClick={handlePrint}>Generate PDF</button>
                            </div>

                        )}
                    </div>
                </div>
                {/* fill the start and end date to fillter the data */}
                <div className="flex flex-col items-center dark:text-white dark:bg-slate-800">
                    <label htmlFor="startDate" className="text-gray-600 dark:text-white dark:bg-slate-800">Start Date</label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border p-2 mt-1 dark:text-white dark:bg-slate-800"
                    />
                </div>

                <div className="flex flex-col items-center">
                    <label htmlFor="endDate" className="text-gray-600 dark:text-white dark:bg-slate-800">End Date</label>
                    <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border p-2 mt-1 dark:text-white dark:bg-slate-800"
                    />
                    {/* show all filtered data */}
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


            {/*show all past transactions and provide ref to div that data we want to print  */}
            <div className="mt-10 overflow-y-scroll h-80 px-2" ref={componentRef}>
                <table className="min-w-full ">
                    <thead className="bg-white sticky top-0 ">
                        <tr>
                            <th className="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-900 dark:text-yellow-500">Transaction Date</th>
                            <th className="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-900 dark:text-yellow-500">Transaction Type</th>
                            <th className="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-900 dark:text-yellow-500">Category</th>
                            <th className="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-900 dark:text-yellow-500">Description</th>
                            <th className="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-900 dark:text-yellow-500">Amount</th>
                            <th className="py-2 px-4 bg-gray-200 text-left font-bold dark:bg-slate-900 dark:text-yellow-500">reciept</th>
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
                        {/* if user click on filter button then show filter data */}
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
                    {/* if user want to show image then open the image */}
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
