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
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const toggleEstimates = useSelector(
    (state) => state.SalesReducer.toggleEstimates
  );
  const estimatesList = useSelector(
    (state) => state.SalesReducer.estimatesList
  );

  useEffect(() => {
    GetAllEstimates(dispatch, startDate, endDate);
  }, [toggleEstimates, startDate, endDate]);

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
  const display = [
    "invoiceDate",
    "refNo",
    "partyName",
    "amount",
    "balanceDue",
    "statuss",
  ];

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
                  <th>
                    <div>DATE</div>
                  </th>
                  <th>
                    <div>REFERENCE NO.</div>
                  </th>
                  <th>
                    <div>NAME</div>
                  </th>
                  <th>
                    <div>TOTAL AMOUNT</div>
                  </th>
                  <th>
                    <div>BALANCE</div>
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
                  estimatesList?.map((item, ind) =>
                    isEditing && editedData?._id == item._id ? (
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
        <div>
          <FirstTimeFormToggle
            marginTop="10px"
            height="73.25vh"
            img={party}
            onClick={() => setOpenForm(true)}
            BtnText="Add Your First Estimate"
            MiddleText="Make Estimates/Quotations/Proforma Invoices and share with your parties by WhatsApp, Email or Printed copies."
            BelowText="You can convert them to Sale invoices later by just click of a button"
          />
        </div>
      )}
    </div>
  );
}
