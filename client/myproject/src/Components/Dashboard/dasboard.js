import React from "react";
import Footer from "../Homepage/Footer";
import Navbar2 from "./Navbar2";
import { Outlet} from'react-router-dom'

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