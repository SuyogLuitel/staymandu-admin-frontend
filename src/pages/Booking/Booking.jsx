import React, { useEffect, useMemo, useState } from "react";
import { ReactTable } from "../../ui/Table";
import { useRoomData, useUserData } from "../../hooks/useQueryData";
import { useAuthStore } from "../../store/useAuthStore";
import { formatDate } from "../../utils/formatDate";
import SelectField from "../../ui/SelectField";
import { Controller, useForm } from "react-hook-form";

const Booking = () => {
  const { user } = useAuthStore();

  const { data, isLoading, isError } = useRoomData(user?.data?._id);
  const { data: userData } = useUserData();

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

  const bookingData = filteredData?.flatMap((hotel) =>
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
        accessorFn: (row) =>
          userData?.user?.find((item) => item?._id === row?.book.userId)
            ?.fullname,
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
    [userData]
  );

  return (
    <div className="p-4">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#343434]">Booking</h2>
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
        data={bookingData || []}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default Booking;
