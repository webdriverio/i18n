---
id: lambdatest
title: LambdaTestアクセシビリティテスト
---

# LambdaTest Accessibility Testing

[LambdaTest Accessibility Testing](https://www.lambdatest.com/support/docs/accessibility-automation-settings/)を使用して、WebdriverIOのテストスイートにアクセシビリティテストを簡単に統合できます。

## LambdaTest Accessibility Testingのメリット

LambdaTest Accessibility Testingは、Webアプリケーションのアクセシビリティの問題を特定して修正するのに役立ちます。主なメリットは次のとおりです：

* 既存のWebdriverIOテスト自動化とシームレスに統合
* テスト実行中の自動アクセシビリティスキャン
* 包括的なWCAGコンプライアンスレポート
* 詳細な問題追跡と修正ガイダンス
* 複数のWCAG標準（WCAG 2.0、WCAG 2.1、WCAG 2.2）のサポート
* LambdaTestダッシュボードでのリアルタイムアクセシビリティインサイト

## LambdaTest Accessibility Testingを始める

WebdriverIOのテストスイートをLambdaTestのAccessibility Testingと統合するには、次の手順に従ってください：

1. LambdaTest WebdriverIOサービスパッケージをインストールします。

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

3. 通常どおりテストを実行します。LambdaTestはテスト実行中に自動的にアクセシビリティの問題をスキャンします。

```bash
npx wdio run wdio.conf.js
```

## 設定オプション

`accessibilityOptions`オブジェクトは次のパラメーターをサポートしています：

* **wcagVersion**: テストするWCAG標準バージョンを指定
  - `wcag20` - WCAG 2.0 レベルA
  - `wcag21a` - WCAG 2.1 レベルA
  - `wcag21aa` - WCAG 2.1 レベルAA（デフォルト）
  - `wcag22aa` - WCAG 2.2 レベルAA

* **bestPractice**: ベストプラクティスの推奨事項を含める（デフォルト：`false`）

* **needsReview**: 手動レビューが必要な問題を含める（デフォルト：`true`）

## アクセシビリティレポートの表示

テストが完了したら、[LambdaTestダッシュボード](https://automation.lambdatest.com/)で詳細なアクセシビリティレポートを表示できます：

1. テスト実行に移動
2. 「Accessibility」タブをクリック
3. 重要度レベル付きの特定された問題を確認
4. 各問題の修正ガイダンスを取得

詳細については、[LambdaTest Accessibility Automationドキュメント](https://www.lambdatest.com/support/docs/accessibility-automation-settings/)をご覧ください。