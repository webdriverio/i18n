---
id: desktop
title: デスクトップアプリ
description: ネイティブ macOS アプリ、および macOS・Windows・Linux 上の Electron、Tauri、Dioxus アプリに適した WebdriverIO のセットアップを選び、最初のテストを実行します。
---

WebdriverIO がデスクトップアプリをどのように自動化するかは、アプリの構築方法によって異なります。ネイティブ macOS アプリは、Mac2 ドライバー（`'appium:automationName': 'Mac2'`）を使用して [Appium](/docs/appium) 経由で自動化されます。これには Xcode が必要です。Web ベースのフレームワークで構築されたアプリは、専用の WebdriverIO サービスによって、組み込まれたブラウザエンジンを通じて操作されます。[Electron サービス](/docs/desktop-testing/electron)は、自動インストールされる Chromedriver を介して Chromium を使用し、Electron のメインプロセス API を呼び出すこともできます。[Tauri サービス](/docs/desktop-testing/tauri)と [Dioxus サービス](/docs/desktop-testing/dioxus)は、OS の webview を操作します。Windows では WebView2、macOS では WKWebView、Linux では WebKitGTK です。これら 3 つのサービスは、同じテストスイートを Windows、macOS、Linux で実行できます。ネイティブ Windows アプリについては、現時点で推奨されるドライバーはありません。Appium の Windows Driver は Microsoft の WinAppDriver をベースにしていますが、WinAppDriver はすでにメンテナンスされていません。任意のネイティブ Linux アプリの自動化については、ドキュメント化されたサポートはありません。

| アプリの種類 | macOS | Windows | Linux | 方法 |
|----------|-------|---------|-------|-----|
| ネイティブアプリ | 対応 | 非推奨 | ドキュメントなし | Appium Mac2 ドライバー |
| Electron | 対応 | 対応 | 対応 | `@wdio/electron-service`（Chromedriver） |
| Tauri | 対応 | 対応 | 対応 | `@wdio/tauri-service`（組み込みプラグイン、`tauri-driver` または CrabNebula） |
| Dioxus | 対応 | 対応 | 対応 | `@wdio/dioxus-service`（組み込みドライバー。外部ドライバーは Windows のみ） |

## クイックスタート

`npm create wdio@latest ./` で、これらすべてのひな形を作成できます。「Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications」を選択し、次にフレームワークを選択してください。以下のすべてのセットアップでは、`@wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx` と、`"types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]` を含む `tsconfig.json` も必要です。

### Electron（macOS、Windows、Linux）

```sh
npm install --save-dev @wdio/electron-service
```

```ts title="wdio.conf.ts"
/// <reference types="@wdio/electron-service" />
export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'electron',
        'wdio:electronServiceOptions': {
            // Electron Forge / electron-builder の出力の自動検出に失敗した場合のみ必要
            // appBinaryPath: './dist-electron/linux-unpacked/myApp',
            appArgs: []
        }
    }],
    services: ['electron'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/app.e2e.ts"
import { browser } from '@wdio/globals'

describe('Electron Testing', () => {
    it('should print application title', async () => {
        console.log('Hello', await browser.getTitle(), 'application!')
    })
})
```

メインプロセスでコードを実行するには `browser.electron.execute((electron, ...args) => { ... })` を、Electron API をモックするには `browser.electron.mock()` を使用します。

### ネイティブ macOS アプリ（Appium Mac2）

```sh
npm install --save-dev @wdio/appium-service appium appium-mac2-driver
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        platformName: 'Mac',
        'appium:automationName': 'Mac2',
        'appium:bundleId': 'com.apple.calculator'
    }],
    services: ['appium'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/calculator.e2e.ts"
import { expect, $ } from '@wdio/globals'

describe('MacOS Testing', () => {
    it('should calculate the meaning of life', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    })
})
```

`appium:bundleId` は、セッション開始時に起動するアプリを指定します。

### Tauri と Dioxus

どちらもアプリの Rust 側に追加が必要なため、それぞれのクイックスタートに従ってください。

- Tauri：`tauri-plugin-wdio-webdriver` クレート（組み込みプロバイダー）を追加し、`services: [['tauri', { appBinaryPath: './src-tauri/target/release/my-tauri-app', driverProvider: 'embedded' }]]` を使用します。[Tauri クイックスタート](/docs/desktop-testing/tauri/quick-start)を参照してください。
- Dioxus：`wdio-dioxus-bridge` クレートを追加し、デバッグビルド（`cargo build`）を作成します。その後、`browserName: 'dioxus'` と `'dioxus:options': { application: './target/debug/my-app' }` とともに `services: [['dioxus', { driverProvider: 'embedded' }]]` を使用します。[Dioxus クイックスタート](/docs/desktop-testing/dioxus/quick-start)を参照してください。

