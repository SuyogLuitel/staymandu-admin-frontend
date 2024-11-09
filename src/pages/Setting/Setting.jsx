import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { getInitials } from "../../utils/getInitials";
import { timeAgo } from "../../utils/timeAgo";

const Setting = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="font-bold text-xl">My Profile</h2>
      <div className="w-16 h-16 rounded-full flex mt-5 items-center justify-center text-2xl text-white bg-[#1D293B] cursor-pointer">
        {getInitials(user.data.fullname)}
      </div>
      <div className="flex items-center gap-4 ml-2">
        <p className="font-bold">Name:</p> {user.data.fullname}
      </div>
      <div className="flex items-center gap-4 ml-2">
        <p className="font-bold">Email:</p> {user.data.email}
      </div>
      <p className="flex items-center gap-4 ml-2 text-sm font-medium">
        You joined us {timeAgo(user.data.createdAt)}
      </p>
    </div>
  );
};

export default Setting;
