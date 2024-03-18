import { useEffect, useState } from "react";
import { FaPlus, FaEquals } from "react-icons/fa";
import SaleDashboardHeader from "./SaleDashboardHeader";
import ReportSearchBar from "./ReportSearchBar";
import ReportBtn from "./ReportBtn";
import PurchaseTableModel from "./PurchaseTableModel";

const SaleDashboard = ({
   data,
   tableHeader,
   btnText,
   setStartDate,
   setEndDate,
   startDate,
   endDate,
}) => {
   // Calculate paid and unpaid amounts
   const [paidAmount, setPaidAmount] = useState(0);
   const [unpaidAmount, setUnpaidAmount] = useState(0);

   // Calculate paid and unpaid amounts from the data
   const calculateAmounts = () => {
      let paid = 0;
      let unpaid = 0;
      data?.forEach((item) => {
         paid += (item.amount || 0) - (item.balanceDue || 0);
         unpaid += item.balanceDue || 0;
      });
      setPaidAmount(paid);
      setUnpaidAmount(unpaid);
   };

   // Call calculateAmounts when data, startDate, or endDate change
   useEffect(() => {
      calculateAmounts();
   }, [data, startDate, endDate]);

   return (
      <div className="sale-dashboard">
         {/* Header */}
         <SaleDashboardHeader
            data={data}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            endDate={endDate}
            startDate={startDate}
         />

         {/* Sale Dashboard Amount */}
         <div className="sale-dashboard-ammount">
            <div>
               <span>Paid</span>
               <h5>₹{paidAmount}</h5>
            </div>
            <FaPlus />
            <div>
               <span>Unpaid</span>
               <h5>₹{unpaidAmount}</h5>
            </div>
            <FaEquals />
            <div>
               <span>Total</span>
               <h5>₹{paidAmount + unpaidAmount}</h5>
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
