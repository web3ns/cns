import { useMemo } from 'react'
import { CONTRACT_ADDRESSES } from '../../contracts/constants'
import ENS from '@ensdomains/ensjs'
import { useWallet } from '.'

function useENS() {
  const { provider } = useWallet()
  const ens = useMemo(() => {
    return new ENS({ provider, ensAddress: CONTRACT_ADDRESSES.REGISTRY })
  }, [provider])

  return { ens }
}

export default useENS
