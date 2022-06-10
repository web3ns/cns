import { getContract } from '..'
import { useMemo } from 'react'

export function useContract(name) {
  const contract = useMemo(() => {
    return getContract(name)
  }, [name])

  return contract
}
