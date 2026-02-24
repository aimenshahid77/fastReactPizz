import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/SharedUi/Header'

const Applayout = () => {
  return (
    <div>
        <Header />
       <main className="pt-16">
        <Outlet />
      </main>
    </div>
  )
}

export default Applayout
