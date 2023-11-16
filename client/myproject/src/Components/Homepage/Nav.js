import React from "react";
import Darkmode from "../darkmode";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="bg-gray-800 p-4 fixed w-full top-0 z-10">
  <div className="container mx-auto flex justify-between items-center">
    <h1 className="text-3xl font-bold text-white">BlazeBills</h1>
    <div className="flex items-center space-x-6 essentials">
        <Darkmode />
        <Link to='/login'><button className="text-white px-4 py-2 rounded-md hover:bg-slate-800 hover:text-yellow-400" >Login</button></Link>
        <Link to = "/signup"><button className="text-white px-4 py-2 rounded-md hover:bg-slate-800 hover:text-yellow-400">Sign Up</button></Link>
    </div>
  </div>
</nav>
  );
}

export default Nav;
