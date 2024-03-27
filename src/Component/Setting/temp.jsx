import { useDispatch, useSelector } from "react-redux";
import css from "./Setting.module.css";
import { useNavigate } from "react-router-dom";
// import { getGeneral } from "../../Redux/setting/action";
import { useEffect, useState } from "react";

const General = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const store = useSelector((state) => state.SettingReducer);
   const [transactionsBox, setTransactionsBox] = useState({
      "Enable Barcode": false,
      "Business Currency": false,
      "Print Time on Invoices": false,
      "Cash Sale by default": false,
      "Billing Name of Parties": false,
      "Customers P.O Details on Transaction": false,
   });

   const [moreTransactionFeatrures, setMoreTransectionFeatures] = useState({
      "E-way bill no": false,
      "Quik Entry": false,
      "Do not Show Invoice Preview": false,
      "Enable Passcode htmlFor transaction": false,
      "Discount During Payments": false,
      "Link Payments to Invoices": false,
      "Due Dates and Payment Terms": false,
      "Show Profit while making Sale Invoice": false,
      // Add more checkboxes here as needed
   });

   const [itemTableCheckboxes, setItemTableCheckboxes] = useState({
      "Inclusive/Exclusive Tax on Rate(Price/Unit)": false,
      "Display Purchase Price of Items": false,
      "Show last 5 Sale Price of Items": false,
      "Free Item Quantity": false,
      Count: false,
   });

   const [taxesDiscountTotalsState, setTaxesDiscountTotalsState] = useState({
      "Transaction wise Tax": false,
      "Transaction wise Discount": false,
      "Round Off Total": false,
      nearestSelectValue: "volvo",
      toSelectValue: "1",
   });

   const [transactionPrefixesState, setTransactionPrefixesState] = useState({
      firmSelectValue: "hariom",
      saleSelectValue: "None",
      creditNoteSelectValue: "None",
      saleOrderSelectValue: "None",
      purchaseOrderSelectValue: "None",
      estimateSelectValue: "None",
      deliveryChallanSelectValue: "None",
      paymentInSelectValue: "None",
   });

   // Application
   const handleTransectionBox = (name) => {
      setTransactionsBox((prevCheckboxes) => ({
         ...prevCheckboxes,
         [name]: !prevCheckboxes[name],
      }));
   };

   const handleMoreTransectionFeatures = (name) => {
      setMoreTransectionFeatures((prevCheckboxes) => ({
         ...prevCheckboxes,
         [name]: !prevCheckboxes[name],
      }));
   };

   const handleItemTableCheckboxes = (name) => {
      setItemTableCheckboxes((prevCheckboxes) => ({
         ...prevCheckboxes,
         [name]: !prevCheckboxes[name],
      }));
   };

   // Taxes and Discount
   const handleCheckboxChange = (name) => {
      setTaxesDiscountTotalsState((prevState) => ({
         ...prevState,
         [name]: !prevState[name],
      }));
   };
   const handleSelectChange = (event, key) => {
      const { value } = event.target;
      setTaxesDiscountTotalsState((prevState) => ({
         ...prevState,
         [key]: value,
      }));
   };

   //  prefix
   const handleSelectChangePrefix = (event, key) => {
      const { value } = event.target;
      setTransactionPrefixesState((prevState) => ({
         ...prevState,
         [key]: value,
      }));
   };

  

   return (
      <div>
         <section id={css.interface}>
            <div>
               <div>
                  <div className={css.container}>
                     {/* Transection */}
                     <div className={css.section}>
                        <h2>Application</h2>
                        {Object.entries(transactionsBox).map(
                           ([name, checked]) => (
                              <div key={name} className={css.tab}>
                                 <div className={css.checkboxContainer}>
                                    <input
                                       type="checkbox"
                                       className={css.checkbox}
                                       checked={checked}
                                       onChange={() =>
                                          handleTransectionBox(name)
                                       }
                                    />
                                    <label className={css.label}>{name}</label>
                                 </div>
                              </div>
                           )
                        )}
                     </div>
                     {/* Table Data */}
                     <div className={css.section}>
                        <h2>Item Table</h2>
                        {Object.entries(itemTableCheckboxes).map(
                           ([name, checked]) => (
                              <div key={name} className={css.tab}>
                                 <div className={css.checkboxContainer}>
                                    <input
                                       type="checkbox"
                                       className={css.checkbox}
                                       checked={checked}
                                       onChange={() =>
                                          handleItemTableCheckboxes(name)
                                       }
                                    />
                                    <label className={css.label}>{name}</label>
                                 </div>
                              </div>
                           )
                        )}
                     </div>
                     {/* Taxes and discount */}

                     <div className={css.section}>
                        <h2>Taxes, Discount & Totals</h2>
                        <div class={css.tab}>
                           <div class={css.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={css.checkbox}
                                 checked={
                                    taxesDiscountTotalsState[
                                       "Transaction wise Tax"
                                    ]
                                 }
                                 onChange={() =>
                                    handleCheckboxChange("Transaction wise Tax")
                                 }
                              />
                              <label for="checkbox" className={css.label}>
                                 Transaction wise Tax
                              </label>
                           </div>
                        </div>
                        <div class={css.tab}>
                           <div class={css.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={css.checkbox}
                                 checked={
                                    taxesDiscountTotalsState[
                                       "Transaction wise Discount"
                                    ]
                                 }
                                 onChange={() =>
                                    handleCheckboxChange(
                                       "Transaction wise Discount"
                                    )
                                 }
                              />
                              <label for="checkbox" className={css.label}>
                                 Transaction wise Discount
                              </label>
                           </div>
                        </div>
                        <div class={css.tab}>
                           <div class={css.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={css.checkbox}
                                 checked={
                                    taxesDiscountTotalsState["Round Off Total"]
                                 }
                                 onChange={() =>
                                    handleCheckboxChange("Round Off Total")
                                 }
                              />
                              <label for="checkbox" className={css.label}>
                                 Round Off Total
                              </label>
                           </div>
                        </div>
                        <div class={css.tab}>
                           <div class={css.checkboxContainer}>
                              <select
                                 id="nearest"
                                 name="nearest"
                                 style={{ display: "inline-block" }}
                                 value={
                                    taxesDiscountTotalsState.nearestSelectValue
                                 }
                                 onChange={(event) =>
                                    handleSelectChange(
                                       event,
                                       "nearestSelectValue"
                                    )
                                 }
                              >
                                 <option value="volvo">Nearest</option>
                                 <option value="saab">Saab</option>
                                 <option value="fiat">Fiat</option>
                                 <option value="audi">Audi</option>
                              </select>
                           </div>
                        </div>
                        <br />
                        <p style={{ display: "inline-block" }}>To</p>
                        <div class={css.tab}>
                           <div class={css.checkboxContainer}>
                              <select
                                 id="to"
                                 name="to"
                                 style={{ display: "inline-block" }}
                                 value={taxesDiscountTotalsState.toSelectValue}
                                 onChange={(event) =>
                                    handleSelectChange(event, "toSelectValue")
                                 }
                              >
                                 <option value="volvo">1</option>
                                 <option value="saab">Saab</option>
                                 <option value="fiat">Fiat</option>
                                 <option value="audi">Audi</option>
                              </select>
                              <label
                                 for="checkbox"
                                 className={css.label}
                              ></label>
                           </div>
                        </div>
                     </div>

                     {/* Add more sections here */}
                  </div>

                  <div className={css.container1}>
                     <div className={css.section1}>
                        <h2>Application</h2>
                        {Object.entries(moreTransactionFeatrures).map(
                           ([name, checked]) => (
                              <div key={name} className={css.tab}>
                                 <div className={css.checkboxContainer}>
                                    <input
                                       type="checkbox"
                                       className={css.checkbox}
                                       checked={checked}
                                       onChange={() =>
                                          handleMoreTransectionFeatures(name)
                                       }
                                    />
                                    <label className={css.label}>{name}</label>
                                 </div>
                              </div>
                           )
                        )}
                     </div>
                     <div className={css.section1}>
                        <h2>Transaction Prefixes</h2>
                        <fieldset>
                           <legend className={css.legend}>Firm</legend>
                           <select
                              id={css.cars}
                              name="cars"
                              value={transactionPrefixesState.firmSelectValue}
                              onChange={(event) =>
                                 handleSelectChangePrefix(
                                    event,
                                    "firmSelectValue"
                                 )
                              }
                           >
                              <option value="volvo">hariom</option>
                              <option value="saab">Sarthak</option>
                              <option value="fiat">Fiat</option>
                              <option value="audi">Audi</option>
                           </select>
                        </fieldset>
                        <fieldset>
                           <legend className={css.legend}>Prefixes</legend>
                           <fieldset>
                              <legend className={css.legend}>Sale</legend>
                              <select
                                 id={css.cars}
                                 name="cars"
                                 value={
                                    transactionPrefixesState.saleSelectValue
                                 }
                                 onChange={(event) =>
                                    handleSelectChangePrefix(
                                       event,
                                       "saleSelectValue"
                                    )
                                 }
                              >
                                 <option value="volvo">None</option>
                              </select>
                           </fieldset>
                           <fieldset>
                              <legend className={css.legend}>
                                 Credit Note
                              </legend>
                              <select
                                 id={css.cars}
                                 name="cars"
                                 value={
                                    transactionPrefixesState.creditNoteSelectValue
                                 }
                                 onChange={(event) =>
                                    handleSelectChangePrefix(
                                       event,
                                       "creditNoteSelectValue"
                                    )
                                 }
                              >
                                 <option value="volvo">None</option>
                              </select>
                           </fieldset>
                           <fieldset>
                              <legend className={css.legend}>Sale Order</legend>
                              <select
                                 id={css.cars}
                                 name="cars"
                                 value={
                                    transactionPrefixesState.saleOrderSelectValue
                                 }
                                 onChange={(event) =>
                                    handleSelectChangePrefix(
                                       event,
                                       "saleOrderSelectValue"
                                    )
                                 }
                              >
                                 <option value="volvo">None</option>
                              </select>
                           </fieldset>
                           <fieldset>
                              <legend className={css.legend}>
                                 Purchase Order
                              </legend>
                              <select
                                 id={css.cars}
                                 name="cars"
                                 value={
                                    transactionPrefixesState.purchaseOrderSelectValue
                                 }
                                 onChange={(event) =>
                                    handleSelectChangePrefix(
                                       event,
                                       "purchaseOrderSelectValue"
                                    )
                                 }
                              >
                                 <option value="volvo">None</option>
                              </select>
                           </fieldset>
                           <fieldset>
                              <legend className={css.legend}>Estimate</legend>
                              <select
                                 id={css.cars}
                                 name="cars"
                                 value={
                                    transactionPrefixesState.estimateSelectValue
                                 }
                                 onChange={(event) =>
                                    handleSelectChangePrefix(
                                       event,
                                       "estimateSelectValue"
                                    )
                                 }
                              >
                                 <option value="volvo">None</option>
                              </select>
                           </fieldset>
                           <fieldset>
                              <legend className={css.legend}>
                                 Delivery Challan
                              </legend>
                              <select
                                 id={css.cars}
                                 name="cars"
                                 value={
                                    transactionPrefixesState.deliveryChallanSelectValue
                                 }
                                 onChange={(event) =>
                                    handleSelectChangePrefix(
                                       event,
                                       "deliveryChallanSelectValue"
                                    )
                                 }
                              >
                                 <option value="volvo">None</option>
                              </select>
                           </fieldset>
                           <fieldset>
                              <legend className={css.legend}>Payment In</legend>
                              <select
                                 id={css.cars}
                                 name="cars"
                                 value={
                                    transactionPrefixesState.paymentInSelectValue
                                 }
                                 onChange={(event) =>
                                    handleSelectChangePrefix(
                                       event,
                                       "paymentInSelectValue"
                                    )
                                 }
                              >
                                 <option value="volvo">None</option>
                              </select>
                           </fieldset>
                        </fieldset>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

export default General;
