import React from 'react'
import { VscGraph } from "react-icons/vsc";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdOutlinePrint } from "react-icons/md";

const SaleDashboardHeader = () => {
  return (
    <div className="sale-dashboard-header">
    <div className="sale-dashboard-menu">
      <select className="sale-dashboard-select">
        <option value="">This Month</option>
        <option value="">All Sale Invoices</option>
        <option value="">Last Month</option>
        <option value="">This Quarter</option>
        <option value="">This Year</option>
        <option value="">Custom</option>
      </select>
      <div className="date-filter-div">
        <p>Between</p>
        <input type="date" />
        <p>To</p>
        <input type="date" />
      </div>
      <select className="sale-dashboard-select">
        <option value="">All Firm</option>
        <option value="">Company</option>
      </select>
    </div>
    <div className="sale-dashboard-icons">
      <div className="sale-dashboard-icon">
        <VscGraph />
        <p>Graph</p>
      </div>
      <div className="sale-dashboard-icon">
        <SiMicrosoftexcel />
        <p>Excel</p>
      </div>
      <div className="sale-dashboard-icon">
        <MdOutlinePrint />
        <p>Print</p>
      </div>
    </div>
  </div>
  )
}

export default SaleDashboardHeader