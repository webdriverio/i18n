---
id: capabilities
title: ケイパビリティ
---

ケイパビリティはリモートインターフェースの定義です。WebdriverIOがどのブラウザまたはモバイル環境でテストを実行したいかを理解するのに役立ちます。ケイパビリティはローカルでテストを開発する場合はそれほど重要ではありませんが、CI/CDで大規模な統合テストを実行する際には重要になります。

:::info

ケイパビリティオブジェクトの形式は[WebDriver仕様](https://w3c.github.io/webdriver/#capabilities)によって明確に定義されています。WebdriverIOのテストランナーは、ユーザー定義のケイパビリティがその仕様に準拠していない場合、早期に失敗します。

:::

## カスタムケイパビリティ

固定の定義されたケイパビリティの数は非常に少ないですが、誰でも自動化ドライバーやリモートインターフェースに特化したカスタムケイパビリティを提供および受け入れることができます：

### ブラウザ固有のケイパビリティ拡張

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities)拡張、Chromeでのテストにのみ適用可能
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)拡張、Firefoxでのテストにのみ適用可能
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) Chromium EdgeをテストするためにEdgeDriverを使用する環境を指定する

### クラウドベンダーのケイパビリティ拡張

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- その他多数...

### 自動化エンジンのケイパビリティ拡張

