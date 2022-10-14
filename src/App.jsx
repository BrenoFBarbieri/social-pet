import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserStorage } from './UserContext';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/Login/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
			<UserStorage>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/conta" element={<p>Conta</p>} />
        </Routes>
        <Footer />
			</UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
