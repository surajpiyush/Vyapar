import css from "../../../styles/SalesStyles/PaymentIn.module.css";
import { PostSalesPayment } from "../../../Redux/sales/action";
import { FetchAllParties } from "../../../Redux/parties/actions";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";

const PaymentInForm = ({ closeForm }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const partiesLoading = useSelector((state) => state.PartiesReducer.isLoading);
  const partiesData = useSelector((state) => state.PartiesReducer.partiesData);
  const togglePartiesData = useSelector(
    (state) => state.PartiesReducer.togglePartiesData
  );
  const [currentCustomerData, setCurrentCustomerData] = useState({});
  const [paymentData, setPaymentData] = useState({
    type: "Payment-In",
    status: "Received",
    party: "",
    receiptNo: "",
    date: "",

    addDescription: "Payment received for services",
    recived: 8000,
    total: 8000,
  });

  const [paymentCount, setPaymentCount] = useState([]);

  // for fetching all parties list on form mount
  useEffect(() => {
    FetchAllParties(dispatch);
  }, [togglePartiesData]);

  // Input Change Function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = () => {
    const data = {
      ...paymentData,
      //   paymentType: [
      //     {
      //       cash: 5000,
      //       cheque: { refreanceNo: "123456", checkAmount: 3000 },
      //       bankDetail: {
      //         accountName: "XYZ Bank",
      //         openingBalance: 10000,
      //         asOfDate: "2023-12-31",
      //       },
      //     },
      //   ],
    };

    PostSalesPayment(dispatch, data, closeForm, toast);
  };

  const deletePaymentRow = (ind) => {
    const arr = paymentCount.filter((item, index) => {
      return index !== ind;
    });
    setPaymentCount(arr);
  };

  return (
    <div className={css.overLay} onClick={closeForm}>
      <form
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={handleSubmit}
        className={css.formOuter}
      >
        <div className={css.formNavDiv}>
          <p>Payment-In</p>
          <div className={css.navIconCont}>
            <CalculatorIcon
              onClick={() =>
                toast({
                  title: "Feature under development",
                  status: "info",
                  position: "top",
                })
              }
            />
            <SettingIcon
              onClick={() =>
                toast({
                  title: "Feature under development",
                  status: "info",
                  position: "top",
                })
              }
            />
            <CloseIcon onClick={closeForm} />
          </div>
        </div>

        {/* Top Part */}
        <div className={css.topformOuterDiv}>
          <div className={css.leftSideFormDiv}>
            {/* Party Name Select */}
            <div className={css.selectOuter}>
              <select
                name="customerName"
                value={currentCustomerData?._id || ""}
                onChange={(e) => {
                  e.stopPropagation();
                  const currentPartyData = partiesData.filter(
                    (item) => item._id == e.target.value
                  );
                  if (currentPartyData.length > 0) {
                    setCurrentCustomerData(currentPartyData[0]);
                  }
                }}
                className={css.selectTag}
                required
              >
                <option value="">Search by Name/Phone</option>
                {partiesLoading ? (
                  <option value="">Loading Parties</option>
                ) : (
                  partiesData?.map((item, ind) => (
                    <option value={item._id} key={ind + item._id}>
                      {item?.partyName}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          <div className={css.rightSideFormDiv}>
            <div>
              <label htmlFor="">Receipt No</label>
              <input type="number" name="" id="" />
            </div>
            <div>
              <label htmlFor="">Date</label>
              <input type="date" name="" id="" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentInForm;
