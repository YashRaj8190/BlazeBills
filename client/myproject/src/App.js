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
function App(){
  return (<>
    <div>
    <Routes >
      <Route path="/" 
       element={
        // <Protectedroute>
          <Home/>
        // </Protectedroute>
       }
      />
      <Route path="/signup" Component={Signup} />
      <Route path="/login" Component={Login} />
      {/* <Route path="/addexpense" 
      element={
        <Protectedroute>
          <Addtransectionform/>
        </Protectedroute>
       }
      /> */}
      <Route path="/dashboard" Component={Dashboard} >
                <Route path="" Component={Body2} />
                <Route path="addexpense" Component={TransactionForm}/>
                <Route path="transactions" Component={Transaction} />
        </Route>   
    </Routes>
    </div>
  </>)
}
export function Protectedroute(props){
  if(localStorage.getItem("user")){
    return props.children;
  }
  else{
    return <Navigate to="/home"/>
    
  }
}
export default App;