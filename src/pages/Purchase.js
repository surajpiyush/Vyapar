import React, { useEffect } from "react";
import CraeteModel from "../components/CraeteModel";
import cart from "../img/black-friday.png";
import SaleDashboard from "../components/SaleDashboard";
import { getPurchaseReport } from "../Redux/report/action";
import { useDispatch, useSelector } from "react-redux";

const Purchase = () => {
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
      "INVOICE DATE",
      "INVOICE NO.",
      "PARTY NAME",
      "TRANSACTION TYPE",
      "PAYMENT TYPE",
      "AMOUNT",
      "BALANCE",
      "DUE DATE",
      "STATUS",
      "ACTIONS"
   ];

   const store = useSelector((store) => store.ReportReducer);
   const data = store.purchaseReportData.getPurchase;
   // console.log(data);
   const date = {
      startDate: "2023-01-20",
      endDate: "2025-02-24",
   };
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getPurchaseReport({ date }));
   }, []);

   return (
      <SaleDashboard
         data={data}
         tableHeader={tableHeader}
         btnText="Add Purchase"
      />
   );
};

export default Purchase;
