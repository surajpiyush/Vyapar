import React, { useState } from 'react'
import GSTRHearder from '../components/GSTRHearder';
import GSTRsale from '../components/GSTRsale';

const GSTR2 = () => {

  const [isChecked, setIsChecked] = useState(false);

  const check = () => {
    setIsChecked(!isChecked);
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


  return (
    <div>
        <GSTRHearder isChecked={isChecked} check={check} />
        <div>
            <div>
                <span style={{marginLeft:"10px",marginBottom: "20px",fontWeight:"bold"}}>GSTR2 REPORT</span>
            </div>
            <div>
                <GSTRsale tableHeader1={SaletableHeader1} tableHeader2={SaletableHeader2} data={data}/>
            </div>
        </div>
    </div>
  )
}

export default GSTR2