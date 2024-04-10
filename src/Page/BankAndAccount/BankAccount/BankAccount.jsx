import css from "../../Parties/Parties.module.css";
import Setting from "../../../Component/Setting/Setting";
import Loader3 from "../../../Component/Loaders/Loader3";
import { FetchAllParties } from "../../../Redux/parties/actions";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BankAccountTable from "./BankAccountTable";
import AddBankAccount from "./AddBankAccount";

export default function BankAccount() {
   const dispatch = useDispatch();
   const isLoading = useSelector((state) => state.PartiesReducer.isLoading);
   const togglePartiesData = useSelector(
      (state) => state.PartiesReducer.togglePartiesData
   );

   const [toggleSetting, setToggleSetting] = useState(false);
   const [partyFormIsOpen, setPartyFormIsOpen] = useState(false);

   // Fetch All Parties
   useEffect(() => {
      FetchAllParties(dispatch);
   }, [togglePartiesData]);

   const dataFromChild = (val) => {
      setPartyFormIsOpen(val);
   };

   return isLoading ? (
      <Loader3 text="Loading Parties" />
   ) : (
      <div>
         {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

         {/* Add Party Form */}
         {partyFormIsOpen && (
            <AddBankAccount
               CloseForm={setPartyFormIsOpen}
               OpenSettings={setToggleSetting}
            />
         )}

         <div className={css.navOuter}>
            <div className={css.navOptions}>BANK</div>
         </div>
         <div className={css.Outer}>
            <BankAccountTable func={dataFromChild} />
         </div>
         {/* <div className={css.Outer}>
            {partiesData.length > 0 ? (
               <BankAccountTable func={dataFromChild} />
            ) : (
               <div>
                  <div>
                     <h2>Banking With Assanly</h2>
                     <p>
                        Add Bank accounts on Assanly and you can effortlessley:
                     </p>
                  </div>
                  <div>
                     <div>
                        <PrintIcon2 />
                        <h3>Print Bank Details on Invoices</h3>
                        <p>
                           Print account details on your invoices and get
                           payments via NEFT/RTGS/IMPS etc.
                        </p>
                     </div>
                     <div>
                        <RemoteDeviceIcon />
                        <h3>Connect Bank Online</h3>
                        <p>
                           Get transactions and balance in real time on Vyapar
                           from your bank.
                        </p>
                     </div>
                     <div>
                        <DocumentIcon />
                        <h3>Receive Online Payments</h3>
                        <p>
                           Print QR code on your invoices or send payment links
                           to your customers.
                        </p>
                     </div>
                  </div>
                  <div>
                    <button>
                        <PlusIcon2 />
                        Add Bank Account
                    </button>

                  </div>
               </div>
            )}
         </div> */}
      </div>
   );
}
