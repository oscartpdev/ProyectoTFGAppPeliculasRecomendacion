import React from 'react'

function Ajustes({ usuario }) {
  if (!usuario) return <p>Cargando usuario...</p>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">⚙️ Ajustes del Perfil</h2>
      <p><strong>Nombre:</strong> {usuario.nombre}</p>
      <p><strong>Correo:</strong> {usuario.email}</p>
      {/* Aquí podrías poner un formulario para editar nombre, correo, contraseña, etc. */}
    </div>
  )
}

export default Ajustes