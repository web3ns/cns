import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Button } from 'antd'
import { useWallet } from '../../utils/hooks'
import { web3Modal } from '../../utils/web3modalConfig'
import { HeaderWithSearchInput, Header } from './Header'
import Footer from './Footer'
import Validator from './Validator'
import { NETWORK_PARAMS } from '../../utils/constants'
import { toHex } from '../../utils'

// pathname in whitelist is pages that no need to connect to wallet
const WHITE_LIST = ['/']

export default () => {
  const { pathname } = useLocation()
  const { status, installed, web3Instance, setWallet, connect, chainId } =
    useWallet()

  useEffect(() => {
    if (web3Instance) {
      const accountsHandler = accounts => {
        console.log('accounts event handler: ', accounts)
        setWallet({
          accounts,
        })
      }
      const chainIdHandler = chainId => {
        console.log('chainId event handler: ', chainId)
        setWallet({
          chainId: parseInt(chainId),
        })
      }
      const connectHandler = info => {
        console.log('connect event handler: ', info)
        setWallet({
          status: 1,
        })
      }
      const disconnectHandler = error => {
        console.log('disconnect event handler: ', error)
        setWallet({
          status: 0,
        })
      }

      // Subscribe to accounts change
      web3Instance.on('accountsChanged', accountsHandler)
      // Subscribe to chainId change
      web3Instance.on('chainChanged', chainIdHandler)
      // Subscribe to connection
      web3Instance.on('connect', connectHandler)
      // Subscribe to disconnection
      web3Instance.on('disconnect', disconnectHandler)

      return () => {
        web3Instance.removeListener('accountsChanged', accountsHandler)
        web3Instance.removeListener('chainChanged', chainIdHandler)
        web3Instance.removeListener('connect', connectHandler)
        web3Instance.removeListener('disconnect', disconnectHandler)
      }
    }
  }, [web3Instance])

  useEffect(() => {
    if (installed && web3Modal.cachedProvider) {
      connect()
    }
  }, [installed, chainId]) // TODO check if need to add accounts to dependence array

  // no need of connect to wallet
  if (WHITE_LIST.includes(pathname)) {
    return (
      <div className="absolute left-0 right-0 top-0 bottom-0" key={status}>
        <Header />
        <Outlet />
        <Footer></Footer>
      </div>
    )
  } else {
    let child = null

    if (status === 0) {
      child = 'please connect to wallet first'
    } else if (status === 2) {
      child = 'connecting to wallet...'
    } else {
      if (chainId !== 71) {
        child = (
          <div className="p-4">
            <h1>Network Error!</h1>
            <p>Change to Conflux eSpace Testnet</p>
            {/* <div>
              connecting chainId is: <b>{network.chainId}</b>
            </div>
            <div>
              connecting network name is: <b>{network.name}</b>
            </div> */}

            <Button
              className="mt-4"
              onClick={async () => {
                try {
                  await web3Instance.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: toHex(71) }],
                  })
                } catch (switchError) {
                  if (switchError.code === 4902) {
                    try {
                      await web3Instance.request({
                        method: 'wallet_addEthereumChain',
                        params: [NETWORK_PARAMS[toHex(71)]],
                      })
                    } catch (error) {
                      console.log('switch or add network error: ', error)
                    }
                  }
                }
              }}
            >
              Switch Network
            </Button>
          </div>
        )
      } else {
        child = (
          <Validator>
            <Outlet />
          </Validator>
        )
      }
    }

    return (
      <div className="absolute left-0 right-0 top-0 bottom-0" key={status}>
        <HeaderWithSearchInput></HeaderWithSearchInput>
        {child}
        <Footer></Footer>
      </div>
    )
  }
}
