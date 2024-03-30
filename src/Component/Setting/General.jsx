import css from "./Setting.module.css";
import {
  updateCheckbox,
  updateSelectSetting,
} from "../../Redux/setting/action";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const General = () => {
  const page = "transaction";
  const dispatch = useDispatch();
  const store = useSelector((state) => state.SettingReducer);

  const handleToggleTransactionsBox = (name) => {
    dispatch(
      updateCheckbox(
        page,
        "transactionsBox",
        name,
        !store.transaction.transactionsBox[name]
      )
    );
  };

  const handleToggleMoreTransactionFeatures = (name) => {
    dispatch(
      updateCheckbox(
        page,
        "moreTransactionFeatures",
        name,
        !store.transaction.moreTransactionFeatures[name]
      )
    );
  };

  const handleToggleItemTableCheckbox = (name) => {
    dispatch(
      updateCheckbox(
        page,
        "itemTableCheckboxes",
        name,
        !store.transaction.itemTableCheckboxes[name]
      )
    );
  };

  // Taxes and Discount
  const handleToggleTaxDiscountTotal = (name) => {
    dispatch(
      updateCheckbox(
        page,
        "taxesDiscountTotalsState",
        name,
        !store.transaction.taxesDiscountTotalsState[name]
      )
    );
  };

  const handleUpdateTaxDiscountTotalSelect = (key, value) => {
    dispatch(updateSelectSetting(page, "taxesDiscountTotalsState", key, value));
  };

  // Transaction Prefixes
  const handleUpdateTransactionPrefixesSelect = (key, value) => {
    dispatch(updateSelectSetting(page, "transactionPrefixesState", key, value));
  };

  return (
    <div className={css.SectionOuter}>
      {/* OLD JSX */}
      {/* Transaction */}
      <div className={css.section}>
        <h2>Application</h2>
        {Object.entries(store.transaction.transactionsBox).map(
          ([name, checked]) => (
            <div key={name} className={css.tab}>
              <div className={css.checkboxContainer}>
                <input
                  type="checkbox"
                  className={css.checkbox}
                  checked={checked}
                  onChange={() => handleToggleTransactionsBox(name)}
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
        {Object.entries(store.transaction.itemTableCheckboxes).map(
          ([name, checked]) => (
            <div key={name} className={css.tab}>
              <div className={css.checkboxContainer}>
                <input
                  type="checkbox"
                  className={css.checkbox}
                  checked={checked}
                  onChange={() => handleToggleItemTableCheckbox(name)}
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
        {Object.entries(store.transaction.taxesDiscountTotalsState).map(
          ([name, checked]) => (
            <div key={name} className={css.tab}>
              <div className={css.checkboxContainer}>
                <input
                  type="checkbox"
                  className={css.checkbox}
                  checked={checked}
                  onChange={() => handleToggleTaxDiscountTotal(name)}
                />
                <label className={css.label}>{name}</label>
              </div>
            </div>
          )
        )}
        <div className={css.tab}>
          <div className={css.checkboxContainer}>
            <select
              id="nearest"
              name="nearest"
              style={{ display: "inline-block" }}
              value={
                store.transaction.taxesDiscountTotalsState.nearestSelectValue
              }
              onChange={(event) =>
                handleUpdateTaxDiscountTotalSelect(
                  "nearestSelectValue",
                  event.target.value
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
        <div className={css.tab}>
          <div className={css.checkboxContainer}>
            <select
              id="to"
              name="to"
              style={{ display: "inline-block" }}
              value={store.transaction.taxesDiscountTotalsState.toSelectValue}
              onChange={(event) =>
                handleUpdateTaxDiscountTotalSelect(
                  "toSelectValue",
                  event.target.value
                )
              }
            >
              <option value="volvo">1</option>
              <option value="saab">Saab</option>
              <option value="fiat">Fiat</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </div>
      </div>

      {/* More Transaction Features */}
      <div className={css.section}>
        <h2>More Transaction Features</h2>
        {Object.entries(store.transaction.moreTransactionFeatures).map(
          ([name, checked]) => (
            <div key={name} className={css.tab}>
              <div className={css.checkboxContainer}>
                <input
                  type="checkbox"
                  className={css.checkbox}
                  checked={checked}
                  onChange={() => handleToggleMoreTransactionFeatures(name)}
                />
                <label className={css.label}>{name}</label>
              </div>
            </div>
          )
        )}
      </div>

      {/* Transaction Prefixes */}
      <div className={css.section1}>
        <h2>Transaction Prefixes</h2>
        <fieldset>
          <legend className={css.legend}>Firm</legend>
          <select
            id={css.cars}
            name="cars"
            value={store.transaction.transactionPrefixesState.firmSelectValue}
            onChange={(event) =>
              handleUpdateTransactionPrefixesSelect(event, "firmSelectValue")
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
              value={store.transaction.transactionPrefixesState.saleSelectValue}
              onChange={(event) =>
                handleUpdateTransactionPrefixesSelect(event, "saleSelectValue")
              }
            >
              <option value="volvo">None</option>
            </select>
          </fieldset>
          <fieldset>
            <legend className={css.legend}>Credit Note</legend>
            <select
              id={css.cars}
              name="cars"
              value={
                store.transaction.transactionPrefixesState.creditNoteSelectValue
              }
              onChange={(event) =>
                handleUpdateTransactionPrefixesSelect(
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
                store.transaction.transactionPrefixesState.saleOrderSelectValue
              }
              onChange={(event) =>
                handleUpdateTransactionPrefixesSelect(
                  event,
                  "saleOrderSelectValue"
                )
              }
            >
              <option value="volvo">None</option>
            </select>
          </fieldset>
          <fieldset>
            <legend className={css.legend}>Purchase Order</legend>
            <select
              id={css.cars}
              name="cars"
              value={
                store.transaction.transactionPrefixesState
                  .purchaseOrderSelectValue
              }
              onChange={(event) =>
                handleUpdateTransactionPrefixesSelect(
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
                store.transaction.transactionPrefixesState.estimateSelectValue
              }
              onChange={(event) =>
                handleUpdateTransactionPrefixesSelect(
                  event,
                  "estimateSelectValue"
                )
              }
            >
              <option value="volvo">None</option>
            </select>
          </fieldset>
          <fieldset>
            <legend className={css.legend}>Delivery Challan</legend>
            <select
              id={css.cars}
              name="cars"
              value={
                store.transaction.transactionPrefixesState
                  .deliveryChallanSelectValue
              }
              onChange={(event) =>
                handleUpdateTransactionPrefixesSelect(
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
                store.transaction.transactionPrefixesState.paymentInSelectValue
              }
              onChange={(event) =>
                handleUpdateTransactionPrefixesSelect(
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
  );
};

export default General;
