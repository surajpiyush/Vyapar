import css from "./EditFirm.module.css";
import { CloseIcon } from "../../assets/Icons/ReactIcons";
import { USER_DETAILS } from "../../Redux/store";
import { UpdateCompanyProfile } from "../../Redux/business/action";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditFirm = ({ setShowEditFirm }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.BusinessReducer.isLoading);
  const toggleUpdate = useSelector(
    (state) => state.BusinessReducer.toggleUpdate
  );
  const [companyData, setCompanyData] = useState({
    companyLogo: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    gstinNumber: "",
    businessAddress: "",
    pinCode: "",
    state: "",
    businessDescription: "",
    businessType: "None",
    businessCategory: "",
    signature: "",
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
  const handleSave = (e) => {
    e.preventDefault();
    const newFormDataToSend = new FormData();
    Object.entries(companyData).forEach(([key, value]) => {
      newFormDataToSend.append(key, value);
    });
    //console.log("Update Form Data", companyData);
    UpdateCompanyProfile(dispatch, companyData, setShowEditFirm);
  };

  return (
    <div onClick={() => setShowEditFirm(false)} className={css.Overlay}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSave}
        className={css.OuterEditProfile}
      >
        {/* Top Nav */}
        <div className={css.topNavDiv}>
          <h2>Edit Firm</h2>
          <CloseIcon onClick={() => setShowEditFirm(false)} />
        </div>

        {/* Middle */}
        <div className={css.actualFormContDiv}>
          {/* Top Inputs */}
          <div className={css.TopSectionInputOuter}>
            <div className={css.leftSideTopDivOuter}>
              {companyData?.companyLogo && (
                <div className={css.FirmLogoOuterDiv}>
                  <img src={companyData?.companyLogo} alt="Logo Selected ✔️" />
                </div>
              )}
              <div className={css.imgUploadDiv}>
                <h2>{companyData?.companyLogo ? "Update" : "Add"}</h2>
                <h2>Logo</h2>
                <input
                  type="file"
                  name="companyLogo"
                  accept="image/*"
                  onChange={handleInputChange}
                  style={{ display: companyData?.companyLogo && "block" }}
                />
              </div>
            </div>
            <div className={css.rightSideTopDivOuter}>
              {/* Business Name */}
              <div className={css.inputDiv}>
                <input
                  type="text"
                  name="companyName"
                  value={companyData?.companyName}
                  onChange={handleInputChange}
                  className={css.input}
                  required
                />
                <label
                  className={
                    companyData?.companyName
                      ? css.activeLabel
                      : css.inactiveLabel
                  }
                >
                  Business Name *
                </label>
              </div>
              {/* Phone No */}
              <div className={css.inputDiv}>
                <input
                  type="number"
                  name="phoneNumber"
                  value={companyData?.phoneNumber}
                  onChange={handleInputChange}
                  className={css.input}
                />
                <label
                  className={
                    companyData?.phoneNumber
                      ? css.activeLabel
                      : css.inactiveLabel
                  }
                >
                  Phone No.
                </label>
              </div>
              {/* Email ID */}
              <div className={css.inputDiv}>
                <input
                  type="email"
                  name="email"
                  value={companyData?.email}
                  onChange={handleInputChange}
                  className={css.input}
                />
                <label
                  className={
                    companyData?.email ? css.activeLabel : css.inactiveLabel
                  }
                >
                  Email ID
                </label>
              </div>
              {/* GSTIN */}
              <div className={css.inputDiv}>
                <input
                  type="text"
                  name="gstinNumber"
                  value={companyData?.gstinNumber}
                  onChange={handleInputChange}
                  className={css.input}
                />
                <label
                  className={
                    companyData?.gstinNumber
                      ? css.activeLabel
                      : css.inactiveLabel
                  }
                >
                  GSTIN
                </label>
              </div>
            </div>
          </div>

          {/* Middle Divider*/}
          <div className={css.MiddleDividerOuterDiv}>
            <h4>Business Details</h4>
          </div>

          {/* Bottom Inputs */}
          <div className={css.bottomInputContsOuter}>
            <div className={css.leftSideBottomDiv}>
              {/* Business Address */}
              <div className={css.inputDiv}>
                <textarea
                  name="businessAddress"
                  value={companyData?.businessAddress}
                  onChange={handleInputChange}
                  className={css.input}
                />
                <label
                  className={
                    companyData?.businessAddress
                      ? css.activeLabel
                      : css.inactiveLabel
                  }
                >
                  Business Address
                </label>
              </div>
              {/* Pincode */}
              <div className={css.inputDiv}>
                <input
                  type="number"
                  name="pinCode"
                  value={companyData?.pinCode}
                  onChange={handleInputChange}
                  className={css.input}
                />
                <label
                  className={
                    companyData?.pinCode ? css.activeLabel : css.inactiveLabel
                  }
                >
                  Pincode
                </label>
              </div>
              {/* State */}
              <div className={css.inputDiv}>
                <select
                  name="state"
                  value={companyData?.state}
                  onChange={handleInputChange}
                  className={css.input}
                >
                  <option value="">Select State</option>
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
                <label
                  className={
                    companyData?.state ? css.activeLabel : css.inactiveLabel
                  }
                >
                  State
                </label>
              </div>
              {/* Business Description */}
              <div className={css.inputDiv}>
                <input
                  type="text"
                  name="businessDescription"
                  value={companyData?.businessDescription}
                  onChange={handleInputChange}
                  className={css.input}
                />
                <label
                  className={
                    companyData?.businessDescription
                      ? css.activeLabel
                      : css.inactiveLabel
                  }
                >
                  Business Description
                </label>
                <h3 className={css.belowInpTextCss}>
                  {`${companyData?.businessDescription.length}`}/160
                </h3>
              </div>
            </div>
            <div className={css.rightSideBottomDiv}>
              {/* Business Type */}
              <div className={css.inputDiv}>
                <select
                  name="businessType"
                  value={companyData?.businessType}
                  onChange={handleInputChange}
                  className={css.input}
                >
                  <option value="None">None</option>
                  <option value="Retail">Retail</option>
                  <option value="Wholesale">Wholesale</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Service">Service</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Others">Others</option>
                </select>
                <label className={css.activeLabel}>Business Type</label>
              </div>
              {/* Business Category */}
              <div className={css.inputDiv}>
                <input
                  type="text"
                  name="businessCategory"
                  value={companyData?.businessCategory}
                  onChange={handleInputChange}
                  list="businessCateList"
                  className={css.input}
                />
                <label
                  className={
                    companyData?.businessCategory
                      ? css.activeLabel
                      : css.inactiveLabel
                  }
                >
                  Business Category
                </label>
                <datalist id="businessCateList">
                  <option value="Accounting & CA">Accounting & CA</option>
                  <option value="Interior Designer">Interior Designer</option>
                  <option value="Automobiles/ Auto parts">
                    Automobiles/ Auto parts
                  </option>
                  <option value="Salon & Spa">Salon & Spa</option>
                  <option value="Liquor Store">Liquor Store</option>

                  <option value="Book/Stationay store">
                    Book/Stationay store
                  </option>
                  <option value="Construction Materials & Equipment">
                    Construction Materials & Equipment
                  </option>
                  <option value="Repairing/ Plumbing/ Electrician">
                    Repairing/ Plumbing/ Electrician
                  </option>
                  <option value="Chemicals & Fertilizers">
                    Chemicals & Fertilizers
                  </option>
                  <option value="Computer Equipment & Software">
                    Computer Equipment & Software
                  </option>
                  <option value="Electrical & Electronics Equipments">
                    Electrical & Electronics Equipments
                  </option>
                  <option value="Fashion Accessory/ Cosmetics">
                    Fashion Accessory/ Cosmetics
                  </option>
                  <option value="Tailoring/ Boutique">
                    Tailoring/ Boutique
                  </option>
                  <option value="Fruit And Vegetable">
                    Fruit And Vegetable
                  </option>
                  <option value="Kirana/ General Merchant">
                    Kirana/ General Merchant
                  </option>
                  <option value="FMCG Products">FMCG Products</option>
                  <option value="Dairy Farm Products/ Poultry">
                    Dairy Farm Products/ Poultry
                  </option>
                  <option value="Furniture">Furniture</option>
                </datalist>
              </div>
              {/* Signature */}
              <div className={css.signatureContOuterDiv}>
                {companyData?.signature && (
                  <h6 className={css.signDiv}>
                    <img
                      src={companyData?.signature}
                      alt="Signature Selected ✔️"
                    />
                  </h6>
                )}
                <section className={css.signUploadDiv}>
                  <h2>{companyData?.signature ? "Update" : "Add"}</h2>
                  <h2>Signature</h2>
                  <input
                    type="file"
                    accept="image/*"
                    name="signature"
                    onChange={handleInputChange}
                    style={{ display: companyData?.signature && "block" }}
                  />
                </section>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={css.footerDivOuter}>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFirm;
