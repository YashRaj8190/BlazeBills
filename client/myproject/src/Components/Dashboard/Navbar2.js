import { Link } from "react-router-dom";
import Darkmode from "../darkmode";
import { useNavigate } from "react-router-dom";
const Navbar2 = () => {
  const navigate=useNavigate();
  const logoutuser=()=>{
   localStorage.removeItem('user');
   navigate('/');
   
  }
    return (  
      <nav className="bg-gray-800 p-4 flex items-center justify-between">
      <h1 className="text-3xl font-bold ml-5 text-white">BlazeBills</h1>
      <div className="flex space-x-4">
        <Link to="/dashboard/analytics" className="text-white px-3.5 py-2 text-lg">Analytics</Link>
        <Link to="/dashboard/transactions" className="text-white px-3.5 py-2 text-lg">Past Transactions</Link>
        <Link to="/dashboard/addexpense" className="text-white px-3.5 py-2 text-lg">Add Expense</Link>
        <Link to="/dashboard/groups" className="text-white px-3.5 py-2 text-lg">Groups</Link>
      </div>
     
      <div className="flex items-center">
      <Darkmode/>
  <button className="bg-gray-200 text-black px-3.5 py-2 rounded-xl mr-2">
    {JSON.parse(localStorage.getItem('user')).name}
  </button>
  <button className="bg-red-500 text-white px-3.5 py-2 rounded-xl ml-2" onClick={logoutuser}>
    Logout
  </button>
</div>
      </nav>
    );
}
 
export default Navbar2;