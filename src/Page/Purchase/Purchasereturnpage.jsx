import css from "../../pages/sales/salesInvoice/Invoice.module.css";
import Thismonth from "../../Component/Purchase/Thismonth";
import Purchasereturn from "../../Component/Purchase/Purchasereturn/Purchasereturn";

import { GetAllSalesInvoice } from "../../Redux/sales/action";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Addpurchasereturnitrm from "../../Component/Purchase/Addpurchasereturnitrm";
import { useLocation, useNavigate } from "react-router-dom";
import Setting from "../../Component/Setting/Setting";
import { getPurchaseReturn } from "../../Redux/purchase/action";
const Purchasereturnpage = () => {
  const [toggleSetting, setToggleSetting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const data = useSelector(
    (store) => store.PurchaseReducer?.purchaseReturnData
  );
  const date = { startDate: startDate, endDate: endDate };

  useEffect(() => {
    dispatch(getPurchaseReturn({ date }));
  }, [dispatch, startDate, endDate]);

  const formOpen = () => {
    setOpenForm(true);
  };

  return (
    <div className="purchase-bill-container">
      <Thismonth
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        data={data}
      />
      <div>
        {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}
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
              <Addpurchasereturnitrm setOpenForm={setOpenForm} />
            </div>
          ) : (
            <div>
              {!isLoading && (
                <Purchasereturn func={formOpen} date={date} data={data} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Purchasereturnpage;
