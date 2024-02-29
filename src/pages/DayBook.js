import React, { useEffect } from "react";
import ReportSelector from "../components/ReportSelector";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdOutlinePrint } from "react-icons/md";
import ReportSearchBar from "../components/ReportSearchBar";
import TableModel from "../components/TableModel";
import { useDispatch, useSelector } from "react-redux";
import { getDayBookReport } from "../Redux/report/action";

const DayBook = () => {
  const optionType = ["All FIRMS", "MY COMPANY"];

  const dataSale = [
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
    // Add more transactions here
  ];

  const tableHeader = [
    "DATE",
    "INVOICE NO.",
    "PARTY NAME",
    "TRANSACTION TYPE",
    "PAYMENT TYPE",
    "AMOUNT",
    "BALANCE",
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
  //   dispatch(getDayBookReport({date}))
  // },[])



  return (
    <>
      <div className="sale-dashboard-header">
        <div className="sale-dashboard-menu">
          <div className="date-filter-div">
            <p>Date</p>
            <input type="date" />
          </div>
          <select className="sale-dashboard-select">
            <option value="">All Firm</option>
            <option value="">Company</option>
          </select>
        </div>
        <div className="sale-dashboard-icons">
          <div className="sale-dashboard-icon">
            <SiMicrosoftexcel />
            <p>Excel</p>
          </div>
          <div className="sale-dashboard-icon">
            <MdOutlinePrint />
            <p>Print</p>
          </div>
        </div>
      </div>

      <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
        <ReportSearchBar />
      </div>
      <div style={{ marginLeft: "20px" }}>
        <TableModel tableHeader={tableHeader} data={dataSale} />
      </div>
    </>
  );
};

export default DayBook;
