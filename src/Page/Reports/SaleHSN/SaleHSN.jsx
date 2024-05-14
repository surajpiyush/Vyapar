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
import JSONDownloadButton from "../../../components/json/DownloadJsonFormate";
import ExcelDownloadButton from "../../../components/excel/DownloadExcel";
import PDFDownloadButton from "../../../components/pdf/DownloadPdf";

const SaleHSN = () => {
	const toast = useToast();
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const currentDate = new Date();
	const startOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1
	);
	const formattedStartDate = startOfMonth.toISOString().split("T")[0];
	const [startDate, setStartDate] = useState(formattedStartDate);
	const [endDate, setEndDate] = useState(
		new Date().toISOString().split("T")[0])
	const [items, setItems] = useState();
	const [select, setSelect] = useState();
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

  useEffect(() => {
		setData([...saleReturnArr, ...saleInvoiceArr]);
	}, [toggleGetSaleReportSuccess]);
  useEffect(()=>{setItems(data)},[data])
	// To fetch Invoices data
	useEffect(() => {
		GetSaleReport(dispatch, startDate, endDate);
	}, [toggleSalesSuccess, startDate, endDate]);

	const handleSelect = (e) => {
    console.log("this is selct",e.target.value)
		setSelect(e.target.value);
	};

	// for fetching the array data after getting a successfull response

const handleSearch=(e)=>{
  const query= e.target.value
if(query===''){
  setItems(data)
}else{
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedQuery, "i");
  const filteredInvoice = data.filter((item) =>
    regex.test(item.partyName)
  );
  setItems(filteredInvoice);
}
}


const filterDataByTime = (data, timeInterval) => {
  console.log("this is data selected",data,timeInterval)
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
				return data;
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
		return data.filter((item) => {
			const itemDate = new Date(item.invoiceDate);
			return itemDate >= startDate && itemDate <= endDate;
		});
	};

	useEffect(() => {
		const sdata = filterDataByTime(data, select);
		setItems(sdata);
	}, [select]);
	useEffect(() => {
		const filteredData = data.filter((item) => {
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
		"amount",
		"balanceDue",
		"gstNo",
		"invoiceNumber",
		"partyName",
		"stateOfSupply",
		"status",
	];
	return loadingSaleHSN ? (
		<Loader3 text="Loading Sale HSN Report" />
	) : (
		<div className={css.Outer}>
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

			{/* Middle */}
			<div className={css.ContentOuter}>
				<div className={css.contentUpperNav}>
					<div className={css.leftSideDivSaleOuter}>
						<div className={css.saleOrderSearchDiv}>
							<SearchIcon />
							<div>
								<input type="text" onChange={handleSearch} placeholder="Search..."/>
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
								{items?.map((item, ind) => (
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
