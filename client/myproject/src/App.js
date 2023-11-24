import React from 'react';
import Home from './Components/Homepage/Home';
import {Routes,Route} from'react-router-dom'
import Signup from './Components/SignUp/Sign';
import Login from './Components/login';
import Addtransectionform from './Components/Addexpenses';
import { Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard/dasboard';
import Transaction from './Components/Dashboard/pages/transactions';
import TransactionForm from './Components/Addexpenses';
import Body2 from './Components/Dashboard/Body2';
import NotFound from './Components/NotFound';
import Chart from './Components/Analytics/chart';
import GroupPage from './Components/Group/GroupCreate';
import GroupExpense from './Components/Group/Groupexpense';
import AllGroups from './Components/Dashboard/AllGroups';
import EmailVerificationPage from './Components/emailverificationpage';
import ResetPassword from './Components/resetpasswordpage';
function App(){
  return (<>
    <div>
      {/* set up all routes */}
    <Routes >
      <Route path="/" 
       element={
          <Home/>
       }
      />
      <Route path="/signup" Component={Signup} />
      <Route path="/login" Component={Login} />
      <Route path="/emailverificationpage" Component={EmailVerificationPage}/>
      <Route path="/resetpassword" Component={ResetPassword}/>
      <Route path="/addexpense" 
      element={
        <Protectedroute>
          <Addtransectionform/>
        </Protectedroute>
       }
      />
      <Route path="/dashboard" element={
        <Protectedroute>
          <Dashboard/>
        </Protectedroute>
       } >
                <Route path="" Component={Body2} />
                <Route path="addexpense" Component={TransactionForm}/>
                <Route path="transactions" Component={Transaction} />
                <Route path="analytics" Component={Chart} />
                <Route path="allgroups" Component={AllGroups} />
                <Route path="creategroup" Component={GroupPage} />
                <Route path="addgroupexpense/:groupId" Component={GroupExpense}/>
        </Route>
        <Route path="/*" element={<NotFound />} />   
    </Routes>
    </div>
  </>)
}
 {/* if user is verified then send him forward other wise navigate to home page */}
export function Protectedroute(props){
  if(localStorage.getItem("user")){
    return props.children;
  }
  else{
    return <Navigate to="/"/>
    
  }
}
export default App;