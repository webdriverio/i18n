---
id: browser
title: ブラウザオブジェクト
---

__継承元:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

ブラウザオブジェクトは、ブラウザまたはモバイルデバイスを制御するために使用するセッションインスタンスです。WDIOテストランナーを使用する場合、グローバルな`browser`または`driver`オブジェクトを通じて、または[`@wdio/globals`](/docs/api/globals)を使用してインポートすることでWebDriverインスタンスにアクセスできます。WebdriverIOをスタンドアロンモードで使用する場合、ブラウザオブジェクトは[`remote`](/docs/api/modules#remoteoptions-modifier)メソッドによって返されます。

セッションはテストランナーによって初期化されます。同様に、セッションの終了もテストランナープロセスによって行われます。

## プロパティ

ブラウザオブジェクトには以下のプロパティがあります：

| 名前 | 型 | 詳細 |
| ---- | ---- | ------- |
| `capabilities` | `Object` | リモートサーバーから割り当てられた機能。<br /><b>例：</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | リモートサーバーに要求された機能。<br /><b>例：</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | リモートサーバーから割り当てられたセッションID。 |
| `options` | `Object` | ブラウザオブジェクトがどのように作成されたかに応じたWebdriverIO [オプション](/docs/configuration)。詳細は[セットアップの種類](/docs/setuptypes)を参照。 |
| `commandList` | `String[]` | ブラウザインスタンスに登録されたコマンドのリスト |
| `isW3C` | `Boolean` | これがW3Cセッションであるかどうかを示す |
| `isChrome` | `Boolean` | これがChromeインスタンスであるかどうかを示す |
| `isFirefox` | `Boolean` | これがFirefoxインスタンスであるかどうかを示す |
| `isBidi` | `Boolean` | このセッションがBidiを使用しているかどうかを示す |
| `isSauce` | `Boolean` | このセッションがSauce Labs上で実行されているかどうかを示す |
| `isMacApp` | `Boolean` | このセッションがネイティブMacアプリ用に実行されているかどうかを示す |
| `isWindowsApp` | `Boolean` | このセッションがネイティブWindowsアプリ用に実行されているかどうかを示す |
| `isMobile` | `Boolean` | モバイルセッションであることを示す。詳細は[モバイルフラグ](#mobile-flags)を参照。 |
| `isIOS` | `Boolean` | iOSセッションであることを示す。詳細は[モバイルフラグ](#mobile-flags)を参照。 |
| `isAndroid` | `Boolean` | Androidセッションであることを示す。詳細は[モバイルフラグ](#mobile-flags)を参照。 |
| `isNativeContext` | `Boolean`  | モバイルが`NATIVE_APP`コンテキストにあるかどうかを示す。詳細は[モバイルフラグ](#mobile-flags)を参照。 |
| `mobileContext` | `string`  | ドライバーが**現在**いるコンテキストを提供します。例えば、`NATIVE_APP`、Androidの場合は`WEBVIEW_<packageName>`、iOSの場合は`WEBVIEW_<pid>`。これは`driver.getContext()`への余分なWebDriverの呼び出しを節約します。詳細は[モバイルフラグ](#mobile-flags)を参照。 |


## メソッド

セッションに使用される自動化バックエンドに基づいて、WebdriverIOは[ブラウザオブジェクト](/docs/api/browser)にアタッチされる[プロトコルコマンド](/docs/api/protocols)を識別します。例えば、Chromeで自動化セッションを実行する場合、[`elementHover`](/docs/api/chromium#elementhover)のようなChromium固有のコマンドにアクセスできますが、[Appiumコマンド](/docs/api/appium)にはアクセスできません。

さらに、WebdriverIOはページ上の[ブラウザ](/docs/api/browser)や[エレメント](/docs/api/element)と対話するための便利なメソッドセットを提供しています。

さらに、以下のコマンドも利用可能です：

| 名前 | パラメータ | 詳細 |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (タイプ: `String`)<br />- `fn` (タイプ: `Function`)<br />- `attachToElement` (タイプ: `boolean`) | コンポジション目的でブラウザオブジェクトから呼び出せるカスタムコマンドを定義できます。[カスタムコマンド](/docs/customcommands)ガイドで詳細を確認してください。 |
| `overwriteCommand` | - `commandName` (タイプ: `String`)<br />- `fn` (タイプ: `Function`)<br />- `attachToElement` (タイプ: `boolean`) | 任意のブラウザコマンドをカスタム機能で上書きすることができます。フレームワークユーザーを混乱させる可能性があるため、慎重に使用してください。[カスタムコマンド](/docs/customcommands#overwriting-native-commands)ガイドで詳細を確認してください。 |
| `addLocatorStrategy` | - `strategyName` (タイプ: `String`)<br />- `fn` (タイプ: `Function`) | カスタムセレクタ戦略を定義できます。[セレクタ](/docs/selectors#custom-selector-strategies)ガイドで詳細を確認してください。 |

## 備考

### モバイルフラグ

セッションがモバイルデバイス上で実行されているかどうかに基づいてテストを変更する必要がある場合、モバイルフラグをチェックできます。

例えば、この設定を考えてみましょう：

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

テスト内でこれらのフラグにこのようにアクセスできます：

```js
// 注意：`driver`は`browser`オブジェクトと同等ですが、意味的にはより正確です
// 使用したいグローバル変数を選択できます
console.log(driver.isMobile) // 出力：true
console.log(driver.isIOS) // 出力：true
console.log(driver.isAndroid) // 出力：false
```

これは例えば、[ページオブジェクト](../pageobjects)でデバイスタイプに基づいてセレクタを定義する場合に便利です：

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
ブラウザオブジェクトはEventEmitterであり、ユースケースのためにいくつかのイベントが発行されます。

ここにイベントのリストがあります。これはまだ利用可能なイベントの完全なリストではないことに注意してください。
ドキュメントを更新して、より多くのイベントの説明を追加するためのコントリビューションを歓迎します。

#### `command`

このイベントは、WebdriverIOがWebDriver Classicコマンドを送信するたびに発行されます。次の情報が含まれています：

- `command`：コマンド名、例えば `navigateTo`
- `method`：コマンドリクエストの送信に使用されるHTTPメソッド、例えば `POST`
- `endpoint`：コマンドエンドポイント、例えば `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`：コマンドペイロード、例えば `{ url: 'https://webdriver.io' }`

#### `result`

このイベントは、WebdriverIOがWebDriver Classicコマンドの結果を受信するたびに発行されます。次の追加情報を含む`command`イベントと同じ情報が含まれています：

- `result`：コマンドの結果

#### `bidiCommand`

このイベントは、WebdriverIOがWebDriver Bidiコマンドをブラウザドライバに送信するたびに発行されます。以下の情報が含まれています：

- `method`：WebDriver Bidiコマンドメソッド
- `params`：関連するコマンドパラメータ（[API](/docs/api/webdriverBidi)を参照）

#### `bidiResult`

コマンド実行が成功した場合、イベントのペイロードは次のようになります：

- `type`：`success`
- `id`：コマンドID
- `result`：コマンドの結果（[API](/docs/api/webdriverBidi)を参照）

コマンドエラーの場合、イベントのペイロードは次のようになります：

- `type`：`error`
- `id`：コマンドID
- `error`：エラーコード、例えば `invalid argument`
- `message`：エラーの詳細
- `stacktrace`：スタックトレース

#### `request.start`
このイベントは、WebDriverリクエストがドライバーに送信される前に発行されます。リクエストとそのペイロードに関する情報が含まれています。

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
このイベントは、ドライバーへのリクエストがレスポンスを受信したときに発行されます。イベントオブジェクトには、結果としてレスポンスボディ、またはWebDriverコマンドが失敗した場合はエラーが含まれます。

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
リトライイベントは、WebdriverIOがネットワーク問題などによりコマンドの実行を再試行する場合に通知します。これには、リトライの原因となったエラーと既に実行されたリトライの回数に関する情報が含まれています。

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
これはWebDriverレベルの操作を測定するためのイベントです。WebdriverIOがWebDriverバックエンドにリクエストを送信するたびに、このイベントは次のような有用な情報を提供します：

- `durationMillisecond`：リクエストの時間（ミリ秒）
- `error`：リクエストが失敗した場合のエラーオブジェクト
- `request`：リクエストオブジェクト。URL、メソッド、ヘッダーなどが含まれます
- `retryCount`：`0`の場合、リクエストは最初の試みでした。WebDriverIOが内部で再試行すると増加します
- `success`：リクエストが成功したかどうかを表すブール値。`false`の場合、`error`プロパティも提供されます

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

一般的に使用されるワークフローを抽象化するために、ブラウザスコープにカスタムコマンドを設定できます。詳細については、[カスタムコマンド](/docs/customcommands#adding-custom-commands)のガイドをご覧ください。