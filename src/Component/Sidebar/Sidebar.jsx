import css from "./Sidebar.module.css";
import Logo from "../../assets/Shop.svg";
import Setting from "../../Component/Setting/Setting";
import AddPartyForm from "../../Page/Parties/AddPartyForm";
import ItemsForm from "../../components/addForm/ItemsForm";
import { USER_DETAILS } from "../../Redux/business/actionTypes";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

// Icons
import { FaPlus as PlusIcon } from "react-icons/fa6";
import { FaWhatsapp as WhatsAppIcon } from "react-icons/fa";
import { AiFillTool as UtilitesIcon } from "react-icons/ai";
import { BiSolidBank as CashBankIcon } from "react-icons/bi";
import { BsBarChartFill as ReportsIcon } from "react-icons/bs";
import {
  IoMdHome as HomeIcon,
  IoIosArrowDown as ArrowDownIcon,
} from "react-icons/io";
import {
  MdPeopleAlt as PartiesIcon,
  MdOutlineArrowForwardIos as RightArrowIcon,
  MdOutlineSettingsBackupRestore as BackupRestoreIcon,
} from "react-icons/md";
import {
  TbReport as SaleIcon,
  TbDeviceRemote as QuickBillingIcon,
  TbTriangleSquareCircleFilled as ItemsIcon,
} from "react-icons/tb";
import {
  IoCart as PurchaseIcon,
  IoWallet as ExpensesIcon,
  IoStorefront as MyOnlineBankIcon,
} from "react-icons/io5";

