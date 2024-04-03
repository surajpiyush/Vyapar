import css from "./PurchaseOrder.module.css";
import Setting from "../../../Component/Setting/Setting";
import party from "../../../assets/Images/party.jpg";
import Loader3 from "../../../Component/Loaders/Loader3";
import AddPurchaseBill from "./AddPurchaseOrderForm";
import EditPurchaseForm from "../../../Component/Purchase/EditPurchaseForm";
import UpperControlPanel from "../../../Component/UpperControlPanel/UpperControlPanel";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import {
  DeletePurchaseOrder,
  GetAllPurchaseBill,
  GetAllPurchaseOrder,
  GetSinglePurchaseBillData,
  UpdatePurchaseOrder,
  deletePurchaseBill,
  updatePurchaseBill,
} from "../../../Redux/purchase/action";
import {
  CloseIcon2,
  DeleteIcon2,
  EditIcon,
  PlusIcon2,
  SearchIcon,
  CalculatorIcon,
  SettingsIconOutline2,
  CrossIcon,
} from "../../../assets/Icons/ReactIcons";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";

const PurchaseOrder = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  // const date = { startDate: startDate, endDate: endDate };
  const toggleAddPaymentOutSuccess = useSelector(
    (state) => state.PurchaseReducer.toggleAddPaymentOutSuccess
  );
  const getAllPaymentOutLoading = useSelector(
    (state) => state.PurchaseReducer.getAllPaymentOutLoading
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const paymentOutData = useSelector(
    (store) => store?.PurchaseReducer?.paymentOutData
  );

  // To Get All Payment Out Data
  useEffect(() => {
    GetAllPurchaseOrder(dispatch, startDate, endDate);
  }, [toggleAddPaymentOutSuccess, startDate, endDate]);

  // Handle Delete
  const handleDelete = (id) => {
    DeletePurchaseOrder(dispatch, id, toast, setIsEditing, setEditedData);
  };

  // Handle Edit
  const handleEdit = (data) => {
    setIsEditing(true);
    setEditedData(data);
  };

  // Update Request
  const handleUpdate = (updatedData) => {
    UpdatePurchaseOrder(
      dispatch,
      updatedData?._id,
      updatedData,
      toast,
      setIsEditing,
      setEditedData
    );
  };

  // Cancel Update
  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(null);
  };

  return <div>PurchaseOrder</div>;
};

export default PurchaseOrder;
