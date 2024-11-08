import React, { useMemo } from "react";
import { ReactTable } from "../../ui/Table";
import Button from "../../ui/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoStarHalf, IoStarOutline, IoStar } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useRoomData } from "../../hooks/useQueryData";
import { useAuthStore } from "../../store/useAuthStore";

const Room = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { data, isLoading, isError } = useRoomData(user?.data?._id);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row?.roomName,
        id: "name",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <img
                src={`http://localhost:4000${row?.original?.image}`}
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
        accessorFn: (row) => row?.hotelName,
        id: "hotelName",
        cell: (info) => info.getValue(),
        header: () => <span>Hotel Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.roomType,
        id: "type",
        cell: (info) => info.getValue(),
        header: () => <span>Room Type</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.pricePerNight,
        id: "pricePerNight",
        cell: (info) => info.getValue(),
        header: () => <span>Price</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.totalRooms,
        id: "totalRooms",
        cell: (info) => info.getValue(),
        header: () => <span>Total Room</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.availableRooms,
        id: "availableRooms",
        cell: (info) => info.getValue(),
        header: () => <span>Available Room</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.candidates,
        id: "appPin",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <MdEdit fontSize={24} color="#002D62" cursor={"pointer"} />
              <MdDelete fontSize={24} color="#DC2A2A" cursor={"pointer"} />
            </div>
          );
        },
        header: () => <span>Action</span>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  return (
    <div className="p-4">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#343434]">Room</h2>
        {/* <div className="w-40">
          <Button btnName={"Add Room"} btnClick={() => navigate("/add-room")} />
        </div> */}
      </div>
      <ReactTable
        data={data || []}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default Room;
