import React, { useState } from 'react';
import "./Bottomitems.css";
import { TbNotes } from "react-icons/tb";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { BiUpArrowAlt } from "react-icons/bi";
import { IoStatsChart } from "react-icons/io5";

const bottomcarditems = [
    {
        Icon: <FaCaretDown/>,
        heading: "You'll Receive",
        paragraph: "You don't have any pending amount to be received",
    },
    {
        Icon: <FaCaretUp/>,
        heading: "You'll Pay",
        paragraph: "You don't have to pay any amount",
    },
    {
        Icon: <IoStatsChart/>,
        heading: "Purchase",
        paragraph: "You have no purchased items entered  for selected items",
    },
]

const Bottomitems = () => {

    const [ismonthmodelopen, setIsmonthmodelopen] = useState(false);

  return (

    <div className='bottom-items-container'>
        {bottomcarditems.map((items, index) => (
            <div key={index} className="bottomitems-items bottomitem-items-div">
                <div>
                <div className="bottomitem-item-div2">
                    <div>{items.Icon}</div>
                    <h3>{items.heading}</h3>
                </div>
                <div className="bottomid-item-div-3">
                <div className="bottomid-amount-div">
                <FaRupeeSign/>
                <h3>00</h3>
                <span>.00</span>
            </div>
                </div>
                </div>
                <div className="bottomid-item-div-4">
                    <p>{items.paragraph}</p>
                </div>
            </div>
        ))}
</div>
  )
}

export default Bottomitems