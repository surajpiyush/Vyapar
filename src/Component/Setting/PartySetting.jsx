import css from "./Setting.module.css";
import {
  updateCheckbox,
  updateSelectSetting,
} from "../../Redux/setting/action";

import { useDispatch, useSelector } from "react-redux";

const PartySetting = () => {
  const page = "party";
  const dispatch = useDispatch();
  const store = useSelector((state) => state.SettingReducer);

  // Party Settings
  const handlePartySettings = (name) => {
    dispatch(
      updateCheckbox(
        page,
        "partySettings",
        name,
        !store?.[page]?.partySettings[name]
      )
    );
  };
  // Party Settings
  const handleEnableLoyaltyPoint = (name) => {
    dispatch(
      updateCheckbox(
        page,
        "enableLoyaltyPoint",
        name,
        !store?.[page]?.enableLoyaltyPoint[name]
      )
    );
  };

  return (
    <div className={css.SectionOuter}>
      {/* Party Settings */}
      <div className={css.itemOuter}>
        <h2>Party Settings</h2>
        {store?.[page]?.partySettings &&
          Object.entries(store?.[page]?.partySettings).map(
            ([name, checked], ind) => (
              <div key={name + ind} className={css.inpContDivOuter}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handlePartySettings(name)}
                />
                <label className={css.simpleTextLabel}>{name}</label>
              </div>
            )
          )}
      </div>
      {/* Party Settings */}
      <div className={css.itemOuter}>
        <h2>Party Settings</h2>
        {store?.[page]?.enableLoyaltyPoint &&
          Object.entries(store?.[page]?.enableLoyaltyPoint).map(
            ([name, checked], ind) => (
              <div key={name + ind} className={css.inpContDivOuter}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleEnableLoyaltyPoint(name)}
                />
                <label className={css.simpleTextLabel}>{name}</label>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default PartySetting;
