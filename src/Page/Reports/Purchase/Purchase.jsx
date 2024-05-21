import * as XLSX from "xlsx";
import css from "./Purchase.module.css";
import Loader2 from "../../../Component/Loaders/Loader2";
import Setting from "../../../Component/Setting/Setting";
import Loader3 from "../../../Component/Loaders/Loader3";
import RPLayout1 from "../../../Component/PrintLayouts/RPLayout1";
import RPLayout2 from "../../../Component/PrintLayouts/RPLayout2";
import InvoicePrint from "../../../Component/PrintLayouts/InvoicePrint";
import AddPurchaseBill from "../../Purchase/PurchaseBill/AddPurchaseBill";
import UpperControlPanel, {
	GetMonthName,
} from "../../../Component/UpperControlPanel/UpperControlPanel";
import { GetAllItems } from "../../../Redux/items/actions";
import { REGULAR_PRINTER_DATA } from "../../../Redux/store";
import { TOGGLE_FALSE_INVOICE_SUCCESS } from "../../../Redux/sales/reducer";
import { FormatDate } from "../../../Redux/sales/action";
import {
	CloseIcon2,
	DeleteIcon2,
	EditIcon,
	PrintIcon2,
	PlusIcon2,
	SearchIcon,
	CalculatorIcon,
	SettingsIconOutline2,
	CrossIcon,
} from "../../../assets/Icons/ReactIcons";
import { GetPurchaseReport } from "../../../Redux/report/action";

import { useToast } from "@chakra-ui/react";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExcelDownloadButton from "../../../components/excel/DownloadExcel";
import PDFDownloadButton from "../../../components/pdf/DownloadPdf";
import JSONDownloadButton from './../../../components/json/DownloadJsonFormate';

