import {useState} from 'react'
import './tooglebtn.css'


function Tooglebtn() {
    const [toggled, setToggled]= useState(false);
  return (
    <div className='toogle'>
        <button className={`toggle-btn ${toggled ? 'toggled' : ""}`} 
        onclick={()=>setToggled(!toggled)}>
        <div className='thumb'></div>
        
        </button>
      
    </div>
  )
}

export default Tooglebtn
