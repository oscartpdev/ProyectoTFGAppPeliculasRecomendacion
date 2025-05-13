import React from 'react'
import { Link } from 'react-router-dom'
function CarruselPeliculas({titulo,movies}) {
  return (
    <>
      <div className="mb-8 px-4">
      <h2 className="text-2xl font-bold mb-4">{titulo}</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[200px] bg-gray-700 shadow rounded-lg p-2">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="rounded mb-2 w-full h-[300px] object-cover"
            />
            <h3 className="text-md font-semibold truncate">{movie.title}</h3>
            <Link to={`/pelicula/${movie.id}`}>Ver Detalles</Link>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default CarruselPeliculas