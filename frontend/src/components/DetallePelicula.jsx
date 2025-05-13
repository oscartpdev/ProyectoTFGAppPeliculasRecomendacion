import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { sacarDetalles,obtenerListaFavoritos, crearListaFavoritos, agregarAFavoritos  } from '../utils/api'
import Header from './Header'
import Footer from './Footer'

function DetallePelicula() {
  const { id } = useParams()
  const [detalles, setDetalles] = useState({})
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  useEffect(() => {
    async function fetchData() {
      const data = await sacarDetalles(id)
      console.log(data)
      setDetalles(data)
    }
    fetchData()
  }, [id])

  const manejarAgregarFavoritos = async () => {
  if (!usuario) {
    alert('Debes estar logueado para agregar favoritos.')
    return
  }

  try {
    // 1. Obtener la lista del usuario
    let lista_id = await obtenerListaFavoritos(usuario.id)
    console.log('Lista de favoritos:',lista_id)
    if (!lista_id) {
      lista_id = await crearListaFavoritos(usuario.id)
    }

    // 2. Agregar la película
    console.log(detalles.id)
    const resultado = await agregarAFavoritos(lista_id, detalles.id)
    console.log(resultado)
    alert(resultado.message)
  } catch (error) {
    console.error('Error al agregar a favoritos:', error)
    alert('Ocurrió un error al agregar la película.')
  }
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-red-800 via-black to-gray-900 text-white py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
          
          {/* Poster */}
          <div className="shadow-lg rounded-lg overflow-hidden w-[300px] flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${detalles.poster_path}`}
              alt={detalles.title}
              className="w-full h-[450px] object-cover"
            />
          </div>

          {/* Detalles */}
          <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{detalles.title}</h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 text-xl font-semibold mr-2">⭐ {detalles.vote_average}</span>
              <span className="text-gray-500 text-sm">({detalles.vote_count} votos)</span>
            </div>

            {/* Fecha y Presupuesto */}
            <p className="text-sm mb-2">
                <strong>Fecha de Lanzamiento:</strong> {detalles.release_date ? detalles.release_date : 'No hay datos disponibles'}
            </p>
            <p className="text-sm mb-2">
                <strong>Presupuesto:</strong> {detalles.budget && detalles.budget > 0 ? `${detalles.budget} $` : 'No hay datos disponibles'}
            </p>

            {/* Géneros */}
            <div className="mb-4">
              <strong className="block mb-1">Géneros:</strong>
              <div className="flex flex-wrap gap-2">
                {detalles.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Sinopsis */}
            <div className="mb-6">
              <strong className="block mb-1">Sinopsis:</strong>
              <p className="text-sm text-gray-700">{detalles.overview}</p>
            </div>
            <div className="mb-6">
            <strong className="block mb-1">Página Web:</strong>
            {detalles.homepage ? (
                <a href={detalles.homepage} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline hover:text-blue-800">{detalles.homepage}</a>):(<p className="text-sm text-gray-500">No hay enlace disponible</p>)}
            </div>

           <button
            onClick={manejarAgregarFavoritos}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            Agregar a Favoritos
          </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default DetallePelicula
