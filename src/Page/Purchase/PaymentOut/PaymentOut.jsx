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
  const toast = useToast();
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
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
      <UpperControlPanel
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        showPaymentData={false}
        showPrintOptions={true}
        data={paymentOutData}
        //paidAmount={paidAmount}
        //unpaidAmount={unpaidAmount}
      />

      {/* Middle */}
      {paymentOutData?.length > 0 ? (
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
                  paymentOutData?.map((item, ind) =>
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
