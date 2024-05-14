import * as XLSX from "xlsx";
import css from "./GSTR1.module.css";
import SaleTable from "./SaleTable";
import SaleReturn from "./SaleReturn";
import Loader3 from "../../../Component/Loaders/Loader3";
import ReportUpperControlPanel from "../../../Component/UpperControlPanel/ReportUpperControlPanel";
import { GetSaleReport } from "../../../Redux/report/action";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetMonthName } from "../../../Component/UpperControlPanel/UpperControlPanel";
import PDFDownloadButton from "../../../components/pdf/DownloadPdf";
import ExcelDownloadButton from "../../../components/excel/DownloadExcel";
import JSONDownloadButton from "../../../components/json/DownloadJsonFormate";

const GSRT1 = () => {
	const dispatch = useDispatch();
	// const companyName = JSON.parse(
	// 	sessionStorage.getItem(USER_DETAILS)
	//   )?.companyName;
	const [searchParams, setSearchParams] = useSearchParams();
	const [select, setSelect] = useState();
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
	const [items, setItems] = useState();

	const handleSelect = (e) => {
		setSelect(e.target.value);
	};

	const filterDataByTime = (saleData, timeInterval) => {
		const currentDate = new Date();
		const currentMonth = currentDate.getMonth();
		const currentYear = currentDate.getFullYear();
		let startDate, endDate;
		switch (timeInterval) {
			case "This Month":
				startDate = new Date(currentYear, currentMonth, 1);
				endDate = new Date(currentYear, currentMonth + 1, 0);
				break;
			case "Last Month":
				startDate = new Date(currentYear, currentMonth - 1, 1);
				endDate = new Date(currentYear, currentMonth, 0);
				break;
			case "This Quarter":
				startDate = new Date(currentYear, Math.floor(currentMonth / 3) * 3, 1);
				endDate = new Date(
					currentYear,
					Math.floor(currentMonth / 3) * 3 + 3,
					0
				);
				break;
			case "This Year":
				startDate = new Date(currentYear, 0, 1);
				endDate = new Date(currentYear, 11, 31);
				break;
			case "All":
				return saleData;
			default:
				startDate = new Date(timeInterval);
				endDate = new Date(
					startDate.getFullYear(),
					startDate.getMonth(),
					startDate.getDate(),
					23,
					59,
					59
				);
				break;
		}
		return saleData.filter((item) => {
			const itemDate = new Date(item.invoiceDate);
			return itemDate >= startDate && itemDate <= endDate;
		});
	};

	useEffect(() => {
		const data = filterDataByTime(saleData, select);
		setItems(data);
	}, [select]);

	console.log("jbfhrbf", saleData);
	useEffect(() => {
		setItems(saleData);
	}, [saleData]);
	//   Report sale/saleReturn Data
	useEffect(() => {
		GetSaleReport(dispatch, startDate, endDate);
	}, [startDate, endDate]);

	useEffect(() => {
		setSearchParams({ true: currSection });
	}, [currSection]);
	//  console.log(saleData);
	// console.log(saleReturnData);

	// ********************** excel download **********************

	useEffect(() => {
		const filteredData = saleData.filter((item) => {
			// Convert item.invoiceDate to Date object
			const invoiceDate = new Date(item.invoiceDate);
			console.log("this is invoiceDate", invoiceDate);
			// Parse startDate and endDate to Date objects
			const [startMonth, startDay, startYear] = startDate.split("/");
			const [endMonth, endDay, endYear] = endDate.split("/");
			const start = new Date(`${startMonth}/${startDay}/${startYear}`);
			const end = new Date(`${endMonth}/${endDay}/${endYear}`);
			// Compare dates
			return invoiceDate >= start && invoiceDate <= end;
		});
		setItems(filteredData);
		console.log("thuis is itemdate", items);
	}, [startDate, endDate]);

	const excelDownload = async () => {
		const data = currSection === "Sale" ? saleData : saleReturnData;
		console.log("DATA FROM GSTR1", data);
		const startDateParts = startDate.split("-");
		const endDateParts = endDate.split("-");
		const formattedStartDate = `${startDateParts[2]}-${GetMonthName(
			startDateParts[1]
		)}`;
		const formattedEndDate = `${endDateParts[2]}-${GetMonthName(
			endDateParts[1]
		)}`;
		const formattedFileName = `GSTR1_REPORT_DATA_${formattedStartDate}_${formattedEndDate}_09AEIPT7331R1ZJ.xlsx`;
		const filteredHeaders = Object.keys(data[0]).filter(
			(header) => header !== "_id"
		);
		// Filter data for b2b and b2c sheets
		const b2bData = [];
		const b2cData = [];
		const exemptData = [];
		const cdnrData = [];
		const hsnData = [];

		saleReturnData.forEach((row) => {
			const rowData = filteredHeaders.map((header) => row[header]);
			if (
				row["transactionType"] === "Credit Note" ||
				row["transactionType"] === "Debit Note"
			) {
				cdnrData.push(rowData);
			}
		});

		data.forEach((row) => {
			const rowData = filteredHeaders.map((header) => row[header]);

			// Check if GST number exists
			if (row["gstNo"]) {
				b2bData.push(rowData);
			}

			// Check if taxRate is undefined, null, or 0
			if (
				row["taxRate"] == undefined ||
				row["taxRate"] == null ||
				row["taxRate"] == "gst@0" ||
				"igst@0"
			) {
				exemptData.push(rowData);
			}

			// Check if transactionType is "Credit Note" or "Debit Note"
			if (
				row["transactionType"] === "Credit Note" ||
				row["transactionType"] === "Debit Note"
			) {
				cdnrData.push(rowData);
			}

			// Check if HSN code exists
			if (row["hsnCode"]) {
				hsnData.push(row);
			}
			if (!row["gstNo"]) {
				b2cData.push(rowData);
			}
		});

		// Calculate total number of recipients and total number of invoices
		const uniquePartyNamesB2B = [...new Set(b2bData.map((row) => row[4]))];

		const uniquePartyNamesB2C = [...new Set(b2cData.map((row) => row[4]))];

		// Fetch Excel file
		const response = await fetch(process.env.PUBLIC_URL + "/GSTR1.xlsx");
		const buffer = await response.arrayBuffer();
		// Read existing workbook
		const workbookMine = XLSX.read(buffer, { type: "array" });
		// Create a new workbook
		const workbook = XLSX.utils.book_new();
		// Append "Help Instructions" sheet from existing workbook
		const helpWorksheet = workbookMine.Sheets["Help Instructions"];
		XLSX.utils.book_append_sheet(workbook, helpWorksheet, "Help Instructions");
		const b2b = b2bData.map((row) => [
			row[6], // Assuming index 6 contains gstNo
			row[5], // Assuming index 5 contains partyName
			row[1], // Assuming index 2 contains invoiceNumber
			new Date(row[2]).toISOString().split("T")[0], // Assuming index 3 contains invoiceDate
			row[9], // Assuming index 4 contains amount
			row[4], // Assuming index 5 contains stateOfSupply
			"", // Empty field
			row[7], // Assuming index 8 contains transactionType
			"", // Empty field
			row[11], // Assuming index 7 contains taxRate
			(Number(row[9]) - Number(row[10])).toFixed(2), // Assuming index 11 contains balanceDue
			row[14], // Assuming index 14 contain css value
		]);

		const b2c = b2cData.map((row) => [
			//Invoice Number	Invoice date	Invoice Value	Place Of Supply	Applicable % of Tax Rate	Rate	Taxable Value	Cess Amount	E-Commerce GSTIN

			row[1], // Assuming index 1 contains invoiceNumber
			new Date(row[2]).toISOString().split("T")[0], // Assuming index 3 contains invoiceDate
			row[9], // Assuming index 9 contains amount
			row[3], // Assuming index 4 contains stateOfSupply
			row[11], // Assuming index 11 contains taxRate
			(Number(row[9]) - Number(row[10])).toFixed(2), // Taxable value
			row[14], // Assuming index 14 contains cess amount
			"", // Assuming index 0 contains gstNo
		]);

		const excempt = exemptData.map((row) => [
			row[6], // Assuming index 0 contains gstNo
			row[5], // Assuming index 1 contains partyName
			row[1], // Assuming index 2 contains invoiceNumber
			new Date(row[2]).toISOString().split("T")[0], // Assuming index 3 contains invoiceDate
			row[9], // Assuming index 4 contains amount
			row[3], // Assuming index 5 contains stateOfSupply
			"", // Empty field
			row[11], // Assuming index 7 contains taxRate
			row[7], // Assuming index 8 contains transactionType
			"", // Empty field
			Number(row[9]).toFixed(2), // Taxable value// Assuming index 11 contains balanceDue
			0, // Default value
		]);
		console.log(cdnrData);
		const cdnr = cdnrData.map((row) => [
			row[6], // Assuming index 0 contains gstNo
			row[5], // Assuming index 1 contains partyName
			row[1], // Assuming index 2 contains invoiceNumber
			"",
			"",
			new Date(row[2]).toISOString().split("T")[0], // Assuming index 3 contains invoiceDate
			"",
			"",
			row[4], // Assuming index 3 contains stateOfSupply
			row[9], // Assuming index 4 contains amount
			(Number(row[9]) - Number(row[10])).toFixed(2), // Taxable value
			0, // Default value
			"", // Empty field
		]);

		const hsn = hsnData.map((row) => [
			"",
			"",
			"",
			"",
			"",
			"",
			"", // Empty field
			(row[9] - row[10]).toFixed(2), // Assuming index 11 contains balanceDue
			0, // Default value
			"", // Empty field
		]);

		// console.log(b2b);
		// Create sheets for b2b and b2c data
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
			[
				uniquePartyNamesB2B.length,
				"",
				b2bData.length,
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				b2bData.reduce((acc, row) => acc + (row[11] || 0), 0),
				b2bData.reduce((acc, row) => acc + Number(row[12] || 0), 0),
			],
			[],
			[
				"GSTIN/UIN of Recipient",
				"Name of Recipient",
				"Invoice Number",
				"Invoice date",
				"Invoice Value",
				"Place Of Supply(POS)",
				"Reverse Charge",
				// "Applicable % of Tax Rate",
				"Invoice Type",
				"E-Commerce GSTIN",
				"Rate",
				"Taxable Value",
				"Cess Amount",
			],
			...b2b,
		]);

		const b2CLsheet = XLSX.utils.aoa_to_sheet([
			["Summary For B2CL"],
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
			[
				uniquePartyNamesB2C.length,
				"",
				b2cData.length,
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				b2cData.reduce((acc, row) => acc + (row[11] || 0), 0),
				b2cData.reduce((acc, row) => acc + Number(row[12] || 0), 0),
			],
			[""],
			[
				"Invoice Number",
				"Date Of Invoice",
				"Invoice Value",
				"Place of Supply (POS)",
				// "Applicable % of Tax Rate",
				"Rate",
				"Taxable Value",
				"Cess Amount",
				"E-Commerce GSTIN",
			],
			...b2c,
		]);

		const b2cs = XLSX.utils.aoa_to_sheet([
			["Summary Fro B2CL"],
			["", "", "", "", "", "", "Total Taxable Value", "Total Css", ""],
			[
				"Type",
				"Place Of Supply",
				"Applicable % of Tax Rate",
				"Rate",
				"Taxable Value",
				"Cess Amount",
				"	E-Commerce GSTIN",
			],

			[""],
		]);

		const cdnrsheet = XLSX.utils.aoa_to_sheet([
			["Summary For CDNR(9B)"],
			["", "", "", "", "", "", "", "", "", "", ""],
			[
				"GSTIN/UIN of Recipient",
				"Name of Recipient",
				"Invoice/Advance Receipt Number",
				"Invoice/Advance Receipt date",
				"Note/Refund Voucher Number",
				"Note/ Refund Voucher date",
				"Document Type",
				"Reason For Issuing document",
				"Place of Supply",
				"Note/Refund Voucher value",
				"Rate",
				"Taxable value",
				" Cess Amount",
				"Pre GST",
			],

			[""],
			...cdnr,
		]);

		const exemp = XLSX.utils.aoa_to_sheet([
			["Summary For Nil rated,"],
			["exempted and non GST outward supplies (8)"],
			[
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"Total Nill Value",
				"Total Css",
				"",
			],
			["", "", "", "", "", "", "", "", "", "", "", "", "0", "0", ""],

			[""],
			[
				"GSTIN/UIN of Recipient",
				"Receiver Name",
				"Invoice Number",
				"Invoice date",
				"Invoice Value",
				"Place Of Supply",
				"Reverse Charge",
				"Applicable % of Tax Rate",
				"Invoice Type",
				"E-Commerce GSTIN",

				"Taxable Value",
				"Cess Amount",
			],
			...excempt,
		]);

		const hsnsheet = XLSX.utils.aoa_to_sheet([
			["Summary for HSN"],
			[
				"",
				"",
				"",
				"",
				"",
				"",
				"Total Value",
				"Total Taxable Value",
				"Total Integrated Tax",
				"Total Central Tax",
				"",
				"Total State/UT Tax",
				"Total Cess",
			],
			[""],
			[
				"HSN",
				"Description",
				"UQC",
				"Total Quantity",
				"Total Value",
				"Taxable Value",
				"Integrated Tax Amount",
				"Central Tax Amount",
				"State/UT Tax Amount",
				"Cess Amount",
			],

			...hsn,
		]);

		const docs = workbookMine.Sheets["docs"];

		// Append sheets to the workbook
		XLSX.utils.book_append_sheet(workbook, b2bsheet, "b2b");
		XLSX.utils.book_append_sheet(workbook, b2CLsheet, "b2cl");
		XLSX.utils.book_append_sheet(workbook, b2cs, "b2cs");
		XLSX.utils.book_append_sheet(workbook, cdnrsheet, "cdnr");
		XLSX.utils.book_append_sheet(workbook, exemp, "exemp");
		XLSX.utils.book_append_sheet(workbook, hsnsheet, "hsn");
		XLSX.utils.book_append_sheet(workbook, docs, "docs");

		// Write the workbook to file
		XLSX.writeFile(workbook, formattedFileName);
	};
	let relevantFields = [
		"amount",
		"balanceDue",
		"gstNo",
		"integratedTax",
		"invoiceDate",
		"invoiceNumber",
		"partyName",
		"transactionType",
	];
	return isLoading ? (
		<Loader3
			text={`Loading ${currSection == "Sale" ? "Sales" : "Sale Returns"} GSTR1`}
		/>
	) : (
		<div className={css.Outer}>
			{/* Upper Control Panel */}
			<div className={css.topNavOuter}>
				<div className={css.navTopADiv}>
					<select
						defaultValue="All"
						onChange={handleSelect}
						style={{
							backgroundColor: "#BFBFBF",
							padding: "3px 3px",
							borderRadius: "5px",
						}}
					>
						<option value="All">All Reports</option>
						<option value="This Month">This Month</option>
						<option value="Last Month">Last Month</option>
						<option value="This Quarter">This Quarter</option>
						<option value="This Year">This Year</option>
					</select>

					<div className={css.divContainingDateInps}>
						<h3>Between</h3>
						<div>
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
					</div>
					<select defaultValue="ALL FIRMS" className={css.navFirmsSelectTag}>
						<option value="ALL FIRMS">ALL FIRMS</option>
					</select>
					<div
						style={{
							display: "flex",
							justifyContent: "space-around",
							marginLeft: "250px",
						}}
					>
						 <div style={{ marginRight: "30px" }}><JSONDownloadButton data={items} /><p style={{ fontSize: "10px", fontWeight: "bold" }}>
								Json
							</p></div>
						<div style={{ marginRight: "10px" }}>
							<ExcelDownloadButton data={items} />
							<p style={{ fontSize: "10px", fontWeight: "bold" }}>
								Excel Reports
							</p>
						</div>
						<div style={{ marginLeft: "10px" }}>
							<PDFDownloadButton
								data={items}
								fields={relevantFields}
								title={"GSTR1 Report"}
								totalText="GSTR1 Purchanse"
							/>
							<p
								style={{
									fontSize: "10px",
									fontWeight: "bold",
									marginRight: "40px",
								}}
							>
								Print
							</p>
						</div>
					</div>
				</div>
				{/* <div className={css.navTopBDiv}>
					<div
						className={css.navCalculatedDivs}
						style={{ background: "var(--SemiTransparentMint)" }}
					>
						<h2>Paid</h2>
						<h3>
							₹{" "}
							{(paidAmount - unpaidAmount < 0
								? 0.0
								: paidAmount - unpaidAmount
							).toFixed(2)}
						</h3>
					</div>
					<div className={css.mathmaticalSigns}>+</div>
					<div
						className={css.navCalculatedDivs}
						style={{ background: "var(--blueC)" }}
					>
						<h2>Unpaid</h2>
						<h3>₹ {unpaidAmount.toFixed(2)}</h3>
					</div>
					<div className={css.mathmaticalSigns}>=</div>
					<div
						className={css.navCalculatedDivs}
						style={{ backgroundColor: "var(--GoldenBeige)" }}
					>
						<h2>Total</h2>
						<h3>₹ {paidAmount.toFixed(2)}</h3>
					</div>
				</div> */}
			</div>
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
				<SaleTable saleData={items} />
			) : (
				<SaleReturn saleReturnData={saleReturnData} />
			)}
		</div>
	);
};

export default GSRT1;
