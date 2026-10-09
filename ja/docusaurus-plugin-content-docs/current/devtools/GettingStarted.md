---
id: getting-started
title: はじめに
description: "WebdriverIO DevTools をインストールし、ライブモードまたはトレースモードで最初のテストを実行して、DOM、スクリーンショット、ネットワーク、コンソール出力を再生します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

WebdriverIO DevTools は、エンドツーエンドのブラウザテストに、自動化の実行・デバッグ・検査のための開発者ツール UI を提供します。DOM リプレイ、コマンドごとのスクリーンショット、ネットワークとコンソールのキャプチャ、セッションのスクリーンキャストに対応しています。DevTools には 2 つのモードがあります。**ライブモード**では、テストの実行中にインタラクティブな[ダッシュボード](/docs/devtools/dashboard)がブラウザウィンドウで開き、テストをリアルタイムで観察したり再実行したりできます。**トレースモード**では UI を使用せず、ポータブルでオフラインの[トレースアーティファクト](/docs/devtools/wdio/trace-mode)（`trace.zip`）を書き出します。このファイルは後から `show-trace` プレーヤーで開くことができ、CI に最適です。このページでは、まずライブモードをすぐに使い始める方法を紹介します。トレースモードはオプションを 1 つ追加するだけで利用できます。

## インストールと初回実行

使用するアダプターを選んでインストールし、以下の最小限の設定を追加してください。いつも通りテストを実行すると、DevTools ダッシュボードが新しいブラウザウィンドウで自動的に開きます。

<Tabs
defaultValue="wdio"
values={[
{label: 'WebdriverIO', value: 'wdio'},
{label: 'Selenium', value: 'selenium'},
{label: 'Nightwatch', value: 'nightwatch'},
]}
>
<TabItem value="wdio">

サービスをインストールします：

```sh
npm install @wdio/devtools-service --save-dev
```

テストランナーの設定に追加します：

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

いつも通り WebdriverIO のテストを実行すると、DevTools UI が自動的に開き、すぐにテストの可視化が始まります。

</TabItem>
<TabItem value="selenium">

Mocha、Jest、Cucumber、または通常の `node` スクリプトで動作し、プラグインがランナーを自動検出します。インストールします：

```bash
npm install @wdio/selenium-devtools
```

テストファイルの先頭に import を 1 つと `configure` の呼び出しを 1 つ追加します（Mocha の例）：

```js
// tests/example.test.js
import { Builder, By, until } from 'selenium-webdriver'
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('smoke test', function () {
  let driver

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  it('loads example.com', async function () {
    await driver.get('https://example.com')
    await driver.wait(until.elementLocated(By.css('h1')), 10000)
  })
})
```

実行すると、DevTools UI が新しい Chrome ウィンドウで開きます：

```bash
mocha --timeout 60000 tests/example.test.js
```

Jest、Cucumber、通常の Node でのセットアップについては [Selenium のページ](/docs/devtools/selenium)を参照してください。

</TabItem>
<TabItem value="nightwatch">

アダプターをインストールします：

```bash
npm install @wdio/nightwatch-devtools
```

`globals` を使って Nightwatch の設定に組み込みます。テストファイルを変更する必要はありません：

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // ネットワークリクエストのキャプチャに必要
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

いつも通りテストを実行すると、DevTools UI が自動的に開きます：

```bash
nightwatch
```

Cucumber/BDD のセットアップについては [Nightwatch のページ](/docs/devtools/nightwatch)を参照してください。

</TabItem>
</Tabs>

## 次のステップ

- **[トレースモード](/docs/devtools/wdio/trace-mode)** — `mode: 'trace'` を設定すると UI を使用せず、CI 向けのポータブルでオフラインのトレースアーティファクトを生成します。
- **[設定リファレンス](/docs/devtools/reference)** — 3 つのアダプターすべてのオプションを網羅しています。
- **フレームワーク** — アダプターごとの詳細ガイド：[WebdriverIO](/docs/devtools/wdio)、[Selenium](/docs/devtools/selenium)、[Nightwatch](/docs/devtools/nightwatch)。