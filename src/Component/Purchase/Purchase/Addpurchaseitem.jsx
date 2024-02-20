import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addpurchaseitem = () => {
   const [hoveredIndex, setHoveredIndex] = useState(null);
   const dispatch = useDispatch();
   const navigate = useNavigate()
   const token = localStorage.getItem("token");
   const companyID = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   const baseURL = "https://ca-backend-api.onrender.com";

   const [rows, setRows] = useState([
      {
         id: 1,
         item: "",
         qty: "1",
         unit: "",
         price: "",
         discount: "",
         tax: "",
         amount: "",
      },
   ]);

   const d = {
      partyName: "Krishan",
      phoneNumber: 1234567890,
      poNo: "PO123",
      poDate: "2024-02-16T00:00:00.000Z",
      eWayBill: "EWB123",
      billNumber: "BILL123",
      billDate: "2024-02-16T00:00:00.000Z",
      time: "10:00 AM",
      paymentTerms: "Net 30",
      dueDate: "2024-03-17T00:00:00.000Z",
      stateOfSupply: "Some State",
      priceUnitWithTax: true,
      sale: [
         {
            category: "65c5cfc509b34ca8a0187497",
            itemName: "mobile",
            itemCode: "001",
            hsnCode: "HSN001",
            serialNo: "SN001",
            description: "Description of item 1",
            batchNo: 1,
            modelNo: 123,
            expDate: "2025-02-16T00:00:00.000Z",
            mfgDate: "2023-02-16T00:00:00.000Z",
            customField: "Custom field 1",
            size: "Large",
            qty: 10,
            unit: "pcs",
            priceUnit: 100,
            discountpersant: 5,
            discountAmount: 5,
            taxPersant: "12%",
            taxAmount: 12,
            amount: 950,
         },
      ],
      paymentType: [
         {
            cash: 800,
            cheque: {
               refreanceNo: "REF123",
               checkAmount: 150,
            },
            bankDetail: {
               accountName: "ABC Bank",
               openingBalance: 5000,
               asOfDate: "2024-02-16T00:00:00.000Z",
            },
            default: "cash",
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
   };

   const handleCellClick = (rowIndex, fieldName) => {
      const updatedRows = [...rows];
      updatedRows[rowIndex][fieldName] = "";
      setRows(updatedRows);
   };
   //  console.log(rows);

   const handleAddRow = () => {
      const newRow = {
         id: rows.length + 1,
         item: "",
         qty: "1",
         unit: "",
         price: "",
         discount: "",
         tax: "",
         amount: "",
      };
      setRows([...rows, newRow]);
   };
   const handleDeleteRow = (rowIndex) => {
      const updatedRows = [...rows];
      updatedRows.splice(rowIndex, 1);
      setRows(updatedRows);
   };
   const handleSave = () => {
      axios
         .post(`${baseURL}/${companyID}/purchase/create`, d, {
            headers: { Authorization: `Bearer ${token}` },
         })
         .then((res) => {
          alert("Data added")
          navigate("/purchasebill")
         })
         .catch((err) => console.log(err));
   };

   return (
      <div>
         <table className="addpurchase-table">
            <thead>
               <tr className="addpurchase-tr">
                  <td className="addpurchase-td">#</td>
                  <td className="addpurchase-td-1">ITEM</td>
                  <td>QTY</td>
                  <td>UNIT</td>
                  <td>PRICE/UNIT</td>
                  <td>DISCOUNT</td>
                  <td>TAX</td>
                  <td>AMOUNT</td>
               </tr>
            </thead>
            <tbody>
               {rows.map((row, index) => (
                  <tr
                     className="addpurchase-tr"
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
                        <span>{row.id}</span>
                        <BsTrash
                           onClick={() => handleDeleteRow(index)}
                           style={{
                              cursor: "pointer",
                              opacity: hoveredIndex === index ? 1 : 0,
                              transition: "opacity 0.3s ease",
                              marginLeft: "15px",
                           }}
                        />
                     </td>

                     <td
                        className="addpurchase-td-1"
                        onClick={() => handleCellClick(index, "item")}
                     >
                        <input type="text" className="rowInput" />
                        {/* {row.item} */}
                     </td>
                     <td onClick={() => handleCellClick(index, "qty")}>
                        <input type="text" className="rowInput" />
                        {row.qty}
                     </td>
                     <td onClick={() => handleCellClick(index, "unit")}>
                        <input type="text" className="rowInput" />
                        {row.unit}
                     </td>
                     <td onClick={() => handleCellClick(index, "price")}>
                        <input type="text" className="rowInput" />
                        {row.price}
                     </td>
                     <td onClick={() => handleCellClick(index, "discount")}>
                        <select name="" id="">
                           <option value="">Select</option>
                        </select>
                     </td>
                     <td onClick={() => handleCellClick(index, "tax")}>
                        <input type="text" className="rowInput" />
                     </td>
                     <td onClick={() => handleCellClick(index, "amount")}>
                        <input type="text" className="rowInput" />
                     </td>
                  </tr>
               ))}
            </tbody>

            <tr className="addpurchase-tr">
               <td className="addpurchase-td">
                  <button onClick={handleAddRow}>Add Row</button>
               </td>
               <td className="addpurchase-td-1">Total</td>
               <td>0</td>
               <td></td>
               <td></td>
               <td>0</td>
               <td>0</td>
               <td>0</td>
            </tr>
         </table>
         <section className="add-purchase-items-payment">
            <aside className="add-purchase-items-payment-aside">
               <div className="add-purchase-items-payment-div">
                  <label htmlFor="">Payment Type</label>
                  <select name="" id="">
                     <option value="">Casch</option>
                     <option value="">Select Items</option>
                     <option value="">Select Items</option>
                  </select>
               </div>
               <div className="add-purchase-items-payment-div">
                  <button>+Add Payment type</button>
               </div>
               <div className="add-purchase-items-payment-div">
                  <div>
                     <CiFileOn />
                     <p>Add Description</p>
                  </div>
               </div>
               <div className="add-purchase-items-payment-div">
                  <div>
                     <CiImageOn />
                     <p>Add Image</p>
                  </div>
               </div>
            </aside>
            <aside className="add-purchase-items-payment-aside">
               <div className="add-purchase-items-payment-div add-purchase-items-payment-div2">
                  <input
                     className="add-purchase-items-payment-div-checkbox"
                     type="checkbox"
                     name=""
                  />
                  <label
                     className="add-purchase-items-payment-div-label"
                     htmlFor=""
                  >
                     Roun Off
                  </label>
                  <input
                     className="add-purchase-items-payment-div-input"
                     type="text"
                     name=""
                     id=""
                     placeholder="0"
                  />
                  <aside className="add-purchase-items-payment-div-3">
                     <label htmlFor="#">Total</label>
                     <input type="text" name="" />
                  </aside>
               </div>
            </aside>
         </section>
         <section className="addpurchase-footer">
            <div>
               <select name="" id="">
                  <option value="">Share</option>
               </select>
            </div>
            <div>
               <button
                  onClick={() => {
                    console.log("Clicked")
                     handleSave();

                  }}
               >
                  Save
               </button>
            </div>
         </section>
      </div>
   );
};

export default Addpurchaseitem;
