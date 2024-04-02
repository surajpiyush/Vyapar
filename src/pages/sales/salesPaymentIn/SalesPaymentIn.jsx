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
  // console.log(paymentInList);
  const [openForm, setOpenForm] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const toast = useToast();

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
    console.log(data);
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
  const display = [
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
  ];

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
      {paymentInList?.length ? (
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
                <PlusIcon2 /> Add Payment-In
              </button>
            </div>
          </div>

          <div className={css.contentTableOuterDiv}>
            <table>
              <thead>
                <tr>
                  <th>
                    <div>#</div>
                  </th>
                  <th>
                    <div>DATE</div>
                  </th>
                  <th>
                    <div>REF NO.</div>
                  </th>
                  <th>
                    <div>PARTY NAME</div>
                  </th>
                  <th>
                    <div>TYPE</div>
                  </th>
                  <th>
                    <div>RECEIVED/PAID</div>
                  </th>
                  <th>
                    <div>BALANCE</div>
                  </th>
                  <th>
                    <div>ACTION</div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {!isLoading &&
                  paymentInList?.map((item, ind) =>
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
