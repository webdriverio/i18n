---
id: wdio-performancetotal-service
title: パフォーマンストータルサービス
custom_edit_url: https://github.com/tzurp/performance-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-performancetotal-serviceはサードパーティのパッケージです。詳細については[GitHub](https://github.com/tzurp/performance-total) | [npm](https://www.npmjs.com/package/wdio-performancetotal-service)をご覧ください。
注意:<br/>
WebdriverIO v9ではバージョン4.x.xを使用してください。<br/>
WebdriverIO v8ではバージョン3.x.xを使用してください。<br/>
WebdriverIO v7ではバージョン2.x.xを使用してください。<br/>
WebdriverIO v6ではバージョン1.x.xを使用してください。

---

![chart](https://github.com/tzurp/performance-total/blob/master/resources/chart.png)

この[webdriver.io](https://webdriver.io/)のプラグインを使用すると、純粋なUI、API、またはその両方の組み合わせであっても、テスト内のあらゆるフローにパフォーマンス分析を簡単に追加できます。このプラグインは、さまざまな手順の応答時間を測定し、アプリケーションの潜在的なボトルネックを特定するためのシンプルで効率的な方法を提供します。この情報を使用して、最適化や改善に関する情報に基づいた判断を行い、アプリケーション全体のパフォーマンスを向上させることができます。

## インストール

このモジュールを開発依存関係としてインストールする最も簡単な方法は、次のコマンドを使用することです：

```
npm install wdio-performancetotal-service --save-dev
```

## 使用方法

`wdio.conf.js`にwdio-performancetotal-serviceを追加します：

```typescript
exports.config = {
  // ...
  services: ['performancetotal']
  // ...
};
```
...またはサービスオプションを使用する場合：

```typescript
exports.config = {
  // ...
  services: [
      ['performancetotal',
      // オプション（デフォルト値）
        {
            disableAppendToExistingFile: false,
            performanceResultsFileName: "performance-results",
            dropResultsFromFailedTest: false,
            performanceResultsDirectory: "performance-results",
            analyzeByBrowser: false,
            recentDays: 0
        }]
      ]
  // ...
};
```

### オプション

#### __disableAppendToExistingFile__

`true`に設定すると、新しいテスト実行は既存のパフォーマンスデータを上書きして新しく開始します。
`false`（デフォルト）に設定すると、パフォーマンスデータは既存のデータに追加されます。

> **⚠️ 注意:**
>
> このアクションはすべてのパフォーマンスデータを永久に削除します。実行前にバックアップがあることを確認してください。

#### __performanceResultsFileName__

デフォルトの結果ファイル名（`performance-results`）を上書きできます。
新しく作成された結果ファイルは通常、古いファイルを上書きします。古いファイルを保持したい場合は、ファイル名にタイムスタンプを追加することをお勧めします。例：

```typescript
...
performanceResultsFileName: `performance-results_${new Date().getTime()}`
...
```

#### __dropResultsFromFailedTest__

デフォルトは`false`です。値が`true`に設定されている場合、失敗したテストからのパフォーマンス分析は除外されます。

#### __recentDays__

デフォルトは`0`（制限なし）です。パフォーマンス分析の対象とする日数を設定するには、日数を設定します。部分的な日数もサポートされています（例：`recentDays: 0.5`）。

#### __performanceResultsDirectory__

プロジェクトのルートディレクトリにある結果ディレクトリのデフォルトパスを上書きできます。
例：

```typescript
...
performanceResultsDirectory: "results-dir/performance-total-results"
...
```

#### __analyzeByBrowser__

デフォルトは`false`です。`true`の場合、パフォーマンスデータはブラウザタイプごとにも分析されます。


### テストでの使用

テストファイルや他のクラスなど、必要な場所で__performancetotal__をインポートするだけです。このオブジェクトは、sampleStartとsampleEndを含むパフォーマンス測定の開始と終了のためのメソッドを提供します。
以下は、performancetotalオブジェクトを使用して2つのウェブサイトの起動パフォーマンスを測定する例です：

```typescript
// このテストケースはperformancetotalオブジェクトを使用してGithubとSourceForgeの起動パフォーマンスを測定します。

import { performancetotal } from "wdio-performancetotal-service";

it("should test github and sourceforge startup performance", () => {
    // Githubの新しいパフォーマンス測定を開始
    performancetotal.sampleStart("GH-Startup");

    // Githubにナビゲート
    browser.url("https://github.com/");

    // Github測定を終了し結果を保存
    performancetotal.sampleEnd("GH-Startup");

    // ...

    // SourceForgeの新しいパフォーマンス測定を開始
    performancetotal.sampleStart("SF-Startup");

    // SourceForgeにナビゲート
    await browser.url("https://sourceforge.net/");

    // SourceForge測定を終了し結果を保存
    performancetotal.sampleEnd("SF-Startup");
});

```

テストでperformancetotal.getSampleTime(sampleName)を呼び出すことで、単一のパフォーマンスサンプルにかかった時間を取得できます。これにより、コードの特定のセクションのパフォーマンスをチェックし、期待に沿っていることを確認できます。

```typescript
// 単一サンプルにかかった時間を取得
const sampleTime = performancetotal.getSampleTime(sampleName);

```

## 結果の取得

すべてのテストが完了すると、プロジェクトのルートフォルダに新しい結果ディレクトリが作成されます（デフォルトのディレクトリ名はperformance-resultsです）。このディレクトリ内に、performance-results.jsonとperformance-results.csvの2つのファイルが作成されます。これらのファイルには、各サンプルの平均時間、平均の標準誤差（SEM）、サンプル数、最小値、最大値、最早時間、最新時間を含む分析データが含まれています。このデータを使用して、時間の経過とともにパフォーマンスの低下や改善を特定できます。

### 一括でのパフォーマンスデータの分析

新しいテストを生成せずに既存のパフォーマンスデータを一括で分析するには、[__performancetotal-cli__ ツール](https://www.npmjs.com/package/performancetotal-cli)を使用することをお勧めします。

## Typescriptサポート

このプラグインではTypescriptがサポートされています。

## サポート

サポートや提案については、[tzur.paldi@outlook.com](https://github.com/tzurp/performance-total/blob/master/mailto:tzur.paldi@outlook.com)までご連絡ください。