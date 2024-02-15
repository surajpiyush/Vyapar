import { useState } from 'react'
import Register from "../Component/Rigistared.jsx";
import Login from "../Component/Login.jsx";
import "../Css/styles.css" ; 
import "../Css/styles1.css";

const Authpage = () => {

    const [tabItems, setTabItems] = useState({
        logintab: true,
        registertab: false,
      });
    
    
      const handleRegisterTab = () => {
        if(!tabItems.registertab) {
          setTabItems({
            registertab: !tabItems.registertab,
          })
        }
      };
    
    
      const handleLogInTab = () => {
        if(!tabItems.logintab) {
          setTabItems({
            logintab: !tabItems.logintab,
          })
        }
      }

  return (
     <div className='body' style={{height: "100vh", width: "100vw"}} >
    <div className='tab-container'>
      <section className="tab-button">
        <button onClick={handleRegisterTab} style={{backgroundColor: tabItems.registertab && "#abc0ff", color: tabItems.registertab && "white" }} className='tab-items'>Signup</button>
        <button onClick={handleLogInTab} style={{backgroundColor: tabItems.logintab && "#abc0ff", color: tabItems.logintab && "white" }} className='tab-items'>LogIn</button>
      </section>
      {tabItems.registertab && (
      <section className="regsiter-tab">
    <Register/>
      </section>
      )}
      {tabItems.logintab && (
      <section className="login-tab">
      <Login/>
      </section>
      )}
    </div>
    </div>
  )
}

export default Authpage
