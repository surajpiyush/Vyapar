import css from "./PurchaseOrder.module.css";
import party from "../../../assets/Images/party.jpg";
import EditableRow from "../../../Component/EditForm";
import Loader3 from "../../../Component/Loaders/Loader3";
import Setting from "../../../Component/Setting/Setting";
import AddPurchaseOrderForm from "./AddPurchaseOrderForm";
import UpperControlPanel from "../../../Component/UpperControlPanel/UpperControlPanel";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import {
   DeletePurchaseOrder,
   GetAllPurchaseOrder,
   UpdatePurchaseOrder,
} from "../../../Redux/purchase/action";
import {
   EditIcon,
   CrossIcon,
   PlusIcon2,
   SearchIcon,
   CloseIcon2,
   DeleteIcon2,
   CalculatorIcon,
   SettingsIconOutline2,
} from "../../../assets/Icons/ReactIcons";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PurchaseOrder = () => {
   const toast = useToast();
   const dispatch = useDispatch();
   const toggleAddPaymentOrderSuccess = useSelector(
      (state) => state.PurchaseReducer.toggleAddPaymentOrderSuccess
   );
   const getAllPurchaseOrderLoading = useSelector(
      (state) => state.PurchaseReducer.getAllPurchaseOrderLoading
   );
   const purchaseOrderData = useSelector(
      (store) => store?.PurchaseReducer?.purchaseOrderData
   );
   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState(null);
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

   // To Get All Payment Out Data
   useEffect(() => {
      GetAllPurchaseOrder(dispatch, startDate, endDate);
   }, [toggleAddPaymentOrderSuccess, startDate, endDate]);

   // Handle Delete
   const handleDelete = (id) => {
      DeletePurchaseOrder(dispatch, id, toast, setIsEditing, setEditedData);
   };

   // Handle Edit
   const handleEdit = (data) => {
      setIsEditing(true);
      setEditedData(data);
   };

   // Update Request
   const handleUpdate = (updatedData) => {
      UpdatePurchaseOrder(
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

   return getAllPurchaseOrderLoading ? (
      <Loader3 text="Loading Purchase Orders" />
   ) : (
      <div>
         {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

         <div className={css.navOuter}>
            <div className={css.navOptions}>ORDERS</div>
         </div>

         {/* Add Purchase Bill Form */}
         {openForm && (
            <div className={css.formOuter}>
               <div className={css.upperNav}>
                  <div>
                     <p className={css.activeForm}>
                        <span>Payment Order #1</span>
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
                     <SettingsIconOutline2
                        onClick={() => setToggleSetting(true)}
                     />
                     <CloseIcon2 onClick={() => setOpenForm(false)} />
                  </div>
               </div>
               <AddPurchaseOrderForm
                  setOpenForm={setOpenForm}
                  // date={{ startDate, endDate }}
               />
            </div>
         )}

         <div className={css.Outer}>
            {/* Top Nav */}
            <UpperControlPanel
               startDate={startDate}
               endDate={endDate}
               setStartDate={setStartDate}
               setEndDate={setEndDate}
               showPaymentData={false}
               showPrintOptions={false}
               //data={purchaseOrderData}
               //paidAmount={paidAmount}
               //unpaidAmount={unpaidAmount}
            />

            {/* Middle */}
            {purchaseOrderData?.length > 0 ? (
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
                           <PlusIcon2 /> Add Purchase Order
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
                                 "NO.",
                                 "PARTYNAME",
                                 "DUE DATE",
                                 // "CATEGORY NAME",
                                 "TYPE",
                                 "TOTAL AMOUNT",
                                 "BALANCE",
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
                           {!getAllPurchaseOrderLoading &&
                              purchaseOrderData?.map((item, ind) =>
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
                                             "partyName",
                                             "orderNumber",
                                             "date",
                                             "dueDate",
                                             "total",
                                             "balance",
                                             "type",
                                             "status",
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
                                          {new Date(
                                             item?.date
                                          ).toLocaleDateString("en-IN", {
                                             day: "2-digit",
                                             month: "2-digit",
                                             year: "numeric",
                                          })}
                                       </td>
                                       <td>{item?.orderNumber || "-"}</td>
                                       <td>{item?.partyName}</td>
                                       {/* <td>{item?.categoryName || "-"}</td> */}
                                       <td>
                                          {new Date(
                                             item?.dueDate
                                          ).toLocaleDateString("en-IN", {
                                             day: "2-digit",
                                             month: "2-digit",
                                             year: "numeric",
                                          })}
                                       </td>
                                       <td>{item?.type || "-"}</td>
                                       <td style={{ textAlign: "right" }}>
                                          ₹{item?.total || 0}
                                       </td>
                                       <td style={{ textAlign: "right" }}>
                                          ₹{item?.balance || 0}
                                       </td>
                                       <td>{item?.status || "-"}</td>
                                       <td>
                                          <div className={css.actionDivContent}>
                                             <button
                                                onClick={() =>
                                                   handleDelete(item._id)
                                                }
                                             >
                                                <DeleteIcon2 />
                                             </button>
                                             <button
                                                onClick={() => handleEdit(item)}
                                             >
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
                  height="67.25vh"
                  img={party}
                  onClick={() => setOpenForm(true)}
                  BtnText="Add Your First Purchase Order"
                  MiddleText="Make & share purchase orders with your parties & convert them to purchase bill instantly."
               />
            )}
         </div>
      </div>
   );
};

export default PurchaseOrder;
