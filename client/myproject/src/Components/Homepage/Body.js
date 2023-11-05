import React from "react";

function Body() {
  return (
    <div>  
      <div>
      <main className="main-body flex mt-16">
      <div className="main-text flex-1 p-8">
        <h1 className="text-6xl font-bold mb-4">TRACK YOUR EXPENSES</h1>
        <p className="text-lg mb-4">
          Tracking your expenses is the key to financial success. By meticulously monitoring your spending, you gain control over your budget, identify areas for savings, and make informed financial decisions. This powerful practice helps you achieve your financial goals, build wealth, and live a more financially secure and fulfilling life.
        </p>
        <div>
          <button className="main-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            GET STARTED
          </button>
        </div>
      </div>
      <div className="main-img flex-1">
        <img src="https://static.vecteezy.com/system/resources/previews/002/884/391/original/illustration-of-saving-money-in-the-household-sector-for-investment-spending-and-daily-life-vector.jpg" alt="" />
      </div>
    </main>
      <div/>
      <div className="text-center p-8">
      </div>
    </div>
    </div>
  
  );
}

export default Body;
