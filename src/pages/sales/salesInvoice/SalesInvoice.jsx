import css from "../../../styles/SalesStyles/Invoice.module.css";
import party from "../../../assets/Images/party.jpg";
import InvoiceForm from "./InvoiceForm";
import SalesInvoiceTable from "../../../components/TableData/SalesInvoiceTable";
import SalesInvoiceForm from "../../../components/addForm/SalesInvoiceForm";

import React, { useEffect, useState } from "react";
import FirstTimeFormToggle from "../../../Component/FirstTimeFormToggle";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";

export default function SalesInvoice() {
  const data = [];

  const [openForm, setOpenForm] = useState(false);

  const closeForm = () => {
    setOpenForm(false);
  };

  useEffect(() => {
    console.log(css);
  }, []);

  const formOpen = () => {
    setOpenForm(true);
  };

  return (
    <div>
      {openForm ? (
        <div className={css.formOuter}>
          <div className={css.upperNav}>
            <div>
              <p className={css.activeForm}>
                <span>Sale #1</span>
                <CrossIcon />
              </p>
            </div>
            <div>
              <CalculatorIcon />
              <SettingIcon />
              <CloseIcon onClick={() => setOpenForm(false)} />
            </div>
          </div>
          <InvoiceForm />
        </div>
      ) : (
        <div className="d-cen b-cont text-center">
          {!(data.length > 0) ? (
            <FirstTimeFormToggle
              img={party}
              onClick={() => setOpenForm(true)}
              BtnText="Add Your First Sale Invoice"
              MiddleText="Make Sale invoices & Print or share with your customers directly via WhatsApp or Email."
            />
          ) : (
            <div className="">
              <SalesInvoiceTable func={formOpen} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
