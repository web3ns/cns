# 搜索后的逻辑

## Warning:

1. 域名太短。域名至少包含 3 个字符。/ Name is too short.Names must be at least 3 characters long
2. 域名异常。 11 xx 不是一个有效的域名。/ Domain malformed. xx xx is not a valid domain.

## Success:

### 普通的 name，如 wensimoke

会跳转至 https://app.ens.domains/search/wensimoke
其中包含两种状态：

1. available - 点击跳转至 register - https://app.ens.domains/name/wensimoke.eth/register
2. unavailable - 点击跳转至 details - https://app.ens.domains/name/wensimoke.eth/details

### 带后缀的 name

1. 如 wensimoke.123
   会跳转至 https://app.ens.domains/name/wensimoke.123，和 https://app.ens.domains/name/wensimoke.123/details 是一个页面
   里面的逻辑是处理 ENABLE DNSSEC

2. 如 wensimoke.123.xxx 或 wensimoke.123.eth
   会跳转至 https://app.ens.domains/name/wensimoke.123.xxx/details
   显示详情
