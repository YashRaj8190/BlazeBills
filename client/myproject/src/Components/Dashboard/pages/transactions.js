import axios from "axios";
import { useState,useEffect } from "react";

const Transaction = () => {
    const [transaction, setTransaction] = useState([]);
    const userString = localStorage.getItem("user");
    const userObject = JSON.parse(userString);

    useEffect(() => {
        axios.post('/user/getalltransaction',{userObject})
        .then(response => {
            setTransaction(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error fetching transactions :', error);
        });
    }, [transaction]);

    return (  
        <div>
        <table>
            <thead>
                <tr>
                    <th>Transaction Type</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {transaction && transaction.map(
                <tr>
                    <td>{transaction.transactionType}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.amount}</td>
                </tr>
                )}
                
            </tbody>
        </table>
        </div>
    );
}
 
export default Transaction;