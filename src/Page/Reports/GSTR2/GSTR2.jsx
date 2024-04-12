import { GetMonthName } from "../../../Component/UpperControlPanel/UpperControlPanel";
import * as XLSX from "xlsx";
import css from "./GSTR2.module.css";
import Loader3 from "../../../Component/Loaders/Loader3";
import ReportUpperControlPanel from "../../../Component/UpperControlPanel/ReportUpperControlPanel";
import { GetPurchaseReport } from "../../../Redux/report/action";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const GSTR2 = () => {
   const dispatch = useDispatch();
   const isLoading = useSelector((store) => store.ReportReducer.isLoading);
   const purchaseReportData = useSelector(
      (store) => store.ReportReducer.saleReportData
   );
   // const purchaseReportData = useSelector(
   //   (store) => store.ReportReducer.purchaseReportData
   // );
   const [nonTaxExempted, setNonTaxExempted] = useState(false);
   const [startDate, setStartDate] = useState("2024-02-01");
   const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
   );

   // fetch gstr2 Data
   useEffect(() => {
      GetPurchaseReport(dispatch, startDate, endDate);
   }, [startDate, endDate]);
   console.log(purchaseReportData);

   // ********************** excel download **********************

   const excelDownload = async () => {
      const data = purchaseReportData;
      console.log("DATA FROM GSTR2", data);
      const startDateParts = startDate.split("-");
      const endDateParts = endDate.split("-");
      const formattedStartDate = `${startDateParts[2]}-${GetMonthName(
         startDateParts[1]
      )}`;
      const formattedEndDate = `${endDateParts[2]}-${GetMonthName(
         endDateParts[1]
      )}`;
      const formattedFileName = `GSTR2_REPORT_DATA_${formattedStartDate}_${formattedEndDate}_09AEIPT7331R1ZJ.xlsx`;
      const filteredHeaders = Object.keys(data[0]).filter(
         (header) => header !== "_id"
      );
      // Filter data for b2b and b2c sheets
      const b2bData = [];
      const exemptData = [];

      data.forEach((row) => {
         const rowData = filteredHeaders.map((header) => row[header]);
         if (row["gstNo"]) {
            b2bData.push(rowData);
         } else if (
            row["taxRate"] == undefined ||
            row["taxRate"] == null ||
            row["taxRate"] == 0
         ) {
            exemptData.push(rowData);
         } 
      });
      // Calculate total number of recipients and total number of invoices
      const uniquePartyNamesB2B = [...new Set(b2bData.map((row) => row[4]))];

      // Fetch Excel file
      const response = await fetch(process.env.PUBLIC_URL + "/GSTR1.xlsx");
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

      const b2b = b2bData.map((row) => [
         row[6], // Assuming index 0 contains gstNo
         row[5], // Assuming index 1 contains partyName
         row[1], // Assuming index 2 contains invoiceNumber
         row[2], // Assuming index 3 contains invoiceDate
         row[9], // Assuming index 4 contains amount
         row[4], // Assuming index 5 contains stateOfSupply
         "", // Empty field
         row[11], // Assuming index 7 contains taxRate
         row[7], // Assuming index 8 contains transactionType
         "", // Empty field
         (row[9] - row[10]).toFixed(2), // Assuming index 11 contains balanceDue
         0, // Default value
         "", // Empty field
      ]);

      const excempt = exemptData.map((row) => [
         row[6], // Assuming index 0 contains gstNo
         row[5], // Assuming index 1 contains partyName
         row[1], // Assuming index 2 contains invoiceNumber
         row[2], // Assuming index 3 contains invoiceDate
         row[9], // Assuming index 4 contains amount
         row[4], // Assuming index 5 contains stateOfSupply
         "", // Empty field
         row[11], // Assuming index 7 contains taxRate
         row[7], // Assuming index 8 contains transactionType
         "", // Empty field
         (row[9] - row[10]).toFixed(2), // Assuming index 11 contains balanceDue
         0, // Default value
         "", // Empty field
      ]);

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
            uniquePartyNamesB2B.length,
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
            b2bData.reduce((acc, row) => acc + (row[11] || 0), 0),
            b2bData.reduce((acc, row) => acc + Number(row[12] || 0), 0),
         ],
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
         ...b2b,
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
         [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "Total Nill Value",
            "Total Css",
            "",
         ],
         ["", "", "", "", "", "", "", "", "", "", "", "", "0", "0", ""],

         [""],
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
         ...excempt,
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

      // Append sheets to the workbook
      XLSX.utils.book_append_sheet(workbook, b2bsheet, "b2b");
      XLSX.utils.book_append_sheet(workbook, cdnr, "cdnr");
      XLSX.utils.book_append_sheet(workbook, exemp, "exemp");
      XLSX.utils.book_append_sheet(workbook, hsn, "hsnsum");

      // Write the workbook to file
      XLSX.writeFile(workbook, formattedFileName);
   };

   return isLoading ? (
      <Loader3 text="Loading GSTR2" />
   ) : (
      <div className={css.Outer}>
         {/* Upper Control Panel */}
         <ReportUpperControlPanel
            title="GSTR2 REPORT"
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            nonTaxExempted={nonTaxExempted}
            setNonTaxExempted={setNonTaxExempted}
            showJson={false}
            data={purchaseReportData}
            excelDownload={excelDownload}
         />

         {/* Content */}
         <div className={css.ContentOuter}>
            <div className={css.contentTableOuterDiv}>
               <table>
                  <thead>
                     <tr className={css.upperTableHeader}>
                        {/* Upper Header */}
                        {[
                           "",
                           "",
                           "Bill Details",
                           "",
                           "",
                           "Rate",
                           "Cess Rate",
                           "Taxable Value",
                           "Reverse Charge",
                           "",
                           "Amount",
                           "",
                           "",
                           "Place of Supply (Name Of State)",
                        ].map((item, ind) => (
                           <th key={item + ind}>
                              <div>{item}</div>
                           </th>
                        ))}
                     </tr>
                     <tr className={css.lowerTableHeader}>
                        {/* Lower Header */}
                        {[
                           "GSTIN/UIN",
                           "Party Name",
                           "No.",
                           "Date",
                           "Value",
                           "",
                           "",
                           "",
                           "",
                           "Integrated Tax",
                           "Central Tax",
                           "State/UT Tax",
                           "Cess",
                           "",
                        ].map((item, ind) => (
                           <th key={item + ind}>
                              <div>{item}</div>
                           </th>
                        ))}
                     </tr>
                  </thead>

                  {purchaseReportData?.length > 0 && (
                     <tbody>
                        {purchaseReportData?.map((item, ind) => (
                           <tr key={ind + item?._id}>
                              <td>
                                 <div>{item?.gstNo || "-"}</div>
                              </td>
                              <td>
                                 <div>{item?.partyName || "-"}</div>
                              </td>
                              <td>
                                 <div>{item?.invoiceNumber || "-"}</div>
                              </td>
                              <td>
                                 <div>
                                    {new Date(
                                       item?.invoiceDate
                                    ).toLocaleDateString("en-GB")}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    ₹{item?.amount || 0}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    {item?.taxRate || " "}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    {item?.cess || 0}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    ₹{item?.amount - item?.taxableValue || 0}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    ₹{item?.reverseCharge || 0}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    ₹{item?.integreatedTax || 0}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    ₹
                                    {Number(item?.taxableValue)
                                       ? (
                                            Number(item?.taxableValue) / 2
                                         ).toFixed(2)
                                       : 0}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    ₹
                                    {Number(item?.taxableValue)
                                       ? (
                                            Number(item?.taxableValue) / 2
                                         ).toFixed(2)
                                       : 0}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    {item?.cess || 0}
                                 </div>
                              </td>
                              <td>
                                 <div>{item?.stateOfSupply}</div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  )}
               </table>

               {purchaseReportData?.length <= 0 && (
                  <div className={css.noDataDiv}>
                     <p>No data is available for GSTR2 Report.</p>
                     <p>Please try again after making relevant changes.</p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default GSTR2;
