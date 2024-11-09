import React, { useMemo } from "react";
import { ReactTable } from "../../ui/Table";
import Button from "../../ui/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoStarHalf, IoStarOutline, IoStar } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useRoomData } from "../../hooks/useQueryData";
import { useAuthStore } from "../../store/useAuthStore";
import { formatDate } from "../../utils/formatDate";

const Booking = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { data, isLoading, isError } = useRoomData(user?.data?._id);

  const bookingData = data?.data?.flatMap((hotel) =>
    hotel.rooms.flatMap((room) =>
      room.booking.map((book) => ({
        hotelName: hotel.title,
        hotelImage: hotel.image,
        roomName: room.title,
        roomImage: room.image,
        book,
      }))
    )
  );
  console.log(bookingData);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row?.roomName,
        id: "name",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/${
                  row?.original?.hotelImage
                }`}
                alt="room"
                className="w-16 h-16 rounded"
              />
              <p>{row?.original?.hotelName}</p>
            </div>
          );
        },
        header: () => <span>Hotel Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.roomName,
        id: "name",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/${
                  row?.original?.roomImage
                }`}
                alt="room"
                className="w-16 h-16 rounded"
              />
              <p>{row?.original?.roomName}</p>
            </div>
          );
        },
        header: () => <span>Room Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.book.userId,
        id: "user",
        cell: (info) => info.getValue(),
        header: () => <span>User</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.book.totalPrice,
        id: "totalPrice",
        cell: (info) => info.getValue(),
        header: () => <span>Total Price</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => (
          <p>
            {formatDate(row?.book?.startDate)} -{" "}
            {formatDate(row?.book?.endDate)}
          </p>
        ),
        id: "time",
        cell: (info) => info.getValue(),
        header: () => <span>Date</span>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  return (
    <div className="p-4">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#343434]">Booking</h2>
        {/* <div className="w-40">
          <Button btnName={"Add Room"} btnClick={() => navigate("/add-room")} />
        </div> */}
      </div>
      <ReactTable
        data={bookingData || []}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default Booking;
