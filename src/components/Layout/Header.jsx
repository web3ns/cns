import React from 'react'
import SearchInput from '../SearchInput'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default () => {
  const { t } = useTranslation()

  return (
    <header className="flex">
      <div className="px-2 bg-slate-500 flex items-center">
        <Link to="/" className="text-slate-900">
          {t('header.logo')}
        </Link>
      </div>
      <SearchInput />
    </header>
  )
}
