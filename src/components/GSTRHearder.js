import React, { useState } from "react";
import * as XLSX from "xlsx";
import { BsFiletypeJson, BsFiletypeXlsx } from "react-icons/bs";
import { MdOutlinePrint } from "react-icons/md";

const GSTRHeader = ({
   isChecked,
   check,
   data,
   startDate,
   endDate,
   setEndDate,
   setStartDate,
}) => {
   const tableData = data;
   console.log(data);

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
            if (!tableData.length) {
               alert("No data to download");
            } else {
               const csvData = [Object.keys(tableData[0]).join(",")];
               tableData.forEach((row) => {
                  csvData.push(Object.values(row).join(","));
               });
               const blob1 = new Blob([csvData.join("\n")], {
                  type: "text/csv",
               });
               const link1 = document.createElement("a");
               link1.href = window.URL.createObjectURL(blob1);
               link1.setAttribute("download", "tableData.csv");
               document.body.appendChild(link1);
               link1.click();
               document.body.removeChild(link1);
            }
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
               <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
               />
               <p>To</p>
               <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
               />
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
