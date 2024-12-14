import { useState } from 'react'
import Home from "./pages/home";
import HomePage from './pages/LoggedHome';
import Logout from './pages/authentication/Logout';
import LoginPage from './pages/authentication/Login';
import RegistrationForm from './pages/authentication/RegistrationForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import './App.css'

function App() {

  return (
    <>
     <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<HomePage />} />

        <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="logout" element={<Logout />} />
        <Route path="reg" element={<RegistrationForm />} />
        </Route>


            {/* <Route path="/home" element={<Home />} /> */}
            {/* 
            <Route path="/failed">
              <Route path="" element={<Failed />} />
              <Route path=":id?/:id2?" element={<Failed />} />
            </Route> */}

          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
