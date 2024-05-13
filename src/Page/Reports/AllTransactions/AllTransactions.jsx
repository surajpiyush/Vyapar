import css from "./AllTransactions.module.css";
import Loader2 from "../../../Component/Loaders/Loader2";
import Setting from "../../../Component/Setting/Setting";
import Loader3 from "../../../Component/Loaders/Loader3";
import RPLayout1 from "../../../Component/PrintLayouts/RPLayout1";
import RPLayout2 from "../../../Component/PrintLayouts/RPLayout2";
import InvoicePrint from "../../../Component/PrintLayouts/InvoicePrint";
import UpperControlPanel, {
	GetMonthName,
} from "../../../Component/UpperControlPanel/UpperControlPanel";
import { REGULAR_PRINTER_DATA } from "../../../Redux/store";
import { TOGGLE_FALSE_INVOICE_SUCCESS } from "../../../Redux/sales/reducer";
import { FormatDate } from "../../../Redux/sales/action";
import { SearchIcon } from "../../../assets/Icons/ReactIcons";
import { GetAllTransactions } from "../../../Redux/report/action";

import { useToast } from "@chakra-ui/react";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JSONDownloadButton from "../../../components/json/DownloadJsonFormate";
import ExcelDownloadButton from "../../../components/excel/DownloadExcel";
import PDFDownloadButton from "../../../components/pdf/DownloadPdf";

