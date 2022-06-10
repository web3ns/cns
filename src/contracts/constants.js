export { abi as ETHRegistrarControllerJSONABI } from '@ensdomains/ens-contracts/artifacts/contracts/EthRegistrar/ETHRegistrarController.sol/ETHRegistrarController.json'

export const CONTRACT_ADDRESSES = {
  REGISTRY: '0x78380Dfd5ECf9c5202a3d5549F6B1Fb4D076fA02',
  PUBLIC_RESOLVER: '0x626f6c200FEd7046cB01857e61d59e7EF73Ed6f4',
  FIFS_REGISTRAR: '0x501E485b0Fbc80b685cbdEA566cDfEF908F178EB',
  DUMMY_ORACLE: '0xdF5CFAA5B4264aa0623b7E38d0b8DA43cc419E3c',
  STABLE_PRICE_ORACLE: '0x98F99d3DC6D2A89e7c2d65608fFA7048e1BBF2b6',
  BASE_REGISTRAR: '0x93b72283C28F49B12C2A3052a7704B92D3BFd836',
  ETH_REGISTRAR_CONTROLLER: '0x5fC75700E7ef0dF96D0BBf55b251ca640611786F', // register
}

// 4.18
// export const CONTRACT_ADDRESSES = {
//   REGISTRY: '0xA886f849c2EC963Bcfd5D34F1A15ee3fF6B2A2f3',
//   PUBLIC_RESOLVER: '0x898BE98CC743bf914CA52C648897527ffD14B024',
//   FIFS_REGISTRAR: '0x643d1412E65C765e1CC024C2da1F4bf50aB7A479',
//   DUMMY_ORACLE: '0xAF55A6546c7FFD366E68BaF7D103490e6C78d679',
//   STABLE_PRICE_ORACLE: '0xFCa5B811d0e86f325B0cC6608bA9d5b828144253',
//   BASE_REGISTRAR: '0x97c7Ee0d240f36a08f22BE6a9f4f076dB49AFE6f',
//   ETH_REGISTRAR_CONTROLLER: '0x5fC75700E7ef0dF96D0BBf55b251ca640611786F', // register
// }

/**
# 注册
ETH_REGISTRAR_CONTROLLER
- 获取域名长度是否可注册：valid
- 获取域名是否可注册：available
- 获取 name price：rentPrice
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
 */
