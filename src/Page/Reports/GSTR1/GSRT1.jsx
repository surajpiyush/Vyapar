import * as XLSX from "xlsx";
import css from "./GSTR1.module.css";
import SaleTable from "./SaleTable";
import SaleReturn from "./SaleReturn";
import Loader3 from "../../../Component/Loaders/Loader3";
import ReportUpperControlPanel from "../../../Component/UpperControlPanel/ReportUpperControlPanel";
import { GetSaleReport } from "../../../Redux/report/action";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetMonthName } from "../../../Component/UpperControlPanel/UpperControlPanel";

const GSRT1 = () => {
   const dispatch = useDispatch();
   const [searchParams, setSearchParams] = useSearchParams();
   const isLoading = useSelector((store) => store.ReportReducer.isLoading);
   const saleData = useSelector((store) => store.ReportReducer.saleReportData);
   const saleReturnData = useSelector(
      (store) => store.ReportReducer.saleReturnData
   );
   const [currSection, setCurrSection] = useState(
      searchParams.get("true") || "Sale"
   );
   const [nonTaxExempted, setNonTaxExempted] = useState(false);
   const [startDate, setStartDate] = useState("2024-02-01");
   const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
   );

   //   Report sale/saleReturn Data
   useEffect(() => {
      GetSaleReport(dispatch, startDate, endDate);
   }, [startDate, endDate]);

   useEffect(() => {
      setSearchParams({ true: currSection });
   }, [currSection]);
   //  console.log(saleData);
   // console.log(saleReturnData);

   // ********************** excel download **********************

   const excelDownload = async () => {
      const data = currSection === "Sale" ? saleData : saleReturnData;
      console.log("DATA FROM GSTR1", data);
      const startDateParts = startDate.split("-");
      const endDateParts = endDate.split("-");
      const formattedStartDate = `${startDateParts[2]}-${GetMonthName(
         startDateParts[1]
      )}`;
      const formattedEndDate = `${endDateParts[2]}-${GetMonthName(
         endDateParts[1]
      )}`;
      const formattedFileName = `GSTR1_REPORT_DATA_${formattedStartDate}_${formattedEndDate}_09AEIPT7331R1ZJ.xlsx`;
      const filteredHeaders = Object.keys(data[0]).filter(
         (header) => header !== "_id"
      );
      // Filter data for b2b and b2c sheets
      const b2bData = [];
      const b2cData = [];
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
         } else {
            b2cData.push(rowData);
         }
      });
      // Calculate total number of recipients and total number of invoices
      const uniquePartyNamesB2B = [...new Set(b2bData.map((row) => row[4]))];

      const uniquePartyNamesB2C = [...new Set(b2cData.map((row) => row[4]))];

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
      const b2c = b2cData.map((row) => [
         //Invoice Number	Invoice date	Invoice Value	Place Of Supply	Applicable % of Tax Rate	Rate	Taxable Value	Cess Amount	E-Commerce GSTIN

         row[1], // Assuming index 2 contains invoiceNumber
         row[2], // Assuming index 3 contains invoiceDate
         row[9], // Assuming index 4 contains amount
         row[4], // Assuming index 5 contains stateOfSupply
         "", // Empty field
         row[11], // Assuming index 7 contains taxRate
         (row[9] - row[10]).toFixed(2), // Assuming index 11 contains balanceDue
         row[9], // Assuming index 4 contains amount
         row[6], // Assuming index 0 contains gstNo
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
            uniquePartyNamesB2C.length,
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
            b2cData.reduce((acc, row) => acc + (row[11] || 0), 0),
            b2cData.reduce((acc, row) => acc + Number(row[12] || 0), 0),
         ],
         [""],
         [
            "Invoice Number",
            "Date Of Invoice",
            "Invoice Value",
            "Place of Supply",
            "Applicable % of Tax Rate",
            "Rate",
            "Taxable Value",
            "CESS Amount",
            "GSTIN NUMBER",
         ],
         ...b2c,
      ]);

      const b2cs = XLSX.utils.aoa_to_sheet([
         ["Summary Fro B2CL"],
         ["", "", "", "", "", "", "Total Taxable Value", "Total Css", ""],
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

      const docs = workbookMine.Sheets["docs"];

      // Append sheets to the workbook
      XLSX.utils.book_append_sheet(workbook, b2bsheet, "b2b");
      XLSX.utils.book_append_sheet(workbook, b2CLsheet, "b2cl");
      XLSX.utils.book_append_sheet(workbook, b2cs, "b2cs");
      XLSX.utils.book_append_sheet(workbook, cdnr, "cdnr");
      XLSX.utils.book_append_sheet(workbook, exemp, "exemp");
      XLSX.utils.book_append_sheet(workbook, hsn, "hsn");
      XLSX.utils.book_append_sheet(workbook, docs, "docs");

      // Write the workbook to file
      XLSX.writeFile(workbook, formattedFileName);
   };

   return isLoading ? (
      <Loader3
         text={`Loading ${
            currSection == "Sale" ? "Sales" : "Sale Returns"
         } GSTR1`}
      />
   ) : (
      <div className={css.Outer}>
         {/* Upper Control Panel */}
         <ReportUpperControlPanel
            title="GSTR1 REPORT"
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            nonTaxExempted={nonTaxExempted}
            setNonTaxExempted={setNonTaxExempted}
            showJson={false}
            data={currSection == "Sale" ? saleData : saleReturnData}
            excelDownload={excelDownload}
         />

         {/* Toggle Current Section */}
         <div className={css.navOuter}>
            <div
               className={css.navOptions}
               onClick={() => {
                  setCurrSection("Sale");
               }}
               style={{
                  borderBottom:
                     currSection == "Sale"
                        ? "3px solid var(--blueB)"
                        : "3px double var(--greyG)",
                  color:
                     currSection == "Sale"
                        ? "var(--DeepBluishGrey)"
                        : "var(--greyG)",
               }}
            >
               Sale
            </div>
            <div
               className={css.navOptions}
               onClick={() => {
                  setCurrSection("Sale Return");
               }}
               style={{
                  borderBottom:
                     currSection == "Sale Return"
                        ? "3px solid var(--blueB)"
                        : "3px double var(--greyG)",
                  color:
                     currSection == "Sale Return"
                        ? "var(--DeepBluishGrey)"
                        : "var(--greyG)",
               }}
            >
               Sale Return
            </div>
         </div>

         {/* Table Section */}
         {currSection == "Sale" ? (
            <SaleTable saleData={saleData} />
         ) : (
            <SaleReturn saleReturnData={saleReturnData} />
         )}
      </div>
   );
};

export default GSRT1;
