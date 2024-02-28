import css from "../../../styles/SalesStyles/DeliveryChallan.module.css";
import party from "../../../assets/Images/party.jpg";
import SalesDeliveryChallanTable from "../../../components/TableData/SalesDeliveryChallanTable";
import FormDeliveryChallan from "./FormDeliveryChallan";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { CiFilter as FilterIcon } from "react-icons/ci";
import FirstTimeFormToggle from "../../../Component/FirstTimeFormToggle";
import { GetAllDeliveryChallans } from "../../../Redux/sales/action";
import TableDeliveryChallan from "./TableDeliveryChallan";

export default function SalesDeliveryChallan() {
  const toast = useToast();
  const dispatch = useDispatch();
  const isError = useSelector((state) => state.SalesReducer.isError);
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const toggleDeliveryChallan = useSelector(
    (state) => state.SalesReducer.toggleDeliveryChallan
  );
  const deliveryChallanList = useSelector(
    (state) => state.SalesReducer.deliveryChallanList
  );

  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    GetAllDeliveryChallans(dispatch);
  }, [toggleDeliveryChallan]);

  const formOpen = () => {
    setOpenForm(true);
  };

  return (
    <div>
      <div className="nav">
        <div className="nav-opt">Delivery Challan</div>
      </div>

      {/* Top Nav */}
      <div className="d-cen b-cont text-center text-center">
        <div className={css.TableOuter}>
          <div className={css.saleOrderUpperNav}>
            <div className={css.leftSideDivSaleOuter}>
              <p>TRANSACTIONS</p>
              <div className={css.saleOrderSearchDiv}>
                <SearchIcon />
                <div>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={formOpen}
                className={css.addSaleOrderBtn}
              >
                <PlusIcon /> Add Delivery Challan
              </button>
            </div>
          </div>
          <div className={css.TabelOuterDivSaleOrder}>
            <table>
              <thead>
                <tr>
                  <th>
                    <div>
                      DATE <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      PARTY <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      Challan NO. <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      DUE DATE <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      TOTAL AMOUNT <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      STATUS <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      ACTION <FilterIcon />
                    </div>
                  </th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {deliveryChallanList?.map((item, ind) => (
                  <TableDeliveryChallan
                    {...item}
                    ind={ind}
                    key={ind + item?._id}
                  />
                ))}
              </tbody>
            </table>
            {isLoading && <h2>Loading Delivery Challans...</h2>}
          </div>
        </div>
      </div>

      {/* Form */}
      {openForm && (
        <div className={css.formOuter}>
          <div className={css.upperNav}>
            <div>
              <p className={css.activeForm}>
                <span>Delivery Challan #1</span>
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
              <SettingIcon
                onClick={() =>
                  toast({
                    title: "Feature currently in development",
                    status: "info",
                    position: "top",
                  })
                }
              />
              <CloseIcon onClick={() => setOpenForm(false)} />
            </div>
          </div>
          <FormDeliveryChallan setOpenForm={setOpenForm} />
        </div>
      )}

      {!isLoading && !deliveryChallanList.length > 0 && (
        <FirstTimeFormToggle
          img={party}
          onClick={formOpen}
          BtnText="Add Your First Delivery Challan"
          MiddleText="Add Delivery Challan to manage your full Stock Inventory."
        />
      )}
    </div>
  );
}
