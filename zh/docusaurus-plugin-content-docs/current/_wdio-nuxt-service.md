---
id: wdio-nuxt-service
title: Nuxt 服务
custom_edit_url: https://github.com/webdriverio-community/wdio-nuxt-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-nuxt-service 是一个第三方包，更多信息请查看 [GitHub](https://github.com/webdriverio-community/wdio-nuxt-service) | [npm](https://www.npmjs.com/package/wdio-nuxt-service)

这个服务可以帮助您在使用 [Nuxt](https://nuxt.com/) 作为构建工具时启动应用程序。它会在启动测试之前使用您的 `nuxt.conf.js` 自动启动 Nuxt 服务器。

## 安装

如果您刚开始使用 WebdriverIO，可以使用配置向导来设置所有内容：

```sh
npm init wdio@latest .
```

它会将您的项目识别为 Nuxt 项目，并为您安装所有必要的插件。如果您要在现有设置上添加此服务，您始终可以通过以下方式安装：

```bash
npm install wdio-nuxt-service --save-dev
```

## 配置

要启用此服务，只需将其添加到 `wdio.conf.js` 文件中的 `services` 列表中，例如：

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['nuxt'],
    // ...
};
```

您可以通过传入包含配置对象的数组来应用服务选项，例如：

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['nuxt', {
            rootDir: './packages/nuxt'
        }]
    ],
    // ...
};
```

## 使用

如果您的配置设置正确，该服务将设置 [`baseUrl`](https://webdriver.io/docs/configuration#baseurl) 选项指向您的应用程序。您可以通过 [`url`](https://webdriver.io/docs/api/browser/url) 命令导航到它，例如：

```ts
await browser.url('/')
await expect(browser).toHaveTitle('Welcome to Nuxt!')
await expect($('aria/Welcome to Nuxt!')).toBePresent()
```

## 选项

### `rootDir`

项目的根目录。

类型：`string`<br />
默认值：`process.cwd()`

### `dotenv`

服务器启动前要加载的环境文件。

类型：`string`<br />
默认值：`.env`

### `hostname`

服务器要启动的主机名。

类型：`string`<br />
默认值：`localhost`

### `port`

服务器要启动的端口。

类型：`number`<br />
默认值：`process.env.NUXT_PORT || config.devServer.port`

### `https`

如果测试服务器应该在 https 上启动，则设置为 true（证书需要在 Nuxt 配置中配置）。

类型：`boolean`<br />
默认值：`false`

### `sslCert`

用于在 https 上启动服务器的 SSL 证书。

类型：`string`

### `sslKey`

用于在 https 上启动服务器的 SSL 密钥。

类型：`string`

----

有关 WebdriverIO 的更多信息，请查看[主页](https://webdriver.io)。