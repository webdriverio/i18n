---
id: testingbot-service
title: Testingbot 服务
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-testingbot-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> WebdriverIO 服务，提供与 TestingBot 更好的集成。它会更新作业元数据（'name'、'passed'、'tags'、'public'、'build'、'extra'），并在需要时运行 TestingBot Tunnel。

## 安装

最简单的方法是通过以下方式将 `@wdio/testingbot-service` 作为 devDependency 保存在你的 `package.json` 中：

```sh
npm install @wdio/testingbot-service --save-dev
```

有关如何安装 `WebdriverIO` 的说明可以在[这里找到。](https://webdriver.io/docs/gettingstarted)

## 配置

为了使用该服务，你需要在 `wdio.conf.js` 文件中设置 `user` 和 `key`，并将 `hostname` 选项设置为 `hub.testingbot.com`。如果你想使用 [TestingBot Tunnel](https://testingbot.com/support/other/tunnel)，你需要设置 `tbTunnel: true`。

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.TB_KEY,
    key: process.env.TB_SECRET,
    services: [
        ['testingbot', {
            tbTunnel: true
        }]
    ],
    // ...
};
```

## 选项

要授权 TestingBot 服务，你的配置需要包含 [`user`](https://webdriver.io/docs/options#user) 和 [`key`](https://webdriver.io/docs/options#key) 选项。

### tbTunnel
如果设为 true，它将运行 TestingBot Tunnel 并在运行浏览器测试的 TestingBot 虚拟机之间打开安全连接。

类型：`Boolean`<br />
默认值：`false`

### tbTunnelOpts
应用 TestingBot Tunnel 选项（例如更改端口号或日志文件设置）。有关更多信息，请参见[此列表](https://github.com/testingbot/testingbot-tunnel-launcher)。

类型：`Object`<br />
默认值：`{}`