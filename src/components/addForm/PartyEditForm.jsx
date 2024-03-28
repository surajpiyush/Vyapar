import css from "../../Page/Firm/EditFirm.module.css";
import { DeleteParty, UpdateParty } from "../../Redux/parties/actions";

import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { ImSpinner3 as SpinnerIcon } from "react-icons/im";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { RiDeleteBinLine as DeleteIcon } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const PartyEditForm = ({ setShowEditFirm, party }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.PartiesReducer.isLoading);
  const loadingEdit = useSelector((state) => state.PartiesReducer.loadingEdit);
  const loadingDeleteParty = useSelector(
    (state) => state.PartiesReducer.loadingDeleteParty
  );
  const [partyData, setPartyData] = useState(party);

  //   Input Change Function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //   Update Party Function
  const handleEdit = () => {
    UpdateParty(dispatch, partyData?._id, partyData, setShowEditFirm, toast);
  };

  //   Delete Party Function
  const handleDelete = () => {
    DeleteParty(dispatch, partyData?._id, setShowEditFirm, toast);
  };

  return (
    <div onClick={() => setShowEditFirm(false)} className={css.Overlay}>
      <div style={{zIndex:1000}}
        onClick={(e) => e.stopPropagation()}
        className={css.OuterEditProfile}
      >
        {/* Top Nav */}
        <div className={css.topNavDiv}>
          <h2>Edit Party</h2>
          <CloseIcon onClick={() => setShowEditFirm(false)} />
        </div>

        {/* FormInputs */}
        <div className={css.actualFormContDiv}>
          <div className={css.TopSectionInputOuter}>
            <div className={css.rightSideTopDivOuter}>
              <div>
                <label htmlFor="#">Party ID</label>
                <input
                  value={partyData?._id}
                  onChange={handleInputChange}
                  readOnly
                  type="text"
                  placeholder="Party ID"
                  style={{
                    backgroundColor: "#f4f4f4",
                    color: "#888",
                    border: "1px solid #ddd",
                    cursor: "not-allowed",
                  }}
                />
              </div>
              <div>
                <label htmlFor="#">
                  Party Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  value={partyData?.partyName}
                  onChange={handleInputChange}
                  name="partyName"
                  type="text"
                  placeholder="Party name"
                />
              </div>
              <div>
                <label htmlFor="#">
                  Opening Balance <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  value={partyData?.openingBalance}
                  onChange={handleInputChange}
                  name="openingBalance"
                  type="Number"
                  placeholder="Opening Balance"
                />
              </div>
              <div>
                <label htmlFor="#">
                  Phone No. <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  value={partyData?.phoneNumber}
                  onChange={handleInputChange}
                  name="phoneNumber"
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <label htmlFor="#">
                  Billing Address <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={partyData?.billingAddress}
                  onChange={handleInputChange}
                  name="billingAddress"
                  placeholder="Enter Billing Address"
                />
              </div>
              <div>
                <label htmlFor="#">GST NO.</label>
                <input
                  type="text"
                  value={partyData?.gstNo}
                  onChange={handleInputChange}
                  name="gstNo"
                  placeholder="GST NO."
                />
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className={css.footerDivOuter}>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loadingDeleteParty}
            id={css.deleteBtn}
          >
            {loadingDeleteParty ? <SpinnerIcon /> : <DeleteIcon />}
          </button>
          <button type="submit" disabled={loadingEdit} onClick={handleEdit}>
            {loadingEdit ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartyEditForm;
