import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { GoBellFill } from "react-icons/go";

const Navbar = () => {
  return (
    <div className="bg-white border-b border-gray-200 h-16 flex justify-end items-center gap-3 pr-10">
      <GoBellFill fontSize={26} cursor={"pointer"} />
      <FaRegUserCircle fontSize={26} cursor={"pointer"} />
    </div>
  );
};

export default Navbar;
