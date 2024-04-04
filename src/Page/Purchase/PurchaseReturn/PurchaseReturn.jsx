import css from "./PurchaseReturn.module.css";
import Setting from "../../../Component/Setting/Setting";
import party from "../../../assets/Images/party.jpg";
import Loader3 from "../../../Component/Loaders/Loader3";
import EditableRow from "../../../Component/EditForm";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import UpperControlPanel from "../../../Component/UpperControlPanel/UpperControlPanel";
import {
  DeletePurchaseReturn,
  GetAllPurchaseReturns,
  UpdatePurchaseReturn,
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
import AddPurchaseReturnForm from "./AddPurchaseReturnForm";

const PurchaseReturn = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [toggleSetting, setToggleSetting] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  // Add Purchase Return Toggle
  const toggleAddPaymentReturnSuccess = useSelector(
    (state) => state.PurchaseReducer.toggleAddPaymentReturnSuccess
  );
  // Get All Purchase Bill Loading
  const getAllPaymentReturnLoading = useSelector(
    (state) => state.PurchaseReducer.getAllPaymentReturnLoading
  );
  // Get All Purchase Return Success Toggle
  const getAllPurchaseReturnSuccess = useSelector(
    (state) => state.PurchaseReducer.getAllPurchaseReturnSuccess
  );
  // Purchase Return Data
  const purchaseReturnData = useSelector(
    (state) => state.PurchaseReducer.purchaseReturnData
  );
  const [paidAmount, setPaidAmount] = useState(0);
  const [unpaidAmount, setUnpaidAmount] = useState(0);

  // To Calculate Paid/Unpaid amounts on getAll Success request
  useEffect(() => {
    let paid = 0;
    let unpaid = 0;
    purchaseReturnData?.forEach((item) => {
      paid += item?.amount || 0;
      unpaid += item?.balanceDue || 0;
    });
    setPaidAmount(paid);
    setUnpaidAmount(unpaid);
  }, [getAllPurchaseReturnSuccess]);

  // To Get All Purchase Bill Data
  useEffect(() => {
    GetAllPurchaseReturns(dispatch, startDate, endDate);
  }, [toggleAddPaymentReturnSuccess, startDate, endDate]);

  // Handle Edit
  const handleEdit = (itemData) => {
    setIsEditing(true);
    setEditedData(itemData);
    // GetSinglePurchaseBillData(dispatch, itemData?.id, toast);
  };

  // Handle Delete
  const handleDelete = (id) => {
    DeletePurchaseReturn(dispatch, id, toast);
  };

  // Update Function
  const handleUpdate = (updatedData) => {
    UpdatePurchaseReturn(
      dispatch,
      updatedData?._id,
      updatedData,
      toast,
      setIsEditing,
      setEditedData
    );
  };

  // Handle CancelEditing
  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(null);
  };

  return getAllPaymentReturnLoading ? (
    <Loader3 text="Loading Purchase Returns" />
  ) : (
    <div className={css.Outer}>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

      {/* Add Purchase Return Form */}
      {openForm && (
        <div className={css.formOuter}>
          <div className={css.upperNav}>
            <div>
              <p className={css.activeForm}>
                <span>Purchase Return #1</span>
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
          <AddPurchaseReturnForm setOpenForm={setOpenForm} />
        </div>
      )}

      {/* Top Nav */}
      <UpperControlPanel
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        showPaymentData={true}
        showPrintOptions={false}
        data={purchaseReturnData}
        paidAmount={paidAmount}
        unpaidAmount={unpaidAmount}
      />

      {/* Middle */}
      {purchaseReturnData?.length > 0 ? (
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
                <PlusIcon2 /> Add Purchase
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
                    "RETURN NO.",
                    "PARTY NAME",
                    // "CATEGORY NAME",
                    "TYPE",
                    "TOTAL",
                    "RECIEVED",
                    "BALANCE DUE",
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
                {!getAllPaymentReturnLoading &&
                  purchaseReturnData?.map((item, ind) =>
                    isEditing && editedData?._id == item._id ? (
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
                            "billDate",
                            "refNo",
                            "partyName",
                            //"category",
                            "type",
                            "total",
                            "recieve",
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
                        <td>
                          {new Date(item?.billDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td>{item?.returnNumber || "-"}</td>
                        <td>{item?.partyName}</td>
                        {/* <td>{item?.categoryName || "-"}</td> */}
                        <td style={{ textAlign: "right" }}>{item?.type}</td>
                        <td style={{ textAlign: "right" }}>
                          ₹{item?.amount || 0}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          ₹{item?.paymentType[0]?.amount || 0}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          ₹{item?.amount - item?.paymentType[0]?.amount || 0}
                        </td>
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
          height="61.25vh"
          img={party}
          onClick={() => setOpenForm(true)}
          BtnText="Make Your First Purchase Return"
          MiddleText="No data is available for Debit-Note. Please try again after making relevant changes."
        />
      )}
    </div>
  );
};

export default PurchaseReturn;
