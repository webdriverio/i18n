---
id: json-reporter
title: Json レポーター
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-json-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## インストール

```bash
npm install @wdio/json-reporter --save-dev
```

## 設定

### 結果を `stdout` に出力

```js
reporters: [
    'dot',
    ['json', { stdout: true }]
],
```

### 結果をファイルに出力

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results'
    }]
],
```

### カスタムファイル名で結果をファイルに出力

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results',
        outputFileFormat: (opts) => {
            return `results-${opts.cid}.${opts.capabilities.browserName}.json`
        }
    }]
],
```

## 結果ファイル

WDIO v5以降では、レポート作成は一元的なプロセスから、並列テスト実行のために起動される各「セッション」によって処理されるようになりました。この変更によりWDIOテスト実行中の通信量が減少し、パフォーマンスが向上しました。欠点は、すべてのテスト実行に対して単一のレポートを取得することができなくなったことです。

`@wdio/json-reporter`は、複数のJSONファイルを1つのファイルにマージするためのユーティリティ関数を提供しています。このユーティリティを活用するには、以下の手順に従ってください。

これは`wdio.conf.js`の[`onComplete`](https://webdriver.io/docs/configuration#oncomplete)で実行できます：

```javascript
// wdio.conf.js
import mergeResults from '@wdio/json-reporter/mergeResults'

export const config = {
    // ...
    onComplete: function (exitCode, config, capabilities, results) {
        mergeResults('./results', 'wdio-.*-json-reporter.json', 'wdio-custom-filename.json')
    }
    // ...
}
```

_注意:_ `wdio-custom-filename.json`はオプションです。パラメータが提供されない場合、デフォルト値は`wdio-merged.json`になります。

## 貢献

このレポーターのソースコードは、[Jim Davis](https://github.com/fijijavis)によるコミュニティレポーター[`wdio-json-reporter`](https://github.com/fijijavis/wdio-json-reporter)に大きく影響を受けています。プロジェクトのメンテナンスに対する努力に感謝します！

---

WebdriverIOの詳細については[ホームページ](http://webdriver.io)をご覧ください。