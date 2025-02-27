import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import PerfumeDetail from "./pages/PerfumeDetail";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Login from "./pages/Login";
import About from "./pages/About";
import "./style.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/katalogus" element={<Catalog />} />
          <Route path="/kereses" element={<Search />} />
          <Route path="/rolunk" element={<About />} />
          <Route path="/bejelentkezes" element={<Login />} />
          <Route path="/regisztracio" element={<Register />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/parfume/:id" element={<PerfumeDetail />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
