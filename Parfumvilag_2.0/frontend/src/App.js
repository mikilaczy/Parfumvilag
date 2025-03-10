// Parfumvilag_2.0\frontend\src\App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import PerfumeDetail from './pages/PerfumeDetail';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Search from './pages/Search';
import Login from './pages/Login';
import About from './pages/About';
import Aszf from './pages/Aszf'; // Új import
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
          <Route path="/aszf" element={<Aszf />} /> {/* Új útvonal */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;