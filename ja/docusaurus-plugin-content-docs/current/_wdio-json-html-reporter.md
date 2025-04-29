---
id: wdio-json-html-reporter
title: JSON HTML レポーター
custom_edit_url: https://github.com/aswinchembath/wdio-json-html-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-json-html-reporterはサードパーティのパッケージです。詳細については[GitHub](https://github.com/aswinchembath/wdio-json-html-reporter) | [npm](https://www.npmjs.com/package/wdio-json-html-reporter)をご覧ください。

これはカスタムWebDriverIOレポーターで、テスト実行中に詳細なJSONレポートを生成し、テスト結果を視覚化するためのポータブルなHTMLレポートジェネレーターを提供します。タイムスタンプ、実行メタデータをログに記録し、必要に応じてスクリーンショットをキャプチャすることができます。このパッケージはWebDriverIOレポーターの規約に従い、`wdio-json-html-reporter`という名前でnpmパッケージとして公開されています。

## 目次

- [概要](#overview)
- [機能](#features)
- [インストール](#installation)
  - [1. パッケージのインストール](#1-install-the-package)
  - [2. インストールの確認](#2-verify-installation)
  - [3. WebDriverIO設定の更新](#3-update-webdriverio-configuration)
  - [4. テストの実行](#4-run-your-tests)
- [CLI使用法](#cli-usage)
- [履歴オプションと集計履歴生成](#history-option-and-aggregated-history-generation)
- [スクリーンショット](#screenshots)

## Overview

WDIO JSON HTML REPORTERは主に2つのコンポーネントを提供します：

- **JSONReporter**: WebDriverIOレポーターインターフェースを拡張したカスタムレポーターで、テストイベントを収集し、メタデータ、テスト結果、（オプションで）スクリーンショットを含むJSONファイルを生成します。
- **HTMLReportGenerator**: 複数のJSONレポートファイルを、インタラクティブなチャート、フィルタリング、エクスポート機能を備えた包括的なHTMLレポートに変換するユーティリティです。さらに、レポートジェネレーターは、履歴データを表示するためのオプションの履歴ファイルをサポートするようになりました。履歴データが提供されない場合、レポートは履歴セクションを省略し、固有のエラーのみを表示します。

これらのツールは、デバッグや継続的インテグレーションに不可欠なテスト実行に関する明確な洞察を得るのに役立ちます。

## Features

- **JSONレポート**: タイムスタンプ、スイート名、テスト結果、エラー、およびオプションのスクリーンショットを含む詳細なレポート。
- **HTMLレポート**: JSONレポートをダッシュボード、チャート、詳細なテストレポート、フィルタリング機能を備えたポータブルなHTMLレポートに変換します。
- **Excelへのエクスポート**: 詳細なテストレポートはExcelファイルにエクスポートできます。
- **スクリーンショットサポート**: 設定に基づいて、失敗したテスト（または全てのテスト）のスクリーンショットをキャプチャします。
- **実行メタデータ**: ブラウザ情報、実行開始/終了時間、全体の所要時間をログに記録します。
- **履歴実行（オプション）**: スイート別の履歴実行データを含めるために履歴JSONファイルを提供します。履歴データが提供されない場合、レポートは自動的にこのセクションを非表示にし、固有のエラーのみを表示します。
- **集計履歴生成**: JSONレポーターには集計履歴生成機能が含まれるようになりました。静的メソッド`JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })`を使用して、レポートディレクトリ内の全てのJSONレポートファイル（パターン`test-report-*.json`に一致する）を自動的にスキャンし、テスト結果を集計し、履歴データに基づいて欠陥比較を計算できます。集計された履歴レコードは履歴ファイルに追加され、HTMLレポートジェネレーターで時間の経過に伴うトレンドを視覚化するために使用できます。

## Installation

`wdio-json-html-reporter`パッケージをインストールするには、次の手順に従います：

### 1. Install the package

次のコマンドを実行して、開発依存関係としてパッケージをインストールします：

```bash
npm install --save-dev wdio-json-html-reporter
```

### 2. Verify installation

次のコマンドを実行して、パッケージが正しくインストールされたことを確認します：

```bash
npm list wdio-json-html-reporter
```

正しくインストールされていれば、次のような出力が表示されます：

```bash
wdio-json-html-reporter@x.x.x
```

### 3. Update WebDriverIO Configuration

カスタムレポーターを含めるために`wdio.conf.js`または`wdio.conf.ts`ファイルを変更します：

```javascript
import { JSONReporter, HTMLReportGenerator } from 'wdio-json-html-reporter';

export const config = {
  reporters: [
    [JSONReporter, { outputFile: './reports/test-results.json', screenshotOption: 'OnFailure' }],  // Options: "No", "OnFailure", "Full"
  ],
  onComplete: async function() {
    const outputFilePath = './reports/test-report.html';
    const jsonFolder = './reports'; // Directory where JSON reports are saved

    // If you want to include historical data, specify the history JSON file path here.
    const historyFile = './reports/history.json'; // Optional

    // Optionally, generate aggregated history data before generating the HTML report.
    // JSONReporter.generateAggregateHistory({ reportPaths: jsonFolder, historyPath: historyFile });

    const reportGenerator = new HTMLReportGenerator(outputFilePath, historyFile);
    await reportGenerator.convertJSONFolderToHTML(jsonFolder);
  }
};
```

### 4. Run Your Tests

WebDriverIOテストスイートを実行します：

```bash
npx wdio run wdio.conf.js
```

## CLI Usage

WebDriverIOとの統合に加えて、組み込みのCLIを使用してHTMLレポートジェネレーターをコマンドラインから直接実行することができます。

**使用法：**

```bash
generate-html <inputFolder> <outputFile> [historyFile]
```

例えば、`test/reports/json-reports`というフォルダにJSONファイルがあり、`test/reports/report.html`という名前のHTMLレポートを生成したい場合、次のように実行できます：

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html
```

履歴ファイル（例：`test/reports/history.json`）もある場合は、オプションの4番目のパラメータとして含めます：

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html test/reports/history.json
```

**注意：**  
CLI機能は、最初のパラメータとして`generate-html`コマンドを渡した場合にのみトリガーされます。WebDriverIOを介して実行する場合（例：`wdio run wdio.conf.js`）、CLI論理はバイパスされます。

## History Option and Aggregated History Generation

HTMLレポートジェネレーターは現在、**履歴オプション**をサポートしています。これにより、"Historical Execution by Suite"セクションの下でレポートにマージされる履歴実行データを含むJSONファイルを提供することができます。履歴ファイルが提供され、有効なデータが含まれている場合、レポートは履歴トレンドをインタラクティブなチャートと各スイートのアコーディオンとともに表示します。履歴ファイルが渡されない場合、またはファイルにスイートデータが含まれていない場合、レポートは自動的に履歴セクションを非表示にし、固有のエラー概要のみを表示します。

さらに、JSONレポーターには現在、**集計履歴生成**機能が含まれています。静的メソッド`JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })`を使用すると、レポートディレクトリ内の全てのJSONレポートファイル（パターン`test-report-*.json`に一致する）を自動的にスキャンし、テスト結果を集計（テスト数の合計とスイートデータのマージ）し、最後の集計レコードと比較して欠陥比較を計算できます。新しく生成された履歴レコードは、指定された履歴ファイルに追加されます。この集計履歴データは、その後HTMLレポートジェネレーターで複数のテスト実行にわたる履歴実行の洞察を提供するために使用できます。

## Screenshots

### Dashboard  
![Dashboard](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/dashboard.png)

### Test Results  
![Test Results](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/testdetails.png)

### Screenshots  
![Screenshots](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/screesnshots.png)

### Filters  
![Filters](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/filters.png)

### Excel Export  
![Excel Export](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/exportedfile.png)