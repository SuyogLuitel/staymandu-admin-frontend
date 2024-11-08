import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import BaseLayout from "./layouts/BaseLayout";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import { useAuthStore } from "./store/useAuthStore";

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
          </Route>
        )}

        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
