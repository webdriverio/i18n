---
id: cloud-providers
title: クラウドプロバイダー
description: "認証情報、アプリのアップロード、トンネル、レポートを含め、WebdriverIO MCP のブラウザおよびモバイルセッションをクラウドデバイスファームで実行します。"
---

WebdriverIO MCP サーバーは、クラウドデバイスファーム上でブラウザおよびモバイルの自動化セッションを実行するためのネイティブサポートを備えています。ローカルのドライバー、エミュレーター、シミュレーターは不要です。以下の 4 つのプロバイダーがサポートされています:

- **BrowserStack** — [Automate](https://www.browserstack.com/automate)(ブラウザ)および [App Automate](https://www.browserstack.com/app-automate)(モバイルアプリ)
- **Sauce Labs** — [Sauce Labs](https://saucelabs.com) の実機クラウドおよび仮想ブラウザ
- **TestMu (旧 LambdaTest)** — [TestMu](https://www.lambdatest.com) の実機およびブラウザクラウド
- **TestingBot** — [TestingBot](https://testingbot.com) の実機クラウドおよびブラウザグリッド

4 つのプロバイダーはすべて同じワークフローを共有しています: 認証情報を設定し、必要に応じてモバイルアプリをアップロードし、プロバイダー名を指定して `start_session` を呼び出します。レポートのラベル、トンネルの設定、モバイルアプリのライフサイクルは、すべてのプロバイダーで共通です。

## 前提条件

MCP サーバーを起動する前に、認証情報を環境変数として設定してください:

```bash
# BrowserStack
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"

# Sauce Labs
export SAUCE_USERNAME="your_username"
export SAUCE_ACCESS_KEY="your_access_key"

# TestMu
export TESTMU_USERNAME="your_username"
export TESTMU_ACCESS_KEY="your_access_key"

# TestingBot
export TESTINGBOT_KEY="your_key"
export TESTINGBOT_SECRET="your_secret"
```

| プロバイダー | ユーザー名の変数        | アクセスキーの変数        | 確認場所                                                           |
| ------------ | ----------------------- | ------------------------- | ------------------------------------------------------------------ |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY` | [アカウント設定](https://www.browserstack.com/accounts/settings)   |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`        | [ユーザー設定](https://app.saucelabs.com/user-settings)            |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`       | [アカウント設定](https://accounts.lambdatest.com/detail/profile)   |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`       | [アカウント設定](https://testingbot.com/membership)                |

## ブラウザ自動化

`start_session` で `provider` を設定することで、任意のクラウドプロバイダー上でブラウザセッションを実行できます:

```js
// BrowserStack — Windows + Chrome
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})

// Sauce Labs — macOS + Safari
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "safari",
  browserVersion: "latest",
  os: "macOS",
  osVersion: "Sequoia"
})

// TestMu — Linux + Firefox
start_session({
  provider: "testmu",
  platform: "browser",
  browser: "firefox",
  browserVersion: "latest",
  os: "Linux"
})

// TestingBot — Windows + Chrome
start_session({
  provider: "testingbot",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})
```

すべてのプロバイダーは `browser` として `"chrome"`、`"firefox"`、`"edge"`、`"safari"` をサポートしています。`os` / `osVersion` を省略した場合、プロバイダーは適切なデフォルト値を使用します(ブラウザセッションでは通常、最新の Linux)。

### Sauce Labs のリージョン

Sauce Labs は複数のデータセンターリージョンをサポートしています。`start_session` で `region` パラメータを設定してください:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  region: "us-west-1"
})
```

サポートされる値: `"us-west-1"`、`"eu-central-1"`(デフォルト)、`"apac-southeast-1"`。

## モバイルアプリ自動化

モバイルのワークフローは 3 つのステップで構成され、すべてのプロバイダーで共通です:

### ステップ 1: アプリをアップロードする

```js
upload_app({ provider: "browserstack", path: "/absolute/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```

それぞれ、`start_session` で使用するアプリ参照を返します:
- BrowserStack: `bs://abc123...`
- Sauce Labs: `storage:filename=MyApp.ipa`
- TestMu: `lt://abc123...`
- TestingBot: `https://api.testingbot.com/v1/storage/<app_url>`

アップロード間で安定した参照を使用するために、オプションで `customId` を設定できます:

```js
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", customId: "MyApp-v2.1" })
```

Sauce Labs の場合は、ストレージのリージョンに合わせて `region` を追加してください(デフォルトは `"eu-central-1"`)。

### ステップ 2: 利用可能なアプリを一覧表示する

```js
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

すべてのプロバイダーで使用できるオプションのパラメータ:
- `sortBy`: `"app_name"` または `"uploaded_at"`(デフォルト)
- `limit`: 最大結果数(デフォルトは 20)

BrowserStack では、組織全体のアップロードを一覧表示する `organizationWide: true` もサポートしています。Sauce Labs では `region` を指定できます。

### ステップ 3: セッションを開始する

`upload_app` から取得したアプリ参照、または `customId` を使用します:

```js
// BrowserStack — Android
start_session({
  provider: "browserstack",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "bs://abc123..."
})

// Sauce Labs — iOS
start_session({
  provider: "saucelabs",
  platform: "ios",
  deviceName: "iPhone 15",
  platformVersion: "17.0",
  app: "storage:filename=MyApp.ipa"
})

// TestMu — Android
start_session({
  provider: "testmu",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "lt://abc123..."
})

// TestingBot — Android
start_session({
  provider: "testingbot",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "<app_url from upload_app>"
})
```

## ローカルトンネル

すべてのプロバイダーはローカルトンネルをサポートしており、クラウドセッションからお使いのマシン上のサーバー(localhost、ステージング環境、内部サービス)にアクセスできます。

MCP サーバーは、すべてのプロバイダーで同じように動作する**統一された `tunnel` パラメータ**を使用します:

### 自動管理トンネル(推奨)

MCP サーバーがトンネルを自動的に開始・停止します:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  tunnel: true
})
```

`tunnel: true` を指定した最初のセッションの前に、MCP サーバーがトンネルバイナリのダウンロードと起動を処理します。セットアップを手動で確認したい場合は、プロバイダーの local-binary リソースを参照してください:

- `wdio://browserstack/local-binary`
- `wdio://saucelabs/local-binary`
- `wdio://testmu/local-binary`
- `wdio://testingbot/local-binary`

トンネルはセッションを閉じると自動的に停止します。

### 外部トンネル

すでに別のプロセスでトンネルを実行している場合:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  tunnel: "external",
  tunnelName: "my-sauce-tunnel"
})
```

`"external"` は、トンネルがすでに実行中であることを MCP サーバーに伝えます。適切なケイパビリティフラグを設定しますが、プロセスの開始や停止は行いません。`tunnelName` は実行中のトンネルに合わせて設定してください。

### 手動トンネルセットアップ

トンネルを手動で実行したい場合は、プロバイダーとプラットフォームに対応する MCP リソースからセットアップ手順を参照してください。例:

```text
// Read setup instructions (from your AI client)
wdio://saucelabs/local-binary
wdio://testingbot/local-binary
```

各リソースは、ダウンロード URL、プラットフォーム固有のコマンド、およびデーモンの手順を返します。

## レポート

プロバイダーのダッシュボード用に、セッションにプロジェクト、ビルド、セッションのラベルを付けることができます。これはすべてのプロバイダーで同じように動作します:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  reporting: {
    project: "My Project",
    build: "v2.1.0",
    session: "Login flow test"
  }
})
```

セッションは、指定したプロジェクトとビルドの下でプロバイダーのダッシュボードに表示されます:
- BrowserStack: [Automate ダッシュボード](https://automate.browserstack.com)
- Sauce Labs: [テスト結果](https://app.saucelabs.com/dashboard/builds)
- TestMu: [Automation ダッシュボード](https://automation.lambdatest.com)
- TestingBot: [テスト結果](https://testingbot.com/members)

## プロバイダー固有の注意事項

### BrowserStack

- ブラウザセッション: `os` には `"Windows"` または `"OS X"` を指定できます。Windows のバージョン: `"10"`、`"11"`。macOS のバージョン: `"Ventura"`、`"Sonoma"`、`"Sequoia"`。
- アプリ管理 API: `list_apps` で `organizationWide: true` を指定すると、チーム全体のアップロードを一覧表示します。

### Sauce Labs

- **リージョンが重要です。** デフォルトのリージョンは `eu-central-1` です。アカウントが別のリージョンにある場合は、`start_session`、`list_apps`、`upload_app` で `region` を一致させて設定してください。
- モバイルセッションは `automationName`(`"XCUITest"` または `"UiAutomator2"`)をサポートしています。デフォルト値はプラットフォームごとに適切に設定されています。
- Sauce Connect トンネルは `saucelabs` npm パッケージを介して自動管理されます。`tunnel: true` の場合、外部バイナリは不要です。

### TestMu

- `start_session`、`list_apps`、`upload_app` でのプロバイダー名は `"testmu"` です。
- ブラウザセッションは `hub.lambdatest.com` に、モバイルセッションは `mobile-hub.lambdatest.com` に接続します。これは自動的に処理されます。
- トンネルは `@lambdatest/node-tunnel` npm パッケージを介して自動管理されます。
- モバイルアプリ管理では、Android と iOS のアプリを別々の API 呼び出しで取得し、その結果をマージします。

### TestingBot

- `start_session`、`list_apps`、`upload_app` でのプロバイダー名は `"testingbot"` です。
- ブラウザセッションとモバイルセッションはどちらも、ポート 443 で `hub.testingbot.com` に接続します(自動的に処理されます)。
- 認証情報には `TESTINGBOT_KEY` と `TESTINGBOT_SECRET` を使用します(他のプロバイダーのようなユーザー名/アクセスキーのペアではありません)。
- トンネルは `testingbot-tunnel-launcher` npm パッケージを介して自動管理されます(Java 11 以上が必要です)。
- リージョンパラメータはありません — TestingBot のハブはグローバルです。
- モバイルブラウザ/エミュレーターモードがサポートされています: `app` の代わりに、`platform: "android"` または `"ios"` と `browser` 名(例: `"chrome"`)を設定してください。