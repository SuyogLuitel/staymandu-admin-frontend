import React, { useEffect, useMemo, useState } from "react";
import { ReactTable } from "../../ui/Table";
import { useRoomData } from "../../hooks/useQueryData";
import { useAuthStore } from "../../store/useAuthStore";
import { Controller, useForm } from "react-hook-form";
import SelectField from "../../ui/SelectField";

const Room = () => {
  const { user } = useAuthStore();

  const { data, isLoading, isError } = useRoomData(user?.data?._id);

  const [filteredData, setFilteredData] = useState();

  const { watch, control } = useForm();

  const watchHotel = watch("hotel");

  useEffect(() => {
    if (!isLoading && !isError && data?.data) {
      const filtered = watchHotel
        ? data.data.filter((item) => item._id === watchHotel)
        : data.data;

      setFilteredData(filtered);
    }
  }, [data, watchHotel, isLoading, isError]);

  const hotelOption = data?.data?.map((item) => ({
    label: item?.title,
    value: item?._id,
  }));

  const roomData = filteredData?.flatMap((hotel) =>
    hotel.rooms.map((room) => ({
      hotelName: hotel.title,
      room,
    }))
  );

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
                  row?.original?.room?.image
                }`}
                alt="room"
                className="w-16 h-16 rounded"
              />
              <p>{row?.original?.room?.title}</p>
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
        accessorFn: (row) => row?.room?.view,
        id: "type",
        cell: (info) => info.getValue(),
        header: () => <span>View Type</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.room?.roomPrice,
        id: "pricePerNight",
        cell: (info) => info.getValue(),
        header: () => <span>Price</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => (
          <p className="flex items-center ml-8">{row?.room?.bedCount}</p>
        ),
        id: "bedCount",
        cell: (info) => info.getValue(),
        header: () => <span>Bed Count</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => (
          <p className="flex items-center ml-8">{row?.room?.guestCount}</p>
        ),
        id: "guestCount",
        cell: (info) => info.getValue(),
        header: () => <span>Guest Count</span>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  return (
    <div className="p-4">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#343434]">Room</h2>
        <div className="w-[20%]">
          <Controller
            name="hotel"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                options={hotelOption}
                placeholder={"Select hotel"}
                className="w-full"
                isClearable
              />
            )}
          />
        </div>
      </div>
      <ReactTable
        data={roomData || []}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default Room;
