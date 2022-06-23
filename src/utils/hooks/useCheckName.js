import { useEffect, useState } from 'react'
import useContract from './useContract'
import { isSubdomain } from '..'

const STATE = {
  error: '',
  valid: false,
  loading: false,
}

function useCheckName(name) {
  const [state, setState] = useState(STATE)
  const { contract } = useContract('ETHRegistrarController')

  useEffect(() => {
    async function main() {
      let info = {}
      if (name) {
        if (!isSubdomain(name)) {
          if (await contract.valid(name)) {
            info = {
              valid: true,
              error: '',
            }
          } else {
            info = {
              valid: false,
              error:
                'invalid name, name length less than 3, check by ETHRegistrarController',
            }
          }
        } else {
          // for example: abc.eth or abc.com
          info = {
            valid: false,
            error: 'not support subdomain',
          }
        }
      } else {
        info = {
          valid: false,
          error: 'null name',
        }
      }

      setState(info)
    }

    main().catch(e => console.log('useCheckName error: ', e))
  }, [name])

  return state
}

export default useCheckName
