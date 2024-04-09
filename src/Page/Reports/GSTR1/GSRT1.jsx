import css from "./GSTR1.module.css";
import SaleTable from "./SaleTable";
import SaleReturn from "./SaleReturn";
import Loader3 from "../../../Component/Loaders/Loader3";
import ReportUpperControlPanel from "../../../Component/UpperControlPanel/ReportUpperControlPanel";
import { GetSaleReport } from "../../../Redux/report/action";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const GSRT1 = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isLoading = useSelector((store) => store.ReportReducer.isLoading);
  const saleData = useSelector((store) => store.ReportReducer.saleReportData);
  const saleReturnData = useSelector(
    (store) => store.ReportReducer.saleReturnData
  );
  const [currSection, setCurrSection] = useState(
    searchParams.get("true") || "Sale"
  );
  const [nonTaxExempted, setNonTaxExempted] = useState(false);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  //   Report sale/saleReturn Data
  useEffect(() => {
    GetSaleReport(dispatch, startDate, endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    setSearchParams({ true: currSection });
  }, [currSection]);
  console.log(saleData)
console.log(saleReturnData) 
  return isLoading ? (
    <Loader3
      text={`Loading ${currSection == "Sale" ? "Sales" : "Sale Returns"} GSTR1`}
    />
  ) : (
    <div className={css.Outer}>
      {/* Upper Control Panel */}
      <ReportUpperControlPanel
        title="GSTR1 REPORT"
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        nonTaxExempted={nonTaxExempted}
        setNonTaxExempted={setNonTaxExempted}
        showJson={false}
        data={currSection == "Sale" ? saleData : saleReturnData}
      />

      {/* Toggle Current Section */}
      <div className={css.navOuter}>
        <div
          className={css.navOptions}
          onClick={() => {
            setCurrSection("Sale");
          }}
          style={{
            borderBottom:
              currSection == "Sale"
                ? "3px solid var(--blueB)"
                : "3px double var(--greyG)",
            color:
              currSection == "Sale" ? "var(--DeepBluishGrey)" : "var(--greyG)",
          }}
        >
          Sale
        </div>
        <div
          className={css.navOptions}
          onClick={() => {
            setCurrSection("Sale Return");
          }}
          style={{
            borderBottom:
              currSection == "Sale Return"
                ? "3px solid var(--blueB)"
                : "3px double var(--greyG)",
            color:
              currSection == "Sale Return"
                ? "var(--DeepBluishGrey)"
                : "var(--greyG)",
          }}
        >
          Sale Return
        </div>
      </div>

      {/* Table Section */}
      {currSection == "Sale" ? (
        <SaleTable saleData={saleData} />
      ) : (
        <SaleReturn saleReturnData={saleReturnData} />
      )}
    </div>
  );
};

export default GSRT1;
