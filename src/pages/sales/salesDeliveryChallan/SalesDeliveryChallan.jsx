import css from "./DeliveryChallan.module.css";
import party from "../../../assets/Images/party.jpg";
import EditableRow from "../../../Component/EditForm";
import FormDeliveryChallan from "./FormDeliveryChallan";
import Setting from "../../../Component/Setting/Setting";
import TableDeliveryChallan from "./TableDeliveryChallan";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import {
  GetAllDeliveryChallans,
  deleteAllDeliveryChallan,
} from "../../../Redux/sales/action";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { CiFilter as FilterIcon } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";

export default function SalesDeliveryChallan() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isError = useSelector((state) => state.SalesReducer.isError);
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const toggleDeliveryChallan = useSelector(
    (state) => state.SalesReducer.toggleDeliveryChallan
  );
  const deliveryChallanList = useSelector(
    (state) => state.SalesReducer.deliveryChallanList
  );

  //   console.log(deliveryChallanList);
  const [openForm, setOpenForm] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);

  useEffect(() => {
    GetAllDeliveryChallans(dispatch);
  }, [toggleDeliveryChallan]);

  const formOpen = () => {
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    deleteAllDeliveryChallan(dispatch, id);
  };

  const handleEdit = (_id) => {
    const data = deliveryChallanList.filter((e) => e._id === _id);
    console.log(data[0]);
    setIsEditing(true);
    setEditedData(data[0]);
  };

  const handleSave = (updatedData) => {
    // Implement your logic to save the updated data to the backend
    // You may use an API call or any other method here
    console.log("updatedData-", updatedData);
    const id = updatedData._id;
    // After saving, reset the state
    // dispatch(updatePurchaseBill(updatedData._id, updatedData));
    setIsEditing(false);
    setEditedData(null);
    GetAllDeliveryChallans(dispatch);
  };

  const handleCancel = () => {
    // If the user cancels, reset the state without saving
    setIsEditing(false);
    setEditedData(null);
  };
  const display = [
    "invoiceDate",
    "partyName",
    "challanNo",
    "dueDate",
    "amount",
    "statuss",
  ];

  return (
    <div>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

      <div className="nav">
        <div className="nav-opt">Delivery Challan</div>
      </div>

      {/* Top Nav */}
      <div className="d-cen b-cont text-center text-center">
        <div className={css.TableOuter}>
          <div className={css.saleOrderUpperNav}>
            <div className={css.leftSideDivSaleOuter}>
              <p>TRANSACTIONS</p>
              <div className={css.saleOrderSearchDiv}>
                <SearchIcon />
                <div>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={formOpen}
                className={css.addSaleOrderBtn}
              >
                <PlusIcon /> Add Delivery Challan
              </button>
            </div>
          </div>
          <div className={css.TabelOuterDivSaleOrder}>
            <table>
              <thead>
                <tr>
                  <th>
                    <div>
                      DATE
                      {/*  <FilterIcon /> */}
                    </div>
                  </th>
                  <th>
                    <div>
                      PARTY
                      {/*  <FilterIcon /> */}
                    </div>
                  </th>
                  <th>
                    <div>
                      Challan NO.
                      {/*  <FilterIcon /> */}
                    </div>
                  </th>
                  <th>
                    <div>
                      DUE DATE
                      {/*  <FilterIcon /> */}
                    </div>
                  </th>
                  <th>
                    <div>
                      TOTAL AMOUNT
                      {/*  <FilterIcon /> */}
                    </div>
                  </th>
                  <th>
                    <div>
                      STATUS
                      {/*  <FilterIcon /> */}
                    </div>
                  </th>
                  <th>
                    <div>
                      ACTION
                      {/*  <FilterIcon /> */}
                    </div>
                  </th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {!isLoading &&
                  deliveryChallanList?.map((item, ind) =>
                    isEditing && editedData?._id === item._id ? (
                      <tr
                        style={{
                          width: "82%",
                          position: "absolute",
                        }}
                      >
                        <EditableRow
                          display={display}
                          data={editedData}
                          onSave={handleSave}
                          onCancel={handleCancel}
                        />
                      </tr>
                    ) : (
                      <TableDeliveryChallan
                        {...item}
                        ind={ind}
                        key={ind + item?._id}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                      />
                    )
                  )}
              </tbody>
            </table>
            {isLoading && (
              <h2
                style={{
                  color: "green",
                  textAlign: "center",
                  margin: "20px auto",
                }}
              >
                Loading Delivery Challans...
              </h2>
            )}
          </div>
        </div>
      </div>

      {/* Form */}
      {openForm && (
        <div className={css.formOuter}>
          <div className={css.upperNav}>
            <div>
              <p className={css.activeForm}>
                <span>Delivery Challan #1</span>
                <CrossIcon />
              </p>
            </div>
            <div>
              <CalculatorIcon
                onClick={() =>
                  toast({
                    title: "Feature currently in development",
                    status: "info",
                    position: "top",
                  })
                }
              />
              <SettingIcon onClick={() => setToggleSetting(true)} />
              <CloseIcon onClick={() => setOpenForm(false)} />
            </div>
          </div>
          <FormDeliveryChallan
            setToggleSetting={setToggleSetting}
            setOpenForm={setOpenForm}
          />
        </div>
      )}

      {!isLoading && deliveryChallanList.length <= 0 && (
        <div style={{ marginTop: "-450px" }}>
          <FirstTimeFormToggle
            img={party}
            onClick={formOpen}
            BtnText="Add Your First Delivery Challan"
            MiddleText="Add Delivery Challan to manage your full Stock Inventory."
          />
        </div>
      )}
    </div>
  );
}
