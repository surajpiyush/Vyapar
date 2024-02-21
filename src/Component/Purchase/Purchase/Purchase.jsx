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

   const handleSave = () => {
      console.log(data);
      dispatch(addPurchaseBill(data));
      // alert("added Succesfully")
      navigate("/purchasebill");
   };
   const [data, setData] = useState({
      partyName: "Krishan",
      phoneNumber: 1234567890,
      poNo: "PO123",
      poDate: "2024-02-16T00:00:00.000Z",
      eWayBill: "EWB123",
      billNumber: "BILL123",
      billDate: new Date(),
      time: "10:00 AM",
      paymentTerms: "Net 30",
      dueDate: "2024-03-17T00:00:00.000Z",
      stateOfSupply: "Some State",
      priceUnitWithTax: true,
      sale: [
         {
            category: "65c5cfc509b34ca8a0187497",
            itemName: "mobile",
            itemCode: "001",
            hsnCode: "HSN001",
            serialNo: "SN001",
            description: "Description of item 1",
            batchNo: 1,
            modelNo: 123,
            expDate: "2025-02-16T00:00:00.000Z",
            mfgDate: new Date(),

            customField: "Custom field 1",
            size: "Large",
            qty: 10,
            unit: "pcs",
            priceUnit: 100,
            discountpersant: 5,
            discountAmount: 5,
            taxPersant: "12%",
            taxAmount: 12,
            amount: 950,
         },
      ],
      paymentType: [
         {
            cash: 800,
            cheque: {
               refreanceNo: "REF123",
               checkAmount: 150,
            },
            bankDetail: {
               accountName: "ABC Bank",
               openingBalance: 5000,
               asOfDate: new Date(),
            },
            default: "cash",
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
            console.log(res.data.data.party[0].p);
            // setData(res.data.data.party);
            setOpen(res.data.data.party[0]?.openingBalance);
            setData({
               ...data,
               phoneNumber: res?.data?.data?.party[0]?.phoneNumber,
               partyName: res?.data?.data?.party[0]?.partyName,
            });
         })
         .catch((err) => console.log(err));
   };

   return (
      <div className="addpurchase-container">
         <section className="addpurchase-section-top">
            <h4>Purchase</h4>
            <div className={css.middleOuter}>
               <div className={css.leftSideCont}>
                  <div className={css.selectOuter}>
                     {/* -----------<<<<<<<<<<< Search box >>>>>>>>>>>>------------- */}
                     {/* <div
                        className="search-box-container"
                        onClick={() => setVisible(true)}
                       >
                        <input
                           type="text"
                           value={searchInput} className={css.selectTag}
                           onChange={handleSearchChange}
                           placeholder="Search for your company"
                           // className="search-box"
                        />
                        {visible ? (
                           <div className="suggestions-container">
                              {suggestedParties.map((party) => (
                                 <div
                                    key={party.id}
                                    className="suggestion-item"
                                    onClick={() => handlePartySelect(party)}
                                 >
                                    {party.partyName}
                                 </div>
                              ))}
                           </div>
                        ) : (
                           ""
                        )}
                     </div> */}
                     <select
                        value={partiesData.partyName}
                        // onChange={handleInputChange}
                        className={css.selectTag}
                        placeholder="test"
                        name="partyName"
                        onChange={(e) => {
                           const selectedParty = partiesData.find(
                              (party) => party.partyName === e.target.value
                           );

                           if (selectedParty) {
                              const partyId = selectedParty?._id?.toString();
                              getData(partyId);
                              setData({
                                 ...data,
                                 partyName: selectedParty.partyName,
                              });
                           }
                        }}
                     >
                        <option value="">{"Party Name"}</option>
                        {partiesLoading ? (
                           <option value="">Loading Parties</option>
                        ) : (
                           partiesData?.map((party) => (
                           <option key={party.id} value={party.partyName}>
                              {party.partyName}
                           </option>
                        ))
                        )}
                     </select>
                    
                  </div>
                  <div className={css.inputDiv}>
                     {" "}
                     <p>Balance: {open ? open : 0}</p>
                  </div>
                  <div className={css.inputDiv}>
                     <input
                        type="text"
                        name="number"
                        placeholder="Phone no."
                        value={data.phoneNumber}
                        className={css.input}
                        // onChange={handleChange}
                     />
                     <label
                        htmlFor=""
                        className={
                           data.phoneNumber
                              ? css.activeLabel
                              : css.inactiveLabel
                        }
                     >
                        Phone No.
                     </label>
                  </div>
                  
               </div>

               <div className={css.rightSideCont}>
                  <div>
                     <p>Invoice Number</p>
                     <input
                        type="text"
                        placeholder="1"
                        className={css.invoiceNumInp}
                     />
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
                        <option value="Arunachal Pradesh">
                           Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                           Himachal Pradesh
                        </option>
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
         </section>
         <section>
            <Addpurchaseitem data={data} />
         </section>
         <section className="addpurchase-footer">
            <div>
               <select name="" id="">
                  <option value="">Share</option>
               </select>
            </div>
            <div>
               <button
                  onClick={() => {
                     console.log("Clicked");
                     handleSave();
                  }}
               >
                  Save
               </button>
            </div>
         </section>
      </div>
   );
};

export default Purchase;
