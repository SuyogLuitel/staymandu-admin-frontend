import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import SelectField from "../../ui/SelectField";
import { BiArrowBack, BiHotel } from "react-icons/bi";
import LoginInput from "../../ui/LoginInput";
import Button from "../../ui/Button";
import { useRoomMutation } from "../../hooks/useMutateData";
import toast from "react-hot-toast";

const roomSchema = Yup.object().shape({
  title: Yup.string().required("Room name is required"),
  view: Yup.string().required("View type is required"),
  roomPrice: Yup.string().required("Room Price is required"),
  bedCount: Yup.string().required("Bed Count is required"),
  guestCount: Yup.string().required("Guest Count is required"),
  description: Yup.string().required("Description is required"),
});

const AddRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, name } = location.state || {};
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setselectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(roomSchema),
  });

  const typeOptions = [
    { label: "City View", value: "cityView" },
    { label: "Lake View", value: "lakeView" },
    { label: "Forest View", value: "forestView" },
    { label: "Mountain View", value: "mountainView" },
  ];

  const amenitiesOptions = [
    { label: "Room Service", value: "roomService" },
    { label: "TV", value: "TV" },
    { label: "Balcony", value: "balcony" },
    { label: "Free Wifi", value: "freeWifi" },
    { label: "Air Condition", value: "airCondition" },
    { label: "Sound Proof", value: "soundProof" },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setselectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const roomMutation = useRoomMutation();

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("roomPrice", data.roomPrice);
    formData.append("guestCount", data.guestCount);
    formData.append("bedCount", data.bedCount);
    formData.append("view", data.view);
    formData.append("image", selectedImage);
    formData.append("description", data.description);

    amenitiesOptions.forEach(({ value }) => {
      formData.append(value, data[value]);
    });

    roomMutation.mutateAsync(["post", `/${id}`, formData], {
      onSuccess: (response) => {
        navigate("/hotels");
        toast.success("Room added successfully");
        reset();
        setselectedImage(null);
        setImagePreview(null);
        setIsSubmitting(false);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
        setIsSubmitting(false);
      },
    });
  };

  return (
    <div className="p-8 flex flex-col gap-8 bg-secondary">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <BiArrowBack onClick={() => navigate(-1)} cursor={"pointer"} />
        Describe your room for {name}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-3">
            <div>
              <LoginInput
                labelName={"Room Name"}
                name={"title"}
                placeholder={"Enter your room name"}
                register={register}
                icon={<BiHotel fontSize={24} className="text-[#8E8E93] pr-2" />}
              />
              <p className="text-red-600 text-sm mt-1">
                {errors?.title?.message}
              </p>
            </div>
            <div>
              <LoginInput
                labelName={"Room price"}
                name={"roomPrice"}
                type="number"
                placeholder={"Enter your room price"}
                register={register}
                icon={<BiHotel fontSize={24} className="text-[#8E8E93] pr-2" />}
              />
              <p className="text-red-600 text-sm mt-1">
                {errors?.roomPrice?.message}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-full">
                <LoginInput
                  labelName={"Bed Count"}
                  name={"bedCount"}
                  type="number"
                  placeholder={"Enter your bed count"}
                  register={register}
                  icon={
                    <BiHotel fontSize={24} className="text-[#8E8E93] pr-2" />
                  }
                />
                <p className="text-red-600 text-sm mt-1">
                  {errors?.bedCount?.message}
                </p>
              </div>
              <div className="w-full">
                <LoginInput
                  labelName={"Guest Count"}
                  name={"guestCount"}
                  type="number"
                  placeholder={"Enter your guest count"}
                  register={register}
                  icon={
                    <BiHotel fontSize={24} className="text-[#8E8E93] pr-2" />
                  }
                />
                <p className="text-red-600 text-sm mt-1">
                  {errors?.guestCount?.message}
                </p>
              </div>
            </div>
            <Controller
              name="view"
              control={control}
              render={({ field }) => (
                <SelectField
                  required
                  {...field}
                  label={"Select view Type"}
                  options={typeOptions}
                  placeholder={"Select view type"}
                  className="w-full"
                  errorMessage={errors?.view?.message}
                />
              )}
            />
            <div>
              <label className="text-[16px] mb-1">Room Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-[#8E8E93] rounded"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-full h-40 object-cover"
                />
              )}
              <p className="text-red-600 text-sm mt-1">
                {errors?.image?.message}
              </p>
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[16px]">Room Description</label>
              <textarea
                {...register("description")}
                className="px-2 py-3 border h-20 border-[#8E8E93] outline-none resize-none hover:border-gray-800 focus-within:border-gray-800 rounded"
                placeholder="Enter hotel description"
              ></textarea>
              <p className="text-red-600">{errors?.description?.message}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-[6px]">
              <label className="text-[16px] mb-1">Select Amenities</label>
              <div className="grid grid-cols-2 gap-5">
                {amenitiesOptions.map((item) => (
                  <div
                    className="flex gap-1 items-center border border-[#8E8E93] p-3 rounded"
                    key={item.value}
                  >
                    <input
                      type="checkbox"
                      id={item.value}
                      {...register(item.value)}
                      className="w-4 h-4"
                    />
                    <label htmlFor={item.value} className="cursor-pointer">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  btnName={isSubmitting ? "Adding Room..." : "Add Room"}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
