import { useEffect, useState } from 'react'
import { checkName } from '..'

const STATE = {
  error: '',
  valid: false,
  loading: false,
}

export function useCheckName(name) {
  const [state, setState] = useState(STATE)

  useEffect(() => {
    async function main() {
      setState(STATE)
      const { error, valid } = await checkName(name)
      setState({
        error,
        valid,
        loading: false,
      })
    }

    main().catch(e => console.log('useCheckName error: ', e))
  }, [name])

  return state
}
