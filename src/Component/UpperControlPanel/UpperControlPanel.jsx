import css from "./UpperControlPanel.module.css";

import * as XLSX from "xlsx";
import { Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
   BasicSpinnerIcon,
   ExcelIcon,
   ExcelIconOutline,
   JsonIconOutline,
   PrintIconOutline,
} from "../../assets/Icons/ReactIcons";

const UpperControlPanel = ({
   startDate,
   endDate,
   setStartDate,
   setEndDate,
   showPaymentData = false,
   showPrintOptions = false,
   paidAmount = 0,
   showJson = true,
   unpaidAmount = 0,
   data = [],
   fileName = "",
   excelDownload
}) => {
   const [printClickStates, setPrintClickStates] = useState({
      JsonLoading: false,
      excelLoading: false,
      printLoading: false,
   });
  

   // Convert to JSON
   const ConvertToJSON = () => {
      if (!printClickStates?.JsonLoading) {
         setPrintClickStates((prev) => {
            return { ...prev, JsonLoading: true };
         });
         // Convert the data to JSON
         const jsonData = JSON.stringify(data);
         // Create a Blob containing the JSON data
         const blob = new Blob([jsonData], { type: "application/json" });
         // Create a link element to trigger the download
         const link = document.createElement("a");
         link.href = URL.createObjectURL(blob);
         link.download = `${fileName}.json`;
         // Append the link to the document and trigger the click
         document.body.appendChild(link);
         link.click();
         // Remove the link from the document
         document.body.removeChild(link);
         setPrintClickStates((prev) => {
            return { ...prev, JsonLoading: false };
         });
      }
   };

   // Print
   const Print = () => {
      if (!printClickStates?.printLoading) {
         setPrintClickStates((prev) => {
            return { ...prev, printLoading: true };
         });
         window.print();
         setPrintClickStates((prev) => {
            return { ...prev, printLoading: false };
         });
      }
   };

   // Download Excel Report
   const DownloadExcelReport = async () => {
      if (!printClickStates?.excelLoading) {
         try {
            setPrintClickStates((prev) => {
               return { ...prev, excelLoading: true };
            });
            excelDownload();
            // const formattedFileName = `${fileName}_Data_${formattedStartDate}_${formattedEndDate}_09AEIPT7331R1ZJ.xlsx`;
            // const filteredHeaders = Object.keys(data[0]).filter(
            //    (header) => header !== "_id"
            // );
            // // Construct data array with filtered data
            // const filteredData = data.map((row) =>
            //    filteredHeaders.map((header) => row[header])
            // );
            // // Fetch Excel file
            // const response = await fetch(
            //    process.env.PUBLIC_URL + "/GSTR1.xlsx"
            // );
            // const buffer = await response.arrayBuffer();
            // // Read existing workbook
            // const workbookMine = XLSX.read(buffer, { type: "array" });
            // // Create a new workbook
            // const workbook = XLSX.utils.book_new();
            // // Append "Help Instructions" sheet from existing workbook
            // const helpWorksheet = workbookMine.Sheets["Help Instructions"];
            // XLSX.utils.book_append_sheet(
            //    workbook,
            //    helpWorksheet,
            //    "Help Instructions"
            // );

            // // Create a worksheet with filtered headers and data
            // const b2bsheet = XLSX.utils.aoa_to_sheet([
            //    ["Summary of B2B"],
            //    [""],
            //    [
            //       "No. Of Recipients",
            //       "",
            //       "No. Of Invoices",
            //       "",
            //       "",
            //       "",
            //       "",
            //       "",
            //       "",
            //       "",
            //       "",
            //       "Total Taxable Value",
            //       "Total Cess",
            //    ],
            //    [data.length, "", data.length],
            //    [],
            //    [
            //       "STATUS",
            //       "Invoice Number",
            //       "Invoice date",
            //       "Place Of Supply",
            //       "Receiver Name",
            //       "GSTIN/UIN of Recipient",
            //       "Invoice Type",
            //       "PAYMENT TYPE",
            //       "Invoice Value",
            //       "Remaining Amount",
            //       "Rate",
            //       "Taxable Value",
            //       "Cess Amount",

            //       "Reverse Charge",
            //       "Applicable % of Tax Rate",
            //       // "E-Commerce GSTIN",
            //    ],

            //    ...filteredData,
            // ]);
            // const b2CLsheet = XLSX.utils.aoa_to_sheet([
            //    ["Summary Fro B2CL"],
            //    ["", "", "", "", "", "", "Total Taxable Value", "Total Css", ""],
            //    [
            //       "Invoice Number",
            //       "Invoice date",
            //       "Invoice Value",
            //       "Place Of Supply",
            //       "Applicable % of Tax Rate",
            //       "Rate",
            //       "Taxable Value",
            //       "Cess Amount",
            //       "E-Commerce GSTIN",
            //    ][""],
            // ]);
            // const b2cs = XLSX.utils.aoa_to_sheet([
            //    ["Summary Fro B2CL"],
            //    ["", "", "", "", "", "", "Total Taxable Value", "Total Css", ""],
            //    [
            //       "Invoice Number",
            //       "Invoice Date",
            //       "Invoice Value",
            //       "Place of Supply",
            //       "Applicable %",
            //       "Rate",
            //       "Taxable Value",
            //       "Cess Amount",
            //       "E-Commerce GSTIN",
            //    ],

            //    [""],
            // ]);
            // const cdnr = XLSX.utils.aoa_to_sheet([
            //    ["Summary Fro CDNR"],
            //    [],
            //    [
            //       "GSTIN/UIN of Recipient",
            //       "Receiver Name",
            //       "Note Number",
            //       "Note Date",
            //       "Note Type",
            //       "Place Of Supply",
            //       "Reverse Charge",
            //       "Note Supply Type",
            //       "Note Value",
            //       "Applicable % of Tax Rate",
            //       "Rate",
            //       "Taxable Value",
            //       "Cess Amount",
            //    ][""],
            // ]);
            // const exemp = XLSX.utils.aoa_to_sheet([
            //    [
            //       "Summary For Nil rated, exempted and non GST outward supplies (8)",
            //    ],
            //    [
            //       "",
            //       "Total Nil Rated Supplies",
            //       "Total Exempted Supplies",
            //       "Total Non-GST Supplies",
            //    ],
            //    [
            //       "Description",
            //       "Nil Rated Supplies",
            //       "Exempted(other than nil rated/non GST supply)",
            //       "Non-GST Supplies",
            //    ],

            //    [""],
            // ]);
            // const hsn = XLSX.utils.aoa_to_sheet([
            //    ["Summary Fro B2CL"],
            //    ["", "", "", "", "", "", "Total Taxable Value", "Total Css", ""],
            //    [
            //       "HSN",
            //       "Description",
            //       "UQC",
            //       "Total Quantity",
            //       "Total Value",
            //       "Rate",
            //       "Taxable Value",
            //       "Integrated Tax Amount",
            //       "Central Tax Amount",
            //       "State/UT Tax Amount",
            //       "Cess Amount",
            //    ][""],
            // ]);
            // const docs = XLSX.utils.aoa_to_sheet([
            //    ["Summary Fro B2CL"],
            //    ["", "", "", "", "", "", "Total Taxable Value", "Total Css", ""],
            //    [
            //       "Invoice Number",
            //       "Invoice Date",
            //       "Invoice Value",
            //       "Place of Supply",
            //       "Applicable %",
            //       "Rate",
            //       "Taxable Value",
            //       "Cess Amount",
            //       "E-Commerce GSTIN",
            //    ],

            //    [""],
            // ]);
            // XLSX.utils.book_append_sheet(workbook, b2bsheet, "b2b");
            // XLSX.utils.book_append_sheet(workbook, b2CLsheet, "b2cl");
            // XLSX.utils.book_append_sheet(workbook, b2cs, "b2cs");
            // XLSX.utils.book_append_sheet(workbook, cdnr, "cdnr");
            // XLSX.utils.book_append_sheet(workbook, exemp, "exemp");
            // XLSX.utils.book_append_sheet(workbook, hsn, "hsn");
            // XLSX.utils.book_append_sheet(workbook, docs, "docs");
            // XLSX.writeFile(workbook, formattedFileName);
            setPrintClickStates((prev) => {
               return { ...prev, excelLoading: false };
            });
         } catch (error) {
            console.error("Excel Report Download Error:", error);
            setPrintClickStates((prev) => {
               return { ...prev, excelLoading: false };
            });
         }
      }
   };

   return (
      <div className={css.topNavOuter}>
         <div className={css.navTopADiv}>
            <div className={css.leftSideUpperPart}>
               <select defaultValue="This Month" className={css.monthSelectTag}>
                  <option value="All Sale Invoices">All Sale Invoices</option>
                  <option value="This Month">This Month</option>
                  <option value="Last Month">Last Month</option>
                  <option value="This Quarter">This Quarter</option>
                  <option value="This Year">This Year</option>
                  <option value="Custom">Custom</option>
               </select>
               {window.location.pathname !== "/daybookreport" ? (
                  <div className={css.divContainingDateInps}>
                     <h3>Between</h3>
                     <div>
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
                  </div>
               ) : (
                  <div className={css.divContainingDateInps}>
                     <h3>Select The Day</h3>
                     <div>
                        <input
                           type="date"
                           value={endDate}
                           onChange={(e) => setEndDate(e.target.value)}
                        />
                     </div>
                  </div>
               )}
               <select
                  defaultValue="ALL FIRMS"
                  className={css.navFirmsSelectTag}
               >
                  <option value="ALL FIRMS">ALL FIRMS</option>
               </select>
            </div>
            {showPrintOptions && (
               <div className={css.rightSideUpperPart}>
                  {showJson && (
                     <Tooltip label="JSON">
                        <div
                           onClick={ConvertToJSON}
                           className={css.jsonIconDiv}
                        >
                           {printClickStates?.JsonLoading ? (
                              <BasicSpinnerIcon />
                           ) : (
                              <JsonIconOutline />
                           )}
                        </div>
                     </Tooltip>
                  )}
                  <Tooltip label="Excel Report">
                     <div
                        onClick={DownloadExcelReport}
                        className={css.excelIconDiv}
                     >
                        {printClickStates?.excelLoading ? (
                           <BasicSpinnerIcon />
                        ) : (
                           <ExcelIconOutline />
                        )}
                     </div>
                  </Tooltip>
                  <Tooltip label="Print">
                     <div onClick={Print} className={css.printIconDiv}>
                        {printClickStates?.printLoading ? (
                           <BasicSpinnerIcon />
                        ) : (
                           <PrintIconOutline />
                        )}
                     </div>
                  </Tooltip>
               </div>
            )}
         </div>

         {showPaymentData && (
            <div className={css.navTopBDiv}>
               <div
                  className={css.navCalculatedDivs}
                  style={{ background: "var(--SemiTransparentMint)" }}
               >
                  <h2>Paid</h2>
                  <h3>
                     ₹{" "}
                     {/* {(paidAmount - unpaidAmount < 0
                ? 0.0
                : paidAmount - unpaidAmount
              ).toFixed(2)} */}
                     {paidAmount.toFixed()}
                  </h3>
               </div>
               <div className={css.mathmaticalSigns}>+</div>
               <div
                  className={css.navCalculatedDivs}
                  style={{ background: "var(--blueC)" }}
               >
                  <h2>Unpaid</h2>
                  <h3>₹ {unpaidAmount.toFixed(2)}</h3>
               </div>
               <div className={css.mathmaticalSigns}>=</div>
               <div
                  className={css.navCalculatedDivs}
                  style={{ backgroundColor: "var(--GoldenBeige)" }}
               >
                  <h2>Total</h2>
                  <h3>₹ {(paidAmount + unpaidAmount).toFixed(2)}</h3>
               </div>
            </div>
         )}
      </div>
   );
};

export default UpperControlPanel;

// This functions returns month's name by month's number
export const GetMonthName = (monthNumber) => {
   const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
   ];
   return months[parseInt(monthNumber) - 1];
};
