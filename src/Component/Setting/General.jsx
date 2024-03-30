import css from "./Setting.module.css";
import {
  updateCheckbox,
  updateSelectSetting,
} from "../../Redux/setting/action";

import { useDispatch, useSelector } from "react-redux";

const General = () => {
  const page = "general";
  const dispatch = useDispatch();
  const store = useSelector((state) => state.SettingReducer);

  // Application
  const handleApplication = (name) => {
    dispatch(
      updateCheckbox(
        page,
        "application",
        name,
        !store?.[page]?.application[name]
      )
    );
  };
  // Backup & History
  const handleBackupAndHistory = (name) => {
    dispatch(
      updateCheckbox(
        page,
        "backupAndHistory",
        name,
        !store?.[page]?.backupAndHistory[name]
      )
    );
  };
  // More Transactions
  const handleMoreTransactions = (name) => {
    dispatch(
      updateCheckbox(
        page,
        "moreTransactions",
        name,
        !store?.[page]?.moreTransactions[name]
      )
    );
  };

  return (
    <div className={css.SectionOuter}>
      {/* Application */}
      <div className={css.itemOuter}>
        <h2>Application</h2>
        {store?.[page]?.application &&
          Object.entries(store?.[page]?.application).map(
            ([name, checked], ind) => (
              <div key={name + ind} className={css.inpContDivOuter}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleApplication(name)}
                />
                <label className={css.simpleTextLabel}>{name}</label>
              </div>
            )
          )}
      </div>
      {/* Backup & History */}
      <div className={css.itemOuter}>
        <h2>Backup & History</h2>
        {store?.[page]?.backupAndHistory &&
          Object.entries(store?.[page]?.backupAndHistory).map(
            ([name, checked], ind) => (
              <div key={name + ind} className={css.inpContDivOuter}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleBackupAndHistory(name)}
                />
                <label className={css.simpleTextLabel}>{name}</label>
              </div>
            )
          )}
      </div>
      {/* More Transactions */}
      <div className={css.itemOuter}>
        <h2>More Transactions</h2>
        {store?.[page]?.moreTransactions &&
          Object.entries(store?.[page]?.moreTransactions).map(
            ([name, checked], ind) => (
              <div key={name + ind} className={css.inpContDivOuter}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleMoreTransactions(name)}
                />
                <label className={css.simpleTextLabel}>{name}</label>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default General;
