// src/components/Inicio.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
function Inicio() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleLogin = async (e) => {
    e.preventDefault()
  
    if (!email || !password) {
      alert('Por favor, completa los campos.')
      return
    }
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, contrasena: password }),
      })
  
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        // Login exitoso
        alert('Inicio de sesión correcto')
        // Puedes guardar el usuario en localStorage si quieres mantener sesión
        localStorage.setItem('usuario', JSON.stringify(data.user))
        navigate('/home')
      } else {
        // Error de credenciales
        alert(data.message || 'Credenciales incorrectas')
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
      alert('Error al conectar con el servidor')
    }
  }
  
  return (

    <div className="flex min-h-screen">
      {/* Izquierda */}
      <div className="w-1/2 bg-gray-900 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">🎬 Pelifly</h1>
        <p className="text-lg mb-6 text-center max-w-md">
          Descubre y guarda tus películas favoritas. Recibe recomendaciones personalizadas según tus gustos.
        </p>
        <img
          src="https://image.tmdb.org/t/p/original/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg"
          alt="Poster ejemplo"
          className="w-80 rounded shadow-lg"
        />
      </div>

      {/* Derecha */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <form className="w-2/3 max-w-md"  onSubmit={handleLogin}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Inicia sesión</h2>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 mb-6 border border-gray-300 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Entrar
          </button>
          <p className="mt-4 text-center text-sm text-gray-500">
            ¿No tienes cuenta? <Link to={"/register"}><span className="text-blue-600 cursor-pointer">Regístrate</span></Link>
          </p>
          <Link to={"/home"} >Home</Link>
        </form>
      </div>
    </div>
  )
}

export default Inicio
