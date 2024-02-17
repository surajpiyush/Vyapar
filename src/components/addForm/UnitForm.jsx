import React, { useState } from "react";

export default function UnitForm(Props) {
  const [data, setData] = useState({
    unitShortName: "",
    unitFullName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const closeForm = () => {
    console.log("Working");
    Props.func(false);
  };

  return (
    <div>
      <div className="unit-form">
        <div className="d-between">
          <div className="">
            <h3>Add Unit</h3>
          </div>
          <div className="" onClick={() => {}}>
            <i className="fa fa-close" onClick={closeForm}></i>
          </div>
        </div>
        <hr />
        <div className="" style={{ textAlign: "start" }}>
          <input
            type="text"
            className="inp-field"
            placeholder="Unit Name"
            style={{ width: "93%" }}
            name="unitFullName"
            onChange={handleChange}
          />
          <input
            type="text"
            className="inp-field"
            placeholder="Short Name"
            style={{ width: "93%" }}
            name="unitShortName"
            onChange={handleChange}
          />
        </div>
        <div className="">
          <button className="imp-party-btn">Save & New</button>
          <button
            className="imp-party-btn"
            onClick={() => {
              console.log(data);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
