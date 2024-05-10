import css from "./Order.module.css";
import party from "../../../assets/Images/party.jpg";
import OrderForm from "./OrderForm";
import TableSaleOrder from "./TableSaleOrder";
import EditableRow from "../../../Component/EditForm";
import Loader3 from "../../../Component/Loaders/Loader3";
import Setting from "../../../Component/Setting/Setting";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import {
  GetAllSaleOrders,
  deleteAllSaleOrder,
  updateAllSaleOrder,
} from "../../../Redux/sales/action";
import { PlusIcon2 } from "../../../assets/Icons/ReactIcons";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderedList, useToast } from "@chakra-ui/react";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { CiFilter as FilterIcon } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";

export default function SalesOrder() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const[selected,setSelected]=useState()
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const toggleSaleOrder = useSelector(
    (state) => state.SalesReducer.toggleSaleOrder
  );
  const saleOrderList = useSelector(
    (state) => state.SalesReducer.saleOrderList
  );
const[items,setItems]=useState()
  const [openForm, setOpenForm] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const formattedStartDate = startOfMonth.toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(formattedStartDate);  
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
console.log('this si saleorder',saleOrderList)
  useEffect(()=>{setItems(saleOrderList)},[saleOrderList])
  useEffect(() => {
    GetAllSaleOrders(dispatch, startDate, endDate);
  }, [toggleSaleOrder, startDate, endDate]);

  const formOpen = () => {
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    deleteAllSaleOrder(dispatch, id);
  };

  const handleEdit = (_id) => {
    const data = saleOrderList.filter((e) => e._id === _id);
    // console.log(data);
    setIsEditing(true);
    setEditedData(data[0]);
  };

const handleSelected=(e)=>{
  setSelected(e.target.value)
}
const filterDataByTime = (saleOrderList, timeInterval) => {
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
      return saleOrderList;
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
  return saleOrderList.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });
};
const handleSearch=(e)=>{
  const query=e.target.value
  if(query===''){
    setItems(saleOrderList)
  }else{
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedQuery, "i");
    const filteredInvoice = saleOrderList.filter((item) =>
      regex.test(item.partyName)
    );
    setItems(filteredInvoice);
  }
}

useEffect(()=>{
  const data=filterDataByTime(saleOrderList,selected)
  setItems(data)
},[selected])


  const handleSave = (updatedData) => {
    updatedData.partyname = updatedData.partyName;
    // console.log("updatedData-", updatedData);
    const id = updatedData._id;

    dispatch(updateAllSaleOrder(updatedData?._id, updatedData));
    setIsEditing(false);
    setEditedData(null);
    GetAllSaleOrders(dispatch);
  };

  const handleCancel = () => {
    // If the user cancels, reset the state without saving
    setIsEditing(false);
    setEditedData(null);
  };



	useEffect(() => {
		const filteredData = saleOrderList.filter((item) => {
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







console.log("this is items",items)

  return isLoading ? (
    <Loader3 text="Loading Sale Orders" />
  ) : (
    <div>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

      <div className={css.navOuter}>
        <div className={css.navOptions}>SALE ORDERS</div>
      </div>

      {/* Add Sale Order Form */}
      {openForm && (
        <div className={css.formOuter}>
          <div className={css.upperNav}>
            <div>
              <p className={css.activeForm}>
                <span>Sale Order #1</span>
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
          <OrderForm
            setToggleSetting={setToggleSetting}
            setOpenForm={setOpenForm}
          />
        </div>
      )}

      <div className={css.Outer}>
        {/* Top Nav */}
        <div className={css.topNavOuter}>
          <div className={css.navTopADiv}>
            <select defaultValue="All" onChange={handleSelected} style={{backgroundColor:"#BFBFBF",padding:"4px 3px",borderRadius:"5px"}}>
              <option value="All">All Sale Order</option>
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
        {saleOrderList?.length ? (
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
                  <PlusIcon2 /> Add Sale Order
                </button>
              </div>
            </div>

            <div className={css.contentTableOuterDiv}>
              <table>
                <thead>
                  <tr>
                    {[
                      "DATE",
                      "REF NO.",
                      "DUE DATE",
                      "PARTY",
                      "TOTAL AMOUNT",
                      "BALANCE",
                      "TYPE",
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
                              "date",
                              "refNo",
                              "duedatee",
                              "partyName",
                              "total",
                              "balance",
                              "typee",
                              "status",
                            ]}
                            data={editedData}
                            onSave={handleSave}
                            onCancel={handleCancel}
                          />
                        </tr>
                      ) : (
                        <TableSaleOrder
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
            BtnText="Add Your First Sale Order"
            MiddleText="Make & share sale orders & convert them to sale invoice instantly."
          />
        )}
      </div>
    </div>
  );
}
