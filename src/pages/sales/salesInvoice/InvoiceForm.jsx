import css from "../../../styles/SalesStyles/SalesForms.module.css";
import { PostSalesInvoice } from "../../../Redux/sales/action";
import { FetchAllParties } from "../../../Redux/parties/actions";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { IoIosArrowDown as ArrowDown } from "react-icons/io";

const InvoiceForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const partiesLoading = useSelector((state) => state.PartiesReducer.isLoading);
  const partiesData = useSelector((state) => state.PartiesReducer.partiesData);

  const [invoiceData, setInvoiceData] = useState({
    type: "Credit",
    status: "Pending",
    customerName: "",
    billingName: "John Doe",
    billingAddress: "",
    phoneNumber: "",
    eWayBill: "ABC123456",
    poNo: "PO123",
    poDate: "2024-02-09",
    invoiceNumber: "INV123",
    invoiceDate: "2024-02-09",
    time: "10:00 AM",
    paymentTerm: "Net 30",
    dueDate: "2024-03-10",
    stateOfSupply: "Some State",
    priceUnitWithTax: true,
    sale: [
      {
        category: "Category A",
        itemName: "mobile",
        itemCode: "ABC123",
        hsnCode: "HSN123",
        serialNo: "S123",
        description: "Description of item 1",
        batchNo: 1,
        modelNo: 123,
        expDate: "2025-02-09",
        mfgDate: "2023-01-01",
        customField: "Custom Field Value",
        size: "Size A",
        qty: 2,
        unit: "Nos",
        priceUnit: 100,
        discountpersant: 5,
        discountAmount: 10,
        taxPersant: "5%",
        taxAmount: 5,
        amount: 195,
      },
    ],
    paymentType: [
      {
        cash: 150,
        cheque: {
          refreanceNo: "CHK123",
          checkAmount: 200,
        },
        bankDetail: {
          accountName: "Account Name",
          openingBalance: 1000,
          asOfDate: "2024-02-09",
        },
      },
    ],
    addDescription: "Additional Description",
    discount: {
      discountPersent: 10,
      discountAmount: 20,
    },
    tax: {
      tax: "5%",
      taxamount: 5,
    },
    roundOff: 0,
    total: 195,
    recived: 350,
    balance: -155,
    firmId: "609c17662c40e244bc6ebd4a",
    userId: "609c17662c40e244bc6ebd4b",
  });

  // for fetching all parties list on form mount
  useEffect(() => {
    FetchAllParties(dispatch);
  }, []);

  // Input Change Function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = () => {
    PostSalesInvoice(dispatch, invoiceData);
  };

  return (
    <div className={css.formOuter}>
      <div className={css.topheader}>
        <p>Sale</p>
        <div>
          <h4
            style={{
              color: invoiceData.type == "Credit" ? "var(--blueA)" : "black",
            }}
          >
            Credit
          </h4>
          <div className={css.checkbox_wrapper_14}>
            <input
              id="s1-14"
              type="checkbox"
              className={css.switch}
              checked={invoiceData.type == "Cash"}
              onChange={(e) =>
                setInvoiceData((prev) => {
                  return {
                    ...prev,
                    type: e.target.checked ? "Cash" : "Credit",
                  };
                })
              }
            />
          </div>
          <h4
            style={{
              color: invoiceData.type == "Cash" ? "var(--blueA)" : "black",
            }}
          >
            Cash
          </h4>
        </div>
      </div>

      {/* Middle  */}
      <div className={css.middleOuter}>
        <div className={css.leftSideCont}>
          <div className={css.selectOuter}>
            <select
              name="customerName"
              value={invoiceData.customerName}
              onChange={handleInputChange}
              className={css.selectTag}
              placeholder="test"
            >
              <option value="">
                {invoiceData.type == "Credit"
                  ? "Search by Name/Phone"
                  : "Billing Name (Optional)"}
              </option>
              {partiesLoading ? (
                <option value="">Loading Parties</option>
              ) : (
                partiesData?.map((item, ind) => (
                  <option value={item.partyName} key={ind + item._id}>
                    {item.partyName}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className={css.inputDiv}>
            <input
              type="number"
              value={invoiceData.phoneNumber}
              name="phoneNumber"
              onChange={handleInputChange}
              className={css.input}
            />
            <label
              htmlFor=""
              className={
                invoiceData.phoneNumber ? css.activeLabel : css.inactiveLabel
              }
            >
              Phone No.
            </label>
          </div>

          {invoiceData.type == "Cash" && (
            <div className={css.inputDiv}>
              <textarea
                value={invoiceData.billingAddress}
                name="billingAddress"
                onChange={handleInputChange}
                className={css.input}
                style={{ height: "110px", width: "230px" }}
              />
              <label
                htmlFor=""
                className={
                  invoiceData.billingAddress
                    ? css.activeLabel
                    : css.inactiveLabel
                }
              >
                Billing Address
              </label>
            </div>
          )}
        </div>

        <div className={css.rightSideCont}>
          <div>
            <p>Invoice Number</p>
            <input type="text" placeholder="1" className={css.invoiceNumInp} />
          </div>
          <div>
            <p>Invoice Date</p>
            <input
              type="date"
              placeholder="Invoice Date"
              className={css.invoiceDateSelectInp}
            />
          </div>
          <div>
            <p>State of supply</p>
            <select
              name="stateofsupply"
              id=""
              className={css.invoiceDateSelectInp}
            >
              <option value="">State</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli">
                Dadra and Nagar Haveli
              </option>
              <option value="Daman and Diu">Daman and Diu</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Delhi">Delhi</option>
              <option value="Puducherry">Puducherry</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className={css.ItemsOuter}>
        <table>
          <thead>
            <tr>
              <th className={css.serialNumberHead}>#</th>
              <th className={css.itemNameHead}>ITEM</th>
              <th className={css.qtyHead}>QTY</th>
              <th className={css.unitHead}>UNIT</th>
              <th className={css.priceUnitHead}>
                <p>PRICE/UNIT</p>
                <select name="" id="">
                  <option value="">Without Tax</option>
                  <option value="">With Tax</option>
                </select>
              </th>
              <th className={css.discountHead}>
                <p>Discount</p>
                <div>
                  <p className={css.precentageIconHead}>%</p>
                  <p className={css.amountHead}>AMOUNT</p>
                </div>
              </th>
              <th className={css.taxHead}>
                <p>TAX</p>
                <div>
                  <p className={css.precentageIconHead}>%</p>
                  <p className={css.amountHead}>AMOUNT</p>
                </div>
              </th>
              <th className={css.amountHead}>
                <div>
                  <p>Amount</p>
                  <PlusIcon />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.sale?.map((item, ind) => (
              <tr key={ind + item?.itemName}></tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className={css.FooterOuter}>
        <button type="submit">{isLoading ? "Saving" : "Save"}</button>
        <div className={css.shareBtn}>
          <p>Share</p>
          <ArrowDown />
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
