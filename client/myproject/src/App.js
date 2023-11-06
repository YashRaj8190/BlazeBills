import React from 'react';
import Home from './Components/Homepage/Home';
import {Routes,Route} from'react-router-dom'
import Signup from './Components/SignUp/Sign';

function App(){
  return (<>
    <div>
    <Routes >
      <Route path="/" Component={Home} />
      <Route path="/signup" Component={Signup} />
    </Routes>
    </div>
  </>)
}
export default App;