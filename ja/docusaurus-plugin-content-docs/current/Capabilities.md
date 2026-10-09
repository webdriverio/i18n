---
id: capabilities
title: ケイパビリティ
description: "ケイパビリティを定義して、テストを実行するブラウザやモバイル環境を選択します。カスタムベンダーケイパビリティや特殊なユースケースも含みます。"
---

ケイパビリティ（capability）とは、リモートインターフェースの定義です。WebdriverIO がどのブラウザやモバイル環境でテストを実行したいのかを理解するのに役立ちます。ローカルでテストを開発する場合は、ほとんどの場合1つのリモートインターフェースで実行するため、ケイパビリティはそれほど重要ではありません。しかし、CI/CD で大量の統合テストを実行する場合には、より重要になります。

:::info

ケイパビリティオブジェクトの形式は [WebDriver 仕様](https://w3c.github.io/webdriver/#capabilities)によって明確に定義されています。ユーザーが定義したケイパビリティがその仕様に準拠していない場合、WebdriverIO テストランナーは早い段階で失敗します。

:::

## カスタムケイパビリティ

固定で定義されているケイパビリティの数はごくわずかですが、誰でも自動化ドライバーやリモートインターフェースに固有のカスタムケイパビリティを提供・受け入れることができます。

### ブラウザ固有のケイパビリティ拡張

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities) の拡張。Chrome でのテストにのみ適用されます
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) の拡張。Firefox でのテストにのみ適用されます
- `ms:edgeOptions`: Chromium Edge のテストに EdgeDriver を使用する際に環境を指定するための [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options)

### クラウドベンダーのケイパビリティ拡張

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- その他多数...

### 自動化エンジンのケイパビリティ拡張

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- その他多数...

### ブラウザドライバーオプションを管理するための WebdriverIO ケイパビリティ

WebdriverIO はブラウザドライバーのインストールと実行を自動で管理します。WebdriverIO はドライバーにパラメータを渡すためのカスタムケイパビリティを使用します。

#### `wdio:chromedriverOptions`

Chromedriver の起動時に渡される固有のオプションです。

#### `wdio:geckodriverOptions`

Geckodriver の起動時に渡される固有のオプションです。

#### `wdio:edgedriverOptions`

Edgedriver の起動時に渡される固有のオプションです。

#### `wdio:safaridriverOptions`

Safari の起動時に渡される固有のオプションです。

#### `wdio:maxInstances`

<Option type="number">

