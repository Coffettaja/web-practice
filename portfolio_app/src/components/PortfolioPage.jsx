import React from 'react'
import {Link} from 'react-router-dom'

const PortfolioPage = () => (
  <div>
    <Link to="/portfolio/1">One</Link>
    <Link to="/portfolio/2">Two</Link>
    <Link to="/portfolio/3">Three</Link>
  </div>
)

export default PortfolioPage