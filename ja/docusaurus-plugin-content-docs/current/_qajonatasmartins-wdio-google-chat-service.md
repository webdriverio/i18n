---
id: qajonatasmartins-wdio-google-chat-service
title: Googleチャットサービス
custom_edit_url: https://github.com/qajonatasmartins/wdio-google-chat-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @qajonatasmartins/wdio-google-chat-serviceは、サードパーティのパッケージです。詳細については[GitHub](https://github.com/qajonatasmartins/wdio-google-chat-service) | [npm](https://www.npmjs.com/package/wdio-google-chat-service)をご覧ください

テスト結果をGoogleチャットスペースに通知/メッセージとして送信するためのWebdriverioライブラリです。

## インストール

`npm install wdio-google-chat-service --save-dev`

または

`yarn add wdio-google-chat-service`

## 設定

まず、wdio設定ファイル`wdio.conf.js`にサービスをインポートします

```
// wdio.conf.js
const GoogleChatService = require('wdio-google-chat-service');
```

このサービスを使用するには、通知を送信するためのGoogleチャットのwebhook URLが必要で、'webhook'にURLを追加する必要があります

例：

```
services: [[GoogleChatService, {
            webhookUrl: 'https://chat.googleapis.com/v1/spaces/xxxxxxxxx/messages?key=xxxxxxxx&token=xxxxxxxxx',
            notifyOnlyOnFailure: false //テスト失敗の場合にのみ通知を送信
        }]
],
```

## Googleチャットのwebhookの取得方法

注意：Googleチャットのwebhookはビジネスアカウントでのみ利用可能です。個人アカウントを使用している場合、webhook機能はご利用いただけません。

1. Googleチャットでスペースを作成
2. チャットスペース名の横の矢印をクリック
3. [Manage Webhooks]をクリック
4. 新しいwebhookを追加するか、表示されているwebhook URLをコピー
5. webhookのURLを上記の例のように、サービス内の'webhookUrl'オプションに貼り付けます。

## 機能

- mochaランナーのサポート
- エラー詳細
- テスト失敗の場合にのみ通知を送信

## 結果

![テスト合格と失敗](https://github.com/qajonatasmartins/wdio-google-chat-service/blob/main/./img/testPassAndFail.png)