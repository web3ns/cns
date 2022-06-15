import { ethers } from 'ethers'
import { RPC, TLD } from './constants'
import { namehash, labelhash } from '@ensdomains/ensjs'
import {
  ETHRegistrarControllerJSONABI,
  CONTRACT_ADDRESSES,
} from '../contracts/constants'

export const getName = (name = '') => {
  return name.replace(new RegExp(`\.${TLD}$`), '')
}

export const isValidName = input => {
  try {
    namehash(input)
    return true
  } catch (error) {
    return false
  }
}

export const isValidLabel = input => {
  try {
    labelhash(input)
    return true
  } catch (error) {
    return false
  }
}

export const isSubdomain = name => {
  // TODO 暂不支持搜索二级域名或 DNS 域名
  return /\./.test(name)
}

export const getProvider = () => {
  // return new ethers.providers.JsonRpcBatchProvider({
  //   url: RPC,
  //   allowGzip: true,
  // })
  return new ethers.providers.Web3Provider(window.ethereum)
}

export const getContract = name => {
  const provider = getProvider()
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

export const checkName = async (name = '') => {
  if (name) {
    // TODO should check by contract, or get limit by contract
    // if (name.length > 3) {
    if (!isSubdomain(name)) {
      const { contract } = getContract('ETHRegistrarController')
      if (await contract.valid(name)) {
        return {
          valid: true,
          error: '',
        }
      } else {
        return {
          valid: false,
          error:
            'invalid name, name length less than 3, check by ETHRegistrarController',
        }
      }
    } else {
      // for example: abc.eth or abc.com
      return {
        valid: false,
        error: 'not support subdomain',
      }
    }
    // } else {
    //   return {
    //     valid: false,
    //     error: 'name length less than 3',
    //   }
    // }
  } else {
    return {
      valid: false,
      error: 'null name',
    }
  }
}
