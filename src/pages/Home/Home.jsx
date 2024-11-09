import React from "react";
import { FaBed, FaBookmark, FaHotel, FaUser } from "react-icons/fa";
import { useHotelData } from "../../hooks/useQueryData";
import { useAuthStore } from "../../store/useAuthStore";

const Home = () => {
  const { user } = useAuthStore();

  const { data, isLoading, isError } = useHotelData(user?.data?._id);

  const roomData = data?.data?.flatMap((hotel) =>
    hotel.rooms.map((room) => ({
      room,
    }))
  );

  const reviewData = data?.data?.flatMap((hotel) =>
    hotel.ratings.individualRatings.map((review) => ({
      review,
    }))
  );

  const bookingData = data?.data?.flatMap((hotel) =>
    hotel.rooms.flatMap((room) =>
      room.booking.map((book) => ({
        book,
      }))
    )
  );

  const dashboardItems = [
    {
      id: 2,
      name: "Hotel",
      icon: <FaHotel color="white" />,
      value: data?.data?.length,
      bg: "bg-[#E8CD7D]",
    },
    {
      id: 3,
      name: "Room",
      icon: <FaBed color="white" />,
      value: roomData?.length,
      bg: "bg-[#7DE888]",
    },
    {
      id: 1,
      name: "Rating",
      icon: <FaUser color="white" />,
      value: reviewData?.length,
      bg: "bg-[#7DA8E8]",
    },
    {
      id: 4,
      name: "Booking",
      icon: <FaBookmark color="white" />,
      value: bookingData?.length,
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
          {isLoading ? (
            <span className="bg-gray-300 h-10 w-10 rounded animate-pulse"></span>
          ) : (
            <div className="text-3xl text-[#4c4c4c] font-semibold pl-3">
              {item?.value}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
