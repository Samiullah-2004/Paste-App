import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-x-2 px-6 py-4 bg-slate-900/80 backdrop-blur-md border-b border-white/10 shadow-lg">

      <div className="flex items-center gap-x-1 bg-white/5 border border-white/10 rounded-2xl p-1">

        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `relative px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/30' 
                : 'text-white/50 hover:text-white hover:bg-white/10'
            }`
          }
        >
          Home
        </NavLink>

        <NavLink 
          to="/pastes" 
          className={({ isActive }) => 
            `relative px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/30' 
                : 'text-white/50 hover:text-white hover:bg-white/10'
            }`
          }
        >
          Pastes
        </NavLink>

      </div>
    </div>
  )
}

export default Navbar