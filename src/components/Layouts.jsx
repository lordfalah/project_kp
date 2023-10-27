import React, { Fragment } from "react";
import Header from "./Header";
import SideMap from "./SideMap";
import Footer from "./Footer";

const Layouts = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
      <SideMap />
      <Footer />
    </Fragment>
  );
};

export default Layouts;
