import React, { useState } from "react";
import ExcelDownloadButton from "../../../components/excel/DownloadExcel";
import PDFDownloadButton from "../../../components/pdf/DownloadPdf";
import "./BalanceSheet.css";
const BalanceSheet = () => {
	const [startDate, setStartDate] = useState("2024-02-01");
	const [endDate, setEndDate] = useState(
		new Date().toISOString().split("T")[0]
	);
const handleSelect=()=>{

}

	const items = [];
	const relevantFields = [];
	return (
		<div>
			<div className="header">
				<h3>Balance Sheet</h3>
				<label style={{ display: "flex", marginLeft: "700px" }}>
					<div>
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
				</label>
			</div>
			<div className="middle">
				<div className="navTopADiv">
					Period:<select
						defaultValue="All"
						onChange={handleSelect}
						
					>
						<option value="All">All</option>
						<option value="This Month">This Month</option>
						<option value="Last Month">Last Month</option>
						<option value="This Quarter">This Quarter</option>
						<option value="This Year">This Year</option>
					</select>

				
						
						<div className="divContainingDateInps">
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
				<div>
<input type=''  />

				</div>
				
			</div>
		</div>
	);
};

export default BalanceSheet;
