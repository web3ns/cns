import React, { useEffect, useState } from 'react'
import { useContract } from '../../../utils/hooks/useContract'
import { ONE_YEAR_SECONDS } from '../../../utils/constants'
import { InputNumber } from 'antd'
import { ethers } from 'ethers'

export const Year = ({
  name = '',
  years = 1,
  onChange = () => {},
  disabled = false,
}) => {
  const { contract } = useContract('ETHRegistrarController')
  const [price, setPrice] = useState(0)

  useEffect(() => {
    async function fn() {
      const price = await contract.rentPrice(name, years * ONE_YEAR_SECONDS)
      setPrice(ethers.utils.formatUnits(price, 18))
    }
    fn().catch(e => console.log('Year component error: ', e))
  }, [name, years])

  return (
    <div>
      租期：
      <InputNumber
        disabled={disabled}
        min={1}
        keyboard={true}
        precision={0}
        defaultValue={years}
        onChange={onChange}
      />
      <span className="mr-4"></span>
      支付金额：{price}
    </div>
  )
}
