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
const AddPaymentouts = ({ setOpenForm }) => {
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
   const [toggleCheckReferenceInp, setToggleCheckReferenceInp] =
      useState(false);
   const [paymentTypeSelectTag, setPaymentTypeSelectTag] = useState("Cash");
   const [checkReferenceInpval, setCheckReferenceInpval] = useState("");
   const [topMarginAddDescInp, setTopMarginAddDescInp] = useState("");
   const [showItemsListMenu, setShowItemsListMenu] = useState(false);
   // const [rowFooterData, setRowFooterData] = useState({});
   const [showItemForm, setShowItemForm] = useState(false);
   const [paid, setPaid] = useState(0);
   const [paymentArr, setPaymentArr] = useState([
      { types: "Cash", amount: paid },
   ]);
   const [totalAmount, setTotalAmount] = useState(0);

   const payOutList = useSelector(
      (store) => store.PurchaseReducer.paymentOutData
   );
   const [data, setData] = useState({
      type: "Purchase-Out",
      status: "Pending",
      partyName: "",
      receiptNumber: payOutList.length + 1,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
         hour: "2-digit",
         minute: "2-digit",
         hour12: false,
      }),
      description: "Purchase return of items",

      paid: paid,
      discount: 0,
      total: 0,
   });

   // Submit Request Function
   const handleSubmit = (e) => {
      e.preventDefault();
      const data2 = {
         ...data,
         party: currentCustomerData?._id || "",
         balance: currentCustomerData?.openingBalance || 0,
         paymentType: paymentArr,
         paid: paid,
         total: totalAmount,
      };
      // console.log("data", data2);
      dispatch(addPayOut(data2));
      setOpenForm(false);
   };

   // for fetching all parties list on form mount
   useEffect(() => {
      FetchAllParties(dispatch);
   }, [togglePartiesData]);

   // console.log(data.discount)
   //   for Total Amount updating
   useEffect(() => {
      let total = 0;
      total = paid - (paid * data.discount) / 100;
      setTotalAmount(total);
   }, [paid, data.discount]);

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
   };

   return (
      <form
         onClick={(e) => {
            e.stopPropagation();
         }}
         onSubmit={handleSubmit}
         className={css.formOuter}
      >
         <div className={css.topheader}>
            <p>Payment- Out</p>
         </div>

         <div className={css.ContentContainerDiv}>
            {showItemForm && <ItemsForm closeForm={setShowItemForm} />}

            {/* Middle  */}
            <div className={css.middleOuter}>
               <div className={css.leftSideCont}>
                  <div className={css.selectOuter}>
                     <select
                        name="partyName"
                        value={currentCustomerData?._id}
                        onChange={(e) => {
                           e.stopPropagation();
                           const currentPartyData = partiesData.filter(
                              (item) => item._id == e.target.value
                           );
                           if (currentPartyData.length > 0) {
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
                        required
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
                        readOnly
                        defaultValue={new Date().toISOString().split("T")[0]}
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
                        readOnly
                        defaultValue={new Date().toLocaleTimeString("en-US", {
                           hour: "2-digit",
                           minute: "2-digit",
                           hour12: false,
                        })}
                     />
                  </div>

                  <br />
                  <br />
                  <br />
                  <br />

                  <div className={css.totalBottomDiv}>
                     <p>Paid</p>
                     <input
                        type="number"
                        name="paid"
                        onChange={(e) => setPaid(e.target.value)}
                        required
                     />
                  </div>
                  <div className={css.totalBottomDiv}>
                     <p>Discount</p>
                     <div style={{ position: "relative" }}>
                        <input
                           type="number"
                           name="discount"
                           onChange={(e) => handleChange(e)}
                           placeholder="Discount"
                           style={{ paddingRight: "20px" }}
                        />
                        <span
                           style={{
                              position: "absolute",
                              top: "50%",
                              right: "5px",
                              transform: "translateY(-50%)",
                           }}
                        >
                           %
                        </span>
                     </div>
                  </div>

                  <div className={css.totalBottomDiv}>
                     <p>Total</p>
                     <input
                        type="number"
                        name="total"
                        value={totalAmount}
                        // onChange={(e) => handleChange(e)}
                        readOnly
                        style={{
                           backgroundColor: "#f4f4f4",
                           color: "#888",
                           border: "1px solid #ddd",
                           cursor: "not-allowed",
                        }}
                     />
                  </div>
               </div>
            </div>
            <div className={css.bottomRightSideCont}></div>

            {/* Bottom Section */}

            <div
               style={{
                  marginTop: showItemsListMenu ? "100px" : "0px",
                  transition: "margin-top 0.5s ease-in",
               }}
               className={css.bottomSectionOuter}
            >
               <div className={css.bottomLeftSideCont}>
                  <div
                     style={{
                        display: "flex",
                        alignItems: "Center",
                        gap: "40px",
                        zIndex: 600,
                     }}
                  >
                     <div
                        style={{
                           display: "flex",
                           alignItems: "Center",
                           gap: "40px",
                           zIndex: 600,
                        }}
                     >
                        <div style={{ position: "relative", zIndex: 600 }}>
                           <Menu
                              offset={[0, 0]}
                              onOpen={() => setTopMarginAddDescInp("110px")}
                              onClose={() => setTopMarginAddDescInp("0px")}
                           >
                              <MenuButton
                                 as={Button}
                                 className={css.PartyTypeMenuBtn}
                                 rightIcon={<ArrowDown />}
                                 style={{ width: "150px" }}
                                 type="button"
                              >
                                 {paymentTypeSelectTag}
                              </MenuButton>
                              <p className={css.PartyTypelabel}>Payment Type</p>
                              <MenuList className={css.menuListCss}>
                                 <MenuItem className={css.AddBankAccount}>
                                    <PlusIcon />
                                    Add Bank A/C
                                 </MenuItem>
                                 <MenuItem
                                    style={{
                                       color:
                                          paymentTypeSelectTag == "Cash"
                                             ? "var(--blueB)"
                                             : "var(--greyA)",
                                       background:
                                          paymentTypeSelectTag == "Cash"
                                             ? "var(--greyB)"
                                             : "white",
                                    }}
                                    onClick={() => {
                                       setPaymentArr([
                                          {
                                             types: "Cash",
                                             amount: paid,
                                          },
                                       ]);
                                       setPaymentTypeSelectTag("Cash");
                                    }}
                                    className={css.menuItemCss}
                                 >
                                    Cash
                                 </MenuItem>
                                 <MenuItem
                                    style={{
                                       color:
                                          paymentTypeSelectTag == "Cheque"
                                             ? "var(--blueB)"
                                             : "var(--greyA)",
                                       background:
                                          paymentTypeSelectTag == "Cheque"
                                             ? "var(--greyB)"
                                             : "white",
                                    }}
                                    onClick={() => {
                                       setPaymentArr([
                                          {
                                             types: "Cheque",
                                             refNo: checkReferenceInpval,
                                             amount: paid,
                                          },
                                       ]);
                                       setPaymentTypeSelectTag("Cheque");
                                    }}
                                    className={css.menuItemCss}
                                 >
                                    Cheque
                                 </MenuItem>
                              </MenuList>
                           </Menu>
                        </div>

                        {toggleCheckReferenceInp && (
                           <div
                              className={css.inputDiv}
                              style={{ zIndex: 600 }}
                           >
                              <input
                                 type="number"
                                 value={checkReferenceInpval}
                                 name="checkReferenceInpval"
                                 onChange={(e) =>
                                    setCheckReferenceInpval(e.target.value)
                                 }
                                 className={css.BottomInput}
                                 style={{ width: "150px", zIndex: 600 }}
                              />
                              <label
                                 style={{
                                    background: "var(--greyB)",
                                    zIndex: 600,
                                 }}
                                 className={
                                    checkReferenceInpval
                                       ? css.BottomInpActiveLabel
                                       : css.BottomInpInactiveLabel
                                 }
                              >
                                 Reference No.
                              </label>
                           </div>
                        )}
                     </div>
                  </div>

                  {toggleDesc ? (
                     <div
                        className={css.inputDiv}
                        style={{ marginTop: topMarginAddDescInp }}
                     >
                        <textarea
                           value={data.description}
                           name="description"
                           onChange={(e) => handleChange(e)}
                           className={css.input}
                           style={{
                              height: "110px",
                              width: "230px",
                           }}
                           required
                        />
                        <label
                           htmlFor="description"
                           className={
                              data?.description
                                 ? css.activeLabel
                                 : css.inactiveLabel
                           }
                        >
                           Description
                        </label>
                     </div>
                  ) : (
                     <div
                        onClick={(e) => {
                           e.stopPropagation();
                           setToggleDesc(true);
                        }}
                        className={css.addDecriptionDiv}
                        style={{
                           width: "150px",
                        }}
                     >
                        <AddDecriptionIcon />
                        <p>ADD DESCRIPTION</p>
                     </div>
                  )}
                  <div
                     onClick={(e) => {
                        e.stopPropagation();
                        toast({
                           title: "Feature currently in development",
                           status: "info",
                           position: "top",
                        });
                     }}
                     className={css.addDecriptionDiv}
                     style={{ width: "150px" }}
                  >
                     <AddCameraIcon />
                     <p>ADD IMAGE</p>
                  </div>
                  <div
                     onClick={(e) => {
                        e.stopPropagation();
                        toast({
                           title: "Feature currently in development",
                           status: "info",
                           position: "top",
                        });
                     }}
                     className={css.addDecriptionDiv}
                     style={{ width: "150px" }}
                  >
                     <AddDocumentIcon />
                     <p>ADD DOCUMENT</p>
                  </div>
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
   );
};

export default AddPaymentouts;
