import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const LoginPage = () => {
  const [id, setid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", { id, password });
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

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="id"
        value={id}
        onChange={(e) => setid(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
