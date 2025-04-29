---
id: wdio-gmail-service
title: Gmail 服务
custom_edit_url: https://github.com/webdriverio-community/wdio-gmail-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-gmail-service 是一个第三方包，更多信息请参见 [GitHub](https://github.com/webdriverio-community/wdio-gmail-service) | [npm](https://www.npmjs.com/package/wdio-gmail-service)

一个使用 [Gmail Tester](https://github.com/levz0r/gmail-tester) 从 Google Mail 获取电子邮件的 WebdriverIO 插件。

## 安装

最简单的方法是将 `wdio-gmail-service` 作为 package.json 中的 `devDependency` 保留。

```json
{
  "devDependencies": {
    "wdio-gmail-service": "^2.0.0"
  }
}
```

你可以通过以下方式简单地做到这一点：

```sh
npm install wdio-gmail-service --save-dev
```

## 使用方法

### Gmail 认证

你需要按照 [Gmail Tester](https://github.com/levz0r/gmail-tester) 的说明创建 `credentials.json`（OAuth2 认证文件）和 `token.json`（OAuth2 令牌）。

### 配置

通过将 `gmail` 添加到服务列表中来添加服务，例如：

```js
// wdio.conf.js
import path from 'path'

export const config = {
    // ...
    services: [['gmail', {
        credentialsJsonPath: path.join(process.cwd(), './credentials.json'),
        tokenJsonPath: join(process.cwd(), './token.json'),
        intervalSec: 10,
        timeoutSec: 60
    }]]
    // ...
};
```

## 服务选项

### credentialsJsonPath
凭据 JSON 文件的绝对路径。

类型：`string`

必需：`true`

### tokenJsonPath
令牌 JSON 文件的绝对路径。

类型：`string`

必需：`true`

### intervalSec
Gmail 收件箱检查之间的间隔。

类型：`number`

默认值：`10`

必需：`false`

### timeoutSec
为给定过滤器查找电子邮件的最长等待时间。

类型：`number`

默认值：`60`

必需：`false`


## 编写测试

在 WebdriverIO 测试中，现在可以检查是否收到了电子邮件。

```js
describe('Example', () => {
    it('Should check email', () => {
        // perform some actions that will send an email to setup gmail account
        const emails = await browser.checkInbox({ from: 'AccountSupport@ubi.com', subject: 'Ubisoft Password Change Request' });
        expect(emails[0].body.html).toContain('https://account-uplay.ubi.com/en-GB/action/change-password?genomeid=')
    })
})
```

## `checkInbox` 参数

命令参数至少需要 `from`、`to` 或 `subject` 之一：

### `from`
根据接收者的电子邮件地址进行过滤。

类型：`String`

### `to`
根据发送者的电子邮件地址进行过滤。

类型：`String`

### `subject`
根据电子邮件的主题进行过滤。

类型：`String`

### `includeBody`
设置为 true 以获取解码的电子邮件正文。

类型：`boolean`

### `includeAttachments`
设置为 true 以获取 base64 编码的电子邮件附件。

类型：`boolean`

### `before`
过滤指定日期之前收到的消息。

类型：`Date`

### `after`
过滤指定日期之后收到的消息。

类型：`Date`

### `label`
默认标签是 'INBOX'，但可以更改为 'SPAM'、'TRASH' 或自定义标签。有关内置标签的完整列表，请参见 https://developers.google.com/gmail/api/guides/labels?hl=en

类型：`String`

---

有关 WebdriverIO 的更多信息，请参见[主页](https://webdriver.io)。