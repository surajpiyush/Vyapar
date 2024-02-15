import { useState } from 'react'
import Busniess from "../Component/utils/Busniess.jsx";
import "../Css/styles.css" ; 
import "../Css/styles1.css";


const Busniesspage = () => {

    const [tabItems, setTabItems] = useState({
        Busniesstab: true,
        
      })
      const handleBusniessTab = () => {
        if(!tabItems.Busniesstab) {
          setTabItems({
            Busniesstab: !tabItems.Busniesstab,
          })
        }
      }

  return (
     <div className='body' style={{height: "100vh", width: "100vw"}} >
    <div className='tab-container'>
      <section className="tab-button">
        <button onClick={handleBusniessTab} style={{backgroundColor: tabItems.registertab && "#abc0ff", color: tabItems.registertab && "white" }} className='tab-items'>ADDBUSINES</button>
        
      </section>
      
      {tabItems.Busniesstab && (
      <section className="login-tab">
      <Busniess/>
      </section>
      )}
    </div>
    </div>
  )
}

export default Busniesspage