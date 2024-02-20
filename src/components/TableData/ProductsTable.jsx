import React, { useEffect, useState } from "react";
import "../../styles/parties.css";
import { useDispatch, useSelector } from "react-redux";
import { getitems } from "../../Redux/items/actions";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import { LuFilter as FilterIcon } from "react-icons/lu";
import { IoIosArrowRoundUp as UpArrowIcon } from "react-icons/io";
import axios from "axios";
import { tab } from "@testing-library/user-event/dist/tab";

export default function ProductsTable(Props) {
   const [data, setData] = useState([]);
   const dispatch = useDispatch();
   const [status, setStatus] = useState(true);
   const [searchTerm, setSearchTerm] = useState("");
   const [filteredItems, setFilteredItems] = useState([]);
   const [tableData, setTableData] = useState([]);
   const items = useSelector((store) => store.ItemReducer);
   // console.log(items)
   const companyId = localStorage.getItem("userId");
   const token = localStorage.getItem("token");
   // console.log(items);
   //-----------<<<<<<<<<<<<<<<<<<<<<<<<GETING THE DATA FROM BACKEND>>>>>>>>>>>>>>>>>>>>>>-------------
   useEffect(() => {
      dispatch(getitems()).then((res) => {
         // console.log(res.data);
         setData(res.data.data);
         
      });
   }, [dispatch]);
   // console.log(data)

   const openForm = () => {
      console.log("Working");
      Props.func(true);
   };

   const openAdjustItem = () => {
      Props.adjustForm(true);
   };
   const handleShow = (item) => {
      console.log(item);
      axios
         .get(
            `https://ca-backend-api.onrender.com/${companyId}/item/itemById/${item._id}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         )
         .then((res) => {
            console.log(res.data.data.allData);
            setTableData(res.data.data.allData.purchaseBill);
         })
         .catch((err) => {
            console.error("Error fetching item by ID:", err);
         });
   };

   //----------------<<<<<<<<<<<<<<<<<<<<<<<Searching>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>---------------
   const handleSearch = (e) => {
      const searchTerm = e.target.value.toLowerCase();
      setSearchTerm(searchTerm);
      const filteredData = data.filter((item) =>
         item.itemName.toLowerCase().includes(searchTerm)
      );

      setFilteredItems(filteredData);
   };

   const handleStatusToggle = (index) => {
      const updatedTableData = [...tableData];
      updatedTableData[index].status = !updatedTableData[index].status;
      setTableData(updatedTableData);
   };

   return (
      <div className="" style={{ width: "100vw" }}>
         <div className="d-flex">
            <div className="grp-cont1">
               {/* <div className="d-flex" style={{marginTop : "20px"}}>
            <div className="imp-icon-cont">
              <i className="fa fa-address-book-o" style={{color : "orange"}}></i>
            </div>
            <div className="imp-content">
              <h4>Import Parties</h4>
              <p>Use contact from your Phone or Gmail to create parties.</p>
            </div>
          </div> */}
               <div className="" style={{ marginTop: "20px" }}>
                  <div className="d-around">
                     <input
                        type="text"
                        className="search-party"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearch}
                     />
                     <button className="add-party-btn" onClick={openForm}>
                        + Add Products <i className="fa fa-angle-down"></i>
                     </button>
                  </div>
               </div>
               <div
                  className=""
                  style={{ marginTop: "20px", textAlign: "center" }}
               >
                  <table
                     className="partiestable-outer"
                     style={{ marginTop: "20px", textAlign: "center" }}
                  >
                     <thead>
                        <tr>
                           <th>
                              <span>
                                 <UpArrowIcon />
                                 <p>ITEM</p>
                              </span>
                              <FilterIcon />
                           </th>
                           <th>QUANTITY</th>
                        </tr>
                     </thead>
                     <tbody>
                        {items.isLoading ? (
                           <BasicSpinner
                              style={{
                                 width: "200%",
                                 margin: "60px auto",
                                 fontSize: "30px",
                              }}
                           />
                        ) : !searchTerm ? (
                           data.map((e, index) => (
                              <tr
                                 key={index}
                                 onClick={() => {
                                    handleShow(e);
                                 }}
                              >
                                 <td>{e.itemName}</td>
                                 <td>
                                    {Math.floor(Math.random() * 10) +
                                       Math.floor(Math.random() * 10)}
                                 </td>
                                 {/* <td>{e.category}</td> */}
                              </tr>
                           ))
                        ) : (
                           filteredItems?.map((e, index) => (
                              <tr key={index}>
                                 <td>{e.itemName}</td>
                                 <td>
                                    {Math.floor(Math.random() * 10) +
                                       Math.floor(Math.random() * 10)}
                                 </td>
                                 {/* <td>{e.category}</td> */}
                              </tr>
                           ))
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
            <div className="grp-cont2">
               <div className="grp-cont2a">
                  <div className="">
                     <div className="d-between">
                        <p>
                           NAME <i className="fa fa-reply"></i>
                        </p>
                        <button
                           className="party-button"
                           onClick={openAdjustItem}
                        >
                           Adjust Item
                        </button>
                     </div>
                     <div className="d-between">
                        <p>Sales Price: $0.00</p>
                        <p>Stock Quantity: $0.00</p>
                     </div>
                     <div className="d-between">
                        <p>Purchase Price: $0.00</p>
                        <p>Stock Value: $0.00</p>
                     </div>
                  </div>
               </div>
               <div className="grp-cont2b">
                  <div className="d-between">
                     <h3>Transactions</h3>
                     <input
                        type="text"
                        placeholder="Search"
                        className="search-party"
                        style={{ width: "200px" }}
                     />
                  </div>
                  <div className="">
                     <table>
                        <thead>
                           <tr>
                              <th>
                                 Type <i className="fa fa-filter"></i>
                              </th>
                              <th>
                                 Invoice/Ref <i className="fa fa-filter"></i>
                              </th>
                              <th>
                                 Name <i className="fa fa-filter"></i>
                              </th>
                              <th>
                                 Date <i className="fa fa-filter"></i>
                              </th>
                              <th>
                                 Quantity <i className="fa fa-filter"></i>
                              </th>
                              <th>
                                 Price/Unit <i className="fa fa-filter"></i>
                              </th>
                              <th>
                                 Status <i className="fa fa-filter"></i>
                              </th>
                           </tr>
                        </thead>

                        {items.isLoading ? (
                           <BasicSpinner
                              style={{
                                 width: "200%",
                                 margin: "60px auto",
                                 fontSize: "30px",
                              }}
                           />
                        ) : (
                           <tbody>
                              {!tableData.length ? (
                                 <h1>There are no transections</h1>
                              ) : (
                                 tableData?.map((e, index) => (
                                    <tr key={index}>
                                       <td>{e.type}</td>
                                       <td>{e.invoiceOrRefNo}</td>
                                       <td>{e.name}</td>
                                       <td>{new Date(e.date).toLocaleDateString()}</td>

                                       <td>{e.quantity}</td>
                                       <td>-</td>
                                       <td>
                                          <button
                                             style={{ border: "none" }}
                                             onClick={() =>
                                                handleStatusToggle(index)
                                             }
                                          >
                                             {e.status ? "Paid" : "Unpaid"}
                                          </button>
                                       </td>
                                    </tr>
                                 ))
                              )}
                           </tbody>
                        )}
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
