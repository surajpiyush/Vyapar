import React, { useState } from "react";
import "./AllParties.css";
import ExcelDownloadButton from "../../../components/excel/DownloadExcel";
import PDFDownloadButton from "../../../components/pdf/DownloadPdf";
import { SearchIcon } from "../../../assets/Icons/ReactIcons";
const AllParties = () => {
	const [check, setCheck] = useState();
	const [show, setShow] = useState(false);
	const [items, setItems] = useState();
	const handleCheck = (e) => {
		setCheck(e.target.value);
		setShow(!show);
	};

	const relevantFields = [];
	return (
		<div>
			<div className="headers">
				<label style={{ marginLeft: "20px" }}>
					<input type="checkbox" value={check} onChange={handleCheck} />
					<span></span> Date Filter
				</label>
				<label style={{ marginLeft: "20px" }}>
					{show && <input type="date" name="date" id="" />}
				</label>
				<label style={{ marginLeft: "20px", borderRadius: "5px" }}>
					<select>
						<option value="All Parties">All Parties</option>
						<option value="Receviable">Receviable</option>
						<option value="Payable">Payable</option>
					</select>
				</label>

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

			<div className="saleOrderSearchDiv">
				<SearchIcon fontSize='20px' />
				<div>
					<input type="text" placeholder="Search..." />
				</div>
			</div>

<div>

<table>
    <thead>
        <tr   >
            <th>#</th>
            <th style={{marginLeft:"20px"}}>PARTY NAME</th>
            <th>EMAIL</th>
            <th>PHONE NO.</th>
            <th>RECEIVABLE BALANCE</th>
            <th>PAYABLE BALANCE</th>
            <th>CREDIT LIMIT</th>
        </tr>
    </thead>
</table>

</div>

		</div>
	);
};

export default AllParties;
