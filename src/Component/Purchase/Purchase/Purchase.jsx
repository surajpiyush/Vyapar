import React, { useEffect, useState } from "react";
import Addpurchaseitem from "./Addpurchaseitem";
import "./Addpurchase.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { addPurchaseBill } from "../../../Redux/purchase/action";
import { getitems } from "../../../Redux/items/actions";
import axios from "axios";
import { FetchAllParties } from "../../../Redux/parties/actions";

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
   const mobileNumber = 75210256;
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
   }, []);

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
            <Addpurchaseitem data={data} />
         </section>
      </div>
   );
};

export default Purchase;
