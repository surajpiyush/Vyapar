import React from "react";
import styles from "./setting.module.css";
import Sidebar from "./Sidebar";

function Setting() {
   return (
      <div>
         <Sidebar />

         <section id={styles.interface}>
            <div>
               <div>
                  <div className={styles.container}>
                     <div className={styles.section}>
                        <h2>Transaction Header</h2>
                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 Your Label
                                 Your Label
                                 Your Label
                              </label>
                           </div>
                        </div>

                        <div className={styles.tab}>
                           <input
                              type="checkbox"
                              className={styles.checkbox}
                              name="checkbox"
                           ></input>
                           <label className={styles.label} htmlFor="checkbox">
                              Invoice/Bill No.
                           </label>
                        </div>
                        <div>
                           <input
                              type="checkbox"
                              className={styles.checkbox}
                              name="checkbox"
                           ></input>
                           <label className={styles.label} htmlFor="checkbox">
                              Add Time on Transaction
                           </label>
                        </div>
                        <div>
                           <input
                              type="checkbox"
                              className={styles.checkbox}
                              name="checkbox"
                           ></input>
                           <label className={styles.label} htmlFor="checkbox">
                              Print Time on Invoices
                           </label>
                        </div>
                        <div>
                           <input
                              type="checkbox"
                              className={styles.checkbox}
                              name="checkbox"
                           ></input>
                           <label className={styles.label} htmlFor="checkbox">
                              Cash Sale by default
                           </label>
                        </div>
                        <div>
                           <input
                              type="checkbox"
                              className={styles.checkbox}
                              name="checkbox"
                           ></input>
                           <label className={styles.label} htmlFor="checkbox">
                              Billing Name of Parties
                           </label>
                        </div>
                        <div>
                           <input
                              type="checkbox"
                              className={styles.checkbox}
                              name="checkbox"
                           ></input>
                           <label className={styles.label} htmlFor="checkbox">
                              Customers P.O Details on Transaction
                           </label>
                        </div>
                     </div>

                     {/* Item Table */}
                     <div className={styles.section}>
                        <h2>Item Table</h2>
                        <div>
                           <input
                              type="checkbox"
                              className={styles.checkbox}
                              name="checkbox"
                           ></input>
                           <label className={styles.label} htmlFor="checkbox">
                              Inclusive/Exclusive Tax on Rate(Price/Unit)
                           </label>
                        </div>
                        <div>
                           <input
                              type="checkbox"
                              className={styles.checkbox}
                              name="checkbox"
                           ></input>
                           <label className={styles.label} htmlFor="checkbox">
                              Display Purchase Price of Items
                           </label>
                        </div>
                        <div>
                           <input
                              type="checkbox"
                              className={styles.checkbox}
                              name="checkbox"
                           ></input>
                           <label className={styles.label} htmlFor="checkbox">
                              Show last 5 Sale Price of Items
                           </label>
                        </div>
                        <div>
                           <input
                              type="checkbox"
                              className={styles.checkbox}
                              name="checkbox"
                           ></input>
                           <label className={styles.label} htmlFor="checkbox">
                              Free Item Quantity
                           </label>
                        </div>
                        <div>
                           <input
                              type="checkbox"
                              className={styles.checkbox}
                              name="checkbox"
                           ></input>
                           <label className={styles.label} htmlFor="checkbox">
                              Count
                           </label>
                        </div>
                     </div>

                     {/* Taxes, Discount & Totals */}
                     <div className={styles.section}>
                        <h2>Taxes, Discount & Totals</h2>

                        <input
                           type="checkbox"
                           className={styles.checkbox}
                           name="checkbox"
                        ></input>
                        <label className={styles.label} htmlFor="checkbox">
                           Transaction wise Tax
                        </label>

                        <input
                           type="checkbox"
                           className={styles.checkbox}
                           name="checkbox"
                        ></input>
                        <label className={styles.label} htmlFor="checkbox">
                           Transaction wise Discount
                        </label>

                        <input
                           type="checkbox"
                           className={styles.checkbox}
                           name="checkbox"
                        ></input>
                        <label className={styles.label} htmlFor="checkbox">
                           Round Off Total
                        </label>

                        <select
                           id="nearest"
                           name="nearest"
                           style={{ display: "inline-block" }}
                        >
                           <option value="volvo">Nearest</option>
                           <option value="saab">Saab</option>
                           <option value="fiat">Fiat</option>
                           <option value="audi">Audi</option>
                        </select>
                        <p style={{ display: "inline-block" }}>To</p>
                        <select
                           id="to"
                           name="to"
                           style={{ display: "inline-block" }}
                        >
                           <option value="volvo">1</option>
                           <option value="saab">Saab</option>
                           <option value="fiat">Fiat</option>
                           <option value="audi">Audi</option>
                        </select>
                     </div>
                  </div>

                  {/* More Transaction Features */}
                  <div className={styles.container1}>
                     <div className={styles.section1}>
                        <h2>More Transaction Features</h2>
                        <input
                           type="checkbox"
                           className={styles.checkbox}
                           name="checkbox"
                        ></input>
                        <label className={styles.label} htmlFor="checkbox">
                           E-way bill no
                        </label>

                        <input
                           type="checkbox"
                           className={styles.checkbox}
                           name="checkbox"
                        ></input>
                        <label className={styles.label} htmlFor="checkbox">
                           Quik Entry
                        </label>

                        <input
                           type="checkbox"
                           className={styles.checkbox}
                           name="checkbox"
                        ></input>
                        <label className={styles.label} htmlFor="checkbox">
                           Do not Show Invoice Preview
                        </label>

                        <input
                           type="checkbox"
                           className={styles.checkbox}
                           name="checkbox"
                        ></input>
                        <label className={styles.label} htmlFor="checkbox">
                           Enable Passcode htmlFor transaction
                        </label>

                        <input
                           type="checkbox"
                           className={styles.checkbox}
                           name="checkbox"
                        ></input>
                        <label className={styles.label} htmlFor="checkbox">
                           Discount During Payments
                        </label>

                        <input
                           type="checkbox"
                           className={styles.checkbox}
                           name="checkbox"
                        ></input>
                        <label className={styles.label} htmlFor="checkbox">
                           Link Payments to Invoices
                        </label>

                        <input
                           type="checkbox"
                           className={styles.checkbox}
                           name="checkbox"
                        ></input>
                        <label className={styles.label} htmlFor="checkbox">
                           Due Dates and Payment Terms
                        </label>

                        <input
                           type="checkbox"
                           className={styles.checkbox}
                           name="checkbox"
                        ></input>
                        <label className={styles.label} htmlFor="checkbox">
                           Show Profit while making Sale Invoice
                        </label>
                     </div>

                     {/* Transaction Prefixes */}
                     <div className={styles.section1}>
                        <h2>Transaction Prefixes</h2>

                        <fieldset>
                           <legend className={styles.legend}>Firm</legend>

                           <select id={styles.cars} name="cars">
                              <option value="volvo">hariom</option>
                              <option value="saab">Sarthak</option>
                              <option value="fiat">Fiat</option>
                              <option value="audi">Audi</option>
                           </select>
                        </fieldset>

                        <fieldset>
                           <legend className={styles.legend}>Prefixes</legend>

                           <fieldset>
                              <legend className={styles.legend}>Sale</legend>
                              <select id={styles.cars} name="cars">
                                 <option value="volvo">None</option>
                              </select>
                           </fieldset>
                           <fieldset>
                              <legend className={styles.legend}>
                                 Credit Note
                              </legend>
                              <select id={styles.cars} name="cars">
                                 <option value="volvo">None</option>
                              </select>
                           </fieldset>

                           <fieldset>
                              <legend className={styles.legend}>
                                 Sale Order
                              </legend>
                              <select id={styles.cars} name="cars">
                                 <option value="volvo">None</option>
                              </select>
                           </fieldset>
                           <fieldset>
                              <legend className={styles.legend}>
                                 Purchase Order
                              </legend>

                              <select id={styles.cars} name="cars">
                                 <option value="volvo">None</option>
                              </select>
                           </fieldset>
                           <fieldset>
                              <legend className={styles.legend}>
                                 Estimate
                              </legend>
                              <select id={styles.cars} name="cars">
                                 <option value="volvo">None</option>
                              </select>
                           </fieldset>
                           <fieldset>
                              <legend className={styles.legend}>
                                 Delivery Challan
                              </legend>

                              <select id={styles.cars} name="cars">
                                 <option value="volvo">None</option>
                              </select>
                           </fieldset>
                           <fieldset>
                              <legend className={styles.legend}>
                                 Payment In
                              </legend>
                              <select id={styles.cars} name="cars">
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
}

export default Setting;
