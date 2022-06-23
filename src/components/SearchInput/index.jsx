import React, { useState } from 'react'
import { Input, Select, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { SearchOutlined } from '@ant-design/icons'
import { useParams, useNavigate } from 'react-router-dom'
import { getName } from '../../utils'
import { ConnectButton } from '../ConnectWallet'

const { Option } = Select

export default ({ size = 'middle' }) => {
  const { t, i18n } = useTranslation()
  const { name: paramName, domain } = useParams()
  const navigate = useNavigate()
  const name = paramName || getName(domain)
  const [value, setValue] = useState(name)

  const changeLanguage = value => i18n.changeLanguage(value)
  const onSearch = () => {
    const _value = value.trim()
    if (_value) {
      navigate(`/search/${_value}`)
    }
  }

  const disabled = !value.trim()

  return (
    <Input.Group className="!flex">
      <Input
        placeholder={t('homepage.placeholder')}
        addonBefore={
          <SearchOutlined
            style={{
              fontSize: 16,
            }}
          />
        }
        value={value}
        onChange={e => setValue(e.target.value)}
        onPressEnter={onSearch}
        size={size}
      />
      <Select value={i18n.language} onChange={changeLanguage} size={size}>
        <Option value="zh-CN">中文</Option>
        <Option value="en">English</Option>
      </Select>
      <ConnectButton size={size}>
        <Button
          type="primary"
          onClick={onSearch}
          disabled={disabled}
          size={size}
        >
          {t('homepage.search')}
        </Button>
      </ConnectButton>
    </Input.Group>
  )
}
