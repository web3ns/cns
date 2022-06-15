# 注册

ETH_REGISTRAR_CONTROLLER

- 获取域名长度是否可注册：valid - ETHRegistrarController
- 获取域名是否可注册：available - ETHRegistrarController
- 获取 name price：rentPrice - ETHRegistrarController
- makeCommitmentWithConfig 初始化配置
- commit 提交注册请求
- registerWithConfig 执行注册

# 详情

- REGISTRANT 当前提交的账户
- CONTROLLER 默认是购买账户地址，通过 BASE_REGISTRAR 设置，需要设置到一个类似 ETH_REGISTRAR_CONTROLLER 合约
- EXPIRATION DATE ETH_REGISTRAR_CONTROLLER 里面执行 renew
- RESOLVER 去 PublicResolver 里查询
  - 更改的话通过 REGISTRY 设置
- ETH_REGISTRAR_CONTROLLER
  - nameExpires 查询过期时间
  - renew extend 时间
  - reclaim - 到期之后的保留期内可以重新 claim 回来
- RESOLVER 相关的更改在 PUBLIC_RESOLVER 里执行
- 查询名下 domain

# TODO

- reverse resolver
- subdomain 流程上和上面一样
- supportInterface 检查用户自定义合约是否兼容
- 查询个人名下域名列表，后面可以单独写一个合约
