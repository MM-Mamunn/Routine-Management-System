import { useState } from 'react'
import Home from "./pages/home";
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
