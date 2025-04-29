---
id: firefox-profile-service
title: Firefox 配置文件服务
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-firefox-profile-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

你想要使用特定扩展运行Firefox浏览器或需要设置一些首选项？Selenium允许你通过将配置文件作为`base64`字符串传递给你的desired capabilities中的`moz:firefoxOptions.profile`属性来为Firefox浏览器使用配置文件。这需要构建该配置文件并将其转换为`base64`。这个为[wdio测试运行器](https://webdriver.io/docs/clioptions)提供的服务帮你处理编译配置文件的工作，让你可以从`wdio.conf.js`文件中舒适地定义你想要的选项。

要查找所有可能的选项，请在Firefox浏览器中打开[about:config](about:config)或访问[mozillaZine](http://kb.mozillazine.org/About:config_entries)网站，查找有关每个设置的完整文档。此外，你可以定义编译好的（如`*.xpi`）Firefox扩展，这些扩展将在测试开始前安装。

## 安装

最简单的方法是通过以下方式将`@wdio/firefox-profile-service`作为devDependency保留在你的`package.json`中：

```sh
npm install @wdio/firefox-profile-service --save-dev
```

关于如何安装`WebdriverIO`的说明可以在[这里](https://webdriver.io/docs/gettingstarted)找到。

## 配置

通过将`firefox-profile`服务添加到你的服务列表来设置你的配置文件。然后像这样在`firefoxProfile`属性中定义你的设置：

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['firefox-profile', {
            extensions: [
                '/path/to/extensionA.xpi', // .xpi文件的路径
                '/path/to/extensionB' // 或未打包的Firefox扩展的路径
            ],
            'xpinstall.signatures.required': false,
            'browser.startup.homepage': 'https://webdriver.io',
            legacy: true // 仅适用于firefox <= 55
        }]
    ],
    // ...
};
```

如果你已经构建了一个自定义Firefox扩展，并且想要在浏览器中安装它，请确保将`'xpinstall.signatures.required': false`设置为配置文件标志，因为Firefox扩展需要由[Mozilla签名](https://wiki.mozilla.org/Add-ons/Extension_Signing)。

要使用自定义未签名的扩展，你还需要使用[Firefox开发者版本](https://www.mozilla.org/en-GB/firefox/developer/)，因为常规的Firefox 48及更新版本[不允许这样做](https://wiki.mozilla.org/Add-ons/Extension_Signing#Timeline)。

## 选项

包含所有键值对形式的设置。你可以在`about:config`页面上找到所有可用设置。

### extensions

向浏览器会话添加一个或多个扩展。所有条目可以是`.xpi`文件的绝对路径，也可以是未打包的Firefox扩展目录的路径。

类型：`String[]`<br />
默认值：`[]`

### profileDirectory

通过设置现有配置文件的绝对路径，基于该配置文件创建Firefox配置文件。

类型：`String`<br />
默认值：`null`

### proxy

设置网络代理设置。参数`proxy`是一个哈希，其结构取决于必需键`proxyType`的值，该键接受以下字符串值之一：

 * `direct` - 直接连接（无代理）
 * `system` - 使用操作系统代理设置
 * `pac` - 使用基于`autoconfigUrl`键值的自动代理配置
 * `manual` - 手动代理设置，使用以下键的值为不同协议单独定义：`ftpProxy`、`httpProxy`、`sslProxy`、`socksProxy`

类型：`Object`<br />
默认值：`null`<br />
示例：

- 自动代理：
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'pac',
                    autoconfigUrl: 'http://myserver/proxy.pac'
                }
            }]
        ],
        // ...
    };
    ```

- 手动HTTP代理：
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

- 手动HTTP和HTTPS代理：
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080',
                    sslProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

### legacy

如果你使用Firefox v55或更低版本，请将此标志设置为`true`。

类型：`Boolean`<br />
默认值：`false`

----

有关WebdriverIO的更多信息，请参阅[主页](https://webdriver.io)。