import { useEffect, useState } from 'react'
import './App.css'
import Home from './layouts/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToursContainer from './components/ToursContainer';
import Carrito from './components/Carrito';
import About from './components/About';
import Contacto from './components/Contacto';
import TourDetalle from './components/TourDetalle';
import Admin from './components/Admin';
import FormularioTour from './components/FormularioTour';
import FormularioEdicion from './components/FormularioEdicion';
import { useAuthContext } from './contexts/AuthContext';
import LoginBoost from './components/LoginBoost';
import NavBoostrap from './components/NavBoostrap';
import CarritoBootstrap from './components/CarritoBootstrap';

function App() {
  const {verificacionLog} = useAuthContext();

  useEffect(() => {
    verificacionLog()
  }, [])
  
  return (
    <Router>
      <div>
        <NavBoostrap/>
        <Routes>
          <Route path="/" element={<Home />}/>
          {/*<Route path='/login' element={<Login user={usuarioLogeado} admin={adminLogeado} setLogeadoAdmin={manejarAdmin} setLogeadoUser={manejarUser}/>}/>*/}
          <Route path="/login" element={<LoginBoost/>} />
          <Route path="/tours" element={<ToursContainer/>}/>
          <Route path="/carrito" element={<CarritoBootstrap /> }/>      
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/tours/:id" element={<TourDetalle/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path="/admin/agregarTours" element={<FormularioTour/>}/>
          <Route path="/admin/editarTour/:id" element={<FormularioEdicion/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;