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
  const creditNotesList = useSelector(
    (state) => state.SalesReducer.creditNotesList
  );

  const [openForm, setOpenForm] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

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

  const handleSave = (updatedData) => {
    // Implement your logic to save the updated data to the backend
    // You may use an API call or any other method here
    console.log("updatedData-", updatedData);
    const id = updatedData._id;
    // After saving, reset the state
    // dispatch(updatePurchaseBill(updatedData._id, updatedData));
    setIsEditing(false);
    setEditedData(null);
    GetAllCreditNotes(dispatch, startDate, endDate);
  };

  const handleCancel = () => {
    // If the user cancels, reset the state without saving
    setIsEditing(false);
    setEditedData(null);
  };
  const display = [
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
  ];

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
      {creditNotesList?.length ? (
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
                <PlusIcon2 /> Add Credit Note
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
                    <div>TOTAL</div>
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
                  creditNotesList?.map((item, ind) =>
                    isEditing && editedData?._id === item._id ? (
                      <tr
                        style={{
                          width: "82%",
                          position: "absolute",
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
        <div>
          <FirstTimeFormToggle
            marginTop="10px"
            height="73.25vh"
            img={party}
            onClick={() => setOpenForm(true)}
            BtnText="Add A Credit Note"
            MiddleText="Make a sale return credit note & share with your parties by WhatsApp, Email or Printed copies."
          />
        </div>
      )}
    </div>
  );
}
