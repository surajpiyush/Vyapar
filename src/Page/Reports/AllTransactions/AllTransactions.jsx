import * as XLSX from "xlsx";
import css from "./AllTransactions.module.css";
import Loader2 from "../../../Component/Loaders/Loader2";
import Setting from "../../../Component/Setting/Setting";
import Loader3 from "../../../Component/Loaders/Loader3";
import RPLayout1 from "../../../Component/PrintLayouts/RPLayout1";
import RPLayout2 from "../../../Component/PrintLayouts/RPLayout2";
import InvoicePrint from "../../../Component/PrintLayouts/InvoicePrint";
import UpperControlPanel, {
   GetMonthName,
} from "../../../Component/UpperControlPanel/UpperControlPanel";
import { REGULAR_PRINTER_DATA } from "../../../Redux/store";
import { TOGGLE_FALSE_INVOICE_SUCCESS } from "../../../Redux/sales/reducer";
import { FormatDate } from "../../../Redux/sales/action";
import { SearchIcon } from "../../../assets/Icons/ReactIcons";
import { GetAllTransactions } from "../../../Redux/report/action";

import { useToast } from "@chakra-ui/react";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllTransactions = () => {
   const toast = useToast();
   const dispatch = useDispatch();
   let printComponentRef = useRef();
   const [toggleSetting, setToggleSetting] = useState(false);
   const [transactionData, setTransactionData] = useState([]);
   const [startDate, setStartDate] = useState("2024-02-01");
   const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
   );
   const LoadingGetAllTransactions = useSelector(
      (store) => store.ReportReducer.isLoading
   );
   const allTransactionsData = useSelector(
      (store) => store.ReportReducer.allTransactionsData
   );
   const toggleGetAllTransactionsSuccess = useSelector(
      (store) => store.ReportReducer.toggleGetAllTransactionsSuccess
   );
   const loadingSingleInvoice = useSelector(
      (store) => store.SalesReducer.loadingSingleInvoice
   );
   const toggleSingleInvoiceSuccess = useSelector(
      (store) => store.SalesReducer.toggleSingleInvoiceSuccess
   );
   const SingleInvoiceData = useSelector(
      (store) => store.SalesReducer.SingleInvoiceData
   );

   useEffect(() => {
      const extractedData = allTransactionsData?.flatMap((data) => [
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
      setTransactionData(extractedData);
   }, [toggleGetAllTransactionsSuccess]);
   console.log(transactionData);
   // To fetch Invoices data
   useEffect(() => {
      GetAllTransactions(dispatch, startDate, endDate);
   }, [startDate, endDate]);

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

   const filterOptions = [
      "All Transaction",
      "Sale",
      "Purchase",
      "Payment-In",
      "Payment-Out",
      "Credit Note",
      "Debit Note",
      "Sale Order",
      "Purchase Order",
      "Estimate",
      "Delivery Challan",
      "Expense",
      "Party to Party [Received]",
      "Party to Party [Paid]",
      "Manufacturer",
      "Sale FA",
      "Purchase FA",
      "Sale [Cancelled]",
   ];
   return LoadingGetAllTransactions ? (
      <Loader3 text="Loading All Transactions" />
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
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            showPaymentData={false}
            showPrintOptions={false}
            data={transactionData}
            fileName={"All_Transaction_Report"}
         />

         {/* Middle */}
         <div className={css.ContentOuter}>
            <div className={css.contentUpperNav}>
               <div className={css.leftSideDivSaleOuter}>
                  <div className={css.saleOrderSearchDiv}>
                     <SearchIcon />
                     <div>
                        <input type="text" />
                     </div>
                  </div>
               </div>
            </div>

            {/* Table */}
            <div className={css.contentTableOuterDiv}>
               <table>
                  <thead>
                     <tr>
                        {[
                           "#",
                           "DATE",
                           "REF NO.",
                           "PARTY NAME",
                           "TYPE",
                           "TOTAL",
                           "RECEIVED",
                           "BALANCE",
                           // "PRINT/SHARE",
                        ].map((item, ind) => (
                           <th key={item + ind}>
                              <div>{item}</div>
                           </th>
                        ))}
                     </tr>
                  </thead>

                  {!LoadingGetAllTransactions &&
                     transactionData?.length > 0 && (
                        <tbody>
                           {transactionData?.map((item, ind) => (
                              <tr key={ind + item?._id}>
                                 <td>
                                    <div>{ind + 1}</div>
                                 </td>
                                 <td>
                                    <div>{FormatDate(item?.date)}</div>
                                 </td>
                                 <td>
                                    <div>{item?.refNo}</div>
                                 </td>
                                 <td>
                                    <div>{item?.name}</div>
                                 </td>
                                 <td>
                                    <div>{item?.type}</div>
                                 </td>
                                 <td>
                                    <div style={{ textAlign: "right" }}>
                                       ₹{item?.total || 0}
                                    </div>
                                 </td>
                                 <td>
                                    <div style={{ textAlign: "right" }}>
                                       ₹{item?.recived || 0}
                                    </div>
                                 </td>
                                 <td>
                                    <div style={{ textAlign: "right" }}>
                                       ₹{item?.balance || 0}
                                    </div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     )}
               </table>
               {!LoadingGetAllTransactions && transactionData?.length <= 0 && (
                  <div className={css.noDataDiv}>
                     <p>No data is available for All Transactions.</p>
                     <p>Please try again after making relevant changes.</p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default AllTransactions;
