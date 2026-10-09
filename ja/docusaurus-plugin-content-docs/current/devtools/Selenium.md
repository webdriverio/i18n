---
id: selenium
title: Selenium DevTools
description: "Node.js または Python の Selenium WebDriver テストに、テストランナーを問わず DevTools デバッグ UI を追加し、トレースモードを有効にします。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[WebdriverIO DevTools](https://github.com/webdriverio/devtools) 用の Selenium WebDriver アダプターです。テストランナーに関係なく、**Node.js** または **Python** のあらゆる Selenium テストに同じビジュアルデバッグ UI を提供します。

Node.js では **Mocha**、**Jest**、**Cucumber**、またはプレーンなスクリプトで動作します。プラグインがランナーを自動検出し、それに応じてテストの境界を接続します。Python では **pytest** またはプレーンなスクリプトで動作し、pytest ではテストファイルを一切変更する必要がありません。

下のタブで言語を選択してください。選択内容はページ全体に反映されます。

## インストール

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```bash
npm install @wdio/selenium-devtools
```

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install selenium-devtools-py
```

**Python 3.10 以上と `selenium>=4.44` が必要です。** どちらもパッケージのメタデータで宣言されているため、実行時に Network タブが空であることに気付くのではなく、pip がこれらの要件を強制します。ネットワークキャプチャは、selenium が 4.44 で再生成した公開 BiDi イベント API を通じてサブスクライブします。それに置き換えられたプライベート接続は同じリリースで削除されたため、4.44 が Python の最低バージョンを決めています。

</TabItem>
</Tabs>

## セットアップ

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

以下の各ブロックは、`DevTools.configure(...)` の呼び出しを含む**コピー＆ペーストでそのまま使える完全な例**です。使用しているランナーを選び、スニペットをプロジェクトに貼り付けて実行してください。

### Mocha

```js
// tests/example.test.js
import { strict as assert } from 'node:assert'
import { Builder, By, until } from 'selenium-webdriver'
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('smoke test', function () {
  let driver

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  it('loads example.com and reads the heading', async function () {
    await driver.get('https://example.com')
    const heading = await driver.wait(until.elementLocated(By.css('h1')), 10000)
    assert.equal(await heading.getText(), 'Example Domain')
  })
})
```

実行方法:

```bash
mocha --timeout 60000 tests/example.test.js
```

> 別の方法: ファイルごとのインポートを省略し、`mocha --require @wdio/selenium-devtools` を使って実行全体で一度だけプラグインを読み込むこともできます。

### Jest

```js
// test/example.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('login flow', () => {
  let driver

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  }, 60000)

  afterEach(async () => {
    if (driver) {
      await driver.quit()
    }
  })

  test('logs in with valid credentials', async () => {
    await driver.get('https://the-internet.herokuapp.com/login')
    await driver.findElement(By.id('username')).sendKeys('tomsmith')
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!')
    await driver.findElement(By.css('button[type="submit"]')).click()

    await driver.wait(until.urlContains('/secure'), 10000)
    const flash = await driver.findElement(By.id('flash'))
    expect(await flash.getText()).toMatch(/You logged into a secure area/i)
  }, 60000)
})
```

`jest.config.json`:

```json
{
  "testEnvironment": "node",
  "testMatch": ["<rootDir>/test/example.js"],
  "testTimeout": 60000,
  "transform": {}
}
```

実行方法（ESM には実験的フラグが必要です）:

```bash
NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.json
```

### Cucumber

Cucumber は構成が分割されているため、小さなファイルが 3 つ必要です。プラグインを読み込むファイル、World/フック用のファイル、ステップ定義用のファイルです。

`features/support/setup.js` - プラグインを読み込み、一度だけ設定します:

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})
```

`features/support/world.js` - ドライバーのライフサイクル:

```js
import {
  setWorldConstructor,
  World,
  Before,
  After,
  setDefaultTimeout
} from '@cucumber/cucumber'
import { Builder } from 'selenium-webdriver'

setDefaultTimeout(60000)

class CustomWorld extends World {
  constructor (options) {
    super(options)
    this.driver = null
  }
}

setWorldConstructor(CustomWorld)

Before(async function () {
  this.driver = await new Builder().forBrowser('chrome').build()
})

After(async function () {
  if (this.driver) {
    await this.driver.quit()
    this.driver = null
  }
})
```

`cucumber.json` - ステップが実行される前にプラグインが Selenium にパッチを適用できるよう、セットアップファイルを**最初に**指定します:

```json
{
  "default": {
    "import": [
      "features/support/setup.js",
      "features/support/world.js",
      "features/support/steps.js"
    ],
    "paths": ["features/*.feature"],
    "format": ["progress"]
  }
}
```

実行方法:

```bash
cucumber-js --config cucumber.json
```

### プレーンな Node スクリプト（テストランナーなし）

