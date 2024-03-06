import css from "./Setting.module.css";

const TaxAndGst = () => {
  return (
    <div>
      <section id={css.interface}>
        <div>
          <div>
            <div className={css.container}>
              <div className={css.section}>
                <h2>GST Settings</h2>

                <div class={css.tab}>
                  <div class={css.checkboxContainer}>
                    <input
                      type="checkbox"
                      class="checkbox"
                      className={css.checkbox}
                    />
                    <label for="checkbox" className={css.label}>
                      Enable GST
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
                      Enable HSN/SAC Code
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
                      Additional Cess On Item
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
                      Reverse Charge
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
                      Enable Place of Supply
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
                      Composite Scheme
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
                      Enable TCS
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button>Tax List </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaxAndGst;
