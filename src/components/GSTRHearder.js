import React from 'react'
import { BsFiletypeJson, BsFiletypeXlsx } from "react-icons/bs";
import { MdOutlinePrint } from "react-icons/md";

const GSTRHearder = ({isChecked,check}) => {
  return (
    <div className="sale-dashboard-header">
        <div className="sale-dashboard-menu">
          <div className="date-filter-div">
            <p>Between</p>
            <input type="date" />
            <p>To</p>
            <input type="date" />
          </div>
          <div className="gstr-header-checkbox">
                <input type="checkbox" checked={isChecked} onChange={check} />
                <span>Consider non-tax as exempted</span>
          </div>
        </div>
        <div className="sale-dashboard-icons">
          <div className="sale-dashboard-icon">
          <BsFiletypeJson />
            <p>JSON</p>
          </div>
          <div className="sale-dashboard-icon">
          <BsFiletypeXlsx />
            <p>Xls</p>
          </div>
          <div className="sale-dashboard-icon">
            <MdOutlinePrint />
            <p>Print</p>
          </div>
        </div>
      </div>
  )
}

export default GSTRHearder