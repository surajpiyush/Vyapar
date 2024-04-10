import css from "../../../Page/Parties/Parties.module.css";

import {
   FilterIcon,
   BasicSpinnerIcon,
   SearchIconBlackBg,
   VerticalDotsIcon,
   DownArrowIcon,
} from "../../../assets/Icons/ReactIcons";

export default function BankAccountTable({ func }) {
   const openForm = () => {
      func(true);
   };

   return (
      <div className={css.ContentOuter}>
         {/* Edit Party Form */}
         {/* {showEditForm && (
            <AddPartyForm
               CloseForm={setShowEditForm}
               usedAsEditForm={true}
               editPartyData={editPartyData}
            />
         )} */}

         {/* Left Side Content */}
         <div className={css.partiesLeftSideDiv}>
            <div className={css.addBtnDivOuter}>
               <SearchIconBlackBg />
               <button className={css.addBtnCss} onClick={openForm}>
                  + Add Bank
               </button>
            </div>

            {/* Left Side Parties Table */}
            <div className={css.leftSideTableCss}>
               <table>
                  <thead>
                     <tr>
                        <th>ACCOUNT NAME</th>
                        <th>AMOUNT</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>dsfjl</td>
                        <td>
                           <span>
                              4512
                              <VerticalDotsIcon />
                           </span>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>

         {/* Right Side Content */}
         <div className={css.RightSideDivOuter}>
            <div className={css.PartyDetailsOuter}>
               <div>
                  <p>Bank Name : {""}</p>
                  <p>Account Number: </p>
                  <p>IFSC Code:</p>
                  <p>UPI ID :</p>
               </div>
               <div>
                  {/* <button>
                     Deposit / withdraw <DownArrowIcon />{" "}
                  </button> */}
                  <p>Balance On Assanly :</p>
               </div>
            </div>
            <div className={css.transactionHeadingContDiv}>
               <h3>Transactions</h3>
            </div>

            <div className={css.rightSideTableCss}>
               <table>
                  <thead>
                     <tr>
                        <th>
                           <div>
                              Type <FilterIcon />
                           </div>
                        </th>
                        <th>
                           <div>
                              Number <FilterIcon />
                           </div>
                        </th>
                        <th>
                           <div>
                              Date <FilterIcon />
                           </div>
                        </th>
                        <th>
                           <div>
                              Total <FilterIcon />
                           </div>
                        </th>
                        <th>
                           <div>
                              Balance <FilterIcon />
                           </div>
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr id={css.noDataCell}>
                        <td colSpan="5">No Transaction Data Available</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}
