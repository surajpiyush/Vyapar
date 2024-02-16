import "./Editframe.css";
import { USER_DETAILS } from "../../Redux/business/actionTypes";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { UpdateCompanyProfile } from "../../Redux/business/action";

const Editframe = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.BusinessReducer.isLoading);
  const toggleUpdate = useSelector(
    (state) => state.BusinessReducer.toggleUpdate
  );
  const [userdata, setUserData] = useState({
    companyName: "",
    email: "",
    phoneNumber: "",
    state: "",
    businessAddress: "",
    businessCategory: "",
    businessType: "",
    businessDescription: "",
    gstinNumber: "",
    signature: "",
    companyLogo: "",
  });

  useEffect(() => {
    const userDetailLS = JSON.parse(localStorage.getItem(USER_DETAILS));
    setUserData((prev) => {
      return { ...prev, ...userDetailLS };
    });
  }, [toggleUpdate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSava = () => {
    console.log(userdata);
    UpdateCompanyProfile(dispatch, userdata);
  };

  return (
    <div className="edit-firm-container">
      <section className="edit-firm-top-section">
        <asside className="edit-firm-top-aside1">
          <h4>Edit Firm</h4>
          <div></div>
          <button>Gold Licence</button>
        </asside>
        <asside className="edit-firm-top-aside2">
          <RxCross2 />
        </asside>
      </section>
      <section className="edit-firm-middle-section">
        <aside className="edit-firm-middle-aside1">
          <div>
            Add <br /> Logo
          </div>
        </aside>
        <aside className="edit-firm-middle-aside2">
          <div>
            <label htmlFor="#">Business Name</label>
            <input
              value={userdata?.companyName}
              onChange={handleInputChange}
              name="companyName"
              type="text"
              placeholder="Company name"
            />
          </div>
          <div>
            <label htmlFor="#">GSTIN</label>
            <input
              type="text"
              value={userdata?.gstinNumber}
              onChange={handleInputChange}
              name="gstinNumber"
              placeholder="GSTIN"
            />
            <p>Get GST registration at execlusive prices</p>
          </div>
          <div>
            <label htmlFor="#">Phone No.</label>
            <input
              type="number"
              value={userdata?.phoneNumber}
              onChange={handleInputChange}
              name="phoneNumber"
              placeholder="mobile number"
            />
          </div>
          <div>
            <label htmlFor="#">Email ID</label>
            <input
              type="text"
              value={userdata?.email}
              onChange={handleInputChange}
              name="email"
              placeholder="Eamil ID"
            />
          </div>
        </aside>
      </section>
      <section className="edit-firm-footer">
        <h4>Business details</h4>
        <div className="edit-firm-border"></div>
        <section className="edit-firm-footer-section">
          <aside className="edit-firm-footer-aside1">
            <div>
              <label htmlFor="#">Business Address</label>
              <textarea
                type="text"
                name="businessname"
                placeholder="Company name"
              />
            </div>
            <div>
              <label htmlFor="#">pincode</label>
              <input
                type="text"
                value={userdata?.pinCode}
                onChange={handleInputChange}
                name="pinCode"
                placeholder="Pincode"
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <select
                value={userdata?.state}
                onChange={handleInputChange}
                name="state"
              >
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Bihar">Bihar</option>
              </select>
            </div>
            <div>
              <label htmlFor="#">Business Description</label>
              <input
                type="text"
                value={userdata?.businessDescription}
                onChange={handleInputChange}
                name="businessDescription"
                placeholder="Business Description"
              />
            </div>
          </aside>
          <aside className="edit-firm-footer-aside2">
            <div>
              <label htmlFor="#">Business Type</label>
              <select
                value={userdata?.businessType}
                onChange={handleInputChange}
                name="businessType"
              >
                <option value="Option A">Option A</option>
                <option value="Option B">Option B</option>
              </select>
            </div>
            <div>
              <label htmlFor="#">Business Category</label>
              <input
                type="text"
                value={userdata?.businessCategory}
                onChange={handleInputChange}
                name="businessCategory"
                placeholder="Business Category"
              />
            </div>
            <div className="add-signatures">
              <p>
                Add <br /> Signature
              </p>
            </div>
          </aside>
        </section>
      </section>
      <div className="edit-firm-save-button">
        <button className="" onClick={handleSava}>
          {isLoading ? "Saving" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Editframe;
