import React from 'react'
import { FaPlus } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

const ReportNav = () => {
  return (
    <div className='RpNav'>
        <div className='RpInput'>
        <input type="text" placeholder='Enter Business Name'/>
        <button>save</button>
        </div>
        <div className='Rpbtn-container'>
            <div>
            <FaPlus />
                Add Sale
            </div>
            <div>
            <FaPlus />
                Add Purchase
            </div>
            <div>
            <FaPlus />
                Add More
            </div>
        </div>
        <div className='RpSetting'>
            <button>
            <IoSettings />
            </button>
        </div>
    </div>
  )
}

export default ReportNav