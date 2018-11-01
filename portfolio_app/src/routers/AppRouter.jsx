import React from 'react'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import Header from '../components/Header.jsx'
import HomePage from '../components/HomePage.jsx'
import NotFoundPage from '../components/NotFoundPage.jsx'

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header></Header> 
      <Switch>
        <Route path="/" component={HomePage} exact></Route>
        <Route component={NotFoundPage}></Route>
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter

