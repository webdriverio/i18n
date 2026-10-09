---
id: electron
title: Electron
description: "WebdriverIO Electronサービスを使用してElectronアプリをテストします。このサービスはChromedriverをセットアップし、アプリのバイナリを検出し、Electron APIをモックできるようにします。"
---

Electronは、JavaScript、HTML、CSSを使用してデスクトップアプリケーションを構築するためのフレームワークです。ChromiumとNode.jsをバイナリに組み込むことで、Electronは1つのJavaScriptコードベースを維持しながら、Windows、macOS、Linuxで動作するクロスプラットフォームアプリを作成できます。ネイティブ開発の経験は必要ありません。

WebdriverIOは、Electronアプリとのやり取りを簡素化し、テストを非常に簡単にする統合サービスを提供しています。Electronアプリケーションのテストに WebdriverIO を使用する利点は次のとおりです：

- 🚗 必要なChromedriverの自動セットアップ
- 📦 Electronアプリケーションのパスの自動検出 - [Electron Forge](https://www.electronforge.io/)と[Electron Builder](https://www.electron.build/)をサポート
- 🧩 テスト内でElectron APIにアクセス
- 🕵️ Vitestライクな APIによるElectron APIのモック

いくつかの簡単なステップで始めることができます。[WebdriverIO YouTube](https://www.youtube.com/@webdriverio)チャンネルの、シンプルなステップバイステップの入門ビデオチュートリアルをご覧ください：

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

または、次のセクションのガイドに従ってください。

## はじめに

新しいWebdriverIOプロジェクトを開始するには、次を実行します：

```sh
npm create wdio@latest ./
```

インストールウィザードがプロセスをガイドします。どのような種類のテストを行いたいか尋ねられたら、_"Desktop Testing - of Electron, Tauri, or macOS Applications"_を選択し、フレームワークのプロンプトで_Electron_を選択します。その後、コンパイル済みのElectronアプリケーションへのパス（例：`./dist`）を指定し、あとはデフォルトのままにするか、好みに応じて変更してください。

設定ウィザードは必要なすべてのパッケージをインストールし、アプリケーションのテストに必要な設定を含む`wdio.conf.js`または`wdio.conf.ts`を作成します。テストファイルの自動生成に同意した場合は、`npm run wdio`で最初のテストを実行できます。

## 手動セットアップ

プロジェクトですでにWebdriverIOを使用している場合は、インストールウィザードをスキップして、次の依存関係を追加するだけです：

```sh
npm install --save-dev @wdio/electron-service
```

その後、次の設定を使用できます：

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

[Electronサービスの設定方法](/docs/desktop-testing/electron/configuration)、[Electron APIのモック方法](/docs/desktop-testing/electron/api-reference)、[Electron APIへのアクセス方法](/docs/desktop-testing/electron/api)について詳しくご覧ください。