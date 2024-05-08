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
   excelDownload,
   filterOption = [],
   filterOptions = [],
   setFilterOption = () => {},
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
               {window.location.pathname === "/alltransactionreport" && (
                  <select
                     value={filterOption}
                     onChange={(e) => setFilterOption(e.target.value)}
                     className={css.navFirmsSelectTag}
                  >
                     {filterOptions.map((opt, index) => (
                        <option key={index} value={opt}>
                           {opt}
                        </option>
                     ))}
                  </select>
               )}
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
