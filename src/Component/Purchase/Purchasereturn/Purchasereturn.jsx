import party from "../../../assets/Images/party.jpg";
import FirstTimeFormToggle from "../../FirmTimeForm/FirstTimeFormToggle";
import {
   deletePurchaseReturnBill,
   getPurchaseReturn,
} from "../../../Redux/purchase/action";
import {
   DeleteIcon,
   DotsIcon,
   EditIcon,
   FilterIcon,
   PrinterIcon,
   ShareIcon,
} from "../../utils/reactIcons";

import React, { useEffect, useState } from "react";

import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import EditableRow from "../../EditForm";

const Purchasereturn = ({ func, date }) => {
   const dispatch = useDispatch();
   const store = useSelector((store) => store.PurchaseReducer);
   const data = store?.purchaseReturnData;
   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState(null);  

   // console.log(store)
   useEffect(() => {
      dispatch(getPurchaseReturn({ date }));
   }, [dispatch, date]);

   // delete
   const handleDelete = (id) => {
      dispatch(deletePurchaseReturnBill(id));
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
      // dispatch(updatePay(updatedData._id, updatedData));
      setIsEditing(false);
      setEditedData(null);
   };

   const handleCancel = () => {
      // If the user cancels, reset the state without saving
      setIsEditing(false);
      setEditedData(null);
   };

   const openForm = () => {
      func(true);
   };
   console.log(data);
   return (
      <div className={`main-container ${isEditing ? "editing" : ""}`}>
         {!store.isLoading && !data.length ? (
            <FirstTimeFormToggle
               img={party}
               onClick={() => {
                  openForm();
               }}
               BtnText="Make Your First Purchase Return Order "
               MiddleText="No data is available for Debit-Note .
               Please try again after making relevant changes."
            />
         ) : (
            <div className="payment-out-container">
               <div className="transactions-buttons">
                  <input type="text" />
                  <button onClick={() => openForm()}>
                     <span>+</span> Add Payment-out
                  </button>
               </div>

               <table className="table">
                  <thead className="table-head">
                     <tr className="tabel-row">
                        <th className="table-h">
                           <div className="table-items">#</div>
                           <div></div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">Date</div>

                           {/*  <FilterIcon /> */}
                        </th>
                        <th className="table-h">
                           <div className="table-items">Ref No.</div>

                           {/*  <FilterIcon /> */}
                        </th>
                        <th className="table-h">
                           <div className="table-items">PartyName</div>

                           {/*  <FilterIcon /> */}
                        </th>
                        <th className="table-h">
                           <div className="table-items">CategoryName</div>

                           {/*  <FilterIcon /> */}
                        </th>
                        <th className="table-h">
                           <div className="table-items">Type</div>

                           {/*  <FilterIcon /> */}
                        </th>
                        <th className="table-h">
                           <div className="table-items">Total</div>

                           {/*  <FilterIcon /> */}
                        </th>
                        <th className="table-h">
                           <div className="table-items">Recevied</div>

                           {/*  <FilterIcon /> */}
                        </th>
                        <th className="table-h">
                           <div className="table-items">Balance</div>

                           {/*  <FilterIcon /> */}
                        </th>
                        <th className="table-h">
                           <div className="table-items">Print</div>

                           {/*  <FilterIcon /> */}
                        </th>
                        <th className="table-h">
                           <div className="table-items">Action</div>

                           {/*  <FilterIcon /> */}
                        </th>
                     </tr>
                  </thead>
                  {store.isLoading ? (
                     <BasicSpinner
                        style={{
                           width: "100%",
                           margin: "60px auto",
                           fontSize: "30px",
                        }}
                     />
                  ) : (
                     <tbody>
                        {data?.map((e, i) => {
                           return (
                              <React.Fragment key={e._id}>
                                 {isEditing && editedData?._id === e._id ? (
                                    <EditableRow
                                       data={editedData}
                                       onSave={handleSave}
                                       onCancel={handleCancel}
                                    />
                                 ) : (
                                    <tr className="tabel-row tale-data">
                                       <th className="table-h">
                                          <div className="table-items">
                                             {i + 1}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             {new Date(
                                                e.billDate
                                             ).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                             })}
                                          </div>
                                       </th>

                                       <th className="table-h">
                                          <div className="table-items">
                                             {e.returnNumber}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             {e?.partyData?.partyName}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             {e.categoryName}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             {e.type}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             ₹{e.total ? e.total : e.balanceDue}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             ₹{e.balanceDue}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             ₹{e.amount}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             <PrinterIcon
                                                onClick={() => window.print()}
                                             />
                                             <ShareIcon />
                                             
                                          </div>
                                       </th>
                                       <th>
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
                                       </th>
                                    </tr>
                                 )}
                              </React.Fragment>
                           );
                        })}
                     </tbody>
                  )}
               </table>
            </div>
         )}
      </div>
   );
};

export default Purchasereturn;
