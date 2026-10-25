---
id: mobile
title: モバイルアプリ
description: Android および iOS のエミュレーター、シミュレーター、実機、デバイスクラウド上で、ネイティブアプリ、ハイブリッドアプリ、モバイル Web アプリ向けの WebdriverIO テストをセットアップして実行します。
---

WebdriverIO は、WebDriver プロトコルを話す [Appium](/docs/appium) を通じて Android と iOS を自動化します。テストでは、ブラウザテストと同じ `browser` オブジェクト（`driver` というエイリアスでも利用可能）、`$`/`$$` セレクター、`expect` マッチャーを使用します。Appium は各セッションを、`appium:automationName` で選択されたプラットフォームドライバーにルーティングします。Android の場合は `UiAutomator2` で、追加のセレクター戦略を利用できる Espresso を代替として使うこともできます。iOS と iPadOS の場合は `XCUITest` です。これらのドライバーを使えば、ネイティブアプリや、Android の Chrome または iOS の Safari でのモバイル Web をテストできます。また、ネイティブコンテキストと埋め込み webview を切り替えながら、ハイブリッドアプリをテストすることもできます。セッションは、Android エミュレーター、iOS シミュレーター、実機、または Sauce Labs、BrowserStack、TestingBot、TestMu AI などのデバイスクラウド上で実行できます。[`@wdio/appium-service`](/docs/appium-service) は、ローカルの Appium サーバーを自動的に起動・停止します。WebdriverIO は、素の Appium API に加えて、`tap`、`swipe`、`longPress`、`scrollIntoView`、`switchContext` などのクロスプラットフォームな [モバイルコマンド](/docs/api/mobile) を提供します。

## クイックスタート

前提条件：Android の場合は Android SDK とエミュレーターを含む Android Studio、iOS の場合は macOS 上の Xcode とシミュレーターが必要です。`npx appium-installer` は環境セットアップをガイドし、`npm init wdio@latest .` はモバイルプロジェクトの雛形を作成します（Android または iOS を選択してください）。手動でセットアップする場合：

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter @wdio/appium-service appium tsx
npx appium driver install uiautomator2   # Android
npx appium driver install xcuitest       # iOS
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Android GoogleAPI Emulator',
        'appium:platformVersion': '12.0',
        'appium:automationName': 'UiAutomator2',
        'appium:app': './path/to/app.apk'
    }],
    services: ['appium'],
    logLevel: 'info',
    waitforTimeout: 10000,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/app.e2e.ts"
import { expect, driver, $ } from '@wdio/globals'

