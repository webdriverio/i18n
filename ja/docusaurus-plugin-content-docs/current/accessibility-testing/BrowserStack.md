---
id: browserstack
title: BrowserStack アクセシビリティテスト
---

# BrowserStack アクセシビリティテスト

WebdriverIOテストスイートにアクセシビリティテストを簡単に統合するには、[BrowserStack アクセシビリティテストの自動テスト機能](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)を使用することができます。

## BrowserStack アクセシビリティテストにおける自動テストの利点

BrowserStack アクセシビリティテストで自動テストを使用するには、テストはBrowserStack Automateで実行されている必要があります。

自動テストの利点は以下の通りです：

* 既存の自動テストスイートにシームレスに統合できます。
* テストケースにコード変更は必要ありません。
* アクセシビリティテストのために追加のメンテナンスは不要です。
* 履歴傾向を理解し、テストケースの洞察を得ることができます。

## BrowserStack アクセシビリティテストを始める

WebdriverIOテストスイートをBrowserStackのアクセシビリティテストと統合するには、次の手順に従ってください：

1. `@wdio/browserstack-service` npmパッケージをインストールします。

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. `wdio.conf.js`設定ファイルを更新します。

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
        // Optional configuration options
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

詳細な手順は[こちら](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)でご覧いただけます。