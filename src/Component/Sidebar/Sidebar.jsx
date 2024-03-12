import "./Sidebar.css";
import Logo from "../../assets/Shop.svg";
import Setting from "../../Component/Setting/Setting";
import { SidebarItems } from "./SidebarMenus";
import { USER_DETAILS } from "../../Redux/business/actionTypes";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toggleUpdate = useSelector(
    (state) => state.BusinessReducer.toggleUpdate
  );
  const [error, setError] = useState(null);
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
      navigate("/", {
        state: { redirectTo: location.pathname },
        replace: true,
      });
    }
    setActiveItems(item);
    handleNestedSibarItems();
  };

  const handleActiveNestedItems = (index) => {
    setActiveNestedItems(index);
  };

  const handleLayout = (item) => {
    if (item === "Parties") {
      navigate("/parties", {
        state: { redirectTo: location.pathname },
        replace: true,
      });
    } else if (item === "Items") {
      navigate("/items", {
        state: { redirectTo: location.pathname },
        replace: true,
      });
    }
  };

  return (
    <div className="sidebar-container">
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

      <section
        className="sidebar-top-section"
        onClick={() => {
          navigate("/profile", {
            state: { redirectTo: location.pathname },
            replace: true,
          });
          setToggleNavItems(false);
        }}
      >
        <div>
          <div className="sidebar-top-logo-div">
            {/* <img src={Logo} alt="logo" className="sidebar-top-img" /> */}
            <img
              src={profileData?.companyLogo ? profileData?.companyLogo : Logo}
              alt="logo"
              className="sidebar-top-img"
            />
          </div>
          <span className="sidebar-top-img-plus">+</span>
        </div>
        <div className="firmNameContDiv">
          <h4>
            {profileData?.companyName ? profileData.companyName : "Loading..."}
          </h4>
          <MdOutlineArrowForwardIos />
        </div>
      </section>

      <div className="sidebar-main">
        {SidebarItems.map((items, index) => (
          <div
            onClick={() => {
              handleActiveItems(items.name);
              if (
                items.name == "Sale" ||
                items.name == "Purchase" ||
                items.name === "WhatsApp Marketing"
              ) {
                navigate(items?.to, {
                  state: { redirectTo: location.pathname },
                  replace: true,
                });
                setToggleNavItems(!toggleNavItems);
              }
              if (items.name == "Setting") {
                setToggleSetting(true);
                setToggleNavItems(!toggleNavItems);
              }
            }}
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
              {toggleNavItems &&
                activeItems === items.name &&
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
                          navigate(nestedItems.navigateurl, {
                            state: { redirectTo: location.pathname },
                            replace: true,
                          });
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
        {profileData?.companyName ? (
          <>
            {/* <div className="profile-name">{profileData?.email}</div> */}
            {/* <div className="profile-email">{profileData?.phoneNumber}</div> */}
          </>
        ) : (
          <p className="error-message">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
