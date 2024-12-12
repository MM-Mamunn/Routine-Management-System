import { useState } from 'react'
import Home from "./pages/home";
import LoginPage from './pages/Login';
import Logout from './pages/Logout';
import HomePage from './pages/LoggedHome';
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />
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
