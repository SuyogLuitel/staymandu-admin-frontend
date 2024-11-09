import React, { useEffect, useMemo, useState } from "react";
import { ReactTable } from "../../ui/Table";
import { IoStarHalf, IoStarOutline, IoStar } from "react-icons/io5";
import { useRoomData } from "../../hooks/useQueryData";
import { useAuthStore } from "../../store/useAuthStore";
import { Controller, useForm } from "react-hook-form";
import SelectField from "../../ui/SelectField";

const Review = () => {
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

  const reviewData = filteredData?.flatMap((hotel) =>
    hotel.ratings.individualRatings.map((review) => ({
      hotelName: hotel.title,
      hotelImage: hotel.image,
      averageRating: hotel.ratings.averageRating,
      totalRating: hotel.ratings.totalRating,
      review,
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
                  row?.original?.hotelImage
                }`}
                alt="room"
                className="w-16 h-16 rounded"
              />
              <p>{row?.original?.hotelName}</p>
            </div>
          );
        },
        header: () => <span>Room Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.totalRating,
        id: "totalRating",
        cell: (info) => info.getValue(),
        header: () => <span>Total Review</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.averageRating,
        id: "averageRating",
        cell: (info) => info.getValue(),
        header: () => <span>Average Rating</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.review?.score,
        id: "ratings",
        cell: ({ row }) => {
          const reviews = row?.original?.review?.score;
          const fullStars = Math.floor(reviews);
          const hasHalfStar = reviews % 1 >= 0.5;

          return (
            <div className="flex gap-1">
              {Array.from({ length: fullStars }, (_, index) => (
                <IoStar key={index} fontSize={20} color="#DE7921" />
              ))}
              {hasHalfStar && <IoStarHalf fontSize={20} color="#DE7921" />}
              {Array.from(
                { length: 5 - fullStars - (hasHalfStar ? 1 : 0) },
                (_, index) => (
                  <IoStarOutline
                    key={index + fullStars + (hasHalfStar ? 1 : 0)}
                    fontSize={20}
                    color="#DE7921"
                  />
                )
              )}
            </div>
          );
        },
        header: () => <span>Ratings</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.review?.comment,
        id: "comment",
        cell: (info) => info.getValue(),
        header: () => <span>Comment</span>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  return (
    <div className="p-4">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#343434]">Review</h2>
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
        data={reviewData || []}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default Review;
