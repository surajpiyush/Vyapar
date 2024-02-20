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
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addpurchaseitem = ({ data, setData }) => {
   // console.log(data);
   const [hoveredIndex, setHoveredIndex] = useState(null);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const baseURL = "https://ca-backend-api.onrender.com";
   const token = localStorage.getItem("token");
   const companyID = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   
   const [formData, setformData] = useState({});
   
   
   
   
   
   
   
   const [rows, setRows] = useState([
      {
         id: 1,
         item: "",
         qty: "",
         unit: "",
         price: "",
         discount: "",
         tax: "",
         amount: "",
      },
   ]);
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
                      
                     >
                        <input type="text" className="rowInput" />
                      
                     </td>
                     <td >
                        <input type="text" className="rowInput" />
                        {row.qty}
                     </td>
                     <td >
                        <input type="text" className="rowInput" />
                        {row.unit}
                     </td>
                     <td >
                        <input type="text" className="rowInput" />
                        {row.price}
                     </td>
                     <td >
                        <select name="" id="">
                           <option value="">Select</option>
                        </select>
                     </td>
                     <td >
                        <input type="text" className="rowInput" />
                     </td>
                     <td >
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
      </div>
   );
};

export default Addpurchaseitem;
