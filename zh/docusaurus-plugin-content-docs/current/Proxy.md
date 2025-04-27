---
id: proxy
title: 代理设置
---

您可以通过代理隧道传输两种不同类型的请求：

- 测试脚本与浏览器驱动程序（或WebDriver端点）之间的连接
- 浏览器与互联网之间的连接

## 驱动程序与测试之间的代理

如果您的公司对所有出站请求都有公司代理（例如在 `http://my.corp.proxy.com:9090`），请按照以下步骤安装和配置 [undici](https://github.com/nodejs/undici)。

### 安装 undici

```bash npm2yarn
npm install undici --save-dev
```

### 在配置文件中添加 undici setGlobalDispatcher

在配置文件顶部添加以下 require 语句。

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

有关配置代理的其他信息可以在[这里](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md)找到。

如果您使用 [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5)，通过以下方式启动它：

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## 浏览器与互联网之间的代理

为了隧道传输浏览器与互联网之间的连接，您可以设置一个代理，这对于（例如）使用类似 [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy) 的工具捕获网络信息和其他数据很有用。

`proxy` 参数可以通过标准capabilities以以下方式应用：

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        // ...
        proxy: {
            proxyType: "manual",
            httpProxy: "corporate.proxy:8080",
            socksUsername: "codeceptjs",
            socksPassword: "secret",
            noProxy: "127.0.0.1,localhost"
        },
        // ...
    }],
    // ...
}
```

更多信息，请参阅 [WebDriver 规范](https://w3c.github.io/webdriver/#proxy)。