import css from "./PurchaseBill.module.css";
import Setting from "../../../Component/Setting/Setting";
import party from "../../../assets/Images/party.jpg";
import Loader3 from "../../../Component/Loaders/Loader3";
import AddPurchaseBill from "./AddPurchaseBill";
import EditPurchaseForm from "../../../Component/Purchase/EditPurchaseForm";
import UpperControlPanel from "../../../Component/UpperControlPanel/UpperControlPanel";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import {
   GetAllPurchaseBill,
   GetSinglePurchaseBillData,
   deletePurchaseBill,
   updatePurchaseBill,
} from "../../../Redux/purchase/action";
import {
   CloseIcon2,
   DeleteIcon2,
   EditIcon,
   PlusIcon2,
   SearchIcon,
   CalculatorIcon,
   SettingsIconOutline2,
   CrossIcon,
} from "../../../assets/Icons/ReactIcons";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PurchaseBill = () => {
   const toast = useToast();
   const dispatch = useDispatch();
   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState(null);
   const [toggleSetting, setToggleSetting] = useState(false);
   const [openForm, setOpenForm] = useState(false);
   const currentDate = new Date();
   const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
   );
   const formattedStartDate = startOfMonth.toISOString().split("T")[0];
   const [startDate, setStartDate] = useState(formattedStartDate);
   const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
   );
   // Add Purchase Bill Toggle
   const toggleAddPurchaseBill = useSelector(
      (state) => state.PurchaseReducer.toggleAddPurchaseBill
   );
   // Get All Purchase Bill Loading
   const getAllPurchaseLoading = useSelector(
      (state) => state.PurchaseReducer.getAllPurchaseLoading
   );
   // Get All Purchase Bill Success Toggle
   const getAllPurchaseBillSuccess = useSelector(
      (state) => state.PurchaseReducer.getAllPurchaseBillSuccess
   );

   
   // Purchase Bill Data
   const PurchaseBillData = useSelector(
      (state) => state.PurchaseReducer.PurchaseBillData
   );
   console.log("this is PurchaseBillData",PurchaseBillData)
   const singlePurchaseBillData = useSelector(
      (store) => store.PurchaseReducer.singlePurchseData
   );
   const [paidAmount, setPaidAmount] = useState(0);
   const [unpaidAmount, setUnpaidAmount] = useState(0);
const[items,setItems]=useState()
const[select,setSelect]=useState()
useEffect(()=>{setItems(PurchaseBillData)},[PurchaseBillData])

const handleSelect=(e)=>{
   setSelect(e.target.value)
}

const filterDataByTime = (PurchaseBillData, timeInterval) => {
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
       return PurchaseBillData;
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
   return PurchaseBillData.filter((item) => {
     const itemDate = new Date(item.billDate);
     return itemDate >= startDate && itemDate <= endDate;
   });
 };


 useEffect(()=>{
   const data=filterDataByTime(PurchaseBillData,select)
   setItems(data)
 },[select])

const handleSearch=(e)=>{
       const query=e.target.value
   if(query===''){
setItems(PurchaseBillData)
   }else{
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			const regex = new RegExp(escapedQuery, "i");
			const filteredInvoice = PurchaseBillData.filter((item) =>
				regex.test(item.partyName)
			);
			setItems(filteredInvoice);
   }
      }
   useEffect(() => {
      let paid = 0;
      let unpaid = 0;
      PurchaseBillData?.forEach((item) => {
         paid += item?.amount - item?.balanceDue || 0;
         unpaid += item?.balanceDue || 0;
      });
      setPaidAmount(paid);
      setUnpaidAmount(unpaid);
   }, [getAllPurchaseBillSuccess]);

