---
id: tools
title: ツール
description: "WebdriverIO MCP サーバーが提供する、セッション、ナビゲーション、要素操作、スクリーンショット、ジェスチャー、アプリライフサイクル向けのツールを確認できます。"
---

WebdriverIO MCP サーバーは、機能別に整理された 29 個のツールを提供します。**ブラウザ専用**と記されたツールは `platform: "browser"` セッションが必要です。**モバイル専用**と記されたツールは `platform: "ios"` または `platform: "android"` が必要です。

## セッション管理

### `start_session`

新しいブラウザまたはモバイルの自動化セッションを開始します。同時にアクティブにできるセッションは 1 つのみで、新しいセッションを開始すると既存のセッションは閉じられます。

| パラメーター              | 型                                                                   | 必須     | デフォルト          | 説明                                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------- | ------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `platform`             | `"browser" \| "ios" \| "android"`                                      | ✓            | —                | セッションのプラットフォーム                                                                                                                  |
| `provider`             | `"local" \| "browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | —            | `"local"`        | セッションのプロバイダー                                                                                                                  |
| `browser`              | `"chrome" \| "firefox" \| "edge" \| "safari"`                          | ブラウザのみ | —                | 起動するブラウザ                                                                                                                 |
| `browserVersion`       | string                                                                 | —            | latest           | ブラウザのバージョン（クラウドプロバイダーのみ、デフォルト: latest）                                                                           |
| `os`                   | string                                                                 | —            | —                | オペレーティングシステム（クラウドプロバイダーのみ、例: `"Windows"`、`"OS X"`）                                                               |
| `osVersion`            | string                                                                 | —            | —                | OS バージョン（クラウドプロバイダーのみ、例: `"11"`、`"Sequoia"`）                                                                       |
| `headless`             | boolean                                                                | —            | `true`           | ブラウザをヘッドレスで実行                                                                                                            |
| `windowWidth`          | number                                                                 | —            | `1920`           | ブラウザウィンドウの幅（400–3840）                                                                                                   |
| `windowHeight`         | number                                                                 | —            | `1080`           | ブラウザウィンドウの高さ（400–2160）                                                                                                  |
| `navigationUrl`        | string                                                                 | —            | —                | 開始後に移動する URL                                                                                                 |
| `deviceName`           | string                                                                 | モバイルのみ  | —                | デバイス/エミュレーター/シミュレーターの名前                                                                                                    |
| `platformVersion`      | string                                                                 | —            | —                | OS バージョン（例: `"17.0"`、`"14"`）                                                                                                |
| `appPath`              | string                                                                 | —            | —                | `.app` / `.apk` / `.ipa` へのパス                                                                                                  |
| `app`                  | string                                                                 | —            | —                | アプリ URL（BrowserStack の場合は `bs://...`、Sauce Labs の場合は `storage:filename=`、TestMu の場合は `lt://...`、TestingBot の場合は app_url）または custom_id |
| `automationName`       | `"XCUITest" \| "UiAutomator2"`                                         | —            | auto             | 自動化ドライバー                                                                                                                 |
| `autoGrantPermissions` | boolean                                                                | —            | `true`           | アプリの権限を自動的に付与                                                                                                        |
| `autoAcceptAlerts`     | boolean                                                                | —            | `true`           | アラートを自動的に承認                                                                                                                |
| `autoDismissAlerts`    | boolean                                                                | —            | `false`          | アラートを自動的に閉じる                                                                                                               |
| `appWaitActivity`      | string                                                                 | —            | —                | 起動時に待機する Android アクティビティ                                                                                            |
| `udid`                 | string                                                                 | —            | —                | iOS 実機の UDID                                                                                                              |
| `noReset`              | boolean                                                                | —            | —                | セッション間でアプリデータを保持                                                                                                |
| `fullReset`            | boolean                                                                | —            | —                | セッションの前後にアプリをアンインストール                                                                                                |
| `newCommandTimeout`    | number                                                                 | —            | `300`            | Appium コマンドのタイムアウト（秒）                                                                                                  |
| `attach`               | boolean                                                                | —            | `false`          | CDP 経由で既存の Chrome にアタッチ                                                                                                 |
| `attachConfig`         | object                                                                 | —            | —                | CDP 接続: `{ port: 9222, host: "localhost" }`                                                                               |
| `appiumConfig`         | object                                                                 | —            | —                | Appium サーバー: `{ host, port, path }`                                                                                             |
| `tunnel`               | `boolean \| "external"`                                                | —            | `false`          | ローカルトンネルルーティング（クラウドプロバイダー）。`true` = 自動起動、`"external"` = トンネルが外部で既に実行中                     |
| `reporting`            | object                                                                 | —            | —                | クラウドプロバイダーのレポートラベル: `{ project, build, session }`                                                                    |
| `trace`                | boolean                                                                | —            | `false`          | トレース記録を有効化 — Playwright 互換の `.trace` zip を生成                                                            |
| `region`               | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`                  | —            | `"eu-central-1"` | Sauce Labs のデータセンターリージョン                                                                                                     |
| `tunnelName`           | string                                                                 | —            | —                | トンネル識別名（`tunnel: "external"` の場合は必須）                                                                        |
| `capabilities`         | object                                                                 | —            | —                | マージする追加の生の capabilities                                                                                              |

```js
// ローカルの Chrome ブラウザ
start_session({ platform: "browser", browser: "chrome" })

