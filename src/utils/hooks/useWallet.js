import { useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import { web3Modal } from '../web3modalConfig'
import { createGlobalState } from 'react-use'

export const useGlobalValue = createGlobalState({
  installed: false, // false is not installed, true is installed
  web3Instance: null,
  provider: null,
  network: null, // ethers like network
  chainId: null, // null mean not installed, or changing network
  signer: null, // ethers signer
  accounts: [], // same to Metamask eth_accounts
  status: 0, // 0 is not connected, 1 is connected, 2 is connecting
  balance: 0, // chain's coin amount
})

function useWallet() {
  const [wallet, setWallet] = useGlobalValue()
  const { installed, chainId } = wallet

  useEffect(() => {
    if (web3Modal.providerController.injectedProvider) {
      setWallet({
        ...wallet,
        installed: true,
      })
    }
  }, [])

  const connect = useCallback(() => {
    if (installed) {
      async function main() {
        setWallet({
          ...wallet,
          status: 2,
        })

        const instance = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(instance)
        const network = await provider.getNetwork()
        const signer = provider.getSigner()
        const account = await signer.getAddress()
        // const balance = await signer.getBalance()

        setWallet({
          ...wallet,
          web3Instance: instance,
          provider,
          chainId: parseInt(network.chainId),
          network,
          signer,
          accounts: account ? [account] : [],
          // balance,
          status: 1,
        })
      }

      main().catch(e => {
        console.error('use wallet: ', e)

        setWallet({
          ...wallet,
          status: 0,
        })
      })
    }
  }, [installed, chainId])

  const _setWallet = params => {
    setWallet({
      ...wallet,
      ...params,
    })
  }

  return {
    ...wallet,
    connect, // same to Metamask eth_requestAccounts
    setWallet: _setWallet,
  }
}

export default useWallet
