import React from "react";
import "../css/SaleDashboard.css";
import { FaPlus, FaEquals } from "react-icons/fa";
import TableModel from "./TableModel";
import SaleDashboardHeader from "./SaleDashboardHeader";
import ReportSearchBar from "./ReportSearchBar";
import ReportBtn from "./ReportBtn";
  

const SaleDashboard = ({data,tableHeader,btnText}) => {
  return (
    <div className="sale-dashboard">
      {/* header */}
        <SaleDashboardHeader/>

      {/* Sale Dashboard Ammount */}
      <div className="sale-dashboard-ammount">
        <div>
          <span>Paid</span>
          <h5>₹{1000}</h5>
        </div>
        <FaPlus />
        <div>
          <span>Unpaid</span>
          <h5>₹{1000}</h5>
        </div>
        <FaEquals />
        <div>
          <span>Total</span>
          <h5>₹{1000}</h5>
        </div>
      </div>

      {/* Search Bar And Button */}
      <div className="sale-dashboard-search">
        <span>TRANSACTIONS</span>
        <div>
            <ReportSearchBar/>
            <ReportBtn btnText={btnText}/>
        </div>
      </div>

      {/* Table */}
        <TableModel tableHeader={tableHeader} data={data}/>


    </div>
  );
};

export default SaleDashboard;
