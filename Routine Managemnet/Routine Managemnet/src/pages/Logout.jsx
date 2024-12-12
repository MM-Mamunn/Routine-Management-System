import React from 'react'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function Logout() {
      const navigate = useNavigate();
      const handleLogout = () => {
        Cookies.remove("jwtToken"); // Remove the JWT token from cookies
        navigate("/login"); // Redirect to login page
      };
    
  return (
    <div>
      
<button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
