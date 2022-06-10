import React from 'react'
import './App.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'antd/dist/antd.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './locales/i18n'
import { HelmetProvider } from 'react-helmet-async'

import Layout from './components/Layout'
import NoMatch from './components/NoMatch'
import Homepage from './pages/Homepage'
import Search from './pages/Search'
import { Register, Detail, Subdomain } from './pages/Name'

moment.locale('zh-cn')

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <ConfigProvider locale={zhCN}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<Homepage />} />
              <Route path="search/:name" element={<Search />} />
              <Route path="name/:domain/register" element={<Register />} />
              <Route path="name/:domain/details" element={<Detail />} />
              <Route path="name/:domain/subdomains" element={<Subdomain />} />
              <Route path="no-match" element={<NoMatch />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </ConfigProvider>
      </HelmetProvider>
    </BrowserRouter>
  )
}

export default App
