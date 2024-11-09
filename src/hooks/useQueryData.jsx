import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

export const useQueryData = (key, path, params = "", enabled = true) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: [key, params],
    queryFn: () =>
      axiosPrivate({
        url: path,
        method: "get",
        params: params,
      }).then((res) => res?.data && res?.data),
    enabled,
  });
};

export const useHotelData = (id) =>
  useQueryData(["hotel", id], `api/v1/hotel/list/${id}`, "");

export const useRoomData = (id) =>
  useQueryData(["room", id], `api/v1/hotel/list/${id}`, "");

export const useUserData = () => useQueryData(["user"], `api/v1/user/list`, "");
