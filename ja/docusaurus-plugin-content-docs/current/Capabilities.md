---
id: capabilities
title: 機能
---

機能（capability）とはリモートインターフェースの定義です。WebdriverIOがどのブラウザまたはモバイル環境でテストを実行したいかを理解するのに役立ちます。機能はローカルでテストを開発する際にはそれほど重要ではありませんが（ほとんどの場合、一つのリモートインターフェースで実行するため）、CI/CDで大規模な統合テストを実行する際に重要になります。

:::info

機能オブジェクトのフォーマットは[WebDriver仕様](https://w3c.github.io/webdriver/#capabilities)によって明確に定義されています。WebdriverIOのテストランナーは、ユーザー定義の機能がその仕様に準拠していない場合、早期に失敗します。

:::

## カスタム機能

固定定義された機能の数は非常に少ないですが、誰でも自動化ドライバーやリモートインターフェースに固有のカスタム機能を提供し、受け入れることができます：

### ブラウザ固有の機能拡張

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities)拡張機能、Chromeでのテストにのみ適用可能
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)拡張機能、Firefoxでのテストにのみ適用可能
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) Chromium EdgeをテストするためにEdgeDriverを使用する際の環境指定用

### クラウドベンダーの機能拡張

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- その他多数...

### 自動化エンジンの機能拡張

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- その他多数...

### ブラウザドライバーオプションを管理するためのWebdriverIO機能

WebdriverIOはブラウザドライバーのインストールと実行を管理します。WebdriverIOはドライバーにパラメータを渡すことができるカスタム機能を使用しています。

#### `wdio:chromedriverOptions`

Chromedriverを起動する際に渡される特定のオプション。

#### `wdio:geckodriverOptions`

Geckodriverを起動する際に渡される特定のオプション。

#### `wdio:edgedriverOptions`

Edgedriverを起動する際に渡される特定のオプション。

#### `wdio:safaridriverOptions`

Safariを起動する際に渡される特定のオプション。

#### `wdio:maxInstances`

特定のブラウザ/機能に対して並列実行する最大ワーカー数。[maxInstances](#configuration#maxInstances)と[maxInstancesPerCapability](configuration/#maxinstancespercapability)よりも優先されます。

タイプ: `number`

#### `wdio:specs`

そのブラウザ/機能のテスト実行用のスペックを定義します。[通常の`specs`設定オプション](configuration#specs)と同じですが、特定のブラウザ/機能に対するものです。`specs`より優先されます。

タイプ: `(String | String[])[]`

#### `wdio:exclude`

そのブラウザ/機能のテスト実行からスペックを除外します。[通常の`exclude`設定オプション](configuration#exclude)と同じですが、特定のブラウザ/機能に対するものです。グローバルの`exclude`設定オプションが適用された後に除外されます。

タイプ: `String[]`

#### `wdio:enforceWebDriverClassic`

デフォルトでは、WebdriverIOはWebDriver Bidiセッションの確立を試みます。これを望まない場合は、このフラグを設定して無効化できます。

タイプ: `boolean`

#### 共通ドライバーオプション

すべてのドライバーは設定のために異なるパラメータを提供していますが、WebdriverIOが理解し、ドライバーやブラウザのセットアップに使用する共通のものがあります：

##### `cacheDir`

キャッシュディレクトリのルートパス。このディレクトリはセッションを開始する際にダウンロードされるすべてのドライバーを保存するために使用されます。

タイプ: `string`<br />
デフォルト: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

カスタムドライバーバイナリへのパス。設定されている場合、WebdriverIOはドライバーをダウンロードしようとせず、このパスで提供されたドライバーを使用します。ドライバーが使用しているブラウザと互換性があることを確認してください。

このパスは`CHROMEDRIVER_PATH`、`GECKODRIVER_PATH`または`EDGEDRIVER_PATH`環境変数を通じて提供することもできます。

タイプ: `string`

:::caution

ドライバーの`binary`が設定されている場合、WebdriverIOはドライバーをダウンロードしようとせず、このパスで提供されたドライバーを使用します。ドライバーが使用しているブラウザと互換性があることを確認してください。

:::

#### ブラウザ固有のドライバーオプション

ドライバーにオプションを伝えるには、以下のカスタム機能を使用できます：

- Chrome または Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Egde: `wdio:edgedriverOptions`
- Safari: `wdio:safaridriverOptions`

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'wdio:chromedriverOptions', value: 'chrome'},
    {label: 'wdio:geckodriverOptions', value: 'firefox'},
    {label: 'wdio:edgedriverOptions', value: 'msedge'},
    {label: 'wdio:safaridriverOptions', value: 'safari'},
  ]
}>
<TabItem value="chrome">

##### adbPort
ADBドライバーが実行されるべきポート。

例: `9515`

タイプ: `number`

##### urlBase
コマンドのベースURLパスプレフィックス（例：`wd/url`）。

例: `/`

タイプ: `string`

##### logPath
サーバーログを標準エラー出力ではなくファイルに書き込み、ログレベルを`INFO`に引き上げます。

タイプ: `string`

##### logLevel
ログレベルを設定します。可能なオプションは`ALL`、`DEBUG`、`INFO`、`WARNING`、`SEVERE`、`OFF`です。

タイプ: `string`

##### verbose
詳細にログを記録します（`--log-level=ALL`と同等）。

タイプ: `boolean`

##### silent
何もログに記録しません（`--log-level=OFF`と同等）。

タイプ: `boolean`

##### appendLog
ログファイルを書き換える代わりに追加します。

タイプ: `boolean`

##### replayable
詳細にログを記録し、長い文字列を切り詰めないため、ログを再生できます（実験的）。

タイプ: `boolean`

