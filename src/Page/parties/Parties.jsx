import "../../styles/parties.css";
import party from "../../assets/Images/party.jpg";
import PartiesTable from "../../components/TableData/PartiesTable";
import GroupTable from "../../components/TableData/GroupTable";
import { FetchAllParties, SaveParty } from "../../Redux/parties/actions";
import { USER_DETAILS } from "../../Redux/business/actionTypes";
import { SAVE_PARTY_INPUT_CHANGE } from "../../Redux/parties/actionTypes";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Parties() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.PartiesReducer.isLoading);
  const postPartyLoading = useSelector(
    (state) => state.PartiesReducer.postPartyLoading
  );
  const togglePartiesData = useSelector(
    (state) => state.PartiesReducer.togglePartiesData
  );
  const partiesData = useSelector((state) => state.PartiesReducer.partiesData);
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
  const partyGroup = useSelector((state) => state.PartiesReducer.partyGroup);

  const [partyFormIsOpen, setPartyFormIsOpen] = useState(false);
  const [firstSec, setFirstSec] = useState(true);
  const [secondSec, setSecondSec] = useState(false);
  const [thirdSec, setThirdSec] = useState(false);
  const [opt, setOpt] = useState(true);
  const [shipAddToggle, setShipAddToggle] = useState(true);
  const [limitToggle, setLimitToggle] = useState("");

  // Handle Save Function
  const handleSave = (e) => {
    e.preventDefault();
    if (!postPartyLoading) {
      let savePartyData = {
        partyName,
        gstNo,
        partyGroup,
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
      // console.log("savePartyData", savePartyData);
      SaveParty(dispatch, savePartyData, setPartyFormIsOpen);
    }
  };

  // Input Change Function
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: SAVE_PARTY_INPUT_CHANGE, payload: value, name });
  };

  useEffect(() => {
    FetchAllParties(dispatch);
  }, [togglePartiesData, opt]);

  const toggleShippingAddress = () => {
    setShipAddToggle(!shipAddToggle);
  };

  const dataFromChild = (val) => {
    setPartyFormIsOpen(val);
  };

  const openSection = (val) => {
    if (val === 0) {
      setFirstSec(true);
      setSecondSec(false);
      setThirdSec(false);
    } else if (val === 1) {
      setFirstSec(false);
      setSecondSec(true);
      setThirdSec(false);
    } else {
      setFirstSec(false);
      setSecondSec(false);
      setThirdSec(true);
    }
  };

  return (
    <div>
      <div className="nav">
        <div
          className="nav-opt"
          style={{
            borderBottom: !opt
              ? "4px solid var(--greyA)"
              : "4px solid var(--blueB)",
          }}
          onClick={() => {
            setOpt(true);
          }}
        >
          Name
        </div>
        {/* <div
          style={{
            borderBottom: !opt
              ? "4px solid var(--blueB)"
              : "4px solid var(--greyA)",
          }}
          className="nav-opt"
          onClick={() => {
            setOpt(false);
          }}
        >
          Group
        </div> */}
      </div>

      {/* Party Form */}
      {partyFormIsOpen && (
        <div
          className="partyFormOuterParent"
          onClick={(e) => {
            e.stopPropagation();
            setPartyFormIsOpen((prev) => !prev);
          }}
        >
          <form
            onSubmit={handleSave}
            onClick={(e) => e.stopPropagation()}
            className="partyFormOuter"
          >
            <div className="party-form">
              <div className="d-between">
                <div className="">
                  <h3>Add Party</h3>
                </div>
                <div className="icon-cont">
                  <i className="fa fa-cog"></i>
                  <i
                    className="fa fa-close"
                    onClick={() => setPartyFormIsOpen((prev) => !prev)}
                  ></i>
                </div>
              </div>
              <div className="">
                <div
                  className="d-between"
                  style={{ marginTop: "20px", padding: "0px 20px" }}
                >
                  <input
                    type="text"
                    placeholder="Party Name *"
                    className="inp-field"
                    value={partyName}
                    name="partyName"
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="GSTIN *"
                    className="inp-field"
                    value={gstNo}
                    name="gstNo"
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="number"
                    // max={10}
                    maxLength={10}
                    placeholder="Phone Number *"
                    className="inp-field"
                    value={phoneNumber}
                    name="phoneNumber"
                    onChange={handleInputChange}
                    required
                  />
                  <select
                    placeholder="Party Group"
                    value={partyGroup}
                    name="partyGroup"
                    onChange={handleInputChange}
                    className="inp-field"
                    required
                  >
                    <option value="Party Group">Party Group</option>
                    <option value="+AddNewGroup">+ Add New Group</option>
                  </select>
                </div>
                <div className="d-flex" style={{ marginTop: "16px" }}>
                  <div
                    className=""
                    style={{
                      width: "200px",
                      borderBottom: "3px solid blue",
                      paddingBottom: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      openSection(0);
                    }}
                  >
                    GST & Address
                  </div>
                  <div
                    className=""
                    style={{
                      width: "200px",
                      borderBottom: "3px solid blue",
                      paddingBottom: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      openSection(1);
                    }}
                  >
                    Balance & Credit
                  </div>
                  <div
                    className=""
                    style={{
                      width: "200px",
                      borderBottom: "3px solid blue",
                      paddingBottom: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      openSection(2);
                    }}
                  >
                    Additional Field
                  </div>
                </div>
                {firstSec && (
                  <div className="d-between">
                    <div
                      className=""
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <select
                        id=""
                        className="inp-field"
                        style={{ width: "225px" }}
                        value={GSTType}
                        name="GSTType"
                        onChange={handleInputChange}
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
                        id=""
                        className="inp-field"
                        style={{ width: "225px" }}
                        value={state}
                        name="state"
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
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
                        type="text"
                        placeholder="Email"
                        className="inp-field"
                        value={email}
                        name="email"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <hr />
                    <div className="d-between">
                      <div
                        className=""
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <textarea
                          id=""
                          cols="20"
                          rows="6"
                          className="inp-field"
                          placeholder="Billing Address"
                          value={billingAddress}
                          name="billingAddress"
                          onChange={handleInputChange}
                          required
                        ></textarea>
                        <span
                          onClick={toggleShippingAddress}
                          style={{ cursor: "pointer" }}
                        >
                          {shipAddToggle
                            ? "- Disable Shipping Address"
                            : "- Enable Shipping Address"}
                        </span>
                      </div>
                      {shipAddToggle && (
                        <textarea
                          id=""
                          cols="30"
                          rows="6"
                          className="inp-field"
                          placeholder="Shipping Address"
                          style={{
                            position: "relative",
                            top: "-10px",
                            marginLeft: "20px",
                          }}
                          value={shippingAddress}
                          name="shippingAddress"
                          onChange={handleInputChange}
                          required
                        ></textarea>
                      )}
                    </div>
                  </div>
                )}
                {secondSec && (
                  <div className="" style={{ marginTop: "15px" }}>
                    <div
                      className=""
                      style={{ display: "flex", justifyContent: "start" }}
                    >
                      <input
                        type="text"
                        placeholder="Opening Balance *"
                        className="inp-field"
                        value={openingBalance}
                        name="openingBalance"
                        onChange={handleInputChange}
                        required
                      />
                      <div id="AsOFDateCss">
                        <p>As of Date</p>
                        <input
                          type="date"
                          placeholder="As of date *"
                          className="inp-field"
                          style={{ marginLeft: "20px" }}
                          value={asOfDate}
                          name="asOfDate"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <hr />
                    <div
                      className=""
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      <div className="">
                        <span style={{ fontSize: "16px", fontWeight: "600" }}>
                          Credit Limit
                        </span>
                      </div>
                      <div className="" style={{ marginTop: "10px" }}>
                        <div>
                          <label htmlFor="No Limit">
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
                          <label htmlFor="Custom Limit">
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
                            placeholder="creditLimit"
                            className="inp-field"
                            style={{ marginLeft: "20px" }}
                            value={creditLimit}
                            name="creditLimit"
                            onChange={handleInputChange}
                            required
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {thirdSec && (
                  <div
                    className=""
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                      marginTop: "10px",
                    }}
                  >
                    <div className="">
                      <input
                        type="checkbox"
                        name=""
                        id=""
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
                        className="inp-field"
                      />
                      <input
                        type="text"
                        placeholder="Value For"
                        className="inp-field"
                        style={{ marginLeft: "10px" }}
                      />
                    </div>
                    <div className="">
                      <input
                        type="checkbox"
                        name=""
                        id=""
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
                        className="inp-field"
                      />
                      <input
                        type="text"
                        placeholder="Value For"
                        className="inp-field"
                        style={{ marginLeft: "10px" }}
                      />
                    </div>
                    <div className="">
                      <input
                        type="checkbox"
                        name=""
                        id=""
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
                        className="inp-field"
                      />
                      <input
                        type="text"
                        placeholder="Value For"
                        className="inp-field"
                        style={{ marginLeft: "10px" }}
                      />
                    </div>
                  </div>
                )}
                <hr />
                <div className="save-btn-cont">
                  <button
                    style={{ cursor: "pointer" }}
                    type="submit"
                    disabled={postPartyLoading}
                  >
                    Save & New
                  </button>
                  <button
                    style={{ cursor: "pointer" }}
                    type="submit"
                    disabled={postPartyLoading}
                  >
                    {postPartyLoading ? "Saving" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="loaderOuter">
          <span className="loader"></span>
        </div>
      ) : (
        <div>
          {/*  */}
          <div className="">
            {opt ? (
              partiesData.length != 0 && (
                <div className="" style={{ width: "100%" }}>
                  <PartiesTable func={dataFromChild} />
                </div>
              )
            ) : (
              <div className="" style={{ width: "100%" }}>
                <GroupTable func={dataFromChild} />
              </div>
            )}
          </div>
        </div>
      )}

      {!isLoading && partiesData.length == 0 && (
        <div className="emptyData">
          <div>
            <div className="emptyDataImgDiv">
              <img src={party} alt="" />
            </div>
            <p>
              Add your customers & suppliers. Manage your business with them.
            </p>
            <button onClick={() => setPartyFormIsOpen((prev) => !prev)}>
              Add Party
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
