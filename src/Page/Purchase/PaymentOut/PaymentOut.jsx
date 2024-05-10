import css from "./PaymentOut.module.css";
import Setting from "../../../Component/Setting/Setting";
import party from "../../../assets/Images/party.jpg";
import EditableRow from "../../../Component/EditForm";
import Loader3 from "../../../Component/Loaders/Loader3";
import AddPaymentOutForm from "./AddPaymentOut";
import UpperControlPanel from "../../../Component/UpperControlPanel/UpperControlPanel";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import { FormatDate } from "../../../Redux/sales/action";
import {
  GetAllPaymentOut,
  deletePayoutBill,
  updatePayoutBill,
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

const PaymentOut = () => {
  const [paidAmount, setPaidAmount] = useState(0);
  const [unpaidAmount, setUnpaidAmount] = useState(0);
  const toast = useToast();
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const formattedStartDate = startOfMonth.toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(formattedStartDate);
  const [items,setItems]=useState()
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
const [select,setSelect]=useState([])

  // const date = { startDate: startDate, endDate: endDate };
  const toggleAddPaymentOutSuccess = useSelector(
    (state) => state.PurchaseReducer.toggleAddPaymentOutSuccess
  );
  const getAllPaymentOutLoading = useSelector(
    (state) => state.PurchaseReducer.getAllPaymentOutLoading
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const paymentOutData = useSelector(
    (store) => store?.PurchaseReducer?.paymentOutData
  );
  console.log("this is paymentOutData",paymentOutData)

  useEffect(()=>{setItems(paymentOutData)},[paymentOutData,endDate])



	useEffect(() => {
		let paid = 0;
		let unpaid = 0;
		paymentOutData?.forEach((item) => {
			paid += item?.paid || 0;
			unpaid += item?.balanceDue || 0;
		});
		setPaidAmount(paid);
		setUnpaidAmount(unpaid);
	}, [toggleAddPaymentOutSuccess]);


const handleSelectChange=(e)=>{
    setSelect(e.target.value)
}

const filterDataByTime = (paymentOutData, timeInterval) => {
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
      return paymentOutData;
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
  return paymentOutData.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });
};

useEffect(()=>{
  const data=filterDataByTime(paymentOutData,select)
  setItems(data)
},[select])


const handleSearch=(e)=>{
  const query=e.target.value

  if(query===''){
    setItems(paymentOutData)
  }else{
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			const regex = new RegExp(escapedQuery, "i");
			const filteredInvoice = paymentOutData.filter((item) =>
				regex.test(item.partyName)
			);
			setItems(filteredInvoice);
  }

}


  // To Get All Payment Out Data
  useEffect(() => {
    GetAllPaymentOut(dispatch, startDate, endDate);
  }, [toggleAddPaymentOutSuccess, startDate, endDate]);

  // Handle Delete
  const handleDelete = (id) => {
    deletePayoutBill(dispatch, id, toast, setIsEditing, setEditedData);
  };

  // Handle Edit
  const handleEdit = (data) => {
    setIsEditing(true);
    setEditedData(data);
  };

  // Update Request
  const handleUpdate = (updatedData) => {
    updatePayoutBill(
      dispatch,
      updatedData?._id,
      updatedData,
      toast,
      setIsEditing,
      setEditedData
    );
  };

  // Cancel Update
  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(null);
  };



	useEffect(() => {
		const filteredData = paymentOutData.filter((item) => {
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
 

  return getAllPaymentOutLoading ? (
    <Loader3 text="Loading Payment Out" />
  ) : (
    <div className={css.Outer}>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

      {/* Add Purchase Bill Form */}
      {openForm && (
        <div className={css.formOuter}>
          <div className={css.upperNav}>
            <div>
              <p className={css.activeForm}>
                <span>Payment Out #1</span>
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
          <AddPaymentOutForm
            setOpenForm={setOpenForm}
            // date={{ startDate, endDate }}
          />
        </div>
      )}

      {/* Top Nav */}
      <div className={css.topNavOuter}>
				<div className={css.navTopADiv}>
					<select
						defaultValue="All"
						onChange={handleSelectChange}
						style={{backgroundColor:"#BFBFBF",padding:"3px 3px",borderRadius:"5px"}}
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
      {paymentOutData?.length > 0 ? (
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
                onClick={() => setOpenForm(true)}
                className={css.addBtnCss}
              >
                <PlusIcon2 /> Add Payment-Out
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
                    "REF NO.",
                    "PARTYNAME",
                    // "CATEGORY NAME",
                    "TYPE",
                    "TOTAL",
                    "RECEIVED/PAID",
                    "BALANCE",
                    "DUE DATE",
                    "STATUS",
                    "ACTION",
                  ].map((item, index) => (
                    <th key={index + item}>
                      <div>{item}</div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {!getAllPaymentOutLoading &&
                  items?.map((item, ind) =>
                    isEditing && editedData?._id === item._id ? (
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
                            "date",
                            "refNo",
                            "partyName",
                            // "categoryName",
                            "type",
                            "total",
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
                        <td>{FormatDate(item?.date)}</td>
                        <td>{item?.refNo}</td>
                        <td>{item?.partyName}</td>
                        {/* <td>{item?.categoryName || "-"}</td> */}
                        <td>{item?.type}</td>
                        <td style={{ textAlign: "right" }}>₹{item?.total}</td>
                        <td style={{ textAlign: "right" }}>₹{item?.paid}</td>
                        <td style={{ textAlign: "right" }}>₹{item?.balance}</td>
                        <td>{FormatDate(item?.date)}</td>
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
          height="72.5vh"
          img={party}
          onClick={() => setOpenForm(true)}
          BtnText="Make Your First Payment-Out"
          MiddleText="No data is available for Payment-Out. Please try again after making relevant changes."
        />
      )}
    </div>
  );
};

export default PaymentOut;
