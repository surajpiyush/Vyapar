import css from "./Setting.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
   updateCheckbox,
   updateSelectSetting,
} from "../../Redux/setting/action";
const TaxAndGst = () => {
   const dispatch = useDispatch();
   const store = useSelector((state) => state.SettingReducer);
   // console.log(store)
   const page = "gst";
   // Application
   const handleToggleTransactionsBox = (name) => {
      dispatch(updateCheckbox(page, "gst", name, !store.gst.gst[name]));
   };

   return (
      <div>
         <section id={css.interface}>
            <div>
               <div>
                  <div className={css.container}>
                     <div className={css.section}>
                        <h2>GST Settings</h2>
                        {Object.entries(store.gst.gst).map(
                           ([name, checked]) => (
                              <div key={name} className={css.tab}>
                                 <div className={css.checkboxContainer}>
                                    <input
                                       type="checkbox"
                                       className={css.checkbox}
                                       checked={checked}
                                       onChange={() =>
                                          handleToggleTransactionsBox(name)
                                       }
                                    />
                                    <label className={css.label}>{name}</label>
                                 </div>
                              </div>
                           )
                        )}
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