describe('My app', () => {
    it('should open the contacts screen', async () => {
        await $('~Contacts').click()
        await expect($('~Add contact')).toBeDisplayed()
    })

    it('should interact with a webview', async () => {
        await driver.switchContext({ title: 'My Webview Title' })
        await expect($('h1')).toBeDisplayed()
    })
})
```

```sh
npx wdio run ./wdio.conf.ts
```

`~` はアクセシビリティ ID セレクターです。Android では `content-description` に、iOS では `accessibilityIdentifier` に対応しており、推奨されるクロスプラットフォーム戦略です。例の ID、webview のタイトル、アプリのパスはご自身のものに置き換えてください。

他のターゲットでは、capabilities を変更するだけです：

```ts title="iOS simulator (native app)"
{
    platformName: 'iOS',
    'appium:deviceName': 'iPhone Simulator',
    'appium:platformVersion': '16.4',
    'appium:automationName': 'XCUITest',
    'appium:app': './path/to/MyApp.app' // シミュレーターの場合は .app、実機の場合は署名済みの .ipa
}
```

```ts title="Mobile web (Chrome on an Android emulator)"
{
    platformName: 'Android',
    browserName: 'Chrome',
    'appium:deviceName': 'Android GoogleAPI Emulator',
    'appium:platformVersion': '12.0',
    'appium:automationName': 'UiAutomator2'
}
```

iOS のモバイル Web の場合は、`platformName: 'iOS'`、`browserName: 'Safari'`、`'appium:automationName': 'XCUITest'` を使用してください。

## 進む道を選ぶ

- [Appium のセットアップ](/docs/appium)：Appium がカバーするプラットフォーム（iOS、Android、Tizen、TV アプリ）と、ツールチェーンのインストール方法。
- [Appium サービス](/docs/appium-service)：サービスオプション（`args`、`command`、`logPath`）、Appium Inspector を開く `npx start-appium-inspector`、および低速な XPath セレクター向けのベータ版オプティマイザー。
- [モバイルコマンド](/docs/api/mobile)：クロスプラットフォームのジェスチャーとヘルパー。[`getContexts`](/docs/api/mobile/getContexts) と [`switchContext`](/docs/api/mobile/switchContext) を使ったハイブリッドアプリ、および iOS 向けの webview capabilities についても扱います。
- [モバイルセレクター](/docs/selectors#mobile-selectors)：アクセシビリティ ID、Android UiAutomator、Espresso のデータ/ビューマッチャー、iOS の predicate string と class chain。
- [Appium プロトコルコマンド](/docs/api/appium)：`driver` で利用可能な素の Appium エンドポイント。
- [Flutter アプリ](/docs/flutter-testing/introduction)：Flutter に Appium Flutter Driver が必要な理由を説明し、その後 [アプリの準備](/docs/flutter-testing/preparing-flutter-application)、[Appium の設定](/docs/flutter-testing/base-appium-configuration)、[WebdriverIO のセットアップ](/docs/flutter-testing/setting-up-webdriverio)、[テストの作成](/docs/flutter-testing/writing-tests) へと進みます。
- [クラウドサービス](/docs/cloudservices)：Sauce Labs、BrowserStack、TestingBot、TestMu AI、Perfecto、RobotActions に接続して、ホストされた実機上で実行します。
- [ビジュアルテスト](/docs/visual-testing)：ネイティブアプリ、ハイブリッドアプリ、モバイルブラウザー向けの画像比較。モバイルでの Percy については、[App Percy](/docs/visual-testing/integrate-with-app-percy) を参照してください。
- [マルチリモート](/docs/multiremote)：1 つのテストで複数のデバイスやブラウザーを連携させます。

[`browser.emulate('device', ...)`](/docs/emulation) を使ってデスクトップブラウザーでデバイスのビューポートをエミュレートすることは、モバイルテストではありません。デスクトップのブラウザーエンジンはモバイルのものとは異なるため、代わりに実際のモバイルブラウザーで Appium を使用してください。

## トラブルシューティング

- セッションが開始しない：`appium:automationName` に対応する Appium ドライバーがインストールされていること、およびエミュレーターまたはシミュレーターが起動していることを確認してください。Appium のポートを変更していない限り、`port: 4723` を使用してください。
- iOS で webview が見つからない：`appium:webviewConnectRetries`、`appium:webviewConnectTimeout`、または `appium:includeSafariInWebviews` を試してください（[ハイブリッドアプリ](/docs/api/mobile#hybrid-apps) を参照）。
- Android で webview が表示されるまでに時間がかかる：`getContexts`/`switchContext` の `androidWebviewConnectionRetryTime` と `androidWebviewConnectTimeout` を調整してください。
- ネイティブセレクターで Flutter ウィジェットが見つからない：これは想定どおりの動作です。[Flutter ガイド](/docs/flutter-testing/introduction) で説明されている Flutter ドライバーとファインダーを使用してください。

## 次のステップ

- [設定](/docs/configuration) と [Capabilities](/docs/capabilities) のリファレンス。
- Android と iOS のスペック間で画面を共有するための [ページオブジェクトパターン](/docs/pageobjects)。
- AI エージェントが Appium を通じて iOS および Android のセッションを操作できるようにする [MCP](/docs/mcp)。
- その他のプラットフォーム：[Web ブラウザー](/docs/platforms/web)、[デスクトップアプリ](/docs/platforms/desktop)、[拡張機能とエディター](/docs/platforms/apps-and-extensions)。