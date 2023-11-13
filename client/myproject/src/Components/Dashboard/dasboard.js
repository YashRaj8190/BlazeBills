import React from "react";
import TransactionForm from "../Addexpenses";
import Footer from "../Homepage/Footer";
import Body2 from "./Body2";
import Navbar2 from "./Navbar2";
import {Routes,Route, Outlet} from'react-router-dom'
import Transaction from "./pages/transactions";

const Dashboard = () => {
    return (  
        <div>
            <Navbar2 />
          <Outlet/>
            <Footer />
        </div>
    );
}
 
export default Dashboard;