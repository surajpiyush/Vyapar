import React, { useEffect, useState } from "react";
import "../../styles/Items.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addItem } from "../../Redux/items/actions";
import { useToast } from "@chakra-ui/react";

export default function ItemsForm({ closeForm }) {
  const toast = useToast();
  const [optToggle, setOptToggle] = useState(true);
  const [productOptToggle, setProductOptToggle] = useState(true);
  const [wsToggle, setWsToggle] = useState(false);
  // -----------------------------------------------------INTERGRATION IN POSTING A NEW ITEM----------------------------------------
  const dispatch = useDispatch();
  const items = useSelector((store) => store.ItemReducer.items);
  const itemIsLoading = useSelector((store) => store.ItemReducer.isLoading);
  const [formData, setFormData] = useState({
    itemName: "",
    category: "65d080c09b0c34b0924bd909",
    itemHsn: 456789,
    description: "This is a sample item",
    itemCode: 789,
    seleteUnit: [{ baseUnit: "Piece", secondaryUnit: "Box" }],
    batchTracking: "Yes",
    serialTracking: "No",
    stockQuantity: 10,
    mrp: [{ mrp: 150, disOnMrpForSale: "5%", disOnMrpForWholesale: "10%" }],
    salePrice: [
      {
        salePriceWithTax: 120,
        salePriceWithoutTax: 100,
        disOnSalePriceAmount: 5,
        disOnSalePricePerceantage: "5%",
      },
    ],
    wholesalePrice: [
      {
        wholesalePriceWithoutTax: 90,
        wholesalePriceWithTax: 100,
        minimumWholesaleQty: 10,
      },
    ],
    purchasePrice: [{ purchasePriceWithTax: 80, purchasePriceWithoutTax: 70 }],
    taxRate: "18%",
    stock: [
      {
        openingQuantity: 50,
        atPrice: 75,
        asOfDate: "2024-01-27",
        minStockToMaintain: 20,
        location: "Warehouse A",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0],
    });
  };

  const handleSave = () => {
    dispatch(addItem(formData, closeForm, toast));
  };

  // ---------------<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>---------------
  const handleCloseForm = () => {
    // console.log("Working");
    closeForm(false);
  };

  return (
    <div>
      <div
        className="item-form"
        style={{ height: "70vh", overflow: "auto", zIndex: 2000 }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
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
              </span>
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
            <i className="fa fa-close" onClick={handleCloseForm}></i>
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
                className="inp-field"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                placeholder="Item Name"
              />

              <input
                type="number"
                name="itemHsn"
                className="inp-field"
                value={formData.itemHsn}
                onChange={handleChange}
                placeholder="Item HSN"
              />
              <button type="button" className="select-unit-btn">
                Select Unit
              </button>
            </div>
            <div
              className="d-flex input-cont"
              style={{ marginTop: "20px", padding: "0px 20px" }}
            >
              {/* <select
                        name="category"
                        id="category"
                        className="inp-field"
                        style={{ width: "225px" }}
                        value={formData.category}
                        // onChange={handleChange}
                     >
                        <option value="">Category</option>
                        <option value="shoes">Shoes</option>
                        <option value="shirt">Shirt</option>
                        <option value="jeans">Jeans</option>
                     </select> */}

              <input
                className="inp-field"
                type="text"
                name=""
                placeholder="Please enter the id of category"
              />

              <input
                type="number"
                placeholder="Item Code *"
                className="inp-field"
                value={formData.itemCode}
                onChange={handleChange}
                name="itemCode"
              />
              <input
                type="file"
                placeholder="Add Image Item"
                className="inp-field"
                style={{
                  border: "2px solid orange",
                }}
                onChange={handleFileChange}
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

                <div className="d-between" style={{ marginBottom: "20px" }}>
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
              <button
                type="button"
                onClick={() => {
                  alert(
                    "You can just only save the data!! Product is under development"
                  );
                }}
              >
                Save & New
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSave();
                }}
              >
                {itemIsLoading ? "Saving" : "Save"}
              </button>
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
              <button type="button" className="select-unit-btn">
                Select Unit
              </button>
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
              <button onClick={handleSave} type="button">
                Save & New
              </button>
              <button onClick={handleSave} type="button">
                {itemIsLoading ? "Saving" : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
