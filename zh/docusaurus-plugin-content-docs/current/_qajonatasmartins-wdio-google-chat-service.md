---
id: qajonatasmartins-wdio-google-chat-service
title: Google Chat 服务
custom_edit_url: https://github.com/qajonatasmartins/wdio-google-chat-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @qajonatasmartins/wdio-google-chat-service 是一个第三方包，更多信息请参见 [GitHub](https://github.com/qajonatasmartins/wdio-google-chat-service) | [npm](https://www.npmjs.com/package/wdio-google-chat-service)

Webdriverio 库，用于将测试结果作为通知/消息发送到 Google Chat 空间。

## 安装

`npm install wdio-google-chat-service --save-dev`

或

`yarn add wdio-google-chat-service`

## 设置

首先，将该服务导入到 wdio 配置文件 `wdio.conf.js` 中

```
// wdio.conf.js
const GoogleChatService = require('wdio-google-chat-service');
```

要使用该服务，您需要有 Google Chat webhook URL 来发送通知，并在 'webhook' 中添加该 URL

示例：

```
services: [[GoogleChatService, {
            webhookUrl: 'https://chat.googleapis.com/v1/spaces/xxxxxxxxx/messages?key=xxxxxxxx&token=xxxxxxxxx',
            notifyOnlyOnFailure: false //仅在测试失败的情况下发送通知
        }]
],
```

## 获取 Google Chat webhook

注意：Google Chat 仅为企业账户提供 webhook。如果您使用个人账户，您将看不到 webhook 选项。

1. 在 Google Chat 中创建一个空间
2. 点击聊天空间名称旁边的箭头
3. 点击 [管理 Webhooks]
4. 添加或复制显示的 webhook URL
5. 将 webhook 的 URL 粘贴到服务内的 'webhookUrl' 选项中，如上例所示。

## 功能

- 支持 mocha 运行器
- 错误详情
- 仅在测试失败的情况下发送通知

## 结果

![测试通过和失败](https://github.com/qajonatasmartins/wdio-google-chat-service/blob/main/./img/testPassAndFail.png)