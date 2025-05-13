import React from 'react'

function ListaPeliculas({ titulo, peliculas, mostrarRating }) {
  return (
   <>
     <div>
      <h2 className="text-2xl font-bold mb-4">{titulo}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {peliculas.map(peli => (
          <div key={peli.id} className="bg-white shadow p-4 rounded">
            <img
              src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`}
              alt={peli.title}
              className="rounded mb-2"
            />
            <h3 className="font-semibold">{peli.title}</h3>
            {mostrarRating && <p>⭐ {peli.rating}/5</p>}
          </div>
        ))}
      </div>
    </div>
   </> 
  )
}

export default ListaPeliculas