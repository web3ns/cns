import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useContract } from '../../utils/hooks/useContract'

export default () => {
  let { name } = useParams()
  const { contract } = useContract('ETHRegistrarController')
  const [loading, setLoading] = useState(false)
  const [isAvailable, setIsAvailable] = useState(true)

  useEffect(() => {
    async function fn() {
      setLoading(true)
      setIsAvailable(await contract.available(name))
      setLoading(false)
    }
    fn().catch(e => console.log('search error: ', e))
  }, [name])

  return (
    <div>
      <Helmet>
        <title>Search</title>
      </Helmet>
      {loading ? (
        'loading'
      ) : (
        <Link to={`/name/${name}.eth/${isAvailable ? 'register' : 'details'}`}>
          <span className="mr-4">{`${name}.eth`}</span>
          <span>{`${isAvailable ? 'Available' : 'Unavailable'}`}</span>
        </Link>
      )}
    </div>
  )
}
