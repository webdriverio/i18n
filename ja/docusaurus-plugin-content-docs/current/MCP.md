---
id: mcp
title: MCP (Model Context Protocol)
description: "WebdriverIO MCPサーバーを通じてAIアシスタントがブラウザやモバイルアプリを自動化できるようにします。インストール方法、Claudeでの使用方法、利用可能なツールについて説明します。"
---

## 何ができるのか？

WebdriverIO MCPは、AIアシスタントがWebブラウザやモバイルアプリケーションを自動化し、操作できるようにする**Model Context Protocol (MCP) サーバー**です。

### なぜWebdriverIO MCPなのか？

-   **モバイルファースト**: ブラウザ専用のMCPサーバーとは異なり、WebdriverIO MCPはAppiumを介してiOSおよびAndroidのネイティブアプリの自動化をサポートします
-   **クロスプラットフォームセレクター**: スマートな要素検出により、複数のロケーター戦略（accessibility ID、XPath、UiAutomator、iOS predicates）を自動的に生成します
-   **WebdriverIOエコシステム**: サービスやレポーターの豊富なエコシステムを持つ、実績のあるWebdriverIOフレームワーク上に構築されています

以下に対する統一されたインターフェースを提供します：

-   🖥️ **デスクトップブラウザ**（Chrome、Firefox、Edge、Safari、ヘッド付きまたはヘッドレス）
-   📱 **ネイティブモバイルアプリ**（Appium経由のiOSシミュレーター / Androidエミュレーター / 実機）
-   📳 **ハイブリッドモバイルアプリ**（Appium経由のネイティブ + WebViewコンテキスト切り替え）
-   ☁️ **クラウドデバイス**（BrowserStack、Sauce Labs、TestMuの実機およびブラウザクラウド）

