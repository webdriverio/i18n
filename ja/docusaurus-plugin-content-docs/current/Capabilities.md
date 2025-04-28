---
id: capabilities
title: ケーパビリティ
---

ケーパビリティは、リモートインターフェースの定義です。WebdriverIOがどのブラウザやモバイル環境でテストを実行したいかを理解するのに役立ちます。ケーパビリティは、ローカルでテストを開発する場合はほとんどの時間を1つのリモートインターフェースで実行するため、それほど重要ではありませんが、CI/CDで大規模な統合テストセットを実行する場合はより重要になります。

:::info

ケーパビリティオブジェクトの形式は[WebDriver仕様](https://w3c.github.io/webdriver/#capabilities)によって明確に定義されています。WebdriverIOテストランナーは、ユーザー定義のケーパビリティがその仕様に準拠していない場合、早期に失敗します。

:::

## カスタムケーパビリティ

固定された定義済みケーパビリティの数は非常に少ないですが、誰でも自動化ドライバーやリモートインターフェースに特有のカスタムケーパビリティを提供および受け入れることができます：

### ブラウザ固有のケーパビリティ拡張

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities)拡張、Chromeでのテストにのみ適用可能
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)拡張、Firefoxでのテストにのみ適用可能
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) Chromium EdgeをテストするためにEdgeDriverを使用する際の環境を指定するため

### クラウドベンダーケーパビリティ拡張

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- など多数...

### 自動化エンジンケーパビリティ拡張

