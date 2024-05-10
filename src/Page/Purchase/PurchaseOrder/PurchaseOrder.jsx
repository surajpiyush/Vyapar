import css from "./PurchaseOrder.module.css";
import party from "../../../assets/Images/party.jpg";
import EditableRow from "../../../Component/EditForm";
import Loader3 from "../../../Component/Loaders/Loader3";
import Setting from "../../../Component/Setting/Setting";
import AddPurchaseOrderForm from "./AddPurchaseOrderForm";
import UpperControlPanel from "../../../Component/UpperControlPanel/UpperControlPanel";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import {
   DeletePurchaseOrder,
   GetAllPurchaseOrder,
   UpdatePurchaseOrder,
} from "../../../Redux/purchase/action";
import {
   EditIcon,
   CrossIcon,
   PlusIcon2,
   SearchIcon,
   CloseIcon2,
   DeleteIcon2,
   CalculatorIcon,
   SettingsIconOutline2,
} from "../../../assets/Icons/ReactIcons";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PurchaseOrder = () => {
   const toast = useToast();
   const dispatch = useDispatch();
   const [paidAmount, setPaidAmount] = useState(0);
   const [unpaidAmount, setUnpaidAmount] = useState(0);
   const toggleAddPaymentOrderSuccess = useSelector(
      (state) => state.PurchaseReducer.toggleAddPaymentOrderSuccess
   );
   const getAllPurchaseOrderLoading = useSelector(
      (state) => state.PurchaseReducer.getAllPurchaseOrderLoading
   );
   const purchaseOrderData = useSelector(
      (store) => store?.PurchaseReducer?.purchaseOrderData
   );
   console.log("this is purchaseOrderData",purchaseOrderData)
   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState(null);
   const [openForm, setOpenForm] = useState(false);
   const [toggleSetting, setToggleSetting] = useState(false);
   const[select,setSelect]=useState()
   const[items,setItems]=useState()
   const currentDate = new Date();
   const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
   );
   useEffect(()=>{setItems(purchaseOrderData)},[purchaseOrderData])
   const formattedStartDate = startOfMonth.toISOString().split("T")[0];
   const [startDate, setStartDate] = useState(formattedStartDate);
   const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
   );



	useEffect(() => {
		let paid = 0;
		let unpaid = 0;
		purchaseOrderData?.forEach((item) => {
			paid += item?.total || 0;
			unpaid += item?.balanceDue || 0;
		});
		setPaidAmount(paid);
		setUnpaidAmount(unpaid);
	}, [toggleAddPaymentOrderSuccess]);


   // To Get All Payment Out Data
   useEffect(() => {
      GetAllPurchaseOrder(dispatch, startDate, endDate);
   }, [toggleAddPaymentOrderSuccess, startDate, endDate]);

   // Handle Delete
   const handleDelete = (id) => {
      DeletePurchaseOrder(dispatch, id, toast, setIsEditing, setEditedData);
   };

   // Handle Edit
   const handleEdit = (data) => {
      setIsEditing(true);
      setEditedData(data);
   };

   // Update Request
   const handleUpdate = (updatedData) => {
      UpdatePurchaseOrder(
         dispatch,
         updatedData?._id,
         updatedData,
         toast,
         setIsEditing,
         setEditedData
      );
   };


const handleSelect=(e)=>{
   setSelect(e.target.value)
}

const filterDataByTime = (purchaseOrderData, timeInterval) => {
   const currentDate = new Date();
   const currentMonth = currentDate.getMonth();
   const currentYear = currentDate.getFullYear();
   let startDate, endDate;
   switch (timeInterval) {
     case "This Month":
       startDate = new Date(currentYear, currentMonth, 1);
       endDate = new Date(currentYear, currentMonth + 1, 0);
       break;
     case "Last Month":
       startDate = new Date(currentYear, currentMonth - 1, 1);
       endDate = new Date(currentYear, currentMonth, 0);
       break;
     case "This Quarter":
        startDate = new Date(currentYear, Math.floor(currentMonth / 3) * 3, 1);
         endDate = new Date(
         currentYear,
         Math.floor(currentMonth / 3) * 3 + 3,
         0
       );
       break;
     case "This Year":
       startDate = new Date(currentYear, 0, 1);
       endDate = new Date(currentYear, 11, 31);
       break;
     case "All":
       return purchaseOrderData;
     default:
       // Custom interval handling
       // Assuming timeInterval is in the format "YYYY-MM-DD"
       startDate = new Date(timeInterval);
       // Assuming you want to filter for the whole day
       endDate = new Date(
         startDate.getFullYear(),
         startDate.getMonth(),
         startDate.getDate(),
         23,
         59,
         59
       );
       break;
   }
   return purchaseOrderData.filter((item) => {
     const itemDate = new Date(item.date);
     return itemDate >= startDate && itemDate <= endDate;
   });
 };

