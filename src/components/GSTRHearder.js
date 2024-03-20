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

   const saveTableData = async(action) => {
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
               try {
                  // Grouping the data by type
                  const groupedData = {
                     "All Data": [],
                     "Sale Data": [],
                     "Purchase Data": [],
                     "Debit Note Data": [],
                     "Credit Note Data": [],
                  };
   
                  // Iterate over each object in the data array
                  tableData?.forEach((obj) => {
                     // Add the object to the "All Data" group
                     groupedData["All Data"].push(obj);
   
                     // Filter data by type and add them to respective groups
                     if (obj.type === "Sale") {
                        groupedData["Sale Data"].push(obj);
                     } else if (obj.type === "Purchase") {
                        groupedData["Purchase Data"].push(obj);
                     } else if (obj.type === "Debit Note") {
                        groupedData["Debit Note Data"].push(obj);
                     } else if (obj.type === "Credit Note") {
                        groupedData["Credit Note Data"].push(obj);
                     }
                  });
   
                  // Load the local Excel file
                  const response = await fetch(
                     process.env.PUBLIC_URL + "/GSTR1.xlsx"
                  );
                  const buffer = await response.arrayBuffer();
   
                  const workbookMine = XLSX.read(buffer, { type: "array" });
   
                  // Create a new workbook
                  const workbook = XLSX.utils.book_new();
   
                  // Add the "Help Instructions" worksheet from the loaded workbookMine to the new workbook
                  const helpWorksheet = workbookMine.Sheets["Help Instructions"];
                  XLSX.utils.book_append_sheet(
                     workbook,
                     helpWorksheet,
                     "Help Instructions"
                  );
   
                  // Convert grouped data to worksheets
                  for (const sheetName in groupedData) {
                     const worksheet = XLSX.utils.json_to_sheet(
                        groupedData[sheetName]
                     );
                     XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
                  }
   
                  // Save the workbook as an Excel file
                  XLSX.writeFile(workbook, "filtered_data.xlsx");
               } catch (error) {
                  console.error("Error:", error);
               }
               break;
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
