import css from "../../styles/SalesStyles/SalesForms.module.css";
import React, { useEffect, useState } from "react";
import {
   DotsIcon,
   FilterIcon,
   PrinterIcon,
   ShareIcon,
} from "../utils/reactIcons";
// import "./Addpurchaseitems.css";
import { CiFileOn } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Purchase/Addpurchaseitems.css";
import { BsTrash } from "react-icons/bs";
import { addPurchaseOrder } from "../../Redux/purchase/action";
import axios from "axios";
import { IoIosArrowDown as ArrowDown } from "react-icons/io";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { MdDelete as DeleteIcon } from "react-icons/md";
import { TbArrowsMove as MoveIcon } from "react-icons/tb";
import { AiFillFileAdd as AddDecriptionIcon } from "react-icons/ai";
import { HiMiniDocumentText as AddDocumentIcon } from "react-icons/hi2";
import { BiSolidCameraPlus as AddCameraIcon } from "react-icons/bi";
import { ImCheckboxUnchecked as EmptyCheckedBox } from "react-icons/im";
import { BiSolidCheckboxChecked as CheckedBox } from "react-icons/bi";
import { getitems } from "../../Redux/items/actions";
import {
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   Button,
   MenuItemOption,
   MenuGroup,
   MenuOptionGroup,
   MenuDivider,
   useToast,
} from "@chakra-ui/react";


