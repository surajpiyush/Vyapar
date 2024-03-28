import { AddNewUnit } from "../../Redux/items/actions";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

export default function UnitForm(Props) {
  const toast = useToast();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    shortName: "",
    unitName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const closeForm = () => {
    // console.log("Working");
    Props.func(false);
  };

  const handleSave = () => {
    // console.log("Add Unit Data:", data);
    AddNewUnit(dispatch, data, closeForm, toast);
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
            name="unitName"
            onChange={handleChange}
          />
          <input
            type="text"
            className="inp-field"
            placeholder="Short Name"
            style={{ width: "93%" }}
            name="shortName"
            onChange={handleChange}
          />
        </div>
        <div className="">
          <button className="imp-party-btn">Save & New</button>
          <button
            className="imp-party-btn"
            onClick={() => {
              handleSave();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
