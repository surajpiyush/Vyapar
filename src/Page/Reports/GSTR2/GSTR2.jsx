import { GetMonthName } from "../../../Component/UpperControlPanel/UpperControlPanel";
import * as XLSX from "xlsx";
import css from "./GSTR2.module.css";
import Loader3 from "../../../Component/Loaders/Loader3";
import ReportUpperControlPanel from "../../../Component/UpperControlPanel/ReportUpperControlPanel";
import { GetPurchaseReport } from "../../../Redux/report/action";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JSONDownloadButton from "../../../components/json/DownloadJsonFormate";
import ExcelDownloadButton from "../../../components/excel/DownloadExcel";
import PDFDownloadButton from "../../../components/pdf/DownloadPdf";

const GSTR2 = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector((store) => store.ReportReducer.isLoading);
	const purchaseReportData = useSelector(
		(store) => store.ReportReducer.saleReportData
	);
	// const purchaseReportData = useSelector(
	//   (store) => store.ReportReducer.purchaseReportData
	// );
	
	const [nonTaxExempted, setNonTaxExempted] = useState(false);
	const [select, setSelect] = useState();
	const currentDate = new Date();
	const startOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1
	);
	const formattedStartDate = startOfMonth.toISOString().split("T")[0];
	const [startDate, setStartDate] = useState(formattedStartDate);
	const [endDate, setEndDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	const [items, setItems] = useState();
	console.log("this ssi", purchaseReportData);
	useEffect(() => {
		setItems(purchaseReportData);
	}, [purchaseReportData]);
	// fetch gstr2 Data
	
	const handleSelect = (e) => {
		setSelect(e.target.value);
	};
	useEffect(() => {
		GetPurchaseReport(dispatch, startDate, endDate);
	}, [startDate, endDate]);
	

	const filterDataByTime = (purchaseReportData, timeInterval) => {
		
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
				return purchaseReportData;
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
		return purchaseReportData.filter((item) => {
			const itemDate = new Date(item.invoiceDate);
			return itemDate >= startDate && itemDate <= endDate;
		});
	};

	useEffect(() => {
		const data = filterDataByTime(purchaseReportData, select);
		console.log("this is data",data)
		setItems(data);
	}, [select]);

	// ********************** excel download **********************

	const excelDownload = async () => {
		const data = purchaseReportData;
		console.log("DATA FROM GSTR2", data);
		const startDateParts = startDate.split("-");
		const endDateParts = endDate.split("-");
		const formattedStartDate = `${startDateParts[2]}-${GetMonthName(
			startDateParts[1]
		)}`;
		const formattedEndDate = `${endDateParts[2]}-${GetMonthName(
			endDateParts[1]
		)}`;
		const formattedFileName = `GSTR2_REPORT_DATA_${formattedStartDate}_${formattedEndDate}_09AEIPT7331R1ZJ.xlsx`;
		const filteredHeaders = Object.keys(data[0]).filter(
			(header) => header !== "_id"
		);
		// Filter data for b2b and b2c sheets
		const b2bData = [];
		const exemptData = [];

		data.forEach((row) => {
			const rowData = filteredHeaders.map((header) => row[header]);
			if (row["gstNo"]) {
				b2bData.push(rowData);
			} else if (
				row["taxRate"] == undefined ||
				row["taxRate"] == null ||
				row["taxRate"] == 0
			) {
				exemptData.push(rowData);
			}
		});
		// Calculate total number of recipients and total number of invoices
		const uniquePartyNamesB2B = [...new Set(b2bData.map((row) => row[4]))];

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
			row[6], // Assuming index 0 contains gstNo
			row[5], // Assuming index 1 contains partyName
			row[1], // Assuming index 2 contains invoiceNumber
			row[2], // Assuming index 3 contains invoiceDate
			row[9], // Assuming index 4 contains amount
			row[4], // Assuming index 5 contains stateOfSupply
			"", // Empty field
			row[11], // Assuming index 7 contains taxRate
			row[7], // Assuming index 8 contains transactionType
			"", // Empty field
			(row[9] - row[10]).toFixed(2), // Assuming index 11 contains balanceDue
			0, // Default value
			"", // Empty field
		]);

		const excempt = exemptData.map((row) => [
			row[6], // Assuming index 0 contains gstNo
			row[5], // Assuming index 1 contains partyName
			row[1], // Assuming index 2 contains invoiceNumber
			row[2], // Assuming index 3 contains invoiceDate
			row[9], // Assuming index 4 contains amount
			row[4], // Assuming index 5 contains stateOfSupply
			"", // Empty field
			row[11], // Assuming index 7 contains taxRate
			row[7], // Assuming index 8 contains transactionType
			"", // Empty field
			(row[9] - row[10]).toFixed(2), // Assuming index 11 contains balanceDue
			0, // Default value
			"", // Empty field
		]);

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
				"Receiver Name",
				"Invoice Number",
				"Invoice date",
				"Invoice Value",
				"Place Of Supply",
				"Reverse Charge",
				"Applicable % of Tax Rate",
				"Invoice Type",
				"E-Commerce GSTIN",
				"Rate",
				"Taxable Value",
				"Cess Amount",
			],
			...b2b,
		]);

		const cdnr = XLSX.utils.aoa_to_sheet([
			["Summary For CDNR(9B)"],
			["", "", "", "", "", "", "", "", "", "", ""],
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
				"Rate",
				"Taxable Value",
				"Cess Amount",
			],
			...excempt,
		]);

		const hsn = XLSX.utils.aoa_to_sheet([
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
				"	Description	UQC",
				"Total Quantity",
				"Total Value	Rate",
				"Taxable Value",
				"Integrated Tax Amount",
				"Central Tax Amount",
				"State/UT Tax Amount",
				"Cess Amount",
			],

			[""],
		]);

		// Append sheets to the workbook
		XLSX.utils.book_append_sheet(workbook, b2bsheet, "b2b");
		XLSX.utils.book_append_sheet(workbook, cdnr, "cdnr");
		XLSX.utils.book_append_sheet(workbook, exemp, "exemp");
		XLSX.utils.book_append_sheet(workbook, hsn, "hsnsum");

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

   useEffect(() => {
		const filteredData = purchaseReportData.filter((item) => {

			console.log("this is purchaseReportData", purchaseReportData);
			// Convert item.invoiceDate to Date object
			const invoiceDate = new Date(item.invoiceDate);
			
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


console.log("this is items",items)

	return isLoading ? (
		<Loader3 text="Loading GSTR2" />
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
								title={"Sale Report"}
								totalText="Total Purchanse"
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

			{/* Content */}
			<div className={css.ContentOuter}>
				<div className={css.contentTableOuterDiv}>
					<table>
						<thead>
							<tr className={css.upperTableHeader}>
								{/* Upper Header */}
								{[
									"",
									"",
									"Bill Details",
									"",
									"",
									"Rate",
									"Cess Rate",
									"Taxable Value",
									"Reverse Charge",
									"",
									"Amount",
									"",
									"",
									"Place of Supply (Name Of State)",
								].map((item, ind) => (
									<th key={item + ind}>
										<div>{item}</div>
									</th>
								))}
							</tr>
							<tr className={css.lowerTableHeader}>
								{/* Lower Header */}
								{[
									"GSTIN/UIN",
									"Party Name",
									"No.",
									"Date",
									"Value",
									"",
									"",
									"",
									"",
									"Integrated Tax",
									"Central Tax",
									"State/UT Tax",
									"Cess",
									"",
								].map((item, ind) => (
									<th key={item + ind}>
										<div>{item}</div>
									</th>
								))}
							</tr>
						</thead>

						{purchaseReportData?.length > 0 && (
							<tbody>
								{items?.map((item, ind) => (
									<tr key={ind + item?._id}>
										<td>
											<div>{item?.gstNo || "-"}</div>
										</td>
										<td>
											<div>{item?.partyName || "-"}</div>
										</td>
										<td>
											<div>{item?.invoiceNumber || "-"}</div>
										</td>
										<td>
											<div>
												{new Date(item?.invoiceDate).toLocaleDateString(
													"en-GB"
												)}
											</div>
										</td>
										<td>
											<div style={{ textAlign: "right" }}>
												₹{item?.amount || 0}
											</div>
										</td>
										<td>
											<div style={{ textAlign: "right" }}>
												{item?.taxRate || " "}
											</div>
										</td>
										<td>
											<div style={{ textAlign: "right" }}>
												{item?.cess || 0}
											</div>
										</td>
										<td>
											<div style={{ textAlign: "right" }}>
												₹{item?.amount - item?.taxableValue || 0}
											</div>
										</td>
										<td>
											<div style={{ textAlign: "right" }}>
												₹{item?.reverseCharge || 0}
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
													? (Number(item?.taxableValue) / 2).toFixed(2)
													: 0}
											</div>
										</td>
										<td>
											<div style={{ textAlign: "right" }}>
												₹
												{Number(item?.taxableValue)
													? (Number(item?.taxableValue) / 2).toFixed(2)
													: 0}
											</div>
										</td>
										<td>
											<div style={{ textAlign: "right" }}>
												{item?.cess || 0}
											</div>
										</td>
										<td>
											<div>{item?.stateOfSupply}</div>
										</td>
									</tr>
								))}
							</tbody>
						)}
					</table>

					{purchaseReportData?.length <= 0 && (
						<div className={css.noDataDiv}>
							<p>No data is available for GSTR2 Report.</p>
							<p>Please try again after making relevant changes.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default GSTR2;
