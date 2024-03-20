import FormItemsRowTable from "../../../Component/FormItemsRowTable";
import { GetAllItems } from "../../../Redux/items/actions";
import { FetchAllParties } from "../../../Redux/parties/actions";
import { PostEstimates } from "../../../Redux/sales/action";
import ItemsForm from "../../../components/addForm/ItemsForm";
import css from "../../../styles/SalesStyles/SalesForms.module.css";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillFileAdd as AddDecriptionIcon } from "react-icons/ai";
import { BiSolidCameraPlus as AddCameraIcon, BiSolidCheckboxChecked as CheckedBox } from "react-icons/bi";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { ImCheckboxUnchecked as EmptyCheckedBox } from "react-icons/im";
import { IoIosArrowDown as ArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const EstimateForm = ({ setOpenForm, setToggleSetting }) => {
   const toast = useToast();
   const dispatch = useDispatch();
   const isLoading = useSelector((state) => state.SalesReducer.isLoading);
   const partiesLoading = useSelector(
      (state) => state.PartiesReducer.isLoading
   );
   const partiesData = useSelector((state) => state.PartiesReducer.partiesData);
   const togglePartiesData = useSelector(
      (state) => state.PartiesReducer.togglePartiesData
   );
   const toggleItems = useSelector((state) => state.ItemReducer.toggleItems);
   const estimatesList = useSelector(
      (state) => state.SalesReducer.estimatesList
   );

   const [toggleDesc, setToggleDesc] = useState(false);
   const [showItemForm, setShowAddItemsForm] = useState(false);
   const [rowFooterData, setRowFooterData] = useState({});
   const [toggleRoundOff, setToggleRoundOff] = useState(false);
   const [activeRowIndex, setActiveRowIndex] = useState(0);
   const [showItemsListMenu, setShowItemsListMenu] = useState(false);
   const [currentCustomerData, setCurrentCustomerData] = useState({});
   const [topMarginAddDescInp, setTopMarginAddDescInp] = useState("0px");

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
   const [estimateData, setEstimateData] = useState({
      type: "Estimate",
      status: "Pending",
      customerName: "",
      refNo: estimatesList.length+1,
      invoiceDate: new Date().toISOString().split("T")[0],
      stateOfSupply: "",
      priceUnitWithTax: false,
      addDescription: "",
   });

   //   Form Submission Function
   const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
         ...estimateData,
         customerName: currentCustomerData?._id || "",
         customerId: currentCustomerData?._id || "",
         estimate: tableRowsArr,
         total: toggleRoundOff
            ? Math.round(rowFooterData?.totalAmount)
            : rowFooterData?.totalAmount,
      };
      PostEstimates(dispatch, data, setOpenForm, toast);
      console.log("estimateData", data);
   };

   // for fetching all parties list on form mount
   useEffect(() => {
      FetchAllParties(dispatch);
   }, [togglePartiesData]);

   // for fetching all items list on form mount
   useEffect(() => {
      dispatch(GetAllItems());
   }, [toggleItems]);

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

   // Input Change Function
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEstimateData((prev) => {
         return { ...prev, [name]: value };
      });
   };

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
         {showItemForm && (
            <ItemsForm
               handleSettingClick={handleSettingClick}
               closeForm={setShowAddItemsForm}
            />
         )}

         <div className={css.topheader}>
            <p>Estimate/Quotation</p>
         </div>

         <div className={css.ContentContainerDiv}>
            {/* Middle Section */}
            <div className={css.middleOuter}>
               <div className={css.leftSideCont}>
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
                  </div>
               </div>

               <div className={css.rightSideCont}>
                  <div>
                     <p>Ref No.</p>
                     <input
                        type="text"
                        placeholder="1"
                        name="refNo"
                        value={estimateData?.refNo}
                        onChange={handleInputChange}
                        className={css.invoiceNumInp}
                        required
                     />
                  </div>
                  <div>
                     <p>Invoice Date</p>
                     <input
                        type="date"
                        placeholder="Invoice Date"
                        name="invoiceDate"
                        value={estimateData?.invoiceDate}
                        onChange={handleInputChange}
                        className={css.invoiceDateSelectInp}
                     />
                  </div>
                  <div>
                     <p>State of supply</p>
                     <select
                        name="stateOfSupply"
                        value={estimateData?.stateOfSupply}
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
                              value={estimateData?.priceUnitWithTax}
                              onChange={handleInputChange}
                           >
                              <option value="false">Without Tax</option>
                              <option value="true">With Tax</option>
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
                  {toggleDesc ? (
                     <div
                        className={css.inputDiv}
                        style={{ marginTop: topMarginAddDescInp }}
                     >
                        <textarea
                           value={estimateData?.addDescription}
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
                              estimateData.addDescription
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

export default EstimateForm;
