import css from "./Sidebar.module.css";
import Logo from "../../assets/Shop.svg";
import Setting from "../../Component/Setting/Setting";
import { USER_DETAILS } from "../../Redux/business/actionTypes";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Icons
import { BiSitemap } from "react-icons/bi";
import { AiFillTool } from "react-icons/ai";
import { GoHomeFill } from "react-icons/go";
import { CiMoneyBill } from "react-icons/ci";
import { HiMiniUsers } from "react-icons/hi2";
import { FaPlus, FaWallet } from "react-icons/fa";
import { FaPlus as PlusIcon } from "react-icons/fa6";
import { IoMdSettings, IoIosArrowDown } from "react-icons/io";
import { IoStatsChart, IoStorefrontSharp, IoCart } from "react-icons/io5";
import {
  MdCelebration,
  MdOutlineWhatsapp,
  MdSettingsBackupRestore,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

const Sidebar = ({ setShowEditFirm }) => {
  const navigate = useNavigate();
  const toggleUpdate = useSelector(
    (state) => state.BusinessReducer.toggleUpdate
  );
  const [profileData, setProfileData] = useState(null);
  const [activeItems, setActiveItems] = useState("Home");
  const [toggleSetting, setToggleSetting] = useState(false);
  const [toggleNavItems, setToggleNavItems] = useState(false);
  const [activeNestedItems, setActiveNestedItems] = useState(0);

  useEffect(() => {
    const UserDetails = JSON.parse(localStorage.getItem(USER_DETAILS));
    setProfileData(UserDetails);
  }, [toggleUpdate]);

  useEffect(() => {
    setToggleNavItems(true);
  }, [activeItems]);

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
    <div className={css.sideBarOuter}>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

      {/* Firm Details */}
      <div
        className={css.firmDetailsDivOuter}
        onClick={() => setToggleNavItems(false)}
      >
        <div>
          <div className={css.firmLogoDiv}>
            <img
              src={profileData?.companyLogo ? profileData?.companyLogo : Logo}
              alt="logo"
            />
          </div>
          <span className={css.plusIconFirmLogo}>+</span>
        </div>

        <div
          onClick={() => {
            setShowEditFirm(true);
            setToggleNavItems(false);
          }}
          className={css.firmNameContDiv}
        >
          <h4>
            {profileData?.companyName ? profileData.companyName : "Loading..."}
          </h4>
          <MdOutlineArrowForwardIos />
        </div>
      </div>

      {/* Sidebar Options */}
      <div className={css.optionsOuter}>
        {OldSidebarItems.map((items, index) => (
          <div
            onClick={() => {
              handleActiveItems(items.name);
              if (
                items.name == "Sale" ||
                items.name == "Purchase" ||
                items.name === "WhatsApp Marketing"
              ) {
                navigate(items?.to);
                setToggleNavItems(!toggleNavItems);
              }
              if (items.name == "Setting") {
                setToggleSetting(true);
                setToggleNavItems(!toggleNavItems);
              }
            }}
            className={
              activeItems === items.name
                ? css.activeSidebarOptionDiv
                : css.inActiveSidebarOptionDiv
            }
            key={index}
          >
            <aside>
              <div
                className={css.optionsLeftSideDiv}
                onClick={() => handleLayout(items.name)}
              >
                <div>{items.Icon}</div>
                <div>{items.name}</div>
              </div>

              {toggleNavItems &&
                activeItems === items.name &&
                items.purchaseToggle && (
                  <div onClick={(e) => e.stopPropagation()}>
                    {items.purchaseToggle.map((nestedItems, nestedindex) => (
                      <aside
                        key={nestedindex}
                        onClick={() => {
                          handleActiveNestedItems(nestedindex);
                          navigate(nestedItems.navigateurl);
                        }}
                        className={
                          activeNestedItems === nestedindex
                            ? css.activeNestedOption
                            : css.inActiveNestedOption
                        }
                      >
                        <h4 className={css.nestedOptionsText}>
                          {nestedItems.name}
                        </h4>
                        <div>{nestedItems.Icon}</div>
                      </aside>
                    ))}
                  </div>
                )}
            </aside>

            {items.extraIcon && (
              <div className={css.optionsRightSideIcons}>{items.extraIcon}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

const SidebarItems = [{}];

// Sidebar Options Array
const OldSidebarItems = [
  { Icon: <GoHomeFill />, name: "Home" },
  { Icon: <HiMiniUsers />, name: "Parties", extraIcon: <FaPlus /> },
  { Icon: <BiSitemap />, name: "Items", extraIcon: <FaPlus /> },
  {
    Icon: <BiSitemap />,
    name: "Sale",
    extraIcon: <IoIosArrowDown />,
    to: "/invoices",
    purchaseToggle: [
      {
        name: "Sale Invoices",
        Icon: <PlusIcon />,
        navigateurl: "/invoices",
      },
      {
        name: "Estimate/ Quatation",
        Icon: <PlusIcon />,
        navigateurl: "/estimates",
      },
      {
        name: "Payment In",
        Icon: <PlusIcon />,
        navigateurl: "/paymentin",
      },
      { name: "Sale Order", Icon: <PlusIcon />, navigateurl: "/saleorder" },
      {
        name: "Delivery Challan",
        Icon: <PlusIcon />,
        navigateurl: "/deliverychallan",
      },
      {
        name: "Sale Return/ Cr. Note",
        Icon: <PlusIcon />,
        navigateurl: "/salereturn",
      },
    ],
  },
  {
    Icon: <IoCart />,
    name: "Purchase",
    extraIcon: <IoIosArrowDown />,
    to: "/purchasebill",
    purchaseToggle: [
      {
        name: "Purchase Bills",
        Icon: <PlusIcon />,
        navigateurl: "/purchasebill",
      },
      {
        name: "Payment Out",
        Icon: <PlusIcon />,
        navigateurl: "/paymentout",
      },
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
      {
        name: "Purchase",
        Icon: <PlusIcon />,
        navigateurl: "/purchasereport",
      },
      {
        name: "Day Book",
        Icon: <PlusIcon />,
        navigateurl: "/daybookreport",
      },
      {
        name: "All Transaction",
        Icon: <PlusIcon />,
        navigateurl: "/alltransactionreport",
      },
      {
        name: "Cash Flow",
        Icon: <PlusIcon />,
        navigateurl: "/cashflowreport",
      },
      { name: "GSTR 1", Icon: <PlusIcon />, navigateurl: "/gstr1report" },
      { name: "GSTR 2", Icon: <PlusIcon />, navigateurl: "/gstr2report" },
      { name: "GSTR 3B", Icon: <PlusIcon />, navigateurl: "/gstr3breport" },
      { name: "GSTR 9", Icon: <PlusIcon />, navigateurl: "/gstr9report" },
      {
        name: "Sale HSN",
        Icon: <PlusIcon />,
        navigateurl: "/salehsnreport",
      },
    ],
  },

  {
    Icon: <MdOutlineWhatsapp />,
    name: "WhatsApp Marketing",
    to: "/marketing",
    extraIcon: <MdCelebration />,
  },

  {
    Icon: <MdSettingsBackupRestore />,
    name: "Backup/Restore",
    extraIcon: <IoIosArrowDown />,
    to: "/setting",
    purchaseToggle: [
      {
        name: "Auto Backup",
        navigateurl: "/",
      },
      {
        name: "Backup To Computer",
        navigateurl: "/",
      },
      {
        name: "Backup To Drive",
        navigateurl: "/",
      },
      {
        name: "Restore Backup",
        navigateurl: "/",
      },
    ],
  },

  {
    Icon: <AiFillTool />,
    name: "Utilities",
    extraIcon: <IoIosArrowDown />,
    to: "/utilities",
    purchaseToggle: [
      {
        name: "Generate Barcode",
        // Icon: <PlusIcon />,
        navigateurl: "/barcode",
      },
      {
        name: "Import Items",
        navigateurl: "/importItems",
      },
      {
        name: "Bulk Update Items",
        navigateurl: "/bulkUpdate",
      },
      { name: "Import From Tally", navigateurl: "/saleorder" },
      {
        name: "Import Parties",
        navigateurl: "/",
      },
      {
        name: "Export To Tally",
        navigateurl: "/",
      },
      {
        name: "Export Items",
        navigateurl: "/",
      },
      {
        name: "Verify My Data",
        navigateurl: "/",
      },
      {
        name: "Recycle Bin",
        navigateurl: "/",
      },
      {
        name: "Close Financial",
        navigateurl: "/",
      },
    ],
  },

  // { Icon: <IoMdSettings />, name: "Setting" },
];
