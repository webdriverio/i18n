---
id: wdio-cucumber-viewport-logger-service
title: Cucumber 视口日志服务
custom_edit_url: https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumber-viewport-logger-service 是一个第三方包，更多信息请查看 [GitHub](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service) | [npm](https://www.npmjs.com/package/wdio-cucumber-viewport-logger-service)
## WebdriverIO 的 Cucumber 视口日志服务

此服务为基于 WebdriverIO 的解决方案添加了将 Cucumber 步骤和其他调试信息直接记录到浏览器窗口的可能性。在使用没有直接
*物理*访问的设备或虚拟机以及无法设置交互式会话来深入调试 e2e 测试的情况下，它尤其有用。

![demo](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/raw/main/img/demo.gif)

### 快速开始

安装包：

```bash
npm install wdio-cucumber-viewport-logger-service --save-dev
```

将服务添加到您的 `services` 配置部分，例如：

```js
  services: [
    //...
    'cucumber-viewport-logger',
    //...
]
```

### 服务选项

| 选项 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `numberOfSteps` | 视口中将显示的步骤数量 | number | 3 |
| `enabled` | 启用/禁用服务 | boolean | true |
| `styles` | 日志包装器、*步骤关键字*和*步骤文本*的 CSS 样式，请参见下面的示例 | object | {} |

```js
// wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
            numberOfSteps: 5,
            enabled: process.env.VP_LOGGER === '1', // 只有当您将 `VP_LOGGER` 环境变量设置为 `1` 时，服务才会被启用
            // 为特定元素设置 CSS 自定义样式
            styles: {
                wrapper: { backgroundColor: 'white' },
                keyword: { color: 'red' },
                text: {
                    fontSize: '30px',
                    color: 'green',
                },
                closeButton: {
                    color: 'red',
                },
            },
        },]
    ]
    // ...
};
```

### API

> `logToViewport(message, styles)` - 使用自定义 CSS 样式（非必须）渲染自定义消息，您可以在步骤定义中使用它
例如：
>```js
>When(/^I render message: "([^"]*)"$/, { timeout: 120000 }, function (message) {
>    browser.logToViewport(message, { text: { color: 'green' } });
>});
>```


> `removeViewportLogMessage()` - 移除视口消息部分，例如可用于进行视觉断言

### pointerEvents: 'none'

默认情况下，所有鼠标事件（点击、悬停等）都会穿过消息部分，例如：不是点击消息部分，而是点击"传递"到消息旁边的元素（您的应用元素），如果您希望更改此行为，请将包装器样式的 'pointerEvents' 选项设置为 'auto'，例如：
```js

/ wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
     
            styles: {
                wrapper: { pointerEvents: 'auto' },
            },
        },]
    ]
    // ...
};
```