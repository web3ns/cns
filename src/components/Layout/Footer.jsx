import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Select, Row, Col } from 'antd'

const Locales = () => {
  const { i18n } = useTranslation()
  const changeLanguage = value => i18n.changeLanguage(value)

  return (
    <Select value={i18n.language} onChange={changeLanguage}>
      <Select.Option key="en">English</Select.Option>
      <Select.Option key="zh-CN">中文</Select.Option>
    </Select>
  )
}

export default () => {
  const { t } = useTranslation()

  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-slate-300 p-2 flex items-center justify-between">
      <div>© 2022 CNS. All Rights Reserved.</div>
      <Locales />
    </footer>
  )
}
