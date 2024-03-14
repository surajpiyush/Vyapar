import React from "react";
import Layout1 from "./Layout1";

const PrintCarrier = ({ printComponentRef }) => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        minHeight: "100vh",
        zIndex: 2000,
        background: "white",
        top: 0,
        left: 0,
        display: "none",
      }}
      ref={(el) => (printComponentRef = el)}
    >
      <Layout1 />
    </div>
  );
};

export default PrintCarrier;