const Sidebar = ({ setShowEditFirm }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const toggleUpdate = useSelector(
    (state) => state.BusinessReducer.toggleUpdate
  );
  const [profileData, setProfileData] = useState(null);
  const [openSettings, setOpenSettings] = useState(false);
  const [openNestedLinks, setOpenNestedLinks] = useState(false);
  const [showAddItemsForm, setShowAddItemsForm] = useState(false);
  const [showAddPartyForm, setShowAddShowPartyForm] = useState(false);
  const [activeNav, setActiveNav] = useState(location.pathname || "/");
  const [clickedNavItem, setClickedNavItemName] = useState(
    findNameByPathname(SidebarItems, location.pathname)
  );

  // To set the current firm data
  useEffect(() => {
    const UserDetails = JSON.parse(localStorage.getItem(USER_DETAILS));
    setProfileData(UserDetails);
  }, [toggleUpdate]);

  useEffect(() => {
    setOpenNestedLinks(true);
  }, [activeNav]);

  return (
    <div className={css.sideBarOuter}>
      {/* {showAddPartyForm && (
        <AddPartyForm
          CloseForm={setShowAddShowPartyForm}
          OpenSettings={setOpenSettings}
        />
      )}
      {showAddItemsForm && (
        <ItemsForm
          handleSettingClick={setOpenSettings}
          closeForm={() => setShowAddItemsForm(false)}
        />
      )} */}

      {/* Firm Details */}
      <div
        className={css.firmDetailsDivOuter}
        onClick={() => setOpenNestedLinks(false)}
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
            setOpenNestedLinks(false);
          }}
          className={css.firmNameContDiv}
        >
          <h4>
            {profileData?.companyName ? profileData.companyName : "Loading..."}
          </h4>
          <RightArrowIcon />
        </div>
      </div>

      {/* Sidebar Options */}
      <div className={css.optionsOuter}>
        {SidebarItems.map((item) => (
          <div className={css.navLinkOuter} key={item?.name}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setClickedNavItemName(item?.name);
                if (
                  openNestedLinks &&
                  linksWithNestedRoutes.includes(item?.name) &&
                  item?.childLinks?.find((obj) => obj?.to == location.pathname)
                ) {
                  setOpenNestedLinks(false);
                } else if (
                  !openNestedLinks &&
                  linksWithNestedRoutes.includes(item?.name) &&
                  item?.childLinks?.find((obj) => obj?.to == location.pathname)
                ) {
                  setOpenNestedLinks(true);
                } else if (
                  !linksWithNestedRoutes.includes(item?.name) &&
                  item?.to
                ) {
                  setActiveNav(item?.to);
                  navigate(item?.to ? item?.to : location.pathname);
                } else if (
                  !linksWithNestedRoutes.includes(item?.name) &&
                  !item?.to
                ) {
                  setActiveNav(location.pathname);
                } else if (
                  openNestedLinks &&
                  linksWithNestedRoutes.includes(item?.name)
                ) {
                  setActiveNav(item?.to);
                  setOpenNestedLinks(false);
                  navigate(item?.to ? item?.to : location.pathname);
                } else if (
                  !openNestedLinks &&
                  linksWithNestedRoutes.includes(item?.name)
                ) {
                  setActiveNav(item?.to);
                  setOpenNestedLinks(true);
                  navigate(item?.to ? item?.to : location.pathname);
                }
              }}
              style={
                clickedNavItem == item?.name
                  ? {
                      borderColor: "var(--redB)",
                      background: "var(--DeepA)",
                      color: "var(--pureWhite)",
                    }
                  : {
                      borderColor: "transparent",
                      color: "var(--greyE)",
                    }
              }
              className={css.mainNavLinkCss}
            >
              <div>
                {item?.icon}
                <h3>{item?.name}</h3>
              </div>

              {item?.rightSideIcon == "plus" ? (
                <PlusIcon
                  onClick={(e) => {
                    // e.stopPropagation();
                    if (activeNav == "/parties")
                      return setShowAddShowPartyForm(true);
                    if (activeNav == "/items") return setShowAddItemsForm(true);
                  }}
                />
              ) : item?.rightSideIcon == "arrowDown" ? (
                <ArrowDownIcon
                  style={{
                    transform:
                      activeNav == item?.to && openNestedLinks
                        ? "rotate(-180deg)"
                        : "none",
                  }}
                />
              ) : (
                ""
              )}
            </div>

            {/* Nested Links */}
            {linksWithNestedRoutes.includes(item?.name) &&
              item?.childLinks?.find((obj) => obj?.to == location.pathname) &&
              openNestedLinks && (
                <div className={css.childNavLinksOuterDiv}>
                  {item?.childLinks?.map((childNavItem) => (
                    <NavLink
                      style={({ isActive }) =>
                        isActive
                          ? {
                              background: "var(--DeepBluishGrey)",
                              color: "var(--pureWhite)",
                              cursor: "default",
                            }
                          : {
                              borderColor: "transparent",
                              color: "var(--greyE)",
                              cursor: "pointer",
                            }
                      }
                      to={
                        childNavItem?.to ? childNavItem?.to : location.pathname
                      }
                      key={childNavItem?.name}
                    >
                      {childNavItem?.name} <PlusIcon />
                    </NavLink>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

// Include all the Sidebar Links which has nested Links for other routes
const linksWithNestedRoutes = [
  "Sale",
  "Purchase",
  "Backup/Restore",
  "Utilities",
  "Reports",
];

// Sidebar Options Array
const SidebarItems = [
  { icon: <HomeIcon />, name: "Home", to: "/", rightSideIcon: "none" },
  {
    icon: <PartiesIcon />,
    name: "Parties",
    to: "/parties",
    rightSideIcon: "plus",
  },
  { icon: <ItemsIcon />, name: "Items", to: "/items", rightSideIcon: "plus" },
  {
    icon: <SaleIcon />,
    name: "Sale",
    to: "/invoices",
    rightSideIcon: "arrowDown",
    childLinks: [
      { name: "Sale Invoices", to: "/invoices" },
      { name: "Estimate/ Quatation", to: "/estimates" },
      { name: "Payment In", to: "/paymentin" },
      { name: "Sale Order", to: "/saleorder" },
      { name: "Delivery Challan", to: "/deliverychallan" },
      { name: "Sale Return/ Cr. Note", to: "/salereturn" },
    ],
  },
  {
    icon: <PurchaseIcon />,
    name: "Purchase",
    to: "/purchasebill",
    rightSideIcon: "arrowDown",
    childLinks: [
      { name: "Purchase Bills", to: "/purchasebill" },
      { name: "Payment Out", to: "/paymentout" },
      { name: "Purchase Order", to: "/paymentorder" },
      { name: "Purchase Return/ Dr. Note", to: "/purchasereturn" },
    ],
  },
  { icon: <QuickBillingIcon />, name: "Quick Billing", rightSideIcon: "none" },
  { icon: <ExpensesIcon />, name: "Expenses", rightSideIcon: "none" },
  { icon: <CashBankIcon />, name: "Cash & Bank", rightSideIcon: "arrowDown" },
  {
    icon: <MyOnlineBankIcon />,
    name: "My Online Store",
    rightSideIcon: "none",
  },
  {
    icon: <ReportsIcon />,
    name: "Reports",
    to: "/salereport",
    rightSideIcon: "arrowDown",
    childLinks: [
      { name: "Sale", to: "/salereport" },
      { name: "Purchase", to: "/purchasereport" },
      { name: "Day Book", to: "/daybookreport" },
      { name: "All Transaction", to: "/alltransactionreport" },
      { name: "Cash Flow", to: "/cashflowreport" },
      { name: "GSTR1", to: "/gstr1report" },
      { name: "GSTR2", to: "/gstr2report" },
      { name: "GSTR 3B", to: "/gstr3breport" },
      { name: "GSTR 9", to: "/gstr9report" },
      { name: "Sale HSN", to: "/salehsnreport" },
    ],
  },
  {
    icon: <WhatsAppIcon />,
    name: "WhatsApp Marketing",
    rightSideIcon: "whtsAppMarketing",
  },
  {
    icon: <BackupRestoreIcon />,
    name: "Backup/Restore",
    rightSideIcon: "arrowDown",
    childLinks: [
      { name: "Auto Backup" },
      { name: "Backup To Computer" },
      { name: "Backup To Drive" },
      { name: "Restore Backup" },
    ],
  },
  {
    icon: <UtilitesIcon />,
    name: "Utilities",
    rightSideIcon: "arrowDown",
    childLinks: [
      { name: "Generate Barcode" },
      { name: "Import Items" },
      { name: "Bulk Update Items" },
      { name: "Import From Tally" },
      { name: "Import Parties" },
      { name: "Import To Tally" },
      { name: "Export To Tally" },
      { name: "Export Items" },
      { name: "Verify My Data" },
      { name: "Recycle Bin" },
      { name: "Close Financial Year" },
    ],
  },
];

// This function finds the active Sidebar item based on location.pathname
function findNameByPathname(array, pathname) {
  let foundName = null;
  array.some((item) => {
    if (item?.childLinks && item?.childLinks.length > 0) {
      const childLinkMatch = item.childLinks.some(
        (link) => link.to === pathname
      );
      if (childLinkMatch) {
        foundName = item.name;
        return true;
      }
    }
    return false;
  });
  if (!foundName) {
    foundName = findNameByPathnameRecurrsive(array, pathname);
  }
  return foundName;
}
function findNameByPathnameRecurrsive(arr, pathname) {
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    if (obj.childLinks) {
      const foundChild = findNameByPathnameRecurrsive(obj.childLinks, pathname);
      if (foundChild) {
        return foundChild;
      }
    } else if (obj.to && obj.to === pathname) {
      return obj.name;
    }
  }
  return null;
}
