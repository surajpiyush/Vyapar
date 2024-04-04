import css from "./RPLayout.module.css";
import { ConvertPriceToWords, FormatDate } from "../../Redux/sales/action";
import { REGULAR_PRINTER_DATA } from "../../Redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const InvoicePrint = ({ currPrintItem }) => {
   const allItems = useSelector((state) => state.ItemReducer.allItems);
   const updateSalePrintSettings = useSelector(
      (state) => state.SalesReducer.updateSalePrintSettings
   );
   const [storedPrintData, setStoredPrintData] = useState(
      JSON.parse(sessionStorage.getItem(REGULAR_PRINTER_DATA)) || {}
   );

   useEffect(() => {
      const sessionStorageData =
         JSON.parse(sessionStorage.getItem(REGULAR_PRINTER_DATA)) || {};
      setStoredPrintData((prev) => ({ ...prev, ...sessionStorageData }));
   }, [updateSalePrintSettings]);

   const FindItemMainName = (itemId) => {
      const foundItem = allItems.find((item) => item._id === itemId);
      return foundItem?.itemName || "";
   };

   const isFullyPaid = currPrintItem?.status;
   const calculateTotal = () => {
      const total = currPrintItem?.sale?.reduce((acc, item) => {
         const qty = item.qty || 0;
         const priceUnit = item.priceUnit || 0;
         const discountAmount = item.discountAmount || 0;
         const taxPercent = item.taxPersant
            ? parseFloat(item.taxPersant.split("@")[1]) || 0
            : 0;
         const priceWithTax =
            Number(priceUnit) + Number(priceUnit) * (Number(taxPercent) / 100);
         const amount = priceWithTax * qty;
         console.log(taxPercent);
         return acc + amount;
      }, 0);
      return total || 0;
   };
   console.log(currPrintItem);
   return (
      <div
         className={css.OuterRP1}
         style={{ width: "210mm", minHeight: "297mm" }}
      >
         <div className={css.RP1Inner}>
            {storedPrintData?.printOriginal && (
               <h2 className={css.showOrgText}>ORIGINAL</h2>
            )}

            {/* Top Header */}
            <div
               className={css.topOuterDiv}
               style={{ borderBottomColor: storedPrintData?.layoutColor }}
            >
               <div className={css.topOuterRightSideDiv}>
                  {storedPrintData?.showLogo &&
                     (storedPrintData?.companyLogo ? (
                        <img src={storedPrintData?.companyLogo} />
                     ) : (
                        <div>Image</div>
                     ))}
               </div>
               <div className={css.topOuterLeftSideDiv}>
                  {storedPrintData?.showCompanyName && (
                     <h1
                        style={{
                           fontSize: storedPrintData?.companyNameTextSize,
                        }}
                     >
                        {storedPrintData?.companyName}
                     </h1>
                  )}
                  {storedPrintData?.showBusinessAddress && (
                     <h2>{storedPrintData?.businessAddress}</h2>
                  )}
                  {storedPrintData?.showPhoneNumber && (
                     <h2>Ph. no.: {storedPrintData?.phoneNumber}</h2>
                  )}
                  {storedPrintData?.showEmail && (
                     <h2>Email: {storedPrintData?.email}</h2>
                  )}
               </div>

               <div
                  className={css.invoiceDetailsDivOuter}
                  style={{ textAlign: "left" }}
               >
                  <h3 className={css.upperDetailsBoldHead}>Invoice Details</h3>
                  <h4>
                     Invoice No.: {currPrintItem?.invoiceNumber || "Inv. 101"}
                  </h4>
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

               <div className={css.topOuterLeftSideDiv}>
                  {storedPrintData?.showCompanyName && (
                     <h1
                        style={{
                           fontSize: storedPrintData?.companyNameTextSize,
                        }}
                     >
                        Bill To: {currPrintItem?.billingName}
                     </h1>
                  )}
                  {storedPrintData?.showBusinessAddress && (
                     <h2>{currPrintItem?.billingAddress}</h2>
                  )}
                  {storedPrintData?.showPhoneNumber && (
                     <h2>Contact No.: {currPrintItem?.phoneNumber}</h2>
                  )}
                  {storedPrintData?.showEmail && (
                     <h2>Email: {currPrintItem?.email}</h2>
                  )}
               </div>
            </div>

            <div
               className={css.printTypeHeadingText}
               style={{ color: storedPrintData?.layoutColor }}
            >
               Invoice
            </div>

            {/* Upper Details */}
            <div className={css.upperDetailsOuter}>
               {currPrintItem?.shippingAddress && (
                  <div style={{ flexGrow: 1, width: "fit-content" }}>
                     <h3 className={css.upperDetailsBoldHead}>Shipping To</h3>
                     <h2>{currPrintItem?.shippingAddress}</h2>
                  </div>
               )}
            </div>

            {/* Items Table */}
            <div
               className={css.TableOuterDiv}
               style={{ height: "fit-content", border: "1px solid black" }}
            >
               <table style={{ border: "1px solid black" }}>
                  {/* Table Headers */}
                  <thead>
                     <tr
                        style={{
                           backgroundColor: storedPrintData?.layoutColor,
                           color: "white",
                           border: "1px solid black",
                        }}
                     >
                        <th>S.No</th>
                        <th>Item name</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        {/* <th>Discount</th> */}
                        <th>Rate with GST</th>
                        <th>Amount</th>
                     </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody>
                     {currPrintItem?.sale?.map((saleItem, index) => {
                        const mainName =
                           saleItem?.mainName ||
                           FindItemMainName(saleItem?.itemName);
                        const qty = saleItem?.qty || 0;
                        const priceUnit = saleItem?.priceUnit || 0;
                        const discountAmount = saleItem?.discountAmount || 0;
                        const taxPercent = saleItem.taxPersant
                           ? parseFloat(saleItem.taxPersant.split("@")[1]) || 0
                           : 0;
                        const taxAmount =
                           priceUnit * (taxPercent / 100) * qty || 0;
                        const priceWithTax =
                           Number(priceUnit) +
                           Number(priceUnit) * (Number(taxPercent) / 100);
                        const amount = priceWithTax * qty;
                        const formattedPriceWithTax =
                           typeof priceWithTax === "number"
                              ? priceWithTax.toFixed(2)
                              : "";

                        return (
                           <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{mainName}</td>
                              <td>{qty}</td>
                              <td>₹{priceUnit}</td>
                              {/* <td>₹{discountAmount}</td> */}
                              <td>₹{formattedPriceWithTax}</td>{" "}
                              {/* Use formattedPriceWithTax here */}
                              <td>₹{amount.toFixed(2)}</td>
                           </tr>
                        );
                     })}
                     {/* Total Row */}
                     <tr className={css.tableBottomRow}>
                        <td></td>
                        <td>Total</td>
                        {storedPrintData?.showTotalItemQty && (
                           <td>
                              {currPrintItem?.sale?.reduce(
                                 (total, item) => total + item.qty,
                                 0
                              )}
                           </td>
                        )}
                        <td></td>
                        {/* <td>
                           ₹{" "}
                           {currPrintItem?.sale?.reduce(
                              (total, item) =>
                                 total + Number(item.discountAmount),
                              0
                           )}
                        </td> */}
                        <td></td>
                        <td>₹ {calculateTotal().toFixed(2)}</td>
                     </tr>
                  </tbody>
               </table>
            </div>

            {/* Footer */}
            <div className={css.FooterOuter}>
               <div className={css.FooterLeftSideDivOuter}>
                  {storedPrintData?.printDescription && (
                     <div>
                        <h2>Description</h2>
                        <h3>{currPrintItem?.addDescription}</h3>
                     </div>
                  )}

                  <div>
                     <h2>INVOICE AMOUNT IN WORDS</h2>
                     <h3>
                        {ConvertPriceToWords(currPrintItem?.total) || "Zero"}
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
                     {/* Calculations for Subtotal, Discount, and Total */}
                     <div>
                        <h2>Sub Total</h2>
                        <h2>₹ {calculateTotal().toFixed(2)}</h2>
                     </div>
                     <div>
                        <h2>Discount</h2>
                        <h2>
                           ₹
                           {currPrintItem?.sale
                              ?.reduce(
                                 (total, item) =>
                                    total + Number(item?.discountAmount),
                                 0
                              )
                              .toFixed(2)}
                        </h2>
                     </div>
                     <div>
                        <h2>Discount(%)</h2>
                        <h2>
                           {currPrintItem?.sale
                              ?.reduce((total, item) => {
                                 let discountPercentage =
                                    +item?.discountpersant || 0;
                                 return (
                                    total +
                                    (discountPercentage
                                       ? Number(discountPercentage)
                                       : 0)
                                 );
                              }, 0)
                              .toFixed(2)}{" "}
                           %
                        </h2>
                     </div>
                     {/* Total */}
                     <div
                        id={css.totalFooterOuter}
                        style={{
                           backgroundColor: storedPrintData?.layoutColor,
                           color: "white",
                        }}
                     >
                        <h2>Total</h2>
                        <h2>
                           ₹{" "}
                           {(
                              calculateTotal() -
                              currPrintItem?.sale?.reduce(
                                 (total, item) =>
                                    total + Number(item?.discountAmount),
                                 0
                              )
                           ).toFixed(2)}{" "}
                        </h2>
                     </div>
                  </div>

                  <div>
                     {isFullyPaid === "Paid" ? (
                        <div className={css.watermark}>Paid</div>
                     ) : (
                        <div className={css.watermark}>Unpaid</div>
                     )}
                  </div>
                  {/* Signature Section */}
                  {storedPrintData?.showPrintSignatureText && (
                     <div className={css.SignOuterDiv}>
                        <h2>For : {storedPrintData?.companyName}</h2>
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
                  <h2 style={{ color: storedPrintData?.layoutColor }}>
                     {storedPrintData?.companyName?.toUpperCase()}
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
                        <h3>
                           {currPrintItem?.billingName || "Classic enterprises"}
                        </h3>
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
                           Invoice No.: {currPrintItem?.invoiceNumber}
                        </h2>
                        <h2>
                           Date:{" "}
                           {currPrintItem?.invoiceDate
                              ? FormatDate(currPrintItem?.invoiceDate)
                              : "Not available"}
                        </h2>
                        <h2>Invoice Amount : ₹ {currPrintItem?.total}</h2>
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

export default InvoicePrint;
