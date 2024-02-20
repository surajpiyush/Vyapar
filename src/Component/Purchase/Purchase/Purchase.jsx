import React, { useEffect, useState } from "react";
import Addpurchaseitem from "./Addpurchaseitem";
import "./Addpurchase.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { addPurchaseBill } from "../../../Redux/purchase/action";
import { getitems } from "../../../Redux/items/actions";
import axios from "axios";
import { FetchAllParties } from "../../../Redux/parties/actions";
import { useNavigate } from "react-router-dom";

const Purchase = () => {
   const store = useSelector((store) => store);
   const partiesData = useSelector((state) => state.PartiesReducer.partiesData);
   // console.log(partiesData)
   const item = store.ItemReducer;
   const party = store.PartiesReducer;
   // console.log(party);
   const dispatch = useDispatch();
   const companyID = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   const token = localStorage.getItem("token");
   const userId = localStorage.getItem("userId");
   const navigate = useNavigate();
   const baseURL = "https://ca-backend-api.onrender.com";
   const d = {
      partyName: "Krishan",
      phoneNumber: 1234567890,
      poNo: "PO123",
      poDate: "2024-02-16T00:00:00.000Z",
      eWayBill: "EWB123",
      billNumber: "BILL123",
      billDate: "2024-02-16T00:00:00.000Z",
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
            mfgDate: "2023-02-16T00:00:00.000Z",
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
               asOfDate: "2024-02-16T00:00:00.000Z",
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
   };
   const handleSave = () => {
      axios
         .post(`${baseURL}/${companyID}/purchase/create`, d, {
            headers: { Authorization: `Bearer ${token}` },
         })
         .then((res) => {
            alert("Data added");
            navigate("/purchasebill");
         })
         .catch((err) => console.log(err));
   };
   const [data, setData] = useState({
      partyName: "",
      phoneNumber: "",
      billNumber: 0,
      date: "",
      state: "",
      openingBalance: "",
   });

   useEffect(() => {
      FetchAllParties(dispatch);
   }, [dispatch]);
console.log(data)
   const getData = (id) => {
      console.log(id);
      axios
         .get(`https://ca-backend-api.onrender.com/${companyID}/party/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => {
            console.log(res.data.data);
            setData(res.data.data.party);
         })
         .catch((err) => console.log(err));


         axios.get(`https://ca-backend-api.onrender.com/${companyID}/item/itemById/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }) 
         .then((res) => {
            console.log(res.data.data);
            // setData(res.data.data.party);
         })
         .catch((err) => console.log(err));
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevFormData) => ({
         ...prevFormData,
         [name]: value,
      }));
   };

   return (
      <div className="addpurchase-container">
         <section className="addpurchase-section-top">
            <h4>Purchase</h4>
            <section className="addpurchase-section-top-section">
               <aside className="addpurchase-section-top-section-select">
                  <select
                     name="partyName"
                     onChange={(e) => getData(e.target.value)}
                     className="addpurchase-section-select"
                  >
                     {partiesData?.map((e) => (
                        <option key={e.partyName} value={e._id}>
                           {e.partyName}
                        </option>
                     ))}
                  </select>
                  <p>
                     Balance: {data.openingBalance ? data.openingBalance : 0}
                  </p>
                  <input
                     type="text"
                     name="number"
                     placeholder="Phone no."
                     value={data.phoneNumber}
                     onChange={handleChange}
                  />
               </aside>
               <aside className="addpurchasebill-aside">
                  <div className="addpurchasebill-aside-items">
                     <p className="addpurchasebill-aside-items-bill">
                        Bill Number
                     </p>
                     {/* <p className='addpurchasebill-aside-items-p'></p> */}
                     <input
                        type="number"
                        name="billNumber"
                        className="addpurchasebill-aside-items-p"
                        onChange={handleChange}
                     />
                  </div>
                  <div className="addpurchasebill-aside-items">
                     <p className="addpurchasebill-aside-items-bill">
                        Bill Date:
                     </p>
                     <input
                        type="date"
                        name="date"
                        onChange={handleChange}
                        className="addpurchasebill-aside-items-bill-date"
                     />
                  </div>
                  <div className="addpurchasebill-aside-items">
                     <label
                        htmlFor="#"
                        className="addpurchasebill-aside-items-bill"
                     >
                        State Of supply
                     </label>
                     <select
                        name="state"
                        className="addpurchasebill-aside-items-bill-select"
                        onChange={handleChange}
                     >
                        <option value="#">Items</option>
                        <option value="#">Items</option>
                     </select>
                  </div>
               </aside>
            </section>
         </section>
         <section>
            <Addpurchaseitem data={data} setData= {setData} />
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