`node tests/google.test.js` を直接実行する場合、プラグインが自動でフックできるランナーは存在しません。デフォルトでは、ダッシュボードに「Selenium Session」の行が 1 つだけ表示されます。名前付きのテスト境界を作成するには、処理の前後で `DevTools.startTest` / `endTest` を呼び出します:

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // 任意 - テスト行に名前を付けます

  const driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://www.google.com')
    const searchBox = await driver.findElement(By.name('q'))
    await searchBox.sendKeys('Selenium WebDriver JavaScript', Key.ENTER)
    await driver.wait(until.titleContains('Selenium'), 10000)
    DevTools.endTest('passed')
  } catch (err) {
    DevTools.endTest('failed')
    throw err
  } finally {
    await driver.quit()
  }
}

run()
```

```bash
node tests/google.test.js
```

> `startTest` / `endTest` はプレーンな Node スクリプトでのみ使用してください。Mocha / Jest / Cucumber では、プラグインが各テストの開始と終了をすでに把握しているため、手動で呼び出すと行が重複してしまいます。

</TabItem>
<TabItem value="python" label="Python">

### pytest

テストファイルには何も追加しません。プラグインは自動的に検出され、フラグを指定するとその実行で有効になります:

```bash
pytest --devtools tests/              # ライブダッシュボード
pytest --devtools-trace tests/        # 代わりにトレースアーカイブを書き出す（--devtools を含意）
```

または、誰もフラグを覚えておく必要がないよう、設定をコミットしておくこともできます:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # ダッシュボードの代わりにトレースアーカイブ
# devtools_trace_granularity = "test"            # ... テストごとに 1 つのアーカイブ
# devtools_trace_policy = "retain-on-failure"    # ... 失敗したものだけを保持
```

