---
id: resources
title: リソース
description: "WebdriverIO MCP サーバーの読み取り専用 wdio:// リソースを通じて、ライブセッションの状態、セッション履歴、クラウドプロバイダーのセットアップ詳細を読み取ります。"
---

MCP リソースは、ライブセッションの状態への読み取り専用アクセスを提供します。ツールとは異なり、リソースは AI モデルが任意のタイミングで取得するものであり、アクションを実行しません。すべてのリソースは `wdio://` URI スキームを使用します。

## リソースとツールの使い分け

- **リソース** — 操作に応じて変化する周辺状態：現在の要素、スクリーンショット、Cookie、アクセシビリティツリー。アクションを実行する前に読み取り、画面に何が表示されているかを把握します。
- **ツール** — 状態を変更するアクション：クリック、ナビゲーション、値の設定。

要素の検出には `get_screenshot` よりも `wdio://session/current/elements` を優先してください。すぐに使えるセレクターを返し、トークンの消費もはるかに少なくて済みます。

## セッション履歴

### `wdio://sessions`

メタデータとステップ数を含む、すべてのブラウザおよびアプリセッションのインデックスです。

```json
{
  "sessions": [
    {
      "sessionId": "abc-123",
      "type": "browser",
      "startedAt": "2024-01-15T10:00:00.000Z",
      "endedAt": "2024-01-15T10:05:00.000Z",
      "stepCount": 12,
      "isCurrent": false
    }
  ]
}
```

---

### `wdio://session/current/steps`

現在アクティブなセッションの JSON ステップログです。ツール名、パラメーター、タイムスタンプを含む、記録されたすべての自動化ステップが含まれます。

---

### `wdio://session/current/code`

現在アクティブなセッションに対して生成された WebdriverIO JavaScript です。記録されたステップから自動生成されます。WebdriverIO のテストファイルに貼り付けると、セッションを再現できます。

---

### `wdio://session/{sessionId}/steps`

ID で指定した特定のセッションのステップログです。URI テンプレート — `{sessionId}` を `wdio://sessions` から取得した ID に置き換えてください。

---

### `wdio://session/{sessionId}/code`

ID で指定した特定のセッションに対して生成された WebdriverIO JavaScript です。URI テンプレート — `{sessionId}` を `wdio://sessions` から取得した ID に置き換えてください。

## ライブページの状態（現在のセッション）

### `wdio://session/current/elements`

現在のページ上の操作可能な要素です。すぐに使えるセレクター、要素のテキスト、表示状態の情報を返します。

**これは画面に何が表示されているかを把握するための主要なリソースです。** クリックや入力の前に読み取ってください。スクリーンショットよりもはるかに高速で低コストです。

高度なフィルタリング（ビューポート内のみ、コンテナ、バウンディングボックス、ページネーション）には、代わりに `get_elements` ツールを使用してください。

---

### `wdio://session/current/accessibility`

現在のページのアクセシビリティツリーです。デフォルトでは、ロール、名前、セレクター、状態属性を含むすべてのノードを返します。ブラウザ専用です。モバイルでは `wdio://session/current/elements` を使用してください。

```json
{
  "total": 84,
  "showing": 84,
  "hasMore": false,
  "nodes": [
    {
      "role": "button",
      "name": "Submit",
      "selector": "button.submit-btn",
      "disabled": false
    }
  ]
}
```

フィルタリングされた結果（ロール別、ページネーション）が必要な場合は、`get_accessibility_tree` ツールを使用してください。

---

### `wdio://session/current/screenshot`

現在のページまたは画面のスクリーンショットを base64 エンコードされた画像として返します。自動的にリサイズ（最大 2000px）および圧縮（最大 1 MB）されます。

視覚的な検証やレイアウトのデバッグに使用してください。要素の検出には `wdio://session/current/elements` を優先してください。

---

### `wdio://session/current/cookies`

現在のブラウザセッションのすべての Cookie です。

```json
[
  {
    "name": "session_token",
    "value": "abc123",
    "domain": "example.com",
    "path": "/",
    "httpOnly": true,
    "secure": true
  }
]
```

---

### `wdio://session/current/tabs`

現在のセッションで開いているすべてのブラウザタブです。ブラウザ専用です。

```json
[
  {
    "handle": "CDwindow-ABC",
    "title": "My App",
    "url": "https://example.com/dashboard",
    "isActive": true
  }
]
```

`switch_tab` の前に使用して、対象のハンドルまたはインデックスを特定してください。

---

### `wdio://session/current/contexts`

利用可能な自動化コンテキスト（NATIVE_APP、WEBVIEW）です。モバイル専用です。