- `appium:xxx`: [Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- など多数...

### WebdriverIOのブラウザドライバーオプションを管理するためのケーパビリティ

WebdriverIOはブラウザドライバーのインストールと実行を管理します。WebdriverIOはドライバーにパラメータを渡すことができるカスタムケーパビリティを使用します。

#### `wdio:chromedriverOptions`

Chromedriverを起動する際に渡される特定のオプション。

#### `wdio:geckodriverOptions`

Geckodriverを起動する際に渡される特定のオプション。

#### `wdio:edgedriverOptions`

Edgedriverを起動する際に渡される特定のオプション。

#### `wdio:safaridriverOptions`

Safariを起動する際に渡される特定のオプション。

#### `wdio:maxInstances`

特定のブラウザ/ケーパビリティに対して並行実行できるワーカーの最大数。[maxInstances](#configuration#maxInstances)と[maxInstancesPerCapability](configuration/#maxinstancespercapability)よりも優先されます。

タイプ: `number`

#### `wdio:specs`

そのブラウザ/ケーパビリティのテスト実行用のスペックを定義します。[通常の`specs`設定オプション](configuration#specs)と同じですが、特定のブラウザ/ケーパビリティに固有のものです。`specs`よりも優先されます。

タイプ: `(String | String[])[]`

#### `wdio:exclude`

そのブラウザ/ケーパビリティのテスト実行からスペックを除外します。[通常の`exclude`設定オプション](configuration#exclude)と同じですが、特定のブラウザ/ケーパビリティに固有のものです。`exclude`よりも優先されます。

タイプ: `String[]`

#### `wdio:enforceWebDriverClassic`

デフォルトでは、WebdriverIOはWebDriver Bidiセッションの確立を試みます。この動作を望まない場合は、このフラグを設定して無効にすることができます。

タイプ: `boolean`

#### 共通ドライバーオプション

すべてのドライバーは異なる設定パラメータを提供していますが、WebdriverIOが理解し、ドライバーやブラウザのセットアップに使用するいくつかの共通のものがあります：

##### `cacheDir`

キャッシュディレクトリのルートへのパス。このディレクトリは、セッションを開始しようとするときにダウンロードされるすべてのドライバーを保存するために使用されます。

タイプ: `string`<br />
デフォルト: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

カスタムドライバーバイナリへのパス。設定されている場合、WebdriverIOはドライバーをダウンロードしようとせず、このパスで提供されているものを使用します。ドライバーが使用するブラウザと互換性があることを確認してください。

このパスは`CHROMEDRIVER_PATH`、`GECKODRIVER_PATH`または`EDGEDRIVER_PATH`環境変数を通じて提供できます。

タイプ: `string`

:::caution

ドライバーの`binary`が設定されている場合、WebdriverIOはドライバーをダウンロードしようとせず、このパスで提供されているものを使用します。ドライバーが使用するブラウザと互換性があることを確認してください。

:::

#### ブラウザ固有のドライバーオプション

ドライバーにオプションを伝播するには、次のカスタムケーパビリティを使用できます：

- Chrome または Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Edge: `wdio:edgedriverOptions`
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
ADBドライバーが実行されるポート。

例: `9515`

タイプ: `number`

##### urlBase
コマンドのベースURLパスプレフィックス、例：`wd/url`

例: `/`

タイプ: `string`

##### logPath
stderrの代わりにファイルにサーバーログを書き込み、ログレベルを`INFO`に引き上げます

タイプ: `string`

##### logLevel
ログレベルを設定します。可能なオプションは`ALL`、`DEBUG`、`INFO`、`WARNING`、`SEVERE`、`OFF`です。

タイプ: `string`

##### verbose
詳細にログを出力します（`--log-level=ALL`と同等）

タイプ: `boolean`

##### silent
何もログに出力しません（`--log-level=OFF`と同等）

タイプ: `boolean`

##### appendLog
ログファイルを書き換えるのではなく、追加します。

タイプ: `boolean`

##### replayable
詳細にログを出力し、長い文字列を切り詰めないため、ログを再生できます（実験的）。

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
EdgeDriverへの接続が許可されているリモートIPアドレスのカンマ区切りの許可リスト。

タイプ: `string[]`<br />
デフォルト: `['']`

##### allowedOrigins
EdgeDriverへの接続が許可されているリクエスト元のカンマ区切りの許可リスト。任意のホスト元を許可するために`*`を使用することは危険です！

タイプ: `string[]`<br />
デフォルト: `['*']`

##### spawnOpts
ドライバープロセスに渡されるオプション。

タイプ: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
デフォルト: `undefined`

</TabItem>
<TabItem value="firefox">

すべてのGeckodriverオプションは公式[ドライバーパッケージ](https://github.com/webdriverio-community/node-geckodriver#options)を参照してください。

</TabItem>
<TabItem value="msedge">

すべてのEdgedriverオプションは公式[ドライバーパッケージ](https://github.com/webdriverio-community/node-edgedriver#options)を参照してください。

</TabItem>
<TabItem value="safari">

すべてのSafaridriverオプションは公式[ドライバーパッケージ](https://github.com/webdriverio-community/node-safaridriver#options)を参照してください。

</TabItem>
</Tabs>

## 特定のユースケース向けの特別なケーパビリティ

以下は、特定のユースケースを達成するために適用する必要があるケーパビリティの例のリストです。

### ブラウザをヘッドレスで実行する

ヘッドレスブラウザを実行するとは、ウィンドウやUIなしでブラウザインスタンスを実行することを意味します。これは主にディスプレイが使用されないCI/CD環境内で使用されます。ブラウザをヘッドレスモードで実行するには、次のケーパビリティを適用します：

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

Safariは[ヘッドレスモードでの実行をサポートしていない](https://discussions.apple.com/thread/251837694)ようです。

</TabItem>
</Tabs>

### 異なるブラウザチャンネルを自動化する

安定版としてまだリリースされていないブラウザバージョン（例：Chrome Canary）をテストしたい場合、ケーパビリティを設定し、開始したいブラウザを指定することができます：

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
    browserName: 'chrome', // または 'chromium'
    browserVersion: '116' // または '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' または 'latest' ('canary'と同じ)
}
```

手動でダウンロードしたブラウザをテストしたい場合は、ブラウザへのバイナリパスを提供できます：

```ts
{
    browserName: 'chrome',  // または 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

さらに、手動でダウンロードしたドライバーを使用したい場合は、ドライバーへのバイナリパスを提供できます：

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

Firefoxでテストする場合、WebdriverIOは定義された`browserVersion`に基づいて、必要なブラウザバージョンとドライバーを自動的にダウンロードします：

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // または 'latest'
}
```

手動でダウンロードしたバージョンをテストしたい場合は、ブラウザへのバイナリパスを提供できます：

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

さらに、手動でダウンロードしたドライバーを使用したい場合は、ドライバーへのバイナリパスを提供できます：

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

Microsoft Edgeでテストする場合は、必要なブラウザバージョンがマシンにインストールされていることを確認してください。WebdriverIOが実行するブラウザを指定できます：

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIOは定義された`browserVersion`に基づいて、必要なドライバーバージョンを自動的にダウンロードします：

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // または '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

さらに、手動でダウンロードしたドライバーを使用したい場合は、ドライバーへのバイナリパスを提供できます：

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

Safariでテストする場合は、[Safari Technology Preview](https://developer.apple.com/safari/technology-preview/)がマシンにインストールされていることを確認してください。WebdriverIOにそのバージョンを指定できます：

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## カスタムケーパビリティを拡張する

例えば、特定のケーパビリティのテスト内で使用する任意のデータを保存するために、独自のケーパビリティセットを定義したい場合は、以下のように設定できます：

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

ケーパビリティの命名に関しては、実装固有の名前空間を示す`:` (コロン) 文字を必要とする[W3Cプロトコル](https://w3c.github.io/webdriver/#dfn-extension-capability)に従うことをお勧めします。テスト内では、カスタムケーパビリティに次のようにアクセスできます：

```ts
browser.capabilities['custom:caps']
```

型安全性を確保するために、WebdriverIOのケーパビリティインターフェースを次のように拡張できます：

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