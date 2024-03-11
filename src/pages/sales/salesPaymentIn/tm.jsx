import css from "../../../styles/SalesStyles/SalesForms.module.css";
import React, { useEffect, useState } from "react";
import "./Paymentouts.css";
import { addPayOut } from "../../../Redux/purchase/action";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown as ArrowDown } from "react-icons/io";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { AiFillFileAdd as AddDecriptionIcon } from "react-icons/ai";
import { HiMiniDocumentText as AddDocumentIcon } from "react-icons/hi2";
import { BiSolidCameraPlus as AddCameraIcon } from "react-icons/bi";
import {
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   Button,
   useToast,
} from "@chakra-ui/react";

import ItemsForm from "../../../components/addForm/ItemsForm";
import { FetchAllParties } from "../../../Redux/parties/actions";
import { DeleteIcon } from "../../utils/reactIcons";
const  AddPaymentouts = ({ setOpenForm }) => {
   const toast = useToast();
   const dispatch = useDispatch();
   const isLoading = useSelector((state) => state.PurchaseReducer.isLoading);
   const partiesLoading = useSelector(
      (state) => state.PartiesReducer.isLoading
   );
   const togglePartiesData = useSelector( 
      (state) => state.PartiesReducer.togglePartiesData
   );
   const partiesData = useSelector((state) => state.PartiesReducer.partiesData);

   const [currentCustomerData, setCurrentCustomerData] = useState({});
   const [toggleDesc, setToggleDesc] = useState(false);
   const [toggleRoundOff, setToggleRoundOff] = useState(false);
   const [toggleCheckReferenceInp, setToggleCheckReferenceInp] =
      useState(false);
   const [paymentTypeSelectTag, setPaymentTypeSelectTag] = useState("Cash");
   const [checkReferenceInpval, setCheckReferenceInpval] = useState("");
   const [topMarginAddDescInp, setTopMarginAddDescInp] = useState("");
   const [showItemsListMenu, setShowItemsListMenu] = useState(false);
   const [rowFooterData, setRowFooterData] = useState({});
   const [showItemForm, setShowItemForm] = useState(false);
   const payOutList = useSelector((store) => store.PurchaseReducer?.paymentOutData);
   const [paymentArr, setPaymentArr] = useState([{ types: "Cash", amount: 0 }]);
   const [totalAmount, setTotalAmount] = useState(0);

   const [data, setData] = useState({
      type: "Purchase-Out",
      status: "Pending",
      partyName: "",
      receiptNumber: payOutList?.length+1,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
         hour: "2-digit",
         minute: "2-digit",
         hour12: false,
      }),
      description: "Purchase return of items",
    
      paid: 0,
      discount: 0,
      total: 0,
   });

   // Submit Request Function
   const handleSubmit = (e) => {
      e.preventDefault();
      const data2 = {
         ...data,
         party: currentCustomerData?._id || "",
         paymentType: paymentArr,
         paid: totalAmount,
         total: totalAmount,
       };
      console.log("data", data2);
      dispatch(addPayOut(data2));
      setOpenForm(false);
   };

   // for fetching all parties list on form mount
   useEffect(() => {
      FetchAllParties(dispatch);
   }, [togglePartiesData]);

     //   for Total Amount updating
  useEffect(() => {
   let total = 0;
   paymentArr.forEach((item) => {
     total += Number(item?.amount);
   });
   setTotalAmount(total);
 }, [paymentArr]);

   // To Show Reference Input
   useEffect(() => {
      if (paymentTypeSelectTag == "Cheque") {
         setToggleCheckReferenceInp(true);
      } else {
         setToggleCheckReferenceInp(false);
      }
   }, [paymentTypeSelectTag]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prev) => {
         return { ...prev, [name]: value };
      });
      // console.log(payment)
   };
   console.log(currentCustomerData);
 //   Add payment type option
 const handleAddPayType = () => {
   let newObj = {
     types: "Cash",
     amount: 0,
   };
   setPaymentArr((prev) => [...prev, newObj]);
 };

 //   Delete payment type
 const handleDeletePayType = (ind) => {
   const newPaymentArr = paymentArr.filter((_, index) => ind != index);
   setPaymentArr(newPaymentArr);
 };


   return (
      <div className={css.overLay}>
      <form  onClick={(e) => {
         e.stopPropagation();
       }} onSubmit={handleSubmit} className={css.formOuter}>
         <div className={css.topheader}>
            <p>Payment- Out</p>
         </div>

         <div className={css.ContentContainerDiv}>
            {showItemForm && <ItemsForm closeForm={setShowItemForm} />}

            {/* Middle  */}
            <div className={css.middleOuter}>
               <div className={css.leftSideCont}>
                  {/* <div className={css.selectOuter}>
                     <select
                        name="partyName"
                        value={currentCustomerData?._id}
                        onChange={(e) => {
                           e.stopPropagation();
                           const currentPartyData = partiesData.filter(
                              (item) => item._id == e.target.value
                           );
                           if (currentPartyData?.length > 0) {
                              setCurrentCustomerData(currentPartyData[0]);
                           }
                           handleChange(e);
                        }}
                        className={css.selectTag}
                        required
                     >
                        <option value="">"Search by Name/Phone"</option>
                        {partiesLoading ? (
                           <option value="">Loading Parties</option>
                        ) : (
                           partiesData?.map((item, ind) => (
                              <option value={item._id} key={ind + item._id}>
                                 {item?.partyName}
                              </option>
                           ))
                        )}
                     </select>
                     <p style={{ textAlign: "right" }}>
                        {currentCustomerData.openingBalance ? (
                           <>Balance: {currentCustomerData.openingBalance}</>
                        ) : (
                           ""
                        )}
                     </p>
                  </div> */}
                    {/* Party Name Select */}
            <div className={css.selectOuter}>
              <select
                name="customerName"
                value={currentCustomerData?._id || ""}
                onChange={(e) => {
                  e.stopPropagation();
                  const currentPartyData = partiesData.filter(
                    (item) => item._id == e.target.value
                  );
                  if (currentPartyData.length > 0) {
                    setCurrentCustomerData(currentPartyData[0]);
                  }
                }}
                className={css.selectTag}
                required
              >
                <option value="">Search by Name/Phone</option>
                {partiesLoading ? (
                  <option value="">Loading Parties</option>
                ) : (
                  partiesData?.map((item, ind) => (
                    <option value={item._id} key={ind + item._id}>
                      {item?.partyName}
                    </option>
                  ))
                )}
              </select>
              <p style={{ textAlign: "right" }}>
                        {currentCustomerData.openingBalance ? (
                           <>Balance: {currentCustomerData.openingBalance}</>
                        ) : (
                           ""
                        )}
                     </p>
            </div>
               </div>

               <div className={css.rightSideCont}>
                  <div>
                     <p>Recipt Number</p>
                     <input
                        type="text"
                        placeholder="1"
                        value={data?.receiptNumber}
                        className={css.invoiceNumInp}
                        onChange={(e) => handleChange(e)}
                        name="receiptNumber"
                     />
                  </div>
                  <div>
                     <p> Date</p>
                     <input
                        type="date"
                        placeholder="Invoice Date"
                        className={css.invoiceDateSelectInp}
                        onChange={(e) => handleChange(e)}
                        name="date"
                        defaultValue={new Date().toISOString().split("T")[0]}
                        readOnly
                     />
                  </div>
                  <div>
                     <p>Time</p>
                     <input
                        type="time"
                        placeholder="Invoice Time"
                        className={css.invoiceDateSelectInp}
                        onChange={(e) => handleChange(e)}
                        name="time"
                        defaultValue={new Date().toLocaleTimeString("en-US", {
                           hour: "2-digit",
                           minute: "2-digit",
                           hour12: false,
                        })}
                     readOnly
                     />
                  </div>

                  <br />
                  <br />
                  <br />
                  <br />

{/* Payment Type */}

                  <div className={css.totalBottomDiv}>
                     <p>Paid</p>
                     <input
                        type="number"
                        name="paid"
                        onChange={(e) => handleChange(e)}
                     />
                  </div>
                  <div className={css.totalBottomDiv}>
                     <p>Discount</p>
                     <input
                        type="number"
                        name="discount"
                        onChange={(e) => handleChange(e)}
                     />
                  </div>
                  <div className={css.totalBottomDiv}>
                     <p>Total</p>
                     <input
                        type="number"
                        name="total"
                        value={
                           toggleRoundOff
                              ? Math.round(rowFooterData?.totalAmount)
                              : rowFooterData?.totalAmount
                        }
                        onChange={(e) => handleChange(e)}
                     />
                  </div>
               </div>
            </div>
            <div className={css.bottomRightSideCont}></div>

            {/* Bottom Section */}

              {/* Payment Type */}
              <div className={css.paymentOuter}>
                {paymentArr?.map((item, ind) => (
                  <div key={ind} className={css.paymentInnerOuterDivs}>
                    <div className={css.selectOuter}>
                      <select
                        name="types"
                        value={item?.types}
                        onChange={(e) => {
                          setPaymentArr((prev) => {
                            return prev.map((ite, index) =>
                              index != ind
                                ? ite
                                : { ...ite, types: e.target.value }
                            );
                          });
                        }}
                        className={css.selectTag}
                        required
                      >
                        <option value="Cash">Cash</option>
                        <option value="Credit">Credit</option>
                      </select>
                    </div>
                    <div className={css.divWhichHasDeleteBtn}>
                      <div className={css.inputDiv}>
                        <input
                          type="number"
                          value={item?.amount}
                          name="amount"
                          onChange={(e) => {
                            setPaymentArr((prev) => {
                              return prev.map((ite, index) =>
                                index != ind
                                  ? ite
                                  : { ...ite, amount: e.target.value }
                              );
                            });
                          }}
                          className={css.input}
                          required
                        />
                        <label
                          style={{ color: "var(--greyA)" }}
                          className={css.activeLabel}
                          // className={
                          //   invoiceData.phoneNumber ? css.activeLabel : css.inactiveLabel
                          // }
                        >
                          Amount
                        </label>
                      </div>
                      {paymentArr.length > 1 && (
                        <DeleteIcon onClick={() => handleDeletePayType(ind)} />
                      )}
                    </div>
                    {item?.types != "Cash" && (
                      <div className={css.inputDiv}>
                        <input
                          type="number"
                          value={item?.refreanceNo}
                          name="refreanceNo"
                          onChange={(e) => {
                            setPaymentArr((prev) => {
                              return prev.map((ite, index) =>
                                index != ind
                                  ? ite
                                  : { ...ite, refreanceNo: e.target.value }
                              );
                            });
                          }}
                          className={css.input}
                          required
                        />
                        <label
                          className={
                            item.refreanceNo ? css.activeLabel : css.inactiveLabel
                          }
                        >
                          Reference No.
                        </label>
                      </div>
                    )}
                  </div>
                ))}
                <div className={css.paymentFooterDiv}>
                  <p onClick={handleAddPayType}>+ Add Payment type</p>
                  <p>Total payment : {totalAmount}</p>
                </div>
              </div>

         </div>

         {/* Footer */}
         <div className={css.FooterOuter}>
            <button type="submit">{isLoading ? "Saving" : "Save"}</button>
            <div
               className={css.shareBtn}
               onClick={() =>
                  toast({
                     title: "Feature currently in development",
                     status: "info",
                     position: "top",
                  })
               }
            >
               <p>Share</p>
               <ArrowDown />
            </div>
         </div>
      </form>
      </div>
   );
};

export default AddPaymentouts;
