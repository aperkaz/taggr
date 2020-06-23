import React from "react";

const FullHeight = ({ children }) => (
  <div className="full-height" style={{ height: "100vh" }}>
    {children}
  </div>
);

export default FullHeight;
