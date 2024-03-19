import "../../styles/Items.css";
import css from "../../styles/SalesStyles/SalesForms.module.css";
import { addItem } from "../../Redux/items/actions";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function ItemsForm({ closeForm, handleSettingClick }) {
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
      category: "65d080c09b0c34b0924bd909",
      itemName: "",
      itemHsn: "",
      itemCode: "",
      description: "",
      seleteUnit: { baseUnit: "", secondaryUnit: "" },
      salePrice: {
         salePrice: "",
         tax: false,
         disOnSale: "",
         discountType: "",
      },
      wholesalePrice: {
         wholesalePrice: "",
         tax: false,
         minimumWholesaleQty: "",
      },
      purchasePrice: { purchasePrice: "", tax: false },
      taxRate: "",
      stock: {
         openingQuantity: "",
         atPrice: "",
         asOfDate: new Date().toISOString().split("T")[0],
         minStockToMaintain: "",
         location: "",
      },
      // tracking: {
      //   type: "",
      //   // enum:["Batch Tracking","Serial No. Tracking"]
      // },
      // mrp: {
      //   mrp: 0,
      //   disOnMrpForSalePersent: "",
      //   disOnMrpForWholesalePersent: "",
      // },
      // manufacturing: {
      //   rawMaterial: [
      //     {
      //       rawMaterial: "",
      //       quanity: "",
      //       unit: "",
      //       priceperUnit: "",
      //       estimateCost: "",
      //       total: "",
      //     },
      //   ],
      //   additionalCost: [
      //     {
      //       cahrges: "",
      //       estimateCost: "",
      //       totalEstimateCost: "",
      //     },
      //   ],
      // },
   });

   // Input change handler
   const handleChange = (e) => {
      const { name, value } = e.target;
      if (name == "seleteUnit") {
         const seletedUnit = { baseUnit: value, secondaryUnit: value };
         setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: seletedUnit,
         }));
      } else {
         setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
         }));
      }
   };

   // Sale price change handler
   const handleSalePriceChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => {
         return { ...prev, salePrice: { ...prev?.salePrice, [name]: value } };
      });
   };

   // Wholesale price change handler
   const handleWholesalePriceChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => {
         return {
            ...prev,
            wholesalePrice: { ...prev?.wholesalePrice, [name]: value },
         };
      });
   };

   // Purchase price change handler
   const handlePurchasePriceChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => {
         return {
            ...prev,
            purchasePrice: { ...prev?.purchasePrice, [name]: value },
         };
      });
   };

   // Stock Change Handler
   const handleStock = (e) => {
      let { name, value } = e.target;
      setFormData((prev) => {
         return {
            ...prev,
            stock: { ...prev?.stock, [name]: value },
         };
      });
   };

   // Submit Function
   const handleSave = () => {
      console.log("Add Item Data:", formData);
      addItem(dispatch, formData, closeForm, toast);
   };

   // Close Form Function
   const handleCloseForm = () => {
      // console.log("Working");
      closeForm(false);
   };

   return (
      <div onClick={handleCloseForm} className="itemFormOuterDiv">
         <div className="item-form" onClick={(e) => e.stopPropagation()}>
            {/* Form Head */}
            <div className="d-between ">
               <div className="d-around ">
                  <h3>Add Item</h3>
                  {/* <div className="" style={{ marginLeft: "20px" }}>
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
            </div> */}
               </div>
               <div className="icon-cont">
                  <i className="fa fa-cog" onClick={handleSettingClick}></i>
                  <i className="fa fa-close" onClick={handleCloseForm}></i>
               </div>
            </div>
            <hr />
            {optToggle ? (
               // Product Form
               <div className="">
                  <div
                     className="d-flex input-cont"
                     style={{ marginTop: "20px", padding: "0px 20px" }}
                  >
                     {/* Item Name */}
                     <input
                        type="text"
                        name="itemName"
                        value={formData?.itemName}
                        onChange={handleChange}
                        placeholder="Item Name *"
                        className="inp-field"
                        required
                     />
                     {/* Item HSN */}
                     <input
                        type="number"
                        name="itemHsn"
                        value={formData?.itemHsn}
                        onChange={handleChange}
                        placeholder="Item HSN *"
                        className="inp-field"
                        required
                     />
                     {/* Unit */}
                     <button type="button" className="select-unit-btn">
                        {!sel ? (
                           <td
                              className={css.unitBody}
                              style={{ color: "black", fontWeight: "bold" }}
                              onClick={() => setSel(false)}
                           >
                              <select
                                 value={formData?.seleteUnit?.baseUnit}
                                 onChange={handleChange}
                                 name="seleteUnit"
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

                  {/* Toggle Pricing / Stock */}
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
                     // Pricing Form Fields
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
                                    {/* Sale Price : salePrice */}
                                    <input
                                       type="number"
                                       name="salePrice"
                                       value={formData?.salePrice?.salePrice}
                                       onChange={handleSalePriceChange}
                                       placeholder="Sale Price *"
                                       className="item-inp-field"
                                       required
                                    />
                                    {/* Sale Price : tax */}
                                    <select
                                       name="tax"
                                       value={formData?.salePrice?.tax}
                                       onChange={handleSalePriceChange}
                                       id=""
                                       className="item-inp-field"
                                    >
                                       <option value={true}>With Tax</option>
                                       <option value={false}>
                                          Without Tax
                                       </option>
                                    </select>
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
                                          {/* Wholesale */}
                                          <input
                                             type="number"
                                             name="wholesalePrice"
                                             value={
                                                formData?.wholesalePrice
                                                   ?.wholesalePrice
                                             }
                                             onChange={
                                                handleWholesalePriceChange
                                             }
                                             placeholder="WholeSale Price *"
                                             className="item-inp-field"
                                          />
                                          <select
                                             name="tax"
                                             value={
                                                formData?.wholesalePrice?.tax
                                             }
                                             onChange={
                                                handleWholesalePriceChange
                                             }
                                             className="item-inp-field"
                                          >
                                             <option value={true}>
                                                With Tax
                                             </option>
                                             <option value={false}>
                                                Without Tax
                                             </option>
                                          </select>
                                          <input
                                             type="number"
                                             name="minimumWholesaleQty"
                                             value={
                                                formData?.wholesalePrice
                                                   ?.minimumWholesaleQty
                                             }
                                             onChange={
                                                handleWholesalePriceChange
                                             }
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
                                          {/* purchasePrice */}
                                          <input
                                             type="number"
                                             name="purchasePrice"
                                             value={
                                                formData?.purchasePrice
                                                   ?.purchasePrice
                                             }
                                             onChange={
                                                handlePurchasePriceChange
                                             }
                                             placeholder="Purchase Price *"
                                             className="item-inp-field"
                                          />
                                          <select
                                             name="tax"
                                             value={
                                                formData?.purchasePrice?.tax
                                             }
                                             onChange={
                                                handlePurchasePriceChange
                                             }
                                             className="item-inp-field"
                                          >
                                             <option value={true}>
                                                With Tax
                                             </option>
                                             <option value={false}>
                                                Without Tax
                                             </option>
                                          </select>
                                       </div>
                                    </div>
                                    {formData?.purchasePrice?.tax !=
                                       "false" && (
                                       <div className="">
                                          <div className="">
                                             <h4 style={{ textAlign: "start" }}>
                                                Taxes
                                             </h4>
                                          </div>
                                          <div className="d-flex">
                                             {/* Taxes */}
                                             <select
                                                name="taxRate"
                                                value={formData?.taxRate}
                                                onChange={handleChange}
                                                className="item-inp-field"
                                             >
                                                <option value="">None</option>
                                                <option value="0">
                                                   IGST@0%
                                                </option>
                                                <option value="0">
                                                   GST@0%
                                                </option>
                                                <option value="0.25">
                                                   IGST@0.25%
                                                </option>
                                                <option value="0.25">
                                                   GST@0.25%
                                                </option>
                                                <option value="3">
                                                   IGST@3%
                                                </option>
                                                <option value="3">
                                                   GST@3%
                                                </option>
                                                <option value="5">
                                                   IGST@5%
                                                </option>
                                                <option value="5">
                                                   GST@5%
                                                </option>
                                                <option value="12">
                                                   IGST@12%
                                                </option>
                                                <option value="12">
                                                   GST@12%
                                                </option>
                                                <option value="18">
                                                   IGST@18%
                                                </option>
                                                <option value="18">
                                                   GST@18%
                                                </option>
                                                <option value="28">
                                                   IGST@28%
                                                </option>
                                                <option value="28">
                                                   GST@28%
                                                </option>
                                             </select>
                                             {/* <input
                              type="number"
                              placeholder="Taxes"
                              className="item-inp-field"
                            />
                            <select name="" id="" className="item-inp-field">
                              <option value="">Percentage</option>
                              <option value="">Amount</option>
                            </select> */}
                                          </div>
                                       </div>
                                    )}
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
                                       type="number"
                                       name="openingQuantity"
                                       value={formData?.stock?.openingQuantity}
                                       onChange={handleStock}
                                       placeholder="Opening Quantity *"
                                       className="inp-field"
                                       required
                                    />
                                 </div>
                                 <div className="d-flex">
                                    <input
                                       type="number"
                                       name="atPrice"
                                       value={formData?.stock?.atPrice}
                                       onChange={handleStock}
                                       placeholder="At Price *"
                                       className="inp-field"
                                       required
                                    />
                                 </div>
                                 <div className="d-flex">
                                    <input
                                       type="date"
                                       name="asOfDate"
                                       value={formData?.stock?.asOfDate}
                                       onChange={(e) => {
                                          const { name, value } = e.target;
                                          if (new Date(value) > new Date()) {
                                             setFormData((prev) => {
                                                return {
                                                   ...prev,
                                                   stock: {
                                                      ...prev?.stock,
                                                      [name]: new Date()
                                                         .toISOString()
                                                         .split("T")[0],
                                                   },
                                                };
                                             });
                                             toast.closeAll();
                                             toast({
                                                title: "Selected date should not be after today",
                                                status: "warning",
                                                position: "top",
                                             });
                                          } else {
                                             setFormData((prev) => {
                                                return {
                                                   ...prev,
                                                   stock: {
                                                      ...prev?.stock,
                                                      [name]: value,
                                                   },
                                                };
                                             });
                                          }
                                       }}
                                       placeholder="As of date *"
                                       className="inp-field"
                                       required
                                    />
                                 </div>
                              </div>
                              <div className="d-flex" style={{ gap: "50px" }}>
                                 <div className="d-flex">
                                    <input
                                       type="number"
                                       name="minStockToMaintain"
                                       value={
                                          formData?.stock?.minStockToMaintain
                                       }
                                       onChange={handleStock}
                                       placeholder="Min Stock To Maintain *"
                                       className="inp-field"
                                       required
                                    />
                                 </div>
                                 <div className="d-flex">
                                    <input
                                       type="text"
                                       name="location"
                                       value={formData?.stock?.location}
                                       onChange={handleStock}
                                       placeholder="Location *"
                                       className="inp-field"
                                       required
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
