import "../Css/styles.css";
import "../Css/styles1.css";
import SignUp from "../Component/SignUp.jsx";
import Login from "../Component/Login.jsx";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Authpage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const [tabItems, setTabItems] = useState({
    logintab: true,
    registertab: false,
  });

  const handleRegisterTab = () => {
    if (!tabItems.registertab) {
      setTabItems({
        registertab: !tabItems.registertab,
      });
    }
  };

  const handleLogInTab = () => {
    if (!tabItems.logintab) {
      setTabItems({
        logintab: !tabItems.logintab,
      });
    }
  };

  return (
    <div className="body" style={{ height: "100vh", width: "100vw" }}>
      <div className="tab-container">
        <section className="tab-button">
          <button
            onClick={handleRegisterTab}
            style={{
              backgroundColor: tabItems.registertab && "#abc0ff",
              color: tabItems.registertab && "white",
            }}
            className="tab-items"
          >
            Signup
          </button>
          <button
            onClick={handleLogInTab}
            style={{
              backgroundColor: tabItems.logintab && "#abc0ff",
              color: tabItems.logintab && "white",
            }}
            className="tab-items"
          >
            LogIn
          </button>
        </section>
        {tabItems.registertab && (
          <section className="regsiter-tab">
            <SignUp func={handleLogInTab} setUserEmail={setUserEmail} />
          </section>
        )}
        {tabItems.logintab && (
          <section className="login-tab">
            <Login userEmail={userEmail} />
          </section>
        )}
      </div>
    </div>
  );
};

export default Authpage;
