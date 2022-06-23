import { TLD } from './constants'
import { namehash, labelhash } from '@ensdomains/ensjs'

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

export const formatAddress = address => {
  return address.replace(/(.{6}).*(.{4})/, '$1...$2')
}

export const toHex = num => {
  const val = Number(num)
  return '0x' + val.toString(16)
}
