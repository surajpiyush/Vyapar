import React, { useState } from "react";
import "../../styles/Items.css";

export default function ItemsForm(Props) {
  const [optToggle, setOptToggle] = useState(true);
  const [productOptToggle, setProductOptToggle] = useState(true);
  const [wsToggle, setWsToggle] = useState(false);

  const closeForm = () => {
    console.log("Working")
    Props.func(false);
  }

  return (
    <div>
      <div className="item-form">
        <div className="d-between ">
          <div className="d-around ">
            <h3>Add Item</h3>
            <div className="" style={{ marginLeft: "20px" }}>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOptToggle(true);
                }}
              >
                Product
              </span>{" "}
              /{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOptToggle(false);
                }}
              >
                Service
              </span>
            </div>
          </div>

          <div className="icon-cont">
            <i className="fa fa-cog"></i>
            <i className="fa fa-close" onClick={closeForm}></i>
          </div>
        </div>
        <hr />
        {optToggle ? (
          <div className="">
            <div
              className="d-flex input-cont"
              style={{ marginTop: "20px", padding: "0px 20px" }}
            >
              <input
                type="text"
                placeholder="Item Name *"
                className="inp-field"
              />

              <input
                type="text"
                placeholder="Item HNS *"
                className="inp-field"
              />
              <button className="select-unit-btn">Select Unit</button>
            </div>
            <div
              className="d-flex input-cont"
              style={{ marginTop: "20px", padding: "0px 20px" }}
            >
              <select
                name=""
                id=""
                className="inp-field"
                style={{ width: "225px" }}
              >
                <option value="">Category</option>
              </select>

              <input
                type="text"
                placeholder="Item Code *"
                className="inp-field"
              />
              <input
                type="file"
                placeholder="Add Image Item"
                className="inp-field"
                style={{
                  border: "2px solid orange",
                }}
              />
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
                  setProductOptToggle(true);
                }}
              >
                Pricing
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
                  setProductOptToggle(false);
                }}
              >
                Stock
              </div>
            </div>
            {productOptToggle ? (
              <div className="">
                <div className="d-between">
                  <div
                    className=""
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "40px",
                    }}
                  >
                    <div className="">
                      <h4 style={{ textAlign: "start" }}>Sales</h4>
                    </div>
                    <div className="d-flex" style={{ gap: "50px" }}>
                      <div className="d-flex">
                        <input
                          type="text"
                          placeholder="Sale Price *"
                          className="item-inp-field"
                        />
                        <select name="" id="" className="item-inp-field">
                          <option value="">With Tax</option>
                          <option value="">Without Tax</option>
                        </select>
                      </div>
                      <div className="d-flex">
                        <input
                          type="text"
                          placeholder="Sale Price *"
                          className="item-inp-field"
                        />
                        <select name="" id="" className="item-inp-field">
                          <option value="">With Tax</option>
                          <option value="">Without Tax</option>
                        </select>
                        <br />
                      </div>
                    </div>
                    <div className="">
                      <div
                        className=""
                        style={{
                          color: "#3ed5ff",
                          fontWeight: "500",
                          textAlign: "start",
                          marginTop: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setWsToggle(!wsToggle);
                        }}
                      >
                        {wsToggle
                          ? "+ Remove Wholesale Price"
                          : "+ Add Wholesale Price"}
                      </div>
                      {wsToggle && (
                        <div className="" style={{ marginTop: "10px" }}>
                          <div className="d-flex" style={{ gap: "10px" }}>
                            <input
                              type="text"
                              placeholder="WholeSale Price *"
                              className="item-inp-field"
                            />
                            <select name="" id="" className="item-inp-field">
                              <option value="">With Tax</option>
                              <option value="">Without Tax</option>
                            </select>
                            <input
                              type="text"
                              placeholder="Minimum Wholesale Quantity"
                              className="item-inp-field"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="d-between" style={{marginBottom : "20px"}}>
                  <div
                    className=""
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "40px",
                    }}
                  >
                    <div className="">
                      <div className="d-flex" style={{ gap: "50px" }}>
                        <div className="">
                          <div className="">
                            <h4 style={{ textAlign: "start" }}>Purchase</h4>
                          </div>
                          <div className="d-flex">
                            <input
                              type="text"
                              placeholder="Sale Price *"
                              className="item-inp-field"
                            />
                            <select name="" id="" className="item-inp-field">
                              <option value="">With Tax</option>
                              <option value="">Without Tax</option>
                            </select>
                          </div>
                        </div>

                        <div className="">
                          <div className="">
                            <h4 style={{ textAlign: "start" }}>Taxes</h4>
                          </div>
                          <div className="d-flex">
                            <input
                              type="text"
                              placeholder="Sale Price *"
                              className="item-inp-field"
                            />
                            <select name="" id="" className="item-inp-field">
                              <option value="">Percentage</option>
                              <option value="">Amount</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               
              </div>
            ) : (
              <div className="">
                <div className="d-between">
                  <div
                    className=""
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "40px",
                    }}
                  >
                    <div className="d-flex" style={{ gap: "50px" }}>
                      <div className="d-flex">
                        <input
                          type="text"
                          placeholder="Opening Quantity *"
                          className="inp-field"
                        />
                      </div>
                      <div className="d-flex">
                        <input
                          type="text"
                          placeholder="At Price *"
                          className="inp-field"
                        />
                      </div>
                      <div className="d-flex">
                        <input
                          type="date"
                          placeholder="As of date *"
                          className="inp-field"
                        />
                      </div>
                    </div>

                    <div className="d-flex" style={{ gap: "50px" }}>
                      <div className="d-flex">
                        <input
                          type="text"
                          placeholder="Min Stock To Maintain *"
                          className="inp-field"
                        />
                      </div>
                      <div className="d-flex">
                        <input
                          type="text"
                          placeholder="Location *"
                          className="inp-field"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
             <hr />
                <div className="save-btn-cont">
                    <button>Save & New</button>
                    <button>Save</button>
                </div>
          </div>
        ) : (
          <div className="">
            <div
              className="d-flex input-cont"
              style={{ marginTop: "20px", padding: "0px 20px" }}
            >
              <input
                type="text"
                placeholder="Service Name *"
                className="inp-field"
              />

              <input
                type="text"
                placeholder="Service HNS *"
                className="inp-field"
              />
              <button className="select-unit-btn">Select Unit</button>
            </div>
            <div
              className="d-flex input-cont"
              style={{ marginTop: "20px", padding: "0px 20px" }}
            >
              <select
                name=""
                id=""
                className="inp-field"
                style={{ width: "225px" }}
              >
                <option value="">Category</option>
              </select>

              <input
                type="text"
                placeholder="Service Code *"
                className="inp-field"
              />
              <input
                type="file"
                placeholder="Add Image Item"
                className="inp-field"
                style={{
                  border: "2px solid orange",
                }}
              />
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
                  setProductOptToggle(true);
                }}
              >
                Pricing
              </div>
            </div>
            <div className="">
              <div className="d-between">
                <div
                  className=""
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "40px",
                  }}
                >
                  <div className="">
                    <h4 style={{ textAlign: "start" }}>Sales Price</h4>
                  </div>
                  <div className="d-flex" style={{ gap: "50px" }}>
                    <div className="d-flex">
                      <input
                        type="text"
                        placeholder="Sale Price *"
                        className="item-inp-field"
                      />
                      <select name="" id="" className="item-inp-field">
                        <option value="">With Tax</option>
                        <option value="">Without Tax</option>
                      </select>
                    </div>
                    <div className="d-flex">
                      <input
                        type="text"
                        placeholder="Sale Price *"
                        className="item-inp-field"
                      />
                      <select name="" id="" className="item-inp-field">
                        <option value="">Percentage</option>
                        <option value="">Amount</option>
                      </select>
                      <br />
                    </div>
                  </div>
                  <div className="">
                    <div
                      className=""
                      style={{
                        color: "#3ed5ff",
                        fontWeight: "500",
                        textAlign: "start",
                        marginTop: "30px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setWsToggle(!wsToggle);
                      }}
                    >
                      {wsToggle
                        ? "+ Remove Wholesale Price"
                        : "+ Add Wholesale Price"}
                    </div>
                    {wsToggle && (
                      <div className="" style={{ marginTop: "10px" }}>
                        <div className="d-flex" style={{ gap: "10px" }}>
                          <input
                            type="text"
                            placeholder="WholeSale Price *"
                            className="item-inp-field"
                          />
                          <select name="" id="" className="item-inp-field">
                            <option value="">With Tax</option>
                            <option value="">Without Tax</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Minimum Wholesale Quantity"
                            className="item-inp-field"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="d-between">
                <div
                  className=""
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "40px",
                  }}
                >
                  <div className="">
                    <div className="d-flex" style={{ gap: "50px" }}>
                      <div className="">
                        <div className="">
                          <h4 style={{ textAlign: "start" }}>Taxes</h4>
                        </div>
                        <div className="d-flex">
                          <select name="" id="" className="item-inp-field">
                            <option value="">None</option>
                            <option value="">IGST</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
                <div className="save-btn-cont">
                    <button>Save & New</button>
                    <button>Save</button>
                </div>
          </div>
        )}
      </div>
      
    </div>
  );
}
