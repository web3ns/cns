import { useEffect, useState } from 'react'
import { useWallet } from '.'
import {
  CONTRACT_ADDRESSES,
  ETHRegistrarControllerJSONABI,
} from '../../contracts/constants'

function useContract(name) {
  const { provider } = useWallet()

  const getContract = () => {
    const signer = provider.getSigner()

    let address = ''
    let abi = ''

    if (name === 'ETHRegistrarController') {
      address = CONTRACT_ADDRESSES.ETH_REGISTRAR_CONTROLLER
      abi = ETHRegistrarControllerJSONABI
    }

    const contract = new ethers.Contract(
      address,
      ETHRegistrarControllerJSONABI,
      signer,
    )

    return {
      name,
      contract,
      address,
      abi,
    }
  }

  const [contract, setContract] = useState(getContract)

  useEffect(() => {
    setContract(getContract())
  }, [name])

  return contract
}

export default useContract
