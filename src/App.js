import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Usuarios from './views/Usuarios';
import Libros from './views/Libros';
import Inventarios from './views/Inventarios';
import Pagos from './views/Pagos';
import Prestamos from './views/Prestamos';
import Notificaciones from "./views/Notificaciones";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Usuarios />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/libros" element={<Libros />} />
        <Route path="/inventarios" element={<Inventarios />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/prestamos" element={<Prestamos />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
      </Routes>
    </Router>
  );
};

export default App;
