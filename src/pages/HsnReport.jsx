import css from "../styles/reportsStyles/hsnReportStyles.module.css";
import { GetSaleReport } from "../Redux/report/action";

import * as XLSX from "xlsx";
import { VscGraph } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { CiFilter as FilterIcon } from "react-icons/ci";
import { SiMicrosoftexcel as ExcelIcon } from "react-icons/si";
import { MdLocalPrintshop as PrintIcon } from "react-icons/md";
import { IoIosShareAlt as ShareIcon } from "react-icons/io";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";

const HsnReport = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ReportReducer.isLoading);
  const totalSaleTax = useSelector((state) => state.ReportReducer.totalSaleTax);
  const totalSaleTaxReturn = useSelector(
    (state) => state.ReportReducer.totalSaleTaxReturn
  );
  const toggleSalesSuccess = useSelector(
    (state) => state.SalesReducer.toggleSalesSuccess
  );
  const saleReturnArr = useSelector(
    (state) => state.ReportReducer.saleReportData.getSaleReturn
  );
  const saleInvoiceArr = useSelector(
    (state) => state.ReportReducer.saleReportData.getSale
  );

  const [data, setData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // for fetching report data
  useEffect(() => {
    GetSaleReport(dispatch, startDate, endDate);
    // dispatch(getSaleReport({ date: { startDate, endDate } }));
  }, [toggleSalesSuccess, startDate, endDate]);

  // for fetching the array data after getting a successfull response
  useEffect(() => {
    if (saleReturnArr && saleInvoiceArr) {
      setData([...saleReturnArr, ...saleInvoiceArr]);
    }
  }, [isLoading]);

  // Action Function
  const saveTableData = (action) => {
    switch (action) {
      case "PRINT":
        // Trigger browser's print dialog
        window.print();
        break;
      case "XLSX":
        // Convert the data to XLSX format and save
        const ws1 = XLSX.utils.json_to_sheet(data);
        const wb1 = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb1, ws1, "Sheet 1");
        console.log(wb1);
        XLSX.writeFile(wb1, "tableData.xlsx");
        break;
      default:
        console.warn("Unknown action:", action);
    }
  };

  // Half tax calculator
  function GetHalfTaxValue(taxPercent) {
    // Parse the numeric value from the taxPercent string
    const numericValue = parseFloat(taxPercent) / 2;

    // Check if the result is a whole number
    if (Number.isInteger(numericValue)) {
      return numericValue.toFixed(0); // Return as a whole number
    } else {
      return numericValue.toFixed(2); // Return as a decimal with maximum two decimal places
    }
  }

  return (
    <div className={css.OuterDiv}>
      {/* Top Nav */}
      <div className="sale-dashboard-header">
        <div className="sale-dashboard-menu">
          <select className="sale-dashboard-select">
            <option value="">This Month</option>
            <option value="">All Sale Invoices</option>
            <option value="">Last Month</option>
            <option value="">This Quarter</option>
            <option value="">This Year</option>
            <option value="">Custom</option>
          </select>
          <div className="date-filter-div">
            <p>Between</p>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <p>To</p>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <select className="sale-dashboard-select">
            <option value="">All Firm</option>
            <option value="">Company</option>
          </select>
        </div>
        <div className="sale-dashboard-icons">
          <div className="sale-dashboard-icon">
            <VscGraph />
            <p>Graph</p>
          </div>
          <div
            className="sale-dashboard-icon"
            onClick={() => saveTableData("XLSX")}
          >
            <ExcelIcon />
            <p>Excel</p>
          </div>
          <div
            className="sale-dashboard-icon"
            onClick={() => saveTableData("PRINT")}
          >
            <PrintIcon />
            <p>Print</p>
          </div>
        </div>
      </div>

      {/* Search Cont */}
      <div style={{ marginLeft: "20px", width: "230px" }}>
        <div className={css.saleOrderSearchDiv}>
          <SearchIcon />
          <div>
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search"
            />
          </div>
        </div>
      </div>

      {/* Table Div */}
      <div>
        {/* <TableModel tableHeader={tableHeader} data={dataSale} /> */}
        <div className={css.TabelOuterDivSaleOrder}>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>
                  <div>#</div>
                </th>
                <th>
                  <div>
                    HSN <FilterIcon />
                  </div>
                </th>
                <th>
                  <div>
                    TOTAL VALUE <FilterIcon />
                  </div>
                </th>
                <th>
                  <div>
                    TAXABLE VALUE <FilterIcon />
                  </div>
                </th>
                <th>
                  <div>
                    IGST AMOUNT <FilterIcon />
                  </div>
                </th>
                <th>
                  <div>
                    CGST AMOUNT <FilterIcon />
                  </div>
                </th>
                <th>
                  <div>
                    SGST AMOUNT <FilterIcon />
                  </div>
                </th>
                <th>
                  <div>
                    ADD. CESS <FilterIcon />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                data?.map((item, ind) => (
                  <tr>
                    <td></td>
                    <td>
                      <div style={{ textAlign: "center" }}>{ind + 1}</div>
                    </td>
                    <td>
                      <div style={{ textAlign: "center" }}>{item?.hsn}</div>
                    </td>
                    <td>
                      <div style={{ textAlign: "right" }}>{item?.amount}</div>
                    </td>
                    <td>
                      <div style={{ textAlign: "right" }}>
                        {item?.taxableValue}
                      </div>
                    </td>
                    <td>
                      <div style={{ textAlign: "right" }}>
                        {item?.igstAmount}
                      </div>
                    </td>
                    <td>
                      <div style={{ textAlign: "right" }}>
                        {GetHalfTaxValue(item?.taxRate)}
                      </div>
                    </td>
                    <td>
                      <div style={{ textAlign: "right" }}>
                        {GetHalfTaxValue(item?.taxRate)}
                      </div>
                    </td>
                    <td>
                      <div style={{ textAlign: "right" }}>{item?.cess}</div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {isLoading && (
            <h2
              style={{
                color: "green",
                textAlign: "center",
                margin: "20px auto",
              }}
            >
              Loading HSN Report Data...
            </h2>
          )}
          {!isLoading && data?.length <= 0 && (
            <h2
              style={{
                textAlign: "center",
                margin: "20px auto",
                color: "red",
              }}
            >
              No HSN Reports available for the specified dates
            </h2>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={css.footerOuter}>
        <div>
          <p>Total Value:</p>
          <span style={{ color: "green" }}>
            ₹ {isLoading ? 0 : (totalSaleTaxReturn + totalSaleTax).toFixed(2)}
          </span>
        </div>
        <div>
          <p>Total Items:</p>
          <span>
            {isLoading
              ? 0
              : saleReturnArr?.length + saleInvoiceArr?.length || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HsnReport;
