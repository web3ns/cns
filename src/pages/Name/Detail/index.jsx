import React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { namehash, labelhash } from '@ensdomains/ensjs'

export const Detail = () => {
  let { name } = useParams()

  return (
    <div>
      <Helmet>
        <title>Name / Detail</title>
      </Helmet>
      <div>
        <div>detail page</div>
        {/* <div>Current name: {name}</div>
        <div>Parent: eth</div>
        <div>Registrant: 0x0</div>
        <div>Controller: Not owned</div>
        <div>Resolver: No resolver set</div> */}
      </div>
    </div>
  )
}
