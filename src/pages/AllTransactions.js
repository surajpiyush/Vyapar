import React, { useEffect, useState } from "react";
import SaleDashboardHeader from "../components/SaleDashboardHeader";
import ReportSearchBar from "../components/ReportSearchBar";
import ReportSelector from "../components/ReportSelector";
import TableModel from "../components/TableModel";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransections } from "../Redux/report/action";

const AllTransactions = () => {
   const [se, setSe] = useState("");
   const SelectorType = [
      "All Transaction",
      "Sale",
      "Purchase",
      "Payment-In",
      "Payment-Out",
      "Credit Note",
      "debit Note",
      "Sale Order",
      "Purchase Order",
      "Estimate",
      "Delivery Challan",
      "Expense",
      "Party to Party [Received]",
      "Party to Party [paid]",
      "Manufacturer",
      "Sale FA",
      "Purchase FA",
      "Sale [Cancelled]",
   ];

   const dataSale = [
      {
         id: 1,
         invoiceNo: "001",
         date: "2024-02-09",
         partyName: "John Doe",
         transactionType: "sale",
         paymentType: "cash",
         amount: 1000,
         balance: 500,
      },
      // Add more transactions here
   ];

   const tableHeader = [
      "#",
      "DATE",
      "INVOICE NO.",
      "PARTY NAME",
      "CATEGORY NAME",
      "TYPE",
      "TOTAL",
      "RECIEVED/PAID",
      "BALANCE",
      "DUE DATE",
      "STATUS",
      "PRINT/SHARE",
   ];

   const store = useSelector((store) => store.ReportReducer);
   // console.log(data.PuchaseReturn[0]?.PuchaseReturn)
   const temp = [];
   const date = {
      startDate: "2023-01-20",
      endDate: "2025-02-24",
   };

   if (store.allTransectionsData[0]) {
      const data = store?.allTransectionsData[0];
      temp.push(...data?.PuchaseBill[0]?.PuchaseBill);
      temp.push(...data?.PuchaseReturn[0]?.PuchaseReturn);
      temp.push(...data?.PurchaseOut[0]?.purchaseout);
      temp.push(...data?.purchaseOrder[0]?.purchaseOrder);
      temp.push(...data?.saleDeliverychallans[0]?.saleDeliverychallans);
      temp.push(...data?.PaymentIn[0]?.PaymentIn);
      temp.push(...data?.SaleCash[0]?.SaleCash);
      temp.push(...data?.SaleOrder[0]?.SaleOrder);
      temp.push(...data?.SalereturnCredit[0]?.SalereturnCredit);
      temp.push(...data?.ExpensesWithGst[0]?.ExpensesWithGst);
      temp.push(...data?.ExpensesWithOutGst[0]?.ExpensesWithOutGst);
      // data = temp;
      console.log(temp);
   }

   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getAllTransections({ date }));
   }, []);

   return (
      <>
         <SaleDashboardHeader data={temp} />
         <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
            <ReportSelector optionType={SelectorType} setSe={setSe} />
         </div>
         <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
            <ReportSearchBar />
         </div>
         <div style={{ marginLeft: "20px", marginRight: "20PX" }}>
            <TableModel tableHeader={tableHeader} data={temp} />
         </div>
      </>
   );
};

export default AllTransactions;
