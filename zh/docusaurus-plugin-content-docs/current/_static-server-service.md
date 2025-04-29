---
id: static-server-service
title: 静态服务器服务
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-static-server-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

有些项目仅包含前端资源，不需要运行在静态服务器之外的环境。此服务帮助您在测试期间运行静态文件服务器。

## 安装

最简单的方法是通过以下方式将 `@wdio/static-server-service` 添加为 `package.json` 中的 `devDependency`：

```sh
npm install @wdio/static-server-service --save-dev
```

有关如何安装 `WebdriverIO` 的说明可以在[这里](https://webdriver.io/docs/gettingstarted)找到。

## 配置

要使用静态服务器服务，请将 `static-server` 添加到您的服务数组中：

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['static-server'],
    // ...
};
```

## 选项

### `folders` (必需)

文件夹路径和挂载点的数组。

类型：`Array<Object>`
属性：
 - mount `{String}` - 文件夹将被挂载的URL端点。
 - path `{String}` - 要挂载的文件夹的路径。

``` javascript
 // wdio.conf.js
 export const config = {
    // ...
    services: [
        ['static-server', {
            folders: [
                { mount: '/fixtures', path: './tests/fixtures' },
                { mount: '/dist', path: './dist' },
            ]
        }]
    ],
    // ...
 };
```

### `port`

服务器绑定的端口。

类型：`Number`

默认值：`4567`

### `middleware`

中间件对象数组。在配置中加载并实例化这些对象，然后传递给静态服务器使用。

类型：`Array<Object>`
属性：
 - mount `{String}` - 中间件将被挂载的URL端点。
 - middleware `<Object>` - 中间件函数回调。

默认值：`[]`

``` javascript
// wdio.conf.js
import middleware from 'middleware-package'

export const config = {
    // ...
    services: [
        ['static-server', {
            middleware: [{
                mount: '/',
                middleware: middleware(/* middleware options */),
            }],
        }]
    ],
    // ...
};
```

----

有关WebdriverIO的更多信息，请参阅[主页](http://webdriver.io)。