const Addpurchaseorderitem = ({ data }) => {
   // console.log(data);
   const [hoveredIndex, setHoveredIndex] = useState(null);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const item = useSelector((store) => store.ItemReducer);
   const isLoading = useSelector((store) => store.PurchaseReducer.isLoading);
   // console.log(item)
   const items = item.items.data;
   // console.log(items);
   const [formData, setFormData] = useState([
      {
         category: "65c5cfc509b34ca8a0187497",
         itemName: "mobile",
         itemCode: "001",
         hsnCode: "HSN001",
         description: "Description of item 1",
         count: 1,
         qty: 10,
         freeqty: 0,
         unit: "pcs",
         priceUnit: 100,
         discountAmount: 5,
         discountpersant: 5,
         taxPersant: "12%",
         taxAmount: 12, // to be calculated
         amount: 950,

         // there is place for them in frontend
         batchNo: 1,
         modelNo: 123,
         expDate: "2025-02-16T00:00:00.000Z",
         mfgDate: new Date(),
         customField: "Custom field 1",
         size: "Large",
      },
   ]);

   const [toggleDesc, setToggleDesc] = useState(false);
   const [toggleRoundOff, setToggleRoundOff] = useState(false);

   const [paymentTypeSelectTag, setPaymentTypeSelectTag] = useState("Cash");

   const [rows, setRows] = useState([
      {
         id: 1,
         category: "65c5cfc509b34ca8a0187497",
         itemName: "mobile",
         itemCode: "001",
         hsnCode: "HSN001",
         description: "Description of item 1",
         count: 1,
         qty: 10,
         freeqty: 0,
         unit: "pcs",
         priceUnit: 100,
         discountAmount: 5,
         discountpersant: 5,
         taxPersant: "12%",
         amount: 950,
      },
   ]);
   const handleAddRow = () => {
      const newRow = {
         category: "65c5cfc509b34ca8a0187497",
         itemName: "mobile",
         itemCode: "001",
         hsnCode: "HSN001",
         description: "Description of item 1",
         count: 1,
         qty: 10,
         freeqty: 0,
         unit: "pcs",
         priceUnit: 100,
         discountAmount: 5,
         discountpersant: 5,
         taxPersant: "12%",
         amount: 950,

         // there is place for them in frontend
         taxAmount: 12, // to be calculated
         batchNo: 1,
         modelNo: 123,
         expDate: "2025-02-16T00:00:00.000Z",
         mfgDate: new Date(),
         customField: "Custom field 1",
         size: "Large",
      };
      setRows([...rows, newRow]);
      setFormData([...formData, newRow]);
      // console.log(formData);
   };
   const handleDeleteRow = (row, rowIndex) => {
      const updatedRows = [...rows];
      updatedRows.splice(rowIndex, 1);
      setRows(updatedRows);
   };

   useEffect(() => {
      dispatch(getitems());
   }, []);

   // Input Change Function
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => {
         return { ...prev, [name]: value };
      });
      // console.log(formData)
   };
   const handleSubmit = () => {
      data.purchaseOrder = formData;
      dispatch(addPurchaseOrder(data));
      navigate("/paymentorder");
   }; 

   return (
      <div>
         <div className={css.ItemsOuter}>
            <table>
               <thead>
                  <tr>
                     <th className={css.serialNumberHead}>#</th>
                     <th className={css.itemNameHead}>CATEGORY</th>
                     <th className={css.itemNameHead}>ITEM</th>
                     <th className={css.itemNameHead}>ITEM CODE</th>
                     <th className={css.itemNameHead}>HSN CODE</th>
                     <th className={css.itemNameHead}>DESCRIPTION</th>
                     <th className={css.itemNameHead}>COUNT</th>
                     <th className={css.qtyHead}>QTY</th>
                     <th className={css.itemNameHead}>FREE QTY</th>
                     <th className={css.unitHead}>UNIT</th>
                     <th className={css.priceUnitHead}>
                        <p>PRICE/UNIT</p>
                        <select name="" id="">
                           <option value="">Without Tax</option>
                           <option value="">With Tax</option>
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
                  {rows.map((row, index) => (
                     <tr
                        className={css.addRowTr}
                        // className="addpurchase-tr"
                        key={row.id}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                     >
                        <td
                           className="addpurchase-td"
                           style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "1.5rem",
                              justifyContent: "space-between",
                              padding: "10px",
                           }}
                        >
                           <span>{index + 1}</span>
                           <BsTrash
                              onClick={() => handleDeleteRow(row, index)}
                              style={{
                                 cursor: "pointer",
                                 opacity: hoveredIndex === index ? 1 : 0,
                                 transition: "opacity 0.3s ease",
                                 marginLeft: "15px",
                              }}
                           />
                        </td>

                        {/* <select
                       value={partiesData.partyName}
                       // onChange={handleInputChange}
                       className={css.selectTag}
                       placeholder="test"
                       name="partyName"
                       onChange={(e) => {
                          const selectedParty = partiesData.find(
                             (party) => party.partyName === e.target.value
                          );

                          if (selectedParty) {
                             const partyId = selectedParty?._id?.toString();
                             getData(partyId);
                             setData({
                                ...data,
                                partyName: selectedParty.partyName,
                             });
                          }
                       }}
                    >
                       <option value="">{"Party Name"}</option>
                       {partiesLoading ? (
                          <option value="">Loading Parties</option>
                       ) : (
                          partiesData?.map((party) => (
                             <option key={party.id} value={party.partyName}>
                                {party.partyName}
                             </option>
                          ))
                       )}
                    </select> */}

                        <td>
                           <select name="category" id="">
                              <option value="">Category</option>
                              <option value="show">Show</option>
                              <option value="tab">Tab</option>
                              <option value="medicine">medicine</option>
                              <option value="cloths">Cloths</option>{" "}
                           </select>
                        </td>
                        <td>
                           <select
                              // value={items.itemName}
                              // onChange={handleInputChange}
                              className={css.selectTag}
                              placeholder="test"
                              name="itemName"
                              onChange={(e) => {
                                 const selectedItem = items.find(
                                    (item) => item.itemName === e.target.value
                                 );

                                 if (selectedItem) {
                                    const itemId =
                                       selectedItem?._id?.toString();

                                    setFormData({
                                       ...formData,
                                       itemName: selectedItem.itemName,
                                    });

                                    // now from this itemId you need to fetch the data of that perticular item and display in that row
                                    // getData(partyId);
                                    // setData({
                                    //    ...data,
                                    //    partyName: selectedParty.partyName,
                                    // });
                                 }
                              }}
                           >
                              <option value="">{"Item Name"}</option>
                              {item.isLoading ? (
                                 <option value="">Loading Items</option>
                              ) : (
                                 items?.map((item) => {
                                    return (
                                       <option
                                          key={item.id}
                                          value={item.itemName}
                                       >
                                          {item.itemName}
                                       </option>
                                    );
                                 })
                              )}
                           </select>
                        </td>
                        <td>
                           <input
                              type="text"
                              className="rowInput"
                              name="itemCode"
                              onChange={(e) => handleInputChange(e)}
                           />
                        </td>
                        <td>
                           <input
                              type="text"
                              className="rowInput"
                              name="hsnCode"
                              onChange={(e) => handleInputChange(e)}
                           />
                        </td>
                        <td>
                           <input
                              type="text"
                              className="rowInput"
                              name="description"
                              onChange={(e) => handleInputChange(e)}
                           />
                        </td>
                        <td>
                           <input
                              type="text"
                              className="rowInput"
                              name="count"
                              onChange={(e) => handleInputChange(e)}
                           />
                        </td>
                        <td>
                           <input
                              type="text"
                              className="rowInput"
                              name="qty"
                              onChange={(e) => handleInputChange(e)}
                           />
                        </td>
                        <td>
                           <input
                              type="text"
                              className="rowInput"
                              name="freeqty"
                              onChange={(e) => handleInputChange(e)}
                           />
                        </td>
                        <td>
                           <select
                              name="unit"
                              id=""
                              onChange={(e) => handleInputChange(e)}
                           >
                              <option value="none">NONE</option>
                           </select>
                        </td>
                        <td>
                           <input
                              type="text"
                              className="rowInput"
                              name="priceUnit"
                              onChange={(e) => handleInputChange(e)}
                           />
                        </td>
                        <td>
                           <select
                              name="discountpersant"
                              id=""
                              onChange={(e) => handleInputChange(e)}
                           >
                              <option value="5%">5%</option>
                              <option value="10%">10%</option>
                              <option value="20%">20%</option>
                           </select>
                        </td>
                        <td>
                           <input
                              type="text"
                              className="rowInput"
                              name="taxPersant"
                              onChange={(e) => handleInputChange(e)}
                           />
                        </td>
                        <td>
                           <input
                              type="text"
                              className="rowInput"
                              name="amount"
                              onChange={(e) => handleInputChange(e)}
                           />
                        </td>
                     </tr>
                  ))}
                  <tr className={css.addRowTr}>
                     <td></td>
                     <td>
                        <div className={css.actualAddRowTd}>
                           <button onClick={handleAddRow}>ADD ROW</button>
                           <p>Total</p>
                        </div>
                     </td>
                     <td className={css.addRowChildTd}>1</td>
                     <td></td>
                     <td></td>
                     <td className={css.addRowChildTd}>0</td>
                     <td className={css.addRowChildTd}>0</td>
                     <td className={css.addRowChildTd}>10</td>
                  </tr>
               </tbody>
            </table>
         </div>

         {/* Bottom Section */}
         <div className={css.bottomSectionOuter}>
            <div className={css.bottomLeftSideCont}>
               <div
                  style={{
                     display: "flex",
                     alignItems: "Center",
                     gap: "40px",
                  }}
               >
                  <div style={{ position: "relative" }}>
                     <Menu>
                        <MenuButton
                           as={Button}
                           className={css.PartyTypeMenuBtn}
                           rightIcon={<ArrowDown />}
                           style={{ width: "150px" }}
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
               </div>

               {toggleDesc ? (
                  <div className={css.inputDiv}>
                     <textarea
                        value={formData.addDescription}
                        name="addDescription"
                        onChange={(e) => {
                           data.addDescription = e.target.value;
                        }}
                        className={css.input}
                        style={{ height: "110px", width: "230px" }}
                     />
                     <label
                        htmlFor="addDescription"
                        className={
                           formData.addDescription
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
                     style={{ width: "150px" }}
                  >
                     <AddDecriptionIcon />
                     <p>ADD DESCRIPTION</p>
                  </div>
               )}
               <div
                  onClick={(e) => {
                     e.stopPropagation();
                     setToggleDesc(true);
                  }}
                  className={css.addDecriptionDiv}
                  style={{ width: "150px" }}
               >
                  <AddCameraIcon />
                  <p>ADD IMAGE</p>
               </div>
            </div>
            {/* -------------------------------------------------------------------------------------- */}
            <div className={css.bottomRightSideCont}>
               <div className={css.rightSideUpperInputsDiv}>
                  <div className={css.totalBottomDiv}>
                     <p>Discount</p>
                     <div className="discount-input-container">
                        <input
                           type="text"
                           value={formData?.discountAmount}
                           name="discount"
                           className="discount-input"
                           placeholder="discount"
                           // Add any additional input attributes or event handlers as needed
                        />
                        <span className="percentage-tag">% - </span>
                     </div>

                     <input
                        type="number"
                        value={formData?.total}
                        name="total"
                        onChange={handleInputChange}
                        readOnly
                     />
                  </div>
               </div>

               {/* ------------============================================================= */}

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
                        disabled={!toggleRoundOff}
                        className={css.roundOffNumInp}
                     />
                  </div>
                  <div className={css.totalBottomDiv}>
                     <p>Total</p>
                     <input
                        type="number"
                        value={formData?.total}
                        name="total"
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* Footer */}
         <div className={css.FooterOuter}>
            <button onClick={() => handleSubmit()}>
               {isLoading ? "Saving" : "Save"}
            </button>
            <div className={css.shareBtn}>
               <p>Share</p>
               <ArrowDown />
            </div>
         </div>
      </div>
   );
};

export default Addpurchaseorderitem;
