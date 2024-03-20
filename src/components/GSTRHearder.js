import React, { useState } from "react";
import * as XLSX from "xlsx";
import { BsFiletypeJson, BsFiletypeXlsx } from "react-icons/bs";
import { MdOutlinePrint } from "react-icons/md";
import { useToast } from "@chakra-ui/react";

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
   const toast = useToast();
   const [loading, setLoading] = useState(false);
   const saveTableData = async (action) => {
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
            try {
               // Set loading state to true
               setLoading(true);

               // Filter headers
               const filteredHeaders = Object.keys(tableData[0]).filter(
                  (header) => header !== "_id"
               );

               // Construct data array with filtered data
               const filteredData = tableData.map((row) =>
                  filteredHeaders.map((header) => row[header])
               );

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

               // Create a worksheet with filtered headers and data
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
                  [tableData.length, "", tableData.length],
                  [],
                  [
                     "GSTIN/UIN of Recipient",
                     "Receiver Name",
                     "Invoice Number",
                     "Invoice date",
                     "Invoice Value",
                     "Place Of Supply",
                     "Reverse Charge",
                     "Applicable % of Tax Rate",
                     "Invoice Type",
                     "E-Commerce GSTIN",
                     "Rate",
                     "Taxable Value",
                     "Cess Amount",
                  ],

                  ...filteredData,
               ]);
               const b2CLsheet = XLSX.utils.aoa_to_sheet([
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
                     "Invoice Number",
                     "Invoice date",
                     "Invoice Value",
                     "Place Of Supply",
                     "Applicable % of Tax Rate",
                     "Rate",
                     "Taxable Value",
                     "Cess Amount",
                     "E-Commerce GSTIN",
                  ][""],
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

               const cdnr = XLSX.utils.aoa_to_sheet([
                  ["Summary Fro CDNR"],
                  [],
                  [
                     "GSTIN/UIN of Recipient",
                     "Receiver Name",
                     "Note Number",
                     "Note Date",
                     "Note Type",
                     "Place Of Supply",
                     "Reverse Charge",
                     "Note Supply Type",
                     "Note Value",
                     "Applicable % of Tax Rate",
                     "Rate",
                     "Taxable Value",
                     "Cess Amount",
                  ][""],
               ]);

               const exemp = XLSX.utils.aoa_to_sheet([
                  [
                     "Summary For Nil rated, exempted and non GST outward supplies (8)",
                  ],
                  [
                     "",
                     "Total Nil Rated Supplies",
                     "Total Exempted Supplies",
                     "Total Non-GST Supplies",
                  ],
                  [
                     "Description",
                     "Nil Rated Supplies",
                     "Exempted(other than nil rated/non GST supply)",
                     "Non-GST Supplies",
                  ],

                  [""],
               ]);

               const hsn = XLSX.utils.aoa_to_sheet([
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
                     "HSN",
                     "Description",
                     "UQC",
                     "Total Quantity",
                     "Total Value",
                     "Rate",
                     "Taxable Value",
                     "Integrated Tax Amount",
                     "Central Tax Amount",
                     "State/UT Tax Amount",
                     "Cess Amount"
                   ]
                  [""],
               ]);

               const docs = XLSX.utils.aoa_to_sheet([
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

               XLSX.utils.book_append_sheet(workbook, b2bsheet, "b2b");
               XLSX.utils.book_append_sheet(workbook, b2CLsheet, "b2cl");
               XLSX.utils.book_append_sheet(workbook, b2cs, "b2cs");
               XLSX.utils.book_append_sheet(workbook, cdnr, "cdnr");
               XLSX.utils.book_append_sheet(workbook, exemp, "exemp");
               XLSX.utils.book_append_sheet(workbook, hsn, "hsn");
               XLSX.utils.book_append_sheet(workbook, docs, "docs");

               XLSX.writeFile(workbook, "data.xlsx");

               setLoading(false);
            } catch (error) {
               console.error("Error:", error);
               setLoading(false);
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
