import "./Transactions.css";
import party from "../../../assets/Images/party.jpg";
import FirstTimeFormToggle from "../../FirmTimeForm/FirstTimeFormToggle";
import {
   GetSinglePurchaseBillData,
   deletePurchaseBill,
   getPurchaseBill,
   updatePurchaseBill,
} from "../../../Redux/purchase/action";
import {
   DotsIcon,
   FilterIcon,

   ShareIcon,
   DeleteIcon,
   EditIcon,
} from "../../utils/reactIcons";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import EditableRow from "../../EditForm";
import { useToast } from "@chakra-ui/react";
import EditPurchaseForm from "../EditPurchaseForm";

const Transactions = ({ func, date, info, data }) => {
   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState(null);
   const toast = useToast();
   const dispatch = useDispatch();
   const isLoading = useSelector((store) => store.PurchaseReducer.isLoading);
   const showAllPurchaseBills = useSelector(
      (store) => store.PurchaseReducer.purchaseBillData
   );
   const singleData = useSelector(
      (store) => store.PurchaseReducer.singlePurchseData
   );

   const openForm = () => {
      func(true);
   };

   const handleEdit = (data) => {
      setIsEditing(true);
      setEditedData(data);
   };

   const handleDelete = (id) => {
      dispatch(
         deletePurchaseBill(id, toast, () => {
            dispatch(getPurchaseBill({ date }));
         })
      );
   };

   const handleSave = (updatedData) => {
      dispatch(
         updatePurchaseBill(updatedData._id, updatedData, () => {
            dispatch(getPurchaseBill({ date }));
         })
      );
      setIsEditing(false);
      setEditedData(null);
   };

   const handleCancel = () => {
      setIsEditing(false);
      setEditedData(null);
   };

   const display = [
      "billDate",
      "billNumber",
      "partyName",
      "paymentType",
      "amount",
      "balanceDue",
      "status",
      "hariom",
   ];

   // console.log(showAllPurchaseBills);
   return (
      <div className={`main-container ${isEditing ? "editing" : ""}`}>
         {/* {isEditing && <EditPurchaseForm />} */}
         {!isLoading && !showAllPurchaseBills.length ? (
            <FirstTimeFormToggle
               img={party}
               onClick={() => openForm()}
               BtnText="Add Your First Purchase Invoice"
               MiddleText="Make Purchase invoices & share with your customers directly via WhatsApp or Email."
            />
         ) : (
            <div className="transactions-container">
               <div className="transactions-buttons">
                  <button onClick={() => openForm()}>
                     <span>+</span> Add Purchase
                  </button>
               </div>
               <section className="transaction-tables">
                  <table>
                     <thead>
                        <tr>
                           <th>DATE</th>
                           <th>INVOICE NO.</th>
                           <th>PARTY NAME</th>
                           <th>PAYMENT TYPE</th>
                           <th>AMOUNT</th>
                           <th>BALANCE DUE</th>
                           <th>STATUS</th>
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {!isLoading && showAllPurchaseBills.length ? (
                           showAllPurchaseBills?.map((e) => {
                              info.paid +=
                                 Number(e?.amount) - Number(e?.balanceDue);

                              info.unpaid += e.balanceDue;
                              info.total += e.amount;

                              return (
                                 <React.Fragment key={e._id}>
                                    {isEditing && editedData?._id === e._id ? (
                                       <tr
                                          style={{
                                             width: "80%",
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
                                       <tr key={e._id}>
                                          <td>
                                             {new Date(
                                                e.billDate
                                             ).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                             })}
                                          </td>
                                          <td>{e.billNumber}</td>
                                          <td>{e?.partyName}</td>
                                          <td>{e.paymentType[0]?.types}</td>
                                          <td>{e.amount}</td>
                                          <td>
                                             {e.status === "Paid"
                                                ? 0
                                                : e?.balanceDue}
                                          </td>
                                          <td>{e.status}</td>
                                          <td>
                                             <button
                                                onClick={() =>
                                                   handleDelete(e._id)
                                                }
                                             >
                                                <DeleteIcon />
                                             </button>
                                             <button
                                                onClick={() => handleEdit(e)}
                                             >
                                                <EditIcon />
                                             </button>
                                          </td>
                                       </tr>
                                    )}
                                 </React.Fragment>
                              );
                           })
                        ) : (
                           <tr>
                              <td colSpan="8">
                                 <BasicSpinner
                                    style={{
                                       width: "100%",
                                       margin: "60px auto",
                                       fontSize: "30px",
                                    }}
                                 />
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </section>
            </div>
         )}{" "}
      </div>
   );
};

export default Transactions;
