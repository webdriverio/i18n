---
id: wdio-rerun-service
title: 再実行サービス
custom_edit_url: https://github.com/jwplayer/wdio-rerun-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-rerun-serviceはサードパーティのパッケージです。詳細については[GitHub](https://github.com/jwplayer/wdio-rerun-service) | [npm](https://www.npmjs.com/package/wdio-rerun-service)をご覧ください

[![wdio-rerun-service CI](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/dm/wdio-rerun-service)
![npm bundle size](https://img.shields.io/bundlephobia/min/wdio-rerun-service)
![GitHub issues](https://img.shields.io/github/issues/webdriverio-community/wdio-rerun-service)

このサービスは[WebdriverIO](https://webdriver.io)テストフレームワーク内で実行される失敗したMochaやJasmineのテスト、およびCucumberシナリオを追跡します。失敗または不安定なテストやシナリオを再実行することができます。

_注意_: WebdriverIOバージョン`5.x`と`6.x`を実行しているCucumberフレームワークユーザーは、バージョン`1.6.x`を使用してください。最新のメジャーバージョン`7.x`を使用している場合は、このサービスの最新の`1.7.x`バージョンを使用してください。

## 再実行 vs. リトライ

WebdriverIOに組み込まれているCucumberとMocha/Jasmineの`retry`ロジックは、CucumberとMocha/Jasmineの不安定なステップを処理するのに役立ちます。各フレームワークでのリトライには注意点があります：
* Cucumber: テストの途中でいくつかのステップが再試行できない可能性を考慮していません。ステップを2回実行すると、残りのシナリオが壊れたり、テストコンテキストでは不可能かもしれません。
* Mocha/Jasmine: `retry`ロジックは個々のテストに適用できますが、これはリアルタイムで行われ、一時的な問題やネットワーク接続の問題を考慮していない可能性があります。

`re-run`の主な特徴：
* 単一のステップだけでなく、Cucumberシナリオ全体を再実行します
* メインのテスト実行完了後に仕様ファイル全体を再実行できるようにします
* ローカルでコピーして実行することができます（`retry`はできません）
* `retry`メソッドと併用することも可能です
* 不安定または問題のあるテストに`retry`ロジックを適用するためのコード変更は必要ありません

利用可能なオプションを評価する時間を取ることをお勧めします。最も実用的で行動可能なテスト結果を提供するには、ハイブリッドソリューションが最適かもしれません。

## インストール

最も簡単な方法は、`package.json`の`devDependencies`に`wdio-rerun-service`を追加することです。

```json
{
    "devDependencies": {
        "wdio-rerun-service": "^1.6.2"
    }
}
```

`npm`を使ってインストールすることができます：

```bash
npm install wdio-rerun-service
```

パッケージのインストールが完了したら、`wdio.conf.js`の`services`配列に追加します：

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [RerunService, {
        // ...
    }]
};
```

`WebdriverIO`のインストール方法については[こちら](https://webdriver.io/docs/gettingstarted.html)をご覧ください。

## 設定

以下のオプションを wdio.conf.js ファイルに追加することができます。サービスのオプションを定義するには、以下のようにサービスを`services`リストに追加する必要があります：

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            // Re-run service options here...
        }]
    ],
    // ...
};
```

### rerunDataDir
実行中にすべての再実行JSONデータが保存されるディレクトリ。

タイプ: `String`

デフォルト: `./results/rerun`

例:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunDataDir: './custom-rerun-directory'
        }]
    ],
    // ...
}
```

### rerunScriptPath
再実行Bashスクリプトを書き込むパス。

タイプ: `String`

デフォルト: `./rerun.sh`

例:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunScriptPath: './custom-path-for-rerun.sh'
        }]
    ],
    // ...
}
```

### ignoredTags
(Cucumberのみ) 除外するCucumberタグのセット。シナリオにタグが含まれている場合、再実行サービスは分析をスキップします。

タイプ: `Array`

デフォルト: `[]`

例:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            ignoredTags: ['@known_bug']
        }]
    ],
    // ...
}
```

### commandPrefix
生成される再実行コマンドに追加されるプレフィックス。

タイプ: `String`

デフォルト: `''`

例:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            commandPrefix: "VARIABLE=true"
        }]
    ],
    // ...
}
```
----