## 進む道を選ぶ

- [macOS](/docs/desktop-testing/macos)：Appium と Mac2 ドライバーを使用したネイティブ macOS アプリ。
- [Windows](/docs/desktop-testing/windows)：ネイティブ Windows アプリ自動化の現状。
- [Electron](/docs/desktop-testing/electron)：セットアップ、続いて[設定](/docs/desktop-testing/electron/configuration)（OS ごとのバイナリパスを含む）、[Electron API へのアクセス](/docs/desktop-testing/electron/api)、[API リファレンスとモック](/docs/desktop-testing/electron/api-reference)、[ウィンドウ管理](/docs/desktop-testing/electron/window-management)、[ディープリンク](/docs/desktop-testing/electron/deeplink-testing)、[スタンドアロンモード](/docs/desktop-testing/electron/standalone)、[デバッグ](/docs/desktop-testing/electron/debugging)。
- [Tauri](/docs/desktop-testing/tauri)：[プラットフォームサポート](/docs/desktop-testing/tauri/platform-support)、[設定](/docs/desktop-testing/tauri/configuration)、[プラグインのセットアップ](/docs/desktop-testing/tauri/plugin-setup)、[CrabNebula](/docs/desktop-testing/tauri/crabnebula-setup)、[Windows での Edge WebDriver](/docs/desktop-testing/tauri/edge-webdriver-windows)、[使用例](/docs/desktop-testing/tauri/usage-examples)、[API リファレンス](/docs/desktop-testing/tauri/api)。
- [Dioxus](/docs/desktop-testing/dioxus)：[プラットフォームサポート](/docs/desktop-testing/dioxus/platform-support)、[設定](/docs/desktop-testing/dioxus/configuration)、[ブリッジのセットアップ](/docs/desktop-testing/dioxus/plugin-setup)、[ブラウザモード](/docs/desktop-testing/dioxus/browser-mode)（コマンドをモックして Chrome でフロントエンドのみをテスト）、[使用例](/docs/desktop-testing/dioxus/usage-examples)、[API リファレンス](/docs/desktop-testing/dioxus/api)。
- [マルチリモート](/docs/multiremote)：Electron、Tauri、Dioxus の各サービスはマルチリモートセッションをサポートしています（例：1 つのテストで 2 つのアプリインスタンスを使用）。

## Linux

Linux では、WebdriverIO は Electron、Tauri、Dioxus アプリを操作できます。知っておくべき点は次のとおりです。

- ヘッドレス CI：これらのアプリにはディスプレイサーバーが必要です。ディスプレイが存在しない場合、テストランナーは Weston を起動し、フォールバックとして Xvfb を起動します。どちらもインストールされていない場合にインストールさせるには、`displayServerAutoInstall: true` を設定します。または、`xvfb-run -a npx wdio run wdio.conf.ts` のように、テストランナーを xvfb-run でラップすることもできます。[ヘッドレスとディスプレイサーバー](/docs/headless-and-display-servers)を参照してください。
- `official` プロバイダーを使用する Tauri には、WebKitWebDriver（`webkit2gtk-driver` パッケージ）が必要です。`embedded` プロバイダーには外部ドライバーは不要です。
- Dioxus は Linux では `embedded` プロバイダーのみをサポートしており、Dioxus アプリのビルドには WebKitGTK の開発ライブラリが必要です。
- Ubuntu 24.04 以降およびその他の AppArmor が有効なディストリビューション上の Electron：Electron の起動に失敗する場合は、サービスオプション `apparmorAutoInstall` を設定してください。

## トラブルシューティング

- Electron：[よくある問題](/docs/desktop-testing/electron/common-issues)（例：CI での「DevToolsActivePort file doesn't exist」）。
- Tauri：[トラブルシューティング](/docs/desktop-testing/tauri/troubleshooting)（Edge WebDriver と WebView2 のバージョン不一致を含む）。
- Dioxus：[トラブルシューティング](/docs/desktop-testing/dioxus/troubleshooting)。
- macOS：Xcode などのドライバー固有のセットアップについては、[Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) プロジェクトを参照してください。

## 次のステップ

- すべての `wdio.conf.ts` オプションについては[設定](/docs/configuration)リファレンスを参照してください。
- Mac2 セットアップ用の [Appium サービス](/docs/appium-service)のオプション。
- その他のプラットフォーム：[Web ブラウザ](/docs/platforms/web)、[モバイルアプリ](/docs/platforms/mobile)、[拡張機能とエディター](/docs/platforms/apps-and-extensions)。