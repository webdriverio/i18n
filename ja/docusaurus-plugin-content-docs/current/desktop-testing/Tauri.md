---
id: tauri
title: Tauri
description: "WebdriverIO Tauri サービスを使用して、セットアップウィザードまたは手動設定により、Windows、macOS、Linux 上で Tauri デスクトップアプリをテストします。"
---

[Tauri](https://tauri.app/) は、Rust バックエンドとオペレーティングシステムのネイティブ webview を使用して、軽量で安全なクロスプラットフォームのデスクトップアプリケーションを構築するためのフレームワークです。WebdriverIO の Tauri サービスは、Windows (WebView2)、macOS (WKWebView)、Linux (WebKitGTK) 上での Tauri アプリの検出、起動、操作を自動化するため、同じテストスイートがどこでも動作します。

Tauri アプリケーションのテストに WebdriverIO を使用する利点は次のとおりです。

- 🚗 WebDriver レイヤーの自動プロビジョニング — `tauri-driver`、CrabNebula ドライバー、またはアプリ内組み込みプラグインから選択可能
- 📦 クロスプラットフォームのバイナリ検出（Windows では Edge WebView2 ドライバーを同梱）
- 🧩 より充実した webview 内統合のためのオプションの `@wdio/tauri-plugin`（`browser.tauri.execute`、モック）
- 🔗 ディープリンク + プロトコルハンドラーのテスト
- 🪵 Rust + フロントエンドのログを WebdriverIO テストレポーターへ転送

## はじめに

新しい WebdriverIO プロジェクトを開始するには、次を実行します。

```sh
npm create wdio@latest ./
```

ウィザードでどの種類のテストを行うか尋ねられたら、_"Desktop Testing - of Electron, Tauri, or macOS Applications"_ を選択し、フレームワークのプロンプトで _Tauri_ を選択します。次に、ウィザードはどの WebDriver プロバイダー（公式の `tauri-driver`、CrabNebula、または組み込みプラグイン）を使用するか、そしてより充実した統合のためにオプションの `@wdio/tauri-plugin` を使用するかどうかを尋ねます。

ウィザードは npm パッケージを自動的にインストールし、`src-tauri/Cargo.toml` に貼り付ける必要がある Cargo の追加内容を標準出力に表示します。

## 手動セットアップ

既に WebdriverIO プロジェクトがある場合は、サービスをインストールします。

```sh
npm install --save-dev @wdio/tauri-service
# optional: richer in-webview integration
npm install --save-dev @wdio/tauri-plugin
```

組み込み WebDriver プラグイン（推奨 — W3C サーバーをアプリ内で実行するため、外部の `tauri-driver` は不要）を使用する場合は、Cargo クレートを `src-tauri/Cargo.toml` に追加します。

```toml
[dependencies]
tauri-plugin-wdio-webdriver = "1"
```

…そして `src-tauri/src/lib.rs` で登録します。

```rust
tauri::Builder::default()
    .plugin(tauri_plugin_wdio_webdriver::init())
    // ...
```

次に、サービスを設定に追加します。

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['tauri', {
        appBinaryPath: './src-tauri/target/release/my-tauri-app',
        driverProvider: 'embedded'
    }]]
}
```

以上です 🎉

[Tauri サービスの設定](/docs/desktop-testing/tauri/configuration)、[Tauri プラグインのセットアップ](/docs/desktop-testing/tauri/plugin-setup)、[プラットフォーム固有の注意事項](/docs/desktop-testing/tauri/platform-support)、[一般的な使用パターン](/docs/desktop-testing/tauri/usage-examples)について詳しくはこちらをご覧ください。