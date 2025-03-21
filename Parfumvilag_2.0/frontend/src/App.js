import React, { createContext, useState } from 'react';
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
import Aszf from './pages/Aszf';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// AuthContext létrehozása
export const AuthContext = createContext();

function App() {
  // Ideiglenes állapot a bejelentkezéshez (ezt a te logikádhoz kell igazítani)
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Példa: true, ha be van jelentkezve

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
            <Route path="/aszf" element={<Aszf />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;