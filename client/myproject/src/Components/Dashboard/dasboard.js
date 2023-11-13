import TransactionForm from "../Addexpenses";
import Footer from "../Homepage/Footer";
import Body2 from "./Body2";
import Navbar2 from "./Navbar2";
import {Routes,Route} from'react-router-dom'
import Transaction from "./pages/transactions";

const Dashboard = () => {
    return (  
        <div>
            <Navbar2 />
            
            <Routes>
                <Route path="/dashboard" Component={Body2} />
                <Route path="/addexpense" Component={TransactionForm}/>
                <Route path="/transactions" Component={Transaction} />
            </Routes>

            
            <Footer />
        </div>
    );
}
 
export default Dashboard;