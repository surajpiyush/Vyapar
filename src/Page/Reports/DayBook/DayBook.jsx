import css from "./DayBook.module.css";
import Loader2 from "../../../Component/Loaders/Loader2";
import Setting from "../../../Component/Setting/Setting";
import Loader3 from "../../../Component/Loaders/Loader3";
import RPLayout1 from "../../../Component/PrintLayouts/RPLayout1";
import RPLayout2 from "../../../Component/PrintLayouts/RPLayout2";
import InvoicePrint from "../../../Component/PrintLayouts/InvoicePrint";
import AddPurchaseBill from "../../Purchase/PurchaseBill/AddPurchaseBill";
import UpperControlPanel from "../../../Component/UpperControlPanel/UpperControlPanel";
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
   const [startDate, setStartDate] = useState(
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
      GetDayBooks(dispatch, startDate);
   }, [startDate]);

   const formOpen = () => {
      setOpenForm(true);
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
            startDate={startDate}
            endDate={startDate}
            setStartDate={setStartDate}
            setEndDate={setStartDate}
            showPaymentData={false}
            showPrintOptions={true}
            data={dayBooksData}
            fileName={"Day_Book_Report"}
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
