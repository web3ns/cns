import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { namehash, labelhash } from '@ensdomains/ensjs'
import {
  ETHRegistrarControllerJSONABI,
  CONTRACT_ADDRESSES,
} from '../../../contracts/constants'
import { useContract } from '../../../utils/hooks/useContract'
import { ethers } from 'ethers'
import { getName } from '../../../utils'

export const Register = () => {
  let { domain } = useParams()
  const { contract } = useContract('ETHRegistrarController')
  const name = getName(domain)

  useEffect(() => {
    async function fn() {
      const valid = await contract.valid(name)
      const price = await contract.rentPrice('abcde', '10000')
      console.log('price: ', price.toString())
    }
    fn().catch(e => console.log('Register error: ', e))
  }, [name])

  return (
    <div>
      <Helmet>
        <title>Name / Register</title>
      </Helmet>
      register page
    </div>
  )
}
