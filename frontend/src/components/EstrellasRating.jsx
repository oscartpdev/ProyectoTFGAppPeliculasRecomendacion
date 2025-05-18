import React, { useState } from 'react'
import { valorarPelicula } from '../utils/api'

function EstrellasRating({ pelicula_id, usuario_id, onValorar }) {
  const [valorSeleccionado, setValorSeleccionado] = useState(null)
  const [mensaje, setMensaje] = useState('')

  const criterios = {
    1: 'No recomendable',
    2: 'Un poco recomendable',
    3: 'Para pasar el rato',
    4: 'Buena película',
    5: 'Excelente'
  }

  const manejarValor = async (valor) => {
    try {
      // 1. Registrar la valoración en la API
      await valorarPelicula(usuario_id, pelicula_id, valor)
      setValorSeleccionado(valor)
      setMensaje(`¡Gracias! Valoraste con ${valor} estrella(s): ${criterios[valor]}`)

      // 2. Llamar al callback si se proporciona
      if (onValorar) {
        await onValorar(valor)
      }
    } catch (error) {
      console.error(error)
      setMensaje('Error al registrar tu valoración.')
    }
  }

  return (
    <div className="mt-6">
      <p className="font-bold mb-1">¿Qué te pareció esta película?</p>
      <div className="flex gap-1 text-2xl cursor-pointer">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => manejarValor(star)}
            className={star <= valorSeleccionado ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-400'}
          >
            ★
          </span>
        ))}
      </div>
      {mensaje && <p className="text-sm mt-2 text-green-600">{mensaje}</p>}
    </div>
  )
}

export default EstrellasRating
