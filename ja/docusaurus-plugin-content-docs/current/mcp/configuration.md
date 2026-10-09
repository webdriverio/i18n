---
id: configuration
title: 設定
description: "セッション、ブラウザ、モバイル、クラウドプロバイダー、要素検出、Appiumのオプションを含む、WebdriverIO MCPサーバーの設定方法を説明します。"
---

このページでは、WebdriverIO MCPサーバーのすべての設定オプションについて説明します。

## MCPサーバーの設定

MCPサーバーは、設定ファイルまたはコマンドを通じて設定します。

### 基本設定

MCP設定ファイル（例：`./.mcp.json`）を編集し、以下を追加します：

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

## セッションオプション

すべてのセッションオプションは`start_session`ツールに渡されます。ブラウザセッションとモバイルセッションには単一の統合ツールが用意されており、`platform`パラメータによってセッションの種類が決まります。

### 共通オプション

#### `platform`

<Option type={`"browser" | "ios" | "android"`} required="Yes">

自動化するプラットフォームです。

</Option>
#### `provider`

<Option type={`"local" | "browserstack" | "saucelabs" | "testmu" | "testingbot"`} default={`"local"`} required="No">

セッションを実行する場所です。リモートデバイスを使用する場合はクラウドプロバイダー名を指定します。各プロバイダーにはそれぞれ専用の環境変数が必要です。詳細は[クラウドプロバイダー](./cloud-providers)を参照してください。

</Option>
## ブラウザセッションオプション

`platform: "browser"`セッション用のオプションです。

### `browser`

<Option type={`"chrome" | "firefox" | "edge" | "safari"`} required="Yes (for browser platform)">

起動するブラウザです。

</Option>
### `browserVersion`

<Option type="string" default={`"latest"`} required="No">

ブラウザのバージョンです。クラウドプロバイダーのみ（デフォルト：latest）。

</Option>
### `os` / `osVersion`

<Option type="string" required="No">

クラウドプロバイダーのブラウザセッションで使用するオペレーティングシステムです。例：`os: "Windows"`, `osVersion: "11"` または `os: "OS X"`, `osVersion: "Sequoia"`。

</Option>
### `headless`

<Option type="boolean" default="true" required="No">

ブラウザをヘッドレスモード（ウィンドウ非表示）で実行します。ブラウザを表示するには`false`に設定します。

</Option>
### `windowWidth`

<Option type="number" default="1920" required="No">

-   **範囲：** `400` - `3840`

ブラウザウィンドウの初期幅（ピクセル単位）です。

</Option>
### `windowHeight`

<Option type="number" default="1080" required="No">

-   **範囲：** `400` - `2160`

ブラウザウィンドウの初期高さ（ピクセル単位）です。

</Option>
### `navigationUrl`

<Option type="string" required="No">

ブラウザ起動直後に移動するURLです。`start_session`の後に`navigate`を個別に呼び出すよりも効率的です。

</Option>
### `attach`

<Option type="boolean" default="false" required="No">

新しいChromeインスタンスを起動する代わりに、既存のChromeインスタンスにアタッチします。`launch_chrome`の後に使用して、CDP経由で接続します。

</Option>
### `attachConfig`

<Option type={`{ port?: number; host?: string }`} default={`{ port: 9222, host: "localhost" }`} required="No">

Chromeリモートデバッグの接続設定です。`attach: true`の場合にのみ適用されます。

</Option>
## モバイルセッションオプション

`platform: "ios"`または`platform: "android"`セッション用のオプションです。

### `deviceName`

<Option type="string" required="Yes (for mobile platforms)">

デバイス、シミュレーター、またはエミュレーターの名前です。

**例：**
-   iOSシミュレーター：`"iPhone 16"`、`"iPad Air (5th generation)"`
-   Androidエミュレーター：`"Pixel 7"`、`"Nexus 5X"`
-   実機：システムに表示されるデバイス名

</Option>
### `platformVersion`

<Option type="string" required="No">

デバイス/シミュレーター/エミュレーターのOSバージョンです（例：iOSの場合は`"18.0"`、Androidの場合は`"14"`）。

</Option>
### `automationName`

<Option type={`"XCUITest" | "UiAutomator2"`} required="No">

自動化ドライバーです。デフォルトはiOSでは`XCUITest`、Androidでは`UiAutomator2`です。

