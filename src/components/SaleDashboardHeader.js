import css from "../styles/reportsStyles/report.module.css";
import * as XLSX from "xlsx";
import { VscGraph } from "react-icons/vsc";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdOutlinePrint } from "react-icons/md";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";

const SaleDashboardHeader = ({
   data,
   setStartDate,
   setEndDate,
   startDate,
   endDate,
}) => {
   const tableData = data;
   // console.log(tableData);

   const toast = useToast();
   const [loading, setLoading] = useState(false);
   const saveTableData = async (action) => {
      switch (action) {
         case "PRINT":
            window.print();
            break;

         case "XLSX":
            try {
               // Set loading state to true
               setLoading(true);

               const filteredHeaders = Object.keys(tableData[0]).filter(
                  (header) => header !== "_id"
               );
               // Filter data for b2b and b2c sheets
               const b2bData = [];
               const b2cData = [];
               tableData.forEach((row) => {
                  const rowData = filteredHeaders.map((header) => row[header]);
                  if (row["gstNo"]) {
                     b2bData.push(rowData);
                  } else {
                     b2cData.push(rowData);
                  }
               });

               // Fetch Excel file
               const response = await fetch(
                  process.env.PUBLIC_URL + "/GSTR1.xlsx"
               );
               const buffer = await response.arrayBuffer();

               // Read existing workbook
               const workbookMine = XLSX.read(buffer, { type: "array" });

               // Create a new workbook
               const workbook = XLSX.utils.book_new();

               // Append "Help Instructions" sheet from existing workbook
               const helpWorksheet = workbookMine.Sheets["Help Instructions"];
               XLSX.utils.book_append_sheet(
                  workbook,
                  helpWorksheet,
                  "Help Instructions"
               );

               // Create sheets for b2b and b2c data
               const b2bsheet = XLSX.utils.aoa_to_sheet([
                  ["Summary of B2B"],
                  [""],
                  [
                     "No. Of Recipients",
                     "",
                     "No. Of Invoices",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "Total Taxable Value",
                     "Total Cess",
                  ],
                  [
                     b2bData.length,
                     "",
                     b2bData.length,
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     b2bData.reduce((acc, row) => acc + (row[11] || 0), 0), // Total taxable value (index 11)
                     b2bData.reduce((acc, row) => acc + (row[12] || 0), 0), // Total cess (index 12)
                  ],
                  [],
                  [
                     "Status",
                     "Invoice Number",
                     "Date Of Invoice",
                     "State of Supply",
                     "Supplier",
                     "GSTIN NUMBER",
                     "Type of Transaction",
                     "Mode of Payment",
                     "Total Amount",
                     "Total Balance",
                     "Rate of GST",
                     "Taxable Amount",
                     "CESS",
                  ],
                  ...b2bData,
               ]);

               const b2CLsheet = XLSX.utils.aoa_to_sheet([
                  ["Summary For B2CL"],
                  [
                     "No. Of Recipients",
                     "",
                     "No. Of Invoices",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "Total Taxable Value",
                     "Total Cess",
                  ],
                  [
                     b2cData.length,
                     "",
                     b2cData.length,
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     b2cData.reduce((acc, row) => acc + (row[11] || 0), 0), // Total taxable value (index 11)
                     b2cData.reduce((acc, row) => acc + (row[12] || 0), 0), // Total cess (index 12)
                  ],
                  [""],
                  [
                     "Status",
                     "Invoice Number",
                     "Date Of Invoice",
                     "State of Supply",
                     "Supplier",
                     "GSTIN NUMBER",
                     "Type of Transaction",
                     "Mode of Payment",
                     "Total Amount",
                     "Total Balance",
                     "Rate of GST",
                     "Taxable Amount",
                     "CESS",
                  ],
                  ...b2cData,
               ]);

               const b2cs = XLSX.utils.aoa_to_sheet([
                  ["Summary Fro B2CL"],
                  [
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "Total Taxable Value",
                     "Total Css",
                     "",
                  ],
                  [
                     "Type",
                     "Place Of Supply",
                     "Applicable % of Tax Rate",
                     "Rate",
                     "Taxable Value",
                     "Cess Amount",
                     "	E-Commerce GSTIN",
                  ],

                  [""],
               ]);

               const cdnr = XLSX.utils.aoa_to_sheet([
                  ["Summary For CDNR(9B)"],
                  ["", "", "", "", "", "", "", "", "", "", ""],
                  [
                     "Invoice Number",
                     "Invoice Date",
                     "Invoice Value",
                     "Place of Supply",
                     "Applicable %",
                     "Rate",
                     "Taxable Value",
                     "Cess Amount",
                     "E-Commerce GSTIN",
                  ],

                  [""],
               ]);

               const exemp = XLSX.utils.aoa_to_sheet([
                  ["Summary For Nil rated,"],
                  ["exempted and non GST outward supplies (8)"],
                  ["", "Total Nill Value", "Total Css", ""],
                  [""],

                  [""],
               ]);

               const hsn = XLSX.utils.aoa_to_sheet([
                  ["Summary for HSN"],
                  [
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "Total Value",
                     "Total Taxable Value",
                     "Total Integrated Tax",
                     "Total Central Tax",
                     "",
                     "Total State/UT Tax",
                     "Total Cess",
                  ],
                  [""],
                  [
                     "HSN",
                     "	Description	UQC",
                     "Total Quantity",
                     "Total Value	Rate",
                     "Taxable Value",
                     "Integrated Tax Amount",
                     "Central Tax Amount",
                     "State/UT Tax Amount",
                     "Cess Amount",
                  ],

                  [""],
               ]);

               const docs = workbookMine.Sheets["docs"];

               // Append sheets to the workbook
               XLSX.utils.book_append_sheet(workbook, b2bsheet, "b2b");
               XLSX.utils.book_append_sheet(workbook, b2CLsheet, "b2cl");
               XLSX.utils.book_append_sheet(workbook, b2cs, "b2cs");
               XLSX.utils.book_append_sheet(workbook, cdnr, "cdnr");
               XLSX.utils.book_append_sheet(workbook, exemp, "exemp");
               XLSX.utils.book_append_sheet(workbook, hsn, "hsn");
               XLSX.utils.book_append_sheet(workbook, docs, "docs");

               XLSX.writeFile(workbook, `GR0001${startDate}_${endDate}.xlsx`);

               setLoading(false);
            } catch (error) {
               console.error("Error:", error);
               setLoading(false);
            }
            break;

         default:
            console.warn("Unknown action:", action);
            setLoading(false);
      }
   };

   // console.log(loading);
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
            position: "relative",
            paddingTop: "20px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
         }}
      >
         {loading && (
            <div
               style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100vh",
                  background: "rgba(0, 0, 0, 0.25)",
                  zIndex: 9999,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "50px",
               }}
            >
               <BasicSpinner />
            </div>
         )}
         <div
            className="sale-dashboard-menu"
            style={{
               filter: loading ? "blur(2px)" : "none",
            }}
         >
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

         <div
            className="sale-dashboard-icons"
            style={{
               filter: loading ? "blur(2px)" : "none",
               paddingTop: "10px",
            }}
         >
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
