import css from "./CashFlow.module.css";
import UpperControlPanel, {
  GetMonthName,
} from "../../../Component/UpperControlPanel/UpperControlPanel";
import { GetAllTransactions } from "../../../Redux/report/action";
import {
  PrintIconOutline,
  BasicSpinnerIcon,
  ExcelIcon,
  ExcelIconOutline,
  JsonIconOutline,
  SearchIcon,
} from "../../../assets/Icons/ReactIcons";

import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { Tooltip, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Loader3 from "../../../Component/Loaders/Loader3";
import { FormatDate } from "../../../Redux/sales/action";

const CashFlow = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const loadingCashFlow = useSelector((store) => store.ReportReducer.isLoading);
  const data = useSelector((store) => store.ReportReducer.allCashFlowData);
  const [showZeroAmt, setShowZeroAmt] = useState(false);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [printClickStates, setPrintClickStates] = useState({
    JsonLoading: false,
    excelLoading: false,
    printLoading: false,
  });
  const startDateParts = startDate.split("-");
  const endDateParts = endDate.split("-");
  const formattedStartDate = `${startDateParts[2]}-${GetMonthName(
    startDateParts[1]
  )}`;
  const formattedEndDate = `${endDateParts[2]}-${GetMonthName(
    endDateParts[1]
  )}`;

  // To fetch Invoices data
  useEffect(() => {
    GetAllTransactions(dispatch, startDate, endDate);
  }, [startDate, endDate]);

  // Print
  const Print = () => {
    if (!printClickStates?.printLoading) {
      setPrintClickStates((prev) => {
        return { ...prev, printLoading: true };
      });
      window.print();
      setPrintClickStates((prev) => {
        return { ...prev, printLoading: false };
      });
    }
  };

  // Download Excel Report
  const DownloadExcelReport = async () => {
    if (!printClickStates?.excelLoading) {
      try {
        setPrintClickStates((prev) => {
          return { ...prev, excelLoading: true };
        });
        const formattedFileName = `${window.location.pathname}_Data_${formattedStartDate}_${formattedEndDate}_09AEIPT7331R1ZJ.xlsx`;
        const filteredHeaders = Object.keys(data[0]).filter(
          (header) => header !== "_id"
        );
        // Construct data array with filtered data
        const filteredData = data.map((row) =>
          filteredHeaders.map((header) => row[header])
        );
        // Fetch Excel file
        const response = await fetch(process.env.PUBLIC_URL + "/GSTR1.xlsx");
        const buffer = await response.arrayBuffer();
        // Read existing workbook
        const workbookMine = XLSX.read(buffer, { type: "array" });
        // Create a new workbook
        const workbook = XLSX.utils.book_new();
        // Append "Help Instructions" sheet from existing workbook
        const helpWorksheet = workbookMine.Sheets["Help Instructions"];
        XLSX.utils.book_append_sheet(
          workbook,
          helpWorksheet,
          "Help Instructions"
        );
        // Create a worksheet with filtered headers and data
        const b2bsheet = XLSX.utils.aoa_to_sheet([
          ["Summary of B2B"],
          [""],
          [
            "No. Of Recipients",
            "",
            "No. Of Invoices",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "Total Taxable Value",
            "Total Cess",
          ],
          [data.length, "", data.length],
          [],
          [
            "STATUS",
            "Invoice Number",
            "Invoice date",
            "Place Of Supply",
            "Receiver Name",
            "GSTIN/UIN of Recipient",
            "Invoice Type",
            "PAYMENT TYPE",
            "Invoice Value",
            "Remaining Amount",
            "Rate",
            "Taxable Value",
            "Cess Amount",

            "Reverse Charge",
            "Applicable % of Tax Rate",
            // "E-Commerce GSTIN",
          ],

          ...filteredData,
        ]);
        const b2CLsheet = XLSX.utils.aoa_to_sheet([
          ["Summary Fro B2CL"],
          ["", "", "", "", "", "", "Total Taxable Value", "Total Css", ""],
          [
            "Invoice Number",
            "Invoice date",
            "Invoice Value",
            "Place Of Supply",
            "Applicable % of Tax Rate",
            "Rate",
            "Taxable Value",
            "Cess Amount",
            "E-Commerce GSTIN",
          ][""],
        ]);
        const b2cs = XLSX.utils.aoa_to_sheet([
          ["Summary Fro B2CL"],
          ["", "", "", "", "", "", "Total Taxable Value", "Total Css", ""],
          [
            "Invoice Number",
            "Invoice Date",
            "Invoice Value",
            "Place of Supply",
            "Applicable %",
            "Rate",
            "Taxable Value",
            "Cess Amount",
            "E-Commerce GSTIN",
          ],

          [""],
        ]);
        const cdnr = XLSX.utils.aoa_to_sheet([
          ["Summary Fro CDNR"],
          [],
          [
            "GSTIN/UIN of Recipient",
            "Receiver Name",
            "Note Number",
            "Note Date",
            "Note Type",
            "Place Of Supply",
            "Reverse Charge",
            "Note Supply Type",
            "Note Value",
            "Applicable % of Tax Rate",
            "Rate",
            "Taxable Value",
            "Cess Amount",
          ][""],
        ]);
        const exemp = XLSX.utils.aoa_to_sheet([
          ["Summary For Nil rated, exempted and non GST outward supplies (8)"],
          [
            "",
            "Total Nil Rated Supplies",
            "Total Exempted Supplies",
            "Total Non-GST Supplies",
          ],
          [
            "Description",
            "Nil Rated Supplies",
            "Exempted(other than nil rated/non GST supply)",
            "Non-GST Supplies",
          ],

          [""],
        ]);
        const hsn = XLSX.utils.aoa_to_sheet([
          ["Summary Fro B2CL"],
          ["", "", "", "", "", "", "Total Taxable Value", "Total Css", ""],
          [
            "HSN",
            "Description",
            "UQC",
            "Total Quantity",
            "Total Value",
            "Rate",
            "Taxable Value",
            "Integrated Tax Amount",
            "Central Tax Amount",
            "State/UT Tax Amount",
            "Cess Amount",
          ][""],
        ]);
        const docs = XLSX.utils.aoa_to_sheet([
          ["Summary Fro B2CL"],
          ["", "", "", "", "", "", "Total Taxable Value", "Total Css", ""],
          [
            "Invoice Number",
            "Invoice Date",
            "Invoice Value",
            "Place of Supply",
            "Applicable %",
            "Rate",
            "Taxable Value",
            "Cess Amount",
            "E-Commerce GSTIN",
          ],

          [""],
        ]);
        XLSX.utils.book_append_sheet(workbook, b2bsheet, "b2b");
        XLSX.utils.book_append_sheet(workbook, b2CLsheet, "b2cl");
        XLSX.utils.book_append_sheet(workbook, b2cs, "b2cs");
        XLSX.utils.book_append_sheet(workbook, cdnr, "cdnr");
        XLSX.utils.book_append_sheet(workbook, exemp, "exemp");
        XLSX.utils.book_append_sheet(workbook, hsn, "hsn");
        XLSX.utils.book_append_sheet(workbook, docs, "docs");
        XLSX.writeFile(workbook, formattedFileName);
        setPrintClickStates((prev) => {
          return { ...prev, excelLoading: false };
        });
      } catch (error) {
        console.error("Excel Report Download Error:", error);
        setPrintClickStates((prev) => {
          return { ...prev, excelLoading: false };
        });
      }
    }
  };

  return loadingCashFlow ? (
    <Loader3 text="Loading Cash Flow" />
  ) : (
    <div>
      {/* Top Nav */}
      <div className={css.topNavOuter}>
        <div className={css.navTopADiv}>
          <div className={css.leftSideUpperPart}>
            <select defaultValue="This Month" className={css.monthSelectTag}>
              <option value="All Sale Invoices">All Sale Invoices</option>
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
              <option value="This Quarter">This Quarter</option>
              <option value="This Year">This Year</option>
              <option value="Custom">Custom</option>
            </select>
            <div className={css.divContainingDateInps}>
              <h3>Between</h3>
              <div>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <p>To</p>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <select defaultValue="ALL FIRMS" className={css.navFirmsSelectTag}>
              <option value="ALL FIRMS">ALL FIRMS</option>
            </select>
          </div>
          <div className={css.rightSideUpperPart}>
            <Tooltip label="Excel Report">
              <div onClick={DownloadExcelReport} className={css.excelIconDiv}>
                {printClickStates?.excelLoading ? (
                  <BasicSpinnerIcon />
                ) : (
                  <ExcelIconOutline />
                )}
              </div>
            </Tooltip>
            <Tooltip label="Print">
              <div onClick={Print} className={css.printIconDiv}>
                {printClickStates?.printLoading ? (
                  <BasicSpinnerIcon />
                ) : (
                  <PrintIconOutline />
                )}
              </div>
            </Tooltip>
          </div>
        </div>
        <div className={css.navTopBDiv}>
          <p>Opening Cash-in Hand: Rs 2,000.00</p>
          <div className={css.checkBoxInpDiv}>
            <input type="checkbox" />
            <label>Show zero amount transaction</label>
          </div>
        </div>
      </div>

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
                  "DATE",
                  "REF NO.",
                  "NAME",
                  // "CATEGORY NAME",
                  "TYPE",
                  "CASH IN",
                  "CASH OUT",
                  "CASH IN HAND",
                  // "PRINT/SHARE",
                ].map((item, ind) => (
                  <th key={item + ind}>
                    <div>{item}</div>
                  </th>
                ))}
              </tr>
            </thead>

            {!loadingCashFlow && data?.length > 0 && (
              <tbody>
                {data?.map((item, ind) => (
                  <tr key={ind + item?._id}>
                    <td>
                      <div>{ind + 1}</div>
                    </td>
                    <td>
                      <div>{FormatDate(item?.date)}</div>
                    </td>
                    <td>
                      <div>{item?.refNo}</div>
                    </td>
                    <td>
                      <div>{item?.name}</div>
                    </td>
                    <td>
                      <div>{item?.type}</div>
                    </td>
                    <td>
                      <div style={{ textAlign: "right" }}>
                        ₹{item?.total || 0}
                      </div>
                    </td>
                    <td>
                      <div style={{ textAlign: "right" }}>
                        ₹{item?.recived || 0}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          {!loadingCashFlow && data?.length <= 0 && (
            <div className={css.noDataDiv}>
              <p>No data is available for Cash Flow.</p>
              <p>Please try again after making relevant changes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CashFlow;
