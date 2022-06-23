import Web3Modal from 'web3modal'
import { createGlobalState } from 'react-use'

const providerOptions = {
  /* See Provider Options Section */
}

export const web3Modal = new Web3Modal({
  providerOptions, // required
  cacheProvider: true, // optional
  // network: 'mainnet', // optional
  // disableInjectedProvider: true,
})
