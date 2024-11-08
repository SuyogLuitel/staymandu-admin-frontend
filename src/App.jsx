import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import AuthLayout from "./layouts/AuthLayout";
import BaseLayout from "./layouts/BaseLayout";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import Hotel from "./pages/Hotel/Hotel";
import AddHotel from "./pages/Hotel/AddHotel";
import Room from "./pages/Room/Room";
import AddRoom from "./pages/Room/AddRoom";

const App = () => {
  const { loggedIn } = useAuthStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {loggedIn && (
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<Hotel />} />
            <Route path="/rooms" element={<Room />} />
            <Route path="/add-hotel" element={<AddHotel />} />
            <Route path="/add-room" element={<AddRoom />} />
          </Route>
        )}

        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
