---
id: screencast
title: セッションのスクリーンキャスト
description: "DevTools のスクリーンキャストでブラウザセッションを .webm 動画として録画し、キャプチャオプションを設定して出力ファイルを確認します。"
---

ブラウザセッションを `.webm` 動画として録画します。動画は DevTools UI 上で、スナップショットビューや DOM ミューテーションビューと並べて表示されます。

**WebdriverIO**、**[Selenium WebDriver](/docs/devtools/selenium)**、**[Nightwatch.js](/docs/devtools/nightwatch#screencast)** の 3 つのアダプターすべてで利用できます。キャプチャモードはフレームワークによって異なります（可能な場合は CDP プッシュ、それ以外はポーリング。詳しくは下記の [ブラウザサポート](#browser-support) を参照してください）。

## デモ

![Screencast Demo](/img/devtools/screencast.gif)

## セットアップ

スクリーンキャストのエンコードには、`PATH` 上の **ffmpeg** と `fluent-ffmpeg` パッケージが必要です。

```sh
# ffmpeg をインストール - https://ffmpeg.org/download.html
brew install ffmpeg        # macOS
sudo apt install ffmpeg    # Ubuntu/Debian

# fluent-ffmpeg をインストール
npm install fluent-ffmpeg
```

## 設定

```ts
services: [
  [
    'devtools',
    {
      screencast: {
        enabled: true,
        captureFormat: 'jpeg',
        quality: 70,
        maxWidth: 1280,
        maxHeight: 720,
      }
    }
  ]
]
```

## オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `enabled` | `boolean` | `false` | セッション録画を有効にします |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | フレーム画像のフォーマット。**Chrome/Chromium のみ** - Chrome が CDP 経由で送信するフォーマットを制御します。スクリーンショットが常に PNG となるポーリングモード（Firefox、Safari）では無視されます。出力動画のコンテナには影響せず、常に `.webm` になります |
| `quality` | `number` | `70` | JPEG 圧縮品質（0-100）。Chrome/Chromium の CDP モードで `captureFormat: 'jpeg'` の場合にのみ適用されます |
| `maxWidth` | `number` | `1280` | フレームの最大幅（ピクセル）。**Chrome/Chromium のみ** - Chrome は CDP で送信する前にフレームをスケーリングします。ポーリングモードでは無視されます |
| `maxHeight` | `number` | `720` | フレームの最大高さ（ピクセル）。**Chrome/Chromium のみ** - 上記と同様です |
| `pollIntervalMs` | `number` | `200` | Chrome 以外のブラウザ（ポーリングモード）でのスクリーンショット間隔（ミリ秒）。値を小さくすると動画は滑らかになりますが、テスト実行中の WebDriver ラウンドトリップが増えます |

## ブラウザサポート

自動モード選択により、主要なすべてのブラウザで録画が動作します。

| ブラウザ | モード | 備考 |
|---|---|---|
| Chrome / Chromium / Edge | **CDP プッシュ** | Chrome が DevTools Protocol 経由でフレームをプッシュします。効率的で、テストコマンドのタイミングに影響しません |
| Firefox / Safari / その他 | **BiDi ポーリング** | `pollIntervalMs` の間隔で `browser.takeScreenshot()` を呼び出す方式にフォールバックします。WebDriver のスクリーンショットがサポートされている環境であればどこでも動作しますが、間隔に比例したわずかなオーバーヘッドが発生します |

モードを切り替えるための設定変更は不要です。サービスがブラウザの機能を自動的に検出し、どのモードが有効になっているかをログに出力します。

## 動作

- 録画はブラウザセッションの開始時に始まり、終了時に停止します。
- 最初の URL ナビゲーションより前にキャプチャされた先頭の空白フレームは自動的にトリミングされるため、動画は最初の意味のあるページ操作から始まります。
- 実行中に `browser.reloadSession()` が呼び出された場合、サービスは現在の録画を確定し、新しいセッション用に新たな録画を開始します。各セッションごとに個別の `.webm` ファイルが生成されます。
- 複数の録画が存在する場合、DevTools UI に **Recording N** ドロップダウンが表示され、録画を切り替えられます。

### 出力ファイルの保存場所

各アダプターが選択するディレクトリは少しずつ異なります。いずれも `@wdio/devtools-core` 内の同じリゾルバーを使用しますが、渡す入力が異なります。

| アダプター | 出力先 |
|---|---|
| **WebdriverIO** | `wdio.conf.ts` で `outputDir` が明示的に設定されている場合はそのディレクトリ、それ以外は `rootDir`（設定ファイルを含むディレクトリ）。動画の保存先を制御するためだけに `outputDir` を設定するのは避けてください。WDIO はワーカーのログもそこへリダイレクトします。 |
| **Selenium** | 直前に実行されたテストファイルのディレクトリ。フォールバックとして `process.cwd()` を使用します。 |
| **Nightwatch** | テストファイルのディレクトリ。フォールバックとして `nightwatch.conf.*` を含むディレクトリ、次に `process.cwd()` を使用します。 |

Selenium/Nightwatch では `node_modules/` 配下のディレクトリはスキップされるため、シンボリックリンクされたワークスペースで動画が依存関係フォルダに出力されることはありません。

## 出力ファイル

ライブモードはキャプチャしたデータを WebSocket 経由でダッシュボードにストリーミングし、**トレースファイルをディスクに書き込みません**。持ち運び可能な成果物が必要な場合は、[トレースモード](/docs/devtools/wdio/trace-mode)（`trace.zip`）を使用してください。ライブモードが書き込む唯一のファイルはスクリーンキャスト動画で、`screencast.enabled: true` の場合にのみ書き込まれます。ファイル名はアダプターごとに異なります（プレフィックスにフレームワーク名が含まれます）。

| アダプター | スクリーンキャスト動画 |
|---|---|
| WebdriverIO | `wdio-video-{sessionId}.webm` |
| Selenium | `selenium-video-{sessionId}.webm` |
| Nightwatch | `nightwatch-video-{sessionId}.webm` |