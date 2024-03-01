import SaleDashboard from "../components/SaleDashboard";
import { getSaleReport } from "../Redux/report/action";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const tableHeader = [
  "#",
  "INVOICE DATE",
  "INVOICE NO.",
  "PARTY NAME",
  "TRANSACTION TYPE",
  "PAYMENT TYPE",
  "AMOUNT",
  "BALANCE",
  "DUE DATE",
  "STATUS",
  "ACTION",
];
const Sale = () => {
  const store = useSelector((store) => store.ReportReducer);
  const data = store.saleReportData.getSale;
  // console.log(store);
  const date = {
    startDate: "2023-01-20",
    endDate: "2025-02-24",
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSaleReport({ date }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SaleDashboard data={data} tableHeader={tableHeader} btnText="Add Sale" />
  );
};

export default Sale;
