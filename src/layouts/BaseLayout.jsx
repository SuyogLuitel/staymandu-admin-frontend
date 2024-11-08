import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const BaseLayout = () => {
  return (
    <div className="flex ">
      <div className="w-1/6 h-screen overflow-hidden sticky top-0">
        <Sidebar />
      </div>
      <div className="w-5/6 bg-[#F4F5FA]">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;
