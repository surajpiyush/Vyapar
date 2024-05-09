import css from "./DeliveryChallan.module.css";
import party from "../../../assets/Images/party.jpg";
import EditableRow from "../../../Component/EditForm";
import FormDeliveryChallan from "./FormDeliveryChallan";
import Loader3 from "../../../Component/Loaders/Loader3";
import Setting from "../../../Component/Setting/Setting";
import TableDeliveryChallan from "./TableDeliveryChallan";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import {
	GetAllDeliveryChallans,
	deleteAllDeliveryChallan,
} from "../../../Redux/sales/action";
import { PlusIcon2 } from "../../../assets/Icons/ReactIcons";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { CiFilter as FilterIcon } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";

export default function SalesDeliveryChallan() {
	const [isEditing, setIsEditing] = useState(false);
	const [editedData, setEditedData] = useState(null);
	const toast = useToast();
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const isError = useSelector((state) => state.SalesReducer.isError);
	const isLoading = useSelector((state) => state.SalesReducer.isLoading);
	const toggleDeliveryChallan = useSelector(
		(state) => state.SalesReducer.toggleDeliveryChallan
	);
	const deliveryChallanList = useSelector(
		(state) => state.SalesReducer.deliveryChallanList
	);
	const [openForm, setOpenForm] = useState(false);
	const [toggleSetting, setToggleSetting] = useState(false);
	const currentDate = new Date();
	const startOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1
	);
	const formattedStartDate = startOfMonth.toISOString().split("T")[0];
	const [startDate, setStartDate] = useState(formattedStartDate);
	const [selected, setSelected] = useState();
	const [items, setItems] = useState();
	const [endDate, setEndDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	useEffect(() => {
		setItems(deliveryChallanList);
	}, [deliveryChallanList]);
	useEffect(() => {
		GetAllDeliveryChallans(dispatch, startDate, endDate);
	}, [toggleDeliveryChallan, startDate, endDate]);

	const formOpen = () => {
		setOpenForm(true);
	};

	const handleDelete = (id) => {
		deleteAllDeliveryChallan(dispatch, id);
	};
	console.log("this is challan", deliveryChallanList);
	const handleEdit = (_id) => {
		const data = deliveryChallanList.filter((e) => e._id === _id);
		console.log(data[0]);
		setIsEditing(true);
		setEditedData(data[0]);
	};

	const handleSave = (updatedData) => {
		const id = updatedData._id;
		setIsEditing(false);
		setEditedData(null);
		GetAllDeliveryChallans(dispatch);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditedData(null);
	};

	const handleSelect = (e) => {
		setSelected(e.target.value);
	};
	const filterDataByTime = (deliveryChallanList, timeInterval) => {
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
				return deliveryChallanList;
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
		return deliveryChallanList.filter((item) => {
			const itemDate = new Date(item.invoiceDate);
			return itemDate >= startDate && itemDate <= endDate;
		});
	};


const handleSearch=(e)=>{
  const query=e.target.value

  if(query===''){
    setItems(deliveryChallanList)
  }else{
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedQuery, "i");
    const filteredInvoice = deliveryChallanList.filter((item) =>
      regex.test(item.partyName)
    );
    setItems(filteredInvoice);
  }
}

	let filteredData = [];
	useEffect(() => {
		filteredData = filterDataByTime(deliveryChallanList, selected);
		setItems(filteredData);
	}, [selected]);
	return isLoading ? (
		<Loader3 text="Loading Delivery Challans" />
	) : (
		<div>
			{toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

			{/* Add Delivery Challan Form */}
			{openForm && (
				<div className={css.formOuter}>
					<div className={css.upperNav}>
						<div>
							<p className={css.activeForm}>
								<span>Delivery Challan #1</span>
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
							<SettingIcon onClick={() => setToggleSetting(true)} />
							<CloseIcon onClick={() => setOpenForm(false)} />
						</div>
					</div>
					<FormDeliveryChallan
						setToggleSetting={setToggleSetting}
						setOpenForm={setOpenForm}
					/>
				</div>
			)}

			<div className={css.navOuter}>
				<div className={css.navOptions}>DELIVERY CHALLAN</div>
			</div>

			<div className={css.Outer}>
				{/* Top Nav */}
				<div className={css.topNavOuter}>
					<div className={css.navTopADiv}>
						<select defaultValue="All" onChange={handleSelect} style={{background:"#BFBFBF",padding:"4px 3px",borderRadius:"5px"}}>
							<option value="All">All Sale Invoices</option>
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
				</div>

				{/* Middle */}
				{deliveryChallanList?.length ? (
					<div className={css.ContentOuter}>
						<div className={css.contentUpperNav}>
							<div className={css.leftSideDivSaleOuter}>
								<p>TRANSACTIONS</p>
								<div className={css.saleOrderSearchDiv}>
									<SearchIcon />
									<div>
										<input type="text" onChange={handleSearch} placeholder="Search..." />
									</div>
								</div>
							</div>
							<div>
								<button
									type="button"
									onClick={formOpen}
									className={css.addBtnCss}
								>
									<PlusIcon2 /> Add Delivery Challan
								</button>
							</div>
						</div>

						<div className={css.contentTableOuterDiv}>
							<table>
								<thead>
									<tr>
										{[
											"DATE",
											"PARTY",
											"CHALLAN NO.",
											"DUE DATE",
											"TOTAL",
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
									{!isLoading &&
										items?.map((item, ind) =>
											isEditing && editedData?._id === item._id ? (
												<tr
													style={{
														width: "80%",
														position: "relative",
													}}
												>
													<EditableRow
														display={[
															"invoiceDate",
															"partyName",
															"challanNo",
															"dueDate",
															"amount",
															"statuss",
														]}
														data={editedData}
														onSave={handleSave}
														onCancel={handleCancel}
													/>
												</tr>
											) : (
												<TableDeliveryChallan
													{...item}
													ind={ind}
													key={ind + item?._id}
													handleDelete={handleDelete}
													handleEdit={handleEdit}
												/>
											)
										)}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<FirstTimeFormToggle
						marginTop="10px"
						height="67.25vh"
						img={party}
						onClick={formOpen}
						BtnText="Add Your First Delivery Challan"
						MiddleText="Add Delivery Challan to manage your full Stock Inventory."
					/>
				)}
			</div>
		</div>
	);
}
