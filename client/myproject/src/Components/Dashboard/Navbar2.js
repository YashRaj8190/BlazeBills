import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Darkmode from "../darkmode";
import {Menu,X,User2} from "lucide-react"

const Navbar2 = () => {
  const[nav,setNav] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const navbar = useRef(null);

  const toggleNav = () => {
    setNav(!nav) ;
  };
  

  const logoutUser = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const [isVisible, setVisibility] = useState(false);

  const toggleDropdown = () => {
    setVisibility(!isVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setVisibility(false);
    }
    if (navbar.current && !navbar.current.contains(event.target)) {
      setNav(false); 
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
    <nav className="bg-gray-800 dark:bg-black p-4 flex items-center justify-between flex-wrap" ref={navbar}>
      <h1 className="text-3xl font-bold ml-5 text-white">BlazeBills</h1>
      <div className="hidden md:flex md:flex-row">
        <Link to="/dashboard/analytics" className="text-white px-3.5 py-2 text-lg hover:text-yellow-500" >Analytics</Link>
        <Link to="/dashboard/transactions" className="text-white px-3.5 py-2 text-lg hover:text-yellow-500" >Past Transactions</Link>
        <Link to="/dashboard/addexpense" className="text-white px-3.5 py-2 text-lg hover:text-yellow-500" >Add Expense</Link>
        <div className="relative flex-col w-32" ref={dropdownRef}>
          <button className="text-white px-3.5 py-2 text-lg hover:text-yellow-500" onClick={toggleDropdown}>
            Groups
          </button>
          {isVisible && (
            <div className="absolute flex flex-wrap bg-gray-800 dark:bg-black border border-white rounded-md">
              <Link to="/dashboard/creategroup" className="px-3 py-1 text-white hover:text-yellow-500" onClick={toggleDropdown}>Create Group</Link>
              <Link to="/dashboard/allgroups" className="px-3 py-1 text-white hover:text-yellow-500" onClick={toggleDropdown}>All Groups</Link>
            </div>
          )}
          
        </div>
      </div>

      {!nav && <><div className="flex items-center gap-2" >
      <Darkmode/>
        <button className="bg-gray-200 text-black px-3.5 py-2 rounded-xl mr-2 flex">
         <User2/> {JSON.parse(localStorage.getItem('user')).name}
        </button>
        <button className="bg-red-500 text-white px-3.5 py-2 rounded-xl ml-2" onClick={logoutUser}>
          Logout
        </button>
      </div>
      </>}
      <div className="md:hidden text-white mr-5">
        <button onClick={toggleNav}>
           {nav ? <X/> : <Menu/>}
        </button>
      </div>
      {nav && <div className="md:hidden flex flex-col justify-center items-center basis-full gap-6">
        <Link to="/dashboard/analytics" className="text-white px-3.5 py-2 text-lg">Analytics</Link>
        <Link to="/dashboard/transactions" className="text-white px-3.5 py-2 text-lg">Past Transactions</Link>
        <Link to="/dashboard/addexpense" className="text-white px-3.5 py-2 text-lg">Add Expense</Link>
        <div className="relative" ref={dropdownRef}>
          <button className="text-white px-3.5 py-2 text-lg" onClick={toggleDropdown}>
            Groups
          </button>
          {isVisible && (
            <div className="absolute mt-2 bg-gray-800 dark:bg-slate-800 border border-white rounded-md">
              <Link to="/dashboard/creategroup" className="block px-4 py-1 text-white" onClick={toggleDropdown}>Create Group</Link>
              <Link to="/dashboard/allgroups" className="block px-4 py-1 text-white" onClick={toggleDropdown}>All Groups</Link>
            </div>
          )}
          
        </div>
      </div>}
    </nav>
   
    </>
  );
};

export default Navbar2;
