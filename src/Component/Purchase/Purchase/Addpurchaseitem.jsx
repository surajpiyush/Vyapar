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
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { MdDelete as DeleteIcon } from "react-icons/md";
import { TbArrowsMove as MoveIcon } from "react-icons/tb";
import { getitems } from "../../../Redux/items/actions";

const Addpurchaseitem = () => {
   // console.log(data);
   const [hoveredIndex, setHoveredIndex] = useState(null);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const baseURL = "https://ca-backend-api.onrender.com";
   const token = localStorage.getItem("token");
   const companyID = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   const item = useSelector((store) => store.ItemReducer);
   const data = item.items.data;
   console.log(item);
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

   useEffect(() => {
      dispatch(getitems());
   }, []);

   const [invoiceData, setInvoiceData] = useState([{
      itemName: "pen",
      category: "65d080c09b0c34b0924bd909",
      itemHsn: 456789,
      description: "This is a sample item",
      itemCode: 789,
      seleteUnit: [{ baseUnit: "Piece", secondaryUnit: "Box" }],
      batchTracking: "Yes",
      serialTracking: "No",
      stockQuantity: 100,
      mrp: [{ mrp: 150, disOnMrpForSale: "5%", disOnMrpForWholesale: "10%" }],
      salePrice: [
         {
            salePriceWithTax: 120,
            salePriceWithoutTax: 100,
            disOnSalePriceAmount: 5,
            disOnSalePricePerceantage: "5%",
         },
      ],
      wholesalePrice: [
         {
            wholesalePriceWithoutTax: 90,
            wholesalePriceWithTax: 100,
            minimumWholesaleQty: 10,
         },
      ],
      purchasePrice: [
         { purchasePriceWithTax: 80, purchasePriceWithoutTax: 70 },
      ],
      taxRate: "18%",
      stock: [
         {
            openingQuantity: 50,
            atPrice: 75,
            asOfDate: "2024-01-27",
            minStockToMaintain: 20,
            location: "Warehouse A",
         },
      ],
   }]);

   // Input Change Function
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setInvoiceData((prev) => {
         return { ...prev, [name]: value };
      });
   };

   const handleSubmit = () => {
      const data = { type: invoiceData.type };
      console.log("data", data);

      // PostSalesInvoice(dispatch, invoiceData,toast,);
   };

   // Add Row Function
   // const handleAddRow = (e) => {
   //    e.stopPropagation();
   //    setInvoiceData((prev) => {
   //       let newRowData = {
   //          itemName: "pen",
   //          category: "65d080c09b0c34b0924bd909",
   //          itemHsn: 456789,
   //          description: "This is a sample item",
   //          itemCode: 789,
   //          seleteUnit: [{ baseUnit: "Piece", secondaryUnit: "Box" }],
   //          batchTracking: "Yes",
   //          serialTracking: "No",
   //          stockQuantity: 100,
   //          mrp: [
   //             { mrp: 150, disOnMrpForSale: "5%", disOnMrpForWholesale: "10%" },
   //          ],
   //          salePrice: [
   //             {
   //                salePriceWithTax: 120,
   //                salePriceWithoutTax: 100,
   //                disOnSalePriceAmount: 5,
   //                disOnSalePricePerceantage: "5%",
   //             },
   //          ],
   //          wholesalePrice: [
   //             {
   //                wholesalePriceWithoutTax: 90,
   //                wholesalePriceWithTax: 100,
   //                minimumWholesaleQty: 10,
   //             },
   //          ],
   //          purchasePrice: [
   //             { purchasePriceWithTax: 80, purchasePriceWithoutTax: 70 },
   //          ],
   //          taxRate: "18%",
   //          stock: [
   //             {
   //                openingQuantity: 50,
   //                atPrice: 75,
   //                asOfDate: "2024-01-27",
   //                minStockToMaintain: 20,
   //                location: "Warehouse A",
   //             },
   //          ],
   //       };
   //       let obj = { ...prev, [newRowData] };
   //       return obj;
   //    });
   // };

   // // Delete Row Function
   // const handleDeleteRow = (e, index, item) => {
   //    e.stopPropagation();
   //    const deletedRowdata = invoiceData.sale.filter(
   //       (ite, ind) => ind != index
   //    );
   //    setInvoiceData((prev) => {
   //       return { ...prev, deletedRowdata };
   //    });
   // };
   return (
      <div>
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

                     <td className="addpurchase-td-1">
                        <input type="text" className="rowInput" />
                     </td>
                     <td>
                        <input type="text" className="rowInput" />
                        {row.qty}
                     </td>
                     <td>
                        <input type="text" className="rowInput" />
                        {row.unit}
                     </td>
                     <td>
                        <input type="text" className="rowInput" />
                        {row.price}
                     </td>
                     <td>
                        <select name="" id="">
                           <option value="">Select</option>
                        </select>
                     </td>
                     <td>
                        <input type="text" className="rowInput" />
                     </td>
                     <td>
                        <input type="text" className="rowInput" />
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
