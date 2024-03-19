import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransections } from "../Redux/report/action";
import SaleDashboardHeader from "../components/SaleDashboardHeader";
import ReportSelector from "../components/ReportSelector";
import ReportSearchBar from "../components/ReportSearchBar";
import TableModel from "../components/TableModel";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";

const AllTransactions = () => {
   const [startDate, setStartDate] = useState("2024-02-01");
   const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
   );
   const prevDateRef = useRef();
   const dispatch = useDispatch();

   useEffect(() => {
      if (
         prevDateRef.current &&
         prevDateRef.current.startDate === startDate &&
         prevDateRef.current.endDate === endDate
      ) {
         return;
      }
      const date = { startDate, endDate };
      dispatch(getAllTransections({ date }));
      prevDateRef.current = { startDate, endDate };
   }, [startDate, endDate, dispatch]);

   const store = useSelector(
      (store) => store.ReportReducer.allTransectionsData
   );
   const temp = store.flatMap((data) => [
      ...data.PuchaseBill[0]?.PuchaseBill,
      ...data.PuchaseReturn[0]?.PuchaseReturn,
      ...data.PurchaseOut[0]?.purchaseout,
      ...data.purchaseOrder[0]?.purchaseOrder,
      ...data.saleDeliverychallans[0]?.saleDeliverychallans,
      ...data.PaymentIn[0]?.PaymentIn,
      ...data.SaleCash[0]?.SaleCash,
      ...data.SaleOrder[0]?.SaleOrder,
      ...data.SalereturnCredit[0]?.SalereturnCredit,
      ...data.ExpensesWithGst[0]?.ExpensesWithGst,
      ...data.ExpensesWithOutGst[0]?.ExpensesWithOutGst,
   ]);

   const SelectorType = [
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

   const tableHeader = [
      "#",
      "DATE",
      "INVOICE NO.",
      "PARTY NAME",
      "CATEGORY NAME",
      "TYPE",
      "TOTAL",
      "RECEIVED/PAID",
      "BALANCE",
      "DUE DATE",
      "STATUS",
      "PRINT/SHARE",
   ];

   return (
      <div style={{ width: "80vw" }}>
         <SaleDashboardHeader
            data={temp}
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
         />
         <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
            <ReportSelector optionType={SelectorType} />
         </div>
         <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
            <ReportSearchBar />
         </div>
         <div
            style={{
               marginLeft: "20px",
               marginRight: "20px",
               width: "80vw",
               background: "red",zIndex:300
            }}
         >
            {store.length > 0 ? (
               <TableModel tableHeader={tableHeader} data={temp} />
            ) : (
               <div style={{ textAlign: "center" }}>
                  {temp.length === 0 ? (
                     <p>No data available.</p>
                  ) : (
                     <BasicSpinner style={{ fontSize: "30px" }} />
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

export default AllTransactions;