// console.log(PurchaseBillData)
   // To Get All Purchase Bill Data
   useEffect(() => {
      GetAllPurchaseBill(dispatch, startDate, endDate);
   }, [toggleAddPurchaseBill, startDate, endDate]);

   const handleEdit = (id) => {
      GetSinglePurchaseBillData(dispatch, id, toast, setIsEditing);
   };
   // console.log("Single data invposea;-",data)

   const handleSubmit = (updatedData) => {
      console.log("updatedData", updatedData);

      // dispatch(
      //    UPDATE_PURCHASEBILL_SUCCESS(updatedData._id, updatedData, () =>
      //       GetAllPurchaseBill(dispatch, startDate, endDate)
      //    )
      // );
      // setIsEditing(false);
      // setEditedData(null);
   };

   // Handle Delete
   const handleDelete = (id) => {
      dispatch(
         deletePurchaseBill(id, toast, () =>
            GetAllPurchaseBill(dispatch, startDate, endDate)
         )
      );
   };


	useEffect(() => {
		const filteredData = PurchaseBillData.filter((item) => {
			// Convert item.invoiceDate to Date object
			const invoiceDate = new Date(item.billDate);
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
 


   

   return getAllPurchaseLoading ? (
      <Loader3 text="Loading Purchase Bill" />
   ) : (
      <div className={css.Outer}>
         {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

         {/* Add Purchase Bill Form */}
         {openForm && (
            <div className={css.formOuter}>
               <div className={css.upperNav}>
                  <div>
                     <p className={css.activeForm}>
                        <span>Purchase Bill #1</span>
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
               <AddPurchaseBill
                  setOpenForm={setOpenForm}
                  // date={{ startDate, endDate }}
               />
            </div>
         )}

         {isEditing && (
            <div className={css.formOuter}>
               <div className={css.upperNav}>
                  <div>
                     <p className={css.activeForm}>
                        <span>Purchase Bill #1</span>
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
                     <CloseIcon2 onClick={() => setIsEditing(false)} />
                  </div>
               </div>
               <EditPurchaseForm data={singlePurchaseBillData} />
            </div>
         )}

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
         {PurchaseBillData?.length > 0 ? (
            <div className={css.ContentOuter}>
               <div className={css.contentUpperNav}>
                  <div className={css.leftSideDivSaleOuter}>
                     <p>TRANSACTIONS</p>
                     <div className={css.saleOrderSearchDiv}>
                        <SearchIcon />
                        <div>
                           <input type="text"  onChange={handleSearch} placeholder="Search..." />
                        </div>
                     </div>
                  </div>
                  <div>
                     <button
                        type="button"
                        onClick={() => setOpenForm(true)}
                        className={css.addBtnCss}
                     >
                        <PlusIcon2 /> Add Purchase
                     </button>
                  </div>
               </div>

               <div className={css.contentTableOuterDiv}>
                  <table>
                     <thead>
                        <tr>
                           {[
                              "DATE",
                              "INVOICE NO.",
                              "PARTY NAME",
                              "PAYMENT TYPE",
                              "AMOUNT",
                              "BALANCE DUE",
                              "STATUS",
                              "ACTION",
                           ].map((item, ind) => (
                              <th key={item + ind}>
                                 <div>{item}</div>
                              </th>
                           ))}
                        </tr>
                     </thead>

                     <tbody>
                        {!getAllPurchaseLoading &&
                           items?.map((item, ind) => (
                              <tr key={item?._id + ind}>
                                 <td>
                                    {new Date(
                                       item?.billDate
                                    ).toLocaleDateString("en-IN", {
                                       day: "2-digit",
                                       month: "2-digit",
                                       year: "numeric",
                                    })}
                                 </td>
                                 <td>{item?.billNumber}</td>
                                 <td>{item?.partyName}</td>
                                 <td>{item?.paymentType[0]?.types}</td>
                                 <td style={{ textAlign: "right" }}>
                                    ₹{item?.amount}
                                 </td>
                                 <td style={{ textAlign: "right" }}>
                                    ₹
                                    {item?.status === "Paid"
                                       ? 0
                                       : item?.balanceDue}
                                 </td>
                                 <td>{item?.status}</td>
                                 <td>
                                    <div className={css.actionDivContent}>
                                       <button
                                          onClick={() =>
                                             handleDelete(item?._id)
                                          }
                                       >
                                          <DeleteIcon2 />
                                       </button>
                                       <button
                                          onClick={() => handleEdit(item?._id)}
                                       >
                                          <EditIcon />
                                       </button>
                                    </div>
                                 </td>
                              </tr>
                           ))}
                     </tbody>
                  </table>
               </div>
            </div>
         ) : (
            <FirstTimeFormToggle
               marginTop="10px"
               height="61.25vh"
               img={party}
               onClick={() => setOpenForm(true)}
               BtnText="Add Your First Purchase Bill"
               MiddleText="Make Purchase Bills & share with your customers directly via WhatsApp or Email."
            />
         )}
      </div>
   );
};

export default PurchaseBill;
