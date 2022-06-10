import { useMemo } from 'react'
import { RPC, CHAIN_ID } from '../constant'
import { getProvider } from '..'

export function useProvider() {
  const provider = useMemo(() => {
    return getProvider()
  }, [])

  return {
    provider,
    chainID: CHAIN_ID,
    rpc: RPC,
  }
}
