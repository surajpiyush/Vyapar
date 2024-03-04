import React from "react";
import "./purchase-bill.css";
import Thismonth from "../../Component/Purchase/Thismonth";
import Transactions from "../../Component/Purchase/Transactions/Transactions";
import AddPurchaseItem from "../../Component/Purchase/Purchase/Addpurchaseitem";
import css from "../../styles/SalesStyles/Invoice.module.css";

import { GetAllSalesInvoice } from "../../Redux/sales/action";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
const Purchasebill = () => {
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const toggleSalesSuccess = useSelector(
    (state) => state.SalesReducer.toggleSalesSuccess
  );
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);

  useEffect(() => {
    GetAllSalesInvoice(dispatch, startDate, endDate);
  }, [toggleSalesSuccess, startDate, endDate]);

  const formOpen = () => {
    setOpenForm(true);
  };
  const date = { startDate: startDate, endDate: endDate };
  // console.log(startDate, endDate);
  return (
    <div className="purchase-bill-container">
      <Thismonth
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <div>
        <div>
          {openForm ? (
            <div className={css.formOuter}>
              <div className={css.upperNav}>
                <div>
                  <p className={css.activeForm}>
                    <span>Purchase Bill #1</span>
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
                      navigate("/setting", {
                        state: { redirectTo: location.pathname },
                        replace: true,
                      })
                    }
                  />
                  <CloseIcon onClick={() => setOpenForm(false)} />
                </div>
              </div>
              <AddPurchaseItem setOpenForm={setOpenForm} />
            </div>
          ) : (
            <div>
              {!isLoading && <Transactions func={formOpen} date={date} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Purchasebill;
