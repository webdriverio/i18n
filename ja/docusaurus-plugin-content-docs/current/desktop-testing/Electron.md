---
id: electron
title: Electron
---

Electron は JavaScript、HTML、CSS を使用してデスクトップアプリケーションを構築するためのフレームワークです。Chromium と Node.js をバイナリに組み込むことで、Electron は1つの JavaScript コードベースを維持しながら、Windows、macOS、Linux で動作するクロスプラットフォームアプリを作成することができます — ネイティブ開発の経験は必要ありません。

WebdriverIO は、Electron アプリとの対話を簡素化し、テストを非常に簡単にする統合サービスを提供しています。Electron アプリケーションのテストに WebdriverIO を使用する利点は以下の通りです：

- 🚗 必要な Chromedriver の自動セットアップ
- 📦 Electron アプリケーションのパスの自動検出 - [Electron Forge](https://www.electronforge.io/) と [Electron Builder](https://www.electron.build/) をサポート
- 🧩 テスト内で Electron API にアクセス
- 🕵️ Vitest のような API を通じた Electron API のモック

始めるには、いくつかの簡単なステップが必要です。[WebdriverIO YouTube](https://www.youtube.com/@webdriverio) チャンネルからの、このシンプルなステップバイステップの入門ビデオチュートリアルをご覧ください：

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

または、以下のセクションのガイドに従ってください。

## はじめに

新しい WebdriverIO プロジェクトを開始するには、次のコマンドを実行します：

```sh
npm create wdio@latest ./
```

インストールウィザードがプロセスをガイドします。どのタイプのテストを行いたいかと尋ねられたら、_「デスクトップテスト - Electron アプリケーション」_ を選択してください。その後、コンパイルされた Electron アプリケーションへのパス（例：`./dist`）を提供し、デフォルト設定を維持するか、好みに応じて変更してください。

設定ウィザードは必要なパッケージをすべてインストールし、アプリケーションをテストするために必要な設定で `wdio.conf.js` または `wdio.conf.ts` を作成します。テストファイルの自動生成に同意すれば、`npm run wdio` で最初のテストを実行できます。

## 手動セットアップ

すでにプロジェクトで WebdriverIO を使用している場合は、インストールウィザードをスキップして、以下の依存関係を追加するだけです：

```sh
npm install --save-dev wdio-electron-service
```

そして、以下の設定を使用できます：

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['electron', {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: [/** ... */],
    }]]
}
```

以上です 🎉

[Electron Service の設定方法](/docs/desktop-testing/electron/configuration)、[Electron API のモック方法](/docs/desktop-testing/electron/mocking)、[Electron API へのアクセス方法](/docs/desktop-testing/electron/api)についての詳細をご覧ください。