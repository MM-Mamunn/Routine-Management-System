import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("jwtToken"); // Remove the JWT token from cookies
    navigate("/"); // Redirect to login page
  };
  return (
    <header className="bg-purple-600 text-white">
      <div className="container flex justify-between items-center py-2">
        <div>
          <Link to="/" className="text-xl font-bold">
            RMS
          </Link>
        </div>
        <ul className="flex items-center gap-4 text-sm">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Section
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/room/available"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Room Available
            </NavLink>
          </li>
          {!Cookies.get("jwtToken") && (
            <li>
              <NavLink
                to="/auth/reg"
                className={({ isActive }) => (isActive ? "underline" : "")}
              >
                Register
              </NavLink>
            </li>
          )}
          {Cookies.get("jwtToken") ? (
            <li>
              <span onClick={handleLogout} className="cursor-pointer">
                Logout
              </span>
            </li>
          ) : (
            <li>
              <NavLink
                to="/auth/login"
                className={({ isActive }) => (isActive ? "underline" : "")}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
