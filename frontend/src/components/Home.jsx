import React, { use } from 'react'
import { useState,useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { buscarPeliculas,peliculasMejorValoradas,peliculasPopulares } from '../utils/api'
import MovieCarousel from './CarruselPeliculas'
function Home() {
    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [popular, setPopular] = useState([])
    const [topRated, setTopRated] = useState([])
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    
    useEffect(() => {
        async function loadInitialData() {
          const popularMovies = await peliculasPopulares()
          const topRatedMovies = await peliculasMejorValoradas()
          setPopular(popularMovies)
          setTopRated(topRatedMovies)
        }
        loadInitialData()
      }, [])

   

    const handleSearch = async (e) =>{
        e.preventDefault()
        const resultados = await buscarPeliculas(query)
        console.log(resultados)
        setSearchResults(resultados)
    }

  return (
    <>
        <Header />
        
        <main className="min-h-screen bg-gradient-to-b from-red-800 via-black to-gray-900 text-white py-10">
          <h1 className=''>Bienvenido de nuevo {usuario.nombre}</h1>
            <section>
                <h1 className="text-4xl font-bold text-center my-8">Sistema De Recomendacion de Peliculas</h1>
                <div className="flex justify-center mb-8">
                    <input type="text" placeholder="Buscar Peliculas" onChange={(e) => setQuery(e.target.value)} className="border border-gray-300 rounded-l px-4 py-2" />
                    <button className="bg-blue-500 text-white rounded-r px-4 py-2" onClick={handleSearch}>Buscar</button>
                </div>
                {searchResults.length > 0 ? (
                <MovieCarousel title={`Resultados de "${query}"`} movies={searchResults} />
                ) : (
                    <>
                    <MovieCarousel titulo="Peliculas Populares" movies={popular} />
                    <MovieCarousel titulo="Peliculas Mejor Valoradas" movies={topRated} />
                    </>
                )}
            </section>
        </main>


        <Footer />
    </>
  )
}

export default Home