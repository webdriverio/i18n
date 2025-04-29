---
id: wdio-slack-service
title: Slack 服务
custom_edit_url: https://github.com/carmenmitru/wdio-slack-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-service 是一个第三方包，更多信息请查看 [GitHub](https://github.com/carmenmitru/wdio-slack-service) | [npm](https://www.npmjs.com/package/wdio-slack-service)
Webdriverio 库，用于将测试结果作为 Slack 通知/消息发送到频道

## 安装

最简单的方法是将 `wdio-slack-service` 作为 devDependency 保存在您的 `package.json` 中。

```json
{
  "devDependencies": {
    "wdio-slack-service": "2.0.8"
  }
}
```

您可以通过以下方式简单地执行此操作：

```bash
npm install wdio-slack-service --save-dev
```

有关如何安装 `WebdriverIO` 的说明可以在[这里](https://webdriver.io/docs/gettingstarted.html)找到。

## 配置

首先，将服务导入到 wdio 配置文件 `wdio.conf.js` 中

```js
// wdio.conf.js
const slack = require('wdio-slack-service');
```

要使用该服务，您需要有 slack webhook url 来发送通知，并且需要将 `slack` 添加到您的 `services` 数组中

示例：

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        [slack, {
            webHookUrl: "<SLACK_WEBHOOK_URL>", // 用于向特定频道发送通知
            notifyOnlyOnFailure: true, // 仅在测试失败时发送通知
            messageTitle: "<NOTIFICATION_TITLE>" // 通知的名称
        }]
]
```
## 特性

- 无论测试结果如何都发送通知
- 仅在测试失败时发送通知
- 支持 `mocha`、`jasmine` 和 `cucumber`
- 重试/重新运行测试将记录附加信息
- 测试持续时间信息
- 错误详情
- Cucumber 场景/步骤报告
- 浏览器和版本信息

## 工作原理
对于 `mocha`/`jasmine`，通知将在规格级别发送，对于 `cucumber`，将在功能级别发送。例如，如果您有 10 个规格/功能文件，您将收到 10 个通知，因为它是在 `after` 钩子中触发的

## 选项

要发送通知，您应该有 slack webhook url。要了解如何创建 slack webhook URL，请参阅此[页面](https://api.slack.com/messaging/webhooks)

### webHookUrl

此 url 用于识别/验证帖子消息并将其发送到 slack 频道

类型：`String` <br/>
可选：`否` <br/>
默认值：`NA`

### notifyOnlyOnFailure

如果您只想在测试失败时接收 slack 通知，则将此选项设置为 `true`。否则，无论通过/失败，它都会发送所有测试执行的通知

类型：`Boolean` <br/>
可选：`是` <br/>
默认值：`false`

### messageTitle

通知的标题

类型：`String` <br/>
可选：`是` <br/>
默认值：`Webdriverio Slack Reporter`

## 截图

### Cucumber 通过/失败

![Cucumber 通过/失败](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumber.PNG)

### Cucumber 重试

![Cucumber 重试](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumberretry.PNG)

### 全部通过

![全部通过](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/allpass.PNG)

### 失败通过

![失败通过](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/failpass.PNG)

### 重试失败

![重试失败](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retryfail.PNG)

### 重试通过

![重试通过](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retrypassed.PNG)

---

有关 WebdriverIO 的更多信息，请参阅[主页](https://webdriver.io)。