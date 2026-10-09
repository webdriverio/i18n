---
id: dioxus
title: Dioxus
description: "WebdriverIO Dioxus サービスを使用して、セットアップウィザードまたは手動設定で、Windows、macOS、Linux 上の Dioxus デスクトップアプリをテストします。"
---

[Dioxus](https://dioxuslabs.com/) は、単一のコードベースからクロスプラットフォームアプリを構築するための Rust フレームワークです。Dioxus のデスクトップアプリはオペレーティングシステムのネイティブ webview (Wry) でレンダリングされます。WebdriverIO の Dioxus サービスは、Windows (WebView2)、macOS (WKWebView)、Linux (WebKitGTK) 上でアプリの検出、起動、操作を自動化するため、同じテストスイートがどこでも動作します。

Dioxus アプリケーションのテストに WebdriverIO を使用する利点は次のとおりです:

- 🚗 WebDriver レイヤーの自動プロビジョニング — 推奨される組み込みのインプロセスドライバーは、どのプラットフォームでも外部ドライバーバイナリを必要としません
- 📦 クロスプラットフォームのバイナリ検出（`external` プロバイダー向けに、Windows では Edge WebView2 ドライバーを同梱）
- 🧩 `wdio-dioxus-bridge` クレートを介してサービスが提供する `browser.dioxus.execute()`、モック、ウィンドウ管理
- 🔗 ディープリンクおよびプロトコルハンドラーのテスト
- 🪵 Rust およびフロントエンドのログを WebdriverIO テストレポーターへ転送

## はじめに

新しい WebdriverIO プロジェクトを開始するには、次を実行します:

```sh
npm create wdio@latest ./
```

ウィザードでどの種類のテストを行うか尋ねられたら、_"Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications"_ を選択し、フレームワークのプロンプトで _Dioxus_ を選択します。その後、ウィザードは使用する WebDriver プロバイダー（推奨される組み込みのインプロセスドライバー、または Windows 専用の外部ドライバー）と、ビルド済みのデバッグバイナリへのパスを尋ねます。

ウィザードは npm パッケージを自動的にインストールし、`Cargo.toml` に貼り付けるために必要な Cargo の追加内容を標準出力に表示します。

## 手動セットアップ

既に WebdriverIO プロジェクトがある場合は、サービスをインストールします:

```sh
npm install --save-dev @wdio/dioxus-service
```

テストには `wdio-dioxus-bridge` クレートが必要です — これにより `browser.dioxus.execute()`、モック、ログキャプチャが有効になります。`Cargo.toml` に追加してください:

```toml
[dependencies]
wdio-dioxus-bridge = "1"
```

…そして `src/main.rs` の Dioxus デスクトップ設定にインストールします。`#[cfg(debug_assertions)]` ガードにより、ブリッジはリリースビルドから除外されます:

```rust
fn main() {
    let mut config = dioxus::desktop::Config::new();

    #[cfg(debug_assertions)]
    {
        config = wdio_dioxus_bridge::install(config);
    }

    dioxus::LaunchBuilder::desktop()
        .with_cfg(config)
        .launch(App);
}
```

テスト用にアプリをビルドします（デバッグビルドではブリッジが有効なままになります）:

```sh
cargo build
```

次に、サービスと capabilities を設定に追加します:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['dioxus', { driverProvider: 'embedded' }]],
    capabilities: [{
        browserName: 'dioxus',
        'dioxus:options': {
            application: './target/debug/my-app'
        }
    }]
}
```

以上です 🎉

詳しくは、[Dioxus サービスの設定](/docs/desktop-testing/dioxus/configuration)、[ブリッジのセットアップ](/docs/desktop-testing/dioxus/plugin-setup)、[プラットフォーム固有の注意事項](/docs/desktop-testing/dioxus/platform-support)、[一般的な使用パターン](/docs/desktop-testing/dioxus/usage-examples)をご覧ください。