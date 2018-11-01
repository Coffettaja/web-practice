import React from 'react'
import {NavLink} from 'react-router-dom'

const Header = () => (
  <header>
    <h1>Portfolio</h1>
    <NavLink to="/" activeClassName="is-active" exact>Home</NavLink>
    <NavLink to="" activeClassName="is-active">Portfolio</NavLink>
    <NavLink to="" activeClassName="is-active">Contact</NavLink>
  </header>
)

export default Header