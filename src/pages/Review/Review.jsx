import React, { useMemo } from "react";
import { ReactTable } from "../../ui/Table";
import Button from "../../ui/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoStarHalf, IoStarOutline, IoStar } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useRoomData } from "../../hooks/useQueryData";
import { useAuthStore } from "../../store/useAuthStore";

const Review = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { data, isLoading, isError } = useRoomData(user?.data?._id);

  const reviewData = data?.data?.flatMap((hotel) =>
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
        {/* <div className="w-40">
          <Button btnName={"Add Room"} btnClick={() => navigate("/add-room")} />
        </div> */}
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
