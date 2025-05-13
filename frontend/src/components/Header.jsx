import React from 'react'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <>
        <header className='bg-gray-800 text-white py-4 text-center '>
            <nav className='flex justify-between'>
                <section>
                    <Link className='mx-3' to={"/home"}>Home</Link>
                    <Link className='mx-3' to={"/home"}>Buscador</Link>
                    <Link className='mx-3' to={"/"}>Cuenta</Link>
                    <Link className='mx-3' to={"/social"}>Social</Link>
                </section>
                <section>
                    <Link to={"/mi-perfil"}>Mi Perfil</Link>
                </section>
            </nav>

        </header>
    </>
  )
}

export default Header