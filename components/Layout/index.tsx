import React, { ReactNode } from "react";
import Nav from "../Nav";
import Footer from "../Footer";

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <Nav />
      <div className="pb-10 mt-20 mb-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
