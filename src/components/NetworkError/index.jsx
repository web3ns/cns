import React, { useState, useEffect } from 'react'
import { useProvider } from '../../utils/hooks/useProvider'
import { useNavigate } from 'react-router-dom'

export default () => {
  const [network, setNetwork] = useState({})
  const { provider } = useProvider()
  const n = useNavigate()

  useEffect(() => {
    const event = function (chainId) {
      if (parseInt(chainId) === 71) {
        n('/')
      }
    }
    window.ethereum.on('chainChanged', event)

    return () => {
      ethereum.removeListener('accountsChanged', event)
    }
  }, [])

  useEffect(() => {
    const main = async () => {
      const network = await provider.getNetwork()
      setNetwork(network)

      if (parseInt(network.chainId) === 71) {
        n('/')
      }
    }

    main().catch(console.log)
  }, [])

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Network Error!</h1>
      <p>Change to Conflux eSpace Testnet</p>
      <div>
        connecting chainId is: <b>{network.chainId}</b>
      </div>
      <div>
        connecting network name is: <b>{network.name}</b>
      </div>
    </main>
  )
}
