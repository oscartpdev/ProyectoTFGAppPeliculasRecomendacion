import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { getAllAmigos } from '../utils/api'

function Social() {
  const [amigos, setAmigos] = useState([]) // <- inicializar como array vacío
  const usuario = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')) : null
  
  useEffect(() => {
    if (usuario && usuario.id) {
      getAllAmigos(usuario.id).then((data) => {
        
        if (Array.isArray(data)) {
          setAmigos(data)
          
        } else {
          setAmigos([]) // fallback por si data no es un array
        }
      })
    }
  }, [])

  return (
     <>
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Social</h1>
        <p className="mb-4">Conecta con amigos o únete a una comunidad</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Buscar amigos */}
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Buscar Amigos</h2>
            <input type="text" placeholder="Buscar amigos..." className="p-2 border rounded w-full mb-2" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Buscar</button>
          </div>

          {/* Lista de amigos */}
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Amigos</h2>
            <ul className="list-disc list-inside">
              {amigos.length > 0 ? (
                amigos.map((amigo, index) => (
                  <li key={index}>{amigo.nombre}</li>
                ))
              ) : (
                <p>No tienes amigos aún 😢</p>
              )}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Social
