---
id: browser
title: ブラウザオブジェクト
---

__継承元:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

ブラウザオブジェクトは、ブラウザやモバイルデバイスを制御するために使用するセッションインスタンスです。WDIOテストランナーを使用している場合、グローバルな`browser`または`driver`オブジェクトを通じて、または[`@wdio/globals`](/docs/api/globals)を使用してWebDriverインスタンスにアクセスできます。WebdriverIOをスタンドアロンモードで使用している場合、ブラウザオブジェクトは[`remote`](/docs/api/modules#remoteoptions-modifier)メソッドによって返されます。

セッションはテストランナーによって初期化されます。セッションの終了も同様にテストランナープロセスによって行われます。

## プロパティ

ブラウザオブジェクトには以下のプロパティがあります：

| 名前 | 型 | 詳細 |
| ---- | ---- | ------- |
| `capabilities` | `Object` | リモートサーバーから割り当てられた機能。<br /><b>例：</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | リモートサーバーに要求された機能。<br /><b>例：</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | リモートサーバーから割り当てられたセッションID。 |
| `options` | `Object` | ブラウザオブジェクトの作成方法に応じたWebdriverIO [オプション](/docs/configuration)。詳細は[セットアップタイプ](/docs/setuptypes)を参照してください。 |
| `commandList` | `String[]` | ブラウザインスタンスに登録されているコマンドのリスト |
| `isW3C` | `Boolean` | これがW3Cセッションであるかどうかを示します |
| `isChrome` | `Boolean` | これがChromeインスタンスであるかどうかを示します |
| `isFirefox` | `Boolean` | これがFirefoxインスタンスであるかどうかを示します |
| `isBidi` | `Boolean` | このセッションがBidiを使用しているかどうかを示します |
| `isSauce` | `Boolean` | このセッションがSauce Labs上で実行されているかどうかを示します |
| `isMacApp` | `Boolean` | このセッションがネイティブMacアプリ用に実行されているかどうかを示します |
| `isWindowsApp` | `Boolean` | このセッションがネイティブWindowsアプリ用に実行されているかどうかを示します |
| `isMobile` | `Boolean` | モバイルセッションであることを示します。詳細は[モバイルフラグ](#モバイルフラグ)を参照してください。 |
| `isIOS` | `Boolean` | iOSセッションであることを示します。詳細は[モバイルフラグ](#モバイルフラグ)を参照してください。 |
| `isAndroid` | `Boolean` | Androidセッションであることを示します。詳細は[モバイルフラグ](#モバイルフラグ)を参照してください。 |
| `isNativeContext` | `Boolean`  | モバイルが`NATIVE_APP`コンテキストにあるかどうかを示します。詳細は[モバイルフラグ](#モバイルフラグ)を参照してください。 |
| `mobileContext` | `string`  | ドライバーが**現在**いるコンテキストを提供します。例えば`NATIVE_APP`、Androidの場合は`WEBVIEW_<packageName>`、iOSの場合は`WEBVIEW_<pid>`です。これにより`driver.getContext()`への余分なWebDriverの呼び出しが省略されます。詳細は[モバイルフラグ](#モバイルフラグ)を参照してください。 |


## メソッド

セッションに使用される自動化バックエンドに基づいて、WebdriverIOは[ブラウザオブジェクト](/docs/api/browser)にアタッチされる[プロトコルコマンド](/docs/api/protocols)を識別します。例えば、Chromeで自動化セッションを実行している場合、[`elementHover`](/docs/api/chromium#elementhover)のようなChromium固有のコマンドにアクセスできますが、[Appiumコマンド](/docs/api/appium)にはアクセスできません。

さらにWebdriverIOは、ページ上の[ブラウザ](/docs/api/browser)や[要素](/docs/api/element)と対話するために使用することが推奨される便利なメソッドのセットを提供しています。

さらに以下のコマンドが利用可能です：

| 名前 | パラメータ | 詳細 |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (型: `String`)<br />- `fn` (型: `Function`)<br />- `attachToElement` (型: `boolean`) | 合成目的のためにブラウザオブジェクトから呼び出すことができるカスタムコマンドを定義できます。詳細は[カスタムコマンド](/docs/customcommands)ガイドを参照してください。 |
| `overwriteCommand` | - `commandName` (型: `String`)<br />- `fn` (型: `Function`)<br />- `attachToElement` (型: `boolean`) | 任意のブラウザコマンドをカスタム機能で上書きすることができます。フレームワークユーザーを混乱させる可能性があるため、注意して使用してください。詳細は[カスタムコマンド](/docs/customcommands#overwriting-native-commands)ガイドを参照してください。 |
| `addLocatorStrategy` | - `strategyName` (型: `String`)<br />- `fn` (型: `Function`) | カスタムセレクタ戦略を定義できます。詳細は[セレクタ](/docs/selectors#custom-selector-strategies)ガイドを参照してください。 |

## 備考

### モバイルフラグ

セッションがモバイルデバイス上で実行されているかどうかに基づいてテストを変更する必要がある場合、モバイルフラグにアクセスして確認できます。

例えば、以下の設定があるとします：

```js
// wdio.conf.js
export const config = {
    // ...
    capabilities: \\{
        platformName: 'iOS',
        app: 'net.company.SafariLauncher',
        udid: '123123123123abc',
        deviceName: 'iPhone',
        // ...
    }
    // ...
}
```

テスト内で次のようにこれらのフラグにアクセスできます：

```js
// 注意：`driver`は`browser`オブジェクトと同等ですが、意味的により正確です
// どちらのグローバル変数を使用するかを選択できます
console.log(driver.isMobile) // 出力: true
console.log(driver.isIOS) // 出力: true
console.log(driver.isAndroid) // 出力: false
```

これは例えば、[ページオブジェクト](../pageobjects)内でデバイスタイプに基づいてセレクタを定義する場合に便利です：

```js
// mypageobject.page.js
import Page from './page'

class LoginPage extends Page {
    // ...
    get username() {
        const selectorAndroid = 'new UiSelector().text("Cancel").className("android.widget.Button")'
        const selectorIOS = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
        const selectorType = driver.isAndroid ? 'android' : 'ios'
        const selector = driver.isAndroid ? selectorAndroid : selectorIOS
        return $(`${selectorType}=${selector}`)
    }
    // ...
}
```

また、特定のデバイスタイプに対してのみ特定のテストを実行するためにこれらのフラグを使用することもできます：

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // Androidデバイスでのみテストを実行
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### イベント
ブラウザオブジェクトはEventEmitterであり、いくつかのイベントがユースケースのために発行されます。

以下はイベントのリストです。これはまだ利用可能なイベントの完全なリストではないことに注意してください。
ここにより多くのイベントの説明を追加してドキュメントを更新するのに貢献することを歓迎します。

#### `command`

このイベントは、WebdriverIOがWebDriver Classicコマンドを送信するたびに発行されます。次の情報が含まれています：

- `command`: コマンド名（例：`navigateTo`）
- `method`: コマンドリクエストの送信に使用されるHTTPメソッド（例：`POST`）
- `endpoint`: コマンドエンドポイント（例：`/session/fc8dbda381a8bea36a225bd5fd0c069b/url`）
- `body`: コマンドのペイロード（例：`{ url: 'https://webdriver.io' }`）

#### `result`

このイベントは、WebdriverIOがWebDriver Classicコマンドの結果を受信するたびに発行されます。`command`イベントと同じ情報に加えて、以下の情報が含まれています：

- `result`: コマンドの結果

#### `bidiCommand`

このイベントは、WebdriverIOがWebDriver Bidiコマンドをブラウザドライバーに送信するたびに発行されます。以下の情報が含まれています：

- `method`: WebDriver Bidiコマンドメソッド
- `params`: 関連するコマンドパラメータ（[API](/docs/api/webdriverBidi)を参照）

#### `bidiResult`

コマンド実行が成功した場合、イベントのペイロードは次のようになります：

- `type`: `success`
- `id`: コマンドID
- `result`: コマンドの結果（[API](/docs/api/webdriverBidi)を参照）

コマンドエラーの場合、イベントのペイロードは次のようになります：

- `type`: `error`
- `id`: コマンドID
- `error`: エラーコード（例：`invalid argument`）
- `message`: エラーに関する詳細
- `stacktrace`: スタックトレース

#### `request.start`
このイベントは、WebDriverリクエストがドライバーに送信される前に発生します。リクエストとそのペイロードに関する情報が含まれています。

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
このイベントは、ドライバーへのリクエストがレスポンスを受信した時に発生します。イベントオブジェクトには、結果としてレスポンスボディが含まれるか、WebDriverコマンドが失敗した場合はエラーが含まれます。

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
リトライイベントは、WebdriverIOがネットワーク問題などにより、コマンドの実行を再試行しようとしたときに通知できます。リトライの原因となったエラーと、すでに行われたリトライの回数に関する情報が含まれています。

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
これはWebDriverレベルの操作を測定するためのイベントです。WebdriverIOがWebDriverバックエンドにリクエストを送信するたびに、このイベントは以下の有用な情報と共に発行されます：

- `durationMillisecond`: リクエストの時間（ミリ秒）
- `error`: リクエストが失敗した場合のエラーオブジェクト
- `request`: リクエストオブジェクト。URL、メソッド、ヘッダーなどを確認できます
- `retryCount`: `0`の場合、リクエストは最初の試行でした。WebDriverIOが内部で再試行すると増加します
- `success`: リクエストが成功したかどうかを表すブール値。`false`の場合、`error`プロパティも提供されます

イベントの例：
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### カスタムコマンド

ブラウザスコープにカスタムコマンドを設定して、一般的に使用されるワークフローを抽象化することができます。詳細については、[カスタムコマンド](/docs/customcommands#adding-custom-commands)に関するガイドをご覧ください。