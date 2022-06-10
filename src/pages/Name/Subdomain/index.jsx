import React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { namehash, labelhash } from '@ensdomains/ensjs'

export const Subdomain = () => {
  let params = useParams()
  return (
    <div>
      <Helmet>
        <title>Name / Subdomain</title>
      </Helmet>
      Subdomain page
    </div>
  )
}
