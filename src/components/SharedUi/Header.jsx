import React from 'react'
import { useSelector } from "react-redux";

import { Link } from 'react-router-dom'

const Header = () => {
  const userName = useSelector((state) => state.user.value)
  return (
    <header className="bg-yellow-500 shadow-md flex items-center justify-between p-4">
      <Link to="/" className="text-2xl font-bold text-white">
       <h2 className="text-xl font-bold">Fast React Pizza</h2>
      </Link>
      <div>
        <label htmlFor="pizza-search"></label>
        <input
          id="pizza-search"
          type="text"
          placeholder="Search Order #"
          className="ml-4 px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400  hover:bg-amber-200  shadow-2xl w-85"
        />
        {userName && <span className="ml-4 text-white">Welcome, {userName}!</span>}
      </div>
    </header>
  )
}

export default Header
