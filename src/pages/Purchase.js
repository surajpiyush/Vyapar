import PurchaseDashboard from "../components/PurchaseDashboard";
import SaleDashboard from "../components/SaleDashboard";
import { getPurchaseReport } from "../Redux/report/action";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Purchase = () => {
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
      "ACTION",
   ];

   const store = useSelector((store) => store.ReportReducer);
   const data = store.purchaseReportData.getPurchase;
   const [startDate, setStartDate] = useState("2023-02-01");
   const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
   );
   // console.log(store);
   const date = {
      startDate: startDate,
      endDate: endDate,
   };
   console.log("date from purchase:", date);
   const dispatch = useDispatch();
   const prevDateRef = useRef(); 

   useEffect(() => {
   
      if (
         prevDateRef.current &&
         prevDateRef.current.startDate === startDate &&
         prevDateRef.current.endDate === endDate
      ) {
         return; 
      }
      const date = {
         startDate: startDate,
         endDate: endDate,
      };
      dispatch(getPurchaseReport({ date }));

     
      prevDateRef.current = { startDate, endDate };
   }, [startDate, endDate, dispatch]);

   return (
      <PurchaseDashboard
         data={data}
         tableHeader={tableHeader}
         btnText="Add Purchase"
         startDate={startDate}
         endDate={endDate}
         setEndDate={setEndDate}
         setStartDate={setStartDate}
      />
   );
};

export default Purchase;
