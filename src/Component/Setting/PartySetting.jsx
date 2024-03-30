import css from "./Setting.module.css";

const PartySetting = () => {
  return (
    <div>
      <section id={css.interface}>
        <div className={css.container}>
          <div className={css.section}>
            <h2>Party Settings</h2>

            <div class={css.tab}>
              <div class={css.checkboxContainer}>
                <input
                  type="checkbox"
                  class="checkbox"
                  className={css.checkbox}
                />
                <label for="checkbox" className={css.label}>
                  Party Grouping
                </label>
              </div>
            </div>

            <div class={css.tab}>
              <div class={css.checkboxContainer}>
                <input
                  type="checkbox"
                  class="checkbox"
                  className={css.checkbox}
                />
                <label for="checkbox" className={css.label}>
                  Shipping Address
                </label>
              </div>
            </div>
            <div class={css.tab}>
              <div class={css.checkboxContainer}>
                <input
                  type="checkbox"
                  class="checkbox"
                  className={css.checkbox}
                />
                <label for="checkbox" className={css.label}>
                  Enable Payment Reminder
                </label>
              </div>
            </div>

            <div class={css.tab}>
              <div class={css.checkboxContainer}>
                <label for="checkbox" className={css.label}>
                  Remind me for payment due in
                </label>
                <input
                  type="number"
                  placeholder="2"
                  style={{
                    width: "20px",
                    border: "1px solid black",
                    padding: "auto",
                  }}
                />
                <p>(days)</p>
              </div>
            </div>
            <div class={css.tab}>
              <p
                style={{
                  paddingLeft: "15px",
                  marginTop: "20px",
                  color: "blue",
                }}
              >
                Remainder Message {">"} <hr style={{ height: "20px" }} />{" "}
              </p>
            </div>
          </div>

          {/* Item Table */}
          <div className={css.section}>
            <h2>Additional Fields</h2>

            <div class={css.tab}>
              <div class={css.checkboxContainer}>
                <input
                  type="checkbox"
                  class="checkbox"
                  className={css.checkbox}
                />

                <input
                  type="text"
                  placeholder="MRP"
                  style={{
                    width: "300px",
                    textAlign: "center",
                    border: "1px solid gray",
                    alignContent: "end",
                  }}
                  className={css.checkbox}
                />
              </div>
            </div>
          </div>

          <div className={css.section}>
            <h2>Enable Loyalty Point</h2>
            <div class={css.tab}>
              <div class={css.checkboxContainer}>
                <input
                  type="checkbox"
                  class="checkbox"
                  className={css.checkbox}
                />
                <label for="checkbox" className={css.label}>
                  Enable Loyalty Point
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartySetting;
