import React, { useMemo } from "react";
import { ReactTable } from "../../ui/Table";
import Button from "../../ui/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useHotelData } from "../../hooks/useQueryData";
import { useAuthStore } from "../../store/useAuthStore";
import { BiPlus } from "react-icons/bi";

const Hotel = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { data, isLoading, isError } = useHotelData(user?.data?._id);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row?.title,
        id: "name",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/${
                  row?.original?.image
                }`}
                alt="hotel"
                className="w-16 h-16 rounded"
              />
              <p>{row?.original?.title}</p>
            </div>
          );
        },
        header: () => <span>Hotel Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.type,
        id: "type",
        cell: (info) => info.getValue(),
        header: () => <span>Hotel Type</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.rooms[0]?.roomPrice,
        id: "priceRange",
        cell: (info) => info.getValue(),
        header: () => <span>Price Range</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.rooms,
        id: "Room",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              {row?.original?.rooms?.map((item, index) => (
                <img
                  key={index}
                  src={`${import.meta.env.VITE_IMAGE_URL}/${item?.image}`}
                  alt="hotel"
                  className="w-16 h-16 rounded"
                />
              ))}
            </div>
          );
        },
        header: () => <span>Rooms</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.candidates,
        id: "appPin",
        cell: ({ row }) => {
          return (
            <div
              className="flex items-center gap-1 cursor-pointer hover:underline"
              onClick={() =>
                navigate("/add-room", {
                  state: { id: row?.original_id, name: row?.original?.title },
                })
              }
            >
              <BiPlus fontSize={24} color="#002D62" cursor={"pointer"} />
              Add Room
              {/* <MdEdit fontSize={24} color="#002D62" cursor={"pointer"} /> */}
              {/* <MdDelete fontSize={24} color="#DC2A2A" cursor={"pointer"} /> */}
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
        <h2 className="text-xl font-bold text-[#343434]">Hotel</h2>
        <div className="w-32">
          <Button
            btnName={"Add Hotel"}
            btnClick={() => navigate("/add-hotel")}
          />
        </div>
      </div>
      <ReactTable
        data={data?.data || []}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default Hotel;
