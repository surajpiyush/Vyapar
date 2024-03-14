import GSTRsale from "../components/GSTRsale";
import GSTRHearder from "../components/GSTRHearder";
import { getSaleReport } from "../Redux/report/action";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const GSTR1 = () => {
   const [isChecked, setIsChecked] = useState(false);

   const store = useSelector((store) => store.ReportReducer);
   const data = store.saleReportData;
    console.log(data);

   const date = {
      startDate: "2023-01-20",
      endDate: "2025-02-24",
   };

   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getSaleReport({ date }));
   }, []);

   const check = () => {
      setIsChecked(!isChecked);
   };

   const [sale, setSale] = useState(true);
   const [saleReturn, setSaleReturn] = useState(false);

   const saleFun = () => {
      setSale(true);
      setSaleReturn(false);
   };

   const saleReturnFun = () => {
      setSaleReturn(true);
      setSale(false);
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
   const SaleReturntableHeader2 = [
      "GSTIN/UIN",
      "Party Name",
      "Invoice NO.",
      "Invoice Date",
      "Note No.",
      "Note Date",
      "Value",
      "",
      "",
      "",
      "Integrated Tax",
      "Central Tax",
      "State/UT Tax",
      "Cess",
      "",
   ];
   const SaleReturntableHeader1 = [
      "",
      "",
      "",

      "Cr. Note Details",
      "",
      "",
      "",

      "Tax Rate",
      "Cess Rate",

      "Taxable Value",
      "",
      "",

      "Amount",
      "",

      "Place of Supply (Name Of State)",
   ];
console.log("data for GSTR1-",data)
   return (
      <div>
         <GSTRHearder
            isChecked={isChecked}
            check={check}
            data={!sale ? data?.getSale : data?.getSaleReturn}
         />
         <div>
            <div className="gstr-split-container">
               <div onClick={saleFun} className={`${sale ? "active" : ""}`}>
                  <span className="gstr-split-btn">Sale</span>
               </div>
               <div
                  onClick={saleReturnFun}
                  className={`${saleReturn ? "active" : ""}`}
               >
                  <span className="gstr-split-btn">Sale Return</span>
               </div>
            </div>
            <div>
               {sale && data?.getSale && (
                  <GSTRsale
                     tableHeader1={SaletableHeader1}
                     tableHeader2={SaletableHeader2}
                     data={data?.getSale}
                  />
               )}
               {saleReturn && data?.getSaleReturn && (
                  <GSTRsale
                     tableHeader1={SaleReturntableHeader1}
                     tableHeader2={SaleReturntableHeader2}
                     data={data?.getSaleReturn}
                  />
               )}
               {saleReturn && !data?.getSaleReturn && (
                  <h1> There no return data to display</h1>
               )}
            </div>
         </div>
      </div>
   );
};

export default GSTR1;