特定のブラウザ/ケイパビリティに対して並列実行されるワーカーの最大総数です。[maxInstances](#configuration#maxInstances) および [maxInstancesPerCapability](configuration/#maxinstancespercapability) よりも優先されます。

</Option>

#### `wdio:specs`

<Option type="(String | String[])[]">

そのブラウザ/ケイパビリティでテスト実行する spec を定義します。[通常の `specs` 設定オプション](configuration#specs)と同じですが、ブラウザ/ケイパビリティに固有のものです。`specs` よりも優先されます。

</Option>

#### `wdio:exclude`

<Option type="String[]">

そのブラウザ/ケイパビリティでのテスト実行から spec を除外します。[通常の `exclude` 設定オプション](configuration#exclude)と同じですが、ブラウザ/ケイパビリティに固有のものです。グローバルな `exclude` 設定オプションが適用された後に除外されます。

</Option>

#### `wdio:enforceWebDriverClassic`

<Option type="boolean">

デフォルトでは、WebdriverIO は WebDriver Bidi セッションの確立を試みます。それを望まない場合は、このフラグを設定してこの動作を無効にできます。

</Option>

#### `wdio:electronVersion`

<Option type="string">

`goog:chromeOptions.binary` として設定された Electron アプリをテストするために、Chrome for Testing のものではなく、この Electron リリースにバンドルされた Chromedriver をダウンロードします。`browserVersion` も設定されている場合、Electron リリースをダウンロードできないとき、または `CHROMEDRIVER_CDNURL` が設定されているときは、WebdriverIO は代わりにそのバージョンの Chromedriver を使用します。ナイトリーバージョンは [electron/nightlies](https://github.com/electron/nightlies/releases) から取得されます。Electron サービスを使用すると、アプリの Electron バージョンからこの値が自動的に設定されます。

```ts
{
    browserName: 'chrome',
    'wdio:electronVersion': '33.2.1',
    // BiDi セッションはアプリのウィンドウを `data:,` に置き換えてしまいます
    'wdio:enforceWebDriverClassic': true,
    'goog:chromeOptions': {
        binary: './out/my-app-darwin-arm64/my-app.app/Contents/MacOS/my-app'
    }
}
```

</Option>

#### 共通ドライバーオプション

すべてのドライバーは設定用にそれぞれ異なるパラメータを提供していますが、WebdriverIO が理解し、ドライバーやブラウザのセットアップに使用する共通のものがいくつかあります。

##### `cacheDir`

<Option type="string" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

キャッシュディレクトリのルートへのパスです。このディレクトリは、セッションを開始しようとする際にダウンロードされるすべてのドライバーを保存するために使用されます。

</Option>

##### `binary`

<Option type="string">

カスタムドライバーバイナリへのパスです。設定されている場合、WebdriverIO はドライバーをダウンロードしようとせず、このパスで提供されたものを使用します。使用しているブラウザとドライバーに互換性があることを確認してください。

このパスは `CHROMEDRIVER_PATH`、`GECKODRIVER_PATH`、または `EDGEDRIVER_PATH` 環境変数で指定することもできます。

</Option>
:::caution

ドライバーの `binary` が設定されている場合、WebdriverIO はドライバーをダウンロードしようとせず、このパスで提供されたものを使用します。使用しているブラウザとドライバーに互換性があることを確認してください。

:::

#### カスタムドライバーダウンロードホスト

企業プロキシの背後でテストを実行している場合や、社内のアーティファクトレジストリでドライバーをミラーリングしている場合など、お使いの環境から公開ドライバー CDN にアクセスできない場合は、次の環境変数を使用してダウンロード先をカスタムホストに向けることができます。

- Chrome: `CHROMEDRIVER_CDNURL`、デフォルトは `https://storage.googleapis.com/chrome-for-testing-public`
- Microsoft Edge: `EDGEDRIVER_CDNURL`、デフォルトは `https://msedgedriver.microsoft.com`

ミラーは、元の CDN と同じパスでドライバーアーカイブを提供する必要があります。例えば Chrome の場合:

```sh
CHROMEDRIVER_CDNURL=https://artifactory.company.com/chrome-for-testing npx wdio run wdio.conf.js
```

これにより、ドライバーは `https://artifactory.company.com/chrome-for-testing/<buildId>/<platform>/chromedriver-<platform>.zip` に解決されます。ここで `<platform>` は `linux64`、`linux-arm64`、`mac-x64`、`mac-arm64`、`win32`、`win64` のいずれかです（例: `.../140.0.7339.207/mac-arm64/chromedriver-mac-arm64.zip`）。

:::info 完全なオフライン環境

これらの変数はドライバーのダウンロード先のみをリダイレクトします。WebdriverIO が公開インターネットに一切アクセスしないようにするには、さらに次の4つの条件を満たす必要があります。

- **ブラウザがローカルで利用可能である必要があります。** WebdriverIO がインストール済みの Chrome や Firefox を見つけられない場合、ブラウザもダウンロードしますが、そのダウンロードはこれらの変数に従いません。マシンにブラウザをインストールするか、`goog:chromeOptions.binary` / `moz:firefoxOptions.binary` で WebdriverIO にブラウザの場所を指定してください。
- **完全なバージョン番号を使用してください。** `browserVersion` を省略した場合、WebdriverIO はローカルのブラウザから正確なバージョンを読み取るため、バージョンの照会は不要です。設定する場合は、`140.0.7339.207` のような完全な4つの部分からなるバージョンを使用してください。リリースチャネル（`stable`）、マイルストーン（`140`）、または部分的なバージョン（`140.0.7339`）を指定すると、リダイレクトできない Google の公開エンドポイントに対してバージョンの照会が必要になります。
- **Chromedriver は Chrome for Testing から取得される必要があります。** Linux ARM64 上の `153.0.8001.0` より古い Chrome の場合、および `wdio:electronVersion` を指定して `browserVersion` を指定しない場合、Chromedriver は Electron の GitHub リリースからダウンロードされますが、これらの変数ではリダイレクトされません。
- **必要なバージョンがミラーに実際に存在することを確認してください。** バージョンがミラーされていない場合だけでなく、URL が間違っている場合や認証情報が拒否された場合も含め、ホストからドライバーを取得できないと、WebdriverIO は警告をログに出力した上で、最も近い既知の正常なバージョンを照会し、再び公開エンドポイントにアクセスします。実行が予期せずインターネットにアクセスしたり、指定していないバージョンが選択されたりした場合は、警告に記載された試行先のホストを確認してください。

:::

#### ブラウザ固有のドライバーオプション

ドライバーにオプションを渡すには、次のカスタムケイパビリティを使用できます。

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

<Option type="number">

ADB ドライバーを実行するポートです。

例: `9515`

</Option>

##### urlBase

<Option type="string">

コマンドのベース URL パスプレフィックスです（例: `wd/url`）。

例: `/`

</Option>

##### logPath

<Option type="string">

サーバーログを stderr ではなくファイルに書き込み、ログレベルを `INFO` に引き上げます

</Option>

##### logLevel

<Option type="string">

ログレベルを設定します。指定可能なオプションは `ALL`、`DEBUG`、`INFO`、`WARNING`、`SEVERE`、`OFF` です。

</Option>

##### verbose

<Option type="boolean">

詳細なログを出力します（`--log-level=ALL` と同等）

</Option>

##### silent

<Option type="boolean">

ログを何も出力しません（`--log-level=OFF` と同等）

</Option>

##### appendLog

<Option type="boolean">

ログファイルを上書きせずに追記します。

</Option>

##### replayable

<Option type="boolean">

ログを再生できるように、詳細なログを出力し、長い文字列を切り詰めません（実験的機能）。

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

カスタム bidi マッパーのパスです。

</Option>

##### allowedIps

<Option type="string[]" default="['']">

EdgeDriver への接続を許可するリモート IP アドレスのカンマ区切りの許可リストです。

</Option>

##### allowedOrigins

<Option type="string[]" default="['*']">

EdgeDriver への接続を許可するリクエストオリジンのカンマ区切りの許可リストです。任意のホストオリジンを許可するために `*` を使用するのは危険です！

</Option>

##### spawnOpts

<Option type="SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>" default="undefined">

ドライバープロセスに渡されるオプションです。

</Option>
</TabItem>
<TabItem value="firefox">

Geckodriver のすべてのオプションについては、公式の[ドライバーパッケージ](https://github.com/webdriverio-community/node-geckodriver#options)を参照してください。

</TabItem>
<TabItem value="msedge">

Edgedriver のすべてのオプションについては、公式の[ドライバーパッケージ](https://github.com/webdriverio-community/node-edgedriver#options)を参照してください。

</TabItem>
<TabItem value="safari">

Safaridriver のすべてのオプションについては、公式の[ドライバーパッケージ](https://github.com/webdriverio-community/node-safaridriver#options)を参照してください。

</TabItem>
</Tabs>

## 特定のユースケース向けの特殊なケイパビリティ

これは、特定のユースケースを実現するためにどのケイパビリティを適用する必要があるかを示す例の一覧です。

### ブラウザをヘッドレスで実行する

ヘッドレスブラウザを実行するとは、ウィンドウや UI なしでブラウザインスタンスを実行することを意味します。これは主に、ディスプレイが使用されない CI/CD 環境で使われます。ブラウザをヘッドレスモードで実行するには、次のケイパビリティを適用します。

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

Safari はヘッドレスモードでの実行を[サポートしていない](https://discussions.apple.com/thread/251837694)ようです。

</TabItem>
</Tabs>

### さまざまなブラウザチャネルを自動化する

Chrome Canary など、まだ安定版としてリリースされていないブラウザバージョンをテストしたい場合は、ケイパビリティを設定して起動したいブラウザを指定することで実現できます。例:

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

Chrome でテストする場合、WebdriverIO は定義された `browserVersion` に基づいて、目的のブラウザバージョンとドライバーを自動的にダウンロードします。例:

```ts
{
    browserName: 'chrome', // または 'chromium'
    browserVersion: '116' // または '116.0.5845.96'、'stable'、'dev'、'canary'、'beta'、'latest'（'canary' と同じ）
}
```

手動でダウンロードしたブラウザをテストしたい場合は、次のようにブラウザへのバイナリパスを指定できます。

```ts
{
    browserName: 'chrome',  // または 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

さらに、手動でダウンロードしたドライバーを使用したい場合は、次のようにドライバーへのバイナリパスを指定できます。

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

Firefox でテストする場合、WebdriverIO は定義された `browserVersion` に基づいて、目的のブラウザバージョンとドライバーを自動的にダウンロードします。例:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // または 'latest'
}
```

手動でダウンロードしたバージョンをテストしたい場合は、次のようにブラウザへのバイナリパスを指定できます。

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

さらに、手動でダウンロードしたドライバーを使用したい場合は、次のようにドライバーへのバイナリパスを指定できます。

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

Microsoft Edge でテストする場合は、目的のブラウザバージョンがマシンにインストールされていることを確認してください。次のようにして、実行するブラウザを WebdriverIO に指定できます。

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO は定義された `browserVersion` に基づいて、目的のドライバーバージョンを自動的にダウンロードします。例:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // または '109.0.1467.0'、'stable'、'dev'、'canary'、'beta'
}
```

さらに、手動でダウンロードしたドライバーを使用したい場合は、次のようにドライバーへのバイナリパスを指定できます。

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

Safari でテストする場合は、[Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) がマシンにインストールされていることを確認してください。次のようにして、そのバージョンを WebdriverIO に指定できます。

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## カスタムケイパビリティを拡張する

例えば、特定のケイパビリティのテスト内で使用する任意のデータを保存するなどの目的で、独自のケイパビリティセットを定義したい場合は、次のように設定できます。

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

ケイパビリティの命名については、[W3C プロトコル](https://w3c.github.io/webdriver/#dfn-extension-capability)に従うことをお勧めします。このプロトコルでは、実装固有の名前空間を示す `:`（コロン）文字が必要です。テスト内では、次のようにしてカスタムケイパビリティにアクセスできます。

```ts
browser.capabilities['custom:caps']
```

型安全性を確保するために、次のようにして WebdriverIO のケイパビリティインターフェースを拡張できます。

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