import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Ajustes from './Ajustes'
import { useState,useEffect } from 'react'
import ListaPeliculas from './ListaPeliculas'
import { obtenerPeliculasDeLista } from '../utils/api'
function MiPerfil() {
  const [vista, setVista] = useState('ajustes')
  const [usuario, setUsuario] = useState()

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario')
    
    if (storedUser) {
      setUsuario(JSON.parse(storedUser))
    }
    
  }, [])
  

  const [peliculas, setPeliculas] = useState([])

  useEffect(() => {
    async function cargarPeliculas() {
      if (!usuario) return

      let nombreLista = ''
      if (vista === 'favoritas') nombreLista = 'Mis Favoritas'
      if (vista === 'verDespues') nombreLista = 'Vermastarde'
      if (vista === 'valoradas') nombreLista = 'Valoradas'
      if (nombreLista) {
        const resultado = await obtenerPeliculasDeLista(usuario.id, nombreLista)
        setPeliculas(resultado)
      }
    }

    cargarPeliculas()
  }, [vista, usuario])

  return (
    <>
      <Header/>
      <main className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Mi Perfil</h2>
        <ul className="space-y-2">
          <li>
            <button onClick={() => setVista('ajustes')}>⚙️ Ajustes</button>
          </li>
          <li>
            <button onClick={() => setVista('favoritas')}>❤️ Favoritas</button>
          </li>
          <li>
            <button onClick={() => setVista('valoradas')}>⭐ Valoradas</button>
          </li>
          <li>
            <button onClick={() => setVista('verDespues')}>⏰ Ver Más Tarde</button>
          </li>
        </ul>
      </aside>

      {/* Contenido principal dinámico */}
      <section className="flex-1 p-6">
        {vista === 'ajustes' && usuario && <Ajustes usuario={usuario} />}
        {vista === 'favoritas' && <ListaPeliculas peliculas={peliculas} />}
        {vista === 'valoradas' && <ListaPeliculas peliculas={peliculas} />}
        {vista === 'verDespues' && <ListaPeliculas peliculas={peliculas} />}

      </section>

      </main>

      <Footer />
    </>
  )
}

export default MiPerfil