`[pytest]` セクションを持つ `pytest.ini` でも同じキーを使用できます。2 つのトレース設定については、[アーカイブの数と保持するアーカイブ](#how-many-archives-and-which-ones-to-keep)で説明しています。

キャプチャは常にオプトインです。パッケージをインストールしただけで既存のスイートの動作が変わることは決してありません。異なるのは、有効化の*方法*だけです:

| オプトインの方法 | スコープ |
|---|---|
| `--devtools` / `--devtools-trace` | この実行 |
| `[tool.pytest.ini_options]` の `devtools` / `devtools_trace` | このプロジェクト |
| `DEVTOOLS_ENABLE=1`（または、すでに実行中のダッシュボードにも接続する `DEVTOOLS_PORT=<n>`） | このシェル - CI 向け |

優先順位は CLI、ini、環境変数の順に高くなります。`pytest -o devtools=false` で、プロジェクトのデフォルトを 1 回の実行だけ無効にできます。そのため `--no-devtools` は存在しません。`DEVTOOLS_TRACE=1` はトレースモードを選択しますが、それ自体ではキャプチャを**有効にしません**。そのため、自分のスクリプト用にエクスポートしておいても、意図しない pytest の実行がキャプチャされることはありません。

ライブモードでは、ダッシュボードは専用のブラウザウィンドウで開き、何が起きたかを確認できるよう**実行後も開いたまま**になります。終了するにはウィンドウを閉じる（または `Ctrl-C`）してください。オプトインしていても、次の 2 種類の実行はキャプチャされません。何も実行されない `--collect-only` と、テストが 1 つも収集されなかった実行です。後者がキャプチャされると、パスを打ち間違えただけでターミナルが空のダッシュボードで待機したままになってしまいます。

### プレーンな Python スクリプト（テストランナーなし）

既存の Selenium コードの前後に 2 行追加します:

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # ダッシュボードを開き、すべてのコマンドをキャプチャ
# devtools.enable(trace=True)         # または: trace.zip を書き出し、ウィンドウは開かない

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # 確認のため UI を開いたままにする（ウィンドウが開いていない場合は何もしない）
devtools.disable()
```

バックエンドを起動できない、または接続できない場合、`enable()` は警告をログに出力して `None` を返します。キャプチャはスキップされますが、テストはそのまま実行されます。ダッシュボードがないことでスイートが失敗することはありません。

### 並列実行（`pytest -n`）

**pytest-xdist は追加の設定なしで動作します。** 1 つの実行に報告するすべてのプロセスは、同じ実行 ID を共有している必要があります。そうでなければ、バックエンドは接続ごとに新しい実行として扱い、前の実行でキャプチャした内容を消去してしまいます。xdist では ID が一致します。プラグインは**コントローラー**でも読み込まれ、そこでキャプチャを有効にすると xdist がワーカーを生成する前に ID が決定されます。ワーカーは子プロセスなので、その ID を継承します。

実際に別々の実行として扱われるのは、独立した 2 つの `pytest` 呼び出しや、環境を引き継がずに起動されたワーカーです。そのようなプロセスを 1 つの実行にまとめるには、`DEVTOOLS_RUN_ID` を自分でエクスポートしてください。

</TabItem>
</Tabs>

## 設定オプション {#configuration-options}

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| オプション | 型 | デフォルト | 説明 |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | DevTools バックエンドサーバーのポート。すでに使用中の場合は自動的にインクリメントされます。 |
| `hostname` | `string` | `'localhost'` | バックエンドサーバーがバインドするホスト名。 |
| `openUi` | `boolean` | `true` | DevTools UI を新しい Chrome ウィンドウで自動的に開きます。CI では `false` に設定してください。 |
| `captureScreenshots` | `boolean` | `true` | WebDriver コマンドごとにスクリーンショットをキャプチャします。 |
| `headless` | `boolean` | `false` | **テスト**ブラウザをヘッドレスで実行します（`--headless=old` を注入）。DevTools UI ウィンドウには影響しません。 |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | セッションごとの `.webm` 動画録画。オプションは [WebdriverIO Screencast](/docs/devtools/wdio/screencast) ページと同じです。 |
| `rerunCommand` | `string` | 自動 | テストごとの再実行用コマンドテンプレート。`{{testName}}` が置換されます。省略した場合はランナーの argv から自動的に導出されます。 |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` は DevTools UI を開きます。`trace` は UI を開かず、代わりにポータブルなアーティファクトを書き出します。[トレースモード](/docs/devtools/wdio/trace-mode)を参照してください。`openUi` より優先されます。 |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | トレースアーティファクトのレイアウト。`mode: 'trace'` の場合のみ適用されます。 |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | セッション / spec ファイル / テストごとに 1 つのトレース。`'test'` の場合、それぞれを `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip` に書き出します。`mode: 'trace'` の場合のみ適用されます。[トレースモード](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)を参照してください。 |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | どのトレースを保持するか。`traceGranularity: 'test'` と組み合わせて使用します。`mode: 'trace'` の場合のみ適用されます。 |
| `filmstrip` | `boolean` | `true` | プレーヤーでフレーム単位のスクラブができるよう、高密度で連続したスクリーンキャストをトレースに記録します。`mode: 'trace'` の場合のみ適用されます。 |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | トレースモード + `traceGranularity: 'test'`。テストごとのスクリーンショット。Allure ランナーアダプターが有効な場合、`allure-js-commons` を介して Allure にインライン添付されます（`image/png`）。 |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | トレースモード + `traceGranularity: 'test'`。テストごとのスクリーンキャスト動画。指定したポリシーに従って保持され、Allure ランナーアダプターが有効な場合、`allure-js-commons` を介して Allure にインライン添付されます（`video/webm`）。 |
| `emitArtifactsManifest` | `boolean` | 自動 | `devtools-artifacts-<sessionId>.json` マニフェスト（レポーターや CI が生成されたアーティファクトを検出するために使用する汎用インデックス）をトレースの隣に書き出します。デフォルトではオフですが、`allure-js-commons` ランタイムが有効な場合は**自動的に有効**になります。トレースモードのみ。 |
| `captureAssertions` | `boolean` | `true` | `node:assert` のアサーション（成功・失敗の両方）をトレースのアクション行としてキャプチャします。無効にするには `false` を設定してください。 |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> **CI では**、`headless: true`（テストブラウザを非表示にする）と `openUi: false`（ダッシュボードウィンドウを開こうとしない - CI 環境にはディスプレイがありません）の両方を設定してください。バックエンドは設定したポートで動作し続けるため、必要に応じて後から UI を開くことができます。

</TabItem>
<TabItem value="python" label="Python">

オプションオブジェクトはありません。テストコードに devtools 固有のものを記述する必要は一切ありません。pytest では pytest を設定するのと同じ方法でアダプターを設定します。スクリプトでは `enable()` にキーワード引数を渡します。フラグがないものはすべて環境変数で指定します。

| pytest フラグ | `[tool.pytest.ini_options]` | 効果 |
|---|---|---|
| `--devtools` | `devtools = true` | この実行をキャプチャし、ダッシュボードを開きます。 |
| `--devtools-trace` | `devtools_trace = true` | この実行をキャプチャし、ダッシュボードを開く代わりにトレースアーカイブを書き出します。`--devtools` を含意します。 |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | 実行全体で 1 つのアーカイブ（`session`、デフォルト）またはテストごとに 1 つ。`--devtools-trace` を含意します。 |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | どのアーカイブを保持する価値があるか。`--devtools-trace` を含意します。[アーカイブの数と保持するアーカイブ](#how-many-archives-and-which-ones-to-keep)を参照してください。 |

優先順位は CLI、ini、以下の環境変数の順に高くなります。`pytest -o devtools=false` でプロジェクトのデフォルトを 1 回の実行だけ無効にでき、`pytest -o devtools_trace_policy=on` で他の設定についても同様のことができます。

| 変数 | 効果 |
|---|---|
| `DEVTOOLS_ENABLE=1` | フラグや ini オプションでまだ有効になっていない場合に、キャプチャを有効にします。 |
| `DEVTOOLS_PORT=<n>` | このポートですでに待ち受けているダッシュボードに接続します。オプトインにもなります。 |
| `DEVTOOLS_HOST=<host>` | ダッシュボードに接続するホスト（デフォルトは `localhost`）。 |
| `DEVTOOLS_TRACE=1` | ダッシュボードを開く代わりにトレースアーカイブを書き出します。プレーンなスクリプトではモードを選択します。pytest では、それ自体では実行をオプトインしません。 |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | トレースモード: 実行全体で 1 つのアーカイブ、またはテストごとに 1 つ。環境的な設定であるため、それ自体でトレースモードを選択することはありません。`DEVTOOLS_TRACE=1` と組み合わせてください。 |
| `DEVTOOLS_TRACE_POLICY=<policy>` | トレースモード: どのアーカイブを保持する価値があるか。環境的な設定であるため、それ自体でトレースモードを選択することはありません。`DEVTOOLS_TRACE=1` と組み合わせてください。 |
| `DEVTOOLS_FILMSTRIP=0` | トレースモード: 高密度フィルムストリップをアーカイブに含めません。 |
| `DEVTOOLS_A11Y=0` | トレースモード: アクションごとの A11y ツリーと要素の矩形をスキップします。 |
| `DEVTOOLS_OPEN=0` | ダッシュボードウィンドウを開きません（CI）。 |
| `DEVTOOLS_BIDI=0` | BiDi を無効にし、それに伴いコンソールとネットワークのキャプチャも無効にします。 |
| `DEVTOOLS_RUN_ID=<id>` | 複数のプロセスを 1 つの実行にまとめます。 |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | 解決されたコマンドの代わりに、明示的なコマンドでバックエンドを起動します。 |

バックエンドは Node アプリケーションであるため、**どのモードでも Node.js 22.19 以降が利用可能である必要があります**。ダッシュボードウィンドウが一切開かないトレースモードでも同様です。UI だけの問題ではありません。ページコレクターはバックエンドから配信され、イベントストリーム全体はその WebSocket を経由し、トレースモードではアーカイブを構築するのもバックエンドです。`enable()` は最初に Node の有無を確認し、後になって起動タイムアウトとして失敗するのではなく、何が不足しているかを明示します。アダプターはバックエンドを自動的に検出または起動します。自分で管理したい場合は[バックエンドを単独で実行する](/docs/devtools/dashboard#running-the-backend-on-its-own)を参照するか、すでに実行中のバックエンドを `DEVTOOLS_PORT` で指定してください。その場合、ローカルの Node は不要です。

### アサーション

成功・失敗した `assert` 文は、**期待値**と**実際の値**を持つ行として表示され、失敗は Errors タブに送られます。Python の `assert` は呼び出しではなく文であるため、Node アダプターの `node:assert` へのパッチとは異なり、ラップするものがありません。結果はランナーから取得されます。

**pytest では**、値はアサーションリライターから取得されるため、すべての行に実際のオペランドが含まれます。*成功した*アサーションをキャプチャするには pytest の `enable_assertion_pass_hook` が必要ですが、これはプラグインが自動的に有効にします。注意点が 1 つあります。pytest はそのフックを出力するかどうかをモジュールごとに、*書き換え時に*決定するため、プラグインのインストール前に書き換え済みバイトコードがキャッシュされていたモジュールは、引き続き失敗のみを報告します。アダプターは収集時に一度その旨を通知し、削除すべきキャッシュを示します。これは必ずしもテストの隣にある `__pycache__` **ではありません**。`sys.pycache_prefix`（macOS のシステム Python ではデフォルトで設定されています）は、書き換えられたすべてのモジュールを 1 つの中央ツリーに送るためです。

**プレーンなスクリプトでは**リライターが存在しないため、結果はインタープリターの行イベントから取得され、値は assert を実行しようとしているフレームから読み取られます。コードを実行する可能性のない読み取りのみが解決されます。リテラルやローカル変数は解決されますが、属性や呼び出しは解決されません。`driver.current_url` を再度評価すると、別の WebDriver コマンドが発行されてしまうためです。

</TabItem>
</Tabs>

## トレースモード {#trace-mode}

**両方の言語**で使えるヘッドレスキャプチャ方式です。DevTools UI ウィンドウは開かず、実行結果は WebdriverIO のトレースアーティファクトと同じ形式のポータブルなトレースアーカイブとして `test-results/` フォルダーに書き出されます。両者の違いは、アーティファクトをどこまで調整できるかと、誰がそれを構築するかだけです。

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

セッション終了時に、アダプター自身が `trace-<sessionId>.zip`（またはディレクトリ）を、解決されたテスト / 設定ディレクトリの隣にある `test-results/` に書き出します。

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // 任意; デフォルトは 'zip'
})
```

トレースモードでは、バックエンドのポートバインド、UI ウィンドウ、`screencast` オプションはすべてスキップされます。機能の完全なリファレンス（アーティファクトの内容、ビューアー、モバイルテスト、`zip` と `ndjson-directory` の使い分け）については、[トレースモードのページ](/docs/devtools/wdio/trace-mode)を参照してください。

### テストごとのアーティファクトと保持

`traceGranularity: 'test'` では各テストが独自のアーティファクトフォルダーを持ち、`tracePolicy` がどれを保持するかを決定します（例: `retain-on-failure`）。このモードでは、テストごとの `screenshot`（PNG）と `video`（`.webm`）もキャプチャでき、フレーム単位のスクラブ用にトレースへ記録される高密度の `filmstrip` を有効にすることもできます。`allure-js-commons` ランナーアダプターが有効な場合、テストごとのトレース / スクリーンショット / 動画は Allure レポートにインライン添付されます（`emitArtifactsManifest` も自動的に有効になります）。それ以外の場合は `test-results/` に書き出され、マニフェストに記録されます。

```js
DevTools.configure({
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure',
  filmstrip: true,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
})
```

</TabItem>
<TabItem value="python" label="Python">

設定するオプションオブジェクトはありません。pytest ではフラグ、スクリプトではキーワード引数を使います:

```bash
pytest --devtools-trace tests/        # --devtools を含意
DEVTOOLS_TRACE=1 python3 login.py     # プレーンなスクリプト; devtools.enable(trace=True) と同じ
```

```python title="login.py"
devtools.enable(trace=True)           # ダッシュボードを開く代わりに trace.zip を書き出す
```

アーカイブは、最初にキャプチャされたコマンドの発生元であるテストファイルの隣の `test-results/`（スクリーンキャスト動画の書き出し先と同じディレクトリ）に、`trace-<sessionId>.zip` という名前で保存されます。[テストごとに 1 つのアーカイブ](#how-many-archives-and-which-ones-to-keep)を指定した場合は、各テストにちなんだ名前になります。ユーザーのソース位置を持つコマンドが 1 つもなかった場合は、カレントディレクトリ配下の `test-results/` にフォールバックします。

**ダッシュボードウィンドウは開きません。** アーティファクトが出力であり、ライブ実行はウィンドウを閉じるまでブロックされます。ウィンドウがあると、ファイルの書き出しが対話的なセッションになってしまいます。それでもバックエンドは起動します。アーカイブを*構築する*のがバックエンドだからです。トレース変換は TypeScript で書かれているため、Python の実行では 2 つ目のコピーを同梱する代わりにバックエンドに変換を依頼します。これが Node.js アダプターのバックエンド不要のトレースモードとの唯一の違いであり、[どのモードでも Node.js 22.19 以降が必要](#configuration-options)な理由です。

両方のモードでキャプチャされるコマンド行、コマンドごとのスクリーンショットとセレクター、コンソール、ネットワークに加えて、アーカイブには以下が含まれます:

| アーカイブの内容 | デフォルト | 無効化 |
|---|---|---|
| DOM タイムトラベル - プレーヤーがステップごとに再生するミューテーションストリーム | オン | - |
| 高密度フィルムストリップ - `.webm` の代わりにトレースに含まれるスクリーンキャストのフレーム | オン | `DEVTOOLS_FILMSTRIP=0` |
| A11y ツリーと要素オーバーレイ - 各アクションの横で読み取られ、コマンドごとに 2 回の追加ラウンドトリップが発生 | オン | `DEVTOOLS_A11Y=0` |

トレースモードは `.webm` をエンコードしないため、`ffmpeg` は不要です。フレームそのものが*フィルムストリップ*になります。

**エクスポートはプロセスの終了時ではなく、実行の完了時に要求されます。** pytest は `sessionfinish` で要求し、スクリプトの `disable()` はトランスポートを閉じる前にエクスポートします。そのため、ウィンドウが関与したかどうかに関係なく、CI でアーティファクトを取得できます。

### アーカイブの数と保持するアーカイブ {#how-many-archives-and-which-ones-to-keep}

これは 2 つの設定で決まり、どちらもトレースモード以外では意味を持ちません。

**粒度** - 実行で書き出すアーカイブの数:

| `--devtools-trace-granularity` | 結果 |
|---|---|
| `session`（デフォルト） | 実行全体で 1 つのアーカイブ。 |
| `test` | テストごとに 1 つのアーカイブ。それぞれにはそのテスト自身のコマンド、コンソール、ネットワーク、DOM ミューテーション、a11y ツリー、スクリーンキャストのフレームのみが含まれます。 |

ここには意図的に `spec` の値がありません。このアダプターでは spec がテストファイル*そのもの*であるため、3 つ目の名前を設けても、上の 2 つのどちらかを暗に意味するだけになってしまいます。

**ポリシー** - それらのアーカイブのうちどれを保持するか:

| `--devtools-trace-policy` | 結果 |
|---|---|
| `on`（デフォルト） | すべてを保持します。 |
| `retain-on-failure` | 失敗したものだけを保持します。 |
| `retain-on-first-failure`、`on-first-retry`、`on-all-retries`、`retain-on-failure-and-retries` | 受け付けますが、現時点では**`retain-on-failure` とまったく同じ動作**になります。 |

最後の 4 つはまだリトライを認識しません。期待していたアーカイブがなくて気付くよりも、はっきり明記しておく価値があるでしょう。このアダプターが送信するデータには試行回数が含まれないため、リトライされたテストは自身の以前の結果を上書きし、リトライに関する判断はそもそも行えません。バックエンドは、そうでないかのように振る舞うのではなく、機能が低下していることをログに出力します。これらを選ぶのは、将来より多くの意味を持つ名前で `retain-on-failure` を使いたい場合だけにしてください。

2 つは組み合わせて使用します:

| 粒度 | ポリシー | 得られるもの |
|---|---|---|
| `test` | `retain-on-failure` | 失敗したテストのみ。 |
| `session` | `retain-on-failure` | 何かが失敗した場合、実行全体のアーカイブ。 |
| どちらでも | `on` | すべて。 |

`test` 粒度で保持される各アーカイブは、そのテストにちなんで命名されます（`trace-<test>-<hash>.zip`。ハッシュはテストの nodeid から取得されるため、同じタイトルを共有する 2 つのパラメータ化ケースが互いに上書きすることはありません）。何も保持しない実行では何も書き出されません。それこそが狙いです。残るアーカイブは開く価値のあるものだけであり、エクスポートが見送られたのは失敗ではなく、ポリシーが機能している証拠です。

1 回の実行だけ設定する場合:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

または、プロジェクトをクローンしたコントリビューターが何も言われなくても同じ方法でキャプチャできるよう、設定をコミットします:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

`pyproject.toml` の `[tool.pytest.ini_options]` でも同じキーを使用でき、`pytest -o devtools_trace_policy=on tests/` でファイルを編集せずに 1 回の実行だけいずれかの設定を上書きできます。すべての設定とすべての環境変数について、それぞれの用途をコメントで説明した完全版は、リポジトリの [`examples/selenium/python-test/trace-py-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test/trace-py-test) にあります。

