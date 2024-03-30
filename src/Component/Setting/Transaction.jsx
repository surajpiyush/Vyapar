import css from "./Setting.module.css";
import {
  updateCheckbox,
  updateSelectSetting,
} from "../../Redux/setting/action";

import { useDispatch, useSelector } from "react-redux";

const Transaction = () => {
  const page = "transaction";
  const dispatch = useDispatch();
  const store = useSelector((state) => state.SettingReducer);

  // Transaction Header
  const handleTransactionHeaders = (name) => {
    dispatch(
      updateCheckbox(
        page,
        "transactionHeader",
        name,
        !store?.[page]?.transactionHeader[name]
      )
    );
  };
  // Item Table
  const handleItemTable = (name) => {
    dispatch(
      updateCheckbox(page, "itemsTable", name, !store?.[page]?.itemsTable[name])
    );
  };
  // Taxes Discount & Totals - CheckBox
  const handleTaxDiscountTotalCheckbox = (name) => {
    dispatch(
      updateCheckbox(
        page,
        "taxesDiscountAndTotals",
        name,
        !store?.[page]?.taxesDiscountAndTotals[name]
      )
    );
  };
  // Taxes Discount & Totals - Select
  const handleTaxDiscountTotalSelect = (key, value) => {
    dispatch(updateSelectSetting(page, "taxesDiscountAndTotals", key, value));
  };
  // More Transaction Features
  const handleMoreTransactionFeatures = (name) => {
    dispatch(
      updateCheckbox(
        page,
        "moreTransactionFeatures",
        name,
        !store?.[page]?.moreTransactionFeatures[name]
      )
    );
  };

  return (
    <div className={css.SectionOuter}>
      {/* Transaction Header */}
      <div className={css.itemOuter}>
        <h2>Transaction Header</h2>
        {store?.[page]?.transactionHeader &&
          Object.entries(store?.[page]?.transactionHeader).map(
            ([name, checked], ind) => (
              <div key={name + ind} className={css.inpContDivOuter}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleTransactionHeaders(name)}
                />
                <label className={css.simpleTextLabel}>{name}</label>
              </div>
            )
          )}
      </div>
      {/* Item Table */}
      <div className={css.itemOuter}>
        <h2>Item Table</h2>
        {store?.[page]?.itemsTable &&
          Object.entries(store?.[page]?.itemsTable).map(
            ([name, checked], ind) => (
              <div key={name + ind} className={css.inpContDivOuter}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleItemTable(name)}
                />
                <label className={css.simpleTextLabel}>{name}</label>
              </div>
            )
          )}
      </div>
      {/* Taxes Discount & Totals */}
      <div className={css.itemOuter}>
        <h2>Taxes Discount & Totals</h2>
        {store?.[page]?.taxesDiscountAndTotals &&
          Object.entries(store?.[page]?.taxesDiscountAndTotals).map(
            ([name, checked], ind) =>
              ["nearestValue", "toValue"].includes(name) ? (
                name == "nearestValue" ? (
                  <div key={name + ind} className={css.inpContDivOuter}>
                    <select
                      name={name}
                      value={checked}
                      onChange={(e) =>
                        handleTaxDiscountTotalSelect(name, e.target.value)
                      }
                    >
                      <option value="Nearest">Nearest</option>
                      <option value="Down To">Down To</option>
                      <option value="Up To">Up To</option>
                    </select>
                    <h3 className={css.simpleText1}>To</h3>
                  </div>
                ) : (
                  <div key={name + ind} className={css.inpContDivOuter}>
                    <select
                      name={name}
                      value={checked}
                      onChange={(e) =>
                        handleTaxDiscountTotalSelect(name, e.target.value)
                      }
                    >
                      <option value={1}>1</option>
                      <option value={10}>10</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                      <option value={1000}>1000</option>
                    </select>
                  </div>
                )
              ) : (
                <div key={name + ind} className={css.inpContDivOuter}>
                  <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={() => handleTaxDiscountTotalCheckbox(name)}
                  />
                  <label className={css.simpleTextLabel}>{name}</label>
                </div>
              )
          )}
      </div>
      {/* More Transaction Features */}
      <div className={css.itemOuter}>
        <h2>More Transaction Features</h2>
        {store?.[page]?.moreTransactionFeatures &&
          Object.entries(store?.[page]?.moreTransactionFeatures).map(
            ([name, checked], ind) => (
              <div key={name + ind} className={css.inpContDivOuter}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleMoreTransactionFeatures(name)}
                />
                <label className={css.simpleTextLabel}>{name}</label>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Transaction;
