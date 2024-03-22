import css from "./AddParties.module.css";
import { useToast } from "@chakra-ui/react";
import { SaveParty } from "../../Redux/parties/actions";
import { SAVE_PARTY_INPUT_CHANGE } from "../../Redux/parties/actionTypes";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 as CrossIcon } from "react-icons/rx";
import { IoSettingsSharp as SettingIcon } from "react-icons/io5";

const AddPartyForm = ({ CloseForm, OpenSettings }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const postPartyLoading = useSelector(
    (state) => state.PartiesReducer.postPartyLoading
  );
  const partyName = useSelector((state) => state.PartiesReducer.partyName);
  const gstNo = useSelector((state) => state.PartiesReducer.gstNo);
  const phoneNumber = useSelector((state) => state.PartiesReducer.phoneNumber);
  const GSTType = useSelector((state) => state.PartiesReducer.GSTType);
  const state = useSelector((state) => state.PartiesReducer.state);
  const billingAddress = useSelector(
    (state) => state.PartiesReducer.billingAddress
  );
  const shippingAddress = useSelector(
    (state) => state.PartiesReducer.shippingAddress
  );
  const openingBalance = useSelector(
    (state) => state.PartiesReducer.openingBalance
  );
  const asOfDate = useSelector((state) => state.PartiesReducer.asOfDate);
  const email = useSelector((state) => state.PartiesReducer.email);
  const creditLimit = useSelector((state) => state.PartiesReducer.creditLimit);

  const [disableShippingAddress, setDisableShippingAddress] = useState(true);
  const [limitToggle, setLimitToggle] = useState("");
  const [formFieldsTabIndex, setFormFieldsTabIndex] = useState(0);

  // Handle Save Function
  const handleSave = (e) => {
    e.preventDefault();
    if (!postPartyLoading) {
      let savePartyData = {
        partyName,
        gstNo,
        //  partyGroup,
        phoneNumber,
        GSTType,
        state,
        email,
        billingAddress,
        shippingAddress,
        openingBalance,
        asOfDate,
        creditLimit,
      };
      //  console.log("savePartyData", savePartyData);
      SaveParty(dispatch, savePartyData, CloseForm, toast);
    }
  };

  // Input Change Function
  const handleInputChange = (event) => {
    let { name, value } = event.target;
    if (name === "asOfDate") {
      const selectedDate = new Date(value);
      const today = new Date();

      if (selectedDate !== today) {
        toast({
          title: "Selected date should not be other than today",
          status: "error",
          position: "top",
        });
        // console.log("Selected date should not be after today");
        value = new Date().toISOString().split("T")[0];
      }
    }
    dispatch({ type: SAVE_PARTY_INPUT_CHANGE, payload: value, name });
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        CloseForm(false);
      }}
      className={css.partyFormOuterParent}
    >
      <form
        onSubmit={handleSave}
        onClick={(e) => e.stopPropagation()}
        className={css.partyFormOuter}
      >
        {/* Form Header */}
        <div className={css.formSectionsDiv}>
          <div>
            <h3>Add Party</h3>
          </div>
          <div className={css.formHeaderIconCont}>
            <SettingIcon onClick={() => OpenSettings(true)} />
            <CrossIcon onClick={() => CloseForm(false)} />
          </div>
        </div>

        <div>
          <div className={css.formSectionsDiv}>
            {/* Party Name */}
            <input
              type="text"
              placeholder="Party Name *"
              value={partyName}
              name="partyName"
              onChange={handleInputChange}
              className={css.InpCss}
              required
            />
            {/* GSTIN */}
            <input
              type="text"
              placeholder="GSTIN"
              className={css.InpCss}
              value={gstNo}
              name="gstNo"
              onChange={handleInputChange}
              required
            />
            {/* Phone Number */}
            <input
              type="number"
              maxLength={10}
              placeholder="Phone Number *"
              value={phoneNumber}
              name="phoneNumber"
              onChange={handleInputChange}
              className={css.InpCss}
              required
            />
          </div>

          {/* Form Option Toggler Div */}
          <div className={css.middleFormOptionsCont}>
            <div
              style={{
                borderBottom:
                  formFieldsTabIndex == 0
                    ? "3px solid var(--blueA)"
                    : "3px solid transparent",
              }}
              onClick={() => {
                setFormFieldsTabIndex(0);
              }}
            >
              GST & Address
            </div>
            <div
              style={{
                borderBottom:
                  formFieldsTabIndex == 1
                    ? "3px solid var(--blueA)"
                    : "3px solid transparent",
              }}
              onClick={() => {
                setFormFieldsTabIndex(1);
              }}
            >
              Balance & Credit
            </div>
            <div
              style={{
                borderBottom:
                  formFieldsTabIndex == 2
                    ? "3px solid var(--blueA)"
                    : "3px solid transparent",
              }}
              onClick={() => {
                setFormFieldsTabIndex(2);
              }}
            >
              Additional Field
            </div>
          </div>

          {/* GST & Address Form Fields */}
          {formFieldsTabIndex == 0 && (
            <div className={css.formSectionsDiv}>
              <div className={css.gstLeftSideInput}>
                <select
                  value={GSTType}
                  name="GSTType"
                  onChange={handleInputChange}
                  className={css.InpCss}
                  required
                >
                  <option value="">GST Type</option>
                  <option value="Unregistered/Consumer">
                    Unregistered/Consumer
                  </option>
                  <option value="Registered Business - Regular">
                    Registered Business - Regular
                  </option>
                  <option value="Registered Business - Composition">
                    Registered Business - Composition
                  </option>
                </select>
                <select
                  value={state}
                  name="state"
                  onChange={handleInputChange}
                  required
                  className={css.InpCss}
                >
                  <option value="">State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli">
                    Dadra and Nagar Haveli
                  </option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Puducherry">Puducherry</option>
                </select>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleInputChange}
                  className={css.InpCss}
                  required
                />
              </div>

              <div className={css.formSectionsDiv}>
                <div className={css.addressHolderDiv}>
                  <textarea
                    name="billingAddress"
                    value={billingAddress}
                    onChange={handleInputChange}
                    placeholder="Billing Address"
                    className={css.InpCss}
                    required
                  />
                  {disableShippingAddress && (
                    <textarea
                      name="shippingAddress"
                      value={shippingAddress}
                      onChange={handleInputChange}
                      placeholder="Shipping Address"
                      className={css.InpCss}
                      required
                    />
                  )}
                  <span
                    onClick={() => setDisableShippingAddress((prev) => !prev)}
                    className={css.DisableShippingAddBtn}
                  >
                    {disableShippingAddress
                      ? "- Disable Shipping Address"
                      : "- Enable Shipping Address"}
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* Balance & Credit Form Fields */}
          {formFieldsTabIndex == 1 && (
            <div style={{ marginTop: "15px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <div id={css.AsOFDateCss}>
                  <p>Opening Balance</p>
                  <input
                    type="text"
                    name="openingBalance"
                    value={openingBalance}
                    onChange={handleInputChange}
                    placeholder="Opening Balance *"
                    className={css.InpCss}
                    required
                  />
                </div>
                <div id={css.AsOFDateCss}>
                  <p>As of Date</p>
                  <input
                    type="date"
                    name="asOfDate"
                    value={new Date().toISOString().split("T")[0]}
                    onChange={handleInputChange}
                    placeholder="As of date *"
                    className={css.InpCss}
                    required
                  />
                </div>
              </div>
              <hr />
              <div className={css.creditLimitOuterDiv}>
                <span>Credit Limit</span>
                <div style={{ marginTop: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <label
                      htmlFor="No Limit"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <input
                        type="radio"
                        name="No Limit"
                        checked={!limitToggle}
                        onChange={() => {
                          setLimitToggle(false);
                        }}
                      />
                      No Limit
                    </label>
                    <label
                      htmlFor="Custom Limit"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <input
                        type="radio"
                        checked={limitToggle}
                        onChange={() => {
                          setLimitToggle(true);
                        }}
                        name="Custom Limit"
                      />
                      Custom Limit
                    </label>
                  </div>
                  {limitToggle && (
                    <input
                      type="number"
                      name="creditLimit"
                      value={creditLimit}
                      onChange={handleInputChange}
                      style={{ marginLeft: "20px" }}
                      className={css.InpCss}
                      placeholder="Credit Limit"
                      required
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Additional Fields Form Fields */}
          {formFieldsTabIndex == 2 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                marginTop: "10px",
              }}
            >
              <div>
                <input
                  type="checkbox"
                  style={{
                    height: "20px",
                    width: "20px",
                    marginRight: "10px",
                    position: "relative",
                    top: "15px",
                  }}
                />
                <input
                  type="text"
                  placeholder="Additional Value"
                  className={css.InpCss}
                />
                <input
                  type="text"
                  placeholder="Value For"
                  className={css.InpCss}
                  style={{ marginLeft: "10px" }}
                />
              </div>
              <div>
                <input
                  type="checkbox"
                  style={{
                    height: "20px",
                    width: "20px",
                    marginRight: "10px",
                    position: "relative",
                    top: "15px",
                  }}
                />
                <input
                  type="text"
                  placeholder="Additional Value"
                  className={css.InpCss}
                />
                <input
                  type="text"
                  placeholder="Value For"
                  className={css.InpCss}
                  style={{ marginLeft: "10px" }}
                />
              </div>
              <div>
                <input
                  type="checkbox"
                  style={{
                    height: "20px",
                    width: "20px",
                    marginRight: "10px",
                    position: "relative",
                    top: "15px",
                  }}
                />
                <input
                  type="text"
                  placeholder="Additional Value"
                  className={css.InpCss}
                />
                <input
                  type="text"
                  placeholder="Value For"
                  className={css.InpCss}
                  style={{ marginLeft: "10px" }}
                />
              </div>
            </div>
          )}
          <hr />
          <div className={css.FooterDivOuter}>
            <button
              type="submit"
              style={{ cursor: postPartyLoading ? "not-allowed" : "pointer" }}
              disabled={postPartyLoading}
            >
              {postPartyLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPartyForm;
