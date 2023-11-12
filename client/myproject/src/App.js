import React from 'react';
import Home from './Components/Homepage/Home';
import {Routes,Route} from'react-router-dom'
import Signup from './Components/SignUp/Sign';
import Login from './Components/login';

function App(){
  return (<>
    <div>
    <Routes >
      <Route path="/" Component={Home} />
      <Route path="/signup" Component={Signup} />
      <Route path="/login" Component={Login}/>
    </Routes>
    </div>
  </>)
}
export default App;