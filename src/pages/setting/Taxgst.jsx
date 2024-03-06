import React from "react";
import styles from "./setting.module.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Taxgst = () => {
    const navigate = useNavigate();
   return (
      <div>
         <Sidebar />
         <div style={{ textAlign: "end", padding: "5px", marginRight: "55px" }}>
            <i
               className="fa fa-cog"
               style={{ padding: "15px", fontSize: "1.75rem" }}
               onClick={() =>
                  navigate("/setting", {
                     replace: true,
                  })
               }
            ></i>
            <i
               className="fa fa-close"
               style={{ padding: "15px", fontSize: "1.75rem" }}
               onClick={() => navigate("/")}
            ></i>
         </div>
         <section id={styles.interface}>
            <div>
               <div>
                  <div className={styles.container}>
                     <div className={styles.section}>
                        <h2>GST Settings</h2>

                        <div class={styles.tab}>
                           <div class={styles.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={styles.checkbox}
                              />
                              <label for="checkbox" className={styles.label}>
                                 Enable GST
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
                                 Enable HSN/SAC Code
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
                                 Additional Cess On Item
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
                                Reverse Charge
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
                                Enable Place of Supply
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
                                 Composite Scheme
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

export default Taxgst;
