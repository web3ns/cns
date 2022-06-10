import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Validator from './Validator'

export default () => {
  const { pathname } = useLocation()

  if (pathname === '/') {
    return (
      <div className="absolute left-0 right-0 top-0 bottom-0">
        <Outlet />
        <Footer></Footer>
      </div>
    )
  } else {
    return (
      <div className="absolute left-0 right-0 top-0 bottom-0">
        <Header></Header>
        <Validator>
          <Outlet />
        </Validator>
        <Footer></Footer>
      </div>
    )
  }
}
