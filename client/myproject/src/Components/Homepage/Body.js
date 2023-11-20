import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

function Body() {
  return (
    <div className=" dark:bg-slate-900 dark:text-white">  
      <div>
      <main className="main-body flex flex-col-reverse lg:flex-row mt-16 lg:h-screen">
      <div className="main-text flex-1 p-8 items-center mt-20 mb-20">
      <h1 className="text-5xl font-bold ml-4 mt-20 mb-10 text-center">TRACK YOUR EXPENSES</h1>
        <p className="text-lg mt-8 ml-4 mb-4">
          Tracking your expenses is the key to financial success. By meticulously monitoring your spending, you gain control over your budget, identify areas for savings, and make informed financial decisions. This powerful practice helps you achieve your financial goals, build wealth, and live a more financially secure and fulfilling life.
        </p>
        <div className="text-center mt-8">
          <Link to="/signup"><button className="main-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            GET STARTED
          </button></Link>
        </div>
      </div>
      <div className="main-img flex-1 flex items-center">
        <img src="https://www.billdu.com/wp-content/uploads/2019/03/Billdu_Tracking-business-expenses-with-expense-tracker.jpg" alt="" />
      </div>
    </main>
      <div/>
    </div>

    <div className="grid lg:grid-cols-2 lg:grid-rows-3 gap-5 mb-20 ml-7 mr-7 grid-cols-1 grid-rows-6">

<div className="border h-50 flex justify-center items-center gap-5 bg-cover bg-center">
  <p><Card 
  title = "ADD FRIENDS" 
  imageUrl = "https://media.istockphoto.com/id/1173780314/vector/friends.jpg?b=1&s=612x612&w=0&k=20&c=zLMy_qSlxfm1u6uu4Rh-PVRXaZWi-fq4wdouWA4-Km0=" 
  details = "Enhance your finance tracking experience by adding friends to your app Share financial goals, collaborate on budgeting, split bills, and stay accountable together. Manage your money smarter with the power of community."
  /></p>
</div>
<div className="border h-50 flex justify-center items-center gap-5 bg-cover bg-center">
  <p><Card 
  title = "CURRENCY CONVERTER" 
  imageUrl = "https://www.livetecs.com/wp-content/uploads/2019/05/Multi-Currency-2.png" 
  details = "Instantly calculate exchange rates, seamlessly convert between global currencies, and make informed financial decisions. Say goodbye to currency confusion and embrace the power of precise conversions at your fingertips."
  
  /></p>
</div>
<div className="border h-50 flex justify-center items-center gap-5 bg-cover bg-center">
<p><Card 
  title = "SAVINGS" 
  imageUrl = "https://www.kimchimobile.com/wp-content/uploads/2020/11/kimchimobile-image-header-how-to-save-money-in-korea.jpg" 
  details = "Kepp track of your savings to meet your financial goals. Say goodbye to currency confusion and embrace the power of precise conversions at your fingertips."
  /></p>
</div>
<div className="border h-50 flex justify-center items-center gap-5 bg-cover bg-center">
<p><Card 
  title = "DARK MODE"
  imageUrl = "https://media.istockphoto.com/id/1193270258/vector/dark-mode-night-mode-blue-light-filter-slide-button-illustration-vector.jpg?s=612x612&w=0&k=20&c=cY2ZnlJGWmt7sZ0UgQU2mx0Zj721trdUixF3AX4uWQ0=" 
  details = "Enhance your finance tracking experience by adding friends to your app Share financial goals, collaborate on budgeting, split bills, and stay accountable together. Manage your money smarter with the power of community."
  /></p>
</div>
<div className="border h-50 flex justify-center items-center gap-5 bg-cover bg-center">
<p><Card 
  title = "ADD FRIENDS" 
  imageUrl = "https://media.istockphoto.com/id/1173780314/vector/friends.jpg?b=1&s=612x612&w=0&k=20&c=zLMy_qSlxfm1u6uu4Rh-PVRXaZWi-fq4wdouWA4-Km0=" 
  details = "Enhance your finance tracking experience by adding friends to your app Share financial goals, collaborate on budgeting, split bills, and stay accountable together. Manage your money smarter with the power of community."
  /></p>
</div>
<div className="border h-50 flex justify-center items-center gap-5 bg-cover bg-center">
<p><Card 
  title = "CURRENCY CONVERTER" 
  imageUrl = "https://www.livetecs.com/wp-content/uploads/2019/05/Multi-Currency-2.png" 
  details = "Instantly calculate exchange rates, seamlessly convert between global currencies, and make informed financial decisions. Say goodbye to currency confusion and embrace the power of precise conversions at your fingertips."
  /></p>

</div>
    </div>

    </div>
  
  );
}

export default Body;