import React, { useState } from "react";
import * as XLSX from "xlsx";
import { BsFiletypeJson, BsFiletypeXlsx } from "react-icons/bs";
import { MdOutlinePrint } from "react-icons/md";

const GSTRHeader = ({ isChecked, check, data }) => {
  console.log(data)
   const [tableData] = useState(data); // Using data directly as initial state

   const saveTableData = (action) => {
      switch (action) {
         case "JSON":
            // Convert the data to JSON
            const jsonData = JSON.stringify(tableData);

            // Create a Blob containing the JSON data
            const blob = new Blob([jsonData], { type: "application/json" });

            // Create a link element to trigger the download
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "tableData.json";

            // Append the link to the document and trigger the click
            document.body.appendChild(link);
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);
            break;

         case "PRINT":
            // Trigger browser's print dialog
            window.print();
            break;

         case "XLSX":
            // Convert the data to XLSX format and save
            const ws1 = XLSX.utils.json_to_sheet(tableData);
            const wb1 = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb1, ws1, "Sheet 1");
            XLSX.writeFile(wb1, "tableData.xlsx");
            break;
         default:
            console.warn("Unknown action:", action);
      }
   };

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
            <div
               className="sale-dashboard-icon"
               onClick={() => saveTableData("JSON")}
            >
               <BsFiletypeJson />
               <p>JSON</p>
            </div>
            <div
               className="sale-dashboard-icon"
               onClick={() => saveTableData("XLSX")}
            >
               <BsFiletypeXlsx />
               <p>Xls</p>
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

export default GSTRHeader;
