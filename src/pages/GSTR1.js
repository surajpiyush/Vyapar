import React, { useEffect, useState } from "react";
import { BsFiletypeJson, BsFiletypeXlsx } from "react-icons/bs";
import { MdOutlinePrint } from "react-icons/md";
import GSTRHearder from "../components/GSTRHearder";
import GSTRsale from "../components/GSTRsale";
import { useDispatch, useSelector } from "react-redux";
import { getSaleReport } from "../Redux/report/action";

const GSTR1 = () => {
  const [isChecked, setIsChecked] = useState(false);

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
    // "Integrated Tax",
    // "Central Tax",
    // "State/UT Tax",
  ];
  const SaletableHeader1 = [
    "Invoice Details",
    
  ];

  const SaleReturntableHeader2 = [
    "GSTIN/UIN",
    "Party Name",
    "Invoice NO.",
    "Invoice Date",
    "Note No.",
    "Note Date",
    "Value",
    "Integrated Tax",
    "Central Tax",
    "State/UT Tax",
    "Cess"
  ];
  const SaleReturntableHeader1 = [
    "Cr. Note Details",
    "Tax Rate",
    "Cess Rate",
    "Taxable Value",
    "Amount",
    "Place of Supply (Name Of State)",
  ];


  const data = [
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

  // const store = useSelector((store)=>store.ReportReducer)
  // const data = store.saleReportData
  // // console.log(data)   
  // const date = {
  //   startDate: "2023-01-20",
  //   endDate: "2025-02-24",
  // }

  // const dispatch = useDispatch()
  // useEffect(()=>{
  //   dispatch(getSaleReport({date}))
  // },[])


  return (
    <div>
      <GSTRHearder isChecked={isChecked} check={check} />
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
         {sale && <GSTRsale tableHeader1={SaletableHeader1} tableHeader2={SaletableHeader2} data={data?.getSale}/>}
         {saleReturn && <GSTRsale tableHeader1={SaleReturntableHeader1} tableHeader2={SaleReturntableHeader2} data={data?.getSaleReturn}/>}
        </div>
      </div>
    </div>
  );
};

export default GSTR1;
