import React from "react";
import AboutUs from "./About";

function Footer() {
  return (
    <div className="fixed w-full bottom-0">
      <div className="bg-gray-800 text-white py-4  left-0 right-0 flex justify-between dark:bg-black px-5 inline">
      <h1 className="text-xl"><AboutUs /></h1>
        <h1 className="text-xl ">&copy; Copyright 2023</h1>
      </div>
    </div>
  );
}

export default Footer;
