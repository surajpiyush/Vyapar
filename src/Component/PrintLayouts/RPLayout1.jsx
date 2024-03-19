import css from "./RPLayout.module.css";
import { ConvertPriceToWords, FormatDate } from "../../Redux/sales/action";
import { REGULAR_PRINTER_DATA } from "../../Redux/store";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const RPLayout1 = ({ currPrintItem, usedAsDemo = false }) => {
  const allItems = useSelector((state) => state.ItemReducer.allItems);
  const updateSalePrintSettings = useSelector(
    (state) => state.SalesReducer.updateSalePrintSettings
  );
  const [storedPrintData, setStoredPrintData] = useState(
    JSON.parse(sessionStorage.getItem(REGULAR_PRINTER_DATA)) || {}
  );

  // for updating printer settings
  useEffect(() => {
    const sessionStorageData =
      JSON.parse(sessionStorage.getItem(REGULAR_PRINTER_DATA)) || {};
    setStoredPrintData((prev) => {
      return { ...prev, ...sessionStorageData };
    });
  }, [updateSalePrintSettings]);

  // This function finds the item name through item id
  function FindItemMainName(itemId) {
    let mainName = "";
    allItems.forEach((ite) => {
      if (ite?._id == itemId) {
        mainName = ite?.itemName;
      }
    });
    return mainName;
  }

  console.log("RPlayout 1 currPrintItem", currPrintItem);
  console.log("RPlayout StoredPrintData", storedPrintData);

  return (
    <div
      style={
        usedAsDemo
          ? { width: "210mm", minHeight: "fit-content" }
          : { width: "210mm", minHeight: "297mm" }
      }
      className={css.OuterRP1}
    >
      <div className={css.RP1Inner}>
        {storedPrintData?.printOriginal && (
          <h2 className={css.showOrgText}>ORIGINAL</h2>
        )}

        {/* Top Header */}
        <div
          style={{ borderBottomColor: storedPrintData?.layoutColor }}
          className={css.topOuterDiv}
        >
          <div className={css.topOuterLeftSideDiv}>
            {storedPrintData?.showCompanyName && (
              <h1
                style={{
                  fontSize:
                    storedPrintData?.companyNameTextSize == "V. Small"
                      ? "12px"
                      : storedPrintData?.companyNameTextSize == "Small"
                      ? "14px"
                      : storedPrintData?.companyNameTextSize == "Medium"
                      ? "16px"
                      : storedPrintData?.companyNameTextSize == "Large"
                      ? "18px"
                      : storedPrintData?.companyNameTextSize == "V. Large"
                      ? "20px"
                      : storedPrintData?.companyNameTextSize == "E. Large"
                      ? "22px"
                      : "16px",
                }}
              >
                {storedPrintData?.myCompanyName}
              </h1>
            )}
            {storedPrintData?.showBusinessAddress && (
              <h2>{storedPrintData?.myBusinessAddress}</h2>
            )}
            {storedPrintData?.showPhoneNumber && (
              <h2>
                Ph. no.:
                {storedPrintData?.myPhoneNumber}
              </h2>
            )}
            {storedPrintData?.showEmail && (
              <h2>Email: {storedPrintData?.myEmail}</h2>
            )}
          </div>
          <div className={css.topOuterRightSideDiv}>
            {storedPrintData?.showLogo &&
              (storedPrintData?.companyLogo ? (
                <img src={storedPrintData?.companyLogo} />
              ) : (
                <div>Image</div>
              ))}
          </div>
        </div>

        <div
          style={{ color: storedPrintData?.layoutColor }}
          className={css.printTypeHeadingText}
        >
          Sale
        </div>

        {/* Upper Details */}
        <div className={css.upperDetailsOuter}>
          <div>
            <h3 style={{ width: "80%" }} className={css.upperDetailsBoldHead}>
              Bill To:{" "}
              <span>{currPrintItem?.billingName || "Classic enterprises"}</span>
            </h3>
            <h2>
              {currPrintItem?.billingAddress ||
                "Plot No. 1, Shop No. 8, Koramangla, Banglore, 560034"}
            </h2>
            <h2>Contact No.: {currPrintItem?.phoneNumber || 8888888888}</h2>
          </div>
          {currPrintItem?.shippingAddress && (
            <div style={{ flexGrow: 1, width: "fit-content" }}>
              <h3 className={css.upperDetailsBoldHead}>Shipping To</h3>
              <h2>{currPrintItem?.shippingAddress}</h2>
            </div>
          )}
          {usedAsDemo && (
            <div style={{ flexGrow: 1, width: "fit-content" }}>
              <h3 className={css.upperDetailsBoldHead}>Shipping To</h3>
              <h2>
                {currPrintItem?.shippingAddress ||
                  "Mehta Textiles, Marathali Road, Bangalore, Karnataka, 560034"}
              </h2>
            </div>
          )}
          <div className={css.invoiceDetailsDivOuter}>
            <h3 className={css.upperDetailsBoldHead}>Invoice Details</h3>
            <h4>Invoice No.: {currPrintItem?.invoiceNumber || "Inv. 101"}</h4>
            <h4>
              Date:{" "}
              {currPrintItem?.invoiceDate
                ? FormatDate(currPrintItem?.invoiceDate)
                : "02-07-2019"}
            </h4>
            <h4>
              Time:{" "}
              {currPrintItem?.time ||
                new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
            </h4>
            {currPrintItem?.dueDate && (
              <h4>
                Due Date:{" "}
                {currPrintItem?.dueDate
                  ? FormatDate(currPrintItem?.dueDate)
                  : "17-07-2019"}
              </h4>
            )}
          </div>
        </div>

        {/* Items Table */}
        <div className={css.TableOuterDiv}>
          <table>
            <thead>
              <tr
                style={{
                  backgroundColor: storedPrintData?.layoutColor,
                  color: "white",
                }}
              >
                <th>#</th>
                <th>Item name</th>
                {/* <th>HSC/SAC</th> */}
                <th>Quantity</th>
                <th>Price/Unit</th>
                <th>Discount</th>
                <th>GST</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {usedAsDemo
                ? DemoItemData?.map((demoItem, demoItemInd) => (
                    <tr key={demoItemInd + demoItem?.itemName}>
                      <td>{demoItemInd + 1}</td>
                      <td>{demoItem?.itemName}</td>
                      <td>{demoItem?.qty}</td>
                      <td>{demoItem?.price} ₹</td>
                      <td>
                        <div>{demoItem?.discountAmt} ₹</div>
                        <div>({demoItem?.discountPercent})</div>
                      </td>
                      <td>
                        <div>{demoItem?.gstAmt} ₹</div>
                        <div>({demoItem?.gstPercent})</div>
                      </td>
                      <td>{demoItem?.amt} ₹</td>
                    </tr>
                  ))
                : currPrintItem?.sale?.map((saleItem, saleItemInd) => (
                    <tr key={saleItemInd + saleItem?.itemName}>
                      <td>{saleItemInd + 1}</td>
                      <td>
                        {saleItem?.mainName
                          ? saleItem?.mainName
                          : FindItemMainName(saleItem?.itemName)}
                      </td>
                      <td>{saleItem?.qty || 1}</td>
                      <td>{saleItem?.priceUnit || 1} ₹</td>
                      <td>
                        <div>{saleItem?.discountAmount || 0} ₹</div>
                        <div>({saleItem?.discountpersant || 0}) %</div>
                      </td>
                      <td>
                        <div>{saleItem?.taxAmount || 0} ₹</div>
                        <div>({saleItem?.taxPersant || 0}) %</div>
                      </td>
                      <td>{saleItem?.amount || 0} ₹</td>
                    </tr>
                  ))}
              {usedAsDemo ? (
                <tr className={css.tableBottomRow}>
                  <td></td>
                  <td>Total</td>
                  {/* <td></td> */}
                  <td>{storedPrintData?.showTotalItemQty && "2 + 1"}</td>
                  <td></td>
                  <td>20</td>
                  <td>90</td>
                  <td>45.80 ₹</td>
                </tr>
              ) : (
                <tr className={css.tableBottomRow}>
                  <td></td>
                  <td>Total</td>
                  {/* <td></td> */}
                  {storedPrintData?.showTotalItemQty ? (
                    <td>
                      {currPrintItem?.sale?.reduce(
                        (total, item) => total + item.qty,
                        0
                      )}
                    </td>
                  ) : (
                    <td></td>
                  )}
                  <td></td>
                  <td>
                    {currPrintItem?.sale?.reduce(
                      (total, item) => total + item.discountAmount,
                      0
                    )}
                  </td>
                  <td>
                    {currPrintItem?.sale?.reduce(
                      (total, item) => total + item.taxAmount,
                      0
                    )}
                  </td>
                  <td>
                    {currPrintItem?.sale?.reduce(
                      (total, item) => total + item.amount,
                      0
                    )}{" "}
                    ₹
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className={css.FooterOuter}>
          <div className={css.FooterLeftSideDivOuter}>
            {storedPrintData?.printDescription && (
              <div>
                <h2>Description</h2>
                <h3>
                  {usedAsDemo
                    ? "Sale Description"
                    : currPrintItem?.addDescription}
                </h3>
              </div>
            )}

            <div>
              <h2>INVOICE AMOUNT IN WORDS</h2>
              <h3>
                {usedAsDemo
                  ? ConvertPriceToWords(42.32)
                  : ConvertPriceToWords(currPrintItem?.total) || ""}
              </h3>
            </div>
            {currPrintItem?.dueDate && (
              <h3>
                Due Date:{" "}
                {currPrintItem?.dueDate
                  ? FormatDate(currPrintItem?.dueDate)
                  : "17-07-2019"}
              </h3>
            )}
          </div>
          <div className={css.FooterRightSideDivOuter}>
            <div className={css.invoiceStatsFooterOuter}>
              <div>
                <h2>Sub Total</h2>
                <h2>
                  {usedAsDemo
                    ? 40.0
                    : currPrintItem?.sale?.reduce(
                        (total, item) => total + item?.qty * item?.priceUnit,
                        0
                      )}{" "}
                  ₹
                </h2>
              </div>
              <div>
                <h2>Discount</h2>
                <h2>
                  {usedAsDemo
                    ? 0.1
                    : currPrintItem?.sale?.reduce(
                        (total, item) => total + item?.discountAmount,
                        0
                      )}{" "}
                  ₹
                </h2>
              </div>
              <div>
                <h2>Discount(%)</h2>
                <h2>
                  {usedAsDemo
                    ? 5.5
                    : currPrintItem?.sale?.reduce((total, item) => {
                        let orgDis = item?.discountpersant;
                        let numericalDis = 0;
                        if (orgDis == null) {
                          return total + numericalDis;
                        }
                        if (orgDis && orgDis?.includes("%")) {
                          numericalDis = Number(orgDis.split("%")[0]);
                        } else if (orgDis) {
                          numericalDis = Number(orgDis);
                        }
                        return total + item?.numericalDis;
                      }, 0)}{" "}
                  ₹
                </h2>
              </div>
              <div
                style={{
                  backgroundColor: storedPrintData?.layoutColor,
                  color: "white",
                }}
                id={css.totalFooterOuter}
              >
                <h2>Total</h2>
                <h2>{usedAsDemo ? 42.32 : currPrintItem?.total || 0} ₹</h2>
              </div>
              {storedPrintData?.showRecievedAmount && (
                <div>
                  <h2>Received</h2>
                  <h2>{usedAsDemo ? 12.0 : currPrintItem?.recived || 0} ₹</h2>
                </div>
              )}
              {storedPrintData?.showBalanceAmount && (
                <div>
                  <h2>Balance</h2>
                  <h2>{usedAsDemo ? 30.32 : currPrintItem?.balance || 0} ₹</h2>
                </div>
              )}
              {/* {storedPrintData?.showPaymentMode && (
                <div>
                  <h2>Payment Mode</h2>
                  <h2>Cash (1234)</h2>
                </div>
              )} */}
              {storedPrintData?.showYouSaved && (
                <div className={css.savedFooterCss}>
                  <h2>You Saved</h2>
                  <h2>
                    {usedAsDemo
                      ? 42.32
                      : (function CalculateSaved() {
                          let subTotal =
                            currPrintItem?.sale?.reduce(
                              (total, item) =>
                                total + item?.qty * item?.priceUnit,
                              0
                            ) || 0;
                          let discount =
                            currPrintItem?.sale?.reduce(
                              (total, item) => total + item?.discountAmount,
                              0
                            ) || 0;
                          let diff = subTotal - discount;
                          return subTotal - diff || 0;
                        })()}{" "}
                    ₹
                  </h2>
                </div>
              )}
            </div>
            {storedPrintData?.showPrintSignatureText && (
              <div className={css.SignOuterDiv}>
                <h2>For : {storedPrintData?.myCompanyName}</h2>
                <div className={css.signImgDivCss}>
                  {storedPrintData?.signature ? (
                    <img src={storedPrintData?.signature} />
                  ) : (
                    <div>Image</div>
                  )}
                </div>
                <h3>{storedPrintData?.signatureText}</h3>
              </div>
            )}
          </div>
        </div>

        {/* Acknowledgement */}
        {storedPrintData?.printAcknowledgement && (
          <div className={css.AcknowledgeOuter}>
            <h2>Acknowledgement</h2>
            <h2
              style={{
                color: storedPrintData?.layoutColor,
              }}
            >
              {storedPrintData?.myCompanyName?.toUpperCase()}
            </h2>
            <div className={css.acknBottomDivOuter}>
              <div style={{ width: "25%" }} className={css.innerAckDiv}>
                <h2
                  style={{
                    color: storedPrintData?.layoutColor,
                    textAlign: "left",
                    marginBottom: "10px",
                  }}
                >
                  Invoice To:
                </h2>
                <h3>{currPrintItem?.billingName || "Classic enterprises"}</h3>
              </div>
              <div className={css.innerAckDiv}>
                <h2
                  style={{
                    color: storedPrintData?.layoutColor,
                    textAlign: "left",
                    marginBottom: "10px",
                  }}
                >
                  Invoice Details:
                </h2>
                <h2
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    textAlign: "left",
                  }}
                >
                  Invoice No.:{" "}
                  {usedAsDemo ? "Inv. 101" : currPrintItem?.invoiceNumber}
                </h2>
                <h2>
                  Date:{" "}
                  {currPrintItem?.invoiceDate
                    ? FormatDate(currPrintItem?.invoiceDate)
                    : "02-07-2019"}
                </h2>
                <h2>Invoice Amount : {currPrintItem?.total || "35.11"} ₹</h2>
              </div>
              <div className={css.recieverSignOuterDiv}>
                <div>Receiver's Seal & Sign</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RPLayout1;

const DemoItemData = [
  {
    itemName: "Item 1",
    qty: 2,
    price: 10,
    discountAmt: 200,
    discountPercent: "2%",
    gstAmt: 50,
    gstPercent: "5%",
    amt: 10.4,
  },
  {
    itemName: "Item 2",
    qty: 1,
    price: 20,
    discountAmt: 200,
    discountPercent: "2%",
    gstAmt: 40,
    gstPercent: "18%",
    amt: 35.4,
  },
];
