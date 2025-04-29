---
id: gmangiapelo-wdio-azure-devops-service
title: Azure DevOps テストプラン サービス
custom_edit_url: https://github.com/gianlucamangiapelo/wdio-azure-devops-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @gmangiapelo/wdio-azure-devops-service はサードパーティのパッケージです。詳細については [GitHub](https://github.com/gianlucamangiapelo/wdio-azure-devops-service) | [npm](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service) をご覧ください。

[![version](https://img.shields.io/npm/v/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)
[![downloads](https://img.shields.io/npm/dt/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

[WebdriverIO](https://webdriver.io/) の結果を Azure DevOps テストプランに公開します。

主な特徴：

* Jasmine/Jest/Mocha および Cucumber ランタイムフレームワークのサポート
* 複数のspec（テスト）ファイルを実行し、同じスイートに属している場合は、テスト結果が同じテスト実行にまとめられます
* 単一テスト実行後すぐに結果が報告されます（リアルタイムレポーティング）
* 最後のspec（テスト）ファイルが終了した後にテスト実行が閉じられます
* マルチスイートサポート

## インストール

以下のコマンドを使用して、このモジュールをローカルにインストールし、（開発）依存関係として使用できます：

```shell
npm install --save @gmangiapelo/wdio-azure-devops-service
npm install --save-dev @gmangiapelo/wdio-azure-devops-service
```

`WebdriverIO`のインストール方法については、[こちら](https://webdriver.io/docs/gettingstarted)をご覧ください。

## 使用方法

> _wdio-azure-devops-service_ は **NodeJS 8以上** をサポートしています

> _wdio-azure-devops-service_ は **commonjs** と **esm** をサポートしています

### 設定

`@gmangiapelo/wdio-azure-devops-service`はサービスなので、以下のように`wdio.conf.js`ファイルでセットアップできます：

```js
import AzureDevopsService from "@gmangiapelo/wdio-azure-devops-service";
// wdio.conf.js
exports.config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
              AzureDevopsService,
              {
                  pat: '3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn',
                  organizationUrl: 'https://dev.azure.com/gianlucamangiapelo',
                  projectId: '8b3c68ac-f69d-41c6-bbad-921d8bae9819',
                  planId: 263072,
                  suiteId: 263073,
                  caseIdRegex: '@?[ref](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\\d+)',
                  runName: 'FE regression tests for TestPlan',
              },
          ],
    ],
    // ...
};
```

### テストケースのセットアップ

WDIOテストには、AzureテストケースのIDを含める必要があります。テストケースIDがテストタイトルと区別されていることを確認してください：

**Mochaスタイル：**
```Javascript
// 良い例：
it("C123 Can authenticate a valid user", ...

// 悪い例：
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid user C123", ...
```

**Cucumberスタイル：**
```Gherkin
## 良い例：
@C123
Scenario Can authenticate a valid user
@c123
Scenario Can authenticate a valid user,

## 悪い例：
@c123stringTest
Scenario Can authenticate a valid user
```

### Azure DevOps レポートの例

これは、テスト実行中にAZ Test Plansにプッシュされた結果の例です
![AzureDevops Test Plans example](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/./img/AZ-DevOps-example.png)

<br />

## サービスオプション

### pat

API権限が設定されたAzure DevOpsで生成された個人アクセストークン。

例：`"3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn"`

型：`string`

必須：`true`

### organizationUrl

Azure DevOpsインスタンスのベースURL。

例：`"https://dev.azure.com/gianlucamangiapelo"`

型：`string`

必須：`true`

### projectId

Azure DevOpsのプロジェクトID。

projectIdを見つけるには、`GET {organizationUrl}/_apis/projects?api-version=6.0`を使用して、適切な`id`をコピーしてください。

例：`"3cf7dbc9-cb1e-4240-93f2-9a5960ab3945"`

型：`string`

必須：`true`

### planId

Azure DevOpsテストプランセクションで取得できるテストプランID。

例：`124`

型：`integer`

必須：`true`

### suiteId

Azure DevOpsテストプランセクションで取得できるsuiteId。ネストされたスイートの場合は、ルートsuiteIdを取得してください。サービスはすべての子スイートを反復処理します。

例：`21`

型：`integer`

必須：`true`

### runName

テスト実行の説明的な名前。

例：`"FE regression tests run"`

型：`string`

必須：`true`

### caseIdRegex

タグやテストケースのタイトルからtestCaseIdを一致させるためのカスタム正規表現。

型：`string`

デフォルト：`"@?[cC](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\d+)"`

必須：`false`

## 作者
Gianluca Mangiapelo - [github](https://github.com/gianlucamangiapelo)