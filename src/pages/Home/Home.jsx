import React from "react";
import { FaBed, FaBookmark, FaHotel, FaUser } from "react-icons/fa";

const Home = () => {
  const dashboardItems = [
    {
      id: 1,
      name: "User",
      icon: <FaUser color="white" />,
      value: 5,
      bg: "bg-[#7DA8E8]",
    },
    {
      id: 2,
      name: "Hotel",
      icon: <FaHotel color="white" />,
      value: 5,
      bg: "bg-[#E8CD7D]",
    },
    {
      id: 3,
      name: "Room",
      icon: <FaBed color="white" />,
      value: 5,
      bg: "bg-[#7DE888]",
    },
    {
      id: 4,
      name: "Booking",
      icon: <FaBookmark color="white" />,
      value: 5,
      bg: "bg-[#E87D7D]",
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-4 p-2">
      {dashboardItems?.map((item, index) => (
        <div
          key={index}
          className="text-[#4C4C4C] bg-white rounded p-4 flex flex-col gap-3"
        >
          <div className="flex items-center gap-2">
            <div
              className={`${item?.bg} rounded-full h-10 w-10 flex items-center justify-center`}
            >
              {item?.icon}
            </div>
            <span className="text-[#4c4c4c] text-sm font-medium">
              {item?.name}
            </span>
          </div>
          <div className="text-3xl text-[#4c4c4c] font-semibold pl-3">
            {item?.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
