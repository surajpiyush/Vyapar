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

  
         if (item && item.amount && item.balanceDue) {
            paid += Number(item.amount || 0) - Number(item.balanceDue || 0);
            unpaid += Number(item.balanceDue || 0);
         }
      });
      setPaidAmount(paid.toFixed(2));
      setUnpaidAmount(unpaid.toFixed(2));
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
               <h5>₹{Number(paidAmount) + Number(unpaidAmount)}</h5>
            </div>   
         </div>

         {/* Search Bar And Button */}
         {/* Include ReportSearchBar and ReportBtn components here if needed */}

         {/* Table */}
         <PurchaseTableModel tableHeader={tableHeader} data={data} />
      </div>
   );
};

export default SaleDashboard;
