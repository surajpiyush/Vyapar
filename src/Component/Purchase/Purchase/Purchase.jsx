import css from "../../../styles/SalesStyles/SalesForms.module.css";
import React, { useEffect, useState } from "react";
import Addpurchaseitem from "./Addpurchaseitem";
import "./Addpurchase.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { addPurchaseBill } from "../../../Redux/purchase/action";
import { getitems } from "../../../Redux/items/actions";
import axios from "axios";
import { FetchAllParties } from "../../../Redux/parties/actions";
import { useNavigate } from "react-router-dom";
import { CiGlass } from "react-icons/ci";
import PurchaseBill from "../../../Page/Purchase/Purchasebill";

const Purchase = () => {
   const [searchInput, setSearchInput] = useState("");
   const [visible, setVisible] = useState(false);
   const store = useSelector((store) => store);
   const partiesData = useSelector((state) => state.PartiesReducer.partiesData);
   const [suggestedParties, setSuggestedParties] = useState([...partiesData]);
   // console.log(partiesData);
   const isLoading = useSelector((state) => state.SalesReducer.isLoading);
   const partiesLoading = useSelector(
      (state) => state.PartiesReducer.isLoading
   );
   const token = localStorage.getItem("token");
   const item = store.ItemReducer;
   const party = store.PurchaseReducer;
   // console.log(party);
   const dispatch = useDispatch();
   const companyID = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   const navigate = useNavigate();

   const handleSearchChange = (e) => {
      // setVisible(true)
      const inputValue = e.target.value;
      setSearchInput(inputValue);

      // Filter parties based on the input value
      const filteredParties = partiesData.filter((party) =>
         party.partyName.toLowerCase().includes(inputValue.toLowerCase())
      );

      setSuggestedParties(filteredParties);
   };

   const handlePartySelect = (selectedParty) => {
      // Handle party selection logic here
      console.log("Selected party:", selectedParty);
   };
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setData((prev) => {
         return { ...prev, [name]: value };
      });
   };

   // const handleSave = () => {
   // console.log(data);
   // dispatch(addPurchaseBill(data));
   // // alert("added Succesfully")
   // navigate("/purchasebill");
   // };
   const [data, setData] = useState({
      partyName: "Krishan",
      phoneNumber: "",
      poNo: "PO123",
      poDate: new Date().toISOString().split("T")[0],
      eWayBill: "EWB123",
      billNumber: "BILL123",
      billDate: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
         hour: "2-digit",
         minute: "2-digit",
         hour12: false,
      }),
      paymentTerms: "Net 30",
      dueDate: "2024-03-17T00:00:00.000Z",
      stateOfSupply: "Some State",
      priceUnitWithTax: true,
      sale: [],
      paymentType: [
         {
           types: String,
           amount: 450,
         },
         {
           types: String,
           amount: 1520,
           refreanceNo: String,
         },
         {
           types: String,
           accountName: String,
           openingBalance: 1000,
           asOfDate: Date,
         },
       ],
      addDescription: "Additional description here",
      discount: {
         discountPersent: 2,
         discountAmount: 2,
      },
      tax: {
         tax: "GST",
         taxamount: 10,
      },
      roundOff: 0,
      total: 950,
      paid: 950,
      balance: 0,
   });

   useEffect(() => {
      FetchAllParties(dispatch);
   }, [visible]);
   const [open, setOpen] = useState(0);
   const getData = (id) => {
      // console.log(id);
      axios
         .get(`https://ca-backend-api.onrender.com/${companyID}/party/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => {
            // console.log(res.data.data.party[0].p);
            // setData(res.data.data.party);
            setOpen(res.data.data.party[0]?.openingBalance);
            setData({
               ...data,
               balance: res.data.data.party[0]?.openingBalance,
               phoneNumber: res?.data?.data?.party[0]?.phoneNumber,
               partyName: res?.data?.data?.party[0]?.partyName,
            });
         })
         .catch((err) => console.log(err));
   };

   return (
      // <div className="addpurchase-container">
      //    <section className="addpurchase-section-top">
      //       <h4>Purchase</h4>
      //       <div className={css.middleOuter}>
      //          <div className={css.leftSideCont}>
      //             <div className={css.selectOuter}>
      //                {/* -----------<<<<<<<<<<< Search box >>>>>>>>>>>>------------- */}

      //                <select
      //                   value={partiesData.partyName}
      //                   // onChange={handleInputChange}
      //                   className={css.selectTag}
      //                   placeholder="test"
      //                   name="partyName"
      //                   onChange={(e) => {
      //                      const selectedParty = partiesData.find(
      //                         (party) => party.partyName === e.target.value
      //                      );

      //                      if (selectedParty) {
      //                         const partyId = selectedParty?._id?.toString();
      //                         getData(partyId);
      //                         setData({
      //                            ...data,
      //                            partyName: selectedParty.partyName,
      //                         });
      //                      }
      //                   }}
      //                >
      //                   <option value="">{"Party Name"}</option>
      //                   {partiesLoading ? (
      //                      <option value="">Loading Parties</option>
      //                   ) : (
      //                      partiesData?.map((party) => (
      //                         <option key={party.id} value={party.partyName}>
      //                            {party.partyName}
      //                         </option>
      //                      ))
      //                   )}
      //                </select>
      //             </div>
      //             <div className={css.inputDiv}>
      //                {" "}
      //                <p>Balance: {open ? open : 0}</p>
      //             </div>
      //             <div className={css.inputDiv}>
      //                <input
      //                   type="text"
      //                   name="number"
      //                   placeholder="Phone No."
      //                   value={data.phoneNumber}
      //                   className={css.input}
      //                   // onChange={handleChange}
      //                />
      //                <label
      //                   htmlFor=""
      //                   className={
      //                      data.phoneNumber
      //                         ? css.activeLabel
      //                         : css.inactiveLabel
      //                   }
      //                >
      //                   Phone No.
      //                </label>
      //             </div>
      //          </div>
               // <div className={css.selectOuter}>
               //    <div className={css.inputDiv}>
               //       <label   
               //          htmlFor="PO No"
               //          className={
               //             data.phoneNumber
               //                ? css.activeLabel
               //                : css.inactiveLabel
               //          }
               //       >
               //          PO No.
               //       </label>
               //       <input
               //          type="text"
               //          name="poNo"
               //          // placeholder="PO No."
               //          // value={data.phoneNumber}
               //          className={css.input}
               //          // onChange={handleChange}
               //       />
               //    </div>
               //    <br />
               //    <div className={css.inputDiv}>
               //       <label
               //          htmlFor="PO Date"
               //          className={
               //             data.phoneNumber
               //                ? css.activeLabel
               //                : css.inactiveLabel
               //          }
               //       >
               //          PO Date
               //       </label>
               //       <input
               //          type="Date"
               //          name="poDate"
               //          // placeholder="PO Date"
               //          defaultValue={new Date().toISOString().split("T")[0]}
               //          className={css.input}
               //          onChange={(e) => handleInputChange(e)}
               //       />
               //    </div>
               //    <br />
               //    <div className={css.inputDiv}>
               //       <label
               //          htmlFor="PO No"
               //          className={
               //             data.phoneNumber
               //                ? css.activeLabel
               //                : css.inactiveLabel
               //          }
               //       >
               //          E-Way Bill
               //       </label>
               //       <input
               //          type="text"
               //          name="eWayBill"
               //          onChange={(e) => handleInputChange(e)}
               //          className={css.input}
               //       />
               //    </div>
               // </div>

               // <div className={css.rightSideCont}>
               //    <div>
               //       <p>Bill Number</p>
               //       <input
               //          type="text"
               //          placeholder="1"
               //          className={css.invoiceNumInp}
               //          onChange={(e) => handleInputChange(e)}
               //          name="billNumber"
               //       />
               //    </div>
               //    <div>
               //       <p>Bill Date</p>
               //       <input
               //          type="date"
               //          placeholder="Invoice Date"
               //          className={css.invoiceDateSelectInp}
               //          onChange={(e) => handleInputChange(e)}
               //          name="billDate"
               //          defaultValue={new Date().toISOString().split("T")[0]}
               //       />
               //    </div>
               //    <div>
               //       <p>Time</p>
               //       <input
               //          type="time"
               //          placeholder="Invoice Time"
               //          className={css.invoiceDateSelectInp}
               //          onChange={(e) => handleInputChange(e)}
               //          name="time"
               //          defaultValue={new Date().toLocaleTimeString("en-US", {
               //             hour: "2-digit",
               //             minute: "2-digit",
               //             hour12: false,
               //          })}
               //       />
               //    </div>

               //    <div>
               //       <p>Payment Terms</p>
               //       <select
               //          name="paymentTerms"
               //          onChange={(e) => handleInputChange(e)}
               //       >
               //          <option value="">Due On Recipt</option>
               //          <option value="net 15">Net 15</option>
               //          <option value="net 30">Net 30</option>
               //          <option value="net 45">Net 45</option>
               //          <option value="net 60">Net 60</option>
               //       </select>
               //    </div>
               //    <div>
               //       <p>Due Date</p>
               //       <input
               //          type="date"
               //          placeholder="Due Date"
               //          className={css.invoiceDateSelectInp}
               //          onChange={(e) => handleInputChange(e)}
               //          name="dueDate"
               //       />
               //    </div>
               //    <div>
               //       <p>State of supply</p>
               //       <select
               //          name="stateOfSupply"
               //          id=""
               //          className={css.invoiceDateSelectInp}
               //          onSelect={(e) => handleInputChange(e)}
               //       >
               //          <option value="">State</option>
               //          <option value="Andhra Pradesh">Andhra Pradesh</option>
               //          <option value="Arunachal Pradesh">
               //             Arunachal Pradesh
               //          </option>
               //          <option value="Assam">Assam</option>
               //          <option value="Bihar">Bihar</option>
               //          <option value="Chhattisgarh">Chhattisgarh</option>
               //          <option value="Goa">Goa</option>
               //          <option value="Gujarat">Gujarat</option>
               //          <option value="Haryana">Haryana</option>
               //          <option value="Himachal Pradesh">
               //             Himachal Pradesh
               //          </option>
               //          <option value="Jharkhand">Jharkhand</option>
               //          <option value="Karnataka">Karnataka</option>
               //          <option value="Kerala">Kerala</option>
               //          <option value="Madhya Pradesh">Madhya Pradesh</option>
               //          <option value="Maharashtra">Maharashtra</option>
               //          <option value="Manipur">Manipur</option>
               //          <option value="Meghalaya">Meghalaya</option>
               //          <option value="Mizoram">Mizoram</option>
               //          <option value="Nagaland">Nagaland</option>
               //          <option value="Odisha">Odisha</option>
               //          <option value="Punjab">Punjab</option>
               //          <option value="Rajasthan">Rajasthan</option>
               //          <option value="Sikkim">Sikkim</option>
               //          <option value="Tamil Nadu">Tamil Nadu</option>
               //          <option value="Telangana">Telangana</option>
               //          <option value="Tripura">Tripura</option>
               //          <option value="Uttar Pradesh">Uttar Pradesh</option>
               //          <option value="Uttarakhand">Uttarakhand</option>
               //          <option value="West Bengal">West Bengal</option>
               //          <option value="Andaman and Nicobar Islands">
               //             Andaman and Nicobar Islands
               //          </option>
               //          <option value="Chandigarh">Chandigarh</option>
               //          <option value="Dadra and Nagar Haveli">
               //             Dadra and Nagar Haveli
               //          </option>
               //          <option value="Daman and Diu">Daman and Diu</option>
               //          <option value="Lakshadweep">Lakshadweep</option>
               //          <option value="Delhi">Delhi</option>
               //          <option value="Puducherry">Puducherry</option>
               //       </select>
               //    </div>
               // </div>
      //       </div>
      //    </section>
      //    <br />
      //    <br />

      //    <section>
      //    </section>
      // </div>
      <>
      {/* <PurchaseBill /> */}
            {/* <Addpurchaseitem /> */}
         {/* <PurchaseForm /> */}
      </>
   );
};

export default Purchase;