</Option>
### `udid`

<Option type="string" required="No (Required for real iOS devices)">

一意のデバイス識別子（Unique Device Identifier）です。iOS実機の場合は必須です（40文字の識別子）。

**UDIDの確認方法：**
-   **iOS：** デバイスを接続し、Finderを開いてデバイスをクリック → シリアル番号（クリックするとUDIDが表示されます）
-   **Android：** ターミナルで`adb devices`を実行

</Option>
### `appPath`

<Option type="string" required="No">

インストールして起動するアプリケーションファイルへのパスです。

**サポートされている形式：**
-   iOSシミュレーター：`.app`ディレクトリ
-   iOS実機：`.ipa`ファイル
-   Android：`.apk`ファイル

`appPath`を指定するか、すでに実行中のアプリに接続するために`noReset: true`を指定する必要があります。

</Option>
### `app`

<Option type="string" required="No">

クラウドプロバイダーのアプリURL（BrowserStackの場合は`bs://...`、Sauce Labsの場合は`storage:filename=`、TestMuの場合は`lt://...`、TestingBotの場合はapp_url）または`customId`です。クラウドのモバイルセッションでは`appPath`の代わりに使用します。

</Option>
### `appWaitActivity`

<Option type="string" required="No (Android only)">

アプリ起動時に待機するアクティビティです。指定しない場合は、アプリのメイン/ランチャーアクティビティが使用されます。

**例：** `"com.example.app.MainActivity"`

</Option>
### セッション状態オプション

#### `noReset`

<Option type="boolean" required="No">

セッション間でアプリの状態を保持します。`true`の場合：
-   アプリのデータ（ログイン状態、設定など）が保持されます
-   セッションはクローズではなく**デタッチ**されます（アプリは実行されたまま）
-   `appPath`なしで使用して、すでに実行中のアプリに接続できます

</Option>
#### `fullReset`

<Option type="boolean" required="No">

セッション開始前にアプリを完全にリセットします：
-   iOS：アプリをアンインストールして再インストールします
-   Android：アプリのデータとキャッシュをクリアします

アプリの状態を完全に保持するには、`fullReset: false`と`noReset: true`を設定します。

</Option>
### セッションタイムアウト

#### `newCommandTimeout`

<Option type="number" default="300" required="No">

Appiumがセッションを終了する前に新しいコマンドを待機する時間（秒単位）です。長時間のデバッグセッションでは値を増やしてください。

</Option>
### 自動処理

#### `autoGrantPermissions`

<Option type="boolean" default="true" required="No">

インストール/起動時にアプリの権限（カメラ、マイク、位置情報など）を自動的に付与します。

:::note Androidのみ
このオプションは主にAndroidに影響します。iOSの権限はシステムの制限により、別の方法で処理する必要があります。
:::

</Option>
#### `autoAcceptAlerts`

<Option type="boolean" default="true" required="No">

自動化中にシステムアラート（ダイアログ）を自動的に承認します（「通知を許可しますか？」など）。

</Option>
#### `autoDismissAlerts`

<Option type="boolean" default="false" required="No">

システムアラートを承認する代わりに閉じます。`true`の場合、`autoAcceptAlerts`よりも優先されます。

</Option>
### Appiumサーバー接続

`appiumConfig`を使用して、セッションごとにAppiumサーバー接続を上書きできます：

```js
start_session({
  platform: "ios",
  deviceName: "iPhone 16",
  appPath: "/path/to/app.app",
  appiumConfig: { host: "192.168.1.100", port: 4724, path: "/wd/hub" }
})
```

#### `appiumConfig`

<Option type={`{ host?: string; port?: number; path?: string }`} required="No">

Appiumサーバーの接続設定です。デフォルトは`{ host: "127.0.0.1", port: 4723, path: "/" }`です。

</Option>
## クラウドプロバイダーオプション

### 認証情報

各クラウドプロバイダーには、それぞれ専用の環境変数が必要です：

| プロバイダー | ユーザー名の変数        | アクセスキーの変数        |
| ------------ | ----------------------- | ------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY` |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`        |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`       |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`       |

MCPサーバーを起動する前にこれらを設定してください。

### `region`

<Option type={`"us-west-1" | "eu-central-1" | "apac-southeast-1"`} default={`"eu-central-1"`} required="No">

Sauce Labsのデータセンターリージョンです。他のプロバイダーでは無視されます。