// iOS シミュレーター
start_session({ platform: "ios", deviceName: "iPhone 16", platformVersion: "18.0", appPath: "/path/to/app.app" })

// BrowserStack Android
start_session({ platform: "android", provider: "browserstack", deviceName: "Samsung Galaxy S24", app: "bs://abc123" })

// Sauce Labs iOS
start_session({ platform: "ios", provider: "saucelabs", deviceName: "iPhone 15", platformVersion: "17.0", app: "storage:filename=MyApp.ipa" })

// TestMu ブラウザ
start_session({ platform: "browser", provider: "testmu", browser: "chrome", os: "Windows", osVersion: "11" })

// TestingBot ブラウザ
start_session({ platform: "browser", provider: "testingbot", browser: "chrome", os: "Windows", osVersion: "11" })

// トンネルを使用するクラウドプロバイダー
start_session({ platform: "browser", provider: "browserstack", browser: "chrome", tunnel: true })

// 既存の Chrome にアタッチ（launch_chrome の後）
start_session({ platform: "browser", browser: "chrome", attach: true })
```

---

### `close_session`

現在のセッションを閉じるか、セッションからデタッチします。

| パラメーター | 型    | 必須 | デフォルト | 説明                                                    |
| --------- | ------- | -------- | ------- | -------------------------------------------------------------- |
| `detach`  | boolean | —        | `false` | 終了せずに切断（Appium 上のアプリの状態を保持） |

`noReset: true` で開始したセッションは、デフォルトで自動的にデタッチされます。

---

### `launch_chrome`

`start_session({ attach: true })` が接続できるように、リモートデバッグを有効にした Chrome インスタンスを準備します。2 つのモードがあります:

- `newInstance`（デフォルト）: 別のプロファイルディレクトリを使用して、既存の Chrome と並行して Chrome を開きます。現在のセッションには影響しません。
- `freshSession`: 空のプロファイル（Cookie なし、ログインなし）で Chrome を起動します。Cookie とログイン情報を引き継ぐには `copyProfileFiles: true` を使用します。

| パラメーター          | 型                              | 必須 | デフォルト         | 説明                                                      |
| ------------------ | --------------------------------- | -------- | --------------- | ---------------------------------------------------------------- |
| `port`             | number                            | —        | `9222`          | リモートデバッグポート                                            |
| `mode`             | `"newInstance" \| "freshSession"` | —        | `"newInstance"` | 起動モード                                                      |
| `copyProfileFiles` | boolean                           | —        | `false`         | Chrome の Default プロファイル（Cookie、ログイン情報）をデバッグセッションにコピー |

このツールが成功したら、`start_session({ platform: "browser", browser: "chrome", attach: true })` を呼び出します。

## ナビゲーションとタブ

### `navigate`

現在のタブで URL を読み込み、ページの load イベントを待機します。ページの状態（DOM、JS ランタイム）はリセットされます。**ブラウザ専用。**

| パラメーター | 型   | 必須 | 説明        |
| --------- | ------ | -------- | ------------------ |
| `url`     | string | ✓        | 移動先の URL |

---

### `get_tabs`

すべてのブラウザタブを、ハンドル、タイトル、URL、アクティブかどうかとともに一覧表示します。対象のハンドルを見つけるために `switch_tab` の前に使用します。**ブラウザ専用。**

パラメーターはありません。

---

### `switch_tab`

ウィンドウハンドルまたは 0 始まりのインデックスでブラウザタブにフォーカスします。以降のすべてのツール呼び出しは、新しくアクティブになったタブで動作します。**ブラウザ専用。**

| パラメーター | 型   | 必須 | 説明                |
| --------- | ------ | -------- | -------------------------- |
| `handle`  | string | —        | 切り替え先のウィンドウハンドル |
| `index`   | number | —        | 0 始まりのタブインデックス（≥ 0）    |

`handle` または `index` のいずれかを指定してください。ハンドルは `get_tabs` または `wdio://session/current/tabs` から取得できます。

