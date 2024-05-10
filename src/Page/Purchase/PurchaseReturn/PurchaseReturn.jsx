import css from "./PurchaseReturn.module.css";
import Setting from "../../../Component/Setting/Setting";
import party from "../../../assets/Images/party.jpg";
import Loader3 from "../../../Component/Loaders/Loader3";
import EditableRow from "../../../Component/EditForm";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import UpperControlPanel from "../../../Component/UpperControlPanel/UpperControlPanel";
import {
	DeletePurchaseReturn,
	GetAllPurchaseReturns,
	UpdatePurchaseReturn,
} from "../../../Redux/purchase/action";
import {
	CloseIcon2,
	DeleteIcon2,
	EditIcon,
	PlusIcon2,
	SearchIcon,
	CalculatorIcon,
	SettingsIconOutline2,
	CrossIcon,
} from "../../../assets/Icons/ReactIcons";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPurchaseReturnForm from "./AddPurchaseReturnForm";

const PurchaseReturn = () => {
	const toast = useToast();
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [editedData, setEditedData] = useState(null);
	const [toggleSetting, setToggleSetting] = useState(false);
	const [items, setItems] = useState();
	const [select, setSelect] = useState();
	const [openForm, setOpenForm] = useState(false);
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
	// Add Purchase Return Toggle
	const toggleAddPaymentReturnSuccess = useSelector(
		(state) => state.PurchaseReducer.toggleAddPaymentReturnSuccess
	);
	// Get All Purchase Bill Loading
	const getAllPaymentReturnLoading = useSelector(
		(state) => state.PurchaseReducer.getAllPaymentReturnLoading
	);
	// Get All Purchase Return Success Toggle
	const getAllPurchaseReturnSuccess = useSelector(
		(state) => state.PurchaseReducer.getAllPurchaseReturnSuccess
	);
	// Purchase Return Data
	const purchaseReturnData = useSelector(
		(state) => state.PurchaseReducer.purchaseReturnData
	);
	useEffect(() => {
		setItems(purchaseReturnData);
	}, [purchaseReturnData]);
	const [paidAmount, setPaidAmount] = useState(0);
	const [unpaidAmount, setUnpaidAmount] = useState(0);

	// To Calculate Paid/Unpaid amounts on getAll Success request
	useEffect(() => {
		let paid = 0;
		let unpaid = 0;
		purchaseReturnData?.forEach((item) => {
			paid += item?.amount || 0;
			unpaid += item?.balanceDue || 0;
		});
		setPaidAmount(paid);
		setUnpaidAmount(unpaid);
	}, [getAllPurchaseReturnSuccess]);

	// To Get All Purchase Bill Data
	useEffect(() => {
		GetAllPurchaseReturns(dispatch, startDate, endDate);
	}, [toggleAddPaymentReturnSuccess, startDate, endDate]);

	// Handle Edit
	const handleEdit = (itemData) => {
		setIsEditing(true);
		setEditedData(itemData);
		// GetSinglePurchaseBillData(dispatch, itemData?.id, toast);
	};

	// Handle Delete
	const handleDelete = (id) => {
		DeletePurchaseReturn(dispatch, id, toast);
	};

	const handleSelect = (e) => {
		setSelect(e.target.value);
	};

	console.log("purchaseReturnData", purchaseReturnData);
	const filterDataByTime = (purchaseReturnData, timeInterval) => {
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
				return purchaseReturnData;
			default:
				// Custom interval handling
				// Assuming timeInterval is in the format "YYYY-MM-DD"
				startDate = new Date(timeInterval);
				// Assuming you want to filter for the whole day
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
		return purchaseReturnData.filter((item) => {
			const itemDate = new Date(item.billDate);
			return itemDate >= startDate && itemDate <= endDate;
		});
	};

	useEffect(() => {
		const data = filterDataByTime(purchaseReturnData, select);
		setItems(data);
	}, [select]);

	const handleSearch = (e) => {
		const query = e.target.value;

		if (query === "") {
			setItems(purchaseReturnData);
		} else {
			const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			const regex = new RegExp(escapedQuery, "i");
			const filteredInvoice = purchaseReturnData.filter((item) =>
				regex.test(item.partyName)
			);
			setItems(filteredInvoice);
		}
	};

	// Update Function
	const handleUpdate = (updatedData) => {
		UpdatePurchaseReturn(
			dispatch,
			updatedData?._id,
			updatedData,
			toast,
			setIsEditing,
			setEditedData
		);
	};

	// Handle CancelEditing
	const handleCancel = () => {
		setIsEditing(false);
		setEditedData(null);
	};
	useEffect(() => {
		const filteredData = purchaseReturnData.filter((item) => {
			// Convert item.invoiceDate to Date object
			const invoiceDate = new Date(item.date);
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
 

	return getAllPaymentReturnLoading ? (
		<Loader3 text="Loading Purchase Returns" />
	) : (
		<div className={css.Outer}>
			{toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

			{/* Add Purchase Return Form */}
			{openForm && (
				<div className={css.formOuter}>
					<div className={css.upperNav}>
						<div>
							<p className={css.activeForm}>
								<span>Purchase Return #1</span>
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
					<AddPurchaseReturnForm setOpenForm={setOpenForm} />
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
						<option value="All">All Payment</option>
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
			{purchaseReturnData?.length > 0 ? (
				<div className={css.ContentOuter}>
					<div className={css.contentUpperNav}>
						<div className={css.leftSideDivSaleOuter}>
							<p>TRANSACTIONS</p>
							<div className={css.saleOrderSearchDiv}>
								<SearchIcon />
								<div>
									<input
										type="text"
										onChange={handleSearch}
										placeholder="Search..."
									/>
								</div>
							</div>
						</div>
						<div>
							<button
								type="button"
								onClick={() => setOpenForm(true)}
								className={css.addBtnCss}
							>
								<PlusIcon2 /> Add Purchase
							</button>
						</div>
					</div>

					<div className={css.contentTableOuterDiv}>
						<table>
							<thead>
								<tr>
									{[
										"#",
										"DATE",
										"RETURN NO.",
										"PARTY NAME",
										// "CATEGORY NAME",
										"TYPE",
										"TOTAL",
										"RECIEVED",
										"BALANCE DUE",
										"STATUS",
										"ACTION",
									].map((item, ind) => (
										<th key={item + ind}>
											<div>{item}</div>
										</th>
									))}
								</tr>
							</thead>

							<tbody>
								{!getAllPaymentReturnLoading &&
									items?.map((item, ind) =>
										isEditing && editedData?._id == item._id ? (
											<tr
												style={{
													width: "80%",
													position: "relative",
												}}
												key={item?._id + ind}
											>
												<EditableRow
													display={[
														"#",
														"billDate",
														"refNo",
														"partyName",
														//"category",
														"type",
														"total",
														"recieve",
														"balance",
													]}
													data={editedData}
													onSave={handleUpdate}
													onCancel={handleCancel}
												/>
											</tr>
										) : (
											<tr key={item?._id + ind}>
												<td>{ind + 1}</td>
												<td>
													{new Date(item?.billDate).toLocaleDateString(
														"en-IN",
														{
															day: "2-digit",
															month: "2-digit",
															year: "numeric",
														}
													)}
												</td>
												<td>{item?.returnNumber || "-"}</td>
												<td>{item?.partyName}</td>
												{/* <td>{item?.categoryName || "-"}</td> */}
												<td style={{ textAlign: "right" }}>{item?.type}</td>
												<td style={{ textAlign: "right" }}>
													₹{item?.amount || 0}
												</td>
												<td style={{ textAlign: "right" }}>
													₹{item?.paymentType[0]?.amount || 0}
												</td>
												<td style={{ textAlign: "right" }}>
													₹{item?.amount - item?.paymentType[0]?.amount || 0}
												</td>
												<td>{item?.status}</td>
												<td>
													<div className={css.actionDivContent}>
														<button onClick={() => handleDelete(item._id)}>
															<DeleteIcon2 />
														</button>
														<button onClick={() => handleEdit(item)}>
															<EditIcon />
														</button>
													</div>
												</td>
											</tr>
										)
									)}
							</tbody>
						</table>
					</div>
				</div>
			) : (
				<FirstTimeFormToggle
					marginTop="10px"
					height="61.25vh"
					img={party}
					onClick={() => setOpenForm(true)}
					BtnText="Make Your First Purchase Return"
					MiddleText="No data is available for Debit-Note. Please try again after making relevant changes."
				/>
			)}
		</div>
	);
};

export default PurchaseReturn;
