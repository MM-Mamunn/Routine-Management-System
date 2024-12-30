import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Nav1 from "../components/Nav1";
import axios from "axios";

const LoginPage = () => {
  const [id, setid] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        id,
        password,
      });
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
      <Nav1 />
      <div className="pt-[70px] min-h-[99vh] bg-[#D4EBF8]">
        <div className="flex justify-center items-center container max-w-[99vw] px-1 lg:max-w-[50vw] h-[60vh] bg-[#0A3981] m-auto lg:p-3 rounded-3xl">
          <div className="container2 bg-blue-800 py-4 px-1 lg:px-2 lg:w-[30vw] w-[90vw] inline-block rounded-2xl">
            <div className="inputs flex flex-col justify-center gap-2 items-center">
              <input
                type="text"
                placeholder="id"
                value={id}
                onChange={(e) => setid(e.target.value)}
                className="mx-2 px-1 min-h-[70px] lg:min-w-[400px] my-1 bg-white rounded-2xl"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mx-2 px-1 min-h-[70px] lg:min-w-[400px] my-1 bg-white rounded-2xl"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-950"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <button
                className="border-2 border-blue-950 text-white px-2 py-1 disabled:bg-blue-900 rounded-lg bg-[#E38E49]"
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