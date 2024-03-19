import css from "../../Page/Firm/EditFirm.module.css";
import { UpdateItem, DeleteItem } from "../../Redux/items/actions";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { RiDeleteBinLine as DeleteIcon } from "react-icons/ri";
import { ImSpinner3 as SpinnerIcon } from "react-icons/im";

const ItemEditForm = ({ setShowEditFirm, item }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const loadingUpdate = useSelector((state) => state.ItemReducer.loadingUpdate);
  const loadingDelete = useSelector((state) => state.ItemReducer.loadingDelete);
  const [itemData, setPartyData] = useState(item);

  //   Input Change Function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "openingQuantity") {
      setPartyData((prevData) => ({
        ...prevData,
        stock: {
          ...prevData.stock,
          openingQuantity: value,
        },
      }));
    } else {
      setPartyData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  //   Update Item Function
  const handleUpdate = () => {
    UpdateItem(dispatch, itemData?._id, itemData, setShowEditFirm, toast);
  };

  //   Delete Item Function
  const handleDelete = () => {
    DeleteItem(dispatch, itemData?._id, setShowEditFirm, toast);
  };

  return (
    <div onClick={() => setShowEditFirm(false)} className={css.Overlay}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={css.OuterEditProfile}
      >
        {/* Top Nav */}
        <div className={css.topNavDiv}>
          <h2>Edit Item</h2>
          <CloseIcon onClick={() => setShowEditFirm(false)} />
        </div>

        {/* FormInputs */}
        <div className={css.actualFormContDiv}>
          <div className={css.TopSectionInputOuter}>
            <div className={css.rightSideTopDivOuter}>
              <div>
                <label htmlFor="#">Item ID</label>
                <input
                  value={itemData?._id}
                  onChange={handleInputChange}
                  readOnly
                  type="text"
                  placeholder="Item ID"
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
                  Item Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  value={itemData?.itemName}
                  onChange={handleInputChange}
                  name="itemName"
                  type="text"
                  placeholder="Party name"
                />
              </div>
              <div>
                <label htmlFor="#">
                  Quantity <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  value={itemData?.stock?.openingQuantity}
                  onChange={handleInputChange}
                  name="openingQuantity"
                  type="number"
                  placeholder="Opening Quantity"
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
            disabled={loadingDelete}
            id={css.deleteBtn}
          >
            {loadingDelete ? <SpinnerIcon /> : <DeleteIcon />}
          </button>
          <button type="submit" disabled={loadingUpdate} onClick={handleUpdate}>
            {loadingUpdate ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemEditForm;
