import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

export const useMutate = (
  queryKey,
  basePath,
  contentType = "application/json"
) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const mutation = useMutation({
    mutationFn: async (params) => {
      const requestData = {
        method: params?.[0],
        url: basePath + params?.[1],
        data: params?.[2],
        headers: {
          "Content-Type": contentType,
        },
      };
      const response = await axiosPrivate(requestData);
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
    onError: () => {
      return error?.response?.data;
    },
  });
  return mutation;
};

export const useLoginMutation = () =>
  useMutate(["login"], "api/v1/admin/login");

export const useHotelMutation = () =>
  useMutate(["hotel"], "api/v1/hotel/add", "multipart/form-data");

export const useRoomMutation = () =>
  useMutate(["room"], "api/v1/hotel/add-room", "multipart/form-data");
