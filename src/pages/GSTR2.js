import GSTRsale from "../components/GSTRsale";
import GSTRHearder from "../components/GSTRHearder";
import { GetPurchaseReport } from "../Redux/report/action";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader3 from "../Component/Loaders/Loader3";

const GSTR2 = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  const check = () => {
    setIsChecked(!isChecked);
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

  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.ReportReducer.isLoading);
  const purchaseReportData = useSelector(
    (store) => store.ReportReducer.purchaseReportData
  );

  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    GetPurchaseReport(dispatch, startDate, endDate);
  }, [startDate, endDate, dispatch]);

  return isLoading ? (
    <Loader3 text="Loading GSTR2" />
  ) : (
    <div>
      <GSTRHearder
        isChecked={isChecked}
        check={check}
        data={purchaseReportData}
        startDate={startDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
      />
      <div>
        <div>
          <span
            style={{
              marginLeft: "10px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            GSTR2 REPORT
          </span>
        </div>
        {purchaseReportData.length > 0 ? (
          <GSTRsale
            tableHeader1={SaletableHeader1}
            tableHeader2={SaletableHeader2}
            data={purchaseReportData}
            sale={true}
          />
        ) : (
          <div>No data available</div>
        )}
      </div>
    </div>
  );
};

export default GSTR2;
