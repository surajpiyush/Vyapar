import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addItem } from "../../Redux/items/actions";
import "../../styles/Items.css";
import css from "../../styles/SalesStyles/SalesForms.module.css";

export default function ItemsForm({ closeForm }) {
   const toast = useToast();
   const navigate = useNavigate();
   const location = useLocation();
   const [optToggle, setOptToggle] = useState(true);
   const [productOptToggle, setProductOptToggle] = useState(true);
   const [wsToggle, setWsToggle] = useState(false);
   const [sel, setSel] = useState(false);
   // -----------------------------------INTERGRATION IN POSTING A NEW ITEM----------------------------------------
   const dispatch = useDispatch();
   const items = useSelector((store) => store.ItemReducer.items);
   const itemIsLoading = useSelector((store) => store.ItemReducer.isLoading);
   const [formData, setFormData] = useState({
      itemName: "",
      category: "65d080c09b0c34b0924bd909",
      itemHsn: "",
      description: "This is a sample item",
      itemCode: 789,
      seleteUnit: "",
      batchTracking: "Yes",
      serialTracking: "No",
      stockQuantity: 1,
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
            openingQuantity: "",
            atPrice: 75,
            asOfDate: "2024-01-27",
            minStockToMaintain: 20,
            location: "Warehouse A",
         },
      ],
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
         ...prevFormData,
         [name]: value,
      }));
   };

   const handleStock = (e) => {
      let { name, value } = e.target;
      if (name === "asOfDate") {
         const selectedDate = new Date(value);
         const today = new Date();

         if (selectedDate > today) {
            toast({
               description: "Something Went Wrong!",
               title: "Selected date should not be after today",
               status: "error",
               position: "top",
            });
            console.log("Selected date should not be after today");
            value = new Date().toISOString().split("T")[0];
         }
      }
      console.log(value);
      setFormData((prevFormData) => ({
         ...prevFormData,
         stock: [
            {
               ...prevFormData.stock[0],
               [name]: value,
            },
         ],
      }));
      // console.log(formData.stock);
   };

   const handleFileChange = (event) => {
      setFormData({
         ...formData,
         image: event.target.files[0],
      });
   };

   const handleSave = () => {
      console.log("formData-", formData);
      addItem(dispatch, formData, closeForm, toast);
      // dispatch(addItem(formData, closeForm, toast));
   };

   // ---------------<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>---------------
   const handleCloseForm = () => {
      // console.log("Working");
      closeForm(false);
   };

   return (
      <div>
         <div
            className="item-form"
            style={{ height: "70vh", overflow: "auto", zIndex: 2000 }}
         >
            <div className="d-between ">
               <div className="d-around ">
                  <h3>Add Item</h3>
                  <div className="" style={{ marginLeft: "20px" }}>
                     <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                           setOptToggle(true);
                        }}
                     >
                        Product
                     </span>
                     /{" "}
                     <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                           setOptToggle(false);
                        }}
                     >
                        Service
                     </span>
                  </div>
               </div>

               <div className="icon-cont">
                  <i
                     className="fa fa-cog"
                     onClick={() =>
                        navigate("/setting", {
                           state: { redirectTo: location.pathname },
                           replace: true,
                        })
                     }
                  ></i>
                  <i className="fa fa-close" onClick={handleCloseForm}></i>
               </div>
            </div>
            <hr />
            {optToggle ? (
               <div className="">
                  <div
                     className="d-flex input-cont"
                     style={{ marginTop: "20px", padding: "0px 20px" }}
                  >
                     <input
                        required
                        type="text"
                        className="inp-field"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        placeholder="Item Name"
                     />

                     <input
                        required
                        type="number"
                        name="itemHsn"
                        className="inp-field"
                        value={formData.itemHsn}
                        onChange={handleChange}
                        placeholder="Item HSN"
                     />
                     <button
                        type="button"
                        className="select-unit-btn"
                        onClick={() => setSel(true)}
                     >
                        {sel ? (
                           <td
                              className={css.unitBody}
                              style={{ color: "black", fontWeight: "bold" }}
                              onClick={() => setSel(false)}
                           >
                              <select
                        onChange={handleChange}
                                 name="unit"
                               
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
                        ) : (
                           "Select Unit"
                        )}
                     </button>
                  </div>
                  {/* <div
                     className="d-flex input-cont"
                     style={{ marginTop: "20px", padding: "0px 20px" }}
                  >
                     <select
                        name="category"
                        id="category"
                        className="inp-field"
                        style={{ width: "225px" }}
                        value={formData.category}
                        // onChange={handleChange}
                     >
                        <option value="">Category</option>
                        <option value="shoes">Shoes</option>
                        <option value="shirt">Shirt</option>
                        <option value="jeans">Jeans</option>
                     </select>

                     <input required
                        className="inp-field"
                        type="text"
                        name=""
                        placeholder="Please enter the id of category"
                     />

                     <input required
                        type="number"
                        placeholder="Item Code *"
                        className="inp-field"
                        value={formData.itemCode}
                        onChange={handleChange}
                        name="itemCode"
                     />
                     <input required
                        type="file"
                        placeholder="Add Image Item"
                        className="inp-field"
                        style={{
                           border: "2px solid orange",
                        }}
                        onChange={handleFileChange}
                     />
                  </div> */}
                  <div className="d-flex" style={{ marginTop: "16px" }}>
                     <div
                        className=""
                        style={{
                           width: "200px",
                           borderBottom: "3px solid blue",
                           paddingBottom: "10px",
                           cursor: "pointer",
                        }}
                        onClick={() => {
                           setProductOptToggle(true);
                        }}
                     >
                        Pricing
                     </div>
                     <div
                        className=""
                        style={{
                           width: "200px",
                           borderBottom: "3px solid blue",
                           paddingBottom: "10px",
                           cursor: "pointer",
                        }}
                        onClick={() => {
                           setProductOptToggle(false);
                        }}
                     >
                        Stock
                     </div>
                  </div>
                  {productOptToggle ? (
                     <div className="">
                        <div className="d-between">
                           <div
                              className=""
                              style={{
                                 display: "flex",
                                 flexDirection: "column",
                                 marginTop: "40px",
                              }}
                           >
                              <div className="">
                                 <h4 style={{ textAlign: "start" }}>Sales</h4>
                              </div>
                              <div className="d-flex" style={{ gap: "50px" }}>
                                 <div className="d-flex">
                                    <input
                                       required
                                       type="text"
                                       placeholder="Sale Price *"
                                       className="item-inp-field"
                                    />
                                    <select
                                       name=""
                                       id=""
                                       className="item-inp-field"
                                    >
                                       <option value="">With Tax</option>
                                       <option value="">Without Tax</option>
                                    </select>
                                 </div>
                                 <div className="d-flex">
                                    <input
                                       required
                                       type="text"
                                       placeholder="Sale Price *"
                                       className="item-inp-field"
                                    />
                                    <select
                                       name=""
                                       id=""
                                       className="item-inp-field"
                                    >
                                       <option value="">With Tax</option>
                                       <option value="">Without Tax</option>
                                    </select>
                                    <br />
                                 </div>
                              </div>
                              <div className="">
                                 <div
                                    className=""
                                    style={{
                                       color: "#3ed5ff",
                                       fontWeight: "500",
                                       textAlign: "start",
                                       marginTop: "30px",
                                       cursor: "pointer",
                                    }}
                                    onClick={() => {
                                       setWsToggle(!wsToggle);
                                    }}
                                 >
                                    {wsToggle
                                       ? "+ Remove Wholesale Price"
                                       : "+ Add Wholesale Price"}
                                 </div>
                                 {wsToggle && (
                                    <div
                                       className=""
                                       style={{ marginTop: "10px" }}
                                    >
                                       <div
                                          className="d-flex"
                                          style={{ gap: "10px" }}
                                       >
                                          <input
                                             required
                                             type="text"
                                             placeholder="WholeSale Price *"
                                             className="item-inp-field"
                                          />
                                          <select
                                             name=""
                                             id=""
                                             className="item-inp-field"
                                          >
                                             <option value="">With Tax</option>
                                             <option value="">
                                                Without Tax
                                             </option>
                                          </select>
                                          <input
                                             required
                                             type="text"
                                             placeholder="Minimum Wholesale Quantity"
                                             className="item-inp-field"
                                          />
                                       </div>
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>

                        <div
                           className="d-between"
                           style={{ marginBottom: "20px" }}
                        >
                           <div
                              className=""
                              style={{
                                 display: "flex",
                                 flexDirection: "column",
                                 marginTop: "40px",
                              }}
                           >
                              <div className="">
                                 <div
                                    className="d-flex"
                                    style={{ gap: "50px" }}
                                 >
                                    <div className="">
                                       <div className="">
                                          <h4 style={{ textAlign: "start" }}>
                                             Purchase
                                          </h4>
                                       </div>
                                       <div className="d-flex">
                                          <input
                                             required
                                             type="text"
                                             placeholder="Sale Price *"
                                             className="item-inp-field"
                                          />
                                          <select
                                             name=""
                                             id=""
                                             className="item-inp-field"
                                          >
                                             <option value="">With Tax</option>
                                             <option value="">
                                                Without Tax
                                             </option>
                                          </select>
                                       </div>
                                    </div>

                                    <div className="">
                                       <div className="">
                                          <h4 style={{ textAlign: "start" }}>
                                             Taxes
                                          </h4>
                                       </div>
                                       <div className="d-flex">
                                          <input
                                             required
                                             type="text"
                                             placeholder="Sale Price *"
                                             className="item-inp-field"
                                          />
                                          <select
                                             name=""
                                             id=""
                                             className="item-inp-field"
                                          >
                                             <option value="">
                                                Percentage
                                             </option>
                                             <option value="">Amount</option>
                                          </select>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ) : (
                     <div className="">
                        <div className="d-between">
                           <div
                              className=""
                              style={{
                                 display: "flex",
                                 flexDirection: "column",
                                 marginTop: "40px",
                              }}
                           >
                              <div className="d-flex" style={{ gap: "50px" }}>
                                 <div className="d-flex">
                                    <input
                                       required
                                       name="openingQuantity"
                                       onClick={(e) => handleStock(e)}
                                       type="text"
                                       placeholder="Opening Quantity *"
                                       className="inp-field"
                                    />
                                 </div>
                                 <div className="d-flex">
                                    <input
                                       required
                                       name="atPrice"
                                       onChange={(e) => handleStock(e)}
                                       type="text"
                                       placeholder="At Price *"
                                       className="inp-field"
                                    />
                                 </div>
                                 <div className="d-flex">
                                    <input
                                       required
                                       name="asOfDate"
                                       onChange={(e) => handleStock(e)}
                                       value={formData?.stock[0].asOfDate}
                                       type="date"
                                       placeholder="As of date *"
                                       className="inp-field"
                                    />
                                 </div>
                              </div>

                              <div className="d-flex" style={{ gap: "50px" }}>
                                 <div className="d-flex">
                                    <input
                                       required
                                       name="minStockToMaintain"
                                       onChange={(e) => handleStock(e)}
                                       type="text"
                                       placeholder="Min Stock To Maintain *"
                                       className="inp-field"
                                    />
                                 </div>
                                 <div className="d-flex">
                                    <input
                                       required
                                       onChange={(e) => handleStock(e)}
                                       name="location"
                                       type="text"
                                       placeholder="Location *"
                                       className="inp-field"
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
                  <hr />
                  <div className="save-btn-cont">
                     <button
                        type="button"
                        onClick={() => {
                           alert(
                              "You can just only save the data!! Product is under development"
                           );
                        }}
                     >
                        Save & New
                     </button>
                     <button
                        type="button"
                        onClick={() => {
                           handleSave();
                        }}
                     >
                        {itemIsLoading ? "Saving" : "Save"}
                     </button>
                  </div>
               </div>
            ) : (
               <div className="">
                  <div
                     className="d-flex input-cont"
                     style={{ marginTop: "20px", padding: "0px 20px" }}
                  >
                     <input
                        required
                        type="text"
                        placeholder="Service Name *"
                        className="inp-field"
                     />

                     <input
                        required
                        type="text"
                        placeholder="Service HNS *"
                        className="inp-field"
                     />
                     <button type="button" className="select-unit-btn">
                        Select Unit
                     </button>
                  </div>
                  <div
                     className="d-flex input-cont"
                     style={{ marginTop: "20px", padding: "0px 20px" }}
                  >
                     <select
                        name=""
                        id=""
                        className="inp-field"
                        style={{ width: "225px" }}
                     >
                        <option value="">Category</option>
                     </select>

                     <input
                        required
                        type="text"
                        placeholder="Service Code *"
                        className="inp-field"
                     />
                     <input
                        required
                        type="file"
                        placeholder="Add Image Item"
                        className="inp-field"
                        style={{
                           border: "2px solid orange",
                        }}
                     />
                  </div>
                  <div className="d-flex" style={{ marginTop: "16px" }}>
                     <div
                        className=""
                        style={{
                           width: "200px",
                           borderBottom: "3px solid blue",
                           paddingBottom: "10px",
                           cursor: "pointer",
                        }}
                        onClick={() => {
                           setProductOptToggle(true);
                        }}
                     >
                        Pricing
                     </div>
                  </div>
                  <div className="">
                     <div className="d-between">
                        <div
                           className=""
                           style={{
                              display: "flex",
                              flexDirection: "column",
                              marginTop: "40px",
                           }}
                        >
                           <div className="">
                              <h4 style={{ textAlign: "start" }}>
                                 Sales Price
                              </h4>
                           </div>
                           <div className="d-flex" style={{ gap: "50px" }}>
                              <div className="d-flex">
                                 <input
                                    required
                                    type="text"
                                    placeholder="Sale Price *"
                                    className="item-inp-field"
                                 />
                                 <select
                                    name=""
                                    id=""
                                    className="item-inp-field"
                                 >
                                    <option value="">With Tax</option>
                                    <option value="">Without Tax</option>
                                 </select>
                              </div>
                              <div className="d-flex">
                                 <input
                                    required
                                    type="text"
                                    placeholder="Sale Price *"
                                    className="item-inp-field"
                                 />
                                 <select
                                    name=""
                                    id=""
                                    className="item-inp-field"
                                 >
                                    <option value="">Percentage</option>
                                    <option value="">Amount</option>
                                 </select>
                                 <br />
                              </div>
                           </div>
                           <div className="">
                              <div
                                 className=""
                                 style={{
                                    color: "#3ed5ff",
                                    fontWeight: "500",
                                    textAlign: "start",
                                    marginTop: "30px",
                                    cursor: "pointer",
                                 }}
                                 onClick={() => {
                                    setWsToggle(!wsToggle);
                                 }}
                              >
                                 {wsToggle
                                    ? "+ Remove Wholesale Price"
                                    : "+ Add Wholesale Price"}
                              </div>
                              {wsToggle && (
                                 <div
                                    className=""
                                    style={{ marginTop: "10px" }}
                                 >
                                    <div
                                       className="d-flex"
                                       style={{ gap: "10px" }}
                                    >
                                       <input
                                          required
                                          type="text"
                                          placeholder="WholeSale Price *"
                                          className="item-inp-field"
                                       />
                                       <select
                                          name=""
                                          id=""
                                          className="item-inp-field"
                                       >
                                          <option value="">With Tax</option>
                                          <option value="">Without Tax</option>
                                       </select>
                                       <input
                                          required
                                          type="text"
                                          placeholder="Minimum Wholesale Quantity"
                                          className="item-inp-field"
                                       />
                                    </div>
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>

                     <div className="d-between">
                        <div
                           className=""
                           style={{
                              display: "flex",
                              flexDirection: "column",
                              marginTop: "40px",
                           }}
                        >
                           <div className="">
                              <div className="d-flex" style={{ gap: "50px" }}>
                                 <div className="">
                                    <div className="">
                                       <h4 style={{ textAlign: "start" }}>
                                          Taxes
                                       </h4>
                                    </div>
                                    <div className="d-flex">
                                       <select
                                          name=""
                                          id=""
                                          className="item-inp-field"
                                       >
                                          <option value="">None</option>
                                          <option value="">IGST</option>
                                       </select>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <hr />
                  <div className="save-btn-cont">
                     <button onClick={handleSave} type="button">
                        Save & New
                     </button>
                     <button onClick={handleSave} type="button">
                        {itemIsLoading ? "Saving" : "Save"}
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