プレーンなスクリプトでは、同じ 2 つをキーワード引数として渡します:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**どちらかを明示的に指定すると、トレースモードが選択されます。** CLI フラグ、ini オプション、`enable()` の引数はすべてトレースモードを含意します。ポリシーや粒度はライブモードでは意味を持たず、モードなしでそれを受け入れると、指定した内容が黙って無視されてしまうためです。`DEVTOOLS_TRACE_POLICY` と `DEVTOOLS_TRACE_GRANULARITY` は意図的にトレースモードを含意**しません**。エクスポートされた変数は環境的なものであり、同じシェルの別のスクリプト用に設定されたものかもしれません。それを根拠にライブ実行をトレースモードに切り替えると、誰も望んでいないのにダッシュボードが失われてしまいます。`DEVTOOLS_TRACE=1` と組み合わせてください。エクスポートされたトレース設定が無視された実行では、作成されなかったアーカイブに後から気付くことのないよう、警告がログに出力されます。

</TabItem>
</Tabs>

### トレースの表示

任意のトレース `.zip` を、公式プレーヤー（専用の**プレーヤー**モードで動作する同じ DevTools UI）で開きます:

```bash
npx show-trace path/to/trace.zip      # アダプターをインストールしたプロジェクトで
pnpm show-trace path/to/trace.zip     # devtools モノレポから
```

