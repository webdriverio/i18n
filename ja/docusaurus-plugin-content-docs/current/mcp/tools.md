---
id: tools
title: ツール
---

以下のツールはWebdriverIO MCPサーバーを通じて利用できます。これらのツールにより、AIアシスタントはブラウザやモバイルアプリケーションを自動化することができます。

## セッション管理

### `start_browser`

Chromeブラウザセッションを起動します。

#### パラメーター

| パラメーター | 型 | 必須 | デフォルト | 説明 |
|-----------|------|-----------|---------|-------------|
| `headless` | boolean | いいえ | `false` | Chromeをヘッドレスモードで実行する |
| `windowWidth` | number | いいえ | `1920` | ブラウザウィンドウの幅 (400-3840) |
| `windowHeight` | number | いいえ | `1080` | ブラウザウィンドウの高さ (400-2160) |
| `navigationUrl` | string | いいえ | - | ブラウザ起動後に移動するURL |

#### 例

```
Start a browser with 1920x1080 resolution and navigate to webdriver.io
```

#### サポート

- デスクトップブラウザ

---

### `start_app_session`

Appiumを介してiOSまたはAndroidでモバイルアプリセッションを起動します。

#### パラメーター

| パラメーター | 型 | 必須 | デフォルト | 説明 |
|-----------|------|-----------|---------|-------------|
| `platform` | string | はい | - | 自動化するプラットフォーム: `iOS`または`Android` |
| `deviceName` | string | はい | - | デバイスまたはシミュレータ/エミュレータの名前 |
| `appPath` | string | いいえ* | - | アプリファイルへのパス (.app, .ipa, または .apk) |
| `platformVersion` | string | いいえ | - | OSバージョン (例: `17.0`, `14`) |
| `automationName` | string | いいえ | Auto | `XCUITest` (iOS), `UiAutomator2`または`Espresso` (Android) |
| `udid` | string | いいえ | - | 一意のデバイス識別子 (実機iOSデバイスでは必須) |
| `noReset` | boolean | いいえ | `false` | セッション間でアプリの状態を保持する |
| `fullReset` | boolean | いいえ | `true` | セッション前にアプリをアンインストールして再インストールする |
| `autoGrantPermissions` | boolean | いいえ | `true` | アプリのアクセス許可を自動的に許可する |
| `autoAcceptAlerts` | boolean | いいえ | `true` | システムアラートを自動的に承認する |
| `autoDismissAlerts` | boolean | いいえ | `false` | アラートを承認せずに却下する |
| `appWaitActivity` | string | いいえ | - | 起動時に待機するアクティビティ (Androidのみ) |
| `newCommandTimeout` | number | いいえ | `60` | 非アクティブ状態でセッションがタイムアウトするまでの秒数 |
| `appiumHost` | string | いいえ | `127.0.0.1` | Appiumサーバーのホスト名 |
| `appiumPort` | number | いいえ | `4723` | Appiumサーバーのポート |
| `appiumPath` | string | いいえ | `/` | Appiumサーバーのパス |

*`appPath`を提供するか、既に実行中のアプリに接続するには`noReset: true`が必要です。

#### 例

```
Start an iOS app session on iPhone 15 simulator with my app at /path/to/app.app
```

#### サポート

- iOSシミュレータ
- iOS実機
- Androidエミュレータ
- Android実機

---

### `close_session`

現在のブラウザまたはアプリセッションを閉じます。

#### パラメーター

| パラメーター | 型 | 必須 | デフォルト | 説明 |
|-----------|------|-----------|---------|-------------|
| `detach` | boolean | いいえ | `false` | セッションを閉じる代わりに切り離す（ブラウザ/アプリを実行したままにする） |

#### 注意

`noReset: true`または`appPath`なしのセッションは、状態を保持するために自動的に切り離されます。

#### サポート

- デスクトップブラウザ
- モバイルアプリ

---

## ナビゲーション

### `navigate`

URLに移動します。

#### パラメーター

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|-----------|-------------|
| `url` | string | はい | 移動先のURL |

#### 例

```
Navigate to https://webdriver.io
```

#### サポート

- デスクトップブラウザ

---

## 要素の操作

### `click_element`

セレクタで特定された要素をクリックします。

#### パラメーター

| パラメーター | 型 | 必須 | デフォルト | 説明 |
|-----------|------|-----------|---------|-------------|
| `selector` | string | はい | - | CSSセレクタ、XPath、またはモバイルセレクタ |
| `scrollToView` | boolean | いいえ | `true` | クリック前に要素を表示範囲内にスクロールする |
| `timeout` | number | いいえ | `3000` | 要素を待機する最大時間 (ミリ秒) |

