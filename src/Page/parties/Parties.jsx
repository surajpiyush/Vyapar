import React, { useEffect, useState } from "react";
import "../../styles/parties.css";
import party from "../../assets/Images/party.jpg";
import PartiesTable from "../../components/TableData/PartiesTable";
import GroupTable from "../../components/TableData/GroupTable";
import axios from 'axios';

export default function Parties() {
  const [partyFormToggle, setPartyFormToggle] = useState(false);
  const [firstSec, setFirstSec] = useState(true);
  const [secondSec, setSecondSec] = useState(false);
  const [thirdSec, setThirdSec] = useState(false);
  const [opt, setOpt] = useState(true);
  const [shipAddToggle, setShipAddToggle] = useState(true);
  const [limitToggle, setLimitToggle] = useState("");
  const [getdata, setGetData] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  let url = `https://ca-backend-api.onrender.com/${userId}/party/getAll`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      });
      setGetData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const togglePartyForm = () => {
    setPartyFormToggle(!partyFormToggle);
  };

  const toggleShippingAddress = () => {
    setShipAddToggle(!shipAddToggle);
  };

  const dataFromChild = (val) => {
    setPartyFormToggle(val);
  };

  const data = [1];

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

  const handleOption = (val) => {
    if (val === 0) {
      setOpt(true);
    } else {
      setOpt(false);
    }
  };

  return (
    <div>
      <div className="nav">
        <div
          className="nav-opt"
          onClick={() => {
            handleOption(0);
          }}
        >
          Name
        </div>
        <div
          className="nav-opt"
          onClick={() => {
            handleOption(1);
          }}
        >
          Group
        </div>
      </div>
      {partyFormToggle && (
        <div className="party-form">
          <div className="d-between">
            <div className="">
              <h3>Add Party</h3>
            </div>
            <div className="icon-cont">
              <i className="fa fa-cog"></i>
              <i className="fa fa-close" onClick={togglePartyForm}></i>
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
              />
              <input type="text" placeholder="GSTIN *" className="inp-field" />
              <input
                type="text"
                placeholder="Phone Number *"
                className="inp-field"
              />
              <select
                name=""
                id=""
                className="inp-field"
                style={{ width: "225px" }}
              >
                <option value="">Party Group</option>
                <option value="">+ Add New Group</option>
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
                    name=""
                    id=""
                    className="inp-field"
                    style={{ width: "225px" }}
                  >
                    <option value="">GST Type</option>
                    <option value=""></option>
                  </select>
                  <select
                    name=""
                    id=""
                    className="inp-field"
                    style={{ width: "225px" }}
                  >
                    <option value="">State</option>
                    <option value=""></option>
                  </select>
                  <input
                    type="text"
                    placeholder="Party Name *"
                    className="inp-field"
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
                      name=""
                      id=""
                      cols="20"
                      rows="6"
                      className="inp-field"
                      placeholder="Billing Address"
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
                      name=""
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
                  />
                  <input
                    type="text"
                    placeholder="As of date *"
                    className="inp-field"
                    style={{ marginLeft: "20px" }}
                  />
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
                    <span
                      onClick={() => {
                        setLimitToggle(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      No Limit
                    </span>{" "}
                    /{" "}
                    <span
                      onClick={() => {
                        setLimitToggle(true);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Custom Limit
                    </span>
                    {limitToggle && (
                      <input
                        type="text"
                        placeholder="As of date *"
                        className="inp-field"
                        style={{ marginLeft: "20px" }}
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
              <button>Save & New</button>
              <button>Save</button>
            </div>
          </div>
        </div>
      )}
      <div className="">
        {opt ? (
          <div className="d-cen b-cont">
            {!(data.length > 0) ? (
              <div className="">
                <div className="">
                  <img src={party} alt="" className="party-img" />
                  <p>
                    Add your customers & suppliers. Manage your business with
                    them.
                  </p>
                  <button className="party-button" onClick={togglePartyForm}>
                    Add Your First Party
                  </button>
                </div>
              </div>
            ) : (
              <div className="" style={{width:"100%"}}>
              <PartiesTable func={dataFromChild} data={getdata} />
            </div>
            )}
          </div>
        ) : (
          <div className="" style={{width:"100%"}}>
            <GroupTable func={dataFromChild} data={getdata} />
          </div>
        )}
      </div>
    </div>
  );
}