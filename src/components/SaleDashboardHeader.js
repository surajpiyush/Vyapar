import css from "../styles/reportsStyles/report.module.css";
import * as XLSX from "xlsx";
import { VscGraph } from "react-icons/vsc";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdOutlinePrint } from "react-icons/md";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

const SaleDashboardHeader = ({
   data,

   setStartDate,
   setEndDate,
   startDate,
   endDate,
}) => {
   const tableData = data;
   console.log(tableData);

const toast = useToast();
   const saveTableData = async (action) => {
      switch (action) {
         case "PRINT":
            window.print();
            break;

         // case "XLSXw":
         //    // Sample data for multiple sheets
         //    const XLSX = require("xlsx");

         //    const dataSheet1 = [
         //       ["Product", "Price", "Quantity"],
         //       ["Item 1", 10, 20],
         //       ["Item 2", 15, 30],
         //       ["Item 3", 20, 25],
         //    ];

         //    const dataSheet2 = [
         //       ["Customer", "Order Date", "Amount"],
         //       ["Customer 1", "2024-03-20", 100],
         //       ["Customer 2", "2024-03-21", 150],
         //       ["Customer 3", "2024-03-22", 200],
         //    ];

         //    // Create a new workbook
         //    const workbook = XLSX.utils.book_new();

         // // Convert data to worksheets
         // const worksheet1 = XLSX.utils.aoa_to_sheet(dataSheet1);
         // const worksheet2 = XLSX.utils.aoa_to_sheet(dataSheet2);

         // // Add the worksheets to the workbook
         // XLSX.utils.book_append_sheet(workbook, worksheet1, "Products");
         // XLSX.utils.book_append_sheet(workbook, worksheet2, "Orders");

         //    // Add additional sheets with only headers
         //    const headers = [["Header 1", "Header 2", "Header 3"]];
         //    for (let i = 0; i < 4; i++) {
         //       const sheetName = "Header Sheet " + (i + 1);
         //       const headerSheet = XLSX.utils.aoa_to_sheet(headers);
         //       XLSX.utils.book_append_sheet(workbook, headerSheet, sheetName);
         //    }

         //    // Save the workbook as an Excel file
         //    XLSX.writeFile(workbook, "report.xlsx");

         //    break;

         case "XLSX":
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

         case "CSV":
            const filteredHeaders = Object.keys(tableData[0]).filter(
               (header) => header !== "id"
            );
            const csvData = [filteredHeaders.join(",")];
            tableData.forEach((row) => {
               const rowData = filteredHeaders.map((header) => {
                  let cellData = row[header];
                  // Adjust cell data if necessary to fit within their cells
                  // For example, if the cell data contains commas, wrap it in quotes
                  if (typeof cellData === "string" && cellData.includes(",")) {
                     cellData = `"${cellData}"`;
                  }
                  return cellData;
               });
               csvData.push(rowData.join(","));
            });
            const blob = new Blob([csvData.join("\n")], { type: "text/csv" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute("download", "Data.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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
      <div
         className="sale-dashboard-header"
         style={{
            // border: "1px solid red",
            background: "white",
            paddingTop: "20px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
         }}
      >
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
         <div className="sale-dashboard-icons" style={{ paddingTop: "10px" }}>
            <div
               className="sale-dashboard-icon"
               onClick={() => {
                  toast({
                     title: "Work under Development",
                     status: "info",
                     position: "top",
                  });
               }}
            >
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
