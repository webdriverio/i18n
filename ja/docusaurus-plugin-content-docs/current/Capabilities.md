---
id: capabilities
title: Capabilities
description: "テストを実行するブラウザやモバイル環境を選択するためのcapabilitiesを定義します。カスタムベンダーcapabilitiesや特殊なユースケースも含みます。"
---

capabilityはリモートインターフェースの定義です。これにより、WebdriverIOはどのブラウザまたはモバイル環境でテストを実行したいかを理解できます。ローカルでテストを開発する場合、ほとんどの時間は1つのリモートインターフェースで実行するため、capabilitiesはそれほど重要ではありませんが、CI/CDで大規模な統合テストを実行する場合にはより重要になります。

:::info

capabilityオブジェクトの形式は[WebDriver仕様](https://w3c.github.io/webdriver/#capabilities)で明確に定義されています。ユーザー定義のcapabilitiesがその仕様に準拠していない場合、WebdriverIOテストランナーは早期に失敗します。

:::

## カスタムCapabilities

固定で定義されているcapabilitiesの数は非常に少ないですが、誰でも自動化ドライバーやリモートインターフェースに固有のカスタムcapabilitiesを提供および受け入れることができます：

### ブラウザ固有のCapability拡張

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities)拡張、Chromeでのテストにのみ適用可能
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)拡張、Firefoxでのテストにのみ適用可能
- `ms:edgeOptions`: Chromium EdgeのテストにEdgeDriverを使用する際に環境を指定するための[EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options)

### クラウドベンダーのCapability拡張

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- その他多数...

### 自動化エンジンのCapability拡張

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- その他多数...

### ブラウザドライバーオプションを管理するためのWebdriverIO Capabilities

WebdriverIOはブラウザドライバーのインストールと実行を自動的に管理します。WebdriverIOは、ドライバーにパラメータを渡すことができるカスタムcapabilityを使用します。

#### `wdio:chromedriverOptions`

Chromedriverの起動時に渡される固有のオプション。

#### `wdio:geckodriverOptions`

Geckodriverの起動時に渡される固有のオプション。

#### `wdio:edgedriverOptions`

Edgedriverの起動時に渡される固有のオプション。

#### `wdio:safaridriverOptions`

Safariの起動時に渡される固有のオプション。

#### `wdio:maxInstances`

<Option type="number">

