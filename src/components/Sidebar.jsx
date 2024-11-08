import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaHotel,
  FaBed,
  FaStar,
  FaBook,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [active, setActive] = useState(window.location.pathname);

  useEffect(() => {
    setActive(window.location.pathname);
  }, [window.location.pathname]);

  const navLinks = [
    {
      id: 1,
      name: "Dashboard",
      link: "/",
      icon: <FaTachometerAlt />,
    },
    {
      id: 2,
      name: "Hotel",
      link: "/hotels",
      subLink: "/add-hotel",
      icon: <FaHotel />,
    },
    {
      id: 3,
      name: "Room",
      link: "/rooms",
      subLink: "/add-room",
      icon: <FaBed />,
    },
    { id: 4, name: "Review", link: "/reviews", icon: <FaStar /> },
    { id: 5, name: "Booking", link: "/bookings", icon: <FaBook /> },
    { id: 6, name: "Setting", link: "/setting", icon: <FaCog /> },
  ];

  return (
    <div className="h-screen flex flex-col">
      <div
        className="text-3xl text-[#002D62] font-bold cursor-pointer flex my-[13px] justify-center"
        onClick={() => navigate("/")}
      >
        Staymandu.
      </div>
      <hr />
      <div className="flex flex-col justify-between flex-1 h-full">
        <div className="flex flex-col gap-2 pt-6 px-2">
          {navLinks?.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item?.link)}
              className={`text-[#343434] text-lg font-medium cursor-pointer hover:bg-gray-100 py-2 rounded-xl px-8 flex items-center gap-2 ${
                (active === item?.link || active === item?.subLink) &&
                "bg-slate-100"
              }`}
            >
              {item?.icon}
              {item?.name}
            </div>
          ))}
        </div>
        <div
          className="mt-auto text-red-600 text-lg font-medium cursor-pointer hover:bg-gray-100 py-2 rounded-xl px-10 flex items-center gap-2"
          onClick={() => logout()}
        >
          <FaSignOutAlt />
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
