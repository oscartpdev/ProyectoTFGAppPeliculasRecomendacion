// src/api/tmdb.js
const API_KEY = "df8a38a1131f88855834d066ccaee467";
const BASE_URL = "https://api.themoviedb.org/3";
const BASE_BACKEND_URL = "http://localhost:5000";
// https://api.themoviedb.org/3/movie/popular?api_key=TU_API_KEY
export async function buscarPeliculas(query) {
  const res = await fetch(`${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`); 
  const data = await res.json();
  return data.results;
}
export async function peliculasPopulares() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
  const data = await res.json()
  return data.results || []
}

export async function peliculasMejorValoradas() {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
  const data = await res.json()
  return data.results || []
}
export async function sacarDetalles(id){
  const resultado = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
  const data = await resultado.json()
  return data
}
export async function registrarUsuario(formData) {
  try {
    const res = await fetch(`${BASE_BACKEND_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Error en el registro');
    }

    return data; // { message: 'Registro exitoso' }
  } catch (error) {
    throw error;
  }
}
export async function getAmigos(usuario_id,amigo_id){
  try {
    const res = await fetch(`${BASE_BACKEND_URL}/friends/${amigo_id}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Usuario-Id': usuario_id,
      },
    })
    const data = await res.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
export async function getAllAmigos(usuario_id) {
  try {
    const res = await fetch(`${BASE_BACKEND_URL}/all_friends`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Usuario-Id': usuario_id,
      },
    });

    const data = await res.json();
    return data; 
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function obtenerListaPorNombre(usuario_id, nombre) {
  const response = await fetch(`${BASE_BACKEND_URL}/lista/${usuario_id}/${nombre}`);
  const data = await response.json();
  return data.lista_id;
}

export async function crearLista(usuario_id, nombre) {
  const response = await fetch(`${BASE_BACKEND_URL}/crear_lista`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario_id, nombre })
  });
  const data = await response.json();
  return data.lista_id;
}
export async function agregarAFavoritos(lista_id, pelicula_id) {
  const response = await fetch(`${BASE_BACKEND_URL}/agregar_a_lista`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lista_id, pelicula_id })
  });
  return response.json(); // contiene { message: ... }
}
export async function obtenerPeliculasDeLista(usuario_id, nombre_lista) {
  const response = await fetch(`http://localhost:5000/peliculas_lista/${usuario_id}/${nombre_lista}`);
  const data = await response.json();
  console.log(data)
  const ids = data.peliculas.map(p => p.pelicula_id);
  console.log(ids)
  // Obtener los detalles desde TheMovieDB
  const detalles = await Promise.all(
    ids.map(id => sacarDetalles(id))
  );

  return detalles;
}
export async function valorarPelicula(usuario_id, pelicula_id, valor) {
  const response = await fetch('http://localhost:5000/valorar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario_id, pelicula_id, valor }),
  })

  const data = await response.json()

  if (!response.ok) throw new Error(data.error || 'Error al valorar')

  return data
}
