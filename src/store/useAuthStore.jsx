import { create } from "zustand";
import Cookies from "universal-cookie";
import { decryptedData, encryptData } from "../utils/crypto";
import toast from "react-hot-toast";

const cookies = new Cookies();

const authStore = (set) => ({
  loggedIn: decryptedData(cookies.get("admin"))?.token ? true : false,
  user: decryptedData(cookies.get("admin")) || null,

  setUser: (user) => {
    set(() => {
      cookies.set("admin", encryptData(user));
      return { user: user, loggedIn: true };
    });
  },

  logout: () => {
    set(() => {
      cookies.remove("admin");
      return {
        loggedIn: false,
        user: null,
      };
    });
    toast.success("Logout successfully");
  },
});

export const useAuthStore = create(authStore);
