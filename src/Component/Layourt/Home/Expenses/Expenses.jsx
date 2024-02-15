import React, { useState } from 'react';
import { TbNotes } from "react-icons/tb";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { BiUpArrowAlt } from "react-icons/bi";
import { IoWallet } from "react-icons/io5";

import "./Expenses.css"

const Expenses = () => {

    const [ismonthmodelopen, setIsmonthmodelopen] = useState(false);

  return (
    <div className='purchase-container'>
    <section className="purchase-heading">
        <aside className="purchase-heading-aside1">
            <div>
            <IoWallet className='purchase-heading-notes'/>
                <h4>Expenses</h4>
            </div>
               
                <div className="purchase-amount-div">
                <FaRupeeSign/>
                <h3>00</h3>
                <span>.00</span>
            </div>
        </aside>
        <aside className="purchase-heading-aside2">
                <div className="purchase-month-div">
                    <button>This Month</button>
                   {ismonthmodelopen ? <FaCaretUp/> : <FaCaretDown/> } 
                </div>
        </aside>
    </section>
    <section className="purchase-content">
       
        <aside className="purchase-content-aside2">
            <div className="purchase-line"></div>
            <p className="purchase-report">Report: From 01 to 29 Feb</p>
        </aside>
    </section>
</div>
  )
}

export default Expenses