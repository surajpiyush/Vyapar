import css from "./ItemSetting.module.css";

import { useNavigate } from "react-router-dom";

const ItemSetting = () => {
   const navigate = useNavigate();
   return (
      <div>
         <section id={css.interface}>
            <div>
               <div>
                  <div className={css.container}>
                     <div className={css.section}>
                        <h2>Item Settings</h2>

                        <div class={css.tab}>
                           <div class={css.checkboxContainer}>
                              <input
                                 type="checkbox"
                                 class="checkbox"
                                 className={css.checkbox}
                              />
                              <label for="checkbox" className={css.label}>
                                 Enable Barcode
                              </label>
                           </div>
                        </div>

                        <div class={css.tab}>
                           <div class={css.checkboxContainer}>
                              <label
                                 for="checkbox"
                                 style={{ fontSize: "1.25rem" }}
                              >
                                 What do You Sell?
                              </label>
                              <select>
                                 <option value="">Product/Service</option>
                                 <option value="Service">Service</option>
                                 <option value="Product">Product</option>
                              </select>
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
                                 Barcode Scan
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
                                 Stock Maintenance
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
                                 Manufacturing
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
                                 Show Low Stock Dialog
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
                                 Items Unit
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
                                 Default Unit
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
                                 Item Category
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
                                 Party Wise Item Rate
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
                                 Description
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
                                 Item wise Tax
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
                                 Item wise Discount
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
                                 Update Sale Price from Transaction
                              </label>
                           </div>
                        </div>
                        <div class={css.tab}>
                           <div class={css.checkboxContainer}>
                              <label for="checkbox" className={css.label}>
                                 Quantity
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
                                 Wholesale Price
                              </label>
                           </div>
                        </div>
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
