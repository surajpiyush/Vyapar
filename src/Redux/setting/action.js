import { UPDATE_CHECKBOX, UPDATE_SELECT_SETTING } from "./actionTypes";

export const updateCheckbox = (page, section, name, value) => ({
  type: UPDATE_CHECKBOX,
  payload: { page, section, name, value },
});

export const updateSelectSetting = (page, section, key, value) => ({
  type: UPDATE_SELECT_SETTING,
  payload: { page, section, key, value },
});
