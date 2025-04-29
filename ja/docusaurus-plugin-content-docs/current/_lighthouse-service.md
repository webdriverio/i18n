---
id: lighthouse-service
title: Lighthouseサービス
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-lighthouse-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview)を使用してアクセシビリティとパフォーマンステストを実行できるようにするWebdriverIOサービスです。

**注意:** このサービスは現在、Google ChromeまたはChromiumで実行されるテストのみをサポートしています！ほとんどのクラウドベンダーはChrome DevTools Protocolへのアクセスを提供していないため、このサービスは通常、ローカルで、または[Selenium Grid](https://www.selenium.dev/documentation/grid/) v4以上を通じてテストを実行する場合にのみ機能します。

## インストール

最も簡単な方法は、以下のコマンドを使用して`@wdio/lighthouse-service`を`package.json`の開発依存関係として保持することです：

```sh
npm install @wdio/lighthouse-service --save-dev
```

`WebdriverIO`のインストール方法については[こちら](https://webdriver.io/docs/gettingstarted)を参照してください。

## 設定

このサービスを使用するには、`wdio.conf.js`のサービスリストにサービスを追加するだけです：

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['lighthouse'],
    // ...
};
```

## 使用方法

`@wdio/lighthouse-service`を使用すると、WebdriverIOを通じてGoogle Lighthouseのアクセシビリティとパフォーマンステストを実行できます。

### パフォーマンステスト

Lighthouseサービスを使用すると、クリックによって引き起こされたすべてのページロードまたはページ遷移からパフォーマンスデータをキャプチャできます。これを有効にするには`browser.enablePerformanceAudits(<options>)`を呼び出します。必要なパフォーマンスデータをすべてキャプチャした後、スロットリング設定を元に戻すために無効にします：

```js
import assert from 'node:assert'

describe('JSON.org page', () => {
    before(async () => {
        await browser.enablePerformanceAudits()
    })

    it('should load within performance budget', async () => {
        /**
         * this page load will take a bit longer as the DevTools service will
         * capture all metrics in the background
         */
        await browser.url('http://json.org')

        let metrics = await browser.getMetrics()
        assert.ok(metrics.speedIndex < 1500) // check that speedIndex is below 1.5ms

        let score = await browser.getPerformanceScore() // get Lighthouse Performance score
        assert.ok(score >= .99) // Lighthouse Performance score is at 99% or higher

        $('=Esperanto').click()

        metrics = await browser.getMetrics()
        assert.ok(metrics.speedIndex < 1500)
        score = await browser.getPerformanceScore()
        assert.ok(score >= .99)
    })

    after(async () => {
        await browser.disablePerformanceAudits()
    })
})
```

以下のコマンドとその結果が利用可能です：

#### `getMetrics`

最も一般的に使用されるパフォーマンスメトリクスを取得します：

```js
console.log(await browser.getMetrics())
/**
 * { timeToFirstByte: 566,
 *   serverResponseTime: 566,
 *   domContentLoaded: 3397,
 *   firstVisualChange: 2610,
 *   firstPaint: 2822,
 *   firstContentfulPaint: 2822,
 *   firstMeaningfulPaint: 2822,
 *   largestContentfulPaint: 2822,
 *   lastVisualChange: 15572,
 *   interactive: 6135,
 *   load: 8429,
 *   speedIndex: 3259,
 *   totalBlockingTime: 31,
 *   maxPotentialFID: 161,
 *   cumulativeLayoutShift: 2822 }
 */
```

#### `getDiagnostics`

ページ読み込みに関する有用な診断情報を取得します。

```js
console.log(await browser.getDiagnostics())
/**
 * { numRequests: 8,
 *   numScripts: 0,
 *   numStylesheets: 0,
 *   numFonts: 0,
 *   numTasks: 237,
 *   numTasksOver10ms: 5,
 *   numTasksOver25ms: 2,
 *   numTasksOver50ms: 2,
 *   numTasksOver100ms: 0,
 *   numTasksOver500ms: 0,
 *   rtt: 147.20600000000002,
 *   throughput: 47729.68474448835,
 *   maxRtt: 176.085,
 *   maxServerLatency: 1016.813,
 *   totalByteWeight: 62929,
 *   totalTaskTime: 254.07899999999978,
 *   mainDocumentTransferSize: 8023 }
 */
```

#### getMainThreadWorkBreakdown

すべてのメインスレッドタスクとその合計時間の内訳を含むリストを返します。

```js
console.log(await browser.getMainThreadWorkBreakdown())
/**
 * [ { group: 'styleLayout', duration: 130.59099999999998 },
 *   { group: 'other', duration: 44.819 },
 *   { group: 'paintCompositeRender', duration: 13.732000000000005 },
 *   { group: 'parseHTML', duration: 3.9080000000000004 },
 *   { group: 'scriptEvaluation', duration: 2.437999999999999 },
 *   { group: 'scriptParseCompile', duration: 0.20800000000000002 } ]
 */
```

#### getPerformanceScore

[Lighthouse Performance Score](https://developers.google.com/web/tools/lighthouse/scoring)を返します。これは以下のメトリクスの加重平均です：`firstContentfulPaint`、`speedIndex`、`largestContentfulPaint`、`cumulativeLayoutShift`、`totalBlockingTime`、`interactive`、`maxPotentialFID`または`cumulativeLayoutShift`。

```js
console.log(await browser.getPerformanceScore())
/**
 * 0.897826278457836
 */
```

#### enablePerformanceAudits

`url`コマンドを呼び出すか、リンクをクリックするか、ページ読み込みを引き起こす任意のアクションによって引き起こされるすべてのページ読み込みに対して自動パフォーマンス監査を有効にします。スロットリングオプションを決定するための設定オブジェクトを渡すことができます。デフォルトのスロットリングプロファイルは、4倍のCPUスロットリングを持つ`Good 3G`ネットワークです。

```js
await browser.enablePerformanceAudits({
    networkThrottling: 'Good 3G',
    cpuThrottling: 4,
    cacheEnabled: true,
    formFactor: 'mobile'
})
```

以下のネットワークスロットリングプロファイルが利用可能です：`offline`、`GPRS`、`Regular 2G`、`Good 2G`、`Regular 3G`、`Good 3G`、`Regular 4G`、`DSL`、`Wifi`、`online`（スロットリングなし）。

### PWAテスト

`checkPWA`コマンドを使用すると、プログレッシブウェブアプリに関する最新のウェブ標準にあなたのウェブアプリが準拠しているかどうかを検証できます。以下のことをチェックします：

- アプリがインストール可能かどうか
- サービスワーカーを提供するかどうか
- スプラッシュスクリーンを持っているか
- Apple Touchアイコンとマスク可能なアイコンを提供するか
- モバイルデバイスで提供できるか

これらのチェックの中で興味のないものがある場合は、実行したいチェックのリストを渡すことができます。すべてのチェックが合格すると、`passed`プロパティは`true`を返します。失敗した場合は、`details`プロパティを使用して、失敗の詳細を含むエラーメッセージを充実させることができます。

```js
// open page first
await browser.url('https://webdriver.io')
// validate PWA
const result = await browser.checkPWA()
expect(result.passed).toBe(true)
```

### `startTracing(categories, samplingFrequency)`コマンド

ブラウザのトレースを開始します。オプションでカスタムトレースカテゴリ（デフォルトは[このリスト](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-lighthouse-service/src/constants.ts#L12-L56)）とサンプリング頻度（デフォルトは`10000`）を渡すことができます。

```js
await browser.startTracing()
```

### `endTracing`コマンド

ブラウザのトレースを停止します。

```js
await browser.endTracing()
```

### `getTraceLogs`コマンド

トレース期間中にキャプチャされたトレースログを返します。このコマンドを使用して、トレースログをファイルシステムに保存し、Chrome DevToolsインターフェイスを通じてトレースを分析できます。

```js
import fs from 'node:fs/promises'

await browser.startTracing()
await browser.url('http://json.org')
await browser.endTracing()

await fs.writeFile('/path/to/tracelog.json', JSON.stringify(browser.getTraceLogs()))
```

### `getPageWeight`コマンド

最後のページ読み込みのページウェイト情報を返します。

```js
await browser.startTracing()
await browser.url('https://webdriver.io')
await browser.endTracing()

console.log(await browser.getPageWeight())
// outputs:
// { pageWeight: 2438485,
//   transferred: 1139136,
//   requestCount: 72,
//   details: {
//       Document: { size: 221705, encoded: 85386, count: 11 },
//       Stylesheet: { size: 52712, encoded: 50130, count: 2 },
//       Image: { size: 495023, encoded: 482433, count: 36 },
//       Script: { size: 1073597, encoded: 322854, count: 15 },
//       Font: { size: 84412, encoded: 84412, count: 5 },
//       Other: { size: 1790, encoded: 1790, count: 2 },
//       XHR: { size: 509246, encoded: 112131, count: 1 } }
// }
```

----

WebdriverIOの詳細については、[ホームページ](https://webdriver.io)を参照してください。