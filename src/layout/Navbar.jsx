import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import './navbar.css'

function Navbar() {
  return (
    <nav className="container flex mx-auto p-4 justify-between lg:w-screen-lg">
      <Link className="w-full" to="/">
        <img src="/logo.svg" alt="React Query" width="200" />
      </Link>
      
    </nav>
  )
}

export default Navbar
