// actions.js
import { UPDATE_CHECKBOX, UPDATE_SELECT_SETTING } from "./actionTypes";

export const updateCheckbox = (section, name, value) => ({
   type: UPDATE_CHECKBOX,
   payload: { section, name, value },
});

export const updateSelectSetting = (section, key, value) => ({
   type: UPDATE_SELECT_SETTING,
   payload: { section, key, value },
});
