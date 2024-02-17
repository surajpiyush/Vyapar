import React, { useState } from "react";
import Addpurchaseitem from "./Addpurchaseitem";
import "./Addpurchase.css";
import { useDispatch, useSelector } from "react-redux";
import { addPurchaseBill } from "../../../Redux/purchase/action";

const Purchase = () => {
  const store = useSelector((store) => store.PurchaseReducer);
  const dispatch = useDispatch();
  // console.log(store)
  // just taking all dummy values and whenever url is activated then we have to take all data from store and remove the dummy data
  const partyName = store.partyName || "hariom";
  const mobileNumber = store.mobileNumber || 75210256;
  const [data, setData] = useState({
    partyName: "",
    number: mobileNumber,
    billNumber: 0,
    date: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log(data);
    dispatch(addPurchaseBill());
  };

  return (
    <div className="addpurchase-container">
      <section className="addpurchase-section-top">
        <h4>Purchase</h4>
        <section className="addpurchase-section-top-section">
          <aside className="addpurchase-section-top-section-select">
            <select
              name="partyName"
              onChange={(e) => handleChange(e)}
              className="addpurchase-section-select"
            >
              <option value="">Select Item</option>
              {}
              <option value={partyName}>{partyName}</option>
              <option value="sss">#</option>
            </select>
            <input
              type="text"
              name="number"
              placeholder="Phone no."
              value={data.number}
              onChange={handleChange}
            />
          </aside>
          <aside className="addpurchasebill-aside">
            <div className="addpurchasebill-aside-items">
              <p className="addpurchasebill-aside-items-bill">Bill Number</p>
              {/* <p className='addpurchasebill-aside-items-p'></p> */}
              <input
                type="number"
                name="billNumber"
                className="addpurchasebill-aside-items-p"
                onChange={handleChange}
              />
            </div>
            <div className="addpurchasebill-aside-items">
              <p className="addpurchasebill-aside-items-bill">Bill Date:</p>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                className="addpurchasebill-aside-items-bill-date"
              />
            </div>
            <div className="addpurchasebill-aside-items">
              <label htmlFor="#" className="addpurchasebill-aside-items-bill">
                State Of supply
              </label>
              <select
                name="state"
                className="addpurchasebill-aside-items-bill-select"
                onChange={handleChange}
              >
                <option value="#">Items</option>
                <option value="#">Items</option>
              </select>
            </div>
          </aside>
        </section>
      </section>
      <section>
        <Addpurchaseitem />
      </section>
      <section className="addpurchase-footer">
        <div>
          <select name="" id="">
            <option value="">Share</option>
          </select>
        </div>
        <div>
          <button
            onClick={() => {
              handleSave();
            }}
          >
            Save
          </button>
        </div>
      </section>
    </div>
  );
};

export default Purchase;
