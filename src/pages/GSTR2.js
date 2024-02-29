import React, { useEffect, useState } from "react";
import GSTRHearder from "../components/GSTRHearder";
import GSTRsale from "../components/GSTRsale";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseReport } from "../Redux/report/action";

const GSTR2 = () => {
   const [isChecked, setIsChecked] = useState(false);

   const check = () => {
      setIsChecked(!isChecked);
   };

   const data1 = [
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
   ];

   const SaletableHeader2 = [
      "GSTIN/UIN",
      "Party Name",
      "Invoice NO.",
      "Date",
      "Value",
   ];
   const SaletableHeader1 = ["Invoice Details"];

   const store = useSelector((store) => store.ReportReducer);
   const data = store.purchaseReportData;
   console.log(store);
   const date = {
      startDate: "2023-01-20",
      endDate: "2025-02-24",
   };

   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getPurchaseReport({ date }));
   }, []);

   return (
      <div>
         <GSTRHearder isChecked={isChecked} check={check} data ={data?.getPurchase} />
         <div>
            <div>
               <span
                  style={{
                     marginLeft: "10px",
                     marginBottom: "20px",
                     fontWeight: "bold",
                  }}
               >
                  GSTR2 REPORT
               </span>
            </div>
            <div>
               <GSTRsale
                  tableHeader1={SaletableHeader1}
                  tableHeader2={SaletableHeader2}
                  data={data?.getPurchase}
               />
            </div>
         </div>
      </div>
   );
};

export default GSTR2;
