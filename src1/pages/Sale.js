import React from 'react'
import invoice from '../img/invoice.png'
import CraeteModel from '../components/CraeteModel'
import SaleDashboard from '../components/SaleDashboard'

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

const Sale = () => {
  return (
    <SaleDashboard data={dataSale} tableHeader={tableHeader} btnText="Add Sale" />
  )
}

export default Sale