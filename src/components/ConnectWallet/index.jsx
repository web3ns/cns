import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useWallet } from '../../utils/hooks'
import { Button, Tooltip } from 'antd'
import { formatAddress } from '../../utils'

export const ConnectButton = ({ children, ...others }) => {
  const { t } = useTranslation()
  const { connect, accounts, status, installed } = useWallet()

  const text = useMemo(() => {
    let t = ''

    if (!installed) {
      t = 'Wallet not installed'
    } else {
      if (status === 0) {
        t = 'Connect to wallet'
      } else if (status === 2) {
        t = 'Connecting...'
      } else {
        if (accounts.length) {
          t = formatAddress(accounts[0])
        } else {
          t = 'Not connected to website'
        }
      }
    }
    return t
  }, [status, accounts, installed])

  const handleConnect = e => {
    e.stopPropagation()
    e.preventDefault()

    if (status === 0) {
      connect()
    }
  }

  if (children) {
    if (status === 1) {
      return children
    } else {
      return (
        <Tooltip title={text}>
          <div className="relative">
            <div
              onClick={handleConnect}
              className="absolute top-0 right-0 left-0 bottom-0 z-10"
            ></div>
            {children}
          </div>
        </Tooltip>
      )
    }
  } else {
    return (
      <Button onClick={handleConnect} {...others}>
        {text}
      </Button>
    )
  }
}
