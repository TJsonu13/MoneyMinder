import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="content container mt-4 height-100%">{children}</div>

    </>
  );
};

export default Layout;