##### readableTimestamp
ログに読みやすいタイムスタンプを追加します。

タイプ: `boolean`

##### enableChromeLogs
ブラウザからのログを表示します（他のログオプションを上書きします）。

タイプ: `boolean`

##### bidiMapperPath
カスタムbidiマッパーパス。

タイプ: `string`

##### allowedIps
EdgeDriverへの接続が許可されるリモートIPアドレスのカンマ区切りの許可リスト。

タイプ: `string[]`<br />
デフォルト: `['']`

##### allowedOrigins
EdgeDriverへの接続が許可されるリクエスト元のカンマ区切りの許可リスト。任意のホスト元を許可するために`*`を使用することは危険です！

タイプ: `string[]`<br />
デフォルト: `['*']`

##### spawnOpts
ドライバープロセスに渡されるオプション。

タイプ: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
デフォルト: `undefined`

</TabItem>
<TabItem value="firefox">

Geckodriverのすべてのオプションは公式の[ドライバーパッケージ](https://github.com/webdriverio-community/node-geckodriver#options)をご覧ください。

</TabItem>
<TabItem value="msedge">

Edgedriverのすべてのオプションは公式の[ドライバーパッケージ](https://github.com/webdriverio-community/node-edgedriver#options)をご覧ください。

</TabItem>
<TabItem value="safari">

Safaridriverのすべてのオプションは公式の[ドライバーパッケージ](https://github.com/webdriverio-community/node-safaridriver#options)をご覧ください。

</TabItem>
</Tabs>

## 特定のユースケース向けの特別な機能

これは特定のユースケースを達成するために適用する必要がある機能を示す例のリストです。

### ブラウザをヘッドレスで実行

ヘッドレスブラウザを実行するとは、ウィンドウやUIなしでブラウザインスタンスを実行することを意味します。これは主にディスプレイを使用しないCI/CD環境内で使用されます。ヘッドレスモードでブラウザを実行するには、以下の機能を適用します：

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

```ts
{
    browserName: 'chrome',   // または 'chromium'
    'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
    }
}
```

</TabItem>
<TabItem value="firefox">

```ts
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: ['-headless']
    }
```

</TabItem>
<TabItem value="msedge">

```ts
    browserName: 'msedge',
    'ms:edgeOptions': {
        args: ['--headless']
    }
```

</TabItem>
<TabItem value="safari">

Safariは[ヘッドレスモードをサポートしていない](https://discussions.apple.com/thread/251837694)ようです。

</TabItem>
</Tabs>

### 異なるブラウザチャンネルを自動化

安定版としてまだリリースされていないブラウザバージョン（例：Chrome Canary）をテストしたい場合、機能を設定し、起動したいブラウザを指定することでテストできます：

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

Chromeでテストする場合、WebdriverIOは定義された`browserVersion`に基づいて希望するブラウザバージョンとドライバーを自動的にダウンロードします：

```ts
{
    browserName: 'chrome', // または 'chromium'
    browserVersion: '116' // または '116.0.5845.96'、'stable'、'dev'、'canary'、'beta'、'latest'（'canary'と同じ）
}
```

手動でダウンロードしたブラウザをテストしたい場合は、ブラウザのバイナリパスを提供できます：

```ts
{
    browserName: 'chrome',  // または 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

さらに、手動でダウンロードしたドライバーを使用したい場合は、ドライバーのバイナリパスを提供できます：

```ts
{
    browserName: 'chrome', // または 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Firefoxでテストする場合、WebdriverIOは定義された`browserVersion`に基づいて希望するブラウザバージョンとドライバーを自動的にダウンロードします：

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // または 'latest'
}
```

手動でダウンロードしたバージョンをテストしたい場合は、ブラウザのバイナリパスを提供できます：

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

さらに、手動でダウンロードしたドライバーを使用したい場合は、ドライバーのバイナリパスを提供できます：

```ts
{
    browserName: 'firefox',
    'wdio:geckodriverOptions': {
        binary: '/path/to/geckodriver'
    }
}
```

</TabItem>
<TabItem value="msedge">

Microsoft Edgeでテストする場合、マシンに希望するブラウザバージョンがインストールされていることを確認してください。WebdriverIOに実行するブラウザを指定できます：

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIOは定義された`browserVersion`に基づいて希望するドライバーバージョンを自動的にダウンロードします：

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // または '109.0.1467.0'、'stable'、'dev'、'canary'、'beta'
}
```

さらに、手動でダウンロードしたドライバーを使用したい場合は、ドライバーのバイナリパスを提供できます：

```ts
{
    browserName: 'msedge',
    'wdio:edgedriverOptions': {
        binary: '/path/to/msedgedriver'
    }
}
```

</TabItem>
<TabItem value="safari">

Safariでテストする場合、マシンに[Safari Technology Preview](https://developer.apple.com/safari/technology-preview/)がインストールされていることを確認してください。WebdriverIOにそのバージョンを指定できます：

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## カスタム機能の拡張

例えば、その特定の機能に対するテスト内で使用する任意のデータを保存するなど、独自の機能セットを定義したい場合は、次のように設定できます：

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // カスタム設定
        }
    }]
}
```

機能の命名に関しては、実装固有の名前空間を示す`:` (コロン) 文字を必要とする[W3Cプロトコル](https://w3c.github.io/webdriver/#dfn-extension-capability)に従うことが推奨されます。テスト内では、カスタム機能に次のようにアクセスできます：

```ts
browser.capabilities['custom:caps']
```

型の安全性を確保するために、WebdriverIOの機能インターフェースを次のように拡張できます：

```ts
declare global {
    namespace WebdriverIO {
        interface Capabilities {
            'custom:caps': {
                // ...
            }
        }
    }
}
```