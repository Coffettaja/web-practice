import React from 'react'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import ContactPage from '../components/ContactPage.jsx'
import Header from '../components/Header.jsx'
import HomePage from '../components/HomePage.jsx'
import PortfolioPage from '../components/PortfolioPage.jsx'
import PortfolioItemPage from '../components/PortfolioItemPage.jsx'
import NotFoundPage from '../components/NotFoundPage.jsx'

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header></Header> 
      <Switch>
        <Route path="/" component={HomePage} exact></Route>
        <Route path="/portfolio/:id" component={PortfolioItemPage}></Route>
        <Route path="/portfolio" component={PortfolioPage}></Route>
        <Route path="/contact" component={ContactPage}></Route>
        <Route component={NotFoundPage}></Route>
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter

