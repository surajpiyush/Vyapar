import React, { useState } from "react";
import "./ProfitLoss.css";
import ExcelDownloadButton from "../../../components/excel/DownloadExcel";
import PDFDownloadButton from "../../../components/pdf/DownloadPdf";
const ProfitLossReport = () => {
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

	// Data for the profit and loss report
	const data = [
		{ Particulars: "Sale (+)", Amount: "₹ 14.00" },
		{ Particulars: "Credit Note (-)", Amount: "₹ 0.00" },
		{ Particulars: "Sale FA (+)", Amount: "₹ 0.00" },
		{ Particulars: "Purchase (-)", Amount: "₹ 6,87,462.00" },
		{ Particulars: "Debit Note (+)", Amount: "₹ 0.00" },
		{ Particulars: "Purchase FA (-)", Amount: "₹ 0.00" },
		{ Particulars: "Direct Expenses(-)", Amount: "" },
		{ Particulars: "Other Direct Expenses (-)", Amount: "₹ 0.00" },
		{ Particulars: "Payment-in Discount (-)", Amount: "₹ 0.00" },
		{ Particulars: "Tax Payable (-)", Amount: "" },
		{ Particulars: "GST Payable (-)", Amount: "₹ 0.09" },
		{ Particulars: "TCS Payable (-)", Amount: "₹ 0.00" },
		{ Particulars: "Tax Receivable (+)", Amount: "" },
		{ Particulars: "GST Receivable (+)", Amount: "" },
	];
	const relevantFields = [
		"Sale (+)",
		"Credit Note (-)",
		"Sale FA (+)",
		"Purchase (-)",
		"Debit Note (+)",
		"Purchase FA (-)",
		"Direct Expenses(-)",
		"Other Direct Expenses (-)",
		"Payment-in Discount (-)",
		"Tax Payable (-)",
		"GST Payable (-)",
		"TCS Payable (-)",
	];
	return (
		<div>
			<div style={{ padding: "10px 10px", backgroundColor: "white" }}>
				<div className="icon">
					<div className="divContainingDateInps">
						<h3>From</h3>
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
					<div style={{ marginLeft: "550px" }}>
						<ExcelDownloadButton data={data} />
						<p style={{ paddingRight: "20px" }}>Excel Reports</p>
					</div>

					<div style={{ marginRight: "25px" }}>
						<PDFDownloadButton
							data={data}
							fields={relevantFields}
							title={"All Profit Loss Report"}
							totalText="Total"
						/>
						<p>Print</p>
					</div>
				</div>
				<h5>Profit and Loss Report</h5>
			</div>

			<table>
				<thead>
					<tr>
						<div className="header">
							{" "}
							<th style={{ marginRight: "500px", marginLeft: "10px" }}>
								Particulars
							</th>
							<th style={{ marginLeft: "450px" }}>Amount</th>
						</div>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={index}>
							<div className="profitLossContainer">
								{" "}
								<div>
									<td style={{ paddingLeft: "10px" }}>{item.Particulars}</td>
								</div>
								<div>
									<td>{item.Amount}</td>
								</div>
							</div>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProfitLossReport;