`show-trace` バイナリは `@wdio/selenium-devtools` に同梱されているため、これをインストールしたどのプロジェクトでも追加の依存関係なしで利用できます。Python プロジェクトには Node.js アダプターはインストールされませんが、同じプレーヤーが、アダプターが自動的に取得するバックエンドに同梱されています: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`。

Selenium アダプターは、各スクリーンショットとともにページの **DOM ミューテーションストリーム**と、コマンドごとの要素 / アクセシビリティスナップショットをキャプチャするため、Selenium のトレースはプレーヤーのすべての機能を活用できます。DOM タイムトラベル、A11y タブとロケーター選択オーバーレイ、Copy-for-LLM 付きの Transcript タブ、Cucumber の Feature → Scenario → Step のネスト、スクラブ可能なタイムラインです。Python のトレースにも同じミューテーションストリームとアクションごとのスナップショットが含まれます（要素 / a11y の読み取りは Python ではトレースモードのみで、デフォルトでオン）。pytest に相当するものがないのは Gherkin のネストだけです。

トレースはポータブルな NDJSON スキーマを使用しているため、同じ `.zip`（またはディレクトリ）を他の互換トレースビューアーでも開けます。詳しい手順については **[Trace Player](/docs/devtools/trace-player)** ページを参照してください。

## 公開 API

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // ランタイムオプションを設定（上記参照）
DevTools.startTest(name, meta?)      // 名前付きのテスト境界をマーク（プレーンな Node スクリプトのみ）
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

Mocha / Jest / Cucumber では、プラグインがランナーのライフサイクルに自動的にフックするため、`startTest` / `endTest` を手動で呼び出す必要はありません。呼び出すと行が重複してしまいます。

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # 接続して計装する; 冪等
devtools.disable()                    # 終了処理; 2 回呼び出しても安全
devtools.wait_for_dashboard_close()   # ウィンドウが閉じられるまでブロック
devtools.get_capturer()               # 稼働中の SessionCapturer、または None
devtools.dashboard_url()              # ダッシュボードが配信されている URL
```

