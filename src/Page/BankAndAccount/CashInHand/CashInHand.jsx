import { FilterIcon, PlusIcon2, SearchIcon } from "../../../assets/Icons/ReactIcons";
import css from "../../../pages/sales/salesEstimates/Estimate.module.css";
import React from "react";

export const CashInHand = () => {
   return (
      <div>
         <div className={css.ContentOuter}>
            <div className={css.contentUpperNav}>
               <div className={css.leftSideDivSaleOuter}>
                  <p>TRANSACTIONS</p>
                  <div className={css.saleOrderSearchDiv}>
                     <SearchIcon />
                     <div>
                        <input type="text" />
                     </div>
                  </div>
               </div>
               <div>
                  <button
                     type="button"
                     // onClick={formOpen}
                     className={css.addBtnCss}
                  >
                     <PlusIcon2 /> Adjust Cash
                  </button>
               </div>
            </div>

            <div className={css.contentTableOuterDiv}>
               <table>
                  <thead>
                     <tr>
                        {[
                           "",
                           "TYPE",
                           "NAME",
                           "DATE",
                           "AMOUNT",
                           "",
                          
                        ].map((item, ind) => (
                           <th key={item + ind}>
                              <div>{item}
                              <FilterIcon/>
                              </div>
                           </th>
                        ))}
                     </tr>
                  </thead>

                  <tbody>
                    
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};
