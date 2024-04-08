import css from "./SaleHSN.module.css";
import Loader3 from "../../../Component/Loaders/Loader3";
import {
  GetAllTransactions,
  GetSaleReport,
} from "../../../Redux/report/action";

import { useToast } from "@chakra-ui/react";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_FALSE_INVOICE_SUCCESS } from "../../../Redux/sales/reducer";
import { REGULAR_PRINTER_DATA } from "../../../Redux/store";
import { FormatDate } from "../../../Redux/sales/action";
import UpperControlPanel from "../../../Component/UpperControlPanel/UpperControlPanel";
import { SearchIcon } from "../../../assets/Icons/ReactIcons";

const SaleHSN = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const loadingSaleHSN = useSelector((store) => store.ReportReducer.isLoading);
  const totalSaleTax = useSelector((store) => store.ReportReducer.totalSaleTax);
  const totalSaleTaxReturn = useSelector(
    (state) => state.ReportReducer.totalSaleTaxReturn
  );
  const toggleGetSaleReportSuccess = useSelector(
    (store) => store.ReportReducer.toggleGetSaleReportSuccess
  );
  const toggleSalesSuccess = useSelector(
    (state) => state.SalesReducer.toggleSalesSuccess
  );
  const saleReturnArr = useSelector(
    (state) => state.ReportReducer.saleReportData
  );
  const saleInvoiceArr = useSelector(
    (state) => state.ReportReducer.saleReturnData
  );

  // To fetch Invoices data
  useEffect(() => {
    GetSaleReport(dispatch, startDate, endDate);
  }, [toggleSalesSuccess, startDate, endDate]);

  // for fetching the array data after getting a successfull response
  useEffect(() => {
    setData([...saleReturnArr, ...saleInvoiceArr]);
  }, [toggleGetSaleReportSuccess]);

  // Half tax calculator
  function GetHalfTaxValue(taxPercent) {
    const numericValue = parseFloat(taxPercent) / 2;
    if (Number.isInteger(numericValue)) {
      return numericValue.toFixed(0); // Return as a whole number
    } else {
      return numericValue.toFixed(2); // Return as a decimal with maximum two decimal places
    }
  }

  return loadingSaleHSN ? (
    <Loader3 text="Loading Sale HSN Report" />
  ) : (
    <div className={css.Outer}>
      {/* Top Nav */}
      <UpperControlPanel
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        showPaymentData={false}
        showPrintOptions={true}
        showJson={false}
        data={data}
      />

      {/* Middle */}
      <div className={css.ContentOuter}>
        <div className={css.contentUpperNav}>
          <div className={css.leftSideDivSaleOuter}>
            <div className={css.saleOrderSearchDiv}>
              <SearchIcon />
              <div>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className={css.contentTableOuterDiv}>
          <table>
            <thead>
              <tr>
                {[
                  "#",
                  "HSN",
                  "TOTAL VALUE",
                  "TAXABLE VALUE",
                  "IGST AMOUNT",
                  "CGST AMOUNT",
                  "SGST AMOUNT",
                  "ADD. CESS",
                ].map((item, ind) => (
                  <th key={item + ind}>
                    <div>{item}</div>
                  </th>
                ))}
              </tr>
            </thead>

            {!loadingSaleHSN && data?.length > 0 && (
              <tbody>
                {data?.map((item, ind) => (
                  <tr key={ind + item?._id}>
                    <td>
                      <div>{ind + 1}</div>
                    </td>
                    <td>
                      <div>{item?.hsn || "-"}</div>
                    </td>
                    <td>
                      <div style={{ textAlign: "right" }}>
                        ₹{item?.amount || item?.total || 0}
                      </div>
                    </td>
                    <td>
                      <div style={{ textAlign: "right" }}>
                        ₹{item?.taxableValue || 0}
                      </div>
                    </td>
                    <td>
                      <div style={{ textAlign: "right" }}>
                        ₹{item?.integreatedTax || 0}
                      </div>
                    </td>
                    <td>
                      <div style={{ textAlign: "right" }}>
                        ₹
                        {Number(item?.taxableValue)
                          ? Math.floor(Number(item?.taxableValue) / 2)
                          : 0}
                      </div>
                    </td>
                    <td>
                      <div style={{ textAlign: "right" }}>
                        ₹
                        {Number(item?.taxableValue)
                          ? Math.floor(Number(item?.taxableValue) / 2)
                          : 0}
                      </div>
                    </td>
                    <td>
                      <div style={{ textAlign: "right" }}>
                        ₹{item?.cess || 0}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {!loadingSaleHSN && data?.length <= 0 && (
            <div className={css.noDataDiv}>
              <p>No data is available for Sale HSN.</p>
              <p>Please try again after making relevant changes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaleHSN;