#### 注意

- WebdriverIOのテキストセレクタをサポート: `button=Exact text`または`a*=Contains text`
- スクロール位置決めには中央揃えを使用します

#### 例

```
Click the element with selector "#submit-button"
```

#### サポート

- デスクトップブラウザ
- モバイルネイティブアプリ

---

### `set_value`

入力フィールドにテキストを入力します。

#### パラメーター

| パラメーター | 型 | 必須 | デフォルト | 説明 |
|-----------|------|-----------|---------|-------------|
| `selector` | string | はい | - | 入力要素のセレクタ |
| `value` | string | はい | - | 入力するテキスト |
| `scrollToView` | boolean | いいえ | `true` | 入力前に要素を表示範囲内にスクロールする |
| `timeout` | number | いいえ | `3000` | 要素を待機する最大時間 (ミリ秒) |

#### 注意

新しいテキストを入力する前に既存の値をクリアします。

#### 例

```
Set the value "john@example.com" in the element with selector "#email"
```

#### サポート

- デスクトップブラウザ
- モバイルネイティブアプリ

---

## ページ分析

### `get_visible_elements`

現在のページまたは画面上の表示可能かつ操作可能な要素を取得します。これは操作可能な要素を発見するための主要なツールです。

#### パラメーター

| パラメーター | 型 | 必須 | デフォルト | 説明 |
|-----------|------|-----------|---------|-------------|
| `elementType` | string | いいえ | `interactable` | 要素のタイプ: `interactable` (ボタン/リンク/入力)、`visual` (画像/SVG)、または `all` |
| `inViewportOnly` | boolean | いいえ | `true` | ビューポート内に表示されている要素のみを返す |
| `includeContainers` | boolean | いいえ | `false` | レイアウトコンテナ (ViewGroup, ScrollViewなど) を含める |
| `includeBounds` | boolean | いいえ | `false` | 要素の座標 (x, y, width, height) を含める |
| `limit` | number | いいえ | `0` | 返す最大要素数 (0 = 無制限) |
| `offset` | number | いいえ | `0` | スキップする要素数 (ページネーション用) |

#### 戻り値