const Purchase = () => {
	const toast = useToast();
	const dispatch = useDispatch();
	const [items, setItems] = useState();
	const [select, setSelect] = useState();
	let printComponentRef = useRef();
	const [openForm, setOpenForm] = useState(false);
	const [toggleSetting, setToggleSetting] = useState(false);
	const [startDate, setStartDate] = useState("2024-02-01");
	const [endDate, setEndDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	const [paidAmount, setPaidAmount] = useState(0);
	const [unpaidAmount, setUnpaidAmount] = useState(0);
	const toggleAddPurchaseBill = useSelector(
		(store) => store.PurchaseReducer.toggleAddPurchaseBill
	);
	const LoadingGetPurchaseReport = useSelector(
		(store) => store.ReportReducer.isLoading
	);
	const purchaseReportData = useSelector(
		(store) => store.ReportReducer.purchaseReportData
	);
	const toggleGetPurchaseReportSuccess = useSelector(
		(store) => store.ReportReducer.toggleGetPurchaseReportSuccess
	);
	const toggleItems = useSelector((store) => store.ItemReducer.toggleItems);
	const loadingSingleInvoice = useSelector(
		(store) => store.SalesReducer.loadingSingleInvoice
	);
	const toggleSingleInvoiceSuccess = useSelector(
		(store) => store.SalesReducer.toggleSingleInvoiceSuccess
	);
	const SingleInvoiceData = useSelector(
		(store) => store.SalesReducer.SingleInvoiceData
	);
	useEffect(() => {
		setItems(purchaseReportData);
	}, [purchaseReportData]);
	//   This useEffect is written to get all items data to extract item names ********************************
	useEffect(() => {
		GetAllItems(dispatch);
	}, [toggleItems]);
	// ********************************************************************************8
	console.log("purchaseReportData", purchaseReportData);
	useEffect(() => {
		// console.log("purchaseReportData", purchaseReportData);
	}, [purchaseReportData]);

	// Calculate Paid and Unpaid upon successfull getting data
	useEffect(() => {
		let paid = 0;
		let unpaid = 0;
		purchaseReportData?.forEach((item) => {
			paid += item?.amount || 0;
			unpaid += item?.balanceDue || 0;
		});
		setPaidAmount(paid);
		setUnpaidAmount(unpaid);
	}, [toggleGetPurchaseReportSuccess]);

	// To fetch Invoices data
	useEffect(() => {
		GetPurchaseReport(dispatch, startDate, endDate);
	}, [toggleAddPurchaseBill, startDate, endDate]);

	const formOpen = () => {
		setOpenForm(true);
	};

	const handleSelect = (e) => {
		setSelect(e.target.value);
	};

	const handleSearch = (e) => {
		const query = e.target.value;
		if (query === "") {
			setItems(purchaseReportData);
		} else {
			const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			const regex = new RegExp(escapedQuery, "i");
			const filteredInvoice = purchaseReportData.filter((item) =>
				regex.test(item.partyName)
			);
			setItems(filteredInvoice);
		}
	};

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
		setItems(data);
	}, [select]);

	// ***************** Download Excel For ********************************
	const excelDownload = async () => {
		const startDateParts = startDate.split("-");
		const endDateParts = endDate.split("-");
		const formattedStartDate = `${startDateParts[2]}-${GetMonthName(
			startDateParts[1]
		)}`;
		const formattedEndDate = `${endDateParts[2]}-${GetMonthName(
			endDateParts[1]
		)}`;
		const formattedFileName = `Purchase_Report_Data_${formattedStartDate}_${formattedEndDate}_09AEIPT7331R1ZJ.xlsx`;

		const workbook = XLSX.utils.book_new();

		// Current date and time
		const currentDate = new Date();
		const formattedCurrentDateTime = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
		const currentDateRow = ["Report generated on:", formattedCurrentDateTime];

		const purchaseReportDataData = purchaseReportData.map((item) => [
			item?.invoiceDate,
			"",
			item?.invoiceNumber,
			item?.partyName,
			"",
			item?.transactionType,
			item?.amount,
			item?.paymentType[0],
			(item?.amount - item?.balanceDue).toFixed(2),
			item?.balanceDue,
			item?.dueDate,
			item?.status,
			item?.description,
		]);

		const tableData2 = purchaseReportData.map((item) => [
			item?.invoiceDate, // Date
			item?.invoiceNumber, // Invoice No./Txn No.
			item?.partyName, // Party Name
			item.itemName, // Item Name
			item.itemCode, // Item Code
			"", // HSN/SAC (add your value here)
			item.category, // Category
			"", // MRP (add your value here)
			"", // Batch No. (add your value here)
			"", // Exp. Date (add your value here)
			"", // Mfg. Date (add your value here)
			"", // Model No. (add your value here)
			"", // Count (add your value here)
			item.description, // Description
			"", // Size (add your value here)
			"", // Quantity (add your value here)
			"", // Unit (add your value here)
			"", // UnitPrice (add your value here)
			"", // Discount Percent (add your value here)
			"", // Discount (add your value here)
			"", // Tax Percent (add your value here)
			"", // Tax (add your value here)
			"", // Cess (add your value here)
			item?.transactionType, // Transaction Type
			"", // Amount (add your value here)
		]);

		// Calculate totals
		const totalRow = purchaseReportDataData.reduce(
			(acc, curr) => {
				acc[6] += Number(curr[6]); // Total Amount
				acc[8] += Number(curr[8]);
				acc[9] += Number(curr[9]);
				return acc;
			},
			[, , , "Total", "", "", 0, "", 0, 0, "", "", ""]
		);

		const worksheet = XLSX.utils.aoa_to_sheet([
			[...currentDateRow],

			[""],
			[
				"Date",
				"Order No.",
				"Invoice No",
				"Party Name",
				"Party Phone No.",
				"Transaction Type",
				"Total Amount",
				"Payment Type",
				"Received/Paid Amount",
				"Balance Due",
				"Due Date",
				"Status",
				"Description",
			],
			...purchaseReportDataData,
			[], // Empty row
			["", "", "", "", "", "", "", "", "", "", "", "", ""], // Empty row for totals
		]);

		const worksheet2 = XLSX.utils.aoa_to_sheet([
			[...currentDateRow],
			[""],
			[
				"Date",
				"Invoice No./Txn No.",
				"Party Name",
				"Item Name",
				"Item Code",
				"HSN/SAC",
				"Category",
				"MRP",
				"Batch No.",
				"Exp. Date",
				"Mfg. Date",
				"Model No.",
				"Count",
				"Description",
				"Size",
				"Quantity",
				"Unit",
				"UnitPrice",
				"Discount Percent",
				"Discount",
				"Tax Percent",
				"Tax",
				"Cess",
				"Transaction Type",
				"Amount",
			],
			...tableData2,
			[], // Empty row
			["", "", "", "", "", "", "", "", "", "", "", "", ""], // Empty row for totals
			["Total:"], // Label for total row
		]);

		// Calculate totals for the second sheet
		const totalRow2 = tableData2.reduce(
			(acc, curr) => {
				// Add your logic to calculate totals for the second sheet here
				return acc;
			}
			//  [, , , "Total", "", "", 0, "", 0, 0, "", "", ""]
		);

		// Append total rows to each worksheet
		XLSX.utils.sheet_add_aoa(worksheet, [totalRow], { origin: -1 });
		XLSX.utils.sheet_add_aoa(worksheet2, [totalRow2], { origin: -1 });

		XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Report");
		XLSX.utils.book_append_sheet(workbook, worksheet2, "Item Details");
		XLSX.writeFile(workbook, formattedFileName);
	};

	// ***************************** Print ************************************
	const handlePrint = useReactToPrint({
		content: () => printComponentRef.current,
		onBeforePrint: () => dispatch(TOGGLE_FALSE_INVOICE_SUCCESS()),
	});
	const updateSalePrintSettings = useSelector(
		(store) => store.PurchaseReducer.updateSalePrintSettings
	);
	const [storedPrintData, setStoredPrintData] = useState(
		JSON.parse(sessionStorage.getItem(REGULAR_PRINTER_DATA)) || {}
	);
	// for updating printer settings
	useEffect(() => {
		const sessionStorageData =
			JSON.parse(sessionStorage.getItem(REGULAR_PRINTER_DATA)) || {};
		setStoredPrintData((prev) => {
			return { ...prev, ...sessionStorageData };
		});
	}, [updateSalePrintSettings]);
	// for updating print item details
	useEffect(() => {
		if (toggleSingleInvoiceSuccess == true) {
			handlePrint();
		}
	}, [toggleSingleInvoiceSuccess]);
	// *********************************************************************************

	useEffect(() => {
		const filteredData = purchaseReportData.filter((item) => {
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

	const relevantFields = [
		"invoiceNumber",
		"partyName",
		"invoiceDate",
		"amount",
		"balanceDue",
		"status",
	];

	return LoadingGetPurchaseReport ? (
		<Loader3 text="Loading Sale Report" />
	) : (
		<div className={css.Outer}>
			{toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

			{/* Print */}
			{loadingSingleInvoice ? (
				<Loader2 />
			) : (
				<div
					style={{
						display: "none",
					}}
				>
					<div ref={printComponentRef}>
						{storedPrintData?.layoutIndex == 0 ? (
							<InvoicePrint currPrintItem={SingleInvoiceData} />
						) : storedPrintData?.layoutIndex == 1 ? (
							<RPLayout2 currPrintItem={SingleInvoiceData} />
						) : (
							<RPLayout1 currPrintItem={SingleInvoiceData} />
						)}
					</div>
				</div>
			)}

			{/* Add Purchase Bill Form */}
			{openForm && (
				<div className={css.formOuter}>
					<div className={css.upperNav}>
						<div>
							<p className={css.activeForm}>
								<span>Purchase Bill #1</span>
								<CrossIcon />
							</p>
						</div>
						<div>
							<CalculatorIcon
								onClick={() =>
									toast({
										title: "Feature currently in development",
										status: "info",
										position: "top",
									})
								}
							/>
							<SettingsIconOutline2 onClick={() => setToggleSetting(true)} />
							<CloseIcon2 onClick={() => setOpenForm(false)} />
						</div>
					</div>
					<AddPurchaseBill
						setOpenForm={setOpenForm}
						// date={{ startDate, endDate }}
					/>
				</div>
			)}

			{/* Top Nav */}
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
								title={"Purchase Report"}
								totalText="Total Purchase"
							/>
							<p
								style={{
									fontSize: "10px",
									fontWeight: "bold",
									marginLeft: "5px",
								}}
							>
								Print
							</p>
						</div>
                 
					</div>
				</div>
				<div className={css.navTopBDiv}>
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
				</div>
			</div>

			{/* Middle */}
			<div className={css.ContentOuter}>
				<div className={css.contentUpperNav}>
					<div className={css.leftSideDivSaleOuter}>
						<p>TRANSACTIONS</p>
						<div className={css.saleOrderSearchDiv}>
							<SearchIcon />
							<div>
								<input
									type="text"
									
									placeholder="Search..."
								/>
							</div>
						</div>
					</div>
					<div>
						<button type="button" onClick={formOpen} className={css.addBtnCss}>
							<PlusIcon2 /> Add Purchase
						</button>
					</div>
				</div>

				{/* Table */}
				<div className={css.contentTableOuterDiv}>
					<table>
						<thead>
							<tr>
								{[
									"DATE",
									"INVOICE NO.",
									"PARTY NAME",
									"TRANSACTION TYPE",
									"PAYMENT TYPE",
									"AMOUNT",
									"BALANCE",
								].map((item, ind) => (
									<th key={item + ind}>
										<div>{item}</div>
									</th>
								))}
							</tr>
						</thead>

						{!LoadingGetPurchaseReport && purchaseReportData?.length > 0 && (
							<tbody>
								{items?.map((item, ind) => (
									<tr key={ind + item?._id}>
										<td>
											<div>{FormatDate(item?.invoiceDate)}</div>
										</td>
										<td>
											<div>{item?.invoiceNumber}</div>
										</td>
										<td>
											<div>{item?.partyName}</div>
										</td>
										<td>
											<div>{item?.transactionType}</div>
										</td>
										<td>
											<div>
												{Array.isArray(item?.paymentType)
													? item?.paymentType
															?.map((payItem) =>
																payItem.types ? payItem.types : "-"
															)
															.join(", ")
													: "-"}
											</div>
										</td>
										<td>
											<div style={{ textAlign: "right" }}>₹{item?.amount}</div>
										</td>
										<td>
											<div style={{ textAlign: "right" }}>
												₹{item?.balanceDue}
											</div>
										</td>
										{/* <td>
                      <div>{item?.status}</div>
                    </td> */}
									</tr>
								))}
							</tbody>
						)}
					</table>
					{!LoadingGetPurchaseReport && purchaseReportData?.length <= 0 && (
						<div className={css.noDataDiv}>
							<p>No transactions to show</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Purchase;
