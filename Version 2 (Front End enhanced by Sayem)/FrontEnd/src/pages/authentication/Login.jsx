import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Nav1 from "../components/Nav1";
import axios from "axios";
import Header from "../components/Header";

const LoginPage = () => {
  const [id, setid] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/login`,
        {
          id,
          password,
        }
      );
      const { jwtToken } = response.data;
      console.log(jwtToken);

      Cookies.set("jwtToken", jwtToken, { expires: 1 }); // Save token in cookies for 1 day
      console.log("Token saved:", jwtToken);
      navigate("/home"); // Navigate to the home page
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <Header />
      <div>
        <div className="bg-purple-50 p-8 mt-8 max-w-xs mx-auto rounded-xl">
          <div>
            <h1 className="text-xl font-bold">Welcome</h1>
            <p className="mb-6 text-sm">Happy to see you again</p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="id"
                value={id}
                onChange={(e) => setid(e.target.value)}
                className="h-9 w-full px-2 bg-white rounded"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-9 w-full px-2 bg-white rounded"
              />
              <button
                className="h-8 border w-full bg-purple-600 hover:bg-purple-600/90 text-white transition-colors disabled:bg-gray-400 hover:text-white px-4 rounded cursor-pointer"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
