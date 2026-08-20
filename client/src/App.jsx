import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Trips from './pages/Trips';
import TripDetail from './pages/TripDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import NotFound from './pages/NotFound';
import React from 'react';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pacotes" element={<Trips />} />
        <Route path="pacotes/:id" element={<TripDetail />} />
        <Route path="contato" element={<Contact />} />
        <Route path="sobre" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;