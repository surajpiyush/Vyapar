import css from "./Home.module.css";
import Loader4 from "../../Component/Loaders/Loader4";
import { API_URL, USER_DETAILS } from "../../Redux/store";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	LineElement,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	Filler,
} from "chart.js";
import {
	WalletIcon,
	RupeesIcon,
	DocumentIcon,
	UpArrowIcon2,
	ArrowUpFilledIcon,
	ArrowDownFilledIcon,
	CloseToggleIcon,
	OpenToggleIcon,
} from "../../assets/Icons/ReactIcons";

import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../../Redux/business/action";
import SalePriceComponent from "../../components/numberFormate/NumberFormate";
ChartJS.register(
	Title,
	Tooltip,
	LineElement,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	Filler
);
const Home = () => {
	const [data, setData] = useState({
		labels: [
			"Jan",
			"Feb",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"Oct",
			"Nov",
			"Dec",
		],
		datasets: [
			{
				label: "First Dataset",
				data: [10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58],
				borderColor: "green",
				tension: 0.4,
				fill: true,
				pointStyle: "",

				showLine: true,
			},
		],
	});

	const options = {
		scales: {
			x: {
				grid: {
					display: false,
				},
				ticks: {
					display: false, // Hide x-axis labels
				},
			},
			y: {
				grid: {
					display: false,
				},
				ticks: {
					display: false,
					stepSize: 25,
					min: 0,
					max: 100,
				},
			},
		},
		zoom: {
			enabled: true,
		},
	};

	const navigate = useNavigate();
	const [privacyToggle, setPrivacyToggle] = useState(false);
	const [isMonthModelOpenForSale, setIsMonthModelOpenForSale] = useState(false);
	const [isMonthModelOpenForPurchase, setIsMonthModelOpenForPurchase] =
		useState(false);
	const [isMonthModelOpenForBottomItems, setIsMonthModelOpenBottomItems] =
		useState(false);
	const [ismonthmodelopenForExpenses, setIsmonthmodelopenForExpenses] =
		useState(false);
	const [homeStates, setHomeStates] = useState({
		isLoading: false,
		isError: false,
		data: {},
	});
	const [select, setSelect] = useState();
	const [items, setItems] = useState();
	const [salStart, setSalStart] = useState("2024-02-01");
	const [salEnd, setSalEnd] = useState(new Date().toISOString().split("T")[0]);
	const [expStart, setExpStart] = useState("2024-02-01");
	const [expEnd, setexpEnd] = useState(new Date().toISOString().split("T")[0]);
	const [purSatart, setPurSatart] = useState("2024-02-01");
	const [purEnd, setPurEnd] = useState(new Date().toISOString().split("T")[0]);
	console.log(homeStates?.data);
	//  homeStates.data.expenseTotal.expWithoutGst[0].expGstT
	// Fetch Home Data
	const FetchHomeData = async () => {
		setHomeStates((prev) => {
			return { ...prev, isLoading: true, isError: false };
		});
		const token = sessionStorage.getItem("token");
		// const token =
		//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM1Y2ZjNTA5YjM0Y2E4YTAxODc0OTciLCJpYXQiOjE3MTI3NDE2NTAsImV4cCI6MTcxMjgyODA1MH0.ez_9ADGx3uKF1ivIFnKn7E2tm1zC9f0oixDtaT-jv-o";

		const FirmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;

		//  salStart, salEnd, expStart, expEnd, purSatart, purEnd
		try {
			const response = await axios.get(
				`${API_URL}/${FirmId}/home-page?salStart=${salStart}&salEnd=${salEnd}&expStart=${expStart}&expEnd=${expEnd}&purSatart=${purSatart}&purEnd=${purEnd}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			console.log("Fetch Home Data Response:", response);
			setHomeStates((prev) => {
				return {
					...prev,
					isLoading: false,
					data: response?.data?.data[0] || {},
				};
			});
		} catch (error) {
			console.log("Error Fetching Home Data:", error);
			setHomeStates((prev) => {
				return { ...prev, isLoading: false, isError: true };
			});
			toast.dismiss();
			if (error?.response?.data?.tokenExpired) {
				LOGOUT(navigate, true);
				return toast.info("Session expired. Please log in again.");
			}
		}
	};

	const handleSelect = () => {};

	useEffect(() => {
		FetchHomeData();
	}, []);

	return (
		<div className={css.homeOuter}>
			{homeStates?.isLoading && <Loader4 />}

			{/* Home.jsx */}
			<div className={css.leftSideOuter}>
				<div className={css.homeContainerDiv1}>
					{/* Sale.jsx */}
					<div className={css.SaleContainer}>
						<section className={css.SaleHeading}>
							<aside className={css.SaleHeadingAside1}>
								<DocumentIcon className={css.SaleHeadingNotes} />
								<h4>Sale</h4>
							</aside>
							<aside className={css.SaleHeadingAside2}>
								<div className={css.SaleMonthDiv}>
									<select defaultValue="This Month" onChange={handleSelect}>
										<option value="This Month">This Month</option>
										<option value="Last Month">Last Month</option>
										<option value="Quarter Year">Quarter Year</option>
										<option value="This Year">This Year</option>
									</select>
								</div>
							</aside>
						</section>
						<section className={css.SaleContent}>
							<aside className={css.SaleContentAside1}>
								<h3 className={css.bigAmountText}>
									<SalePriceComponent
										salePrice={
											homeStates?.data?.saleOrders
												? homeStates?.data?.saleOrders[0]?.saleOrders[0]
														?.openOrderAmount || "00.00"
												: 0
										}
									/>
									{}
								</h3>
								<p className={css.SaleAmountText}>Total Sale (Feb)</p>

								<div className={css.SaleGrowthData}>
									<div>
										<UpArrowIcon2 className={css.SaleTopArrowIcon} />
										<p className={css.SaleGrowthDataPercent}>0 %</p>
									</div>
									<p className={css.SaleGrowthText}>This Month Growth</p>
								</div>
							</aside>
							<aside className={css.SaleContentAside2}>
								<Line data={data} options={options}></Line>
							</aside>
						</section>
					</div>

					{/* Expenses.jsx */}
					<div className={css.expensesContainer}>
						<section className={css.expensesHeading}>
							<aside className={css.expensesHeadingAside1}>
								<div>
									<WalletIcon className={css.expensesHeadingNotes} />
									<h5>Expenses</h5>
									<aside className={css.expensesHeadingAside2}>
										<div className={css.expensesMonthDiv}>
											<select defaultValue="This Month">
												<option value="This Month">This Month</option>
												<option value="Last Month">Last Month</option>
												<option value="Quarter Year">Quarter Year</option>
												<option value="This Year">This Year</option>
											</select>{" "}
										</div>
									</aside>
								</div>
								<div>
									<h3 className={css.mediumAmountText}>
										<SalePriceComponent />
										{homeStates?.data?.expenseTotal
											? Number(
													homeStates?.data?.expenseTotal[0]?.expWithoutGst[0]
														?.expGstT
											  ) ||
											  0 +
													Number(
														homeStates?.data?.expenseTotal[0]?.expWithGst[0]
													)?.expGstT ||
											  "00.00"
											: 0 || 0}
									</h3>
								</div>
							</aside>
						</section>

						<Line data={data} id="1" options={options}></Line>
					</div>
				</div>

				{/* Bottomitems.jsx */}
				<div className={css.homeContainerDiv2}>
					{bottomcarditems.map((item, index) => (
						<div key={index} className={css.bottomItemContainer}>
							<div>
								<div className={css.bottomItemDiv2}>
									<div>{item.Icon}</div>
									<h3>{item.heading}</h3>
								</div>
								<div className={css.bottomAmountDiv}>
									<SalePriceComponent
										salePrice={
											homeStates?.data?.youPay
												? homeStates?.data?.youPay[0]?.Purchase[0]?.youPay ||
												  "00.00"
												: 0
										}
									/>
								</div>
							</div>
							<div className={css.bottomItemDiv4}>
								<p>{item.paragraph}</p>
							</div>
						</div>
					))}

					{/* Purchase.jsx */}
					<div className={css.purchaseContainer}>
						<div className={css.purchaseHeading}>
							<div className={css.purchaseHeadingAside1}>
								<div>
									<DocumentIcon className={css.purchaseHeadingNotes} />
									<div style={{ color: "GrayText" }}>Purchase</div>
								</div>

								<SalePriceComponent
									salePrice={
										homeStates?.data?.purchaseOrder
											? homeStates?.data?.purchaseOrder[0]?.purchaseOrder[0]
													?.openOrderAmount || "00.00"
											: 0
									}
								/>
							</div>
							<aside className={css.purchaseHeadingAside2}>
								<div className={css.purchaseMonthDiv}>
									<select defaultValue="This Month">
										<option value="This Month">This Month</option>
										<option value="Last Month">Last Month</option>
										<option value="Quarter Year">Quarter Year</option>
										<option value="This Year">This Year</option>
									</select>
								</div>
							</aside>
						</div>
						
							
								
									<Line data={data} id="1" options={options}></Line>
								
							
						
					</div>
				</div>
			</div>

			{/* Right Side */}
			<div className={css.rightSideOuter}>
				<div className={css.privacyDiv}>
					<h3>Privacy</h3>
					{privacyToggle ? (
						<CloseToggleIcon onClick={() => setPrivacyToggle(false)} />
					) : (
						<OpenToggleIcon onClick={() => setPrivacyToggle(true)} />
					)}
				</div>
				<div className={css.stockInvItemContDiv}>
					<div className={css.stockInvDivOuter}>
						<h3>Stock Inventory</h3>
					</div>
					<div className={css.stockItemCardsOuterDiv}>
						<h4>Stock Value</h4>
						<h3>
							₹ 00<span>.00</span>
						</h3>
					</div>
					<div className={css.stockItemCardsOuterDiv}>
						<h4>Low Stocks</h4>
						<p>None of your stocks has low value.</p>
					</div>
					<div className={css.stockInvDivOuter}>
						<h3>Cash & Banks</h3>
					</div>
					{["Bank Accounts", "Loan Amounts"].map((items, ind) => (
						<div className={css.stockItemCardsOuterDiv} key={ind + items}>
							<h4>{items}</h4>
							<h3>
								₹ 00<span>.00</span>
							</h3>
						</div>
					))}
					<div className={css.stockInvDivOuter}>
						<h3>Sale</h3>
					</div>
					{["Sale Orders", "Delivery Challan"].map((item, ind) => (
						<div className={css.stockItemCardsOuterDiv} key={ind + item}>
							<h4>{item}</h4>
							<div>
								<span>No. of Open Orders</span>
								<span>0</span>
							</div>
							<div>
								<span>Open sale Order Amount</span>
								<span>0</span>
							</div>
						</div>
					))}
					<div className={css.stockInvDivOuter}>
						<h3>Purchase</h3>
					</div>
					<div className={css.stockItemCardsOuterDiv}>
						<h4>Purchase Orders</h4>
						<div>
							<span>No. of purchase Orders</span>
							<span>0</span>
						</div>
						<div>
							<span>Purchase Orders Amount</span>
							<span>0</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;

const bottomcarditems = [
	{
		Icon: <ArrowDownFilledIcon />,
		heading: "You'll Receive",
		paragraph: "You don't have any pending amount to be received",
	},
	{
		Icon: <ArrowUpFilledIcon />,
		heading: "You'll Pay",
		paragraph: "You don't have to pay any amount",
	},
];
