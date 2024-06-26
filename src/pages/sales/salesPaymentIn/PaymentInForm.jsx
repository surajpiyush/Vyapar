import css from "./PaymentIn.module.css";
import { FetchAllParties } from "../../../Redux/parties/actions";
import { PostPaymentIn } from "../../../Redux/sales/action";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillFileAdd as AddDecriptionIcon } from "react-icons/ai";
import { BiSolidCameraPlus as AddCameraIcon } from "react-icons/bi";
import {
  IoIosArrowDown as ArrowDown,
  IoMdCloseCircle as CloseIcon,
} from "react-icons/io";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import {
  MdDelete as DeleteIcon,
  MdOutlineSettings as SettingIcon,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const PaymentInForm = ({ closeForm, setToggleSetting }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const partiesLoading = useSelector((state) => state.PartiesReducer.isLoading);
  const partiesData = useSelector((state) => state.PartiesReducer.partiesData);
  const togglePartiesData = useSelector(
    (state) => state.PartiesReducer.togglePartiesData
  );
  const paymentInList = useSelector(
    (state) => state.SalesReducer.paymentInList
  );

  const [totalAmount, setTotalAmount] = useState(0);
  const [toggleDesc, setToggleDesc] = useState(false);
  const [currentCustomerData, setCurrentCustomerData] = useState({});
  const [paymentArr, setPaymentArr] = useState([{ types: "Cash", amount: 0 }]);

  function generateReciptNumber() {
    const currentDate = new Date();
    const previousYear = (currentDate.getFullYear() - 1).toString().slice(-2);
    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const monthIndex = currentDate.getMonth();
    const month = monthNames[monthIndex];
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const date = currentDate.getDate();
    const sec = currentDate.getSeconds();

    // Format the invoice number
    const invoiceNumber = `${date}${hours}${minutes}${sec}/${month}/${previousYear}-${
      Number(previousYear) + 1
    }`;

    return invoiceNumber;
  }
  const [paymentData, setPaymentData] = useState({
    type: "Payment-In",
    status: "Received",
    party: "",
    receiptNo: generateReciptNumber(),
    date: new Date().toISOString().split("T")[0],
    addDescription: "",
    recived: 0,
    total: 0,
  });

  // for fetching all parties list on form mount
  useEffect(() => {
    FetchAllParties(dispatch);
  }, [togglePartiesData]);

  //   for Total Amount updating
  useEffect(() => {
    let total = 0;
    paymentArr.forEach((item) => {
      total += Number(item?.amount);
    });
    setTotalAmount(total);
  }, [paymentArr]);

  // Input Change Function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //   Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...paymentData,
      party: currentCustomerData?._id || "",
      paymentType: paymentArr,
      recived: totalAmount,
      total: totalAmount,
    };
    // console.log("partyData", data);
    PostPaymentIn(dispatch, data, closeForm, toast);
  };

  //   Add payment type option
  const handleAddPayType = () => {
    let newObj = {
      types: "Cash",
      amount: 0,
    };
    setPaymentArr((prev) => [...prev, newObj]);
  };

  //   Delete payment type
  const handleDeletePayType = (ind) => {
    const newPaymentArr = paymentArr.filter((_, index) => ind != index);
    setPaymentArr(newPaymentArr);
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
            <SettingIcon onClick={() => setToggleSetting(true)} />
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
            {/* Payment Type */}
            <div className={css.paymentOuter}>
              {paymentArr?.map((item, ind) => (
                <div key={ind} className={css.paymentInnerOuterDivs}>
                  <div className={css.selectOuter}>
                    <select
                      name="types"
                      value={item?.types}
                      onChange={(e) => {
                        setPaymentArr((prev) => {
                          return prev.map((ite, index) =>
                            index != ind
                              ? ite
                              : { ...ite, types: e.target.value }
                          );
                        });
                      }}
                      className={css.selectTag}
                      required
                    >
                      <option value="Cash">Cash</option>
                      <option value="Credit">Credit</option>
                    </select>
                  </div>
                  <div className={css.divWhichHasDeleteBtn}>
                    <div className={css.inputDiv}>
                      <input
                        type="number"
                        value={item?.amount}
                        name="amount"
                        onChange={(e) => {
                          setPaymentArr((prev) => {
                            return prev.map((ite, index) =>
                              index != ind
                                ? ite
                                : {
                                    ...ite,
                                    amount: e.target.value,
                                  }
                            );
                          });
                        }}
                        className={css.input}
                        required
                      />
                      <label
                        style={{ color: "var(--greyA)" }}
                        className={css.activeLabel}
                        // className={
                        //   invoiceData.phoneNumber ? css.activeLabel : css.inactiveLabel
                        // }
                      >
                        Amount
                      </label>
                    </div>
                    {paymentArr.length > 1 && (
                      <DeleteIcon onClick={() => handleDeletePayType(ind)} />
                    )}
                  </div>
                  {item?.types != "Cash" && (
                    <div className={css.inputDiv}>
                      <input
                        type="number"
                        value={item?.refreanceNo}
                        name="refreanceNo"
                        onChange={(e) => {
                          setPaymentArr((prev) => {
                            return prev.map((ite, index) =>
                              index != ind
                                ? ite
                                : {
                                    ...ite,
                                    refreanceNo: e.target.value,
                                  }
                            );
                          });
                        }}
                        className={css.input}
                        required
                      />
                      <label
                        className={
                          item.refreanceNo ? css.activeLabel : css.inactiveLabel
                        }
                      >
                        Reference No.
                      </label>
                    </div>
                  )}
                </div>
              ))}
              <div className={css.paymentFooterDiv}>
                <p onClick={handleAddPayType}>+ Add Payment type</p>
                <p>Total payment : {totalAmount}</p>
              </div>
            </div>
          </div>
          <div className={css.rightSideFormDiv}>
            <div>
              <label htmlFor="">Receipt No</label>
              <input
                type="number"
                name="receiptNo"
                value={paymentData?.receiptNo}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="">Date</label>
              <input
                type="date"
                name="date"
                value={paymentData?.date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Bottom Part */}
        <div className={css.bottompartFormOuter}>
          <div className={css.leftSideBottomDiv}>
            {toggleDesc ? (
              <div className={css.inputDiv}>
                <textarea
                  value={paymentData?.addDescription}
                  name="addDescription"
                  onChange={handleInputChange}
                  className={css.input}
                  style={{
                    height: "110px",
                    width: "230px",
                  }}
                  required
                />
                <label
                  htmlFor="addDescription"
                  className={
                    paymentData.addDescription
                      ? css.activeLabel
                      : css.inactiveLabel
                  }
                >
                  Description
                </label>
              </div>
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setToggleDesc(true);
                }}
                className={css.addDecriptionDiv}
                style={{
                  width: "150px",
                }}
              >
                <AddDecriptionIcon />
                <p>ADD DESCRIPTION</p>
              </div>
            )}
            <div className={css.cameraDiv}>
              <AddCameraIcon
               
              />
              <input type="file" />
            </div>
          </div>
          <div className={css.rightSideBottomDiv}>
            <div className={css.recievedDiv}>
              <label htmlFor="">Received</label>
              <input
                type="number"
                name="recived"
                value={totalAmount}
                readOnly
                disabled
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={css.FooterOuter}>
          <button type="submit">{isLoading ? "Saving" : "Save"}</button>
          {/* <div
            className={css.shareBtn}
            onClick={() =>
              toast({
                title: "Feature currently in development",
                status: "info",
                position: "top",
              })
            }
          >
            <p>Share</p>
            <ArrowDown />
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default PaymentInForm;
