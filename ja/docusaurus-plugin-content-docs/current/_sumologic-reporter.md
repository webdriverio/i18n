---
id: sumologic-reporter
title: Sumologic レポーター
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sumologic-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> テスト結果を[Sumologic](https://www.sumologic.com/)にデータ分析のために送信するWebdriverIOレポーター

![Sumologic Dashboard](/img/sumologic.png "Sumologic Dashboard")

## インストール

最も簡単な方法は、`@wdio/sumologic-reporter`を`package.json`にdevDependencyとして保持することです：

```sh
npm install @wdio/sumologic-reporter --save-dev
```

`WebdriverIO`のインストール方法については[こちら](https://webdriver.io/docs/gettingstarted)をご覧ください。

## 設定

まず、テストのすべてのログを収集する新しいコレクターを作成する必要があります。そのためにナビゲーションバーの__Manage__をクリックして、__Collection__に移動します。そこで「Hosted Collector」を新たに追加する必要があります。適切な名前（例：「test integration logs」）、説明、およびカテゴリ（例：「wdio」）を適用します。保存をクリックしてコレクターを作成します。

![Add Collector](https://webdriver.io/images/sumo-collector.png "Add Collector")

次のステップはソースを追加することです。環境ごと（例：ブランチビルド、統合）に独自のソースを持つことは理にかなっています。コレクターの横にある「Add Source」リンクをクリックして、__HTTP Source__を追加します。再び適切な名前と説明を適用し、環境を反映した「Source Category」を設定します。他のオプションはデフォルト状態のままにして、保存をクリックします。

![Add Source](https://webdriver.io/images/sumo-source.png "Add Source")

ソースエンドポイントが表示されたモーダルがポップアップします。そのURLをコピーしてwdio.conf.jsに貼り付け、レポーターがデータを送信する場所を知らせます。

以下のコードはデフォルトのwdioテストランナー設定を示しています。配列に`'sumologic'`をレポーターとして追加し、ソースエンドポイントを追加するだけです：

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: [
    'spec',
    ['sumologic', {
        // define sync interval how often logs get pushed to Sumologic
        syncInterval: 100,
        // endpoint of collector source
        sourceAddress: process.env.SUMO_SOURCE_ADDRESS
    }]
  ],
  // ...
};
```

レポーターで最初のテストを実行した後、次のクエリでテストログを確認できるはずです：

```
_source=wdio
| parse "\"type\":\"*:*\"" as type,status
| json auto
```

Sumologicのための便利なダッシュボードテンプレートをまもなく提供する予定です。

----

WebdriverIOの詳細については[ホームページ](https://webdriver.io)をご覧ください。