</Option>
### `tunnel`

<Option type={`boolean | "external"`} default="false" required="No">

クラウドプロバイダーのセッションでローカルトンネルルーティングを有効にします（localhost、ステージング環境、内部サービスへのアクセス）。

-   `true` — セッション前にトンネルを自動的に開始し、クローズ時に停止します
-   `"external"` — トンネルがすでに外部で実行されている場合に使用します。プロバイダーに適したフラグのみを設定します

`true`を使用する前に、プロバイダーのlocal-binaryリソース（`wdio://browserstack/local-binary`、`wdio://saucelabs/local-binary`、`wdio://testmu/local-binary`、または`wdio://testingbot/local-binary`）を読み、お使いのOSとアーキテクチャに固有のセットアップ手順を確認してください。

</Option>
### `tunnelName`

<Option type="string" required="No">

トンネルの識別名です。`tunnel: "external"`の場合、実行中のトンネルと一致させるために必須です。`tunnel: true`の場合、指定しなければ一意の名前が自動生成されます。

</Option>
### `reporting`

<Option type={`{ project?: string; build?: string; session?: string }`} required="No">

プロバイダーのダッシュボードに表示されるクラウドプロバイダーのセッションラベルです。BrowserStack、Sauce Labs、TestMu、TestingBotのすべてで同じように動作します。

</Option>
### `trace`

<Option type="boolean" default="false" required="No">

