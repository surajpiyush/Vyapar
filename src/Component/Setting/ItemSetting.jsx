import css from "./Setting.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCheckbox,
  updateSelectSetting,
} from "../../Redux/setting/action";

const ItemSetting = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.SettingReducer);
  // console.log(store)
  const page = "item";
  // Application
  const handleToggleTransactionsBox = (name) => {
    dispatch(updateCheckbox(page, "item", name, !store.item.item[name]));
  };

  return (
    <div>
      <section id={css.interface}>
        <div>
          <div>
            <div className={css.container}>
              <div className={css.section}>
                <h2>Item Setting</h2>
                {Object.entries(store.item.item).map(([name, checked]) => (
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
                ))}
              </div>

              {/* Item Table */}
              <div className={css.section}>
                <h2>Additional Item Fields</h2>
                <h3>MRP/Price</h3>
                <div class={css.tab}>
                  <div class={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      class="checkbox"
                      className={css.checkbox}
                    />
                    <label for="checkbox" className={css.label}>
                      MRP
                    </label>
                    <input
                      type="text"
                      placeholder="MRP"
                      style={{
                        marginLeft: "120px",
                        width: "100px",
                        textAlign: "center",
                        border: "1px solid gray",
                        alignContent: "end",
                      }}
                      className={css.checkbox}
                    />
                  </div>
                </div>
                <br />
                <h3>Serial No. Tracking</h3>
                <div class={css.tab}>
                  <div class={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      class="checkbox"
                      className={css.checkbox}
                    />
                    <label for="checkbox" className={css.label}>
                      Serial No./ IMEI No. etc
                    </label>
                    <input
                      type="text"
                      placeholder="Serial No."
                      style={{
                        marginLeft: "120px",
                        width: "100px",
                        textAlign: "center",
                        border: "1px solid gray",
                      }}
                      className={css.checkbox}
                    />
                  </div>
                </div>
                <br />
                <h3>Batch Tracking</h3>
                <div class={css.tab}>
                  <div class={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      class="checkbox"
                      className={css.checkbox}
                    />
                    <label for="checkbox" className={css.label}>
                      Batch No.
                    </label>
                    <input
                      type="text"
                      placeholder="Batch No."
                      style={{
                        marginLeft: "120px",
                        width: "100px",
                        textAlign: "center",
                        border: "1px solid gray",
                      }}
                    />
                  </div>
                </div>{" "}
                <div class={css.tab}>
                  <div class={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      class="checkbox"
                      className={css.checkbox}
                    />
                    <label for="checkbox" className={css.label}>
                      Exp date
                    </label>
                    <input
                      type="text"
                      placeholder="Exp. Date"
                      style={{
                        marginLeft: "120px",
                        width: "100px",
                        textAlign: "center",
                        border: "1px solid gray",
                      }}
                    />
                  </div>
                </div>{" "}
                <div class={css.tab}>
                  <div class={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      class="checkbox"
                      className={css.checkbox}
                    />
                    <label for="checkbox" className={css.label}>
                      Mfg Date
                    </label>
                    <input
                      type="text"
                      placeholder="Mfg Date"
                      style={{
                        marginLeft: "120px",
                        width: "100px",
                        textAlign: "center",
                        border: "1px solid gray",
                      }}
                    />
                  </div>
                </div>{" "}
                <div class={css.tab}>
                  <div class={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      class="checkbox"
                      className={css.checkbox}
                    />
                    <label for="checkbox" className={css.label}>
                      Model No.
                    </label>
                    <input
                      type="text"
                      placeholder="Model No."
                      style={{
                        marginLeft: "120px",
                        width: "100px",
                        textAlign: "center",
                        border: "1px solid gray",
                      }}
                    />
                  </div>
                </div>{" "}
                <div class={css.tab}>
                  <div class={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      class="checkbox"
                      className={css.checkbox}
                    />
                    <label for="checkbox" className={css.label}>
                      Size
                    </label>
                    <input
                      type="text"
                      placeholder="Size"
                      style={{
                        marginLeft: "120px",
                        width: "100px",
                        textAlign: "center",
                        border: "1px solid gray",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItemSetting;
