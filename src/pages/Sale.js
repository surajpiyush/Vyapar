import SaleDashboard from "../components/SaleDashboard";
import { getSaleReport } from "../Redux/report/action";

import { useEffect, useState, useRef } from "react"; // Add useRef
import { useDispatch, useSelector } from "react-redux";

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
const Sale = () => {
   const store = useSelector((store) => store.ReportReducer);
   const data = store.saleReportData.getSale;
   const [startDate, setStartDate] = useState("2024-02-01");
   const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
   );
   console.log(store)
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

      dispatch(getSaleReport({ date }));

      prevDateRef.current = { startDate, endDate };
   }, [startDate, endDate, dispatch]);

   return (
      <SaleDashboard
         data={data}
         setEndDate={setEndDate}
         setStartDate={setStartDate}
         tableHeader={tableHeader}
         startDate={startDate}
         endDate={endDate}
         btnText="Add Sale"
      />
   );
};

export default Sale;
