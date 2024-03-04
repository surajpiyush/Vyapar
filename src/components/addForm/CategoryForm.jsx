import React, { useState } from "react";

export default function CategoryForm(Props) {
  const [category, setCategory] = useState("");
  const closeForm = () => {
    console.log("Working");
    Props.func(false);
  };

  return (
    <div>
      <div className="unit-form">
        <div className="d-between">
          <div className="">
            <h3>Add Category</h3>
          </div>
          <div className="">
            <i className="fa fa-close" onClick={closeForm}></i>
          </div>
        </div>
        <hr />
        <div className="" style={{ textAlign: "start" }}>
          <input
            type="text"
            className="inp-field"
            placeholder="Enter Category"
            style={{ width: "93%" }}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="">
          <button
            className="imp-party-btn"
            onClick={() => {
              console.log(category);
              alert("category added");
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
