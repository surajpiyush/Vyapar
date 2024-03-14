import css from "../../../styles/SalesStyles/SalesForms.module.css";
import ItemsForm from "../../../components/addForm/ItemsForm";
import FormItemsRowTable from "../../../Component/FormItemsRowTable";
import { GetAllItems } from "../../../Redux/items/actions";
import { FetchAllParties } from "../../../Redux/parties/actions";
import { PostDeliveryChallan } from "../../../Redux/sales/action";

import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown as ArrowDown } from "react-icons/io";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { AiFillFileAdd as AddDecriptionIcon } from "react-icons/ai";
import { HiMiniDocumentText as AddDocumentIcon } from "react-icons/hi2";
import { BiSolidCameraPlus as AddCameraIcon } from "react-icons/bi";
import { ImCheckboxUnchecked as EmptyCheckedBox } from "react-icons/im";
import { BiSolidCheckboxChecked as CheckedBox } from "react-icons/bi";

const FormDeliveryChallan = ({ setOpenForm, setToggleSetting }) => {
   const toast = useToast();
   const dispatch = useDispatch();
   const isLoading = useSelector((state) => state.SalesReducer.isLoading);
   const partiesLoading = useSelector(
      (state) => state.PartiesReducer.isLoading
   );
   const togglePartiesData = useSelector(
      (state) => state.PartiesReducer.togglePartiesData
   );
   const partiesData = useSelector((state) => state.PartiesReducer.partiesData);
   const toggleItems = useSelector((state) => state.ItemReducer.toggleItems);
   const deliveryChallanList = useSelector(
      (state) => state.SalesReducer.deliveryChallanList
   );

   const [currentCustomerData, setCurrentCustomerData] = useState({});
   const [toggleDesc, setToggleDesc] = useState(false);
   const [toggleRoundOff, setToggleRoundOff] = useState(false);
   const [toggleCheckReferenceInp, setToggleCheckReferenceInp] =
      useState(false);
   const [paymentTypeSelectTag, setPaymentTypeSelectTag] = useState("Cash");
   const [topMarginAddDescInp, setTopMarginAddDescInp] = useState("");
   const [showItemsListMenu, setShowItemsListMenu] = useState(false);
   const [activeRowIndex, setActiveRowIndex] = useState(0);
   const [rowFooterData, setRowFooterData] = useState({});
   const [showItemForm, setShowAddItemsForm] = useState(false);
   const [balanceAmount, setBalanceAmount] = useState("");

   const [tableRowsArr, setTableRowsArr] = useState([
      {
         itemName: "",
         mainName: "",
         qty: "",
         unit: "",
         priceUnit: "",
         discountpersant: "",
         discountAmount: "",
         taxPersant: "",
         taxAmount: "",
         amount: "",
      },
   ]);
   const [orderData, setOrderData] = useState({
      type: "Delivery Challan",
      status: "Pending",
      party: "",
      billingName: "",
      phoneNumber: "",
      billingAddress: "",
      challanNumber: `${new Date()
         .toLocaleString("default", { month: "short" })
         .toUpperCase()}${new Date().getTime()}${Math.floor(
         Math.random() * 900
      )}`,
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: new Date().toISOString().split("T")[0],
      stateOfSupply: "",
      priceUnitWithTax: false,
      total: "",
   });

   // Submit Request Function
   const handleSubmit = (e) => {
      e.preventDefault();
      let total = toggleRoundOff
         ? Math.round(rowFooterData?.totalAmount)
         : rowFooterData?.totalAmount;
      const data = {
         ...orderData,
         total,
         priceUnitWithTax: orderData?.priceUnitWithTax == "true",
         saleDeliveryChallan: tableRowsArr,
         // balance: balanceAmount,
      };
      PostDeliveryChallan(dispatch, data, setOpenForm, toast);

      // console.log("Delivery Challan Data:", data);
   };

   // Update total footer values
   useEffect(() => {
      let footerObj = {
         totalQty: 0,
         totalDiscountAmount: 0,
         totalTaxAmount: 0,
         totalAmount: 0,
      };
      tableRowsArr?.forEach((item) => {
         if (Number(item?.qty)) {
            footerObj.totalQty += Number(item?.qty);
         }
         if (Number(item?.discountAmount)) {
            footerObj.totalDiscountAmount += Number(item?.discountAmount);
         }
         if (Number(item?.taxAmount)) {
            footerObj.totalTaxAmount += Number(item?.taxAmount);
         }
         if (Number(item?.amount)) {
            footerObj.totalAmount += Number(item?.amount);
         }
      });
      footerObj.totalDiscountAmount = footerObj.totalDiscountAmount.toFixed(2);
      footerObj.totalTaxAmount = footerObj.totalTaxAmount.toFixed(2);
      footerObj.totalAmount = footerObj.totalAmount.toFixed(2);
      setRowFooterData(footerObj);
   }, [
      tableRowsArr[activeRowIndex]?.qty,
      tableRowsArr[activeRowIndex]?.priceUnit,
      tableRowsArr[activeRowIndex]?.discountpersant,
      tableRowsArr[activeRowIndex]?.discountAmount,
      tableRowsArr[activeRowIndex]?.taxPersant,
      tableRowsArr[activeRowIndex]?.taxAmount,
      tableRowsArr[activeRowIndex]?.amount,
   ]);

   // for fetching all parties list on form mount
   useEffect(() => {
      FetchAllParties(dispatch);
   }, [togglePartiesData]);

   // for fetching all items list on form mount
   useEffect(() => {
      dispatch(GetAllItems());
   }, [toggleItems]);

   // for updating Firm Data
   useEffect(() => {
      let obj = {
         party: currentCustomerData?._id || "",
         billingName: currentCustomerData?.partyName || "",
         phoneNumber: currentCustomerData?.phoneNumber || "",
         billingAddress: currentCustomerData?.billingAddress || "",
         openingBalance: currentCustomerData?.openingBalance || "",
      };
      setOrderData((prev) => {
         return { ...prev, ...obj };
      });
   }, [currentCustomerData]);

   // To Show Reference Input
   useEffect(() => {
      if (paymentTypeSelectTag == "Cheque") {
         setToggleCheckReferenceInp(true);
      } else {
         setToggleCheckReferenceInp(false);
      }
   }, [paymentTypeSelectTag]);

   // Input Change Function
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setOrderData((prev) => {
         return { ...prev, [name]: value };
      });
   };

   // for changing balance amount
   useEffect(() => {
      let initAmount = toggleRoundOff
         ? Math.round(rowFooterData?.totalAmount)
         : rowFooterData?.totalAmount;
      let advancedAmount = orderData?.advancedAmount || 0;
      let bal = initAmount - advancedAmount;
      setBalanceAmount(
         bal.toFixed(2) ? bal.toFixed(2) : rowFooterData?.totalAmount
      );
   }, [orderData?.advancedAmount, toggleRoundOff, rowFooterData?.totalAmount]);

   // Add Row Function
   const handleAddRow = (e) => {
      e.stopPropagation();
      let newRowData = {
         itemName: "",
         mainName: "",
         qty: "",
         unit: "",
         priceUnit: "",
         discountpersant: "",
         discountAmount: "",
         taxPersant: "",
         taxAmount: "",
         amount: "",
      };
      setTableRowsArr((prev) => [...prev, newRowData]);
   };

   // setting icon click function
   const handleSettingClick = () => {
      setOpenForm(false);
      setToggleSetting(true);
   };
   return (
      <form onSubmit={handleSubmit} className={css.formOuter}>
         <div className={css.topheader}>
            <p>Delivery Challan</p>
         </div>

         <div className={css.ContentContainerDiv}>
            {showItemForm && (
               <ItemsForm
                  handleSettingClick={handleSettingClick}
                  closeForm={setShowAddItemsForm}
               />
            )}

            {/* Middle  */}
            <div className={css.middleOuter}>
               <div className={css.leftSideCont}>
                  <div className={css.selectOuter}>
                     <select
                        name="billingName"
                        value={currentCustomerData?._id}
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
                        <option value="">
                           {orderData.type == "Credit"
                              ? "Search by Name/Phone"
                              : "Billing Name (Optional)"}
                        </option>
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
                  </div>
                  <div className={css.inputDiv}>
                     <input
                        type="number"
                        name="phoneNumber"
                        value={orderData?.phoneNumber}
                        onChange={handleInputChange}
                        className={css.input}
                        required
                     />
                     <label
                        className={
                           orderData?.phoneNumber
                              ? css.activeLabel
                              : css.inactiveLabel
                        }
                     >
                        Phone No.
                     </label>
                  </div>
                  {orderData?.party && (
                     <div className={css.inputDiv}>
                        <textarea
                           name="billingAddress"
                           value={orderData?.billingAddress}
                           onChange={handleInputChange}
                           style={{ height: "110px", width: "230px" }}
                           className={css.input}
                           required
                        />
                        <label
                           className={
                              orderData?.billingAddress
                                 ? css.activeLabel
                                 : css.inactiveLabel
                           }
                        >
                           Billing Address
                        </label>
                     </div>
                  )}
               </div>

               <div className={css.rightSideCont}>
                  <div>
                     <p>Challan No.</p>
                     <input
                        type="number"
                        name="challanNumber"
                        value={orderData?.challanNumber}
                        onChange={handleInputChange}
                        placeholder="1"
                        className={css.invoiceNumInp}
                        required
                     />
                  </div>
                  <div>
                     <p>Invoice Date</p>
                     <input
                        type="date"
                        name="invoiceDate"
                        value={orderData?.invoiceDate}
                        placeholder="Invoice Date"
                        onChange={handleInputChange}
                        className={css.invoiceDateSelectInp}
                        required
                     />
                  </div>
                  <div>
                     <p>Due Date</p>
                     <input
                        type="date"
                        name="dueDate"
                        value={orderData?.dueDate}
                        //  onChange={handleInputChange}
                        onChange={(e) => {
                           const { name, value } = e.target;
                           if (new Date(value) < new Date()) {
                              setOrderData((prev) => {
                                 return {
                                    ...prev,
                                    [name]: new Date()
                                       .toISOString()
                                       .split("T")[0],
                                 };
                              });
                              toast.closeAll();
                              toast({
                                 title: "Due Date must be after today!",
                                 status: "warning",
                                 position: "top",
                              });
                           } else {
                              handleInputChange(e);
                              toast.closeAll();
                           }
                        }}
                        placeholder="Due Date"
                        className={css.invoiceDateSelectInp}
                        required
                     />
                  </div>
                  <div>
                     <p>State of supply</p>
                     <select
                        name="stateOfSupply"
                        value={orderData?.stateOfSupply}
                        onChange={handleInputChange}
                        className={css.invoiceDateSelectInp}
                        required
                     >
                        <option value="">State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                           Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                           Himachal Pradesh
                        </option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Andaman and Nicobar Islands">
                           Andaman and Nicobar Islands
                        </option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli">
                           Dadra and Nagar Haveli
                        </option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Puducherry">Puducherry</option>
                     </select>
                  </div>
               </div>
            </div>

            {/* Items Section */}
            <div className={css.ItemsOuter}>
               <table>
                  <thead>
                     <tr>
                        <th className={css.serialNumberHead}>#</th>
                        <th className={css.itemNameHead}>ITEM</th>
                        <th className={css.qtyHead}>QTY</th>
                        <th className={css.unitHead}>UNIT</th>
                        <th className={css.priceUnitHead}>
                           <p>PRICE/UNIT</p>
                           <select
                              name="priceUnitWithTax"
                              value={orderData?.priceUnitWithTax}
                              onChange={handleInputChange}
                           >
                              <option value={false}>Without Tax</option>
                              <option value={true}>With Tax</option>
                           </select>
                        </th>
                        <th className={css.discountHead}>
                           <p>Discount</p>
                           <div>
                              <p className={css.precentageIconHead}>%</p>
                              <p className={css.amountHead}>AMOUNT</p>
                           </div>
                        </th>
                        <th className={css.taxHead}>
                           <p>TAX</p>
                           <div>
                              <p className={css.precentageIconHead}>%</p>
                              <p className={css.amountHead}>AMOUNT</p>
                           </div>
                        </th>
                        <th className={css.amountHead}>
                           <div>
                              <p>Amount</p>
                              <PlusIcon />
                           </div>
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {tableRowsArr?.map((item, ind) => {
                        return (
                           <FormItemsRowTable
                              ind={ind}
                              item={item}
                              tableRowsArr={tableRowsArr}
                              setTableRowsArr={setTableRowsArr}
                              activeRowIndex={activeRowIndex}
                              setActiveRowIndex={setActiveRowIndex}
                              showItemsListMenu={showItemsListMenu}
                              setShowItemsListMenu={setShowItemsListMenu}
                              setShowAddItemsForm={setShowAddItemsForm}
                              key={ind}
                           />
                        );
                     })}
                     <tr className={css.addRowTr}>
                        <td></td>
                        <td>
                           <div className={css.actualAddRowTd}>
                              <button onClick={handleAddRow} type="button">
                                 ADD ROW
                              </button>
                              <p>Total</p>
                           </div>
                        </td>
                        <td className={css.addRowChildTd}>
                           {rowFooterData?.totalQty}
                        </td>
                        <td></td>
                        <td></td>
                        <td className={css.addRowChildTd}>
                           {rowFooterData?.totalDiscountAmount}
                        </td>
                        <td className={css.addRowChildTd}>
                           {rowFooterData?.totalTaxAmount}
                        </td>
                        <td className={css.addRowChildTd}>
                           {rowFooterData?.totalAmount}
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>

            {/* Bottom Section */}
            <div
               style={{
                  marginTop: showItemsListMenu ? "100px" : "0px",
                  transition: "margin-top 0.5s ease-in",
               }}
               className={css.bottomSectionOuter}
            >
               <div className={css.bottomLeftSideCont}>
                  {/* <div
              style={{
                display: "flex",
                alignItems: "Center",
                gap: "40px",
                zIndex: 600,
              }}
            >
              {rowFooterData?.totalAmount > 0 && (
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
                        onClick={() => setPaymentTypeSelectTag("Cash")}
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
                        onClick={() => setPaymentTypeSelectTag("Cheque")}
                        className={css.menuItemCss}
                      >
                        Cheque
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              )}
              {toggleCheckReferenceInp && (
                <div className={css.inputDiv} style={{ zIndex: 600 }}>
                  <input
                    type="number"
                    value={checkReferenceInpval}
                    name="checkReferenceInpval"
                    onChange={(e) => setCheckReferenceInpval(e.target.value)}
                    className={css.BottomInput}
                    style={{ width: "150px", zIndex: 600 }}
                  />
                  <label
                    style={{ background: "var(--greyB)", zIndex: 600 }}
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
            </div> */}

                  {toggleDesc ? (
                     <div
                        className={css.inputDiv}
                        style={{ marginTop: topMarginAddDescInp }}
                     >
                        <textarea
                           value={orderData.addDescription}
                           name="addDescription"
                           onChange={handleInputChange}
                           className={css.input}
                           style={{
                              height: "110px",
                              width: "230px",
                           }}
                           required
                        />
                        <label
                           htmlFor="addDescription"
                           className={
                              orderData.addDescription
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

               <div className={css.bottomRightSideCont}>
                  <div className={css.rightSideUpperInputsDiv}>
                     <div className={css.roundOffDiv}>
                        {toggleRoundOff ? (
                           <CheckedBox
                              onClick={(e) => {
                                 e.stopPropagation();
                                 setToggleRoundOff((prev) => !prev);
                              }}
                              className={css.checkedInpRoundOff}
                           />
                        ) : (
                           <EmptyCheckedBox
                              className={css.unCheckedInpRoundOff}
                              onClick={(e) => {
                                 e.stopPropagation();
                                 setToggleRoundOff((prev) => !prev);
                              }}
                           />
                        )}
                        <p>Round Off</p>
                        <input
                           type="number"
                           placeholder="0"
                           value={
                              toggleRoundOff
                                 ? rowFooterData.totalAmount -
                                   Math.round(rowFooterData.totalAmount)
                                 : ""
                           }
                           disabled
                           className={css.roundOffNumInp}
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
                           onChange={handleInputChange}
                           readOnly
                           disabled
                        />
                     </div>
                  </div>
                  {/* {rowFooterData?.totalAmount > 0 && (
              <div className={css.bottomRecievedOuterDiv}>
                <div className={css.totalBottomDiv}>
                  <p>Advance Amount</p>
                  <input
                    type="number"
                    name="advancedAmount"
                    value={orderData?.advancedAmount}
                    onChange={handleInputChange}
                    placeholder="0"
                    disabled={!toggleReceived}
                  />
                </div>
                {toggleReceived ? (
                  <CheckedBox
                    onClick={(e) => {
                      e.stopPropagation();
                      setToggleReceived((prev) => !prev);
                    }}
                    className={css.checkedInpRoundOff}
                  />
                ) : (
                  <EmptyCheckedBox
                    className={css.unCheckedInpRoundOff}
                    onClick={(e) => {
                      e.stopPropagation();
                      setToggleReceived((prev) => !prev);
                    }}
                  />
                )}
              </div>
            )}
            {rowFooterData?.totalAmount > 0 && (
              <div className={css.bottomBalanceOuterDiv}>
                <div>
                  <span></span>
                  <p>Balance</p>
                  <p>{balanceAmount}</p>
                </div>
              </div>
            )} */}
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

export default FormDeliveryChallan;
