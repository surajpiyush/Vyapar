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
                                 Invoice/Bill No.
                              </label>
                           </div>
                        </div>

                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 Add Time on Transaction
                              </label>
                           </div>
                        </div>

                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 Print Time on Invoices
                              </label>
                           </div>
                        </div>
                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 Cash Sale by default
                              </label>
                           </div>
                        </div>

                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 Billing Name of Parties
                              </label>
                           </div>
                        </div>
                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 Customers P.O Details on Transaction
                              </label>
                           </div>
                        </div>
                     </div>

                     {/* Item Table */}
                     <div className={styles.section}>
                        <h2>Item Table</h2>
                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 Inclusive/Exclusive Tax on Rate(Price/Unit)
                              </label>
                           </div>
                        </div>

                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 Display Purchase Price of Items
                              </label>
                           </div>
                        </div>
                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 Show last 5 Sale Price of Items
                              </label>
                           </div>
                        </div>
                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 Free Item Quantity
                              </label>
                           </div>
                        </div>
                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 Count
                              </label>
                           </div>
                        </div>
                     </div>

                     {/* Taxes, Discount & Totals */}
                     <div className={styles.section}>
                        <h2>Taxes, Discount & Totals</h2>
                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 Transaction wise Tax
                              </label>
                           </div>
                        </div>

                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 Transaction wise Discount
                              </label>
                           </div>
                        </div>

                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 Round Off Total
                              </label>
                           </div>
                        </div>

                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
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
                           </div>
                        </div>
                        <br />
                        <p style={{ display: "inline-block" }}>To</p>
                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
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
                              <label
                                 for="checkbox"
                                 className={styles.label}
                              ></label>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* More Transaction Features */}
                  <div className={styles.container1}>
                     <div className={styles.section1}>
                        <h2>More Transaction Features</h2>

                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 
                           E-way bill no
                              </label>
                           </div>
                        </div>


                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 
                           Quik Entry
                              </label>
                           </div>
                        </div>
                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 
                           Do not Show Invoice Preview
                              </label>
                           </div>
                        </div>
                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                           Enable Passcode htmlFor transaction 
                                 
                              </label>
                           </div>
                        </div>
                  
                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                           Discount During Payments
                                 
                              </label>
                           </div>
                        </div>

                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 
                           Link Payments to Invoices
                              </label>
                           </div>
                        </div>

                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                           Due Dates and Payment Terms
                                 
                              </label>
                           </div>
                        </div>

                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 
                           Show Profit while making Sale Invoice  
                              </label>
                           </div>
                        </div>

                  
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
