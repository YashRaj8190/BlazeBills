import React from 'react';
import Home from './Components/Homepage/Home';
import {Routes,Route} from'react-router-dom'
import Signup from './Components/SignUp/Sign';
import Login from './Components/login';
import Addtransectionform from './Components/Addexpenses';
import { Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard/dasboard';
import Navbar2 from './Components/Dashboard/Navbar2';
import Footer from './Components/Homepage/Footer';

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
      <Route path="/dashboard" Component={Dashboard} />
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