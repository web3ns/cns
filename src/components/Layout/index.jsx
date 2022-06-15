import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useProvider } from '../../utils/hooks/useProvider'

import Header from './Header'
import Footer from './Footer'
import Validator from './Validator'

export default () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { provider } = useProvider()

  useEffect(() => {
    const event = function (chainId) {
      if (parseInt(chainId) !== 71) {
        navigate('/network-error')
      }
    }
    window.ethereum.on('chainChanged', event)

    return () => {
      ethereum.removeListener('accountsChanged', event)
    }
  }, [])

  useEffect(() => {
    const main = async () => {
      const chainId = (await provider.getNetwork()).chainId

      if (chainId !== 71) {
        navigate('/network-error')
      }
    }

    main().catch(console.log)
  }, [])

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
