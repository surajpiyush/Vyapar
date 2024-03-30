import css from "./Setting.module.css";
import {
  updateCheckbox,
  updateSelectSetting,
} from "../../Redux/setting/action";

import { useDispatch, useSelector } from "react-redux";

const TaxAndGst = () => {
  const page = "taxAndgst";
  const dispatch = useDispatch();
  const store = useSelector((state) => state.SettingReducer);

  // GST Settings
  const handleGstSettings = (name) => {
    dispatch(
      updateCheckbox(
        page,
        "gstSettings",
        name,
        !store?.[page]?.gstSettings[name]
      )
    );
  };

  return (
    <div className={css.SectionOuter}>
      {/* GST Settings */}
      <div className={css.itemOuter}>
        <h2>GST Settings</h2>
        {store?.[page]?.gstSettings &&
          Object.entries(store?.[page]?.gstSettings).map(
            ([name, checked], ind) => (
              <div key={name + ind} className={css.inpContDivOuter}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleGstSettings(name)}
                />
                <label className={css.simpleTextLabel}>{name}</label>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default TaxAndGst;
