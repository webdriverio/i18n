---
id: testmuai
title: TestMu AI（旧 LambdaTest）アクセシビリティテスト
description: "WebdriverIO テストスイートで TestMu AI（旧 LambdaTest）のアクセシビリティテストを有効にし、スキャンオプションを設定して、アクセシビリティレポートを確認します。"
---

# TestMu AI アクセシビリティテスト

[TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/) を使用すると、WebdriverIO テストスイートにアクセシビリティテストを簡単に統合できます。

## TestMu AI アクセシビリティテストの利点

TestMu AI アクセシビリティテストは、Web アプリケーションのアクセシビリティの問題を特定して修正するのに役立ちます。主な利点は次のとおりです。

* 既存の WebdriverIO テスト自動化とシームレスに統合できます。
* テスト実行中に自動でアクセシビリティスキャンを行います。
* 包括的な WCAG 準拠レポートを提供します。
* 修正ガイダンス付きの詳細な問題追跡が可能です。
* 複数の WCAG 標準（WCAG 2.0、WCAG 2.1、WCAG 2.2）をサポートしています。
* TestMu AI ダッシュボードでリアルタイムにアクセシビリティの分析結果を確認できます。

## TestMu AI アクセシビリティテストを始める

WebdriverIO テストスイートを TestMu AI のアクセシビリティテストと統合するには、次の手順に従います。

1. TestMu AI WebdriverIO サービスパッケージをインストールします。

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. `wdio.conf.js` 設定ファイルを更新します。

```javascript
exports.config = {
    //...
    user: process.env.LT_USERNAME || '<lambdatest_username>',
    key: process.env.LT_ACCESS_KEY || '<lambdatest_access_key>',

    capabilities: [{
        browserName: 'chrome',
        'LT:Options': {
            platform: 'Windows 10',
            version: 'latest',
            accessibility: true, // アクセシビリティテストを有効にする
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // WCAG バージョン (wcag20, wcag21a, wcag21aa, wcag22aa)
                bestPractice: false,
                needsReview: true
            }
        }
    }],

    services: [
        ['lambdatest', {
            tunnel: false
        }]
    ],
    //...
};
```

3. 通常どおりテストを実行します。TestMu AI はテスト実行中にアクセシビリティの問題を自動的にスキャンします。

```bash
npx wdio run wdio.conf.js
```

## 設定オプション

`accessibilityOptions` オブジェクトは、次のパラメーターをサポートしています。

* **wcagVersion**: テスト対象とする WCAG 標準のバージョンを指定します
  - `wcag20` - WCAG 2.0 レベル A
  - `wcag21a` - WCAG 2.1 レベル A
  - `wcag21aa` - WCAG 2.1 レベル AA（デフォルト）
  - `wcag22aa` - WCAG 2.2 レベル AA

* **bestPractice**: ベストプラクティスの推奨事項を含めます（デフォルト: `false`）

* **needsReview**: 手動レビューが必要な問題を含めます（デフォルト: `true`）

## アクセシビリティレポートの確認

テストが完了したら、[TestMu AI Dashboard](https://automation.lambdatest.com/) で詳細なアクセシビリティレポートを確認できます。

1. 対象のテスト実行に移動します
2. 「Accessibility」タブをクリックします
3. 重大度レベルとともに特定された問題を確認します
4. 各問題の修正ガイダンスを確認します

詳細については、[TestMu AI Accessibility Automation のドキュメント](https://www.testmuai.com/support/docs/accessibility-automation-settings/)を参照してください。