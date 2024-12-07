# Nillion 节点部署工具

这是一个用于自动化部署和管理 Nillion 网络节点的工具集。

## 功能特性

- 自动创建和初始化 Nillion 验证节点
- 自动处理水龙头领取
- 支持节点注册和质押操作
- 支持代理配置
- 支持批量操作
- ETH 资金分发管理

## 前置要求

- Node.js 环境
- Docker 环境
- YesCaptcha API Key
- ETH 主网 RPC (Alchemy)
- 代理服务器配置文件

## 目录结构

├── main.js # 主程序入口
├── nill_faucet.js # 水龙头相关功能
├── nill_stake.js # 质押相关功能
├── eth_distribution.js # ETH 分发工具
└── proxies.txt # 代理配置文件

## 使用说明

### 1. 初始化配置

创建必要的配置文件:

```bash
touch ./proxies.txt
```

### 2. 运行节点部署

```bash
node main.js <start_index> <end_index> <yes_captcha_key>
```

参数说明:
- start_index: 起始节点索引
- end_index: 结束节点索引
- yes_captcha_key: YesCaptcha API密钥

### 3. 领取测试币

```bash
node nill_faucet.js <start_index> <end_index> <yes_captcha_key>
```

### 4. 质押操作

```bash
node nill_stake.js
```

### 5. ETH分发

```bash
node eth_distribution.js
```

## 配置说明

### 代理配置文件格式 (proxies.txt)
```
http://username:password@host:port
http://username:password@host:port
...
```

### 环境变量
```
WEBSITE_URL=https://faucet.testnet.nillion.com/
WEBSITE_KEY=6Le0TNUpAAAAAF6PF4LfeVBm56WbgdcPVV8Id6LF
YES_API_URL=https://api.yescaptcha.com
CHAIN_ID=nillion-chain-testnet-1
```

## 注意事项

1. 确保有足够的ETH用于质押操作
2. 代理服务器需要稳定可用
3. 建议在运行大批量操作前先小规模测试
4. 请妥善保管助记词和私钥信息

## 错误处理

常见错误及解决方案:

1. 代理连接失败
   - 检查代理配置格式
   - 确认代理服务器可用性

2. 水龙头失败
   - 检查 YesCaptcha 配置
   - 确认代理IP被限制

3. 质押失败
   - 确认ETH余额充足
   - 检查 Gas 费用设置

## 贡献指南

欢迎提交 Issue 和 Pull Request 来完善此工具。

## 免责声明

本文档使用AI生成的，其中缺失了一些代码细节。用之前请务必先看代码。