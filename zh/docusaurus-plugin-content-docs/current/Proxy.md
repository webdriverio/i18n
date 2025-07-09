---
id: proxy
title: 代理设置
---

你可以通过代理隧道传输两种不同类型的请求：

- 测试脚本与浏览器驱动程序（或WebDriver端点）之间的连接
- 浏览器与互联网之间的连接

## 驱动程序与测试之间的代理

如果你的公司对所有出站请求都有一个企业代理（例如在`http://my.corp.proxy.com:9090`），你有两种选项来配置WebdriverIO使用代理：

### 选项1：使用环境变量（推荐）

从WebdriverIO v9.12.0开始，你可以简单地设置标准代理环境变量：

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# 可选：对某些主机绕过代理
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

然后正常运行你的测试。WebdriverIO将自动使用这些环境变量进行代理配置。

### 选项2：使用undici的setGlobalDispatcher

对于更高级的代理配置或如果你需要程序化控制，你可以使用undici的`setGlobalDispatcher`方法：

#### 安装undici

```bash npm2yarn
npm install undici --save-dev
```

#### 在配置文件中添加undici setGlobalDispatcher

在配置文件的顶部添加以下require语句。

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

关于配置代理的其他信息可以在[这里](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md)找到。

### 我应该使用哪种方法？

- **使用环境变量**如果你想要一种简单、标准的方法，可以跨不同工具使用，并且不需要代码更改。
- **使用setGlobalDispatcher**如果你需要高级代理功能，如自定义认证、每个环境不同的代理配置，或者想要程序化控制代理行为。

两种方法都完全支持，WebdriverIO会先检查全局调度器，然后再回退到环境变量。

### Sauce Connect代理

如果你使用[Sauce Connect代理](https://docs.saucelabs.com/secure-connections/sauce-connect-5)，通过以下方式启动它：

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## 浏览器与互联网之间的代理

为了隧道化浏览器与互联网之间的连接，你可以设置一个代理，这对于（例如）使用像[BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy)这样的工具捕获网络信息和其他数据很有用。

`proxy`参数可以通过标准功能以下列方式应用：

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

有关更多信息，请参阅[WebDriver规范](https://w3c.github.io/webdriver/#proxy)。