- `appium:xxx`: [Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- その他多数...

### ブラウザドライバーオプションを管理するためのWebdriverIOケイパビリティ

WebdriverIOはブラウザドライバーのインストールと実行を管理します。WebdriverIOはドライバーにパラメータを渡すことができるカスタムケイパビリティを使用します。

#### `wdio:chromedriverOptions`

Chromedriverを起動するときに渡される特定のオプション。

#### `wdio:geckodriverOptions`

Geckodriverを起動するときに渡される特定のオプション。

#### `wdio:edgedriverOptions`

Edgedriverを起動するときに渡される特定のオプション。

#### `wdio:safaridriverOptions`

Safariを起動するときに渡される特定のオプション。

#### `wdio:maxInstances`

特定のブラウザ/ケイパビリティの並列実行ワーカーの最大数。[maxInstances](#configuration#maxInstances)と[maxInstancesPerCapability](configuration/#maxinstancespercapability)よりも優先されます。

型: `number`

#### `wdio:specs`

そのブラウザ/ケイパビリティに対するテスト実行のスペックを定義します。[通常の`specs`設定オプション](configuration#specs)と同様ですが、特定のブラウザ/ケイパビリティに適用されます。`specs`よりも優先されます。

型: `(String | String[])[]`

#### `wdio:exclude`

そのブラウザ/ケイパビリティに対するテスト実行から除外するスペック。[通常の`exclude`設定オプション](configuration#exclude)と同様ですが、特定のブラウザ/ケイパビリティに適用されます。`exclude`よりも優先されます。

型: `String[]`

#### `wdio:enforceWebDriverClassic`

デフォルトでは、WebdriverIOはWebDriver Bidiセッションの確立を試みます。これを希望しない場合は、このフラグを設定してこの動作を無効にできます。

型: `boolean`

#### 共通ドライバーオプション

すべてのドライバーが異なるパラメータを設定に提供しますが、WebdriverIOが理解しドライバーやブラウザのセットアップに使用するいくつかの共通オプションがあります：

##### `cacheDir`

キャッシュディレクトリのルートへのパス。このディレクトリは、セッションを開始しようとするときにダウンロードされるすべてのドライバーを保存するために使用されます。

型: `string`<br />
デフォルト: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

カスタムドライバーバイナリへのパス。設定されている場合、WebdriverIOはドライバーをダウンロードせず、このパスで提供されたものを使用します。ドライバーが使用しているブラウザと互換性があることを確認してください。

このパスは`CHROMEDRIVER_PATH`、`GECKODRIVER_PATH`または`EDGEDRIVER_PATH`環境変数で提供できます。

型: `string`

:::caution

ドライバーの`binary`が設定されている場合、WebdriverIOはドライバーをダウンロードせず、提供されたパスのものを使用します。ドライバーが使用しているブラウザと互換性があることを確認してください。

:::

#### ブラウザ固有のドライバーオプション

ドライバーにオプションを渡すために、次のカスタムケイパビリティを使用できます：

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
ADBドライバーが実行されるべきポート。

例: `9515`

型: `number`

##### urlBase
コマンドのベースURLパスプレフィックス、例えば `wd/url`。

例: `/`

型: `string`

##### logPath
stderrの代わりにファイルにサーバーログを書き込み、ログレベルを`INFO`に増加。

型: `string`

##### logLevel
ログレベルを設定します。可能なオプションは `ALL`、`DEBUG`、`INFO`、`WARNING`、`SEVERE`、`OFF`。

型: `string`

##### verbose
詳細にログ記録（`--log-level=ALL`と同等）

型: `boolean`

##### silent
ログなし（`--log-level=OFF`と同等）

型: `boolean`

##### appendLog
ログファイルを書き換えるのではなく追加します。

型: `boolean`

##### replayable
詳細にログ記録し、長い文字列を切り詰めないため、ログを再生できます（実験的）。

型: `boolean`

##### readableTimestamp
ログに読みやすいタイムスタンプを追加します。

型: `boolean`

##### enableChromeLogs
ブラウザからのログを表示します（他のログオプションを上書きします）。

型: `boolean`

##### bidiMapperPath
カスタムbidiマッパーパス。

型: `string`

##### allowedIps
EdgeDriverへの接続が許可されるリモートIPアドレスのカンマ区切りの許可リスト。

型: `string[]`<br />
デフォルト: `['']`

##### allowedOrigins
EdgeDriverへの接続が許可されるリクエスト元のカンマ区切りの許可リスト。任意のホスト元を許可するために`*`を使用することは危険です！

型: `string[]`<br />
デフォルト: `['*']`

##### spawnOpts
ドライバープロセスに渡されるオプション。

型: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
デフォルト: `undefined`

</TabItem>
<TabItem value="firefox">

公式の[ドライバーパッケージ](https://github.com/webdriverio-community/node-geckodriver#options)でGeckodriverのすべてのオプションを確認してください。

</TabItem>
<TabItem value="msedge">

公式の[ドライバーパッケージ](https://github.com/webdriverio-community/node-edgedriver#options)でEdgedriverのすべてのオプションを確認してください。

</TabItem>
<TabItem value="safari">

公式の[ドライバーパッケージ](https://github.com/webdriverio-community/node-safaridriver#options)でSafaridriverのすべてのオプションを確認してください。

</TabItem>
</Tabs>

## 特定のユースケース向けの特別なケイパビリティ

これは特定のユースケースを実現するために適用する必要があるケイパビリティの例のリストです。

### ブラウザをヘッドレスで実行する

ヘッドレスでブラウザを実行するとは、ウィンドウやUIなしでブラウザインスタンスを実行することを意味します。これは主にディスプレイが使用されないCI/CD環境内で使用されます。ブラウザをヘッドレスモードで実行するには、次のケイパビリティを適用します：

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

Safariはヘッドレスモードでの実行を[サポートしていない](https://discussions.apple.com/thread/251837694)ようです。

</TabItem>
</Tabs>

### 異なるブラウザチャンネルを自動化する

安定版としてまだリリースされていないブラウザバージョン（例：Chrome Canary）をテストしたい場合、ケイパビリティを設定し、起動したいブラウザを指定することができます：

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

Chromeでテストする場合、WebdriverIOは定義された`browserVersion`に基づいて、希望するブラウザバージョンとドライバーを自動的にダウンロードします：

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

Firefoxでテストする場合、WebdriverIOは定義された`browserVersion`に基づいて、希望するブラウザバージョンとドライバーを自動的にダウンロードします：

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

Microsoft Edgeでテストする場合は、マシンに希望するブラウザバージョンがインストールされていることを確認してください。WebdriverIOに実行するブラウザを指定できます：

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIOは定義された`browserVersion`に基づいて、希望するドライバーバージョンを自動的にダウンロードします：

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

Safariでテストする場合は、マシンに[Safari Technology Preview](https://developer.apple.com/safari/technology-preview/)がインストールされていることを確認してください。WebdriverIOに次のようにそのバージョンを指定できます：

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## カスタムケイパビリティの拡張

例えば特定のケイパビリティのテスト内で使用する任意のデータを保存するために、独自のケイパビリティセットを定義したい場合は、次のように設定できます：

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

ケイパビリティの命名に関しては、実装固有の名前空間を示す`:` (コロン) 文字を必要とする[W3Cプロトコル](https://w3c.github.io/webdriver/#dfn-extension-capability)に従うことをお勧めします。テスト内でカスタムケイパビリティにアクセスするには、例えば：

```ts
browser.capabilities['custom:caps']
```

型安全性を確保するために、WebdriverIOのケイパビリティインターフェースを拡張できます：

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