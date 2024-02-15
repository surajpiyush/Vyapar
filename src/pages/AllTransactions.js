import React from 'react'
import SaleDashboardHeader from '../components/SaleDashboardHeader'
import ReportSearchBar from '../components/ReportSearchBar'
import ReportSelector from '../components/ReportSelector'
import TableModel from '../components/TableModel'

const AllTransactions = () => {

 const SelectorType = ['All Transaction','Sale','Purchase','Payment-In','Payment-Out','Credit Note','debit Note','Sale Order','Purchase Order','Estimate','Delivery Challan','Expense','Party to Party [Received]','Party to Party [paid]','Manufacturer','Sale FA','Purchase FA','Sale [Cancelled]']

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
    <>
        <SaleDashboardHeader/>
        <div style={{marginLeft:"20px",marginBottom:"20px"}}>
        <ReportSelector optionType={SelectorType}/>
        </div>
        <div style={{marginLeft:"20px",marginBottom:"20px"}}>
        <ReportSearchBar/>
        </div>
        <div style={{marginLeft:"20px",marginRight: "20PX"}}>
            <TableModel tableHeader={tableHeader} data={dataSale} />
        </div>

    </>
  )
}

export default AllTransactions