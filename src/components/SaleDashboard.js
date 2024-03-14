import { FaPlus, FaEquals } from "react-icons/fa";
import SaleDashboardHeader from "./SaleDashboardHeader";
import ReportSearchBar from "./ReportSearchBar";
import ReportBtn from "./ReportBtn";
import PurchaseTableModel from "./PurchaseTableModel";

const SaleDashboard = ({ data, tableHeader, btnText,setStartDate,setEndDate,startDate,endDate }) => {
  // console.log(data)
  return (
    <div className="sale-dashboard">
      {/* header */}
      <SaleDashboardHeader data={data} setEndDate={setEndDate} setStartDate = {setStartDate} endDate={endDate} startDate={startDate}/>

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
   
      </div>

      {/* Table */}
      <PurchaseTableModel tableHeader={tableHeader} data={data} />
    </div>
  );
};

export default SaleDashboard;
