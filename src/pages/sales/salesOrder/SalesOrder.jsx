import css from "../../../styles/SalesStyles/Order.module.css";
import party from "../../../assets/Images/party.jpg";
import OrderForm from "./OrderForm";
import TableSaleOrder from "./TableSaleOrder";
import Setting from "../../../Component/Setting/Setting";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import { GetAllSaleOrders } from "../../../Redux/sales/action";

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
import { useLocation, useNavigate } from "react-router-dom";

export default function SalesOrder() {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const toggleSaleOrder = useSelector(
    (state) => state.SalesReducer.toggleSaleOrder
  );
  const saleOrderList = useSelector(
    (state) => state.SalesReducer.saleOrderList
  );

  const [openForm, setOpenForm] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const [toggleSections, setToggleSections] = useState(false);

  useEffect(() => {
    GetAllSaleOrders(dispatch);
  }, [toggleSaleOrder]);

  const formOpen = () => {
    setOpenForm(true);
  };

  return (
    <div style={{ marginTop: "80px" }}>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

      <div className={css.headerNavOuter}>
        <div
          onClick={() => {
            setToggleSections(true);
          }}
          style={{
            borderColor: !toggleSections ? "var(--blueB)" : "transparent",
          }}
        >
          SALE ORDERS
        </div>
        <div
          onClick={() => {
            setToggleSections(false);
          }}
          style={{
            borderColor: toggleSections ? "var(--blueB)" : "transparent",
          }}
        >
          ONLINE ORDERS
        </div>
      </div>

      {!toggleSections ? (
        // Sale Orders Section
        <div className="">
          {openForm && (
            <div className={css.formOuter}>
              <div className={css.upperNav}>
                <div>
                  <p className={css.activeForm}>
                    <span>Sale Order #1</span>
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
                  <SettingIcon onClick={() => setToggleSetting(true)} />
                  <CloseIcon onClick={() => setOpenForm(false)} />
                </div>
              </div>
              <OrderForm
                setToggleSetting={setToggleSetting}
                setOpenForm={setOpenForm}
              />
            </div>
          )}

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
                    <PlusIcon /> Add Sale Order
                  </button>
                </div>
              </div>
              <div className={css.TabelOuterDivSaleOrder}>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <div>
                          PARTY 
{/*  <FilterIcon /> */}
                        </div>
                      </th>
                      <th>
                        <div>
                          NO. 
{/*  <FilterIcon /> */}
                        </div>
                      </th>
                      <th>
                        <div>
                          DATE 
{/*  <FilterIcon /> */}
                        </div>
                      </th>
                      <th>
                        <div>
                          DUE DATE 
{/*  <FilterIcon /> */}
                        </div>
                      </th>
                      <th>
                        <div>
                          TOTAL AMOUNT 
{/*  <FilterIcon /> */}
                        </div>
                      </th>
                      <th>
                        <div>
                          BALANCE 
{/*  <FilterIcon /> */}
                        </div>
                      </th>
                      <th>
                        <div>
                          TYPE 
{/*  <FilterIcon /> */}
                        </div>
                      </th>
                      <th>
                        <div>
                          STATUS 
{/*  <FilterIcon /> */}
                        </div>
                      </th>
                      <th>
                        <div>
                          ACTION 
{/*  <FilterIcon /> */}
                        </div>
                      </th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {!isLoading &&
                      saleOrderList?.map((item, ind) => (
                        <TableSaleOrder
                          {...item}
                          ind={ind}
                          key={ind + item?._id}
                        />
                      ))}
                  </tbody>
                </table>
                {isLoading && (
                  <h2
                    style={{
                      color: "green",
                      textAlign: "center",
                      margin: "20px auto",
                    }}
                  >
                    Loading Sale Orders...
                  </h2>
                )}
              </div>
            </div>
          </div>

          {!isLoading && !saleOrderList.length > 0 && (
            <div style={{ marginTop: "-450px" }}>
              <FirstTimeFormToggle
                img={party}
                onClick={formOpen}
                BtnText="Add Your First Sale Order"
                MiddleText="Make & share sale orders & convert them to sale invoice instantly."
              />
            </div>
          )}
        </div>
      ) : (
        // Online Orders Section
        <div className="d-cen b-cont text-center">
          <div className="">
            <img src={party} alt="" className="party-img" />
            <p style={{ fontWeight: "bold" }}>No Online Orders</p>
            <p>Share your Online Store to get orders.</p>
            <button className="party-button">
              <i className="fa fa-share"></i> <span>Share Store</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
