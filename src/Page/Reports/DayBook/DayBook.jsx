import * as XLSX from "xlsx";
import css from "./DayBook.module.css";
import Loader2 from "../../../Component/Loaders/Loader2";
import Setting from "../../../Component/Setting/Setting";
import Loader3 from "../../../Component/Loaders/Loader3";
import RPLayout1 from "../../../Component/PrintLayouts/RPLayout1";
import RPLayout2 from "../../../Component/PrintLayouts/RPLayout2";
import InvoicePrint from "../../../Component/PrintLayouts/InvoicePrint";
import AddPurchaseBill from "../../Purchase/PurchaseBill/AddPurchaseBill";
import UpperControlPanel, {
   GetMonthName,
} from "../../../Component/UpperControlPanel/UpperControlPanel";
import { GetAllItems } from "../../../Redux/items/actions";
import { REGULAR_PRINTER_DATA } from "../../../Redux/store";
import { TOGGLE_FALSE_INVOICE_SUCCESS } from "../../../Redux/sales/reducer";
import { FormatDate } from "../../../Redux/sales/action";
import {
   CloseIcon2,
   DeleteIcon2,
   EditIcon,
   PrintIcon2,
   PlusIcon2,
   SearchIcon,
   CalculatorIcon,
   SettingsIconOutline2,
   CrossIcon,
} from "../../../assets/Icons/ReactIcons";
import { GetPurchaseReport, GetDayBooks } from "../../../Redux/report/action";

