import React, { useState } from "react";
import party from "../../../assets/Images/party.jpg";
import SalesOrderTable from "../../../components/TableData/SalesOrderTable";
import SalesOrderForm from "../../../components/addForm/SalesOrderForm";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import FirstTimeFormToggle from "../../../Component/FirstTimeFormToggle";

export default function SalesOrder() {
  const toast = useToast();
  const dispatch = useDispatch();

  const data = [];
  const [openForm, setOpenForm] = useState(false);
  const [toggleSections, setToggleSections] = useState(false);

  const closeForm = () => {
    setOpenForm(false);
  };

  const formOpen = () => {
    setOpenForm(true);
  };

  return (
    <div>
      <div className="nav">
        <div
          className="nav-opt"
          onClick={() => {
            setToggleSections(true);
          }}
        >
          SALE ORDERS
        </div>
        <div
          className="nav-opt"
          onClick={() => {
            setToggleSections(false);
          }}
        >
          ONLINE ORDERS
        </div>
      </div>
      {!toggleSections ? (
        // Sale Orders Section
        <div className="">
          {openForm ? (
            <SalesOrderForm func={closeForm} />
          ) : (
            <div className="d-cen b-cont text-center text-center">
              {!data.length > 0 ? (
                <FirstTimeFormToggle
                  img={party}
                  onClick={formOpen}
                  BtnText="Add Your First Sale Order"
                  MiddleText="Make & share sale orders & convert them to sale invoice instantly."
                />
              ) : (
                <div className="">
                  <SalesOrderTable func={formOpen} />
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        // Online Orders Section
        <div className="d-cen b-cont text-center">
          <div className="">
            <img src={party} alt="" className="party-img" />
            <p style={{ fontWeight: "bold" }}>No Online Orders</p>
            <p>Share your Online Store to get orders.</p>
            <button className="party-button">
              <i className="fa fa-share"></i> <span>Share Store</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