---

### `switch_frame`

CSS/XPath セレクターで WebDriver のフレームコンテキストを iframe に切り替えます。セレクターを省略するとトップレベルに戻ります。変更は持続し、元に戻すまで以降の `click_element`、`set_value`、`get_elements` の呼び出しはすべて切り替えたフレーム内で動作します。iframe を最大 5 秒間待機します。**ブラウザ専用。**

| パラメーター  | 型   | 必須 | 説明                                                                            |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------------- |
| `selector` | string | —        | iframe 要素の CSS/XPath セレクター。省略するとトップレベルのフレームに戻ります。 |

```js
// iframe に切り替える
switch_frame({ selector: "#my-iframe" })

// iframe 内の要素を操作する
click_element({ selector: "button.submit" })

// トップレベルに戻る
switch_frame()
```

## 要素の操作

### `click_element`

要素が存在するまで待機し、表示領域までスクロールしてからクリックします。ブラウザとモバイルの両方で動作します。iOS では `tap_element` を推奨します。`click_element` はネイティブレイヤーで無視されることがあります。

| パラメーター      | 型    | 必須 | デフォルト | 説明                              |
| -------------- | ------- | -------- | ------- | ---------------------------------------- |
| `selector`     | string  | ✓        | —       | CSS、XPath、またはテキストセレクター             |
| `scrollToView` | boolean | —        | `true`  | クリック前に要素を表示領域までスクロール |
| `timeout`      | number  | —        | —       | 最大待機時間（ms）                       |

---

### `set_value`

input または textarea をクリアし、指定されたテキストを入力します。既存の内容は常に置き換えられます。

| パラメーター      | 型    | 必須 | デフォルト | 説明                            |
| -------------- | ------- | -------- | ------- | -------------------------------------- |
| `selector`     | string  | ✓        | —       | CSS、XPath、またはテキストセレクター           |
| `value`        | string  | ✓        | —       | 入力するテキスト                           |
| `scrollToView` | boolean | —        | `true`  | 入力前に要素を表示領域までスクロール |
| `timeout`      | number  | —        | —       | 最大待機時間（ms）                     |

---

### `scroll`

ページを指定したピクセル数だけスクロールします。**ブラウザ専用。** モバイルでは `swipe` を使用してください。

| パラメーター   | 型             | 必須 | デフォルト | 説明      |
| ----------- | ---------------- | -------- | ------- | ---------------- |
| `direction` | `"up" \| "down"` | ✓        | —       | スクロール方向 |
| `pixels`    | number           | —        | `500`   | スクロールするピクセル数 |

## 要素の分析

### `get_elements`

現在のページ上の操作可能な要素を、すぐに使えるセレクターとともに返します。常時の状況把握には `wdio://session/current/elements` リソースを推奨します。フィルタリングやページネーションが必要な場合にこのツールを使用してください。

| パラメーター           | 型    | 必須 | デフォルト | 説明                                 |
| ------------------- | ------- | -------- | ------- | ------------------------------------------- |
| `inViewportOnly`    | boolean | —        | `false` | ビューポート内に表示されている要素のみを返す       |
| `includeContainers` | boolean | —        | `false` | コンテナ要素（div、section）を含める |
| `includeBounds`     | boolean | —        | `false` | バウンディングボックスの座標を含める            |
| `limit`             | number  | —        | `0`     | 返す要素の最大数（0 = 無制限）      |
| `offset`            | number  | —        | `0`     | スキップする要素数（ページネーション）               |

