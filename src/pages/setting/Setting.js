import React from "react";
import { Link } from "react-router-dom";
import styles from "./setting.module.css";
import Sidebar from "./Sidebar";
// import "./sidebar.css";

function Setting() {
  return (
    <div >
    <Sidebar />
      <br /><br />
      <section id={styles.interface}>
        <div id={styles.interface}>
          <div className={styles.n1}>
            <div>
              <i id={styles.menuBtn} className="fas fa-bars"></i>
              <div className={styles.container}>
                <div className={styles.section}>
                  <h2>Transaction Header</h2>

                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">Invoice/Bill No.</label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">Add Time on Transaction</label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">Print Time on Invoices</label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">Cash Sale by default</label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">Billing Name of Parties</label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">
                    Customers P.O Details on Transaction
                  </label>
                </div>

                {/* Item Table */}
                <div className={styles.section}>
                  <h2>Item Table</h2>

                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">
                    Inclusive/Exclusive Tax on Rate(Price/Unit)
                  </label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">
                    Display Purchase Price of Items
                  </label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">
                    Show last 5 Sale Price of Items
                  </label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">Free Item Quantity</label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">Count</label>
                  <br />
                  <br />
                  {/* change text button */}
                </div>

                {/* Taxes, Discount & Totals */}
                <div className={styles.section}>
                  <h2>Taxes, Discount & Totals</h2>

                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">Transaction wise Tax</label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">Transaction wise Discount</label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">Round Off Total</label>
                  <br />
                  <br />
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
                  <label htmlFor="checkbox">E-way bill no</label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">Quik Entry</label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">
                    Do not Show Invoice Preview
                  </label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">
                    Enable Passcode htmlFor transaction
                  </label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">
                    Discount During Payments
                  </label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">
                    Link Payments to Invoices
                  </label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">
                    Due Dates and Payment Terms
                  </label>
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkbox"
                  ></input>
                  <label htmlFor="checkbox">
                    Show Profit while making Sale Invoice
                  </label>
                </div>

                {/* Transaction Prefixes */}
                <div className={styles.section1}>
                  <h2>Transaction Prefixes</h2>
                  <br />
                  <fieldset>
                    <legend>Firm</legend>

                    <select id={styles.cars} name="cars">
                      <option value="volvo">hariom</option>
                      <option value="saab">Sarthak</option>
                      <option value="fiat">Fiat</option>
                      <option value="audi">Audi</option>
                    </select>
                  </fieldset>
                  <br />
                  <br />

                  <fieldset>
                    <legend>Prefixes</legend>
                    <br />
                    <fieldset>
                      <legend>Sale</legend>
                      <select id={styles.cars} name="cars">
                        <option value="volvo">None</option>
                      </select>
                    </fieldset>
                    <fieldset>
                      <legend>Credit Note</legend>
                      <select id={styles.cars} name="cars">
                        <option value="volvo">None</option>
                      </select>
                    </fieldset>
                    <br />

                    <fieldset>
                      <legend>Sale Order</legend>
                      <select id={styles.cars} name="cars">
                        <option value="volvo">None</option>
                      </select>
                    </fieldset>
                    <fieldset>
                      <legend>Purchase Order</legend>
                      <br />
                      <select id={styles.cars} name="cars">
                        <option value="volvo">None</option>
                      </select>
                    </fieldset>
                    <fieldset>
                      <legend>Estimate</legend>
                      <select id={styles.cars} name="cars">
                        <option value="volvo">None</option>
                      </select>
                    </fieldset>
                    <fieldset>
                      <legend>Delivery Challan</legend>
                      <br />
                      <select id={styles.cars} name="cars">
                        <option value="volvo">None</option>
                      </select>
                    </fieldset>
                    <fieldset>
                      <legend>Payment In</legend>
                      <select id={styles.cars} name="cars">
                        <option value="volvo">None</option>
                      </select>
                    </fieldset>
                  </fieldset>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Setting;
