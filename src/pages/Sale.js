import React, { useEffect } from 'react'
import invoice from '../img/invoice.png'
import CraeteModel from '../components/CraeteModel'
import SaleDashboard from '../components/SaleDashboard'
import { useDispatch, useSelector } from 'react-redux';
import { getSaleReport } from '../Redux/report/action';

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


const tableHeader = ["INVOICE DATE", "INVOICE NO.", "PARTY NAME", "TRANSACTION TYPE", "PAYMENT TYPE", "AMOUNT", "BALANCE","DUE DATE","STATUS"]
const Sale = () => {
  // const store = useSelector((store)=>store.ReportReducer)
  // const data = store.saleReportData.getSale
  // console.log(store)   
  // const date = {
  //   startDate: "2023-01-20",
  //   endDate: "2025-02-24",
  // }
  // const dispatch = useDispatch()
  // useEffect(()=>{
  //   dispatch(getSaleReport({date}))
  // },[])

  return (
    <SaleDashboard data={dataSale} tableHeader={tableHeader} btnText="Add Sale" />
  )
}

export default Sale