useEffect(()=>{
   const data=filterDataByTime(purchaseOrderData,select)
   setItems(data)
},[select])
   // Cancel Update
   const handleCancel = () => {
      setIsEditing(false);
      setEditedData(null);
   };


const handleSearch=(e)=>{
  const query=e.target.value
if(query===''){
   setItems(purchaseOrderData)
}else{
   const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			const regex = new RegExp(escapedQuery, "i");
			const filteredInvoice = purchaseOrderData.filter((item) =>
				regex.test(item.partyName)
			);
			setItems(filteredInvoice);
}

}


useEffect(() => {
   const filteredData = purchaseOrderData.filter((item) => {
      // Convert item.invoiceDate to Date object
      const invoiceDate = new Date(item.date);
      console.log("this is invoiceDate", invoiceDate);
      // Parse startDate and endDate to Date objects
      const [startMonth, startDay, startYear] = startDate.split("/");
      const [endMonth, endDay, endYear] = endDate.split("/");
      const start = new Date(`${startMonth}/${startDay}/${startYear}`);
      const end = new Date(`${endMonth}/${endDay}/${endYear}`);
      // Compare dates
      return invoiceDate >= start && invoiceDate <= end;
   });
   setItems(filteredData);
   console.log("thuis is itemdate", items);
}, [startDate, endDate]);



   return getAllPurchaseOrderLoading ? (
      <Loader3 text="Loading Purchase Orders" />
   ) : (
      <div>
         {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

         <div className={css.navOuter}>
            <div className={css.navOptions}>ORDERS</div>
         </div>

         {/* Add Purchase Bill Form */}
         {openForm && (
            <div className={css.formOuter}>
               <div className={css.upperNav}>
                  <div>
                     <p className={css.activeForm}>
                        <span>Payment Order #1</span>
                        <CrossIcon />
                     </p>
                  </div>
                  <div>
                     <CalculatorIcon
                        onClick={() =>
                           toast({
                              title: "Feature currently in development",
                              status: "info",
                              position: "top",
                           })
                        }
                     />
                     <SettingsIconOutline2
                        onClick={() => setToggleSetting(true)}
                     />
                     <CloseIcon2 onClick={() => setOpenForm(false)} />
                  </div>
               </div>
               <AddPurchaseOrderForm
                  setOpenForm={setOpenForm}
                  // date={{ startDate, endDate }}
               />
            </div>
         )}

         <div className={css.Outer}>
            {/* Top Nav */}
            <div className={css.topNavOuter}>
				<div className={css.navTopADiv}>
					<select
						defaultValue="All"
						onChange={handleSelect}
						style={{backgroundColor:"#BFBFBF",padding:"3px 3px",borderRadius:"5px"}}
					>
						<option value="All">All Payment</option>
						<option value="This Month">This Month</option>
						<option value="Last Month">Last Month</option>
						<option value="This Quarter">This Quarter</option>
						<option value="This Year">This Year</option>
					</select>

					<div className={css.divContainingDateInps}>
						<h3>Between</h3>
						<div>
							<input
								type="date"
								value={startDate}
								onChange={(e) => setStartDate(e.target.value)}
							/>
							<p>To</p>
							<input
								type="date"
								value={endDate}
								onChange={(e) => setEndDate(e.target.value)}
							/>
						</div>
					</div>
					<select defaultValue="ALL FIRMS" className={css.navFirmsSelectTag}>
						<option value="ALL FIRMS">ALL FIRMS</option>
					</select>
				</div>
				<div className={css.navTopBDiv}>
					<div
						className={css.navCalculatedDivs}
						style={{ background: "var(--SemiTransparentMint)" }}
					>
						<h2>Paid</h2>
						<h3>
							₹{" "}
							{(paidAmount - unpaidAmount < 0
								? 0.0
								: paidAmount - unpaidAmount
							).toFixed(2)}
						</h3>
					</div>
					<div className={css.mathmaticalSigns}>+</div>
					<div
						className={css.navCalculatedDivs}
						style={{ background: "var(--blueC)" }}
					>
						<h2>Unpaid</h2>
						<h3>₹ {unpaidAmount.toFixed(2)}</h3>
					</div>
					<div className={css.mathmaticalSigns}>=</div>
					<div
						className={css.navCalculatedDivs}
						style={{ backgroundColor: "var(--GoldenBeige)" }}
					>
						<h2>Total</h2>
						<h3>₹ {paidAmount.toFixed(2)}</h3>
					</div>
				</div>
			</div>

            {/* Middle */}
            {purchaseOrderData?.length > 0 ? (
               <div className={css.ContentOuter}>
                  <div className={css.contentUpperNav}>
                     <div className={css.leftSideDivSaleOuter}>
                        <p>TRANSACTIONS</p>
                        <div className={css.saleOrderSearchDiv}>
                           <SearchIcon />
                           <div>
                              <input type="text" onChange={handleSearch} placeholder="Search..."/>
                           </div>
                        </div>
                     </div>
                     <div>
                        <button
                           type="button"
                           onClick={() => setOpenForm(true)}
                           className={css.addBtnCss}
                        >
                           <PlusIcon2 /> Add Purchase Order
                        </button>
                     </div>
                  </div>

                  <div className={css.contentTableOuterDiv}>
                     <table>
                        <thead>
                           <tr>
                              {[
                                 "#",
                                 "DATE",
                                 "NO.",
                                 "PARTYNAME",
                                 "DUE DATE",
                                 // "CATEGORY NAME",
                                 "TYPE",
                                 "TOTAL AMOUNT",
                                 "BALANCE",
                                 "STATUS",
                                 "ACTION",
                              ].map((item, index) => (
                                 <th key={index + item}>
                                    <div>{item}</div>
                                 </th>
                              ))}
                           </tr>
                        </thead>
                        <tbody>
                           {!getAllPurchaseOrderLoading &&
                              items?.map((item, ind) =>
                                 isEditing && editedData?._id === item._id ? (
                                    <tr
                                       style={{
                                          width: "80%",
                                          position: "relative",
                                       }}
                                       key={item?._id + ind}
                                    >
                                       <EditableRow
                                          display={[
                                             "#",
                                             "partyName",
                                             "orderNumber",
                                             "date",
                                             "dueDate",
                                             "total",
                                             "balance",
                                             "type",
                                             "status",
                                          ]}
                                          data={editedData}
                                          onSave={handleUpdate}
                                          onCancel={handleCancel}
                                       />
                                    </tr>
                                 ) : (
                                    <tr key={item?._id + ind}>
                                       <td>{ind + 1}</td>
                                       <td>
                                          {new Date(
                                             item?.date
                                          ).toLocaleDateString("en-IN", {
                                             day: "2-digit",
                                             month: "2-digit",
                                             year: "numeric",
                                          })}
                                       </td>
                                       <td>{item?.orderNumber || "-"}</td>
                                       <td>{item?.partyName}</td>
                                       {/* <td>{item?.categoryName || "-"}</td> */}
                                       <td>
                                          {new Date(
                                             item?.dueDate
                                          ).toLocaleDateString("en-IN", {
                                             day: "2-digit",
                                             month: "2-digit",
                                             year: "numeric",
                                          })}
                                       </td>
                                       <td>{item?.type || "-"}</td>
                                       <td style={{ textAlign: "right" }}>
                                          ₹{item?.total || 0}
                                       </td>
                                       <td style={{ textAlign: "right" }}>
                                          ₹{item?.balance || 0}
                                       </td>
                                       <td>{item?.status || "-"}</td>
                                       <td>
                                          <div className={css.actionDivContent}>
                                             <button
                                                onClick={() =>
                                                   handleDelete(item._id)
                                                }
                                             >
                                                <DeleteIcon2 />
                                             </button>
                                             <button
                                                onClick={() => handleEdit(item)}
                                             >
                                                <EditIcon />
                                             </button>
                                          </div>
                                       </td>
                                    </tr>
                                 )
                              )}
                        </tbody>
                     </table>
                  </div>
               </div>
            ) : (
               <FirstTimeFormToggle
                  marginTop="10px"
                  height="67.25vh"
                  img={party}
                  onClick={() => setOpenForm(true)}
                  BtnText="Add Your First Purchase Order"
                  MiddleText="Make & share purchase orders with your parties & convert them to purchase bill instantly."
               />
            )}
         </div>
      </div>
   );
};

export default PurchaseOrder;
