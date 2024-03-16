import GSTRsale from "../components/GSTRsale";
import GSTRHearder from "../components/GSTRHearder";
import { getPurchaseReport } from "../Redux/report/action";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const GSTR2 = () => {
   const [isChecked, setIsChecked] = useState(false);

   const check = () => {
      setIsChecked(!isChecked);
   };
   const SaletableHeader2 = [
      "GSTIN/UIN",
      "Party Name",
      "Invoice NO.",
      "Date",
      "Value",
      "",
      "",
      "",
      "Integrated Tax",
      "Central Tax",
      "State/UT Tax",
      "",
   ];
   const SaletableHeader1 = [
      "",
      "",
      "Invoice Details",
      "",
      "",
      "Tax Rate",
      "Cess Rate",
      "Taxable Value",
      "",
      "Amount",
      "",
      "Place of Supply (Name Of State)",
   ];

   const store = useSelector((store) => store.ReportReducer);
   const data = store.purchaseReportData;
   // console.log(data);
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
      const date = {
         startDate: startDate,
         endDate: endDate,
      };

      dispatch(getPurchaseReport({ date }));
      prevDateRef.current = { startDate, endDate };
   }, [startDate, endDate, dispatch]);

   return (
      <div>
         <GSTRHearder
            isChecked={isChecked}
            check={check}
            data={data?.getPurchase}
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
         />
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
