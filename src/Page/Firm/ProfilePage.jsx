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
  const allCompaniesData = useSelector(
    (state) => state.BusinessReducer.allCompaniesData
  );
  const newFetched = useSelector((state) => state.BusinessReducer.newFetched);
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
  const [formDataToSend, setFormDataToSend] = useState(new FormData());

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
    UpdateCompanyProfile(dispatch, newFormDataToSend, toast);
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
          <aside className="edit-firm-middle-aside1">
            <div>
              <label htmlFor="companyLogo">Add Logo</label>
              <input
                type="file"
                name="companyLogo"
                accept="image/*"
                onChange={handleInputChange}
              />
            </div>
          </aside>
        </div>

        <aside className="edit-firm-middle-aside2">
          <div>
            <label htmlFor="#">Business Name</label>
            <input
              value={companyData.companyName}
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
              value={companyData.gstinNumber}
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
              value={companyData.phoneNumber}
              onChange={handleInputChange}
              name="phoneNumber"
              placeholder="mobile number"
            />
          </div>
          <div>
            <label htmlFor="#">Email ID</label>
            <input
              type="text"
              value={companyData.email}
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
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Bihar">Bihar</option>
              </select>
            </div>
            <div>
              <label htmlFor="#">Business Description</label>
              <input
                type="text"
                value={companyData.businessDescription}
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
                value={companyData.businessType}
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
                value={companyData.businessCategory}
                onChange={handleInputChange}
                name="businessCategory"
                placeholder="Business Category"
              />
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
          </aside>
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
