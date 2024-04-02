import css from "../Component/Sidebar/Sidebar.module.css";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { BsFiletypeJson, BsFiletypeXlsx } from "react-icons/bs";
import { MdOutlinePrint } from "react-icons/md";
import { useToast } from "@chakra-ui/react";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";

const GSTRHeader = ({
   isChecked,
   check,
   data,
   startDate: propStartDate,
   endDate: propEndDate,
   setStartDate: propSetStartDate,
   setEndDate: propSetEndDate,
}) => {
   const tableData = data;
   const [startDate, setStartDate] = useState(propStartDate || '');
   const [endDate, setEndDate] = useState(propEndDate || '');
   
   const toast = useToast();
   const [loading, setLoading] = useState(false);
   const getMonthName = (monthNumber) => {
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
   const startDateParts = startDate.split("-");
   const endDateParts = endDate.split("-");
   const formattedStartDate = `${startDateParts[2]}-${getMonthName(
      startDateParts[1]
   )}`;
   const formattedEndDate = `${endDateParts[2]}-${getMonthName(
      endDateParts[1]
   )}`;

   // PRINT WALA PART
   const hideElementDuringPrint = () => {
      const sideBarOuter = document.querySelector(`.${css.sideBarOuter}`);
      const elementsToHide = document.querySelectorAll(
         ".sale-dashboard-header > *"
      );
      elementsToHide.forEach((element) => {
         element.style.display = "none";
      });
      if (sideBarOuter) {
         sideBarOuter.style.display = "none";
      }
   };

   const showElementAfterPrint = () => {
      const sideBarOuter = document.querySelector(`.${css.sideBarOuter}`);
      const elementsToHide = document.querySelectorAll(
         ".sale-dashboard-header > *"
      );
      elementsToHide.forEach((element) => {
         element.style.display = "";
      });
      if (sideBarOuter) {
         sideBarOuter.style.display = "";
      }
   };
   //==
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
            hideElementDuringPrint();

            // Trigger browser's print dialog
            window.print();

            showElementAfterPrint();
            break;

         case "GSTR1":
            try {
               setLoading(true);
               const formattedFileName = `GSTR1_${formattedStartDate}_${formattedEndDate}_09AEIPT7331R1ZJ.xlsx`;
               const filteredHeaders = Object.keys(tableData[0]).filter(
                  (header) => header !== "_id"
               );
               // Filter taxable and tax-free data
               const taxableData = tableData.filter(
                  (row) =>
                     row["taxableValue"] !== null && row["taxableValue"] > 0
               );
               const taxFreeData = tableData.filter(
                  (row) =>
                     row["taxableValue"] === null || row["taxableValue"] === 0
               );

               // for b2b
               // Construct data array with filtered taxable data
               const filteredTaxableData = taxableData.map((row) =>
                  filteredHeaders.map((header) => row[header])
               );

               // Calculate total number of recipients and total number of invoices
               const uniquePartyNamesTax = [
                  ...new Set(taxableData.map((row) => row.partyName)),
               ];

               const totalRecipientsTax = uniquePartyNamesTax.length;
               const totalInvoicesTax = filteredTaxableData.length;

               // Calculate total taxable value and total cess
               const totalTaxableValue = filteredTaxableData.reduce(
                  (acc, row) => acc + (row.taxableValue || 0),
                  0
               );
               const totalCess = filteredTaxableData.reduce(
                  (acc, row) => acc + (row.cess || 0),
                  0
               );

               // for b2cl
               // Construct data array with filtered tax-free data for b2CLsheet
               const filteredTaxFreeData = taxFreeData.map((row) =>
                  filteredHeaders.map((header) => row[header])
               );

               // Calculate total number of recipients and total number of invoices
               const uniquePartyNamesTaxFree = [
                  ...new Set(taxFreeData.map((row) => row.partyName)),
               ];

               const totalRecipientsTaxFree = uniquePartyNamesTaxFree.length;
               const totalInvoicesTaxFree = filteredTaxFreeData.length;

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
                  [
                     totalRecipientsTax,
                     "",
                     totalInvoicesTax,
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     totalTaxableValue,
                     totalCess,
                  ],
                  [],
                  [
                     "Status",
                     "Invoice Number",
                     "Date Of Invoice",
                     "State of Supply",
                     "Supplier",
                     "GSTIN NUMBER",
                     "Type of Transection",
                     "Mode of Payment",
                     "Total Amount",
                     "Total Balance",
                     "Rate of GST",
                     "Taxable Amount",
                     "CESS",
                  ],
                  ...filteredTaxableData,
               ]);

               const b2CLsheet = XLSX.utils.aoa_to_sheet([
                  ["Summary Fro B2CL"],
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
                     totalRecipientsTaxFree,
                     "",
                     totalInvoicesTaxFree,

                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     0,
                     0,
                  ],
                  [""],
                  [
                     "Status",
                     "Invoice Number",
                     "Date Of Invoice",
                     "State of Supply",
                     "Supplier",
                     "GSTIN NUMBER",
                     "Type of Transection",
                     "Mode of Payment",
                     "Total Amount",
                     "Total Balance",
                     "Rate of GST",
                     "Taxable Amount",
                     "CESS",
                  ],

                  ...filteredTaxFreeData,
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

               XLSX.utils.book_append_sheet(workbook, b2bsheet, "b2b");
               XLSX.utils.book_append_sheet(workbook, b2CLsheet, "b2cl");
               XLSX.utils.book_append_sheet(workbook, b2cs, "b2cs");
               XLSX.utils.book_append_sheet(workbook, cdnr, "cdnr");
               XLSX.utils.book_append_sheet(workbook, exemp, "exemp");
               XLSX.utils.book_append_sheet(workbook, hsn, "hsn");
               XLSX.utils.book_append_sheet(workbook, docs, "docs");

               XLSX.writeFile(workbook, formattedFileName);

               setLoading(false);
            } catch (error) {
               console.error("Error:", error);
               setLoading(false);
            }
            break;

         case "GSTR2":
            try {
               setLoading(true);
               const formattedFileName = `GSTR2_${formattedStartDate}-${formattedEndDate}_09AEIPT7331R1ZJ.xlsx`;
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
                  ["Summary Of Supplies From Registered Suppliers B2B(3)"],
                  [""],
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
                     "Total Taxable Value",
                     "Total Cess",
                  ],
                  [tableData.length, "", tableData.length],
                  [],
                  [
                     "STATUS",
                     "Invoice Number",
                     "Invoice date",
                     "PAYMENT TYPE",
                     "Place Of Supply",
                     "Receiver Name",
                     "GSTIN/UIN of Recipient",
                     "Invoice Type",
                     "Invoice Value",
                     "Remaining Amount",
                     "Rate",
                     "Taxable Value",
                     "Cess Amount",

                     "Reverse Charge",
                     "Applicable % of Tax Rate",
                     // "E-Commerce GSTIN",
                  ],

                  ...filteredData,
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
                     "Cess Amount",
                  ][""],
               ]);

               XLSX.utils.book_append_sheet(workbook, b2bsheet, "b2b");
               XLSX.utils.book_append_sheet(workbook, cdnr, "cdnr");
               XLSX.utils.book_append_sheet(workbook, exemp, "exemp");
               XLSX.utils.book_append_sheet(workbook, hsn, "hsnsum");

               XLSX.writeFile(workbook, formattedFileName);

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
               onClick={() => {
                  if (window.location.pathname === "/gstr1report") {
                     saveTableData("GSTR1");
                  } else if (window.location.pathname === "/gstr2report") {
                     saveTableData("GSTR2");
                  } else {
                     toast({
                        title: "Feature currently in development",
                        status: "info",
                        position: "top",
                     });
                  }
               }}
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
