import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css"; // CSS for "react-toastify"

// Private route
import { PrivateRoutes } from "./utils";

// Pages
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  PasswordResetPage,
  GamesHomePage
} from "./pages";
import { NavigationBar } from "./components";
import React from "react";
import AdminPage from "pages/AdminPage/AdminPage";
import CreateNewGamePage from "pages/AdminPage/CreateNewGamePage/CreateNewGamePage";
import GamePage from "pages/GamesPage/GamePage/GamePage";
import RedeemPage from "pages/RedeemPage/RedeemPage";

const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        {/* Private routes (Requires authentication token) */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route
          path="/passwordReset/:resetToken"
          element={<PasswordResetPage />}
        />

        <Route path="/games" element={<GamesHomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/createnewgame" element={<CreateNewGamePage />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/redeem/:id" element={<RedeemPage />} />

        {/* If the user enters an invalid path in the URL it automatically redirects them to the homepage */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {/* Remember to render the ToastContainer once in your application tree. Rendering it in the application root would be the best bet */}
      <ToastContainer />
    </>
  );
};

export default App;
