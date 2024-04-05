import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSaleReport } from "../Redux/report/action";
import GSTRHearder from "../components/GSTRHearder";
import GSTRsale from "../components/GSTRsale";

const GSTR1 = () => {
  const toggleSalesSuccess = useSelector(
    (state) => state.SalesReducer.toggleSalesSuccess
  );
  const saleReportData = useSelector(
    (store) => store.ReportReducer.saleReportData
  );
  const saleReturnData = useSelector(
    (store) => store.ReportReducer.saleReturnData
  );

  const [sale, setSale] = useState(true);
  const [saleReturn, setSaleReturn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const prevDateRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      prevDateRef.current &&
      prevDateRef.current.startDate === startDate &&
      prevDateRef.current.endDate === endDate
    ) {
      return;
    }
    const date = { startDate, endDate };
    GetSaleReport(dispatch, startDate, endDate);
    // dispatch(GetSaleReport({ date }));
    prevDateRef.current = { startDate, endDate };
  }, [startDate, endDate, toggleSalesSuccess]);

  const saleFun = () => {
    setSale(true);
    setSaleReturn(false);
  };

  const saleReturnFun = () => {
    setSaleReturn(true);
    setSale(false);
  };

  const SaletableHeader2 = [
    "GSTIN/UIN",
    "Party Name",
    "Invoice NO.",
    "Date",
    "Value",
    "",
    "",
    "",
    "Integrated Tax",
    "Central Tax",
    "State/UT Tax",
    "",
  ];
  const SaletableHeader1 = [
    "",
    "",
    "Invoice Details",
    "",
    "",
    "Tax Rate",
    "Cess Rate",
    "Taxable Value",
    "",
    "Amount",
    "",
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
    "",
    "",
    "",
    "Integrated Tax",
    "Central Tax",
    "State/UT Tax",
    "Cess",
    "",
  ];
  const SaleReturntableHeader1 = [
    "",
    "",
    "",
    "Cr. Note Details",
    "",
    "",
    "",
    "Tax Rate",
    "Cess Rate",
    "Taxable Value",
    "",
    "",
    "Amount",
    "",
    "Place of Supply (Name Of State)",
  ];
  // console.log(data.getSale)

  return (
    <div>
      <GSTRHearder
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        data={sale ? saleReportData : saleReturnData}
        startDate={startDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
      />
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
          {sale && saleReportData && (
            <GSTRsale
              tableHeader1={SaletableHeader1}
              tableHeader2={SaletableHeader2}
              data={saleReportData}
              sale={sale}
            />
          )}
          {saleReturn && saleReturnData && (
            <GSTRsale
              tableHeader1={SaleReturntableHeader1}
              tableHeader2={SaleReturntableHeader2}
              data={saleReturnData}
              sale={sale}
            />
          )}
          {saleReturn && !saleReturnData && (
            <h1>There is no return data to display</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default GSTR1;
