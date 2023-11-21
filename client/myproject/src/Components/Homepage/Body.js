import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

function Body() {
  return (
    <div className=" dark:bg-slate-900 dark:text-white">  
      <div>
      <main className="main-body flex mt-16 h-screen">
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

    <div className="grid grid-cols-2 grid-rows-3 gap-5 mb-20 ml-7 mr-7">

<div className="border h-50 flex justify-center items-center gap-5 bg-cover bg-center">
  <p><Card 
  title = "MAKE GROUPS" 
  imageUrl = "https://media.istockphoto.com/id/1173780314/vector/friends.jpg?b=1&s=612x612&w=0&k=20&c=zLMy_qSlxfm1u6uu4Rh-PVRXaZWi-fq4wdouWA4-Km0=" 
  details = "Simplify collaboration! Simplify shared expenses! Create groups for seamless bill splitting making it easy to categorize and analyze shared costs with friends, family, colleagues, ensuring everyone stays on budget."
  /></p>
</div>
<div className="border h-50 flex justify-center items-center gap-5 bg-cover bg-center">
  <p><Card 
  title = "VISUALIZE INSIGHTS" 
  imageUrl = "https://media.istockphoto.com/id/885841410/video/finance-or-business-infographic-bar-graph-or-chart-concept.jpg?s=640x640&k=20&c=jblZGKXwl8lFWkm6_FMs-3Gx_JHgpPiHpJuCX4cH9Nk=" 
  details = "Visualize your financial journey and spending patterns! Transform raw expense data into clear insights with dynamic graphs and charts. Track trends and make informed financial choices."
  
  /></p>
</div>
<div className="border h-50 flex justify-center items-center gap-5 bg-cover bg-center">
<p><Card 
  title = "DOWNLOAD EXPENSE REPORT" 
  imageUrl = "https://t4.ftcdn.net/jpg/05/95/12/17/360_F_595121787_SQjzIatw24gY7Da7799HT9lId7W3riDh.jpg" 
  details = "Empower your financial insights! Take control of your spending. Download comprehensive expense reports with a single click, allowing you to analyze spending patterns and make informed financial decisions."
  /></p>
</div>
<div className="border h-50 flex justify-center items-center gap-5 bg-cover bg-center">
<p><Card 
  title = "DARK MODE"
  imageUrl = "https://media.istockphoto.com/id/1193270258/vector/dark-mode-night-mode-blue-light-filter-slide-button-illustration-vector.jpg?s=612x612&w=0&k=20&c=cY2ZnlJGWmt7sZ0UgQU2mx0Zj721trdUixF3AX4uWQ0=" 
  details = "Embrace productivity even in low light. Enhance your expense tracking experience with Dark Mode, offering a stylish, eye-friendly interface. Manage your finances comfortably, day or night."
  /></p>
</div>
<div className="border h-50 flex justify-center items-center gap-5 bg-cover bg-center">
<p><Card 
  title = "STORE RECEIPTS" 
  imageUrl = "https://img.freepik.com/premium-vector/electronic-receipt-concept-with-people-scene-flat-cartoon-design-woman-receives-online-payment-tax-form-paying-invoice-banking-money-transfer-vector-illustration-visual-story-web_9209-9330.jpg?w=2000" 
  details = "Never lose a receipt again! Tame the paper trail! Seamlessly upload and organize your receipts on our expense tracking website, ensuring accurate record-keeping and hassle-free expense management."
  /></p>
</div>
<div className="border h-50 flex justify-center items-center gap-5 bg-cover bg-center">
<p><Card 
  title = "SAVINGS" 
  imageUrl = "https://www.kimchimobile.com/wp-content/uploads/2020/11/kimchimobile-image-header-how-to-save-money-in-korea.jpg" 
  details = "Stay on top of your financial goals!  Monitor your savings goals effortlessly. Track progress, adjust budgets, and celebrate milestones within our expense tracking and bill-splitting platform. Stay financially savvy!"
  /></p>

</div>
    </div>

    </div>
  
  );
}

export default Body;