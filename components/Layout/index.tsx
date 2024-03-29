import React, { ReactNode } from "react";
import Nav from "../Nav";
import Footer from "../Footer";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <Nav />
      <div className="pb-10 mt-20 mb-10">{children}</div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Layout;
