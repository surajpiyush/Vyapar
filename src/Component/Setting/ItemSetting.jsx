import css from "./Setting.module.css";
import {
  updateCheckbox,
  updateSelectSetting,
} from "../../Redux/setting/action";

import { useDispatch, useSelector } from "react-redux";

const ItemSetting = () => {
  const page = "item";
  const dispatch = useDispatch();
  const store = useSelector((state) => state.SettingReducer);

  // Item Settings
  const handleItemSettings = (name) => {
    dispatch(
      updateCheckbox(
        page,
        "itemSettings",
        name,
        !store?.[page]?.itemSettings[name]
      )
    );
  };
  // Additional Item Fields
  const handleAdditionalItemFields = (name) => {
    dispatch(
      updateCheckbox(
        page,
        "additionalItemFiels",
        name,
        !store?.[page]?.additionalItemFiels[name]
      )
    );
  };

  return (
    <div className={css.SectionOuter}>
      {/* Item Settings */}
      <div className={css.itemOuter}>
        <h2>Item Settings</h2>
        {store?.[page]?.itemSettings &&
          Object.entries(store?.[page]?.itemSettings).map(
            ([name, checked], ind) => (
              <div key={name + ind} className={css.inpContDivOuter}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleItemSettings(name)}
                />
                <label className={css.simpleTextLabel}>{name}</label>
              </div>
            )
          )}
      </div>
      {/* Additional Item Fields */}
      <div className={css.itemOuter}>
        <h2>Additional Item Fields</h2>
        {store?.[page]?.additionalItemFiels &&
          Object.entries(store?.[page]?.additionalItemFiels).map(
            ([name, checked], ind) => (
              <div key={name + ind} className={css.inpContDivOuter}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleAdditionalItemFields(name)}
                />
                <label className={css.simpleTextLabel}>{name}</label>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default ItemSetting;
