import css from "../../../styles/SalesStyles/SalesForms.module.css";
import React, { useEffect, useState } from "react";
import {
   DotsIcon,
   FilterIcon,
   PrinterIcon,
   ShareIcon,
} from "../../utils/reactIcons";
import "./Addpurchaseitems.css";
import { CiFileOn } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";
import { addPurchaseBill } from "../../../Redux/purchase/action";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown as ArrowDown } from "react-icons/io";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { MdDelete as DeleteIcon } from "react-icons/md";
import { TbArrowsMove as MoveIcon } from "react-icons/tb";
import { AiFillFileAdd as AddDecriptionIcon } from "react-icons/ai";
import { HiMiniDocumentText as AddDocumentIcon } from "react-icons/hi2";
import { BiSolidCameraPlus as AddCameraIcon } from "react-icons/bi";
import { ImCheckboxUnchecked as EmptyCheckedBox } from "react-icons/im";
import { BiSolidCheckboxChecked as CheckedBox } from "react-icons/bi";
import { getitems } from "../../../Redux/items/actions";
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

// =================================================================
import ItemsForm from "../../../components/addForm/ItemsForm";

import {
   CalculateFinalAmount,
   PostSalesInvoice,
} from "../../../Redux/sales/action";
import { GetAllItems } from "../../../Redux/items/actions";
import { FetchAllParties } from "../../../Redux/parties/actions";

import ItemsTableBody from "../../../pages/sales/salesInvoice/ItemsTableBody";

