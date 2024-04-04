import css from "../../styles/SalesStyles/SalesForms.module.css";
import { useDispatch, useSelector } from "react-redux";
import { memo, useState } from "react";
import { TbArrowsMove as MoveIcon } from "react-icons/tb";
import { updatePurchaseBill } from "../../Redux/purchase/action";
const EditPurchaseForm = memo((data) => {
   const category = useSelector((state) => state.ItemReducer.category);
   const dispatch = useDispatch();
   const sortedStates = [
      "Andaman and Nicobar Islands",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chandigarh",
      "Chhattisgarh",
      "Dadra and Nagar Haveli",
      "Daman and Diu",
      "Delhi",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Lakshadweep",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Puducherry",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
   ];

   const [formData, setFormData] = useState(data?.data);
   console.log(formData.partyData);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      console.log(name);
      if (
         name === "partyName" ||
         name === "phoneNumber" ||
         name === "gstNo" ||
         name === "billingAddress"
      ) {
         setFormData((prev) => ({
            ...prev,
            partyData: prev.partyData.map((item, index) => {
               if (index === 0) {
                  return {
                     ...item,
                     [name]: value,
                  };
               }
               if (!(name in item)) {
                  return {
                     ...item,
                     [name]: value,
                  };
               }
               return item;
            }),
         }));
      } else {
         setFormData((prevData) => ({
            ...prevData,
            [name]: value,
         }));
      }
   };

   const handleItemChange = (e, index) => {
      const { name, value } = e.target;
      const updatedItems = [...formData.sale];
      updatedItems[index] = {
         ...updatedItems[index],
         [name]: value,
      };
      setFormData((prevData) => ({
         ...prevData,
         sale: updatedItems,
      }));
   };

   const handleUpdate = (e) => {
      e.preventDefault();
      // dispatch(updatePurchaseBill(formData._id, formData));
      updatePurchaseBill(dispatch,formData._id,formData)
      // setIsEditing(false);
   };

   return (
      <form className={css.formOuter} onSubmit={handleUpdate}>
         <div className={css.topheader}>
            <p>Purchase Bill Edit Form</p>
         </div>
         <div className={css.ContentContainerDiv}>
            {/* Middle  */}
            <div className={css.middleOuter}>
               <div className={css.leftSideCont}>
                  <div className={css.selectOuter}>
                     <div className={css.inputDiv}>
                        <label htmlFor="">Party Name</label>
                        <input
                           type="text"
                           value={formData?.partyData?.[0]?.partyName}
                           name="partyName"
                           onChange={handleInputChange}
                           className={css.input}
                        />
                     </div>
                     <p style={{ textAlign: "right" }}></p>
                  </div>
                  <div className={css.inputDiv}>
                     <label htmlFor="">Phone No.</label>
                     <input
                        type="number"
                        value={formData?.partyData?.[0]?.phoneNumber}
                        name="phoneNumber"
                        onChange={handleInputChange}
                        className={css.input}
                     />
                  </div>
                  <div className={css.inputDiv}>
                     <label htmlFor="">GST Number</label>
                     <input
                        type="text"
                        value={formData?.partyData?.[0]?.gstNo}
                        name="gstNo"
                        onChange={handleInputChange}
                        className={css.input}
                     />
                  </div>
               </div>
               <div>
                  <div>
                     <div className={css.inputDiv}>
                        <label htmlFor="PO No">PO No.</label>
                        <input
                           //
                           type="text"
                           name="poNo"
                           className={css.input}
                           value={formData?.poNumber || ""}
                           onChange={handleInputChange}
                        />
                     </div>
                     <br />
                     <div className={css.inputDiv}>
                        <label htmlFor="PO Date">PO Date</label>
                        <input
                           //
                           type="Date"
                           name="poDate"
                           value={formData?.poDate || ""}
                           // defaultValue={new Date().toISOString().split("T")[0]}
                           className={css.input}
                           onChange={handleInputChange}
                        />
                     </div>
                     <br />
                  </div>

                  <div className={css.inputDiv}>
                     <label htmlFor="PO No">E-Way Bill</label>
                     <input
                        //
                        type="text"
                        name="eWayBill"
                        onChange={handleInputChange}
                        className={css.input}
                        value={formData?.eWayBillNo || ""}
                     />
                  </div>
               </div>

               <div className={css.rightSideCont}>
                  <div>
                     <p>Bill Number</p>
                     <input
                        type="text"
                        placeholder="1"
                        value={formData?.billNumber}
                        className={css.invoiceNumInp}
                        onChange={handleInputChange}
                        name="billNumber"
                     />
                  </div>
                  <div>
                     <p>Bill Date</p>
                     <input
                        type="date"
                        placeholder="Invoice Date"
                        className={css.invoiceDateSelectInp}
                        onChange={handleInputChange}
                        name="billDate"
                        // value={
                        //    formData.billDate
                        //       ? new Date(data.billDate)
                        //            .toISOString()
                        //            .split("T")[0]
                        //       : ""
                        // }
                        // defaultValue={new Date().toISOString().split("T")[0]}
                        // readOnly
                     />
                  </div>
                  <div>
                     <p>Time</p>
                     <input
                        type="time"
                        placeholder="Invoice Time"
                        className={css.invoiceDateSelectInp}
                        onChange={handleInputChange}
                        name="time"
                        // value={
                        //    formData.time instanceof Date && !isNaN(formData.time)
                        //       ? formData.time.toLocaleTimeString("en-US", {
                        //            hour: "2-digit",
                        //            minute: "2-digit",
                        //            hour12: false,
                        //         })
                        //       : ""
                        // }

                        // readOnly
                     />
                  </div>

                  <div>
                     <p>Payment Terms</p>
                     <select
                        name="paymentTerms"
                        value={formData.paymentTerms}
                        onChange={handleInputChange}
                     >
                        <option value="">Due On Recipt</option>
                        <option value="net 15">Net 15</option>
                        <option value="net 30">Net 30</option>
                        <option value="net 45">Net 45</option>
                        <option value="net 60">Net 60</option>
                     </select>
                  </div>
                  <div>
                     <p>Due Date</p>
                     <input
                        type="date"
                        placeholder="Due Date"
                        className={css.invoiceDateSelectInp}
                        onChange={handleInputChange}
                        // value={
                        //    formData.dueDate
                        //       ? new Date(formData.dueDate)
                        //            .toISString()
                        //            .split("T")[0]
                        //       : ""
                        // }
                        name="dueDate"
                     />
                  </div>

                  <div>
                     <p>State of supply</p>
                     <select
                        name="stateOfSupply"
                        id=""
                        className={css.invoiceDateSelectInp}
                        onChange={handleInputChange}
                        value={formData?.placeofSupply}
                     >
                        <option value="">State</option>
                        {sortedStates.map((state) => (
                           <option key={state} value={state}>
                              {state}
                           </option>
                        ))}
                     </select>
                  </div>
               </div>
            </div>
            {/* Items Section */}
            <div className={css.ItemsOuter}>
               <br />
               <br />
               <br />
               <table>
                  <thead>
                     <tr>
                        <th className={css.serialNumberHead}>#</th>
                        <th className={css.unitHead}>CATEGORY</th>
                        <th className={css.itemNameHead}>ITEM</th>
                        <th className={css.unitHead}>ITEM CODE</th>
                        <th className={css.unitHead}>HSN CODE</th>
                        {/* <th className={css.itemNameHead}>DESCRIPTION</th> */}

                        <th className={css.unitHead}>COUNT</th>

                        <th className={css.qtyHead}>QTY</th>

                        <th className={css.unitHead}>FREE QTY</th>

                        <th className={css.unitHead}>UNIT</th>
                        <th className={css.priceUnitHead}>
                           <p>PRICE/UNIT</p>
                           <select name="priceUnitWithTax">
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
                              {/* <PlusIcon /> */}
                           </div>
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {formData?.sale?.map((item, ind) => (
                        <tr
                           key={ind}
                           style={{
                              background:
                                 ind % 2 === 0
                                    ? "var(--greyishBlue)"
                                    : "var(--greyB)",
                           }}
                        >
                           <td className={css.serialNumberBody}>
                              <div>
                                 <MoveIcon className={css.serialIconsBody} />
                                 <p>{ind + 1}</p>
                              </div>
                           </td>
                           <td className={css.itemNameBody}>
                              <select
                                 name="category"
                                 value={item?.id}
                                 className={css.selectTag}
                                 onChange={(e) => handleItemChange(e, ind)}
                              >
                                 <option value="">Category</option>
                                 {!item?.category ? (
                                    <option value="">
                                       No Categories Found
                                    </option>
                                 ) : (
                                    category
                                       .filter(
                                          (categoryItem) =>
                                             categoryItem._id === item.category
                                       )
                                       .map((filteredItem) => (
                                          <option
                                             value={filteredItem._id}
                                             key={filteredItem._id}
                                          >
                                             {filteredItem?.categoryName}
                                          </option>
                                       ))
                                 )}
                                 {!category.some(
                                    (categoryItem) =>
                                       categoryItem._id === item.category
                                 ) &&
                                    category.map((categoryItem) => (
                                       <option
                                          value={categoryItem._id}
                                          key={categoryItem._id}
                                       >
                                          {categoryItem.categoryName}
                                       </option>
                                    ))}
                              </select>
                           </td>
                           <td className={css.itemNameBody}>
                              <input
                                 type="text"
                                 name="itemName"
                                 value={item?.itemName}
                                 className={css.tableInputs}
                                 onChange={(e) => handleItemChange(e, ind)}
                              />
                           </td>
                           <td className={css.qtyBody}>
                              <input
                                 type="text"
                                 className={css.tableInputs}
                                 name="itemCode"
                                 onChange={(e) => handleItemChange(e, ind)}
                                 value={item?.itemCode}
                                 // disabled
                              />
                           </td>
                           <td className={css.qtyBody}>
                              <input
                                 type="text"
                                 name="hsnCode"
                                 value={item?.hsnCode}
                                 onChange={(e) => handleItemChange(e, ind)}
                                 placeholder=""
                                 className={css.tableInputs}
                              />
                           </td>

                           <td className={css.qtyBody}>
                              <input
                                 onChange={(e) => handleItemChange(e, ind)}
                                 type="number"
                                 className={css.tableInputs}
                                 name="count"
                                 placeholder="0"
                              />
                           </td>

                           <td className={css.qtyBody}>
                              <input
                                 type="number"
                                 name="qty"
                                 onChange={(e) => handleItemChange(e, ind)}
                                 value={item?.qty}
                                 placeholder="0"
                                 className={css.tableInputs}
                              />
                           </td>

                           <td className={css.qtyBody}>
                              <input
                                 type="number"
                                 onChange={(e) => handleItemChange(e, ind)}
                                 name="freeqty"
                                 placeholder="0"
                                 className={css.tableInputs}
                              />
                           </td>

                           <td className={css.unitBody}>
                              <select
                                 name="unit"
                                 onChange={(e) => handleItemChange(e, ind)}
                                 value={item?.unit}
                                 placeholder="None"
                              >
                                 <option value="">None</option>
                                 <option value="BAGS">BAGS (BAG)</option>
                                 <option value="BOTTLES">BOTTLES (BTL)</option>
                                 <option value="BOX">BOX (BOX)</option>
                                 <option value="BUNDLES">
                                    BUNDLES (BUNDLE)
                                 </option>
                                 <option value="CANS">CANS (CAN)</option>
                                 <option value="CARTONS">CARTONS (CTN)</option>
                                 <option value="DOZENS">DOZENS (DZN)</option>
                                 <option value="GRAMMES">GRAMMES (GM)</option>
                                 <option value="KILOGRAMS">
                                    KILOGRAMS (KG)
                                 </option>
                                 <option value="LITRE">LITRE (LTR)</option>
                                 <option value="METERS">METERS (MTR)</option>
                                 <option value="MILILITRE">
                                    MILILITRE (ML)
                                 </option>
                                 <option value="NUMBERS">NUMBERS (NOS)</option>
                                 <option value="PACKS">PACKS (PAC)</option>
                                 <option value="PAIRS">PAIRS (PRS)</option>
                                 <option value="PIECES">PIECES (PCS)</option>
                                 <option value="QUINTAL">QUINTAL (QTL)</option>
                                 <option value="ROLLS">ROLLS (ROL)</option>
                                 <option value="SQUARE FEET">
                                    SQUARE FEET (SQF)
                                 </option>
                                 <option value="SQUARE METERS">
                                    SQUARE METERS (SQM)
                                 </option>
                                 <option value="TABLETS">TABLETS (TBS)</option>
                              </select>
                           </td>
                           <td className={css.qtyBody}>
                              <input
                                 type="number"
                                 onChange={(e) => handleItemChange(e, ind)}
                                 name="priceUnit"
                                 value={item?.priceUnit}
                                 placeholder="0"
                                 className={css.tableInputs}
                              />
                           </td>
                           <td className={css.DiscountBody}>
                              <input
                                 type="number"
                                 name="discountpersant"
                                 onChange={(e) => handleItemChange(e, ind)}
                                 value={item?.discountpersant}
                                 placeholder="0"
                                 className={css.tableInputs}
                              />
                              <input
                                 type="number"
                                 name="discountAmount"
                                 onChange={(e) => handleItemChange(e, ind)}
                                 value={item?.discountAmount}
                                 placeholder="0"
                                 className={css.tableInputs}
                              />
                           </td>
                           <td className={css.ItemTaxBody}>
                              <span>
                                 <div>
                                    <select
                                       onChange={(e) =>
                                          handleItemChange(e, ind)
                                       }
                                       name="taxPersant"
                                       value={item.taxPersant}
                                    >
                                       <option value="">None</option>
                                       <option value="IGST@0">IGST@0%</option>
                                       <option value="GST@0">GST@0%</option>
                                       <option value="IGST@0.25">
                                          IGST@0.25%
                                       </option>
                                       <option value="GST@0.25">
                                          GST@0.25%
                                       </option>
                                       <option value="IGST@3">IGST@3%</option>
                                       <option value="GST@3">GST@3%</option>
                                       <option value="IGST@5">IGST@5%</option>
                                       <option value="GST@5">GST@5%</option>
                                       <option value="IGST@12">IGST@12%</option>
                                       <option value="GST@12">GST@12%</option>
                                       <option value="IGST@18">IGST@18%</option>
                                       <option value="GST@18">GST@18%</option>
                                       <option value="IGST@28">IGST@28%</option>
                                       <option value="GST@28">GST@28%</option>
                                    </select>
                                 </div>
                                 <input
                                    type="number"
                                    value={item?.taxAmount}
                                    onChange={(e) => handleItemChange(e, ind)}
                                    name="taxAmount"
                                    placeholder="0"
                                    className={css.tableInputs}
                                    readOnly
                                    disabled
                                 />
                              </span>
                           </td>
                           <td className={css.qtyBody}>
                              <input
                                 type="number"
                                 onChange={(e) => handleItemChange(e, ind)}
                                 value={item?.amount}
                                 name="amount"
                                 placeholder="0"
                                 className={css.tableInputs}
                              />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            {/* Bottom Section */}
            <div
               style={{
                  marginTop: "100px",
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
                     {/* {rowFooterData?.totalAmount > 0 && (
                        <div style={{ position: "relative", zIndex: 600 }}>
                           <Menu
                              offset={[0, 0]}
                             
                           >
                              <MenuButton
                                 as={Button}
                                 className={css.PartyTypeMenuBtn}
                                 rightIcon={<ArrowDown />}
                                 style={{ width: "150px" }}
                                 type="button"
                              >
                       
                              </MenuButton>
                              <p className={css.PartyTypelabel}>Payment Type</p>
                              <MenuList className={css.menuListCss}>
                                 <MenuItem className={css.AddBankAccount}>
                                    <PlusIcon />
                                    Add Bank A/C
                                 </MenuItem>
                                 <MenuItem
                                    
                                  
                                    className={css.menuItemCss}
                                 >
                                    Cash
                                 </MenuItem>
                                 <MenuItem
                                   
                                    
                                    className={css.menuItemCss}
                                 >
                                    Cheque
                                 </MenuItem>
                              </MenuList>
                           </Menu>
                        </div>
                     )} */}

                     <div className={css.inputDiv} style={{ zIndex: 600 }}>
                        <input
                           type="number"
                           name="checkReferenceInpval"
                           className={css.BottomInput}
                           style={{ width: "150px", zIndex: 600 }}
                        />
                        <label
                           style={{
                              background: "var(--greyB)",
                              zIndex: 600,
                           }}
                           className={css.BottomInpInactiveLabel}
                        >
                           Reference No.
                        </label>
                     </div>
                  </div>
               </div>

               <div className={css.bottomRightSideCont}>
                  <div className={css.rightSideUpperInputsDiv}>
                     <div className={css.totalBottomDiv}>
                        <p>Total</p>
                        <input
                           type="number"
                           name="total"
                           value={data.total}
                           readOnly
                        />
                     </div>
                  </div>

                  <div className={css.bottomRecievedOuterDiv}>
                     <div className={css.totalBottomDiv}>
                        <p>Received</p>
                        <input
                           type="number"
                           placeholder="0"
                           value={data?.recived}
                           name="recived"
                        />
                     </div>
                  </div>

                  <div className={css.bottomBalanceOuterDiv}>
                     <div>
                        <span></span>
                        <p>Balance</p>
                        <p>{Number(data?.total) - Number(data?.recived)}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* Footer */}
         <div className={css.FooterOuter}>
            <button type="submit">Update</button>
         </div>
      </form>
   );
});
export default EditPurchaseForm;
