import Footer from "@/components/Footer copy";
import Header from "@/components/Header";
import SideMap from "@/components/SideMap";
import React, { Fragment } from "react";

const layoutCart = ({ children }) => {
  return (
    <Fragment>
      <Header />

      {children}
      <SideMap />
      <Footer />
    </Fragment>
  );
};

export default layoutCart;
