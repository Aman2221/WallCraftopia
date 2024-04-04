"use client";
import React, { ReactNode, useLayoutEffect } from "react";
import Nav from "../Nav";
import Footer from "../Footer";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();
  useLayoutEffect(() => {
    const uid = JSON.parse(localStorage.getItem("user") as string)?.uid;
    if (!uid) {
      router.push("/login");
    }
  }, []);

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
