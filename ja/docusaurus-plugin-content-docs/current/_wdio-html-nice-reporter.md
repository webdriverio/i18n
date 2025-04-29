---
id: wdio-html-nice-reporter
title: HTMLレポーター
custom_edit_url: https://github.com/rpii/wdio-html-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-html-nice-reporterはサードパーティのパッケージです。詳細については[GitHub](https://github.com/rpii/wdio-html-reporter) | [npm](https://www.npmjs.com/package/wdio-html-nice-reporter)をご覧ください
 # wdio-html-nice-reporter

webdriver.ioのためのレポーターで、見やすいHTMLレポートを生成します。  
名前は少し変ですがwebdriverioとの統合を提供します

### 新機能：ベータ版ではなくなりました。

### 新機能：クリーンアップしてログをwdio-loggingに切り替えました。サンプルも更新されています。
    設定からlog4Jsロガー初期化を削除する必要があります

### 新機能：webdriverio 8との互換性のためにESモジュールとして書き直されました。
    テストアプリで変更が必要かもしれません

### バグ修正：webdriverioがjson非同期書き込みの途中でシャットダウンされていました。

### バグ修正：json書き込みが正しく待機されていませんでした

### 素晴らしい新改善：json.stringifyによるメモリ不足エラーが発生しなくなりました

### 素晴らしい新機能：各テストの動画を撮影できます


## [変更履歴](https://github.com/rpii/wdio-html-reporter/blob/master/changes.md)

## 情報

このプロジェクトは[@rpii/wdio-html-reporter](https://www.npmjs.com/package/wdio-html-reporter)の書き直しです。
多くの拡張機能を持つタイプスクリプトで書かれています。



## 設定

### WDIO.config.ts

以下のコードはデフォルトのwdioテストランナー設定を示しています。reportersの配列に別のレポーターとしてHtmlReporterオブジェクトを追加するだけです：

### 機能するwdio.config.tsは[/samples/wdio.config.ts](https://github.com/rpii/wdio-html-reporter/blob/master//samples/wdio.config.ts)で提供されています

以下はそのファイルからの抜粋です。

```typescript

// wdio.config.ts
import {ReportGenerator, HtmlReporter} from 'wdio-html-nice-reporter';
let reportAggregator: ReportGenerator;

const BaseConfig: WebdriverIO.Config = {
    
  reporters: ['spec',
        ["html-nice", {
            outputDir: './reports/html-reports/',
            filename: 'report.html',
            reportTitle: 'Test Report Title',
            linkScreenshots: true,
            //to show the report in a browser when done
            showInBrowser: true,
            collapseTests: false,
            //to turn on screenshots after every test
            useOnAfterCommandForScreenshot: false
        }
        ]
    ]
    
 
};
```
## 設定オプション：
  
### すべてのスイートのマスターレポートを生成するには

webdriver.ioは各テストスイートでレポーターを呼び出します。レポートを集約しません。これを行うには、以下のイベントハンドラをwdio.config.jsに追加してください。

ブラウザ設定ファイルに追加：
```
let reportAggregator : ReportAggregator;
```
ブラウザ設定オブジェクトに追加：
```javascript
    onPrepare: function(config, capabilities) {

    reportAggregator = new ReportGenerator({
        outputDir: './reports/html-reports/',
        filename: 'master-report.html',
        reportTitle: 'Master Report',
        browserName: capabilities.browserName,
        collapseTests: true
    });
    reportAggregator.clean();
}


onComplete: function (exitCode, config, capabilities, results) {
    (async () => {
        await reportAggregator.createReport();
    })();
}


``` 


  
### このレポートからPDFファイルを生成するには

必要としない人のためにサポートを軽量に保つために、追加のプラグインが必要です。
[@rpii/wdio-html-reporter-pdf](https://www.npmjs.com/package/@rpii/wdio-html-reporter-pdf)を参照してください


## サンプル出力：

![レポートのスクリーンショット](https://github.com/rpii/wdio-html-reporter/blob/master/TestReport.png)

## browserName

これは手動で設定する必要があります。ブラウザオブジェクトはセッションを開始するまで存在しないため、設定時には利用できません。