---

### `get_accessibility_tree`

ページのアクセシビリティツリーを、ロール、名前、セレクターとともに返します。フィルタリングとページネーションをサポートします。**ブラウザ専用。**

| パラメーター | 型     | 必須 | デフォルト | 説明                                                |
| --------- | -------- | -------- | ------- | ---------------------------------------------------------- |
| `limit`   | number   | —        | `0`     | 返すノードの最大数（0 = 無制限）                        |
| `offset`  | number   | —        | `0`     | スキップするノード数（ページネーション）                                 |
| `roles`   | string[] | —        | —       | ARIA ロールでフィルタリング（例: `["button", "link", "heading"]`） |

## スクリーンショット

### `get_screenshot`

現在のページまたは画面のスクリーンショットを撮影します。モデルのコンテキスト制限内に収まるよう自動的にリサイズおよび圧縮された（最大 1 MB、最大 2000px）、base64 エンコードされた画像を返します。

パラメーターはありません。要素の検出には、スクリーンショットよりも `wdio://session/current/elements` を推奨します。より高速で、使用するトークンもはるかに少なくて済みます。スクリーンショットは、視覚的な確認やレイアウトのデバッグに使用してください。

## Cookie の管理

### `get_cookies`

現在のセッションのすべての Cookie、または名前で指定した単一の Cookie を返します。**ブラウザ専用。**

| パラメーター | 型   | 必須 | 説明                              |
| --------- | ------ | -------- | ---------------------------------------- |
| `name`    | string | —        | Cookie 名。省略するとすべての Cookie を返します。 |

---

### `set_cookie`

ブラウザの Cookie を設定します。ブラウザは既に対象ドメイン上にある必要があります — クロスドメインで Cookie を設定することはできません。ログインフローを経ずにセッショントークンや機能フラグを注入するために使用します。**ブラウザ専用。**

| パラメーター  | 型                          | 必須 | 説明                                |
| ---------- | ----------------------------- | -------- | ------------------------------------------ |
| `name`     | string                        | ✓        | Cookie 名                                |
| `value`    | string                        | ✓        | Cookie の値                               |
| `domain`   | string                        | —        | Cookie のドメイン（デフォルトは現在のドメイン） |
| `path`     | string                        | —        | Cookie のパス（デフォルトは `/`）              |
| `expiry`   | number                        | —        | Unix タイムスタンプ（秒）による有効期限         |
| `httpOnly` | boolean                       | —        | HttpOnly フラグ                              |
| `secure`   | boolean                       | —        | Secure フラグ                                |
| `sameSite` | `"strict" \| "lax" \| "none"` | —        | SameSite 属性                         |

---

### `delete_cookies`

すべての Cookie、または名前で指定した特定の Cookie を削除します。**ブラウザ専用。**

| パラメーター | 型   | 必須 | 説明                                        |
| --------- | ------ | -------- | -------------------------------------------------- |
| `name`    | string | —        | 削除する Cookie 名。省略するとすべての Cookie を削除します。 |

## タッチジェスチャー（モバイル）

### `tap_element`

一致した要素に対して `element.tap()` を呼び出すか、画面上の絶対座標をタップします。iOS で `click_element` が無視される場合に使用します。タップは iOS が反応するネイティブジェスチャーです。**モバイル専用。**

| パラメーター  | 型   | 必須 | 説明                                  |
| ---------- | ------ | -------- | -------------------------------------------- |
| `selector` | string | —        | 要素セレクター                             |
| `x`        | number | —        | 画面タップの X 座標（セレクターがない場合） |
| `y`        | number | —        | 画面タップの Y 座標（セレクターがない場合） |

`selector` または `x`/`y` 座標のいずれかを指定してください。

---

### `swipe`

