import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import SearchInput from '../../components/SearchInput'

export default () => {
  const { t, i18n } = useTranslation()

  return (
    <div>
      <Helmet>
        <title>Homepage</title>
      </Helmet>
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center m-16">
        <SearchInput size="large" />
      </div>
    </div>
  )
}