トレース記録を有効にします。`close_session`時に、Playwright互換の`.trace` zipファイルが`.trace/`に保存されます。トレースは[player.vibium.dev](https://player.vibium.dev)で閲覧できます。

</Option>
## 要素検出オプション

`get_elements`ツール用のオプションです。

### `inViewportOnly`

<Option type="boolean" default="false" required="No">

現在のビューポート内に表示されている要素のみを返します。長いページで結果を減らすには`true`に設定します。

</Option>
### `includeContainers`

<Option type="boolean" default="false" required="No">

コンテナ/レイアウト要素を結果に含めます：

**Androidのコンテナ：** `ViewGroup`、`FrameLayout`、`LinearLayout`、`RelativeLayout`、`ConstraintLayout`、`ScrollView`、`RecyclerView`

**iOSのコンテナ：** `View`、`StackView`、`CollectionView`、`ScrollView`、`TableView`

</Option>
### `includeBounds`

<Option type="boolean" default="false" required="No">

要素のバウンディングボックス座標（x、y、width、height）をレスポンスに含めます。

</Option>
### ページネーション

#### `limit`

<Option type="number" default="0 (unlimited)" required="No">

返す要素の最大数です。

</Option>
#### `offset`

<Option type="number" default="0" required="No">

結果を返す前にスキップする要素の数です。

**例：** 21〜40番目の要素を取得：
```text
Get elements with limit 20 and offset 20
```

</Option>
## アクセシビリティツリーオプション

`get_accessibility_tree`ツール（ブラウザのみ）用のオプションです。

### `limit`

<Option type="number" default="0 (unlimited)" required="No">

返すノードの最大数です。

</Option>
### `offset`

<Option type="number" default="0" required="No">

ページネーションのためにスキップするノードの数です。

</Option>
### `roles`

<Option type="string[]" default="All roles" required="No">

特定のアクセシビリティロールに絞り込みます。

**一般的なロール：** `button`、`link`、`textbox`、`checkbox`、`radio`、`heading`、`img`、`listitem`

**例：** ボタンとリンクのみを取得：
```text
Get accessibility tree filtered to button and link roles
```

</Option>
## スクリーンショット

`get_screenshot`ツールはパラメータを取りません。スクリーンショットは自動的に処理されます：

| 最適化           | 値       | 説明                                                         |
| ---------------- | -------- | ------------------------------------------------------------ |
| 最大寸法         | 2000px   | 2000pxより大きい画像は縮小されます                           |
| 最大ファイルサイズ | 1MB      | 画像は1MB未満に収まるよう圧縮されます                        |
| 形式             | PNG/JPEG | 最大圧縮のPNG。サイズ上必要な場合はJPEG                      |

## セッションの動作

### セッションの種類

| 種類      | 説明                    | 自動デタッチ                                    |
| --------- | ----------------------- | ----------------------------------------------- |
| `browser` | ブラウザセッション      | いいえ                                          |
| `ios`     | iOSアプリセッション     | はい（`noReset: true`または`appPath`なしの場合） |
| `android` | Androidアプリセッション | はい（`noReset: true`または`appPath`なしの場合） |

### シングルセッションモデル

MCPサーバーは**シングルセッションモデル**で動作します：

-   同時にアクティブにできるのは、ブラウザまたはアプリのいずれか1つのセッションのみです
-   新しいセッションを開始すると、現在のセッションはクローズ/デタッチされます
-   セッションの状態はツール呼び出し間でグローバルに維持されます

### デタッチとクローズ

| アクション     | `detach: false`（クローズ）      | `detach: true`（デタッチ）                         |
| -------------- | -------------------------------- | -------------------------------------------------- |
| ブラウザ       | ブラウザを完全に閉じます         | ブラウザを実行したまま、WebDriverを切断します      |
| モバイルアプリ | アプリを終了します               | アプリを現在の状態のまま実行し続けます             |
| ユースケース   | 次のセッションをクリーンな状態で開始 | 状態の保持、手動での検査                        |

## パフォーマンスに関する考慮事項

### ブラウザ自動化

-   **ヘッドレスモード**は高速ですが、視覚的な要素はレンダリングされません
-   **ウィンドウサイズを小さくする**と、スクリーンショットの取得時間が短縮されます
-   **要素検出**は単一のスクリプト実行で最適化されています
-   **スクリーンショットの最適化**により、効率的な処理のために画像は1MB未満に抑えられます

### モバイル自動化

-   **XMLページソースの解析**では、HTTP呼び出しはわずか2回です（従来の要素クエリでは600回以上）
-   **アクセシビリティIDセレクター**が最も高速で信頼性があります
-   **XPathセレクター**は最も低速です。最後の手段としてのみ使用してください
-   **ページネーション**（`limit`と`offset`）により、多数の要素がある画面でのトークン使用量を削減できます

### トークン使用量のヒント

| 設定                       | 効果                                                     |
| -------------------------- | -------------------------------------------------------- |
| `inViewportOnly: true`     | 画面外の要素を除外し、レスポンスサイズを削減します       |
| `includeContainers: false` | レイアウト要素（ViewGroupなど）を除外します              |
| `includeBounds: false`     | x/y/width/heightのデータを省略します                     |
| ページネーション付きの`limit` | すべての要素を一度に処理する代わりに、バッチ単位で処理します |

## Appiumサーバーのセットアップ

モバイル自動化を使用する前に、Appiumが正しく設定されていることを確認してください。

### 基本セットアップ

```sh
# Appiumをグローバルにインストール
npm install -g appium

# ドライバーをインストール
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# サーバーを起動
appium
```

### カスタムサーバー設定

```sh
# カスタムホストとポートで起動
appium --address 0.0.0.0 --port 4724

# ログ出力付きで起動
appium --log-level debug

# 特定のベースパスで起動
appium --base-path /wd/hub
```

### インストールの確認

```sh
# インストール済みのドライバーを確認
appium driver list --installed

# Appiumのバージョンを確認
appium --version

# 接続をテスト
curl http://localhost:4723/status
```

## 設定のトラブルシューティング

### MCPサーバーが起動しない

1. npm/npxがインストールされていることを確認します：`npm --version`
2. 手動で実行してみます：`npx @wdio/mcp`
3. ハーネスのログでエラーを確認します

### Appiumの接続の問題

1. Appiumが実行中であることを確認します：`curl http://localhost:4723/status`
2. `start_session`の`appiumConfig`がAppiumサーバーの設定と一致していることを確認します
3. ファイアウォールがAppiumポートでの接続を許可していることを確認します

### セッションが開始しない

1. **ブラウザ：** 対象のブラウザがインストールされていることを確認します
2. **iOS：** Xcodeとシミュレーターが利用可能であることを確認します
3. **Android：** `ANDROID_HOME`を確認し、エミュレーターが実行中であることを確認します
4. 詳細なエラーメッセージについては、Appiumサーバーのログを確認します

### セッションのタイムアウト

デバッグ中にセッションがタイムアウトする場合：
1. セッション開始時に`newCommandTimeout`を増やします
2. `noReset: true`を使用して、セッション間で状態を保持します
3. クローズ時に`detach: true`を使用して、アプリを実行したままにします