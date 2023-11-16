import React from 'react' ;
import { useEffect,useState } from 'react';

function Darkmode() {
    const [theme,setTheme] = useState(null) ;

    useEffect(() => {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
          setTheme('dark');
        }
        else {
          setTheme('light');
        }
      }, [])

    useEffect(() => {
        if(theme === "dark") {
            document.documentElement.classList.add("dark");
        }else{
            document.documentElement.classList.remove("dark");
        }
    },[theme]);

    const handleThemeSwitch = () => {
        setTheme(theme === "dark"   ?  "light" : "dark"); 
    }

  return (
    <>
    <div>
        <button className="text-white px-4 py-2 rounded-md hover:bg-slate-800 hover:text-yellow-400" onClick={handleThemeSwitch}>
           {(theme === 'dark') ? <h6>Light Mode</h6> : <h6>Dark Mode</h6> }</button>
    </div>
    </>
  )
}

export default Darkmode ;