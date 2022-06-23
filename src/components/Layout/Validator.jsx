import { useParams } from 'react-router-dom'
import { getName } from '../../utils'
import { useCheckName } from '../../utils/hooks'

export default ({ children }) => {
  const { name: paramName, domain } = useParams()
  const name = paramName || getName(domain)
  const { loading, error } = useCheckName(name)

  if (loading) {
    return 'loading'
  }

  if (error) {
    return `Warning: ${error}`
  }

  return children
}