```json
["NATIVE_APP", "WEBVIEW_com.example.app"]
```

---

### `wdio://session/current/context`

現在アクティブな自動化コンテキストです。モバイル専用です。

```json
"NATIVE_APP"
```

---

### `wdio://session/current/app-state/{bundleId}`

指定したバンドル ID のアプリのライフサイクル状態です。モバイル専用です。URI テンプレート — `{bundleId}` を iOS のバンドル ID または Android のパッケージ名に置き換えてください。

次のいずれかを返します：
- `0` — インストールされていない
- `1` — 実行されていない
- `2` — バックグラウンドで実行中（一時停止）
- `3` — バックグラウンドで実行中
- `4` — フォアグラウンドで実行中

名前付きの出力が必要な場合は、代わりに `get_app_state` ツールを使用してください。

---

### `wdio://session/current/geolocation`

`set_geolocation` によって設定された、現在のデバイスの位置情報のオーバーライドです。

```json
{
  "latitude": 51.5074,
  "longitude": -0.1278,
  "altitude": 0
}
```

---

### `wdio://session/current/logs`

現在のセッションのセッションログです。ブラウザのコンソールメッセージと JavaScript の例外（Chromium セッション）、logcat の出力（Android）、またはクラッシュログ/syslog（iOS）を返します。

```json
{
  "type": "browser",
  "logs": [
    { "level": "SEVERE", "message": "Uncaught TypeError: ...", "source": "javascript" },
    { "level": "INFO", "message": "Page loaded", "source": "console" }
  ]
}
```

---

### `wdio://session/current/capabilities`

現在のセッションに対して WebDriver または Appium サーバーが返した生の capabilities です。デバッグに使用してください。クラウドプロバイダーや Appium によって適用されたデフォルト値を含め、ドライバーが実際に受け入れた値が表示されます。

## クラウドプロバイダー

### `wdio://browserstack/local-binary`

BrowserStack Local バイナリのプラットフォーム固有のダウンロード URL とデーモンのセットアップ手順です。`provider: "browserstack"` で `tunnel: true` または `tunnel: "external"` を使用する前に読み取ってください。お使いの OS とアーキテクチャに対応した正確なコマンドが含まれています。

```json
{
  "platform": "macOS",
  "arch": "arm64",
  "downloadUrl": "https://...",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./BrowserStackLocal --key YOUR_KEY",
    "stop": "...",
    "status": "..."
  }
}
```

---

### `wdio://saucelabs/local-binary`

Sauce Connect Proxy のプラットフォーム固有のダウンロード URL とデーモンのセットアップ手順です。`provider: "saucelabs"` で `tunnel: "external"` を使用する前に読み取ってください。`tunnel: true` の場合は、SDK が Sauce Connect を自動的に管理します。

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://saucelabs.com/downloads/sc-4.9.2-linux.tar.gz",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./sc -u YOUR_USERNAME -k YOUR_ACCESS_KEY --region eu-central-1",
    "stop": "./sc --stop",
    "status": "./sc --status"
  }
}
```

---

### `wdio://testmu/local-binary`

TestMu Tunnel のプラットフォーム固有のダウンロード URL とデーモンのセットアップ手順です。`provider: "testmu"` で `tunnel: "external"` を使用する場合にのみ必要です — `tunnel: true` の場合は、SDK が `@lambdatest/node-tunnel` を介してトンネルを自動的に管理します。

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://downloads.lambdatest.com/tunnel/v4/linux/64bit/LT_Linux.zip",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY",
    "stop": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY --stop",
    "status": "./LT --status"
  }
}
```

---

### `wdio://testingbot/local-binary`

TestingBot Tunnel のダウンロード URL とデーモンのセットアップ手順です。このトンネルはクロスプラットフォームの Java JAR です（Java 11 以上が必要）。`provider: "testingbot"` で `tunnel: "external"` を使用する場合にのみ必要です — `tunnel: true` の場合は、SDK が `testingbot-tunnel-launcher` を介してトンネルを自動的に管理します。

```json
{
  "requirement": "MUST start the TestingBot Tunnel BEFORE calling start_session with tunnel: \"external\".",
  "runtime": "Java 11+ (17 LTS recommended)",
  "downloadUrl": "https://testingbot.com/downloads/testingbot-tunnel.zip",
  "setup": [
    "1. Download: curl -O https://testingbot.com/downloads/testingbot-tunnel.zip",
    "2. Unzip: unzip testingbot-tunnel.zip",
    "3. Start: java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET"
  ],
  "commands": {
    "start": "java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET",
    "stop": "Press Ctrl+C in the tunnel terminal, or kill the java process."
  }
}
```