これらは[`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp)パッケージを通じて提供されます。

これにより、AIアシスタントは以下のことが可能になります：

-   **ブラウザの起動と制御**：画面サイズ、ヘッドレスモード、任意の初期ナビゲーションを設定可能
-   **Webサイトのナビゲーション**と要素の操作（クリック、入力、スクロール）
-   **ページコンテンツの分析**：アクセシビリティツリーと可視要素の検出（ページネーション対応）
-   **スクリーンショットの撮影**：自動的に最適化（リサイズ、最大1MBに圧縮）
-   **Cookieの管理**によるセッション処理
-   **モバイルデバイスの制御**：ジェスチャー（タップ、スワイプ、ドラッグ＆ドロップ）を含む
-   **コンテキストの切り替え**：ハイブリッドアプリでネイティブとWebViewを切り替え
-   **スクリプトの実行** - ブラウザではJavaScript、デバイスではAppiumのモバイルコマンド
-   **デバイス機能の操作**：回転、キーボード、位置情報など
-   その他多数。[Tools](./mcp/tools)と[Configuration](./mcp/configuration)のオプションを参照してください

:::info

モバイルアプリに関する注意
モバイルの自動化には、適切なドライバーがインストールされた状態でAppiumサーバーが実行されている必要があります。セットアップ手順については[前提条件](#prerequisites)を参照してください。

:::

## インストール

`@wdio/mcp`を使用する最も簡単な方法は、ローカルにインストールせずにnpxを使用することです：

```sh
npx @wdio/mcp
```

またはグローバルにインストールします：

```sh
npm install -g @wdio/mcp
```

## Claudeでの使用方法

ClaudeでWebdriverIO MCPを使用するには、設定ファイルを変更します：

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

設定を追加した後、ハーネスを再起動してください。ブラウザおよびモバイルの自動化タスクでWebdriverIO MCPツールが利用可能になります。

### Claude Codeでの使用方法

Claude CodeはMCPサーバーを自動的に検出します。プロジェクトの`.claude/settings.json`または`.mcp.json`で設定できます。

または、以下を実行して.claude.jsonにグローバルに追加します：
```bash
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```
Claude Code内で`/mcp`コマンドを実行して確認してください。

## クイックスタートの例

### ブラウザの自動化

Claudeにブラウザタスクの自動化を依頼します：

```
"Open Chrome and navigate to https://webdriver.io"
"Click the 'Get Started' button"
"Take a screenshot of the page"
"Find all visible links on the page"
```

### モバイルアプリの自動化

Claudeにモバイルアプリの自動化を依頼します：

```
"Start my iOS app on the iPhone 15 simulator"
"Tap the login button"
"Swipe up to scroll down"
"Take a screenshot of the current screen"
```

## 機能

### ブラウザの自動化

| 機能 | 説明 |
|---------|-------------|
| **セッション管理** | Chrome、Firefox、Edge、Safariをヘッド付き/ヘッドレスモードでカスタムサイズで起動。CDP経由で既存のChromeインスタンスにアタッチ |
| **ナビゲーション** | URLへの移動、複数タブの管理 |
| **要素の操作** | 要素のクリック、テキスト入力、さまざまなセレクターによる要素の検索 |
| **ページ分析** | 操作可能な要素の取得（ページネーション付き）、アクセシビリティツリー（ロールによるフィルタリング付き） |
| **スクリーンショット** | スクリーンショットの撮影（最大1MBに自動最適化） |
| **スクロール** | 設定可能なピクセル量で上下にスクロール |
| **Cookie管理** | Cookieの取得、設定、削除 |
| **デバイスエミュレーション** | ブラウザでモバイル/タブレットのビューポートをエミュレート（BiDiが必要） |
| **スクリプト実行** | ブラウザコンテキストでカスタムJavaScriptを実行 |

### モバイルアプリの自動化（iOS/Android）

| 機能 | 説明 |
|---------|-------------|
| **セッション管理** | シミュレーター、エミュレーター、または実機でアプリを起動 |
| **タッチジェスチャー** | タップ（要素または座標）、スワイプ、ドラッグ＆ドロップ |
| **要素検出** | 複数のロケーター戦略とページネーションによるスマートな要素検出 |
| **アプリのライフサイクル** | アプリの状態を取得（フォアグラウンド、バックグラウンド、未実行、未インストール） |
| **コンテキスト切り替え** | ハイブリッドアプリでネイティブとWebViewのコンテキストを切り替え |
| **デバイス制御** | デバイスの回転、キーボード制御、GPSの上書き |
| **パーミッション** | パーミッションとアラートの自動処理 |
| **スクリプト実行** | Appiumのモバイルコマンドを実行（pressKey、deepLink、shellなど） |

### クラウドプロバイダー

| 機能 | 説明 |
|---------|-------------|
| **ブラウザセッション** | BrowserStack、Sauce Labs、TestMu、またはTestingBotでブラウザセッションを実行（Windows、macOS、Linux） |
| **モバイルセッション** | BrowserStack、Sauce Labs、TestMu、またはTestingBot経由で実機上でアプリセッションを実行 |
| **アプリ管理** | `.apk`/`.ipa`ファイルのアップロード。4つのプロバイダーすべてで以前にアップロードしたアプリを一覧表示 |
| **ローカルトンネル** | localhostにアクセスするためのプロバイダー固有のトンネルバイナリを自動管理 |
| **レポート** | プロジェクト/ビルド/セッションのラベルでセッションをタグ付け（すべてのプロバイダーで同じように動作） |

## 前提条件

### ブラウザの自動化

-   **Chrome、Firefox、Edge、またはSafari**がインストールされている必要があります
-   WebdriverIOがドライバーの管理を自動で行います

### モバイルの自動化

#### iOS

1. Mac App Storeから**Xcodeをインストール**します
2. **Xcode Command Line Toolsをインストール**します：
   ```sh
   xcode-select --install
   ```
3. **Appiumをインストール**します：
   ```sh
   npm install -g appium
   ```
4. **XCUITestドライバーをインストール**します：
   ```sh
   appium driver install xcuitest
   ```
5. **Appiumサーバーを起動**します：
   ```sh
   appium
   ```
6. **シミュレーターの場合**：Xcode → Window → Devices and Simulatorsを開いてシミュレーターを作成/管理します
7. **実機の場合**：デバイスのUDID（40文字の一意の識別子）が必要です

#### Android

1. **Android Studioをインストール**し、Android SDKをセットアップします
2. **環境変数を設定**します：
   ```sh
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
3. **Appiumをインストール**します：
   ```sh
   npm install -g appium
   ```
4. **UiAutomator2ドライバーをインストール**します：
   ```sh
   appium driver install uiautomator2
   ```
5. **Appiumサーバーを起動**します：
   ```sh
   appium
   ```
6. Android Studio → Virtual Device Managerから**エミュレーターを作成**します
7. テストを実行する前に**エミュレーターを起動**します

## アーキテクチャ

### 仕組み

WebdriverIO MCPは、AIアシスタントとブラウザ/モバイル自動化の間の橋渡しとして機能します：

```
┌─────────────────┐     MCP Protocol      ┌─────────────────┐
│  Claude Desktop │ ◄──────────────────►  │    @wdio/mcp    │
│  or Claude Code │   (stdio or HTTP)     │     Server      │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                             WebDriverIO API
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    │                              │                              │
            ┌───────▼───────┐             ┌───────▼───────┐             ┌───────▼───────┐
            │    Browser    │             │    Appium     │             │   Cloud        │
            │ (local/CDP)   │             │  (iOS/Android)│             │   Providers    │
            └───────────────┘             └───────────────┘             └───────────────┘
```

### セッション管理

-   **シングルセッションモデル**：一度にアクティブにできるのは、ブラウザまたはアプリのいずれか1つのセッションのみです
-   **セッションの状態**はツール呼び出し間でグローバルに維持されます
-   **自動デタッチ**：状態が保持されているセッション（`noReset: true`）は、クローズ時に自動的にデタッチされます

### 要素検出

#### ブラウザ（Web）

-   最適化されたブラウザスクリプトを使用して、表示されている操作可能なすべての要素を検索します
-   CSSセレクター、ID、クラス、ARIA情報を含む要素を返します
-   ビューポートによるフィルタリングとページネーションをサポートします

#### モバイル（ネイティブアプリ）

-   効率的なXMLページソースの解析を使用します（従来のクエリでは600回以上必要なところを2回のHTTP呼び出しで実現）
-   AndroidとiOS向けのプラットフォーム固有の要素分類
-   要素ごとに複数のロケーター戦略を生成します：
    -   Accessibility ID（クロスプラットフォーム、最も安定）
    -   Resource ID / Name属性
    -   テキスト / ラベルのマッチング
    -   XPath（完全版と簡略版）
    -   UiAutomator（Android） / Predicates（iOS）

## セレクター構文

MCPサーバーは複数のセレクター戦略をサポートしています。詳細なドキュメントについては[Selectors](./mcp/selectors)を参照してください。

### Web（CSS/XPath）

```
# CSS Selectors
button.my-class
#element-id
[data-testid="login"]

# XPath
//button[@class='submit']
//a[contains(text(), 'Click')]

# Text Selectors (WebdriverIO specific)
button=Exact Button Text
a*=Partial Link Text
```

### モバイル（クロスプラットフォーム）

```
# Accessibility ID (recommended - works on iOS & Android)
~loginButton

# Android UiAutomator
android=new UiSelector().text("Login")

# iOS Predicate String
-ios predicate string:label == "Login"

# iOS Class Chain
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# XPath (works on both platforms)
//android.widget.Button[@text="Login"]
//XCUIElementTypeButton[@label="Login"]
```

## 利用可能なツール

MCPサーバーは、ブラウザおよびモバイルの自動化のための29個のツールを提供します。完全なリファレンスについては[Tools](./mcp/tools)を参照してください。

| ツール | プラットフォーム | 説明 |
|------|----------|-------------|
| `start_session` | all | ブラウザまたはモバイルセッションを開始（ローカルまたはクラウドプロバイダー） |
| `close_session` | all | 現在のセッションをクローズまたはデタッチ |
| `launch_chrome` | browser | CDPアタッチ用にリモートデバッグを有効にしてChromeを開く |
| `navigate` | browser | 現在のタブでURLを読み込む |
| `get_tabs` | browser | 開いているすべてのタブを一覧表示 |
| `switch_tab` | browser | ハンドルまたはインデックスでタブにフォーカス |
| `switch_frame` | browser | セレクターでiframeに切り替え、またはトップレベルに戻る |
| `click_element` | browser | 要素をクリック |
| `set_value` | all | 入力欄にテキストを入力 |
| `scroll` | browser | ページを上下にスクロール |
| `get_elements` | all | 操作可能な要素を取得（フィルタリング + ページネーション付き） |
| `get_accessibility_tree` | browser | アクセシビリティツリーを取得（ロールによるフィルタリング付き） |
| `get_screenshot` | all | スクリーンショットを撮影（自動最適化） |
| `get_cookies` | browser | すべてのCookieまたは特定のCookieを取得 |
| `set_cookie` | browser | ブラウザのCookieを設定 |
| `delete_cookies` | browser | すべてまたは1つのCookieを削除 |
| `emulate_device` | browser | モバイル/タブレットデバイスのビューポートをエミュレート |
| `execute_script` | all | JavaScript（ブラウザ）またはAppiumコマンド（モバイル）を実行 |
| `tap_element` | mobile | 要素または画面座標をタップ |
| `swipe` | mobile | 指定方向へのスワイプジェスチャー |
| `drag_and_drop` | mobile | 要素間または座標間でドラッグ |
| `get_contexts` | mobile | 利用可能なネイティブ/WebViewコンテキストを一覧表示 |
| `switch_context` | mobile | ネイティブとWebViewのコンテキストを切り替え |
| `rotate_device` | mobile | 縦向きまたは横向きに回転 |
| `hide_keyboard` | mobile | ソフトウェアキーボードを閉じる |
| `set_geolocation` | all | デバイスのGPS座標を上書き |
| `get_app_state` | mobile | アプリのライフサイクル状態を取得 |
| `list_apps` | cloud | アップロード済みのアプリを一覧表示（BrowserStack、Sauce Labs、TestMu、TestingBot） |
| `upload_app` | cloud | `.apk`/`.ipa`をクラウドプロバイダーにアップロード |

## MCPリソース

ツールに加えて、サーバーはライブセッションの状態をMCPリソースとして公開します。完全なリファレンスについては[Resources](./mcp/resources)を参照してください。

| リソースURI | 説明 |
|-------------|-------------|
| `wdio://sessions` | すべてのセッションのインデックス |
| `wdio://session/current/elements` | 操作可能な要素（スクリーンショットより推奨） |
| `wdio://session/current/screenshot` | base64形式のスクリーンショット |
| `wdio://session/current/accessibility` | アクセシビリティツリー |
| `wdio://session/current/cookies` | ブラウザのCookie |
| `wdio://session/current/tabs` | 開いているブラウザタブ |
| `wdio://session/current/contexts` | 利用可能なモバイルコンテキスト |
| `wdio://session/current/context` | アクティブなモバイルコンテキスト |
| `wdio://session/current/app-state/{bundleId}` | モバイルアプリのライフサイクル状態 |
| `wdio://session/current/geolocation` | 現在のGPS上書き設定 |
| `wdio://session/current/logs` | セッションログ（ブラウザコンソール、logcat、crashlog） |
| `wdio://session/current/capabilities` | 生のWebDriver capabilities |
| `wdio://session/current/code` | 生成されたWebdriverIO JS |
| `wdio://session/current/steps` | セッションのステップログ |
| `wdio://session/{sessionId}/code` | 過去のセッションの生成されたJS |
| `wdio://session/{sessionId}/steps` | 過去のセッションのステップ |
| `wdio://browserstack/local-binary` | BrowserStack Localのセットアップ手順 |
| `wdio://saucelabs/local-binary` | Sauce Connect Proxyのセットアップ手順 |
| `wdio://testmu/local-binary` | TestMu Tunnelのセットアップ手順 |
| `wdio://testingbot/local-binary` | TestingBot Tunnelのセットアップ手順 |

## 自動処理

### パーミッション

デフォルトでは、MCPサーバーはアプリのパーミッションを自動的に許可する（`autoGrantPermissions: true`）ため、自動化中にパーミッションダイアログを手動で処理する必要がありません。

### システムアラート

システムアラート（「通知を許可しますか？」など）は、デフォルトで自動的に承認されます（`autoAcceptAlerts: true`）。`autoDismissAlerts: true`を設定することで、代わりに拒否するように構成できます。

## トランスポート

デフォルトでは、サーバーは**stdio**上で実行されます（AIクライアントによってサブプロセスとして起動されます）。サブプロセスベースのMCPをサポートしていないクライアント（llama.cpp、Codexのセキュアモード）の場合は、**HTTPトランスポート**を使用してください：

```bash
npx @wdio/mcp --http --port 3000
```

`--allowedHosts`や`--allowedOrigins`を含むすべてのオプションについては[Transport](./mcp/transport)を参照してください。

## パフォーマンスの最適化

MCPサーバーは、AIアシスタントとの効率的な通信のために最適化されています：

-   **TOONフォーマット**：トークン使用量を最小限に抑えるためにToken-Oriented Object Notationを使用
-   **XML解析**：モバイルの要素検出は2回のHTTP呼び出しで実行（従来は600回以上）
-   **スクリーンショットの圧縮**：画像は最大1MBに自動圧縮
-   **ビューポートによるフィルタリング**：デフォルトでは表示されている要素のみを返す
-   **ページネーション**：大きな要素リストをページ分割してレスポンスサイズを削減可能

## エラー処理

すべてのツールは堅牢なエラー処理を備えて設計されています：

-   エラーはテキストコンテンツとして返され（スローされることはありません）、MCPプロトコルの安定性を維持します
-   わかりやすいエラーメッセージが問題の診断に役立ちます
-   個々の操作が失敗しても、セッションの状態は保持されます

## ユースケース

### 品質保証

-   AIによるテストケースの実行
-   スクリーンショットを使用したビジュアルリグレッションテスト
-   アクセシビリティツリー分析によるアクセシビリティ監査

### Webスクレイピングとデータ抽出

-   複雑な複数ページのフローのナビゲーション
-   動的コンテンツからの構造化データの抽出
-   認証とセッション管理の処理

### モバイルアプリのテスト

-   クロスプラットフォームのテスト自動化（iOS + Android）
-   オンボーディングフローの検証
-   ディープリンクとナビゲーションのテスト

### 統合テスト

-   エンドツーエンドのワークフローテスト
-   API + UIの統合検証
-   マルチプラットフォームの一貫性チェック

## トラブルシューティング

### ブラウザが起動しない

-   対象のブラウザがインストールされていることを確認してください
-   デフォルトのデバッグポート（9222）を他のプロセスが使用していないか確認してください
-   表示に問題がある場合はヘッドレスモードを試してください

### Appiumへの接続に失敗する

-   Appiumサーバーが実行中であることを確認してください（`appium`）
-   `appiumConfig`のAppiumのホストとポートを確認してください
-   適切なドライバーがインストールされていることを確認してください（`appium driver list`）

### iOSシミュレーターの問題

-   Xcodeがインストールされ、最新であることを確認してください
-   シミュレーターが利用可能であることを確認してください（`xcrun simctl list devices`）
-   実機の場合は、UDIDが正しいことを確認してください

### Androidエミュレーターの問題

-   Android SDKが正しく構成されていることを確認してください
-   エミュレーターが実行中であることを確認してください（`adb devices`）
-   `ANDROID_HOME`環境変数が設定されていることを確認してください

## リソース

-   [Tools Reference](./mcp/tools) - 利用可能なツールの完全なリスト
-   [Resources Reference](./mcp/resources) - ライブセッション状態のためのMCPリソース
-   [Selectors Guide](./mcp/selectors) - セレクター構文のドキュメント
-   [Configuration](./mcp/configuration) - 設定オプション
-   [Transport](./mcp/transport) - HTTPトランスポートのセットアップ
-   [Cloud Providers](./mcp/cloud-providers) - BrowserStack、Sauce Labs、TestMu、TestingBotのクラウド統合
-   [FAQ](./mcp/faq) - よくある質問
-   [GitHub Repository](https://github.com/webdriverio/mcp) - ソースコードとIssue
-   [NPM Package](https://www.npmjs.com/package/@wdio/mcp) - npm上のパッケージ
-   [Model Context Protocol](https://modelcontextprotocol.io/) - MCP仕様