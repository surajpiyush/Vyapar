import css from "./Setting.module.css";

const General = () => {
  return (
    <div>
      <section id={css.interface}>
        <div>
          <div>
            <div className={css.container}>
              <div className={css.section}>
                <h2>Transaction Header</h2>

                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Invoice/Bill No.
                    </label>
                  </div>
                </div>

                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Add Time on Transaction
                    </label>
                  </div>
                </div>

                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Print Time on Invoices
                    </label>
                  </div>
                </div>
                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Cash Sale by default
                    </label>
                  </div>
                </div>

                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Billing Name of Parties
                    </label>
                  </div>
                </div>
                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Customers P.O Details on Transaction
                    </label>
                  </div>
                </div>
              </div>

              <div className={css.section}>
                <h2>Item Table</h2>
                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Inclusive/Exclusive Tax on Rate(Price/Unit)
                    </label>
                  </div>
                </div>

                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Display Purchase Price of Items
                    </label>
                  </div>
                </div>
                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Show last 5 Sale Price of Items
                    </label>
                  </div>
                </div>
                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Free Item Quantity
                    </label>
                  </div>
                </div>
                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Count
                    </label>
                  </div>
                </div>
              </div>

              <div className={css.section}>
                <h2>Taxes, Discount & Totals</h2>
                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Transaction wise Tax
                    </label>
                  </div>
                </div>

                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Transaction wise Discount
                    </label>
                  </div>
                </div>

                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Round Off Total
                    </label>
                  </div>
                </div>

                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
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
                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
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
                    <label htmlFor="checkbox" className={css.label}></label>
                  </div>
                </div>
              </div>
            </div>

            <div className={css.container1}>
              <div className={css.section1}>
                <h2>More Transaction Features</h2>

                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      E-way bill no
                    </label>
                  </div>
                </div>

                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Quik Entry
                    </label>
                  </div>
                </div>
                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Do not Show Invoice Preview
                    </label>
                  </div>
                </div>
                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Enable Passcode htmlFor transaction
                    </label>
                  </div>
                </div>

                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Discount During Payments
                    </label>
                  </div>
                </div>

                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Link Payments to Invoices
                    </label>
                  </div>
                </div>

                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      //// className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Due Dates and Payment Terms
                    </label>
                  </div>
                </div>

                <div className={css.tab}>
                  <div className={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      // // className="checkbox"
                      className={css.checkbox}
                    />
                    <label htmlFor="checkbox" className={css.label}>
                      Show Profit while making Sale Invoice
                    </label>
                  </div>
                </div>
              </div>

              <div className={css.section1}>
                <h2>Transaction Prefixes</h2>

                <fieldset>
                  <legend className={css.legend}>Firm</legend>

                  <select id={css.cars} name="cars">
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
                    <select id={css.cars} name="cars">
                      <option value="volvo">None</option>
                    </select>
                  </fieldset>
                  <fieldset>
                    <legend className={css.legend}>Credit Note</legend>
                    <select id={css.cars} name="cars">
                      <option value="volvo">None</option>
                    </select>
                  </fieldset>

                  <fieldset>
                    <legend className={css.legend}>Sale Order</legend>
                    <select id={css.cars} name="cars">
                      <option value="volvo">None</option>
                    </select>
                  </fieldset>
                  <fieldset>
                    <legend className={css.legend}>Purchase Order</legend>

                    <select id={css.cars} name="cars">
                      <option value="volvo">None</option>
                    </select>
                  </fieldset>
                  <fieldset>
                    <legend className={css.legend}>Estimate</legend>
                    <select id={css.cars} name="cars">
                      <option value="volvo">None</option>
                    </select>
                  </fieldset>
                  <fieldset>
                    <legend className={css.legend}>Delivery Challan</legend>

                    <select id={css.cars} name="cars">
                      <option value="volvo">None</option>
                    </select>
                  </fieldset>
                  <fieldset>
                    <legend className={css.legend}>Payment In</legend>
                    <select id={css.cars} name="cars">
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
