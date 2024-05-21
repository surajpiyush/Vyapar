import css from "./Sidebar.module.css";
import Logo from "../../assets/Shop.svg";
import { USER_DETAILS } from "../../Redux/store";
import {
  HomeIcon,
  DocumentIcon,
  WalletIcon,
  DownArrowIcon,
  PlusIconThin,
  UtilitesIcon,
  BankIcon,
  StatsIcon,
  WhatsAppOutlineIcon,
  ShopIconFilled,
  CartIconFilled,
  BackupRestoreIcon,
  PeopleIconFilled,
  RightArrowIcon,
  ShapesIconFilled,
  RemoteDeviceIcon,
} from "../../assets/Icons/ReactIcons";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ setShowEditFirm }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const toggleUpdate = useSelector(
    (state) => state.BusinessReducer.toggleUpdate
  );
  const [profileData, setProfileData] = useState(null);
  const [openNestedLinks, setOpenNestedLinks] = useState(false);
  const [showAddPartyForm, setShowAddShowPartyForm] = useState(false);
  const [activeNav, setActiveNav] = useState(location.pathname || "/");
  const [clickedNavItem, setClickedNavItemName] = useState(
    findNameByPathname(SidebarItems, location.pathname)
  );

  // To set the current firm data
  useEffect(() => {
    const UserDetails = JSON.parse(sessionStorage.getItem(USER_DETAILS));
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
                <PlusIconThin
                  onClick={(e) => {
                    // e.stopPropagation();
                    if (["/parties", "/item"].includes(activeNav)) {
                      setShowAddShowPartyForm(true);
                    }
                  }}
                />
              ) : (
                item?.rightSideIcon == "arrowDown" && (
                  <DownArrowIcon
                    style={{
                      transform:
                        activeNav == item?.to && openNestedLinks
                          ? "rotate(-180deg)"
                          : "none",
                    }}
                  />
                )
              )}
            </div>

            {/* Nested Links */}
            {activeNav != "/" &&
              linksWithNestedRoutes.includes(item?.name) &&
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
                      {childNavItem?.name} <PlusIconThin />
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
  "Reports",
  "Cash & Bank",
  "Utilities",
];

// Sidebar Options Array
const SidebarItems = [
  { icon: <HomeIcon />, name: "Home", to: "/", rightSideIcon: "none" },
  {
    icon: <PeopleIconFilled />,
    name: "Parties",
    to: "/parties",
    rightSideIcon: "plus",
  },
  {
    icon: <ShapesIconFilled />,
    name: "Items",
    to: "/items",
    rightSideIcon: "plus",
  },
  {
    icon: <DocumentIcon />,
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
    icon: <CartIconFilled />,
    name: "Purchase",
    to: "/purchasebill",
    rightSideIcon: "arrowDown",
    childLinks: [
      { name: "Purchase Bills", to: "/purchasebill" },
      { name: "Payment Out", to: "/paymentout" },
      { name: "Purchase Order", to: "/purchaseorder" },
      { name: "Purchase Return/ Dr. Note", to: "/purchasereturn" },
    ],
  },
  { icon: <RemoteDeviceIcon />, name: "Quick Billing", rightSideIcon: "none" },
  {
    icon: <WalletIcon />,
    name: "Expenses",
    rightSideIcon: "none",
    to: "/expenses",
  },
  {
    icon: <BankIcon />,
    name: "Cash & Bank",
    rightSideIcon: "arrowDown",
    to: "/bankAccount",
    childLinks: [
      { name: "Bank Account", to: "/bankAccount" },
      { name: "Cash In Hand", to: "/cashInHand" },
      { name: "Cheques", to: "/cheques" },
      { name: "Loan Accounts", to: "/loanAccounts" },
      { name: "Fixed Assets (FA)", to: "/fixedAssets" },
    ],
  },
  {
    icon: <ShopIconFilled />,
    name: "My Online Store",
    rightSideIcon: "none",
  },
  {
    icon: <StatsIcon />,
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
      { name: "Profit And Loss", to: "/ProfitLossReport" },
      { name: "Bill Wise Profit", to: "/BillwiseProfit" },
      { name: "Party Statement", to: "/PartyStatement" },
      { name: "All Parties ", to: "/AllParties" }
    ],
  },
  {
    icon: <WhatsAppOutlineIcon />,
    name: "WhatsApp Marketing",
    rightSideIcon: "whtsAppMarketing",
    to: "/marketing",
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
    to: "/exportItem",
    childLinks: [
      { name: "Export Items", to: "/exportItem" },
      { name: "Import Parties", to: "/exportItem" },
      { name: "Generate Barcode", to: "/exportItem" },
      { name: "Import Items", to: "/exportItem" },
      { name: "Bulk Update Items", to: "/exportItem" },
      { name: "Import From Tally", to: "/exportItem" },
      { name: "Import To Tally", to: "/exportItem" },
      { name: "Export To Tally", to: "/exportItem" },
      { name: "Verify My Data", to: "/exportItem" },
      { name: "Recycle Bin", to: "/exportItem" },
      { name: "Close Financial Year", to: "/exportItem" },
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
