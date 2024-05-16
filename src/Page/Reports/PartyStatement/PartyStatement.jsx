import React, { useState } from "react";
import ExcelDownloadButton from "../../../components/excel/DownloadExcel";
import PDFDownloadButton from "../../../components/pdf/DownloadPdf";
import "./PartyStatement.css";
const PartyStatement = () => {
	const [select, setSelect] = useState();
	const [selectedOption, setSelectedOption] = useState("");
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
	const handleSelect = (e) => {
		setSelect(e.target.value);
	};
	const relevantFields = [];
	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
	};
	return (
		<div>
			<div className="topNavOuter">
				<div className="navTopADiv">
					<select
						defaultValue="All"
						onChange={handleSelect}
						style={{
							backgroundColor: "#e0ded7",
							borderRadius: "5px",
							height: "30px",
							marginTop: "20px",
						}}
					>
						<option value="All">All Reports</option>
						<option value="This Month">This Month</option>
						<option value="Last Month">Last Month</option>
						<option value="This Quarter">This Quarter</option>
						<option value="This Year">This Year</option>
					</select>

					<div className="divContainingDateInps">
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
					<label
						style={{ height: "35px", marginTop: "22px", borderStyle: "solid" }}
					>
						<input style={{ height: "25px" }} placeholder="     Select Party" />
					</label>
					<div
						style={{
							display: "flex",
							justifyContent: "space-around",
							marginLeft: "250px",
						}}
					>
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
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						width: "25%",
					}}
				>
					View:
					<label
						style={{ borderStyle: "solid", border: "5px", color: "black" }}
					>
						<input
							type="radio"
							name="options"
							value="option1"
							checked={selectedOption === "option1"}
							onChange={handleOptionChange}
						/>
						Vyapar<label></label>
					</label>
					<label>
						<input
							type="radio"
							name="options"
							value="option2"
							checked={selectedOption === "option2"}
							onChange={handleOptionChange}
						/>
						Accounting
					</label>
				</div>
			</div>

			<table>
				<thead>
					<tr className="headers">
						<th style={{ marginRight: "12px", padding: "1px" }}>DATE</th>
						<th style={{ marginLeft: "12px", padding: "1px" }}>TXN TYPE</th>
						<th style={{ marginLeft: "12px", padding: "1px" }}>REF NO</th>
						<th style={{ marginLeft: "12px", padding: "1px" }}>PAYMENT TYPE</th>
						<th style={{ marginLeft: "12px", padding: "1px" }}>TOTAL</th>
						<th style={{ marginLeft: "12px", padding: "1px" }}>RECEIVED/PAID</th>
						<th style={{ marginLeft: "12px", padding: "1px" }}>TXN BALANCE</th>
						<th style={{ marginLeft: "12px", padding: "1px" }}>RECEIVED BALANCE</th>
						<th style={{ marginLeft: "12px", padding: "1px" }}>PAYABLE BALANCE</th>
						<th style={{ marginLeft: "12px", padding: "1px" }}>PRINT/SHARE</th>
					</tr>
				</thead>
			</table>
		</div>
	);
};

export default PartyStatement;
