import css from "./AddParties.module.css";
import { useToast } from "@chakra-ui/react";
import { SaveParty } from "../../Redux/parties/actions";
import { SettingsIconOutline, CrossIcon } from "../../assets/Icons/ReactIcons";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditPartyForm = ({ CloseForm, partyData }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const postPartyLoading = useSelector(
    (state) => state.PartiesReducer.postPartyLoading
  );
  const [currInps, setCurrInps] = useState("GST & Address");
  const [creditLimitToggle, setCreditLimitToggle] = useState(false);
  const [disableShippingAddress, setDisableShippingAddress] = useState(true);
  const [formData, setFormData] = useState({
    partyName: "",
    phoneNumber: "",
    state: "",
    email: "",
    billingAddress: "",
    shippingAddress: "",
    openingBalance: "",
    asOfDate: new Date().toISOString().split("T")[0],
    creditLimit: "",
    gstNo: "",
    additionalField: [
      { name: "", value: "", editable: false },
      { name: "", value: "", editable: false },
      { name: "", value: "", editable: false },
    ],
    // GSTType: "",
  });

  //
  useEffect(() => {
    setFormData((prev) => {
      return { ...prev, ...partyData };
    });
    console.log("partyData", partyData);
  }, []);

  // Handle Save Function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postPartyLoading) {
      // console.log("formData", formData);
      SaveParty(dispatch, formData, CloseForm, toast);
    }
  };

  // Input Change Function
  const handleInpChange = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Additional Field Input Change
  const addFieldInpChange = (e, fieldIndex) => {
    const { name, type } = e.target;
    let newAddFieldArr = formData?.additionalField?.map((item, ind) => {
      if (ind != fieldIndex) {
        return item;
      } else {
        let obj = {
          ...item,
          [name]: type == "checkbox" ? e.target.checked : e.target.value,
        };
        return obj;
      }
    });
    setFormData((prev) => {
      return { ...prev, additionalField: newAddFieldArr };
    });
  };

  // Add More Additional Fields
  const AddMoreAdditionalField = () => {
    setFormData((prev) => {
      return {
        ...prev,
        additionalField: [
          ...prev?.additionalField,
          { name: "", value: "", editable: false },
        ],
      };
    });
  };

  return <div>EditPartyForm</div>;
};

export default EditPartyForm;
