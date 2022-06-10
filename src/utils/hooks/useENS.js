import { useProvider, useMemo } from './useProvider'
import { CONTRACT_ADDRESSES } from '../../contracts/constants'
import ENS from '@ensdomains/ensjs'

export function useENS() {
  const { provider } = useProvider()
  const ens = useMemo(() => {
    return new ENS({ provider, ensAddress: CONTRACT_ADDRESSES.REGISTRY })
  }, [provider])

  return { ens }
}
