import GSTRsale from "../components/GSTRsale";
import GSTRHearder from "../components/GSTRHearder";
import { getPurchaseReport } from "../Redux/report/action";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const GSTR2 = () => {
  const [isChecked, setIsChecked] = useState(false);

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

  const store = useSelector((store) => store.ReportReducer);
  const data = store.purchaseReportData;
  // console.log(data);
  const date = {
    startDate: "2023-01-20",
    endDate: "2025-02-24",
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPurchaseReport({ date }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <GSTRHearder
        isChecked={isChecked}
        check={check}
        data={data?.getPurchase}
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
        <div>
          <GSTRsale
            tableHeader1={SaletableHeader1}
            tableHeader2={SaletableHeader2}
            data={data?.getPurchase}
          />
        </div>
      </div>
    </div>
  );
};

export default GSTR2;
