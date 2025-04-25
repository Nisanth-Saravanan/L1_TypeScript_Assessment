import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import ReportList from "./components/ReportList";
import AboutUs from "./components/AboutUs";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reports" element={<ReportList />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
