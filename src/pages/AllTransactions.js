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

   const temp = store?.flatMap((data) => [
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
// console.log(temp)
   temp?.sort((a, b) => new Date(a.date) - new Date(b.date));
   // console.log(store)
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
      "PRINT",
   ];

   return (
      <div style={{ width: "100%" }}>
         <SaleDashboardHeader
            data={temp}
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
         />
         {/* for just only iy has been removed, please active it  */}
         {/* <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
            <ReportSelector optionType={SelectorType} />
         </div> */}
         <div style={{ margin: "20px 0 10px 20px" }}>
            <ReportSearchBar />
         </div>
         <div>
            <TableModel tableHeader={tableHeader} data={temp} />
         </div>
      </div>
   );
};

export default AllTransactions;
