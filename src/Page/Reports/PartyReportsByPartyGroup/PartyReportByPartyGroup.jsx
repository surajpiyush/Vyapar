import React, { useState } from "react";
import JSONDownloadButton from "../../../components/json/DownloadJsonFormate";
import ExcelDownloadButton from "../../../components/excel/DownloadExcel";
import "./PartyReportByPartyGroup.css";
const PartyReportByPartyGroup = () => {
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
	const items = [];
	const relevantFields = [];
	const handleSelect = {};
	return (
		<div>
			<div className="topNavOuter">
				<div className="navTopADiv">
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
					<select defaultValue="ALL FIRMS" className="navFirmsSelectTag">
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
					</div>
				</div>
			</div>

			<div className="contentTableOuterDiv">
				<table>
					<thead>
						<tr>
							{["#", "GROUP NAME", "SALE AMOUNT", "PURCHASE AMOUNT"].map(
								(item, ind) => (
									<th key={item + ind}>
										<div>{item}</div>
									</th>
								)
							)}
						</tr>
					</thead>

					{!items && items?.length > 0 && (
						<tbody>
							{items?.map((item, ind) => (
								<tr key={ind + item?._id}>
									<td>
										<div>{ind + 1}</div>
									</td>
									<td>
									<div>{item?.partyName}</div>
									</td>
									<td>
										<div>{item?.invoiceNumber}</div>
									</td>
									<td>
										<div>{item?.partyName}</div>
									</td>
								</tr>
							))}
						</tbody>
					)}
				</table>
			</div>
		</div>
	);
};

export default PartyReportByPartyGroup;
