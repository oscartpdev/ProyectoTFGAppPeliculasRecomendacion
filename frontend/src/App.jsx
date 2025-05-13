import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import MiPerfil from './components/MiPerfil'
import DetallePelicula from './components/DetallePelicula'
import Inicio from './components/Inicio'
import Registro from './components/Registro'
import Social from './components/Social'
function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mi-perfil" element={<MiPerfil />} />
          <Route path="/pelicula/:id" element={<DetallePelicula />} />
          <Route path="/register" element={<Registro />} />
          <Route path="/social" element={<Social />}/>
          {/* <Route path="/contact" element={<Contact />} /> */}
         
        </Routes>
        
      </Router>
    </>
  )
}

export default App
