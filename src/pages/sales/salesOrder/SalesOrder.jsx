import css from "../../../styles/SalesStyles/Order.module.css";
import party from "../../../assets/Images/party.jpg";
import SalesOrderTable from "../../../components/TableData/SalesOrderTable";
import FirstTimeFormToggle from "../../../Component/FirstTimeFormToggle";
import OrderForm from "./OrderForm";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";

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
          {openForm && (
            <div className={css.formOuter}>
              <div className={css.upperNav}>
                <div>
                  <p className={css.activeForm}>
                    <span>Sale Order #1</span>
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
                  <SettingIcon
                    onClick={() =>
                      toast({
                        title: "Feature currently in development",
                        status: "info",
                        position: "top",
                      })
                    }
                  />
                  <CloseIcon onClick={() => setOpenForm(false)} />
                </div>
              </div>
              <OrderForm setOpenForm={setOpenForm} />
            </div>
          )}
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
