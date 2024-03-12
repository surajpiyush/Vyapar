import TableModel from "../components/TableModel";
import ReportSelector from "../components/ReportSelector";
import ReportSearchBar from "../components/ReportSearchBar";
import SaleDashboardHeader from "../components/SaleDashboardHeader";
import { getAllTransections } from "../Redux/report/action";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllTransactions = () => {
  const SelectorType = [
    "All Transaction",
    "Sale",
    "Purchase",
    "Payment-In",
    "Payment-Out",
    "Credit Note",
    "debit Note",
    "Sale Order",
    "Purchase Order",
    "Estimate",
    "Delivery Challan",
    "Expense",
    "Party to Party [Received]",
    "Party to Party [paid]",
    "Manufacturer",
    "Sale FA",
    "Purchase FA",
    "Sale [Cancelled]",
  ];

  const tableHeader = [
    "#",
    "DATE",
    "INVOICE NO.",
    "PARTY NAME",
    "CATEGORY NAME",
    "TYPE",
    "TOTAL",
    "RECIEVED/PAID",
    "BALANCE",
    "DUE DATE",
    "STATUS",
    "PRINT/SHARE",
  ];

  const store = useSelector((store) => store.ReportReducer.allTransectionsData);
  const temp = [];
  const date = {
    startDate: "2023-01-20",
    endDate: "2025-02-24",
  };
  
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTransections({ date }));
  }, [dispatch]);
  console.log(store)
  if(store.length){
    
    const data = store[0];
    temp.push(...data?.PuchaseBill[0]?.PuchaseBill);
    temp.push(...data?.PuchaseReturn[0]?.PuchaseReturn);
    temp.push(...data?.PurchaseOut[0]?.purchaseout);
    temp.push(...data?.purchaseOrder[0]?.purchaseOrder);
    temp.push(...data?.saleDeliverychallans[0]?.saleDeliverychallans);
    temp.push(...data?.PaymentIn[0]?.PaymentIn);
    temp.push(...data?.SaleCash[0]?.SaleCash);
    temp.push(...data?.SaleOrder[0]?.SaleOrder);
    temp.push(...data?.SalereturnCredit[0]?.SalereturnCredit);
    temp.push(...data?.ExpensesWithGst[0]?.ExpensesWithGst);
    temp.push(...data?.ExpensesWithOutGst[0]?.ExpensesWithOutGst);
    // data = temp;
    console.log(temp);
    
  }
  console.log(temp);
  
 // eslint-disable-line react-hooks/exhaustive-deps

  // if (!store) {
  //   return <div>Loading...</div>; // You can replace this with a loading component or message
  // }
  return (
    <>
    
      <SaleDashboardHeader data={temp} />
      <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
        <ReportSelector optionType={SelectorType} />
      </div>
      <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
        <ReportSearchBar />
      </div>
      <div style={{ marginLeft: "20px", marginRight: "20PX" }}>
        <TableModel tableHeader={tableHeader} data={temp} />
      </div>
    </>
  );
};

export default AllTransactions;