const Addpurchaseitem = ({ setOpenForm }) => {
   // ==========================================================================
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
   const toggleItems = useSelector((state) => state.ItemReducer.toggleItems);
   const getAllItemsLoading = useSelector(
      (state) => state.ItemReducer.getAllItemsLoading
   );
   const invoicesList = useSelector((state) => state.SalesReducer.invoicesList);
   const items = useSelector((state) => state.ItemReducer.items);

   const [currentCustomerData, setCurrentCustomerData] = useState({});
   const [toggleDesc, setToggleDesc] = useState(false);
   const [toggleRoundOff, setToggleRoundOff] = useState(false);
   const [toggleReceived, setToggleReceived] = useState(false);
   const [toggleCheckReferenceInp, setToggleCheckReferenceInp] =
      useState(false);
   const [paymentTypeSelectTag, setPaymentTypeSelectTag] = useState("Cash");
   const [checkReferenceInpval, setCheckReferenceInpval] = useState("");
   const [topMarginAddDescInp, setTopMarginAddDescInp] = useState("");
   const [showItemsListMenu, setShowItemsListMenu] = useState(false);
   const [indexSaleItem, setIndexSaleItem] = useState(0);
   const [rowFooterData, setRowFooterData] = useState({});
   const [showItemForm, setShowItemForm] = useState(false);
   const [receiveAmount, setReceiveAmount] = useState("");
   const [balanceAmount, setBalanceAmount] = useState("");

   // invoiceData
   const [data, setData] = useState({
      partyName: "",
      phoneNumber: "",
      poNo: "",
      poDate: new Date().toISOString().split("T")[0],
      eWayBill: "",
      billNumber: "",
      billDate: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
         hour: "2-digit",
         minute: "2-digit",
         hour12: false,
      }),
      paymentTerms: "",
      dueDate: "2024-03-17T00:00:00.000Z",
      stateOfSupply: "Some State",
      priceUnitWithTax: true,
      sale: [],
      paymentType: [
         {
            types: String,
            amount: 450,
         },
         {
            types: String,
            amount: 1520,
            refreanceNo: String,
         },
         {
            types: String,
            accountName: String,
            openingBalance: 1000,
            asOfDate: Date,
         },
      ],
      addDescription: "Additional description here",
      discount: {
         discountPersent: 2,
         discountAmount: 2,
      },
      tax: {
         tax: "GST",
         taxamount: 10,
      },
      roundOff: 0,
      total: 950,
      paid: 950,
      balance: 0,
   });

   // inviceItem
   const [formData, setFormData] = useState([
      {
         category: "65c5cfc509b34ca8a0187497",
         itemName: "65d346274b3a635d1031b700",
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

   // Update total footer values
   useEffect(() => {
      let footerObj = {
         totalQty: 0,
         totalDiscountAmount: 0,
         totalTaxAmount: 0,
         totalAmount: 0,
      };
      formData?.forEach((item) => {
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
      formData[indexSaleItem]?.qty,
      formData[indexSaleItem]?.priceUnit,
      formData[indexSaleItem]?.discountpersant,
      formData[indexSaleItem]?.discountAmount,
      formData[indexSaleItem]?.taxPersant,
      formData[indexSaleItem]?.taxAmount,
      formData[indexSaleItem]?.amount,
   ]);

   // Submit Request Function
   const handleSubmit = (e) => {
      e.preventDefault();
      const purchaseBillData = {
         ...data,
         priceUnitWithTax: data?.priceUnitWithTax == "true",
         sale: [...data.sale, formData],
      };
      console.log("data", purchaseBillData);

      dispatch(addPurchaseBill(purchaseBillData))
      // addPurchaseBill(dispatch(purchaseBillData))
      setOpenForm(false)
      // PostSalesInvoice(dispatch, toast, data, setOpenForm);
   };

   // for fetching all parties list on form mount
   useEffect(() => {
      FetchAllParties(dispatch);
   }, [togglePartiesData]);

   // for fetching all items list on form mount
   useEffect(() => {
      dispatch(GetAllItems());
   }, [toggleItems]);

   // for changing current firm data
   useEffect(() => {
      let obj = {
         customerName: currentCustomerData?.partyName || "",
         billingName: currentCustomerData?.partyName || "",
         phoneNumber: currentCustomerData?.phoneNumber || "",
         billingAddress: currentCustomerData?.billingAddress || "",
         balance: currentCustomerData?.openingBalance || "",
      };
      setData((prev) => {
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
      setFormData((prev) => {
         return { ...prev, [name]: value };
      });
      // console.log(formData)
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prev) => {
         return { ...prev, [name]: value };
      });
      // console.log(formData)
   };

   // for changing balance amount
   useEffect(() => {
      let initAmount = toggleRoundOff
         ? Math.round(rowFooterData?.totalAmount)
         : rowFooterData?.totalAmount;
      let recieved = data?.recived || 0;
      let bal = initAmount - recieved;
      setBalanceAmount(
         bal.toFixed(2) ? bal.toFixed(2) : rowFooterData?.totalAmount
      );
   }, [data?.recived, toggleRoundOff, rowFooterData?.totalAmount]);

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


   return (
      <form onSubmit={handleSubmit} className={css.formOuter}>
         <div className={css.topheader}>
            <p>Purchase</p>
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
                        {data.balance ? <>Balance: {data.balance}</> : ""}
                     </p>
                  </div>
                  <div className={css.inputDiv}>
                     <input
                        type="number"
                        value={data.phoneNumber}
                        name="phoneNumber"
                        onChange={(e) => handleChange(e)}
                        className={css.input}
                        required
                     />
                     <label
                        htmlFor=""
                        className={
                           data.phoneNumber
                              ? css.activeLabel
                              : css.inactiveLabel
                        }
                     >
                        Phone No.
                     </label>
                  </div>
               </div>
               <div>
                  <div className={css.inputDiv}>
                     <label
                        htmlFor="PO No"
                        className={
                           data.partyName ? css.activeLabel : css.inactiveLabel
                        }
                     >
                        PO No.
                     </label>
                     <input
                        type="text"
                        name="poNo"
                        className={css.input}
                        onChange={(e) => handleChange(e)}
                     />
                  </div>
                  <br />
                  <div className={css.inputDiv}>
                     <label
                        htmlFor="PO Date"
                        className={
                           data.partyName ? css.activeLabel : css.inactiveLabel
                        }
                     >
                        PO Date
                     </label>
                     <input
                        type="Date"
                        name="poDate"
                        defaultValue={new Date().toISOString().split("T")[0]}
                        className={css.input}
                        onChange={(e) => handleChange(e)}
                     />
                  </div>
                  <br />
                  <div className={css.inputDiv}>
                     <label
                        htmlFor="PO No"
                        className={
                           data.partyName ? css.activeLabel : css.inactiveLabel
                        }
                     >
                        E-Way Bill
                     </label>
                     <input
                        type="text"
                        name="eWayBill"
                        onChange={(e) => handleChange(e)}
                        className={css.input}
                     />
                  </div>
               </div>

               <div className={css.rightSideCont}>
                  <div>
                     <p>Bill Number</p>
                     <input
                        type="text"
                        placeholder="1"
                        className={css.invoiceNumInp}
                        onChange={(e) => handleChange(e)}
                        name="billNumber"
                     />
                  </div>
                  <div>
                     <p>Bill Date</p>
                     <input
                        type="date"
                        placeholder="Invoice Date"
                        className={css.invoiceDateSelectInp}
                        onChange={(e) => handleChange(e)}
                        name="billDate"
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
                        defaultValue={new Date().toLocaleTimeString("en-US", {
                           hour: "2-digit",
                           minute: "2-digit",
                           hour12: false,
                        })}
                     />
                  </div>

                  <div>
                     <p>Payment Terms</p>
                     <select
                        name="paymentTerms"
                        onChange={(e) => handleChange(e)}
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
                        onChange={(e) => handleChange(e)}
                        name="dueDate"
                     />
                  </div>
                  <div>
                     <p>State of supply</p>
                     <select
                        name="stateOfSupply"
                        id=""
                        className={css.invoiceDateSelectInp}
                        onSelect={(e) => handleChange(e)}
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
            <div className={css.ItemsOuter} style={{ maxWidth: "100%" }}>
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
                           <select
                              name="priceUnitWithTax"
                              value={data.priceUnitWithTax}
                              onChange={(e) => handleInputChange(e)}
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
                     {rows.map((row, index) => (
                        <tr
                           className={css.serialNumberBody}
                           // className="addpurchase-tr"
                           key={row.id}
                          
                        >
                           <td
                              className={css.serialNumberBody}
                              onClick={() => setIndexSaleItem(index)}
                           >
                              <div>
                                 <MoveIcon className={css.serialIconsBody} />
                                 <p>{index + 1}</p>
                                 <DeleteIcon
                                    onClick={() => handleDeleteRow(row, index)}
                                    className={css.serialIconsBody}
                                 />
                              </div>
                           </td>
                           <td className={css.itemNameBody}>
                              <select name="category" id="">
                                 <option value="">Category</option>
                                 <option value="show">Show</option>
                                 <option value="tab">Tab</option>
                                 <option value="medicine">medicine</option>
                                 <option value="cloths">Cloths</option>{" "}
                              </select>
                           </td>
                           <td className={css.itemNameBody}>
                              <select
                                 // value={items.itemName}
                                 // onChange={(e)=>handleInputChange(e)}
                                 // className={css.tableInputs}
                                 placeholder="test"
                                 name="itemName"
                                 onChange={(e) => {
                                    const selectedItem = items.find(
                                       (item) =>
                                          item.itemName === e.target.value
                                    );

                                    if (selectedItem) {
                                       const itemId =
                                          selectedItem?._id?.toString();
                                       // console.log(itemId)
                                       setFormData({
                                          ...formData,
                                          itemName: itemId,
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
                                 {getAllItemsLoading ? (
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
                                 className={css.tableInputs}
                                 name="itemCode"
                                 onChange={(e) => handleInputChange(e)}
                              />
                           </td>
                           <td>
                              <input
                                 type="text"
                                 className={css.tableInputs}
                                 name="hsnCode"
                                 onChange={(e) => handleInputChange(e)}
                              />
                           </td>
                           <td>
                              <input
                                 type="text"
                                 className={css.tableInputs}
                                 name="description"
                                 onChange={(e) => handleInputChange(e)}
                              />
                           </td>
                           <td>
                              <input
                                 type="text"
                                 className={css.tableInputs}
                                 name="count"
                                 onChange={(e) => handleInputChange(e)}
                              />
                           </td>
                           <td>
                              <input
                                 type="text"
                                 className={css.tableInputs}
                                 name="qty"
                                 onChange={(e) => handleInputChange(e)}
                              />
                           </td>
                           <td>
                              <input
                                 type="text"
                                 className={css.tableInputs}
                                 name="freeqty"
                                 onChange={(e) => handleInputChange(e)}
                              />
                           </td>
                           <td className={css.unitBody}>
                              <select
                                 name="unit"
                                 onChange={(e) => handleInputChange(e)}
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
                                 name="priceUnit"
                                 onChange={(e) => handleInputChange(e)}
                                 placeholder="0"
                                 className={css.tableInputs}
                              />
                           </td>

                           <td className={css.DiscountBody}>
                              <input
                                 type="number"
                                 name="discountpersant"
                                 // value={AmountCalculator()?.discountPercent}
                                 // value={item.discountpersant}
                                 onChange={(e) => handleInputChange(e)}
                                 placeholder="0"
                                 className={css.tableInputs}
                              />
                              <input
                                 type="number"
                                 name="discountAmount"
                                 // value={AmountCalculator()?.discountAmount}
                                 // value={item.discountAmount}
                                 onChange={(e) => handleInputChange(e)}
                                 placeholder="0"
                                 className={css.tableInputs}
                              />
                           </td>
                           {/* <td>
                              <input
                                 type="text"
                                 className="rowInput"
                                 name="taxPersant"
                                 onChange={(e) => handleInputChange(e)}
                              />
                           </td> */}
                           <td className={css.ItemTaxBody}>
                              <span>
                                 <div>
                                    <select
                                       name="taxPersant"
                                       //  value={item.taxPersant}
                                       onChange={(e) => handleInputChange(e)}
                                    >
                                       <option value="">None</option>
                                       <option value="0">IGST@0%</option>
                                       <option value="0">GST@0%</option>
                                       <option value="0.25">IGST@0.25%</option>
                                       <option value="0.25">GST@0.25%</option>
                                       <option value="3">IGST@3%</option>
                                       <option value="3">GST@3%</option>
                                       <option value="5">IGST@5%</option>
                                       <option value="5">GST@5%</option>
                                       <option value="12">IGST@12%</option>
                                       <option value="12">GST@12%</option>
                                       <option value="18">IGST@18%</option>
                                       <option value="18">GST@18%</option>
                                       <option value="28">IGST@28%</option>
                                       <option value="28">GST@28%</option>
                                    </select>
                                 </div>
                                 <input
                                    type="number"
                                    //   value={AmountCalculator()?.taxAmount}
                                    // value={item.taxAmount}
                                    name="taxAmount"
                                    onChange={(e) => handleInputChange(e)}
                                    placeholder="0"
                                    className={css.tableInputs}
                                    // readOnly
                                    // disabled
                                 />
                              </span>
                           </td>
                           <td>
                              <input
                                 type="text"
                                 className={css.tableInputs}
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
                  {/* <tbody>
              {formData?.map((item, ind) => {
                return (
                  <ItemsTableBody
                    ind={ind}
                    item={item}
                    formData={formData}
                  setFormData={setFormData}
                    handleDeleteRow={handleDeleteRow}
                    handleMenuItemClick={handleMenuItemClick}
                    setShowItemsListMenu={setShowItemsListMenu}
                    setShowItemForm={setShowItemForm}
                    setIndexSaleItem={setIndexSaleItem}
                    items={items}
                    getAllItemsLoading={getAllItemsLoading}
                    showItemsListMenu={showItemsListMenu}
                    indexSaleItem={indexSaleItem}
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
                <td className={css.addRowChildTd}>{rowFooterData?.totalQty}</td>
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
            </tbody> */}
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
                  <div
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
                                    onClick={() =>
                                       setPaymentTypeSelectTag("Cash")
                                    }
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
                                    onClick={() =>
                                       setPaymentTypeSelectTag("Cheque")
                                    }
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

                  {toggleDesc ? (
                     <div
                        className={css.inputDiv}
                        style={{ marginTop: topMarginAddDescInp }}
                     >
                        <textarea
                           value={data.addDescription}
                           name="addDescription"
                           onChange={(e) => handleInputChange(e)}
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
                              data.addDescription
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
                           onChange={(e) => handleInputChange(e)}
                           readOnly
                           disabled
                        />
                     </div>
                  </div>
                  {rowFooterData?.totalAmount > 0 && (
                     <div className={css.bottomRecievedOuterDiv}>
                        <div className={css.totalBottomDiv}>
                           <p>Received</p>
                           <input
                              type="number"
                              placeholder="0"
                              disabled={!toggleReceived}
                              value={data?.recived}
                              name="recived"
                              onChange={(e) => handleInputChange(e)}
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
                  )}
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

export default Addpurchaseitem;