全画面のスワイプジェスチャーを実行します。方向はコンテンツの移動方向です（例: `"up"` はリストを上方向にスクロールします）。表示範囲を超えてスクロールする場合に使用します。特定の要素を移動するには `drag_and_drop` を使用してください。**モバイル専用。** ブラウザでは `scroll` を使用してください。

| パラメーター   | 型                                  | 必須 | デフォルト        | 説明                       |
| ----------- | ------------------------------------- | -------- | -------------- | --------------------------------- |
| `direction` | `"up" \| "down" \| "left" \| "right"` | ✓        | —              | スワイプ方向                   |
| `duration`  | number                                | —        | `500`          | スワイプ時間（ms、100–5000）     |
| `percent`   | number                                | —        | `0.5` / `0.95` | スワイプする画面の割合（0–1） |

---

### `drag_and_drop`

要素を別の要素または座標へドラッグします。**モバイル専用。**

| パラメーター        | 型   | 必須 | デフォルト | 説明                            |
| ---------------- | ------ | -------- | ------- | -------------------------------------- |
| `sourceSelector` | string | ✓        | —       | ドラッグする元の要素                 |
| `targetSelector` | string | —        | —       | ドロップ先の要素            |
| `x`              | number | —        | —       | ターゲットの X オフセット（targetSelector がない場合） |
| `y`              | number | —        | —       | ターゲットの Y オフセット（targetSelector がない場合） |
| `duration`       | number | —        | —       | ドラッグ時間（ms、100–5000）           |

## コンテキストの切り替え（モバイル）

### `get_contexts`

利用可能な自動化コンテキストと、現在アクティブなコンテキストを返します。`NATIVE_APP` および `WEBVIEW_*` のターゲットを調べるために、`switch_context` の前に使用します。**モバイル専用。**

パラメーターはありません。

---

### `switch_context`

ハイブリッドモバイルアプリで、ネイティブとウェブビューの自動化コンテキストを切り替えます。埋め込みウェブビュー内で CSS/XPath セレクターを使用する前に必要です。**モバイル専用。**

| パラメーター | 型   | 必須 | 説明                                                    |
| --------- | ------ | -------- | -------------------------------------------------------------- |
| `context` | string | ✓        | コンテキスト名（例: `"NATIVE_APP"`、`"WEBVIEW_com.example.app"`） |

利用可能なコンテキスト名は `get_contexts` または `wdio://session/current/contexts` から取得できます。

```js
// 1. 利用可能なものを確認する
get_contexts()
// → { contexts: ["NATIVE_APP", "WEBVIEW_com.example.app"], currentContext: "NATIVE_APP" }

// 2. CSS/XPath を使うためにウェブビューに切り替える
switch_context({ context: "WEBVIEW_com.example.app" })

// 3. CSS セレクターでウェブビューの要素を操作する
click_element({ selector: "#login-button" })

// 4. ネイティブ UI のためにネイティブに戻る
switch_context({ context: "NATIVE_APP" })
```

## デバイス制御（モバイル）

### `rotate_device`

デバイスを縦向きまたは横向きに回転させ、OS の回転が完了するまで待機します。向きに依存するレイアウトのテストに使用します。**モバイル専用。**

| パラメーター     | 型                        | 必須 | 説明        |
| ------------- | --------------------------- | -------- | ------------------ |
| `orientation` | `"PORTRAIT" \| "LANDSCAPE"` | ✓        | 目的の向き |

---

### `hide_keyboard`

ソフトウェアキーボードを閉じます。テキスト入力後、次に必要な要素がキーボードで隠れている場合に呼び出します。既に非表示の場合は何もしません。**モバイル専用。**

パラメーターはありません。

---

### `set_geolocation`

セッションのデバイスの GPS 座標を上書きします。Web では `navigator.geolocation` に、モバイルでは位置情報サービスに影響します。事前にアプリへ位置情報の権限を付与しておく必要があります。

| パラメーター   | 型   | 必須 | 説明             |
| ----------- | ------ | -------- | ----------------------- |
| `latitude`  | number | ✓        | 緯度（−90 〜 90）    |
| `longitude` | number | ✓        | 経度（−180 〜 180） |
| `altitude`  | number | —        | 高度（メートル）      |

## アプリのライフサイクル（モバイル）

### `get_app_state`

