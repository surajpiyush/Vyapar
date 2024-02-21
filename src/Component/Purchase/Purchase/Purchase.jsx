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
   const store = useSelector((store) => store);
   const partiesData = useSelector((state) => state.PartiesReducer.partiesData);
   // console.log(partiesData);
const token = localStorage.getItem("token")
   const item = store.ItemReducer;
   const party = store.PurchaseReducer;
   // console.log(party);
   const dispatch = useDispatch();
   const companyID = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   const navigate = useNavigate();

   const handleSave = () => {
      console.log(data)
      dispatch(addPurchaseBill(data))
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
   }, []);
   const [open,setOpen] = useState(0)
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
            setOpen(res.data.data.party[0]?.openingBalance)
            setData({
               ...data,
               phoneNumber: res?.data?.data?.party[0]?.phoneNumber,
               partyName:res?.data?.data?.party[0]?.partyName,
            });
         })
         .catch((err) => console.log(err));
   };

   return (
      <div className="addpurchase-container">
         <section className="addpurchase-section-top">
            <h4>Purchase</h4>
            <section className="addpurchase-section-top-section">
               <aside className="addpurchase-section-top-section-select">
                  <select
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
                     className="addpurchase-section-select"
                  >
                  <option value="Select">Select Your comapny</option>
                     {partiesData?.map((party) => (
                        <option key={party.id} value={party.partyName}>
                           {party.partyName}
                        </option>
                     ))}
                  </select>

                  <p>
                     Balance: {open ? open : 0}
                  </p>
                  <input
                     type="text"
                     name="number"
                     placeholder="Phone no."
                     value={data.phoneNumber}
                     // onChange={handleChange}
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
                        // onChange={handleChange}
                     />
                  </div>
                  <div className="addpurchasebill-aside-items">
                     <p className="addpurchasebill-aside-items-bill">
                        Bill Date:
                     </p>
                     <input
                        type="date"
                        name="date"
                        // onChange={handleChange}
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
                        // onChange={handleChange}
                     >
                        <option value="#">Some State</option>
                        <option value="#">Some State</option>
                     </select>
                  </div>
               </aside>
            </section>
         </section>
         <section>
            <Addpurchaseitem  />
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
