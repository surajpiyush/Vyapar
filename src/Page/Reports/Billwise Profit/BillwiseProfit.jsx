import React, { useState } from "react";
import "./BillwiseProfit.css";
import ExcelDownloadButton from "../../../components/excel/DownloadExcel";
import PDFDownloadButton from "../../../components/pdf/DownloadPdf";
const BillwiseProfit = () => {
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

const data=[]
const relevantFields=[]
	return (
		<div>
			<div className="headerContainer">
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
			</div>

			<table>
				<thead>
					<tr className="headers">
						<th style={{ marginRight: "90px", padding: "1px" }}>DATE</th>
						<th style={{ marginRight: "90px", padding: "1px" }}>INVOICE NO</th>
						<th style={{ marginRight: "90px", padding: "1px" }}>PARTY</th>
						<th style={{ marginRight: "90px", padding: "1px" }}>
							TOTAL SALE AMOUNT
						</th>
						<th style={{ marginRight: "90px", padding: "1px" }}>
							PROFIT(+)/LOSS(-)
						</th>
						<th style={{ marginRight: "90px", padding: "1px" }}>DETAILS</th>
					</tr>
				</thead>
				<tbody>


                    
                </tbody>
			</table>
		</div>
	);
};

export default BillwiseProfit;