const AllTransactions = () => {
	const toast = useToast();
	const dispatch = useDispatch();
	let printComponentRef = useRef();
	const [items, setItems] = useState();
	const [paidAmount, setPaidAmount] = useState(0);
	const [unpaidAmount, setUnpaidAmount] = useState(0);
	const [toggleSetting, setToggleSetting] = useState(false);
	const [transactionData, setTransactionData] = useState([]);
	const [select, setSelect] = useState();
	const [startDate, setStartDate] = useState("2024-02-01");
	const [endDate, setEndDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	const [filterOption, setFilterOption] = useState("All Transaction");
	const [filteredData, setFilteredData] = useState([]);
	const LoadingGetAllTransactions = useSelector(
		(store) => store.ReportReducer.isLoading
	);
	const allTransactionsData = useSelector(
		(store) => store.ReportReducer.allTransactionsData
	);
	const toggleGetAllTransactionsSuccess = useSelector(
		(store) => store.ReportReducer.toggleGetAllTransactionsSuccess
	);
	const loadingSingleInvoice = useSelector(
		(store) => store.SalesReducer.loadingSingleInvoice
	);
	const toggleSingleInvoiceSuccess = useSelector(
		(store) => store.SalesReducer.toggleSingleInvoiceSuccess
	);
	const SingleInvoiceData = useSelector(
		(store) => store.SalesReducer.SingleInvoiceData
	);
	const filterOptions = [
		"All Transaction",
		"Sale",
		"Purchase",
		"Payment-In",
		"Payment-Out",
		"Credit Note",
		"Debit Note",
		"Sale Order",
		"Purchase Order",
		"Estimate",
		"Delivery Challan",
		"Expense",
		"Party to Party [Received]",
		"Party to Party [Paid]",
		"Manufacturer",
		"Sale FA",
		"Purchase FA",
		"Sale [Cancelled]",
	];

	useEffect(() => {
		let paid = 0;
		let unpaid = 0;
		transactionData?.forEach((item) => {
console.log("this si items",item)

			paid += item.total?item.total:0 
			unpaid += item?.balanceDue || 0;
		});
		setPaidAmount(paid);
		setUnpaidAmount(unpaid);
	}, [allTransactionsData]);
	useEffect(() => {
		const extractedData = allTransactionsData?.flatMap((data) => [
			...(Array.isArray(data?.PuchaseBill[0]?.PuchaseBill)
				? data.PuchaseBill[0].PuchaseBill
				: []),
			...(Array.isArray(data?.PuchaseReturn[0]?.PuchaseReturn)
				? data.PuchaseReturn[0].PuchaseReturn
				: []),
			...(Array.isArray(data?.PurchaseOut[0]?.purchaseout)
				? data.PurchaseOut[0].purchaseout
				: []),
			...(Array.isArray(data?.purchaseOrder[0]?.purchaseOrder)
				? data.purchaseOrder[0].purchaseOrder
				: []),
			...(Array.isArray(data?.saleDeliverychallans[0]?.saleDeliverychallans)
				? data.saleDeliverychallans[0].saleDeliverychallans
				: []),
			...(Array.isArray(data?.PaymentIn[0]?.PaymentIn)
				? data.PaymentIn[0].PaymentIn
				: []),
			...(Array.isArray(data?.SaleCash[0]?.SaleCash)
				? data.SaleCash[0].SaleCash
				: []),
			...(Array.isArray(data?.SaleOrder[0]?.SaleOrder)
				? data.SaleOrder[0].SaleOrder
				: []),
			...(Array.isArray(data?.SalereturnCredit[0]?.SalereturnCredit)
				? data.SalereturnCredit[0].SalereturnCredit
				: []),
			...(Array.isArray(data?.ExpensesWithGst[0]?.ExpensesWithGst)
				? data.ExpensesWithGst[0].ExpensesWithGst
				: []),
			...(Array.isArray(data?.ExpensesWithOutGst[0]?.ExpensesWithOutGst)
				? data.ExpensesWithOutGst[0].ExpensesWithOutGst
				: []),
		]);
		extractedData?.sort((a, b) => new Date(a.date) - new Date(b.date));
		setTransactionData(extractedData);
	}, [toggleGetAllTransactionsSuccess]);
	//  console.log(transactionData);
	// To fetch Invoices data
	useEffect(() => {
		GetAllTransactions(dispatch, startDate, endDate);
	}, [startDate, endDate]);

	// *********&************&********************
	useEffect(() => {
		// Filter logic based on filterOption
		if (filterOption === "All Transaction") {
			setFilteredData(transactionData);
		} else {
			const filtered = transactionData.filter(
				(item) => item.type === filterOption
			);
			setFilteredData(filtered);
			console.log(filtered);
		}
	}, [transactionData, filterOption]);

	const handleSelect = (e) => {
		setSelect(e.target.value);
	};

	

	const filterDataByTime = (transactionData, timeInterval) => {
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
				return transactionData;
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
		return transactionData.filter((item) => {
			const itemDate = new Date(item.date);
			return itemDate >= startDate && itemDate <= endDate;
		});
	};

	useEffect(() => {
		const data = filterDataByTime(transactionData, select);
		setItems(data);
	}, [select]);

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
	const relevantFields = [
		"date",
		"name",
		"received",
		"refNo",
		"status",
		"total",
		"type",
	];
	useEffect(() => {
		setItems(filteredData);
	}, [filteredData]);
	console.log("this is allTransactionsData", filteredData);
   const handleSearch = (e) => {
		const query = e.target.value;
		if (query === "") {
			setItems(filteredData);
		} else {
			const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			const regex = new RegExp(escapedQuery, "i");
			const filteredInvoice = filteredData.filter((item) =>
				regex.test(item.name)
			);
			setItems(filteredInvoice);
		}
	};
	return LoadingGetAllTransactions ? (
		<Loader3 text="Loading All Transactions" />
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
						<div style={{ marginRight: "30px" }}>
							<JSONDownloadButton data={items} />
							<p style={{ fontSize: "10px", fontWeight: "bold" }}>Json</p>
						</div>
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
								title={"All Transactions Report"}
								totalText="Total"
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
						<div className={css.saleOrderSearchDiv}>
							<SearchIcon />
							<div>
								<input type="text" placeholder="Search..." onChange={handleSearch} />
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
									"DATE",
									"REF NO.",
									"PARTY NAME",
									"TYPE",
									"TOTAL",
									"RECEIVED",
									"BALANCE",
									// "PRINT/SHARE",
								].map((item, ind) => (
									<th key={item + ind}>
										<div>{item}</div>
									</th>
								))}
							</tr>
						</thead>

						{!LoadingGetAllTransactions && filteredData?.length > 0 && (
							<tbody>
								{items?.map((item, ind) => (
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
										<td>
											<div style={{ textAlign: "right" }}>
												₹{item?.balance || 0}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						)}
					</table>
					{!LoadingGetAllTransactions &&
						(transactionData?.length <= 0 || filteredData?.length <= 0) && (
							<div className={css.noDataDiv}>
								<p>No data is available for {filterOption}.</p>
								<p>Please try again after making relevant changes.</p>
							</div>
						)}
				</div>
			</div>
		</div>
	);
};

export default AllTransactions;
