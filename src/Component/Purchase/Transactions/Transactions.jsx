import "./Transactions.css";
import party from "../../../assets/Images/party.jpg";
import FirstTimeFormToggle from "../../FirmTimeForm/FirstTimeFormToggle";
import {
   deletePurchaseBill,
   getPurchaseBill,
   updatePurchaseBill,
} from "../../../Redux/purchase/action";
import {
   DotsIcon,
   FilterIcon,
   PrinterIcon,
   ShareIcon,
   DeleteIcon,
   EditIcon,
} from "../../utils/reactIcons";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import EditableRow from "../../EditForm";

const transactionFilterItems = [
   {
      name: "DATE",
      Icon: {
         /*  <FilterIcon /> */
      },
      //   nestedItems
   },
];

const Transactions = ({ func, date }) => {
   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState(null);
   const openForm = () => {
      func(true);
   };
   const dispatch = useDispatch();
   const isLoading = useSelector((store) => store.PurchaseReducer.isLoading);
   const showAllPurchaseBills = useSelector(
      (store) => store.PurchaseReducer.purchaseBillData
   );
   console.log(showAllPurchaseBills);

   //console.log(date);
   useEffect(() => {
      dispatch(getPurchaseBill({ date }));
   }, [date, dispatch]);

   // delete
   const handleDelete = (id) => {
      dispatch(deletePurchaseBill(id));
   };

   const handleEdit = (data) => {
      setIsEditing(true);
      setEditedData(data);
   };

   const handleSave = (updatedData) => {
      // Implement your logic to save the updated data to the backend
      // You may use an API call or any other method here
      console.log("updatedData-", updatedData);
      const id = updatedData._id;
      // After saving, reset the state
      dispatch(updatePurchaseBill(updatedData._id, updatedData));
      setIsEditing(false);
      setEditedData(null);
   };

   const handleCancel = () => {
      // If the user cancels, reset the state without saving
      setIsEditing(false);
      setEditedData(null);
   };

   // console.log(showAllPurchaseBills);
   return (
      <div className={`main-container ${isEditing ? "editing" : ""}`}>
         {!isLoading && !showAllPurchaseBills.length ? (
            <FirstTimeFormToggle
               img={party}
               onClick={() => openForm()}
               BtnText="Add Your First Purchase Invoice"
               MiddleText="Make Purchase invoices & Print or share with your customers directly via WhatsApp or Email."
            />
         ) : (
            <div className="transactions-container">
               <div className="transactions-buttons">
                  <button onClick={() => openForm()}>
                     <span>+</span> Add Purchase
                  </button>
               </div>
               <section className="transaction-tables">
                  <div className="transaction-table">
                     <p>DATE</p>

                     {/*  <FilterIcon /> */}
                  </div>
                  <div className="transaction-table">
                     <p>INVOICE NO.</p>

                     {/*  <FilterIcon /> */}
                  </div>
                  <div className="transaction-table">
                     <p>PARTY NAME</p>

                     {/*  <FilterIcon /> */}
                  </div>
                  <div className="transaction-table">
                     <p>PAYMENT TYPE</p>

                     {/*  <FilterIcon /> */}
                  </div>
                  <div className="transaction-table">
                     <p>AMOUNT</p>

                     {/*  <FilterIcon /> */}
                  </div>
                  <div className="transaction-table">
                     <p>BALANCE DUE</p>

                     {/*  <FilterIcon /> */}
                  </div>
                  <div className="transaction-table">
                     <p>STATUS</p>

                     {/*  <FilterIcon /> */}
                  </div>
                  <div className="transaction-table">
                     <p></p>

                     {/*  <FilterIcon /> */}
                  </div>
                  <div className="transaction-table">
                     <p></p>

                     {/*  <FilterIcon /> */}
                  </div>
               </section>

               {!isLoading && showAllPurchaseBills.length ? (
                  showAllPurchaseBills?.map((e) => {
                     const payment = e.paymentType
                        .map((paymentType, i) => {
                           if (paymentType.amount && i === 0) return "cash";
                           else if (paymentType.amount && i === 1)
                              return "Cheque";
                           else if (paymentType.amount && i === 2)
                              return "Bank";
                           return null;
                        })
                        .filter((type) => type !== null);
                     return (
                        <React.Fragment key={e._id}>
                           {isEditing && editedData?._id === e._id ? (
                              <EditableRow
                                 data={editedData}
                                 onSave={handleSave}
                                 onCancel={handleCancel}
                              />
                           ) : (
                              <section className="transaction-tables">
                                 <div className="transaction-table">
                                    <p>
                                       {" "}
                                       {new Date(e.billDate).toLocaleDateString(
                                          "en-IN",
                                          {
                                             day: "2-digit",
                                             month: "2-digit",
                                             year: "numeric",
                                          }
                                       )}
                                    </p>
                                 </div>
                                 <div className="transaction-table">
                                    <p>{e.invoice}</p>

                                    {/* <p></p> */}
                                 </div>
                                 <div className="transaction-table">
                                    <p>{e?.partyData?.partyName}</p>
                                 </div>
                                 <div className="transaction-table">
                                    <p>{payment.join(", ")}</p>
                                 </div>
                                 <div className="transaction-table">
                                    <p>{e.amount}</p>
                                 </div>
                                 <div className="transaction-table">
                                    <p>{e.status == "Paid" ? 0 : e.amount}</p>
                                 </div>
                                 <div className="transaction-table">
                                    <p>{e.status}</p>
                                 </div>
                                 <div
                                    className="transaction-table"
                                    style={{
                                       display: "flex",
                                       direction: "row",
                                       justifyContent: "space-evenly",
                                    }}
                                 >
                                    <p
                                       style={{
                                          display: "flex",
                                          justifyContent: "space-around",
                                          fontSize: "1.5em",
                                       }}
                                    >
                                       <PrinterIcon
                                          onClick={() => window.print()}
                                       />{" "}
                                    </p>
                                    <p style={{ fontSize: "1.5rem" }}>
                                       <ShareIcon />
                                    </p>
                                    {/* <FilterIcon/> */}
                                 </div>
                                 <div
                                    className="transaction-table"
                                    style={{
                                       display: "flex",
                                       direction: "row",
                                       justifyContent: "space-evenly",
                                    }}
                                 >
                                    <p
                                       style={{
                                          fontSize: "1.5rem",
                                          textAlign: "center",

                                          justifyContent: "space-around",
                                       }}
                                    >
                                       <DeleteIcon
                                          onClick={() => handleDelete(e._id)}
                                       />
                                    </p>
                                    <p style={{ fontSize: "1.5rem" }}>
                                       <EditIcon
                                          onClick={() => handleEdit(e)}
                                       />
                                    </p>
                                 </div>
                              </section>
                           )}
                        </React.Fragment>
                     );
                  })
               ) : (
                  <BasicSpinner
                     style={{
                        width: "100%",
                        margin: "60px auto",
                        fontSize: "30px",
                     }}
                  />
               )}
            </div>
         )}{" "}
      </div>
   );
};

export default Transactions;