import { useToast } from "@chakra-ui/react";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DayBook = () => {
   const toast = useToast();
   const dispatch = useDispatch();
   let printComponentRef = useRef();
   const [openForm, setOpenForm] = useState(false);
   const [toggleSetting, setToggleSetting] = useState(false);

   const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
   );
   const [paidAmount, setPaidAmount] = useState(0);
   const [unpaidAmount, setUnpaidAmount] = useState(0);
   const toggleAddPurchaseBill = useSelector(
      (store) => store.PurchaseReducer.toggleAddPurchaseBill
   );
   const LoadingGetDayBooks = useSelector(
      (store) => store.ReportReducer.isLoading
   );
   const dayBookDataReducer = useSelector(
      (store) => store.ReportReducer.dayBookData
   );
   const toggleGetDayBooksSuccess = useSelector(
      (store) => store.ReportReducer.toggleGetDayBooksSuccess
   );
   const toggleItems = useSelector((store) => store.ItemReducer.toggleItems);
   const loadingSingleInvoice = useSelector(
      (store) => store.SalesReducer.loadingSingleInvoice
   );
   const toggleSingleInvoiceSuccess = useSelector(
      (store) => store.SalesReducer.toggleSingleInvoiceSuccess
   );
   const SingleInvoiceData = useSelector(
      (store) => store.SalesReducer.SingleInvoiceData
   );
   const [dayBooksData, setDayBooksData] = useState([]);

   useEffect(() => {
      const extractedData = dayBookDataReducer?.flatMap((data) => [
         ...(Array.isArray(data?.PuchaseBill[0]?.PuchaseBill)
            ? data.PuchaseBill[0].PuchaseBill
            : []),
         ...(Array.isArray(data?.PuchaseReturn[0]?.PuchaseReturn)
            ? data.PuchaseReturn[0].PuchaseReturn
            : []),
         ...(Array.isArray(data?.PurchaseOut[0]?.purchaseout)
            ? data.PurchaseOut[0].purchaseout
            : []),
         ...(Array.isArray(data?.purchaseOrder[0]?.purchaseOrder)
            ? data.purchaseOrder[0].purchaseOrder
            : []),
         ...(Array.isArray(data?.saleDeliverychallans[0]?.saleDeliverychallans)
            ? data.saleDeliverychallans[0].saleDeliverychallans
            : []),
         ...(Array.isArray(data?.PaymentIn[0]?.PaymentIn)
            ? data.PaymentIn[0].PaymentIn
            : []),
         ...(Array.isArray(data?.SaleCash[0]?.SaleCash)
            ? data.SaleCash[0].SaleCash
            : []),
         ...(Array.isArray(data?.SaleOrder[0]?.SaleOrder)
            ? data.SaleOrder[0].SaleOrder
            : []),
         ...(Array.isArray(data?.SalereturnCredit[0]?.SalereturnCredit)
            ? data.SalereturnCredit[0].SalereturnCredit
            : []),
         ...(Array.isArray(data?.ExpensesWithGst[0]?.ExpensesWithGst)
            ? data.ExpensesWithGst[0].ExpensesWithGst
            : []),
         ...(Array.isArray(data?.ExpensesWithOutGst[0]?.ExpensesWithOutGst)
            ? data.ExpensesWithOutGst[0].ExpensesWithOutGst
            : []),
      ]);
      extractedData?.sort((a, b) => new Date(a.date) - new Date(b.date));
      setDayBooksData(extractedData);
   }, [toggleGetDayBooksSuccess]);

   // To fetch Invoices data
   useEffect(() => {
      GetDayBooks(dispatch, endDate);
   }, [endDate]);

   const formOpen = () => {
      setOpenForm(true);
   };

   // ***************** Download Excel For ********************************
   const excelDownload = async () => {
      const endDateParts = endDate.split("-");

      const formattedendDate = `${endDateParts[2]}-${GetMonthName(
         endDateParts[1]
      )}`;

      const formattedFileName = `DayBook_Report_Data_${formattedendDate}_09AEIPT7331R1ZJ.xlsx`;

      const workbook = XLSX.utils.book_new();

      // Current date and time
      const currentDate = new Date();
      const formattedCurrentDateTime = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
      const currentDateRow = ["Report generated on:", formattedCurrentDateTime];

      const dayBooksDataData = dayBooksData.map((item) => [
         // Name	Ref No	Type	Total	Money In	Money Out	Description
         item?.name,
         item?.refNo,
         item?.type,
         item?.total,
         item?.moneyIn,
         item?.moneyOut,
         item?.description,
      ]);

      const tableData2 = dayBooksData.map((item) => [
         item?.invoiceDate, // Date
         item?.invoiceNumber, // Invoice No./Txn No.
         item?.partyName, // Party Name
         item.itemName, // Item Name
         item.itemCode, // Item Code
         "", // HSN/SAC (add your value here)
         item.category, // Category
         "", // MRP (add your value here)
         "", // Batch No. (add your value here)
         "", // Exp. Date (add your value here)
         "", // Mfg. Date (add your value here)
         "", // Model No. (add your value here)
         "", // Count (add your value here)
         item.description, // Description
         "", // Size (add your value here)
         "", // Quantity (add your value here)
         "", // Unit (add your value here)
         "", // UnitPrice (add your value here)
         "", // Discount Percent (add your value here)
         "", // Discount (add your value here)
         "", // Tax Percent (add your value here)
         "", // Tax (add your value here)
         "", // Cess (add your value here)
         item?.transactionType, // Transaction Type
         "", // Amount (add your value here)
      ]);

      // Calculate totals
      const totalRow = dayBooksDataData.reduce(
         (acc, curr) => {
            acc[3] += Number(curr[3]); // Total Amount
            acc[4] += Number(curr[4]);
            acc[5] += Number(curr[5]);
            return acc;
         },
         [, "Total", "", "", 0, "", 0, 0, "", "", ""]
      );

      const worksheet = XLSX.utils.aoa_to_sheet([
         [...currentDateRow],
         [""],
         [
            "Name",
            "Ref No.",
            "Type",
            "Total",
            "Money In",
            "Money Out",
            "Description",
         ],
         ...dayBooksDataData,
         [], // Empty row
         ["", "", "", "", "", "", "", "", "", "", "", "", ""], // Empty row for totals
      ]);
      const worksheet2 = XLSX.utils.aoa_to_sheet([
         [...currentDateRow],
         [""],
         [
            "Date",
            "Invoice No./Txn No.",
            "Party Name",
            "Item Name",
            "Item Code",
            "HSN/SAC",
            "Category",
            "MRP",
            "Batch No.",
            "Exp. Date",
            "Mfg. Date",
            "Model No.",
            "Count",
            "Description",
            "Size",
            "Quantity",
            "Unit",
            "UnitPrice",
            "Discount Percent",
            "Discount",
            "Tax Percent",
            "Tax",
            "Cess",
            "Transaction Type",
            "Amount",
         ],
         ...tableData2,
         [], // Empty row
         ["", "", "", "", "", "", "", "", "", "", "", "", ""], // Empty row for totals
         ["Total:"], // Label for total row
      ]);

      // Calculate totals for the second sheet
      const totalRow2 = tableData2.reduce(
         (acc, curr) => {
            // Add your logic to calculate totals for the second sheet here
            return acc;
         }
         //  [, , , "Total", "", "", 0, "", 0, 0, "", "", ""]
      );

      // Append total rows to each worksheet
      XLSX.utils.sheet_add_aoa(worksheet, [totalRow], { origin: -1 });
      XLSX.utils.sheet_add_aoa(worksheet2, [totalRow2], { origin: -1 });

      XLSX.utils.book_append_sheet(workbook, worksheet, "Day Book Report");
      XLSX.utils.book_append_sheet(workbook, worksheet2, "Item Details");
      XLSX.writeFile(workbook, formattedFileName);
   };

   // ***************************** Print ************************************
   const handlePrint = useReactToPrint({
      content: () => printComponentRef.current,
      onBeforePrint: () => dispatch(TOGGLE_FALSE_INVOICE_SUCCESS()),
   });
   const updateSalePrintSettings = useSelector(
      (store) => store.PurchaseReducer.updateSalePrintSettings
   );
   const [storedPrintData, setStoredPrintData] = useState(
      JSON.parse(sessionStorage.getItem(REGULAR_PRINTER_DATA)) || {}
   );
   // for updating printer settings
   useEffect(() => {
      const sessionStorageData =
         JSON.parse(sessionStorage.getItem(REGULAR_PRINTER_DATA)) || {};
      setStoredPrintData((prev) => {
         return { ...prev, ...sessionStorageData };
      });
   }, [updateSalePrintSettings]);
   // for updating print item details
   useEffect(() => {
      if (toggleSingleInvoiceSuccess == true) {
         handlePrint();
      }
   }, [toggleSingleInvoiceSuccess]);
   // *********************************************************************************

   console.log(dayBooksData);

   return LoadingGetDayBooks ? (
      <Loader3 text="Loading Day books" />
   ) : (
      <div className={css.Outer}>
         {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

         {/* Print */}
         {loadingSingleInvoice ? (
            <Loader2 />
         ) : (
            <div
               style={{
                  display: "none",
               }}
            >
               <div ref={printComponentRef}>
                  {storedPrintData?.layoutIndex == 0 ? (
                     <InvoicePrint currPrintItem={SingleInvoiceData} />
                  ) : storedPrintData?.layoutIndex == 1 ? (
                     <RPLayout2 currPrintItem={SingleInvoiceData} />
                  ) : (
                     <RPLayout1 currPrintItem={SingleInvoiceData} />
                  )}
               </div>
            </div>
         )}

         {/* Top Nav */}
         <UpperControlPanel
            startDate={endDate}
            endDate={endDate}
            setStartDate={setEndDate}
            setEndDate={setEndDate}
            showPaymentData={false}
            showPrintOptions={true}
            data={dayBooksData}
            fileName={"Day_Book_Report"}
            excelDownload={excelDownload}
         />

         {/* Middle */}
         <div className={css.ContentOuter}>
            <div className={css.contentUpperNav}>
               <div className={css.leftSideDivSaleOuter}>
                  {/* <p>TRANSACTIONS</p> */}
                  <div className={css.saleOrderSearchDiv}>
                     <SearchIcon />
                     <div>
                        <input type="text" />
                     </div>
                  </div>
               </div>
               {/* <div>
            <button type="button" onClick={formOpen} className={css.addBtnCss}>
              <PlusIcon2 /> Add Purchase
            </button>
          </div> */}
            </div>

            {/* Table */}
            <div className={css.contentTableOuterDiv}>
               <table>
                  <thead>
                     <tr>
                        {[
                           // "#",
                           "NAME",
                           "REF NO.",
                           "TYPE",
                           "TOTAL",
                           "MONEY IN",
                           "MONEY OUT",
                           // "PRINT/SHARE",
                           // "DUE DATE",
                           // "STATUS",
                           // "ACTION",
                        ].map((item, ind) => (
                           <th key={item + ind}>
                              <div>{item}</div>
                           </th>
                        ))}
                     </tr>
                  </thead>

                  {!LoadingGetDayBooks && dayBooksData?.length > 0 && (
                     <tbody>
                        {dayBooksData?.map((item, ind) => (
                           <tr key={ind + item?._id}>
                              <td>
                                 <div>{item?.name}</div>
                              </td>
                              <td>
                                 <div>{item?.refNo}</div>
                              </td>
                              <td>
                                 <div>{item?.type}</div>
                              </td>
                              <td>
                                 <div>{item?.total}</div>
                              </td>

                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    ₹{item?.moneyIn || 0}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    ₹{item?.moneyOut || 0}
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  )}
               </table>
               {!LoadingGetDayBooks && dayBooksData?.length <= 0 && (
                  <div className={css.noDataDiv}>
                     <p>No transactions to show</p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default DayBook;
