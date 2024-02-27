import css from "../../../styles/SalesStyles/PaymentIn.module.css";
import party from "../../../assets/Images/party.jpg";
import SalesPaymentTable from "../../../components/TableData/SalesPaymentTable";
import PaymentInForm from "./PaymentInForm";

import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";

export default function SalesPaymentIn() {
  const toast = useToast();
  const data = [1];
  const [openForm, setOpenForm] = useState(false);

  const closeForm = () => {
    setOpenForm(false);
  };

  const formOpen = () => {
    setOpenForm(true);
  };

  return (
    <div>
      {/* {openForm && <PaymentInForm closeForm={closeForm} />} */}
      {openForm && (
        <div className={css.formOuter}>
          <div className={css.upperNav}>
            <div>
              <p className={css.activeForm}>
                <span>Estimate #1</span>
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
              {/* <CloseIcon onClick={() => setOpenForm(false)} /> */}
            </div>
          </div>
          {/* <EstimateForm setOpenForm={setOpenForm} /> */}
        </div>
      )}

      <div className="d-cen b-cont text-center">
        {!(data.length > 0) ? (
          <div className="">
            <div className="">
              <img src={party} alt="" className="party-img" />
              <p>Add Payment to manage your full Stock Inventory.</p>
              <button
                className="party-button"
                onClick={() => {
                  setOpenForm(true);
                }}
              >
                Add Payment
              </button>
            </div>
          </div>
        ) : (
          <div className="">
            <SalesPaymentTable func={formOpen} />
          </div>
        )}
      </div>
    </div>
  );
}
