import css from "./Estimate.module.css";
import party from "../../../assets/Images/party.jpg";
import EstimateForm from "./EstimateForm";
import EditableRow from "../../../Component/EditForm";
import Loader3 from "../../../Component/Loaders/Loader3";
import Setting from "../../../Component/Setting/Setting";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import {
  GetAllEstimates,
  deleteAllEstimates,
  updateAllEstimates,
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
import TableEstimates from "./TableEstimates";
import { useLocation, useNavigate } from "react-router-dom";

export default function SalesEstimates() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const currentDate = new Date();
  const[items,setItems]=useState([])
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const formattedStartDate = startOfMonth.toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(formattedStartDate);  
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
const [selectedOption,setSelectedOption]=useState()

  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const toggleEstimates = useSelector(
    (state) => state.SalesReducer.toggleEstimates
  );
  const estimatesList = useSelector(
    (state) => state.SalesReducer.estimatesList
  );

  const filterDataByTime = (estimatesList, timeInterval) => {
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
			// Add more cases for other time intervals if needed
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
		return estimatesList.filter((item) => {
			const itemDate = new Date(item.invoiceDate);
			return itemDate >= startDate && itemDate <= endDate;
		});
	};


  useEffect(() => {
    GetAllEstimates(dispatch, startDate, endDate);
  }, [toggleEstimates, startDate, endDate]);

const handleSelectedOption=(e)=>{
  setSelectedOption(e.target.value)
}
let filteredData=[]
useEffect(() => {
  filteredData = filterDataByTime(invoicesList, selectedOption);
  setItems(filteredData);
}, [selectedValue]);

  const formOpen = () => {
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    deleteAllEstimates(dispatch, id);
  };

  const handleEdit = (_id) => {
    const data = estimatesList.filter((e) => e._id == _id);
    // console.log(data);
    setIsEditing(true);
    if (data.length > 0) {
      setEditedData(data[0]);
    }
  };

  const handleSave = (updatedData) => {
    // updatedData.partyname = updatedData.partyName
    console.log("updatedData-", updatedData);
    const id = updatedData._id;

    dispatch(updateAllEstimates(updatedData._id, updatedData));
    setIsEditing(false);
    setEditedData(null);
    GetAllEstimates(dispatch, startDate, endDate);
  };

  const handleCancel = () => {
    // If the user cancels, reset the state without saving
    setIsEditing(false);
    setEditedData({});
  };

  return isLoading ? (
    <Loader3 text="Loading Estimates/Quatations" />
  ) : (
    <div className={css.Outer}>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

      {/* Form */}
      {openForm && (
        <div className={css.formOuter}>
          <div className={css.upperNav}>
            <div>
              <p className={css.activeForm}>
                <span>Estimate #1</span>
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
          <EstimateForm
            setToggleSetting={setToggleSetting}
            setOpenForm={setOpenForm}
          />
        </div>
      )}

      {/* Top Nav */}
      <div className={css.topNavOuter}>
        <div className={css.navTopADiv}>
          <select value={selectedOption} onChange={handleSelectedOption} className={css.monthSelectTag}>
            <option value="All Sale Invoices">All Sale Invoices</option>
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
      {estimatesList?.length ? (
        <div className={css.ContentOuter}>
          <div className={css.contentUpperNav}>
            <div className={css.leftSideDivSaleOuter}>
              <p>TRANSACTIONS</p>
              <div className={css.saleOrderSearchDiv}>
                <SearchIcon />
                <div>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={formOpen}
                className={css.addBtnCss}
              >
                <PlusIcon2 /> Add Estimate
              </button>
            </div>
          </div>

          <div className={css.contentTableOuterDiv}>
            <table>
              <thead>
                <tr>
                  {[
                    "DATE",
                    "REFERENCE NO.",
                    "NAME",
                    "TOTAL AMOUNT",
                    "BALANCE",
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
                  estimatesList?.map((item, ind) =>
                    isEditing && editedData?._id == item._id ? (
                      <tr
                        style={{
                          width: "80%",
                          position: "relative",
                        }}
                      >
                        <EditableRow
                          display={[
                            "invoiceDate",
                            "refNo",
                            "partyName",
                            "amount",
                            "balanceDue",
                            "statuss",
                          ]}
                          data={editedData}
                          onSave={handleSave}
                          onCancel={handleCancel}
                        />
                      </tr>
                    ) : (
                      <TableEstimates
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
          BtnText="Add Your First Estimate"
          MiddleText="Make Estimates/Quotations/Proforma Invoices and share with your parties by WhatsApp, Email or Printed copies."
          BelowText="You can convert them to Sale invoices later by just click of a button"
        />
      )}
    </div>
  );
}
