import React, { useEffect, useState } from "react";
import Addpurchaseitem from "./Addpurchaseitem";
import "./Addpurchase.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { addPurchaseBill } from "../../../Redux/purchase/action";
import { getitems } from "../../../Redux/items/actions";
import axios from "axios";

const Purchase = () => {
   const store = useSelector((store) => store);
   const item = store.ItemReducer;
   console.log(item);
   const dispatch = useDispatch();
   const userId = localStorage.getItem("userId")



   const mobileNumber = 75210256;
   const [data, setData] = useState({
      partyName: "",
      number: mobileNumber,
      billNumber: 0,
      date: "",
      state: "",
   });

   useEffect(() => {
      dispatch(getitems());
   }, []);

   const getData = (id)=>{
     axios.get(`https://ca-backend-api.onrender.com/${userId}/item/allItem/${id}`)
    .then((res)=>{console.log(res)
    
    })
    .catch((err)=>console.log(err))
  }

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevFormData) => ({
         ...prevFormData,
         [name]: value,
      }));
   };

   const handleSave = () => {
      console.log(data);
      dispatch(addPurchaseBill());
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
                     {item.items.data?.map((e) => (
                        <option key={e.itemName} value={e._id}>
                           {e.itemName}
                        </option>
                     ))}
                  </select>

                  <input
                     type="text"
                     name="number"
                     placeholder="Phone no."
                     value={data.number}
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
