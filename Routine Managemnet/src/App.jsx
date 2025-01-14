import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import Home from "./pages/home";
import HomePage from "./pages/LoggedHome";
import Logout from "./pages/authentication/Logout";
import LoginPage from "./pages/authentication/Login";
import RoomAvailability from "./pages/room/RoomAvailability";
import RegistrationForm from "./pages/authentication/RegistrationForm";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = Cookies.get("jwtToken");
      if (token) {
        try {
          const response = await axios.get(
            "${import.meta.env.VITE_URL}/api/user/profile",
            {
              headers: { jwtToken: token },
            }
          );
          if (response.data.rows[0]) {
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          Cookies.remove("jwtToken"); // Remove invalid token
        }
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/home" /> : <Home />}
          />
          <Route path="/sectionwiseroutine" element={<Home />} />
          <Route path="/home" element={<HomePage />} />

          <Route path="/auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="logout" element={<Logout />} />
            <Route path="reg" element={<RegistrationForm />} />
          </Route>

          <Route path="/room">
            <Route path="available" element={<RoomAvailability />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
