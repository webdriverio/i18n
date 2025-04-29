---
id: wdio-cucumberjs-json-reporter
title: CucumberJS JSON レポーター
custom_edit_url: https://github.com/wswebcreation/wdio-cucumberjs-json-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumberjs-json-reporterはサードパーティのパッケージです。詳細については[GitHub](https://github.com/wswebcreation/wdio-cucumberjs-json-reporter) | [npm](https://nodei.co/npm/wdio-cucumberjs-json-reporter)をご覧ください

WebdriverIO v8以上のためのCucumberJS JSONファイルを作成するWDIOレポーターです。

[![NPM](https://nodei.co/npm/wdio-cucumberjs-json-reporter.png)](https://nodei.co/npm/wdio-cucumberjs-json-reporter/)

## 何をするのか
このレポーターは、テスト対象の各機能ごとに**Cucumber JSONファイル**を生成します。このJSONファイルは、例えば[multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)のような任意のレポートで使用できます。

また、実行中のインスタンスに関するメタデータをフィーチャーファイルに追加し、最後に、JSON出力に添付ファイルを追加する機能も提供します。

## インストール
最も簡単な方法は、`wdio-cucumberjs-json-reporter`を`package.json`のdevDependencyとして保持することです。

```json
{
  "devDependencies": {
    "wdio-cucumberjs-json-reporter": "^5.0.0"
  }
}
```

以下のように簡単に行えます：

```bash
npm install wdio-cucumberjs-json-reporter --save-dev
```

これにより自動的に`package.json`に追加されます。

`WebdriverIO`のインストール方法は[こちら](https://webdriver.io/docs/gettingstarted)でご確認いただけます。

## 設定
wdio.conf.jsファイルで出力ディレクトリと言語を設定します：

```js
export const config = {
    // ...
    reporters: [
        // デフォルトオプションを使用する場合はこのように
        'cucumberjs-json',

        // またはフォルダと言語を設定する場合はこのように
        [ 'cucumberjs-json', {
                jsonFolder: '.tmp/new/',
                language: 'en',
            },
        ],
    ],
  // ...
}
```

> レポーターを追加する両方の方法を使用しないでください。これは単なる例です！

## オプション
### `jsonFolder`
- **タイプ:** `String`
- **必須:** いいえ
- **デフォルト:** `.tmp/json/`

このレポートによって生成されるJSONファイルが保存されるディレクトリで、スクリプトが開始される場所からの相対パスです。

**注意:** コマンドラインから`npm run test`などのnpmスクリプトを使用する場合、`jsonFolder`はスクリプトが実行されるパスからの相対パスになります。プロジェクトのルートから実行すると、`jsonFolder`もプロジェクトのルートに作成されます。

### `language`
- **タイプ:** `String`
- **必須:** いいえ
- **デフォルト:** `en`

Gherkinシナリオが記述されている言語（デフォルトは英語）。言語コードとそのキーワードのリストは[こちら](https://cucumber.io/docs/gherkin/reference/#overview)で確認できます。

### `disableHooks`
- **タイプ:** `boolean`
- **必須:** いいえ
- **デフォルト:** `false`

このプロパティが`true`に設定されている場合、フックの詳細は生成の一部にはなりません。

### `reportFilePerRetry`
- **タイプ:** `boolean`
- **必須:** いいえ
- **デフォルト:** `true`

スペックが再試行されるとき、このプロパティが`false`に設定されている場合、レポートは前回の試行からの既存のレポートファイルに追加されます。

**例**:
`['cucumberjs-json', { jsonFolder: '.tmp/new/', language: 'en', disableHooks:true}]`

## メタデータ

> **注意:**\
> これは現在WebdriverIO V6ではサポートされていません。WebdriverIO V5は引き続きサポートしており、WebdriverIO V7は再びサポートしています。

前述の通り、このレポートは機能が実行されている現在のマシン/デバイスのメタデータを自動的に保存することができます。

これをカスタマイズするには、以下のオブジェクトを`capabilities`に追加します。

```js
// Example wdio.conf.js
export const config = {
    //..
    capabilities: [
        {
            browserName: 'chrome',
            // Add this
            'cjson:metadata': {
                // For a browser
                browser: {
                    name: 'chrome',
                    version: '58',
                },
                // for an app
                app: {
                  name: 'name.of.app.ipa',
                  version: '1.2.3',
                },
                device: 'MacBook Pro 15',
                platform: {
                    name: 'OSX',
                    version: '10.12.6'
                }
            },
        },
    ],
};
```

> メタデータオブジェクトには `cjson` プレフィックスが必要です。そうでなければ機能しません！

### メタデータの値
#### `metadata.app.name`
- **タイプ:** `string`

**例:** アプリの名前。

#### `metadata.app.version`
- **タイプ:** `string`

**例:** アプリのバージョン。

#### `metadata.browser.name`
- **タイプ:** `string`
- **可能な値:** `internet explorer | edge | chrome | firefox | safari`

#### `metadata.browser.version`
- **タイプ:** `string`

**例:** ブラウザのバージョン。これは手動で追加するか、テスト実行中に取得して正確なバージョン番号を得ることができます。

#### `metadata.device`
- **タイプ:** `string`

**例:** デバイスのタイプを表す名前。例えば、仮想マシンで実行している場合は `Virtual Machine` と記載したり、モバイルの名前（例えば `iPhone 7 Plus`）などを記載できます。

#### `metadata.platform.name`
- **タイプ:** `string`
- **可能な値:** `windows | osx | linux | ubuntu | android | ios`

#### `metadata.platform.version`
- **タイプ:** `string`

**例:** プラットフォームのバージョン

> メタデータに `browser` オブジェクトを提供しない場合、このモジュールは自動的に判断します。**常に判断できる最新の値で上書きされます。**

> `device` や `platform` オブジェクトを提供しない場合、デフォルトで `not known` になります。

> `browser.name` または `browser.version` を提供しない場合、モジュールは自動的に判断しようとします。

## 添付ファイル
以下のフック/ステップでJSONファイルにデータを添付するオプションがあります：

- Before(All)
- After(All)
- Given
- When
- Then
- And

ステップファイルに以下のコードを記述するだけです。

ES Modules (ESM)の場合
```js
import cucumberJson from 'wdio-cucumberjs-json-reporter';

// 文字列を添付（タイプが提供されない場合、自動的に `text/plain` がデフォルトになります）
cucumberJson.attach('just a string');
cucumberJson.attach('just a second string', 'text/plain');

// JSONを添付
cucumberJson.attach({"json-string": true}, 'application/json');

// beforeフックでスクリーンショットを添付
cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
```
CommonJS (CJS)の場合
```js
const { attach } = require("wdio-cucumberjs-json-reporter");

// 文字列を添付（タイプが提供されない場合、自動的に `text/plain` がデフォルトになります）
attach('just a string');
attach('just a second string', 'text/plain');

// JSONを添付
attach({"json-string": true}, 'application/json');

// beforeフックでスクリーンショットを添付
attach(await browser.takeScreenshot(), 'image/png');
```

## multiple-cucumber-html-reporterと併用する
WebdriverIO V4向けの以前のモジュール[wdio-multiple-cucumber-html-reporter](https://github.com/webdriverio-community/wdio-multiple-cucumber-html-reporter)は、[multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)モジュールと組み込みの接続がありました。**このレポーターでは、そのような接続はありません**。これは、WebdriverIO V5の新しいセットアップがインスタンスに基づいており、`onPrepare`と`onComplete`フックを使用できないためです。

それでも[multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)モジュールを使用したい場合は、設定ファイルに以下を追加できます。

- モジュールをインストールします

    ```bash
    npm install multiple-cucumber-html-reporter --save-dev
    ```

- 設定ファイルに以下を追加します

    ```js
    import fs from 'node:fs/promises'
    // モジュールをインポート
    import { generate } from 'multiple-cucumber-html-reporter'

    // Example wdio.conf.js
    export const config = {
      //..

      // =====
      // Hooks
      // =====
      /**
       * Gets executed once before all workers get launched.
       */
      onPrepare: () => {
        // jsonとレポートファイルを保持する`.tmp/`フォルダを削除
        return fs.rm('.tmp/', { recursive: true });
      },
      /**
       * Gets executed after all workers got shut down and the process is about to exit.
       */
      onComplete: () => {
        // すべてのテストが完了したらレポートを生成
        generate({
          // 必須
          // この部分はJSONファイルを保存する場所と同じパスである必要があります
          // デフォルト = '.tmp/json/'
          jsonDir: '.tmp/json/',
          reportPath: '.tmp/report/',
          // その他のオプションについては https://github.com/wswebcreation/multiple-cucumber-html-reporter#options を参照
        });
      }
    }
    ```

## 古いWebdriverIOバージョン

> **このモジュールはWebdriverIO V8+でのみ動作します！**\
> **V6については[こちら](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v6)のドキュメントを確認し、バージョン2.0.4を使用してください**\
> **V5については[こちら](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v5)のドキュメントを確認し、バージョン1.3.0を使用してください**

> **このモジュールは[wdio-multiple-cucumber-html-reporter](https://github.com/wswebcreation/wdio-multiple-cucumber-html-reporter)の代替品ではありません。そのモジュールはWebdriverIO V4のみをサポートし、レポートも作成します。このモジュールはJSONのみを作成し、レポートは作成しません！**