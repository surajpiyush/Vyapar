import "./Paymentouts.css";
import party from "../../../assets/Images/party.jpg";
import FirstTimeFormToggle from "../../FirmTimeForm/FirstTimeFormToggle";
import {
   deletePayoutBill,
   getPaymentOutBill,
   updatePayoutBill,
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
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import EditableRow from "../../EditForm";
import { FormatDate } from "../../../Redux/sales/action";

const Paymentouts = ({ func, date }) => {
   const dispatch = useDispatch();
   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState(null);
   const store = useSelector((store) => store.PurchaseReducer);
   const data = store.paymentOutData;
   console.log(data);
   //  console.log(date)
   // console.log(store);
   useEffect(() => {
      dispatch(getPaymentOutBill({ date }));
   }, [date, dispatch]);
   // console.log(data);

   // delete
   const handleDelete = (id) => {
      dispatch(deletePayoutBill(id));
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
      dispatch(updatePayoutBill(updatedData._id, updatedData));
      setIsEditing(false);
      setEditedData(null);
      dispatch(getPaymentOutBill({ date }));
   };

   const handleCancel = () => {
      // If the user cancels, reset the state without saving
      setIsEditing(false);
      setEditedData(null);
   };

   const openForm = () => {
      func(true);
   };
   const display = [
      "#",
      "date",
      "refNo",
      "partyName",
      "categoryName",
      "type",
      "total",
      "recieved",
      "balance",
   ];
   return (
      <div className={`main-container ${isEditing ? "editing" : ""}`}>
         {!store.isLoading && !data.length ? (
            <FirstTimeFormToggle
               img={party}
               onClick={() => {
                  openForm();
               }}
               BtnText="Make Your First Payment-Out Order "
               MiddleText="No data is available for Payment-Out.
               Please try again after making relevant changes."
            />
         ) : (
            <div className="payment-out-container">
               <div className="transactions-buttons">
                  {/* <input type="text" /> */}
                  <button
                     onClick={() => {
                        openForm();
                     }}
                  >
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
                                       display={display}
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
                                          <div></div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             {FormatDate(e.date)}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             {e.refNo}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             {e?.partyName}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             {e.categotyName
                                                ? e.categotyName
                                                : "-"}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             {e.type}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             ₹{e.total}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             ₹{e.paid}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             ₹{e.balance}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             <PrinterIcon
                                                onClick={() => window.print()}
                                             />

                                             <DotsIcon />
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             <DeleteIcon
                                                onClick={() =>
                                                   handleDelete(e._id)
                                                }
                                             />
                                          </div>
                                          <EditIcon
                                             onClick={() => handleEdit(e)}
                                          />
                                       </th>
                                    </tr>
                                 )}
                              </React.Fragment>
                           );
                        })}
                     </tbody>
                  )}
               </table>
               <div className="payment-outs-footer">
                  <p>
                     Total Amount: <span>₹ 0.00</span>
                  </p>
                  <p>Balance: ₹0.00</p>
               </div>
            </div>
         )}
      </div>
   );
};

export default Paymentouts;
