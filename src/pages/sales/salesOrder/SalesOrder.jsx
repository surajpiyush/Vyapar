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
import { useToast } from "@chakra-ui/react";
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

  const [openForm, setOpenForm] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

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
    console.log(data);
    setIsEditing(true);
    setEditedData(data[0]);
  };

  const handleSave = (updatedData) => {
    updatedData.partyname = updatedData.partyName;
    console.log("updatedData-", updatedData);
    const id = updatedData._id;

    dispatch(updateAllSaleOrder(updatedData._id, updatedData));
    setIsEditing(false);
    setEditedData(null);
    GetAllSaleOrders(dispatch);
  };

  const handleCancel = () => {
    // If the user cancels, reset the state without saving
    setIsEditing(false);
    setEditedData(null);
  };
  const display = [
    "date",
    "refNo",
    "duedatee",
    "partyName",
    "total",
    "balance",
    "typee",
    "status",
  ];
  return isLoading ? (
    <Loader3 text="Loading Payment-In" />
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
            <select defaultValue="This Month" className={css.monthSelectTag}>
              <option value="All Sale Invoices">All Sale Invoices</option>
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
              <option value="This Quarter">This Quarter</option>
              <option value="This Year">This Year</option>
              <option value="Custom">Custom</option>
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
                  <PlusIcon2 /> Add Sale Order
                </button>
              </div>
            </div>

            <div className={css.contentTableOuterDiv}>
              <table>
                <thead>
                  <tr>
                    <th>
                      <div>DATE</div>
                    </th>
                    <th>
                      <div>REF NO.</div>
                    </th>
                    <th>
                      <div>DUE DATE</div>
                    </th>
                    <th>
                      <div>PARTY</div>
                    </th>
                    <th>
                      <div>TOTAL AMOUNT</div>
                    </th>
                    <th>
                      <div>BALANCE</div>
                    </th>
                    <th>
                      <div>TYPE</div>
                    </th>
                    <th>
                      <div>STATUS</div>
                    </th>
                    <th>
                      <div>ACTION</div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!isLoading &&
                    saleOrderList?.map((item, ind) =>
                      isEditing && editedData?._id === item._id ? (
                        <tr
                          style={{
                            width: "80%",
                            position: "relative",
                          }}
                        >
                          <EditableRow
                            display={display}
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
