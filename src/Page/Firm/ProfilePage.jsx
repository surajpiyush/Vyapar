import "./Profile.css";
import Loader1 from "../../Component/Loaders/Loader1";
import { USER_DETAILS } from "../../Redux/business/actionTypes";
import { UpdateCompanyProfile } from "../../Redux/business/action";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";

const ProfilePage = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.BusinessReducer.isLoading);
  const toggleUpdate = useSelector(
    (state) => state.BusinessReducer.toggleUpdate
  );
  const [companyData, setCompanyData] = useState({
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
    _id: "",
  });

  // UseEffect to set current company data on edit company profile mount
  useEffect(() => {
    const userDetailLS = JSON.parse(localStorage.getItem(USER_DETAILS));
    setCompanyData((prev) => {
      return {
        ...prev,
        ...userDetailLS,
      };
    });
  }, [toggleUpdate]);

  // Input Change Function
  const handleInputChange = (e) => {
    const name = e.target.name;
    if (name == "signature" || name == "companyLogo") {
      setCompanyData((prev) => {
        return { ...prev, [name]: e.target.files[0] };
      });
    } else {
      setCompanyData((prev) => {
        return { ...prev, [name]: e.target.value };
      });
    }
  };

  // Send Profile Update Request
  const handleSave = () => {
    const newFormDataToSend = new FormData();
    Object.entries(companyData).forEach(([key, value]) => {
      newFormDataToSend.append(key, value);
    });
    // console.log("Update Form Data", companyData);
    UpdateCompanyProfile(dispatch, companyData, toast);
  };

  return (
    <div className="edit-firm-container">
      {isLoading && (
        <div className="loaderOuter">
          <span className="loader"></span>
        </div>
      )}

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
        <div className="upperFormPart">
          {companyData?.companyLogo && (
            <div className="FirmLogoOuterDiv">
              <img src={companyData?.companyLogo} alt="Logo Uploaded ✔️" />
            </div>
          )}
          <div className="edit-firm-middle-aside1">
            <div>
              <label htmlFor="companyLogo">
                {companyData?.companyLogo ? "Update Logo" : "Add Logo"}
              </label>
              <input
                type="file"
                name="companyLogo"
                accept="image/*"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="edit-firm-middle-aside2">
          <div>
            <label htmlFor="#">
              Business Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              value={companyData?.companyName}
              onChange={handleInputChange}
              name="companyName"
              type="text"
              placeholder="Business name"
            />
          </div>
          <div>
            <label htmlFor="#">GSTIN</label>
            <input
              type="text"
              value={companyData?.gstinNumber}
              onChange={handleInputChange}
              name="gstinNumber"
              placeholder="GSTIN"
            />
            <p>Get GST registration at execlusive prices</p>
          </div>
          <div>
            <label htmlFor="#">
              Phone No. <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="number"
              value={companyData?.phoneNumber}
              onChange={handleInputChange}
              name="phoneNumber"
              placeholder="Phone Number"
            />
          </div>
          <div>
            <label htmlFor="#">
              Email ID <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              value={companyData?.email}
              onChange={handleInputChange}
              name="email"
              placeholder="Enter Email"
            />
          </div>
        </div>
      </section>
      <section className="edit-firm-footer">
        <h4>Business details</h4>
        <div className="edit-firm-border"></div>
        <section className="edit-firm-footer-section">
          <div className="edit-firm-footer-aside1">
            <div>
              <label htmlFor="#">Business Address</label>
              <textarea
                type="text"
                name="businessAddress"
                value={companyData?.businessAddress}
                onChange={handleInputChange}
                placeholder="Business Address"
              />
            </div>
            <div>
              <label htmlFor="#">Pincode</label>
              <input
                type="text"
                value={companyData.pinCode}
                onChange={handleInputChange}
                name="pinCode"
                placeholder="Pincode"
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <select
                value={companyData.state}
                onChange={handleInputChange}
                name="state"
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
            </div>
            <div>
              <label htmlFor="#">Business Description</label>
              <input
                type="text"
                value={companyData?.businessDescription}
                onChange={handleInputChange}
                name="businessDescription"
                placeholder="Business Description"
              />
            </div>
          </div>
          <div className="edit-firm-footer-aside2">
            <div>
              <label htmlFor="#">Business Type</label>
              <select
                value={companyData.businessType}
                onChange={handleInputChange}
                name="businessType"
              >
                <option value="">None</option>
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
                <option value="Distributor">Distributor</option>
                <option value="Service">Service</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label htmlFor="#">Business Category</label>
              <select
                value={companyData.businessCategory}
                onChange={handleInputChange}
                name="businessCategory"
              >
                <option value="Accounting & CA">Accounting & CA</option>
                <option value="Interior Designer">Interior Designer</option>
                <option value="Automobiles/ Auto parts">
                  Automobiles/ Auto parts
                </option>
                <option value="Salon & Spa">Salon & Spa</option>
                <option value="Liquor Store">Liquor Store</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="add-signatures">
              {companyData?.signature && (
                <div className="FirmSignatureOuterDiv">
                  <img
                    src={companyData?.signature}
                    alt="Signature Uploaded ✔️"
                  />
                </div>
              )}
              <label htmlFor="signature">Add Signature</label>
              <input
                type="file"
                accept="image/*"
                name="signature"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>
      </section>
      <div className="edit-firm-save-button">
        <button type="submit" disabled={isLoading} onClick={handleSave}>
          {isLoading ? "Saving" : "Save"}
        </button>
      </div>

      {isLoading && <Loader1 />}
    </div>
  );
};

export default ProfilePage;
