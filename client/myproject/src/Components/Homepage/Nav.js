import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="bg-gray-800 p-4 fixed w-full top-0 z-10">
  <div className="container mx-auto flex justify-between items-center">
    <h1 className="text-3xl font-bold text-white">BlazeBills</h1>
    <div className="flex items-center space-x-4">
      <div className="essentials space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white" >Login</button>
        <Link to = "/signup"><button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 hover:text-white">Sign Up</button></Link>
      </div>
    </div>
  </div>
</nav>
  );
}

export default Nav;
