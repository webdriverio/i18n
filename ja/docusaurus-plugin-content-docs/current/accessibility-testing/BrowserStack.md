---
id: browserstack
title: BrowserStack アクセシビリティテスト
description: "BrowserStack Automate 上で実行される WebdriverIO テストに自動アクセシビリティスキャンを追加し、検出された問題を BrowserStack のレポートで確認します。"
---

# BrowserStack アクセシビリティテスト

[BrowserStack アクセシビリティテストの自動テスト機能](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)を使用すると、WebdriverIO のテストスイートにアクセシビリティテストを簡単に統合できます。

## BrowserStack アクセシビリティテストにおける自動テストの利点

BrowserStack アクセシビリティテストで自動テストを使用するには、テストが BrowserStack Automate 上で実行されている必要があります。

自動テストには以下の利点があります：

* 既存の自動テストスイートにシームレスに統合できます。
* テストケースのコードを変更する必要はありません。
* アクセシビリティテストのための追加のメンテナンスは一切不要です。
* 過去の傾向を把握し、テストケースに関するインサイトを得ることができます。

## BrowserStack アクセシビリティテストを始める

以下の手順に従って、WebdriverIO のテストスイートを BrowserStack のアクセシビリティテストと統合します：

1. `@wdio/browserstack-service` npm パッケージをインストールします。

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. `wdio.conf.js` 設定ファイルを更新します。

```javascript
exports.config = {
    //...
    user: '<browserstack_username>' || process.env.BROWSERSTACK_USERNAME,
    key: '<browserstack_access_key>' || process.env.BROWSERSTACK_ACCESS_KEY,
    commonCapabilities: {
      'bstack:options': {
        projectName: "Your static project name goes here",
        buildName: "Your static build/job name goes here"
      }
    },
    services: [
      ['browserstack', {
        accessibility: true,
        // オプションの設定項目
        accessibilityOptions: {
          'wcagVersion': 'wcag21a',
          'includeIssueType': {
            'bestPractice': false,
            'needsReview': true
          },
          'includeTagsInTestingScope': ['Specify tags of test cases to be included'],
          'excludeTagsInTestingScope': ['Specify tags of test cases to be excluded']
        },
      }]
    ],
    //...
  };
```

詳細な手順は[こちら](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)をご覧ください。