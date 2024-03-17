import * as XLSX from "xlsx";
import { VscGraph } from "react-icons/vsc";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdOutlinePrint } from "react-icons/md";
import { useState } from "react";

const SaleDashboardHeader = ({
   data,
   setStartDate,
   setEndDate,
   startDate,
   endDate,
}) => {
   const [tableData] = useState(data); // Using data directly as initial state

   const saveTableData = (action) => {
      switch (action) {
         case "PRINT":
            window.print();
            break;

         case "XLSX":
            const ws1 = XLSX.utils.json_to_sheet(tableData);
            const wb1 = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb1, ws1, "Sheet 1");
            XLSX.writeFile(wb1, "tableData.xlsx");
            break;

         default:
            console.warn("Unknown action:", action);
      }
   };

   const handleStartDateChange = (e) => {
      setStartDate(e.target.value);
   };

   const handleEndDateChange = (e) => {
      setEndDate(e.target.value);
   };

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
               <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
               />
               <p>To</p>
               <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
               />
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
            <div
               className="sale-dashboard-icon"
               onClick={() => saveTableData("XLSX")}
            >
               <SiMicrosoftexcel />
               <p>Excel</p>
            </div>
            <div
               className="sale-dashboard-icon"
               onClick={() => saveTableData("PRINT")}
            >
               <MdOutlinePrint />
               <p>Print</p>
            </div>
         </div>
      </div>
   );
};

export default SaleDashboardHeader;
