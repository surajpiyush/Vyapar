import css from "./CreditNotes.module.css";
import party from "../../../assets/Images/party.jpg";
import FormCreditNote from "./FormCreditNote";
import TableCreditNotes from "./TableCreditNotes";
import EditableRow from "../../../Component/EditForm";
import Setting from "../../../Component/Setting/Setting";
import Loader3 from "../../../Component/Loaders/Loader3";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import {
  GetAllCreditNotes,
  deleteAllCreditNotes,
} from "../../../Redux/sales/action";
import { PlusIcon2 } from "../../../assets/Icons/ReactIcons";

import { useState, useEffect } from "react";
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

export default function SalesReturn() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const toggleCreditNote = useSelector(
    (state) => state.SalesReducer.toggleCreditNote
  );
  const[select,setSelect]=useState()
  const creditNotesList = useSelector(
    (state) => state.SalesReducer.creditNotesList
  );
const[items,setItems]=useState()
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
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  useEffect(()=>{setItems(creditNotesList)},[creditNotesList])
console.log("this creditNotesList",creditNotesList)
  const handleSearch=(e)=>{
    const query=e.target.value
  
    if(query===''){
      setItems(creditNotesList)
    }else{
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escapedQuery, "i");
      const filteredInvoice = creditNotesList.filter((item) =>
        regex.test(item.partyName)
      );
      setItems(filteredInvoice);
    }
  }

  useEffect(() => {
    GetAllCreditNotes(dispatch, startDate, endDate);
  }, [toggleCreditNote, startDate, endDate]);

  const formOpen = () => {
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    deleteAllCreditNotes(dispatch, id);
  };

  const handleEdit = (_id) => {
    const data = creditNotesList.filter((e) => e._id === _id);
    console.log(data);
    setIsEditing(true);
    setEditedData(data[0]);
  };

const handleSelect=(e)=>{
 setSelect(e.target.value)
}
const filterDataByTime = (creditNotesList, timeInterval) => {
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
      return creditNotesList;
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
  return creditNotesList.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });
};

useEffect(()=>{
  const filteredData=filterDataByTime(creditNotesList,select)
  console.log('thsis ',filteredData,select)
  setItems(filteredData)
},[select])
  const handleSave = (updatedData) => {
    const id = updatedData._id;
    setIsEditing(false);
    setEditedData(null);
    GetAllCreditNotes(dispatch, startDate, endDate);
  };

  const handleCancel = () => {
    // If the user cancels, reset the state without saving
    setIsEditing(false);
    setEditedData(null);
  };



	useEffect(() => {
		const filteredData = creditNotesList.filter((item) => {
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
 






console.log('this is items',items)
  return isLoading ? (
    <Loader3 text="Loading Sale Returns" />
  ) : (
    <div className={css.Outer}>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

      {/* Add Sale Return Form */}
      {openForm && (
        <div className={css.formOuter}>
          <div className={css.upperNav}>
            <div>
              <p className={css.activeForm}>
                <span>Credit Note #1</span>
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
          <FormCreditNote
            setToggleSetting={setToggleSetting}
            setOpenForm={setOpenForm}
          />
        </div>
      )}

      {/* Top Nav */}
      <div className={css.topNavOuter}>
        <div className={css.navTopADiv}>
          <select defaultValue="All" style={{backgroundColor:"#BFBFBF",padding:"3px 3px",borderRadius:"5px"}} onChange={handleSelect}>
            <option value="All">All Sale Return</option>
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
      {creditNotesList?.length ? (
        <div className={css.ContentOuter}>
          <div className={css.contentUpperNav}>
            <div className={css.leftSideDivSaleOuter}>
              <p>TRANSACTIONS</p>
              <div className={css.saleOrderSearchDiv}>
                <SearchIcon />
                <div>
                  <input type="text" onChange={handleSearch} placeholder="Search..."  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={formOpen}
                className={css.addBtnCss}
              >
                <PlusIcon2 /> Add Credit Note
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
                    "TOTAL",
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
                            "invoiceDate",
                            "invoiceNumber",
                            "partyName",
                            "transactionType",
                            "paymentType",
                            "amount",
                            "balanceDue",
                            "duedate",
                            "status",
                            "hariom",
                          ]}
                          data={editedData}
                          onSave={handleSave}
                          onCancel={handleCancel}
                        />
                      </tr>
                    ) : (
                      <TableCreditNotes
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
          BtnText="Add A Credit Note"
          MiddleText="Make a sale return credit note & share with your parties by WhatsApp, Email or Printed copies."
        />
      )}
    </div>
  );
}
