---
id: testmuai
title: TestMu AI（旧LambdaTest）アクセシビリティテスト
description: WebdriverIOテストスイートにTestMu AIアクセシビリティテストを簡単に統合する方法
---

# TestMu AIアクセシビリティテスト

WebdriverIOテストスイートに[TestMu AIアクセシビリティテスト](https://www.testmuai.com/support/docs/accessibility-automation-settings/)を簡単に統合できます。

## TestMu AIアクセシビリティテストの利点

TestMu AIアクセシビリティテストは、Webアプリケーションのアクセシビリティ問題を特定して修正するのに役立ちます。主な利点は次のとおりです：

* 既存のWebdriverIOテスト自動化にシームレスに統合
* テスト実行中の自動アクセシビリティスキャン
* 包括的なWCAG準拠レポート
* 修正ガイダンス付きの詳細な問題追跡
* 複数のWCAG標準（WCAG 2.0、WCAG 2.1、WCAG 2.2）のサポート
* TestMu AIダッシュボードでのリアルタイムアクセシビリティインサイト

## TestMu AIアクセシビリティテストを始める

WebdriverIOテストスイートをTestMu AIのアクセシビリティテストと統合するには、次の手順に従います：

1. TestMu AI WebdriverIOサービスパッケージをインストールします。

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. `wdio.conf.js`設定ファイルを更新します。

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
            accessibility: true, // アクセシビリティテストを有効化
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // WCAGバージョン (wcag20, wcag21a, wcag21aa, wcag22aa)
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

3. 通常通りテストを実行します。TestMu AIはテスト実行中に自動的にアクセシビリティの問題をスキャンします。

```bash
npx wdio run wdio.conf.js
```

## 設定オプション

`accessibilityOptions`オブジェクトは次のパラメータをサポートしています：

* **wcagVersion**: テストする対象のWCAG標準バージョンを指定
  - `wcag20` - WCAG 2.0 レベルA
  - `wcag21a` - WCAG 2.1 レベルA
  - `wcag21aa` - WCAG 2.1 レベルAA（デフォルト）
  - `wcag22aa` - WCAG 2.2 レベルAA

* **bestPractice**: ベストプラクティスの推奨事項を含める（デフォルト：`false`）

* **needsReview**: 手動レビューが必要な問題を含める（デフォルト：`true`）

## アクセシビリティレポートの表示

テストが完了した後、[TestMu AIダッシュボード](https://automation.lambdatest.com/)で詳細なアクセシビリティレポートを確認できます：

1. テスト実行に移動
2. 「Accessibility」タブをクリック
3. 重要度レベル付きで特定された問題を確認
4. 各問題の修正ガイダンスを取得

詳細な情報については、[TestMu AIアクセシビリティ自動化ドキュメント](https://www.testmuai.com/support/docs/accessibility-automation-settings/)をご覧ください。