モバイルアプリの現在のライフサイクル状態を返します。**モバイル専用。**

| パラメーター  | 型   | 必須 | 説明                                                     |
| ---------- | ------ | -------- | --------------------------------------------------------------- |
| `bundleId` | string | ✓        | iOS のバンドル ID または Android のパッケージ名（例: `"com.example.app"`） |

`not installed`、`not running`、`background (suspended)`、`background`、`foreground` のいずれかを返します。

## ブラウザユーティリティ

### `emulate_device`

現在のブラウザセッションでモバイルまたはタブレットデバイスをエミュレートします（ビューポート、DPR、ユーザーエージェント、タッチイベントを設定）。BiDi 対応のセッションが必要です: `start_session({ capabilities: { webSocketUrl: true } })`。**ブラウザ専用。**

| パラメーター | 型   | 必須 | 説明                                                                                                             |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `device`  | string | —        | デバイスプリセット名（例: `"iPhone 15"`、`"Pixel 7"`）。省略するとプリセットを一覧表示します。`"reset"` を渡すとデスクトップのデフォルトに戻します。 |

---

### `execute_script`

ブラウザで JavaScript を実行するか、Appium 経由でモバイルコマンドを実行します。

| パラメーター | 型   | 必須 | 説明                                                   |
| --------- | ------ | -------- | ------------------------------------------------------------- |
| `script`  | string | ✓        | JS コード（ブラウザ）または `"mobile: pressKey"` のような Appium コマンド |
| `args`    | any[]  | —        | スクリプトまたはコマンドに渡す引数                     |

**ブラウザ:** 値を取得するには `return` を使用します。

```javascript
// ページタイトルを取得する
execute_script({ script: "return document.title" })

// 要素を表示領域までスクロールする
execute_script({ script: "arguments[0].scrollIntoView()", args: ["#my-element"] })
```

**モバイル（Appium）:** `mobile: <command>` 構文を使用します。

```javascript
// Android の戻るキーを押す
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// アプリをアクティブ化する（iOS/Android）
execute_script({ script: "mobile: activateApp", args: [{ bundleId: "com.example.app" }] })

// ディープリンク（iOS）
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://route", bundleId: "com.example.app" }] })
```

## クラウドプロバイダー

### `list_apps`

クラウドプロバイダー（BrowserStack App Automate、Sauce Labs App Storage、TestMu、または TestingBot Storage）にアップロードされたアプリを一覧表示します。プロバイダー固有の認証情報は環境変数から読み取ります。

| パラメーター          | 型                                                        | 必須 | デフォルト          | 説明                              |
| ------------------ | ----------------------------------------------------------- | -------- | ---------------- | ---------------------------------------- |
| `provider`         | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓        | —                | クラウドプロバイダー                           |
| `sortBy`           | `"app_name" \| "uploaded_at"`                               | —        | `"uploaded_at"`  | 並び順                               |
| `organizationWide` | boolean                                                     | —        | `false`          | （BrowserStack のみ）組織全体のアップロードを一覧表示 |
| `limit`            | number                                                      | —        | `20`             | 最大結果数                              |
| `region`           | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —        | `"eu-central-1"` | Sauce Labs のリージョン                        |

```js
// 4 つのプロバイダーすべてで一覧表示する
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs", region: "us-west-1" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

---

### `upload_app`

ローカルの `.apk` または `.ipa` をクラウドプロバイダー（BrowserStack、Sauce Labs、TestMu、または TestingBot）にアップロードします。`start_session` で使用するアプリ URL を返します。

| パラメーター  | 型                                                        | 必須 | デフォルト          | 説明                                      |
| ---------- | ----------------------------------------------------------- | -------- | ---------------- | ------------------------------------------------ |
| `provider` | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓        | —                | クラウドプロバイダー                                   |
| `path`     | string                                                      | ✓        | —                | `.apk` または `.ipa` ファイルへの絶対パス       |
| `customId` | string                                                      | —        | —                | 後でアプリを参照するための任意のカスタム ID |
| `region`   | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —        | `"eu-central-1"` | Sauce Labs のリージョン                                |

```js
// 各プロバイダーにアップロードする
upload_app({ provider: "browserstack", path: "/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", region: "us-west-1" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```