import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <ul style={{display: "flex", justifyContent: "space-around", listStyleType: "none"}}>
        <li><Link style={{textDecoration: "none", color: "green", fontSize: 24}} to="/">Главная</Link></li>
        <li><Link style={{textDecoration: "none", color: "green", fontSize: 24}} to="welcome">Добро пожаловать</Link></li>
        <li><Link style={{textDecoration: "none", color: "green", fontSize: 24}} to="about">О нас</Link></li>
      </ul>
      <Outlet/>
    </div>
  )
}

export default Layout
