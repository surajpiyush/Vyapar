import React from 'react'
import CraeteModel from '../components/CraeteModel'
import cart from "../img/black-friday.png"
import SaleDashboard from '../components/SaleDashboard';

const Purchase = () => {

  const dataSale = [
    {
      "id": 1,
      "invoiceNo": "001",
      "date": "2024-02-09",
      "partyName": "John Doe",
      "transactionType": "sale",
      "paymentType": "cash",
      "amount" : 1000,
      "balance": 500,
    },
    // Add more transactions here
  ];
  
  const tableHeader = ["DATE", "INVOICE NO.", "PARTY NAME", "TRANSACTION TYPE", "PAYMENT TYPE", "AMOUNT", "BALANCE"]

  return (
    <SaleDashboard data={dataSale} tableHeader={tableHeader} btnText="Add Purchase"/>
  )
}

export default Purchase