import React, { useState } from 'react'
import SaleDashboardHeader from '../components/SaleDashboardHeader';
import ReportSearchBar from '../components/ReportSearchBar';
import TableModel from '../components/TableModel';

const CashFlow = () => {

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

      // State to keep track of checkbox value
        const [isChecked, setIsChecked] = useState(false);

        // Function to handle checkbox change
        const handleCheckboxChange = (event) => {
            setIsChecked(event.target.checked);
        };


  return (
    <>
         <SaleDashboardHeader/>
         <div className='cashflow-Opening-Cash'>
            <p>Opening Cash-in Hand: ₹{0.00}</p>
            <div>
            <span>
            <input type="checkbox"  checked={isChecked} onChange={handleCheckboxChange}/>
            </span>
            <p>Show zero amount transaction</p>
            </div>
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

export default CashFlow