---
id: capabilities
title: ケーパビリティ
---

ケーパビリティとは、リモートインターフェースの定義です。これは、WebdriverIOがどのブラウザまたはモバイル環境でテストを実行したいかを理解するのに役立ちます。ケーパビリティは、ローカルでテストを開発する場合、ほとんどの場合1つのリモートインターフェース上で実行するため、それほど重要ではありませんが、CI/CDで大規模な統合テストを実行する際には重要になります。

:::info

ケーパビリティオブジェクトのフォーマットは[WebDriver仕様](https://w3c.github.io/webdriver/#capabilities)によって明確に定義されています。WebdriverIOのテストランナーは、ユーザー定義のケーパビリティがその仕様に準拠していない場合、早期に失敗します。

:::

## カスタムケーパビリティ

固定的に定義されたケーパビリティの数は非常に少ないですが、誰でも自動化ドライバーやリモートインターフェースに特化したカスタムケーパビリティを提供および受け入れることができます：

### ブラウザ固有のケーパビリティ拡張

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities)の拡張機能、Chromeでのテストにのみ適用可能
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)の拡張機能、Firefoxでのテストにのみ適用可能
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) Chromium EdgeをテストするためにEdgeDriverを使用する環境を指定するため

### クラウドベンダーのケーパビリティ拡張

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- その他多数...

### 自動化エンジンのケーパビリティ拡張

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- その他多数...

### ブラウザドライバーオプションを管理するためのWebdriverIOケーパビリティ

WebdriverIOは、ブラウザドライバーのインストールと実行を管理します。WebdriverIOは、ドライバーにパラメータを渡すことができるカスタムケーパビリティを使用します。

#### `wdio:chromedriverOptions`

Chromedriverを起動する際に渡される特定のオプション。

#### `wdio:geckodriverOptions`

Geckodriverを起動する際に渡される特定のオプション。

#### `wdio:edgedriverOptions`

Edgedriverを起動する際に渡される特定のオプション。

#### `wdio:safaridriverOptions`

Safariを起動する際に渡される特定のオプション。

#### `wdio:maxInstances`

