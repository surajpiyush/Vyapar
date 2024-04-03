import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "./months.css";
import { ArrowDownIcon, EqualIcon, PlusIcon } from "../utils/reactIcons";
import { useToast } from "@chakra-ui/react";
import { ExcelIcon } from "../../assets/Icons/ReactIcons";

const Thismonth = ({
  isshowcards = true,
  ishowPayment = false,
  selectoptions,
  startDate,
  endDate,
  setEndDate,
  setStartDate,
  data,
}) => {
  const toast = useToast();
  const [paidAmount, setPaidAmount] = useState(0);
  const [unpaidAmount, setUnpaidAmount] = useState(0);
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  // console.log("data", data);

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  // console.log("data in from month",data);

  const [loading, setLoading] = useState(false);
  const getMonthName = (monthNumber) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[parseInt(monthNumber) - 1];
  };
  const startDateParts = startDate.split("-");
  const endDateParts = endDate.split("-");
  const formattedStartDate = `${startDateParts[2]}-${getMonthName(
    startDateParts[1]
  )}`;
  const formattedEndDate = `${endDateParts[2]}-${getMonthName(
    endDateParts[1]
  )}`;

  const saveTableData = async (action) => {
    switch (action) {
      case "JSON":
        // Convert the data to JSON
        const jsonData = JSON.stringify(data);

        // Create a Blob containing the JSON data
        const blob = new Blob([jsonData], { type: "application/json" });

        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "purchaseData.json";

        // Append the link to the document and trigger the click
        document.body.appendChild(link);
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
        break;

      case "PRINT":
        // hideElementDuringPrint();

        // Trigger browser's print dialog
        // window.print();

        // showElementAfterPrint();
        break;

      case "EXCEL":
        try {
          setLoading(true);
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
            [
              "Summary For Nil rated, exempted and non GST outward supplies (8)",
            ],
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

          setLoading(false);
        } catch (error) {
          console.error("Error:", error);
          setLoading(false);
        }
        break;

      default:
        console.warn("Unknown action:", action);
    }
  };
  // Calculate paid and unpaid amounts from the data
  useEffect(() => {
    let paid = 0;
    let unpaid = 0;

    data.forEach((item) => {
      paid += parseFloat(item.amount) || 0;
      unpaid += parseFloat(item.balanceDue) || 0;
    });
    setPaidAmount(paid);
    setUnpaidAmount(unpaid);
  }, [data]);

  return (
    <div className="this-month-container">
      <section className="this-month-top">
        <aside className="this-month-heading">
          <h5>This Month</h5>
          <ArrowDownIcon />
        </aside>
        <aside className="this-month-dates">
          <label htmlFor="#">Between</label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <span>To</span>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </aside>
        <aside className="this-month-select">
          <select name="firms">
            <option value="" disabled>
              Select
            </option>
            {["All Firms", "My Company"].map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </aside>
        <aside>
          <div style={{ gap: "20px", paddingRight: "15px", display: "flex" }}>
            <div className="d-flex-col">
              <div
                onClick={() => {
                  saveTableData("EXCEL");
                }}
              >
                <div style={{ padding: "10px 0 0 30px" }}>
                  <ExcelIcon />
                </div>
                <div>
                  <span>Excel Report</span>
                </div>
              </div>
            </div>
            <h1>hello</h1>
            <div className="d-flex-col">
              {/* <div
                onClick={() => {
                  saveTableData("PRINT");
                }}
              >
                <div>
                  <i className="fa fa-print" aria-hidden="true"></i>
                </div>
                <div>
                  <span>Print</span>
                </div>
              </div> */}
            </div>
          </div>
        </aside>
      </section>
      {isshowcards && (
        <section className="this-month-card-section">
          <aside className="this-month-paid-card">
            <p>Paid</p>
            <p className="this-month-rupee">₹ {paidAmount.toFixed(2)}</p>
          </aside>
          <PlusIcon />
          <aside className="this-month-paid-card this-month-paid-card-unpaid">
            <p>Unpaid</p>
            <p className="this-month-rupee">₹ {unpaidAmount.toFixed(2)}</p>
          </aside>
          <EqualIcon />
          <aside className="this-month-paid-card this-month-paid-card-total">
            <p>Total</p>
            <p className="this-month-rupee">
              ₹ {(paidAmount + unpaidAmount).toFixed(2)}
            </p>
          </aside>
        </section>
      )}
      {ishowPayment && (
        <select name="this-month-select-payment">
          {(selectoptions || []).map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Thismonth;
