import css from "./ReportUpperControlPanel.module.css";
import { GetMonthName } from "./UpperControlPanel";

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
import ExcelDownloadButton from "../../components/excel/DownloadExcel";

const ReportUpperControlPanel = ({
   title = "Please Provide title",
   startDate = new Date().toISOString().split("T")[0],
   setStartDate = null,
   endDate = new Date().toISOString().split("T")[0],
   setEndDate = null,
   nonTaxExempted = false,
   setNonTaxExempted,
   showJson = true,
   data = [],
   excelDownload = () => {
      alert("You are not allowed to download the excel file ");
   },
}) => {
   const [printClickStates, setPrintClickStates] = useState({
      JsonLoading: false,
      excelLoading: false,
      printLoading: false,
   });
  
console.log(data)
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
         link.download = `${title}.json`;
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
         {/* Upper */}
         <div className={css.navTopADiv}>
            <div className={css.leftSideUpperPart}>
               <select
                  defaultValue="ALL FIRMS"
                  className={css.navFirmsSelectTag}
               >
                  <option value="ALL FIRMS">ALL FIRMS</option>
               </select>
               {["/gstr9report"].includes(window.location.pathname) ? (
                  <div className={css.inpContDiv}>
                     <p>Financial Year</p>
                     <select
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                     >
                        {generateFinancialYearOptions()}
                     </select>
                  </div>
               ) : (
                  <>
                     <div className={css.inpContDiv}>
                        <p>From Month/Year</p>
                        <input
                           type="date"
                           value={startDate}
                           onChange={(e) => setStartDate(e.target.value)}
                        />
                     </div>
                     <div className={css.inpContDiv}>
                        <p>To Month/Year</p>
                        <input
                           type="date"
                           value={endDate}
                           onChange={(e) => setEndDate(e.target.value)}
                        />
                     </div>
                  </>
               )}
            </div>
            {/* Print Options */}
            <div className={css.rightSideUpperPart}>
               {showJson && (
                  <Tooltip label="JSON">
                     <div onClick={ConvertToJSON} className={css.jsonIconDiv}>
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
                    <ExcelDownloadButton/>
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
         </div>
         {/* Lower */}
         <div className={css.navTopBDiv}>
            <p>{title}</p>
            <div className={css.checkBoxInpDiv}>
               <input
                  type="checkbox"
                  checked={nonTaxExempted}
                  onChange={() => setNonTaxExempted((prev) => !prev)}
               />
               <label>CONSIDER NON-TAX AS EXEMPTED</label>
            </div>
         </div>
      </div>
   );
};

export default ReportUpperControlPanel;

const generateFinancialYearOptions = () => {
   const currentYear = new Date().getFullYear();
   const options = [];
   for (let i = 1; i <= 6; i++) {
      const year = currentYear - i;
      options.push(
         <option key={year} value={`${year}-${year + 1}`}>
            {`${year}-${year + 1}`}
         </option>
      );
   }
   return options;
};
