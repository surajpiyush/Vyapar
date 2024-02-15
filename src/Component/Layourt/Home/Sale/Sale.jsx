import React, { useState } from 'react';
import "./Sale.css";
import { TbNotes } from "react-icons/tb";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { BiUpArrowAlt } from "react-icons/bi";

const Sale = () => {

    const [ismonthmodelopen, setIsmonthmodelopen] = useState(false);

  return (
    <div className='sale-container'>
        <section className="sale-heading">
            <aside className="sale-heading-aside1">
                    <TbNotes className='sale-heading-notes'/>
                    <h4>Sale</h4>
            </aside>
            <aside className="sale-heading-aside2">
                    <div className="sale-month-div">
                        <button>This Month</button>
                       {ismonthmodelopen ? <FaCaretUp/> : <FaCaretDown/> } 
                    </div>
            </aside>
        </section>
        <section className="sale-content">
            <aside className="sale-content-aside1">
                <div>
                <div className="sale-amount-div">
                    <FaRupeeSign/>
                    <h3>00</h3>
                    <span>.00</span>
                </div>
                <p className='sale-amount-text'>Total Sale (Feb)</p>
                </div>
                <div className="sale-growth-data">
                    <div>
                    <BiUpArrowAlt className='sale-top-arrow-icon'/>
                    <p className='sale-growth-data-percent'>0 %</p>
                    </div>
                    <p className="sale-growth-text">
                        This Month Growth
                    </p>
                </div>
            </aside>
            <aside className="sale-content-aside2">
                <div className="sale-line"></div>
                <p className="sale-report">Report: From 01 to 29 Feb</p>
            </aside>
        </section>
    </div>
  )
}

export default Sale