特定のブラウザ/ケーパビリティに対して並行して実行されるワーカーの最大数。[maxInstances](#configuration#maxInstances)と[maxInstancesPerCapability](configuration/#maxinstancespercapability)よりも優先されます。

型: `number`

#### `wdio:specs`

そのブラウザ/ケーパビリティのテスト実行用のスペックを定義します。[通常の`specs`設定オプション](configuration#specs)と同じですが、特定のブラウザ/ケーパビリティに固有です。`specs`よりも優先されます。

型: `(String | String[])[]`

#### `wdio:exclude`

そのブラウザ/ケーパビリティのテスト実行からスペックを除外します。[通常の`exclude`設定オプション](configuration#exclude)と同じですが、特定のブラウザ/ケーパビリティに固有です。`exclude`よりも優先されます。

型: `String[]`

#### `wdio:enforceWebDriverClassic`

デフォルトでは、WebdriverIOはWebDriver Bidiセッションの確立を試みます。これを希望しない場合は、このフラグを設定して無効にすることができます。

型: `boolean`

#### 共通のドライバーオプション

すべてのドライバーは異なる設定パラメータを提供しますが、WebdriverIOが理解し、ドライバーまたはブラウザの設定に使用するいくつかの共通のものがあります：

##### `cacheDir`

キャッシュディレクトリのルートへのパス。このディレクトリは、セッションを開始しようとするときにダウンロードされるすべてのドライバーを保存するために使用されます。

型: `string`<br />
デフォルト: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

カスタムドライバーバイナリへのパス。設定されている場合、WebdriverIOはドライバーをダウンロードせず、このパスで提供されるものを使用します。ドライバーが使用しているブラウザと互換性があることを確認してください。

このパスは`CHROMEDRIVER_PATH`、`GECKODRIVER_PATH`または`EDGEDRIVER_PATH`環境変数を通じて提供できます。

型: `string`

:::caution

ドライバーの`binary`が設定されている場合、WebdriverIOはドライバーをダウンロードせず、このパスで提供されるものを使用します。ドライバーが使用しているブラウザと互換性があることを確認してください。

:::

#### ブラウザ固有のドライバーオプション

ドライバーにオプションを伝播するために、以下のカスタムケーパビリティを使用できます：

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

型: `number`

##### urlBase
コマンド用のベースURLパスプレフィックス、例：`wd/url`。

例: `/`

型: `string`

##### logPath
標準エラー出力の代わりにファイルにサーバーログを書き込み、ログレベルを`INFO`に上げます。

型: `string`

##### logLevel
ログレベルを設定します。可能なオプションは`ALL`、`DEBUG`、`INFO`、`WARNING`、`SEVERE`、`OFF`です。

型: `string`

##### verbose
詳細にログを記録します（`--log-level=ALL`と同等）。

型: `boolean`

##### silent
何もログに記録しません（`--log-level=OFF`と同等）。

型: `boolean`

##### appendLog
ログファイルを上書きする代わりに追加します。

型: `boolean`

##### replayable
詳細にログを記録し、長い文字列を切り詰めないため、ログを再生できます（実験的）。

型: `boolean`

##### readableTimestamp
読みやすいタイムスタンプをログに追加します。

型: `boolean`

##### enableChromeLogs
ブラウザからのログを表示します（他のログオプションを上書きします）。

型: `boolean`

##### bidiMapperPath
カスタムbidiマッパーパス。

型: `string`

##### allowedIps
EdgeDriverへの接続を許可されるリモートIPアドレスのカンマ区切りの許可リスト。

型: `string[]`<br />
デフォルト: `['']`

##### allowedOrigins
EdgeDriverへの接続を許可されるリクエスト元のカンマ区切りの許可リスト。任意のホスト元を許可するために`*`を使用することは危険です！

型: `string[]`<br />
デフォルト: `['*']`

##### spawnOpts
ドライバープロセスに渡されるオプション。

型: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
デフォルト: `undefined`

</TabItem>
<TabItem value="firefox">

すべてのGeckodriverオプションは公式の[ドライバーパッケージ](https://github.com/webdriverio-community/node-geckodriver#options)を参照してください。

</TabItem>
<TabItem value="msedge">

すべてのEdgedriverオプションは公式の[ドライバーパッケージ](https://github.com/webdriverio-community/node-edgedriver#options)を参照してください。

</TabItem>
<TabItem value="safari">

すべてのSafaridriverオプションは公式の[ドライバーパッケージ](https://github.com/webdriverio-community/node-safaridriver#options)を参照してください。

</TabItem>
</Tabs>

## 特定のユースケース向けの特別なケーパビリティ

これは、特定のユースケースを実現するために適用する必要があるケーパビリティの例のリストです。

### ブラウザをヘッドレスで実行する

ヘッドレスブラウザを実行するということは、ウィンドウやUIなしでブラウザインスタンスを実行することを意味します。これは、ディスプレイが使用されないCI/CD環境内で主に使用されます。ブラウザをヘッドレスモードで実行するには、次のケーパビリティを適用します：

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
    browserName: 'chrome',   // or 'chromium'
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

Safariはヘッドレスモードでの実行を[サポートしていない](https://discussions.apple.com/thread/251837694)ようです。

</TabItem>
</Tabs>

### 異なるブラウザチャンネルを自動化する

まだ安定版としてリリースされていないブラウザバージョン、例えばChrome Canaryをテストしたい場合、ケーパビリティを設定し、起動したいブラウザを指定することでそれが可能です：

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

Chromeでテストする場合、WebdriverIOは定義された`browserVersion`に基づいて、必要なブラウザバージョンとドライバーを自動的にダウンロードします：

```ts
{
    browserName: 'chrome', // or 'chromium'
    browserVersion: '116' // or '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' or 'latest' (same as 'canary')
}
```

手動でダウンロードしたブラウザをテストしたい場合は、ブラウザへのバイナリパスを次のように提供できます：

```ts
{
    browserName: 'chrome',  // or 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

さらに、手動でダウンロードしたドライバーを使用したい場合は、ドライバーへのバイナリパスを次のように提供できます：

```ts
{
    browserName: 'chrome', // or 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Firefoxでテストする場合、WebdriverIOは定義された`browserVersion`に基づいて、必要なブラウザバージョンとドライバーを自動的にダウンロードします：

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // or 'latest'
}
```

手動でダウンロードしたバージョンをテストしたい場合は、ブラウザへのバイナリパスを次のように提供できます：

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

さらに、手動でダウンロードしたドライバーを使用したい場合は、ドライバーへのバイナリパスを次のように提供できます：

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

Microsoft Edgeでテストする場合、マシンに必要なブラウザバージョンがインストールされていることを確認してください。実行するブラウザにWebdriverIOを指定するには：

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIOは、定義された`browserVersion`に基づいて、必要なドライバーバージョンを自動的にダウンロードします：

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // or '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

さらに、手動でダウンロードしたドライバーを使用したい場合は、ドライバーへのバイナリパスを次のように提供できます：

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

Safariでテストする場合、マシンに[Safari Technology Preview](https://developer.apple.com/safari/technology-preview/)がインストールされていることを確認してください。WebdriverIOをそのバージョンに指定するには：

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## カスタムケーパビリティの拡張

例えば、特定のケーパビリティのテスト内で使用する任意のデータを保存するなど、独自のケーパビリティセットを定義したい場合は、次のように設定できます：

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

ケーパビリティの命名に関しては、実装固有の名前空間を示す`:` (コロン) 文字を必要とする[W3Cプロトコル](https://w3c.github.io/webdriver/#dfn-extension-capability)に従うことをお勧めします。テスト内でカスタムケーパビリティにアクセスするには、例えば：

```ts
browser.capabilities['custom:caps']
```

型の安全性を確保するために、WebdriverIOのケーパビリティインターフェースを次のように拡張できます：

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