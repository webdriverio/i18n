---
id: wdio-testrail-reporter
title: Testrail リポーター
custom_edit_url: https://github.com/webdriverio-community/wdio-testrail-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/testrail-reporter は、サードパーティのパッケージです。詳細については [GitHub](https://github.com/webdriverio-community/wdio-testrail-reporter) | [npm](https://www.npmjs.com/package/@wdio/testrail-reporter) をご覧ください。

このリポーターは TestRail レポートを作成します。まず最初に、レポートが TestRail と通信してテスト結果を送信できるように TestRail API を有効にする必要があります。そのためには、TestRail アカウントにログインし、Administration > Site Settings > API に移動して、Enable API の近くにあるチェックボックスをクリックしてください。

テストの説明に TestRail のテストケース ID を追加します。例：
```javascript
it("C123456 Page loads correctly", async () => {
```
複数のケース ID もサポートしています。例：
```javascript
it("C123456 C678910 Page loads correctly", async () => {
```

## インストール

リポーターを使用するには、`package.json` に追加します：

```sh
npm i --save-dev @wdio/testrail-reporter
```

## 使用方法

WDIO 設定ファイルにリポーターを追加します。

新しいテスト実行を作成する場合の例：

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false,
                caseIdTagPrefix: '' // used only for multi-platform Cucumber Scenarios
            }
        ]
    ],
    // ...
}
```

既存のテスト実行を更新する場合の例：

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                existingRunId: 2345,
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```

実行するテストスイートに基づいて異なるプロジェクトやスイート ID が必要な場合の例：

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: process.env.TESTRAIL_PROJECT_NAME == 'PROJECT_A' ? 1 : 2,
                suiteId: process.env.TESTRAIL_SUITE_NAME == 'SUITE_A' ? 10 : 20,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```


## オプション

### `projectId`

TestRail プロジェクトの ID。

タイプ: `string`

### `suiteId`

スイートの ID、デフォルトはスイート 1 です。

タイプ: `string`

### `domain`

TestRail インスタンスのドメイン、例：`your-domain.testrail.io`。

タイプ: `string`

### `username`

TestRail インスタンスのユーザー名。

タイプ: `string`

### `apiToken`

TestRail インスタンスの API トークン。

タイプ: `string`

### `runName`

テスト実行のカスタム名。

タイプ: `string`

### `existingRunId`

更新する既存のテスト実行の ID。

タイプ: `string`

### `oneReport`

単一のテスト実行を作成します。

タイプ: `boolean`

### `includeAll`

テスト実行にスイート内のすべてのテストを含めます。

タイプ: `boolean`

### `caseIdTagPrefix`

Cucumber タグ内のケース ID を見つけるためのプレフィックス。マルチプラットフォームの Cucumber シナリオ実行に役立ちます。

タイプ: `string`

### `useCucumber`

テストが Cucumber フレームワークを使用して書かれているかどうかを示します。デフォルトでは `false` に設定されています。

タイプ: `boolean`

---

WebdriverIO の詳細については、[ホームページ](https://webdriver.io)をご覧ください。