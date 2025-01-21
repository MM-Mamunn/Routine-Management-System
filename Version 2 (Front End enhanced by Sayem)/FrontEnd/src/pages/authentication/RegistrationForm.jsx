import React, { useState } from "react";
import Nav1 from "../components/Nav1";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../components/Header";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleRegister = async () => {
    console.log({ id, password, name, section });

    try {
      console.log("trying reg");

      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/register/new`,
        {
          id,
          password,
          name,
          section,
        }
      );
      console.log("trying reg api called ");
      const { jwtToken } = response.data;
      console.log(jwtToken);
      // Cookies.remove("jwtToken");
      Cookies.set("jwtToken", jwtToken, { expires: 1 }); // Save token in cookies for 1 day
      console.log("Token saved:", jwtToken);
      alert("Successfully Registered");
      navigate("/auth/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Invalid credentials or section not found");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <Header />
      <div className="bg-purple-50 p-8 mt-8 max-w-xs mx-auto rounded-xl">
        <div>
          <h1 className="text-xl font-bold">Register</h1>
          <p className="mb-6 text-sm">Unlock all potential</p>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="h-9 w-full px-2 bg-white rounded"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-9 w-full px-2 bg-white rounded"
            />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 w-full px-2 bg-white rounded"
            />
            <input
              type="text"
              placeholder="Section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="h-9 w-full px-2 bg-white rounded"
            />
            <button
              className="h-8 border w-full bg-purple-600 hover:bg-purple-600/90 text-white transition-colors disabled:bg-gray-400 hover:text-white px-4 rounded cursor-pointer"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
