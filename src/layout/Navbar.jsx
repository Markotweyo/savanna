import React from 'react'
import { Link } from 'react-router-dom'

import './navbar.css'

function Navbar() {
  return (
    <div className="container flex mx-auto p-4 justify-between lg:w-screen-lg">
      <Link className="w-full" to="/">
        <h1>Web App</h1>
      </Link>
      
    </div>
  )
}

export default Navbar
