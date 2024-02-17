import "./Sidebar.css";
import Logo from "../../assets/Shop.svg";
import { PlusIcon } from "../utils/reactIcons";
import { USER_DETAILS } from "../../Redux/business/actionTypes";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { HiMiniUsers } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import { BiSitemap } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { CiMoneyBill } from "react-icons/ci";
import { FaWallet } from "react-icons/fa";
import { IoStorefrontSharp } from "react-icons/io5";
import { IoStatsChart } from "react-icons/io5";

const sidebarItems = [
  { Icon: <GoHomeFill />, name: "Home" },
  { Icon: <HiMiniUsers />, name: "Parties", extraIcon: <FaPlus /> },
  { Icon: <BiSitemap />, name: "Items", extraIcon: <FaPlus /> },
  {
    Icon: <BiSitemap />,
    name: "Sale",
    extraIcon: <IoIosArrowDown />,
    purchaseToggle: [
      {
        name: "Sale Delivery Challan",
        Icon: <PlusIcon />,
        navigateurl: "/saledeliverychallan",
      },
      {
        name: "Sale Estimates",
        Icon: <PlusIcon />,
        navigateurl: "/salesestimates",
      },
      {
        name: "Sale Invoice",
        Icon: <PlusIcon />,
        navigateurl: "/salesinvoice",
      },
      { name: "Sale Order", Icon: <PlusIcon />, navigateurl: "/salesorder" },
      {
        name: "Sale PaymentIn",
        Icon: <PlusIcon />,
        navigateurl: "/salespaymentin",
      },
      { name: "Sale Return", Icon: <PlusIcon />, navigateurl: "/salereturn" },
    ],
  },
  {
    Icon: <IoCart />,
    name: "Purchase",
    extraIcon: <IoIosArrowDown />,
    purchaseToggle: [
      {
        name: "Purchase Bills",
        Icon: <PlusIcon />,
        navigateurl: "/purchasebill",
      },
      { name: "Payment Out", Icon: <PlusIcon />, navigateurl: "/paymentout" },
      {
        name: "Purchase Order",
        Icon: <PlusIcon />,
        navigateurl: "/paymentorder",
      },
      {
        name: "Purchase Return/ Dr. Note",
        Icon: <PlusIcon />,
        navigateurl: "/purchasereturn",
      },
    ],
  },
  { Icon: <CiMoneyBill />, name: "Quick Billing" },
  { Icon: <CiMoneyBill />, name: "Expenses" },
  { Icon: <FaWallet />, name: "Cash & Bank", extraIcon: <IoIosArrowDown /> },
  { Icon: <IoStorefrontSharp />, name: "My Online Store" },
  {
    Icon: <IoStatsChart />,
    name: "Reports",
    extraIcon: <IoIosArrowDown />,
    purchaseToggle: [
      { name: "Sale", Icon: <PlusIcon />, navigateurl: "/salereport" },
      { name: "Purchase", Icon: <PlusIcon />, navigateurl: "/purchasereport" },
      { name: "Day Book", Icon: <PlusIcon />, navigateurl: "/daybookreport" },
      {
        name: "All Transaction",
        Icon: <PlusIcon />,
        navigateurl: "/alltransactionreport",
      },
      { name: "Cash Flow", Icon: <PlusIcon />, navigateurl: "/cashflowreport" },
      { name: "GSTR 1", Icon: <PlusIcon />, navigateurl: "/gstr1report" },
      { name: "GSTR 2", Icon: <PlusIcon />, navigateurl: "/gstr2report" },
      { name: "GSTR 3B", Icon: <PlusIcon />, navigateurl: "/gstr3breport" },
      { name: "GSTR 9", Icon: <PlusIcon />, navigateurl: "/gstr9report" },
      { name: "Sale HSN", Icon: <PlusIcon />, navigateurl: "/salehsnreport" },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const toggleUpdate = useSelector(
    (state) => state.BusinessReducer.toggleUpdate
  );
  const [activeItems, setActiveItems] = useState("Home");
  const [toggleNavItems, setToggleNavItems] = useState(false);
  const [activeNestedItems, setActiveNestedItems] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const UserDetails = JSON.parse(localStorage.getItem(USER_DETAILS));
    setProfileData(UserDetails);
  }, [toggleUpdate]);

  const handleNestedSibarItems = () => {
    setToggleNavItems(!toggleNavItems);
  };

  const handleActiveItems = (item) => {
    if (item === "Home") {
      navigate("/");
    }
    setActiveItems(item);
    handleNestedSibarItems();
  };

  const handleActiveNestedItems = (index) => {
    setActiveNestedItems(index);
  };

  const handleLayout = (item) => {
    if (item === "Parties") {
      navigate("/parties");
    } else if (item === "Items") {
      navigate("/items");
    }
  };

  return (
    <div className="sidebar-container">
      <section className="sidebar-top-section">
        <div className="sidebar-top-logo-div">
          <img src={Logo} alt="logo" className="sidebar-top-img" />
          <span className="sidebar-top-img-plus">+</span>
        </div>
        <h3 className="sidebar-top-heading">
          {profileData?.companyName ? profileData.companyName : "Loading..."}
        </h3>
        <div className="sidebar-left-icon">
          <button onClick={() => navigate("/formpage")}>
            <MdOutlineArrowForwardIos />
          </button>
        </div>
      </section>

      <div className="sidebar-main">
        {sidebarItems.map((items, index) => (
          <div
            onClick={() => handleActiveItems(items.name)}
            className={`sidebar-items-div ${
              activeItems === items.name && "active-nav-border"
            }`}
            key={index}
          >
            <aside>
              <div
                className="sidevar-items-aside1"
                onClick={() => handleLayout(items.name)}
              >
                <div className="sidebar-items-con">{items.Icon}</div>
                <div className="sidebar-items-text">{items.name}</div>
              </div>
              {activeItems === items.name &&
                toggleNavItems &&
                items.purchaseToggle && (
                  <div
                    className="nested-items-container"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {items.purchaseToggle.map((nestedItems, nestedindex) => (
                      <aside
                        key={nestedindex}
                        onClick={() => {
                          handleActiveNestedItems(nestedindex);
                          navigate(nestedItems.navigateurl);
                        }}
                        className={`sidevar-nested-items ${
                          activeNestedItems === nestedindex &&
                          "active-nav-border"
                        }`}
                      >
                        <div className="sidebar-items-con">
                          {nestedItems.name}
                        </div>
                        <div className="sidebar-items-text">
                          {nestedItems.Icon}
                        </div>
                      </aside>
                    ))}
                  </div>
                )}
            </aside>

            {items.extraIcon && (
              <div className="sidebar-items-extra-icon">{items.extraIcon}</div>
            )}
          </div>
        ))}
      </div>

      <div className="profile-container">
        {profileData?.token ? (
          <>
            <div className="profile-name">{profileData.name}</div>
            <div className="profile-email">{profileData.email}</div>
          </>
        ) : (
          <p className="error-message">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