```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

**ウェブ要素の内容:** tagName, type, id, className, textContent, value, placeholder, href, ariaLabel, role, cssSelector, isInViewport

**モバイル要素の内容:** 複数のロケーター戦略 (アクセシビリティID、リソースID、XPath、UiAutomator/predicates)、要素タイプ、テキスト、オプションで境界

#### 注意

- **ウェブ**: 高速な要素検出のための最適化されたブラウザスクリプトを使用
- **モバイル**: 効率的なXMLページソース解析を使用 (要素クエリの600+回に対して2回のHTTPコール)
- 大きなページではトークン使用量を減らすためにページネーション (`limit`と`offset`) を使用してください

#### 例

```
Get all visible elements on the page with their coordinates
```

#### サポート

- デスクトップブラウザ
- モバイルアプリ

---

### `get_accessibility`

ロール、名前、状態に関するセマンティック情報を持つ現在のページのアクセシビリティツリーを取得します。

#### パラメーター

| パラメーター | 型 | 必須 | デフォルト | 説明 |
|-----------|------|-----------|---------|-------------|
| `limit` | number | いいえ | `100` | 返す最大ノード数 (0 = 無制限) |
| `offset` | number | いいえ | `0` | スキップするノード数 (ページネーション用) |
| `roles` | string[] | いいえ | すべて | 特定のロールにフィルタリング (例: `["button", "link", "textbox"]`) |
| `namedOnly` | boolean | いいえ | `true` | 名前/ラベルを持つノードのみを返す |

#### 戻り値

```json
{
  "total": 85,
  "showing": 100,
  "hasMore": false,
  "nodes": [
    { "role": "button", "name": "Submit" },
    { "role": "link", "name": "Home" }
  ]
}
```

#### 注意

- ブラウザのみ。モバイルアプリでは代わりに`get_visible_elements`を使用してください
- `get_visible_elements`が期待した要素を返さない場合に役立ちます
- `namedOnly: true`は匿名コンテナをフィルタリングしてノイズを減らします

#### サポート

- デスクトップブラウザ

---

## スクリーンショット

### `take_screenshot`

現在のビューポートのスクリーンショットを撮影します。

#### パラメーター

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|-----------|-------------|
| `outputPath` | string | いいえ | スクリーンショットファイルを保存するパス。省略するとbase64データを返します |

#### 戻り値

サイズ情報付きのBase64エンコードされた画像データ (PNGまたはJPEG)。

#### 注意

スクリーンショットは自動的に最適化されます:
- 最大寸法: 2000px (それより大きい場合はスケールダウン)
- 最大ファイルサイズ: 1MB
- フォーマット: 最大圧縮のPNG、またはサイズ制限を満たすために必要な場合はJPEG

#### サポート

- デスクトップブラウザ
- モバイルアプリ

---

## スクロール

### `scroll`

ページを指定したピクセル数上下にスクロールします。

#### パラメーター

| パラメーター | 型 | 必須 | デフォルト | 説明 |
|-----------|------|-----------|---------|-------------|
| `direction` | string | はい | - | スクロール方向: `up`または`down` |
| `pixels` | number | いいえ | `500` | スクロールするピクセル数 |

#### 注意

ブラウザのみ。モバイルスクロールには代わりに`swipe`ツールを使用してください。

#### サポート

- デスクトップブラウザ

---

## Cookieの管理

### `get_cookies`

現在のセッションからCookieを取得します。

#### パラメーター

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|-----------|-------------|
| `name` | string | いいえ | 取得する特定のCookie名（省略するとすべてのCookieを取得） |

#### 戻り値

name、value、domain、path、expiry、secure、httpOnlyプロパティを持つCookieオブジェクト。

#### サポート

- デスクトップブラウザ

---

### `set_cookie`

現在のセッションにCookieを設定します。

#### パラメーター

| パラメーター | 型 | 必須 | デフォルト | 説明 |
|-----------|------|-----------|---------|-------------|
| `name` | string | はい | - | Cookie名 |
| `value` | string | はい | - | Cookie値 |
| `domain` | string | いいえ | 現在のドメイン | Cookieドメイン |
| `path` | string | いいえ | `/` | Cookieパス |
| `expiry` | number | いいえ | - | Unixタイムスタンプ（秒）としての有効期限 |
| `secure` | boolean | いいえ | - | セキュアフラグ |
| `httpOnly` | boolean | いいえ | - | HttpOnlyフラグ |
| `sameSite` | string | いいえ | - | SameSite属性: `strict`、`lax`、または`none` |

#### サポート

- デスクトップブラウザ

---

### `delete_cookies`

現在のセッションからCookieを削除します。

#### パラメーター

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|-----------|-------------|
| `name` | string | いいえ | 削除する特定のCookie名（省略するとすべてを削除） |

#### サポート

- デスクトップブラウザ

---

## タッチジェスチャー（モバイル）

### `tap_element`

要素または画面座標をタップします。

#### パラメーター

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|-----------|-------------|
| `selector` | string | いいえ* | タップする要素のセレクタ |
| `x` | number | いいえ* | タップするX座標 |
| `y` | number | いいえ* | タップするY座標 |

*`selector`または`x`と`y`の両方が必要です。

#### サポート

- モバイルアプリ

---

### `swipe`

指定した方向にスワイプジェスチャーを実行します。

#### パラメーター

| パラメーター | 型 | 必須 | デフォルト | 説明 |
|-----------|------|-----------|---------|-------------|
| `direction` | string | はい | - | スワイプ方向: `up`、`down`、`left`、`right` |
| `duration` | number | いいえ | `500` | スワイプの時間（ミリ秒、100-5000） |
| `percent` | number | いいえ | 0.5/0.95 | スワイプする画面の割合（0-1） |

#### 注意

- デフォルトの割合: 垂直スワイプは0.5、水平スワイプは0.95
- 方向はコンテンツの移動を示します: 「上にスワイプ」するとコンテンツが上に移動します

#### 例

```
Swipe up to scroll down the screen
```

#### サポート

- モバイルアプリ

---

### `drag_and_drop`

要素を別の要素または座標にドラッグします。

#### パラメーター

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|-----------|-------------|
| `sourceSelector` | string | はい | ドラッグするソース要素のセレクタ |
| `targetSelector` | string | いいえ* | ドロップ先の要素セレクタ |
| `x` | number | いいえ* | ターゲットXオフセット（targetSelectorがない場合） |
| `y` | number | いいえ* | ターゲットYオフセット（targetSelectorがない場合） |
| `duration` | number | いいえ | デフォルト | ドラッグ時間（ミリ秒、100-5000） |

*`targetSelector`または`x`と`y`の両方が必要です。

#### サポート

- モバイルアプリ

---

## アプリライフサイクル（モバイル）

### `get_app_state`

アプリの現在の状態を取得します。

#### パラメーター

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|-----------|-------------|
| `bundleId` | string | はい | アプリの識別子（iOSのバンドルID、Androidのパッケージ名） |

#### 戻り値

アプリの状態: `not installed`、`not running`、`running in background (suspended)`、`running in background`、または`running in foreground`。

#### サポート

- モバイルアプリ

---

## コンテキスト切り替え（ハイブリッドアプリ）

### `get_contexts`

利用可能なすべてのコンテキスト（ネイティブとウェブビュー）を一覧表示します。

#### パラメーター

なし

#### 戻り値

コンテキスト名の配列（例: `["NATIVE_APP", "WEBVIEW_com.example.app"]`）。

#### サポート

- モバイルハイブリッドアプリ

---

### `get_current_context`

現在アクティブなコンテキストを取得します。

#### パラメーター

なし

#### 戻り値

現在のコンテキスト名（例: `NATIVE_APP`または`WEBVIEW_*`）。

#### サポート

- モバイルハイブリッドアプリ

---

### `switch_context`

ネイティブとウェブビューのコンテキスト間を切り替えます。

#### パラメーター

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|-----------|-------------|
| `context` | string | はい | `get_contexts`からのコンテキスト名またはインデックス（1ベース） |

#### 例

```
Switch to the WEBVIEW_com.example.app context
```

#### サポート

- モバイルハイブリッドアプリ

---

## デバイス制御（モバイル）

### `rotate_device`

デバイスを特定の向きに回転させます。

#### パラメーター

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|-----------|-------------|
| `orientation` | string | はい | `PORTRAIT`または`LANDSCAPE` |

#### サポート

- モバイルアプリ

---

### `hide_keyboard`

画面上のキーボードを非表示にします。

#### パラメーター

なし

#### サポート

- モバイルアプリ

---

### `get_geolocation`

現在のGPS座標を取得します。

#### パラメーター

なし

#### 戻り値

`latitude`、`longitude`、`altitude`を含むオブジェクト。

#### サポート

- モバイルアプリ

---

### `set_geolocation`

デバイスのGPS座標を設定します。

#### パラメーター

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|-----------|-------------|
| `latitude` | number | はい | 緯度座標（-90〜90） |
| `longitude` | number | はい | 経度座標（-180〜180） |
| `altitude` | number | いいえ | 高度（メートル） |

#### 例

```
Set geolocation to San Francisco (37.7749, -122.4194)
```

#### サポート

- モバイルアプリ

---

## スクリプト実行

### `execute_script`

ブラウザでJavaScriptを実行するか、Appiumを介してモバイルコマンドを実行します。

#### パラメーター

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|-----------|-------------|
| `script` | string | はい | JavaScriptコード（ブラウザ）またはモバイルコマンド（例: `mobile: pressKey`） |
| `args` | array | いいえ | スクリプトの引数 |

#### ブラウザの例

```javascript
// Get page title
execute_script({ script: "return document.title" })

// Get scroll position
execute_script({ script: "return window.scrollY" })

// Click element by selector
execute_script({ script: "arguments[0].click()", args: ["#myButton"] })
```

#### モバイル（Appium）の例

```javascript
// Press back key (Android)
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// Activate app
execute_script({ script: "mobile: activateApp", args: [{ appId: "com.example" }] })

// Terminate app
execute_script({ script: "mobile: terminateApp", args: [{ appId: "com.example" }] })

// Deep link
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://screen", package: "com.example" }] })

// Shell command (Android)
execute_script({ script: "mobile: shell", args: [{ command: "dumpsys", args: ["battery"] }] })
```

#### 一般的なAndroidキーコード

| キー | コード |
|-----|------|
| BACK | 4 |
| HOME | 3 |
| ENTER | 66 |
| MENU | 82 |
| SEARCH | 84 |

#### その他のモバイルコマンド

利用可能なAppiumモバイルコマンドの完全なリストについては、以下を参照してください：
- [XCUITest Mobile Commands](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)（iOS）
- [UiAutomator2 Mobile Commands](https://github.com/appium/appium-uiautomator2-driver#mobile-commands)（Android）

#### サポート

- デスクトップブラウザ
- モバイルアプリ（Appiumモバイルコマンド経由）