import React, { useState } from "react";
import Nav1 from "../components/Nav1";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

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
      Cookies.remove("jwtToken");
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
      <Nav1 />
      <div className="pt-[70px] min-h-[99vh] bg-[#D4EBF8]">
        <div className="flex justify-center items-center container max-w-[99vw] px-1 lg:max-w-[50vw] h-[70vh] bg-[#0A3981] m-auto lg:p-3 rounded-3xl">
          <div className="container2 bg-blue-800 py-4 px-1 lg:px-2 lg:w-[30vw] w-[90vw] inline-block rounded-2xl">
            <div className="inputs flex flex-col justify-center gap-2 items-center">
              <input
                type="text"
                placeholder="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
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
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mx-2 px-1 min-h-[70px] lg:min-w-[400px] my-1 bg-white rounded-2xl"
              />
              <input
                type="text"
                placeholder="Section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="mx-2 px-1 min-h-[70px] lg:min-w-[400px] my-1 bg-white rounded-2xl"
              />
              <button
                className="border-2 border-blue-950 text-white px-2 py-1 disabled:bg-blue-900 rounded-lg bg-[#E38E49]"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
