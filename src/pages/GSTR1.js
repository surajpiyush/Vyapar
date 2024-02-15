import React, { useState } from "react";
import { BsFiletypeJson, BsFiletypeXlsx } from "react-icons/bs";
import { MdOutlinePrint } from "react-icons/md";
import GSTRHearder from "../components/GSTRHearder";
import GSTRsale from "../components/GSTRsale";

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

  const SaletableHeader2 = [
    "GSTIN/UIN",
    "Party Name",
    "Invoice NO.",
    "Date",
    "Value",
    "Integrated Tax",
    "Central Tax",
    "State/UT Tax",
  ];
  const SaletableHeader1 = [
    "Invoice Details",
    "Tax Rate",
    "Cess Rate",
    "Taxable Value",
    "Amount",
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
         {sale && <GSTRsale tableHeader1={SaletableHeader1} tableHeader2={SaletableHeader2} data={data}/>}
         {saleReturn && <GSTRsale tableHeader1={SaleReturntableHeader1} tableHeader2={SaleReturntableHeader2} data={data}/>}
        </div>
      </div>
    </div>
  );
};

export default GSTR1;