特定のブラウザ/capabilityに対して並列実行されるワーカーの最大総数。[maxInstances](configuration/#maxinstances)および[maxInstancesPerCapability](configuration/#maxinstancespercapability)よりも優先されます。

</Option>

#### `wdio:specs`

<Option type="(String | String[])[]">

そのブラウザ/capabilityでテスト実行するspecを定義します。[通常の`specs`設定オプション](configuration#specs)と同じですが、ブラウザ/capabilityに固有です。`specs`よりも優先されます。

</Option>

#### `wdio:exclude`

<Option type="String[]">

そのブラウザ/capabilityのテスト実行からspecを除外します。[通常の`exclude`設定オプション](configuration#exclude)と同じですが、ブラウザ/capabilityに固有です。グローバルな`exclude`設定オプションが適用された後に除外されます。

</Option>

#### `wdio:enforceWebDriverClassic`

<Option type="boolean">

デフォルトでは、WebdriverIOはWebDriver Bidiセッションの確立を試みます。それを望まない場合は、このフラグを設定してこの動作を無効にできます。

</Option>

#### `wdio:experimentalBiDiCommands`

<Option type="boolean" default="false">

WebDriver BiDiセッションにおいて、要素コマンドおよび`getTitle`、`getUrl`、`refresh`、`takeScreenshot`などのブラウザコマンドを、WebDriver ClassicではなくWebDriver BiDi経由で実行します。[specファイル内の並列テスト](./ParallelTests.md)に必要です。実験的機能：すべてのテストで一部のコマンドの動作が変わります。例えば、`addValue`と`clearValue`は合成DOMイベントをディスパッチし、`click`はActions API経由で送信されます。[BiDi要素コマンドの動作変更](./ParallelTests.md#behavior-changes-of-the-bidi-element-commands)を参照してください。

```ts
{
    browserName: 'chrome',
    'wdio:experimentalBiDiCommands': true
}
```

</Option>

#### `wdio:electronVersion`

<Option type="string">

`goog:chromeOptions.binary`として設定されたElectronアプリをテストするために、Chrome for TestingのChromedriverではなく、このElectronリリースにバンドルされたChromedriverをダウンロードします。`browserVersion`も設定されている場合、Electronリリースをダウンロードできないとき、または`CHROMEDRIVER_CDNURL`が設定されているときは、代わりにそのバージョンのChromedriverを使用します。ナイトリーバージョンは[electron/nightlies](https://github.com/electron/nightlies/releases)から取得されます。Electronサービスは、アプリのElectronバージョンからこれを自動的に設定します。

```ts
{
    browserName: 'chrome',
    'wdio:electronVersion': '33.2.1',
    // a BiDi session replaces the app's window with `data:,`
    'wdio:enforceWebDriverClassic': true,
    'goog:chromeOptions': {
        binary: './out/my-app-darwin-arm64/my-app.app/Contents/MacOS/my-app'
    }
}
```

</Option>

#### 共通ドライバーオプション

すべてのドライバーは設定のために異なるパラメータを提供していますが、WebdriverIOが理解し、ドライバーやブラウザのセットアップに使用する共通のものがいくつかあります：

##### `cacheDir`

<Option type="string" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

キャッシュディレクトリのルートへのパス。このディレクトリは、セッションを開始しようとする際にダウンロードされるすべてのドライバーを保存するために使用されます。

</Option>

##### `binary`

<Option type="string">

カスタムドライバーバイナリへのパス。設定されている場合、WebdriverIOはドライバーのダウンロードを試みず、このパスで提供されたものを使用します。ドライバーが使用しているブラウザと互換性があることを確認してください。

このパスは`CHROMEDRIVER_PATH`、`GECKODRIVER_PATH`、または`EDGEDRIVER_PATH`環境変数で指定することもできます。

</Option>
:::caution

ドライバーの`binary`が設定されている場合、WebdriverIOはドライバーのダウンロードを試みず、このパスで提供されたものを使用します。ドライバーが使用しているブラウザと互換性があることを確認してください。

:::

#### カスタムドライバーダウンロードホスト

例えば企業のプロキシの背後でテストを実行している場合や、内部のアーティファクトレジストリにドライバーをミラーリングしている場合など、お使いの環境から公開ドライバーCDNにアクセスできない場合は、以下の環境変数を使用してダウンロード先をカスタムホストに向けることができます：

- Chrome: `CHROMEDRIVER_CDNURL`、デフォルトは`https://storage.googleapis.com/chrome-for-testing-public`
- Microsoft Edge: `EDGEDRIVER_CDNURL`、デフォルトは`https://msedgedriver.microsoft.com`

ミラーは、元のCDNと同じパスでドライバーアーカイブを提供することが想定されています。例えばChromeの場合：

```sh
CHROMEDRIVER_CDNURL=https://artifactory.company.com/chrome-for-testing npx wdio run wdio.conf.js
```

これにより、ドライバーは`https://artifactory.company.com/chrome-for-testing/<buildId>/<platform>/chromedriver-<platform>.zip`に解決されます。ここで`<platform>`は`linux64`、`linux-arm64`、`mac-x64`、`mac-arm64`、`win32`、`win64`のいずれかです（例：`.../140.0.7339.207/mac-arm64/chromedriver-mac-arm64.zip`）。

:::info 完全なオフライン環境

これらの変数はドライバーのダウンロードのみをリダイレクトします。WebdriverIOが公開インターネットに一切アクセスしないようにするには、さらに4つの条件を満たす必要があります：

- **ブラウザがローカルで利用可能である必要があります。** WebdriverIOがインストール済みのChromeまたはFirefoxを見つけられない場合、ブラウザもダウンロードしますが、そのダウンロードはこれらの変数に従いません。マシンにブラウザをインストールするか、`goog:chromeOptions.binary` / `moz:firefoxOptions.binary`でWebdriverIOにブラウザの場所を指定してください。
- **完全なバージョン番号を使用してください。** `browserVersion`が省略されている場合、WebdriverIOはローカルブラウザから正確なバージョンを読み取るため、バージョンの検索は不要です。設定する場合は、`140.0.7339.207`のような完全な4部構成のバージョンを使用してください。リリースチャネル（`stable`）、マイルストーン（`140`）、または部分的なバージョン（`140.0.7339`）を指定すると、リダイレクトできない公開Googleエンドポイントに対するバージョン検索が必要になります。
- **ChromedriverはChrome for Testingから取得される必要があります。** Linux ARM64上の`153.0.8001.0`より古いChromeの場合、および`browserVersion`なしで`wdio:electronVersion`を使用する場合、ChromedriverはElectronのGitHubリリースからダウンロードされ、これらの変数ではリダイレクトされません。
- **ミラーに必要なバージョンが実際に存在することを確認してください。** バージョンがミラーされていない場合だけでなく、URLが間違っている場合や認証情報が拒否された場合も含め、ホストからドライバーを取得できないと、WebdriverIOは警告をログに記録し、最も近い既知の正常なバージョンを検索します。この検索では再び公開エンドポイントへの問い合わせが行われます。実行が予期せずインターネットにアクセスしたり、指定していないバージョンが選ばれたりした場合は、警告に記載された試行先のホストを確認してください。

:::

#### ブラウザ固有のドライバーオプション

ドライバーにオプションを伝えるには、以下のカスタムcapabilitiesを使用できます：

- ChromeまたはChromium: `wdio:chromedriverOptions`
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

<Option type="number">

ADBドライバーが実行されるポート。

例：`9515`

</Option>

##### urlBase

<Option type="string">

コマンドのベースURLパスプレフィックス（例：`wd/url`）。

例：`/`

</Option>

##### logPath

<Option type="string">

サーバーログをstderrではなくファイルに書き込み、ログレベルを`INFO`に上げます

</Option>

##### logLevel

<Option type="string">

ログレベルを設定します。指定可能なオプションは`ALL`、`DEBUG`、`INFO`、`WARNING`、`SEVERE`、`OFF`です。

</Option>

##### verbose

<Option type="boolean">

詳細にログを出力します（`--log-level=ALL`と同等）

</Option>

##### silent

<Option type="boolean">

何もログに出力しません（`--log-level=OFF`と同等）

</Option>

##### appendLog

<Option type="boolean">

ログファイルを上書きせずに追記します。

</Option>

##### replayable

<Option type="boolean">

ログを再生できるように、詳細にログを出力し、長い文字列を切り詰めません（実験的）。

</Option>

##### readableTimestamp

<Option type="boolean">

ログに読みやすいタイムスタンプを追加します。

</Option>

##### enableChromeLogs

<Option type="boolean">

ブラウザからのログを表示します（他のログオプションを上書きします）。

</Option>

##### bidiMapperPath

<Option type="string">

カスタムbidiマッパーのパス。

</Option>

##### allowedIps

<Option type="string[]" default="['']">

EdgeDriverへの接続を許可されたリモートIPアドレスのカンマ区切りの許可リスト。

</Option>

##### allowedOrigins

<Option type="string[]" default="['*']">

EdgeDriverへの接続を許可されたリクエストオリジンのカンマ区切りの許可リスト。任意のホストオリジンを許可するために`*`を使用することは危険です！

</Option>

##### spawnOpts

<Option type="SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>" default="undefined">

ドライバープロセスに渡されるオプション。

</Option>
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

## 特定のユースケース向けの特殊なCapabilities

これは、特定のユースケースを実現するためにどのcapabilitiesを適用する必要があるかを示す例のリストです。

### ブラウザをヘッドレスで実行する

ヘッドレスブラウザを実行するとは、ウィンドウやUIなしでブラウザインスタンスを実行することを意味します。これは主にディスプレイが使用されないCI/CD環境で使用されます。ブラウザをヘッドレスモードで実行するには、以下のcapabilitiesを適用してください：

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

### 異なるブラウザチャネルを自動化する

Chrome Canaryなど、まだ安定版としてリリースされていないブラウザバージョンをテストしたい場合は、capabilitiesを設定して起動したいブラウザを指定することで可能です。例：

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

Chromeでテストする場合、WebdriverIOは定義された`browserVersion`に基づいて、目的のブラウザバージョンとドライバーを自動的にダウンロードします。例：

```ts
{
    browserName: 'chrome', // or 'chromium'
    browserVersion: '116' // or '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' or 'latest' (same as 'canary')
}
```

手動でダウンロードしたブラウザをテストしたい場合は、以下のようにブラウザへのバイナリパスを指定できます：

```ts
{
    browserName: 'chrome',  // or 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

さらに、手動でダウンロードしたドライバーを使用したい場合は、以下のようにドライバーへのバイナリパスを指定できます：

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

Firefoxでテストする場合、WebdriverIOは定義された`browserVersion`に基づいて、目的のブラウザバージョンとドライバーを自動的にダウンロードします。例：

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // or 'latest'
}
```

手動でダウンロードしたバージョンをテストしたい場合は、以下のようにブラウザへのバイナリパスを指定できます：

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

さらに、手動でダウンロードしたドライバーを使用したい場合は、以下のようにドライバーへのバイナリパスを指定できます：

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

Microsoft Edgeでテストする場合は、目的のブラウザバージョンがマシンにインストールされていることを確認してください。以下のように、実行するブラウザをWebdriverIOに指定できます：

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIOは定義された`browserVersion`に基づいて、目的のドライバーバージョンを自動的にダウンロードします。例：

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // or '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

さらに、手動でダウンロードしたドライバーを使用したい場合は、以下のようにドライバーへのバイナリパスを指定できます：

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

Safariでテストする場合は、[Safari Technology Preview](https://developer.apple.com/safari/technology-preview/)がマシンにインストールされていることを確認してください。以下のように、そのバージョンをWebdriverIOに指定できます：

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## カスタムCapabilitiesの拡張

例えば、特定のcapabilityのテスト内で使用する任意のデータを保存するなどの目的で、独自のcapabilitiesセットを定義したい場合は、以下のように設定できます：

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

capabilityの命名については、実装固有の名前空間を示す`:`（コロン）文字を必要とする[W3Cプロトコル](https://w3c.github.io/webdriver/#dfn-extension-capability)に従うことが推奨されます。テスト内では、以下のようにカスタムcapabilityにアクセスできます：

```ts
browser.capabilities['custom:caps']
```

型安全性を確保するために、以下のようにWebdriverIOのcapabilityインターフェースを拡張できます：

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