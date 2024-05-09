import css from "./PaymentIn.module.css";
import party from "../../../assets/Images/party.jpg";
import PaymentInForm from "./PaymentInForm";
import TablePaymentIn from "./TablePaymentIn";
import EditableRow from "../../../Component/EditForm";
import Setting from "../../../Component/Setting/Setting";
import Loader3 from "../../../Component/Loaders/Loader3";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import {
  GetAllPaymentIn,
  deletePaymentIn,
  updatePaymentIn,
} from "../../../Redux/sales/action";
import { PlusIcon2 } from "../../../assets/Icons/ReactIcons";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { CiFilter as FilterIcon } from "react-icons/ci";

export default function SalesPaymentIn() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const togglePaymentIn = useSelector(
    (state) => state.SalesReducer.togglePaymentIn
  );
  const paymentInList = useSelector(
    (state) => state.SalesReducer.paymentInList
  );
   console.log('paymentInList',paymentInList);
  const [openForm, setOpenForm] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const formattedStartDate = startOfMonth.toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(formattedStartDate);  
  const [selected,setSelected]=useState()
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
const[items,setItems]=useState([])
  const toast = useToast();

useEffect(()=>{
  setItems(paymentInList)
},[paymentInList])

useEffect(() => {
    GetAllPaymentIn(dispatch, startDate, endDate);
  }, [togglePaymentIn, startDate, endDate]);

  const closeForm = () => {
    setOpenForm(false);
  };

  const formOpen = () => {
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    deletePaymentIn(dispatch, id);
  };

  const handleEdit = (_id) => {
    const data = paymentInList.filter((e) => e._id === _id);
    // console.log(data);
    setIsEditing(true);
    setEditedData(data[0]);
  };

  const handleSave = (updatedData) => {
    updatedData.partyname = updatedData.partyName;
    //  console.log("updatedData-", updatedData);
    const id = updatedData._id;

    dispatch(updatePaymentIn(updatedData._id, updatedData));
    setIsEditing(false);
    setEditedData(null);
    GetAllPaymentIn(dispatch, startDate, endDate);
  };

  const handleCancel = () => {
    // If the user cancels, reset the state without saving
    setIsEditing(false);
    setEditedData(null);
  };

const searchHandle=(e)=>{
  const query=e.target.value
  if(query===''){
    setItems(paymentInList)
  }else{
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedQuery, "i");
    const filteredInvoice = paymentInList.filter((item) =>
      regex.test(item.partyName)
    );
    setItems(filteredInvoice);
  }
}


  const handleSelect=(e)=>{
    setSelected(e.target.value)
  
  }

  const filterDataByTime = (paymentInList, timeInterval) => {
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
				// Calculate start date of the current quarter
				startDate = new Date(currentYear, Math.floor(currentMonth / 3) * 3, 1);
				// Calculate end date of the current quarter
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
          return paymentInList
		break;
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
		return paymentInList.filter((item) => {
			const itemDate = new Date(item.date);
			return itemDate >= startDate && itemDate <= endDate;
		});
	};

  let filteredData=[]
  useEffect(() => {
    filteredData = filterDataByTime(paymentInList, selected);
    setItems(filteredData);
  }, [selected]);
  

  return isLoading ? (
    <Loader3 text="Loading Payment-In" />
  ) : (
    <div className={css.Outer}>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

      {/* Add PaymentIn Form */}
      {openForm && (
        <PaymentInForm
          setToggleSetting={setToggleSetting}
          closeForm={closeForm}
        />
      )}

      {/* Top Nav */}
      <div className={css.topNavOuter}>
        <div className={css.navTopADiv}>
          <select defaultValue="All" onChange={handleSelect} style={{backgroundColor:"#BFBFBF", borderRadius:"5px", padding:"3px 3px"}}>
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
      {paymentInList?.length ? (
        <div className={css.ContentOuter}>
          <div className={css.contentUpperNav}>
            <div className={css.leftSideDivSaleOuter}>
              <p>TRANSACTIONS</p>
              <div className={css.saleOrderSearchDiv}>
                <SearchIcon />
                <div>
                  <input type="text" placeholder="Search..."  onChange={searchHandle} />
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={formOpen}
                className={css.addBtnCss}
              >
                <PlusIcon2 /> Add Payment-In
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
                    "PARTY NAME",
                    "TYPE",
                    "RECEIVED/PAID",
                    "BALANCE",
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
                            "#",
                            "invoiceDate",
                            "refNo",
                            "partyName",
                            "category",
                            "type",
                            "total",
                            // "paymentType",
                            "recieved",
                            "balance",
                            // "duedate",
                            // "statuss",
                          ]}
                          data={editedData}
                          onSave={handleSave}
                          onCancel={handleCancel}
                        />
                      </tr>
                    ) : (
                      <TablePaymentIn
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
          height="73.25vh"
          img={party}
          onClick={() => setOpenForm(true)}
          BtnText="Add Your First Sale Invoice"
          MiddleText="Make Sale invoices & Print or share with your customers directly via WhatsApp or Email."
        />
      )}
    </div>
  );
}
