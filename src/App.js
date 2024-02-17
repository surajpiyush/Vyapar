import "./App.css";
import "./Css/styles.css";
import "./Css/styles1.css";
import Navbar from "./Component/Navbar/Navbar.jsx";
import Sidebar from "./Component/Sidebar/Sidebar.jsx";
import Header from "./Component/Layourt/Header.jsx";

import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
  }, []);

  return (
    <div>
      <div className="app-container">
        {location.pathname != "/auth" && <Navbar />}
        {location.pathname != "/auth" && (
          <div className="app-page-div">
            <section className="app-sidebar">
              <Sidebar />
            </section>
            <section className="app-Home">
              <div className="header-div-fixed">
                <Header />
              </div>
              <div className="outlet-layout">
                <Outlet />
              </div>
            </section>
          </div>
        )}

        {location.pathname == "/auth" && <Outlet />}
      </div>
    </div>
  );
}

export default App;