`enable()` は、オプションの `host` と `port` に加えて、キーワード引数を受け取ります:

```python
devtools.enable(trace=True)                            # trace.zip を書き出す; ウィンドウは開かない
devtools.enable(trace=True, filmstrip=False)           # ... 高密度フィルムストリップなし
devtools.enable(trace=True, a11y=False)                # ... アクションごとの要素 / a11y の読み取りなし
devtools.enable(trace_granularity='test')              # ... テストごとに 1 つのアーカイブ（trace=True を含意）
devtools.enable(trace_policy='retain-on-failure')      # ... 失敗したものだけを保持（trace=True を含意）
```

`filmstrip` と `a11y` はトレースモードにのみ適用され、それぞれデフォルトでオンです（`DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` で環境変数から同じ設定を行えます）。`trace` は `DEVTOOLS_TRACE` にフォールバックします。`trace_granularity` と `trace_policy` は `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY` にフォールバックし、どちらかを渡すとそれだけでトレースモードが有効になります。[アーカイブの数と保持するアーカイブ](#how-many-archives-and-which-ones-to-keep)を参照してください。受け付けられる値以外を指定すると、後になってファイルがないことで発覚するのではなく、警告が出てデフォルトにフォールバックします。

pytest では、プラグインがこれらすべてを `--devtools` / `--devtools-trace`（または対応する ini オプション、あるいは `DEVTOOLS_ENABLE=1`）から制御し、テストの境界は pytest 自身のフックから取得されます。呼び出すべき `startTest` / `endTest` に相当するものはありません。

</TabItem>
</Tabs>

## 例

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

動作する例は、リポジトリのトップレベルにある `examples/` ディレクトリにあります。ワークスペースを一度ビルドし（`pnpm install && pnpm build`）、リポジトリのルートから実行してください。`pnpm demo:selenium` はデフォルト（Cucumber）の例を実行します。ランナーごとのバリエーションは以下のとおりです:

| ディレクトリ | ランナー | コマンド |
|-----------|--------|---------|
| [`examples/selenium/mocha-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/mocha-test) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium/jest-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/jest-test) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium/cucumber-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/cucumber-test) | Cucumber | `pnpm demo:selenium` |

</TabItem>
<TabItem value="python" label="Python">

Python の例は [`examples/selenium/python-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test) にあります。アダプターをインストールしてワークスペースを一度ビルドし（バックエンドが存在するよう `pnpm install && pnpm build`）、リポジトリのルートから実行してください:

| 例 | 内容 | コマンド |
|---|---|---|
| `web_form.py` | 3 行のプレーンなスクリプトのセットアップ | `pnpm demo:python` |
| `login.py` | より長いスクリプト: ナビゲーション、フォーム入力、アサーション | `pnpm demo:python:login` |
| `trace-py-test/` | クラスとモジュールレベルのテストを含む pytest と、トレースモード・粒度・保持をコミットする `pytest.ini`。各設定にはその役割がコメントで記載されています | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## 機能

Selenium アダプターは、両方の言語で WebdriverIO と同じ DevTools UI 体験を提供します。以下のすべての機能は、機能ごとの設定なしで自動的にキャプチャされます。Node.js では基本の `DevTools.configure({})`、Python では `pytest --devtools` だけで十分です。コンソールとネットワークは Selenium の BiDi ハンドラーを通じてストリーミングされ、Node.js では注入されたコレクターによるフォールバックがあります。リンク先は各機能の完全なリファレンスです。

- **[Interactive Test Rerunning & Visualization](/docs/devtools/wdio/interactive-test-rerunning)** - ライブブラウザプレビュー、コマンドごとのスクリーンショット、ワンクリックでのテスト/スイートの再実行
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - 失敗したテストのスナップショットを取り、再実行して、2 つの実行を並べて比較
- **[Multi-Framework Support](/docs/devtools/wdio/multi-framework-support)** - Node.js では Mocha、Jest、Cucumber、プレーンなスクリプトを、Python では pytest またはプレーンなスクリプトを自動検出
- **[Console Logs](/docs/devtools/wdio/console-logs)** - ブラウザのコンソール出力をキャプチャして調査
- **[Network Logs](/docs/devtools/wdio/network-logs)** - API 呼び出しとネットワークアクティビティを監視
- **[Metadata](/docs/devtools/wdio/metadata)** - ブラウザセッションごとのセッションケイパビリティ、環境、タイミング
- **[TestLens](/docs/devtools/wdio/testlens)** - 任意のコマンドから、それを発生させたソース行へジャンプ
- **[Session Screencast](/docs/devtools/wdio/screencast)** - ブラウザセッションの自動動画録画
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - ポータブルな `trace.zip` を生成するヘッドレスキャプチャ（UI ウィンドウなし）。両方の言語で利用でき、テストごとの分割と保持にも両方で対応しています（Node.js では `traceGranularity` / `tracePolicy`、Python では `--devtools-trace-granularity` / `--devtools-trace-policy`）。テストごとの `screenshot` / `video` と Allure へのインライン添付は Node.js のみです。[トレースモード](#trace-mode)を参照してください

Node.js では、スクリーンキャストが独自のオプションを持つ唯一の機能です（[設定オプション](#configuration-options)を参照）:

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

Python では設定は不要です。Chrome は CDP 経由でフレームをストリーミングし、他のブラウザはコマンドごとに 1 枚のスクリーンショットにフォールバックします。`.webm` のエンコードには `PATH` 上に `ffmpeg` が必要です。トレースモードでは、同じフレームが `.webm` の代わりにアーカイブの高密度フィルムストリップになるため、エンコードは行われず、`ffmpeg` は不要です。

## 仕組み

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

プラグインは、インポート時に `selenium-webdriver` の `Builder`、`WebDriver`、`WebElement` のプロトタイプにパッチを適用します:

- **`Builder.build()`** - 構築後、ドライバーがセッションキャプチャーに登録され、DevTools バックエンドが切り離された子プロセスで起動されます。
- **すべての公開 `WebDriver` / `WebElement` メソッド** - コマンドキャプチャ（引数 + 結果 + スクリーンショット + 呼び出し元）でラップされます。
- **`WebDriver.quit()`** - 元の quit が実行される前に、await されるクリーンアップフックがスクリーンキャストのエンコード、WebSocket バッファ、最終メタデータをフラッシュします。

BiDi が利用可能な場合（Chrome ≥114）、コンソールログ、JavaScript 例外、ネットワークイベントは Selenium BiDi ハンドラーを通じて直接ストリーミングされます。それ以外の場合、プラグインは注入されたブラウザ側のコレクタースクリプトにフォールバックします。

同じ注入されたコレクターは、ページの **DOM ミューテーションストリーム**と、コマンドごとの要素 / アクセシビリティスナップショットも記録するため、トレースには各ステップでライブ DOM を再構築するのに十分な情報（ナビゲーションごとのマッピング）が含まれます。これにより、プレーヤーはスクリーンショットだけの再生ではなく、DOM タイムトラベルと A11y タブを実現しています。

</TabItem>
<TabItem value="python" label="Python">

パッチを適用するプロトタイプがないため、Python アダプターは代わりに 1 つのメソッドをラップします:

- **`WebDriver.execute()`** - すべてのコマンドが通過する唯一のチョークポイントです。要素のメソッドもここに委譲する（`self._parent.execute`）ため、要素クラスに手を加えなくても、`click`、`send_keys`、`text` が同じラッパーでキャプチャされます。
- **セッションのセットアップ** - 最初の実際のコマンドでドライバーが登録され、メタデータが送信され、BiDi、コレクター、スクリーンキャストが準備されます。
- **`quit()`** - セッションが破棄される前にインターセプトされるため、ドライバーがまだ存在する間にスクリーンキャストがエンコードされ、最終フレームがフラッシュされます。

コンソール、JavaScript 例外、ネットワークは selenium の BiDi レイヤー（4.44 以降）を通じてストリーミングされます。アダプターは `newSession` リクエストに `webSocketUrl` ケイパビリティを注入することで、これを自動的に有効にします。

**DOM ミューテーションストリーム**は Node.js と同じブラウザ側のコレクターから取得され、BiDi を通じてドキュメント開始時に登録されるため、ページ自身のスクリプトが実行される前にページが計装されます。Chrome では、スクリーンキャストはブラウザが独自の CDP WebSocket 経由でプッシュします。これはセッションのコマンドチャネルとは別のものであり、Selenium セッションがスレッドセーフでない場合でも実際のフレームストリームを安全に扱えるのはこのためです。

</TabItem>
</Tabs>

## 制限事項

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| 制限事項 | 詳細 |
|-----------|--------|
| Cucumber のリーフステップの再実行 | Cucumber の `--name` フィルターはシナリオを対象とし、個々の Gherkin ステップは対象としません。Cucumber では、ダッシュボードのステップごとの再実行は無効になります。 |
| ヘッドレスモードの注意点 | `headless: true` は `--headless=old` を注入します。`--headless=new` では、スクリーンキャストの CDP フレームがすべて真っ黒になります。 |
| 初期ビューポート | 最初のナビゲーションが完了し、ブラウザ側のコレクターが実際のビューポートを報告するまで、ダッシュボードのスナップショット iframe は 1280×800 にフォールバックします。 |

</TabItem>
<TabItem value="python" label="Python">

| 制限事項 | 詳細 |
|-----------|--------|
| テストごとのスクリーンショット、動画、Allure 添付はなし | テストごとの**トレースアーカイブ**はサポートされています（`--devtools-trace-granularity test`）が、Node.js アダプターのテストごとの `screenshot` および `video` オプションと、`allure-js-commons` へのインライン添付には Python の同等機能がありません。アーカイブがアーティファクトとなります。 |
| リトライを考慮した保持は機能が低下する | `retain-on-first-failure`、`on-first-retry`、`on-all-retries`、`retain-on-failure-and-retries` は受け付けられますが、`retain-on-failure` とまったく同じ動作になります。送信されるデータに試行回数が含まれないため、リトライされたテストは自身の以前の結果を上書きします。バックエンドは機能が低下していることをログに出力します。 |
| どのモードでも Node が必要 | バックエンドは Node アプリケーションであり、ページコレクターを配信し、イベントストリームを運び、トレースアーカイブを構築します。そのため、ウィンドウが開かないトレースモードでも Node.js 22.19 以降が必要です。アダプターがバックエンドを自動的に検出または起動します。 |
| ブラウザオプションはユーザーが管理 | `headless` オプションはありません。通常どおり、selenium 自身の `Options` オブジェクトで Chrome を設定してください。 |
| ライブモードの動画には ffmpeg が必要 | `PATH` 上に `ffmpeg` がない場合、`.webm` のエンコードはエラーではなく警告とともにスキップされます。トレースモードではエンコードを行わず、フレームはフィルムストリップに入るため、ffmpeg は一切必要ありません。 |

</TabItem>
</Tabs>