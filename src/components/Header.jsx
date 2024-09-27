import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'



const Header = () => {

const location = useLocation();
const { pathname } = location;
  return (
    <header>
        <h1>Token Creation</h1>
        <nav>
            <ul>
                <li>
                    {pathname !== '/' && <NavLink to="/">Home</NavLink>}
                </li>
                <li>
                    {pathname !== '/register' && <NavLink to="/register">Register</NavLink>}
                </li>
                <li>
                    {pathname !== '/login' && <NavLink to="/login">Login</NavLink>}
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header