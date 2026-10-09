---
id: trace-mode
title: トレースモード
description: "DevTools のトレースモードでヘッドレスにトレースアーティファクトを取得し、フォーマット、粒度、保持ポリシー、スクリーンショット、動画、アサーションを設定します。"
---

ヘッドレスのキャプチャ経路です — DevTools UI ウィンドウは開きません。セッション終了時、アダプターはスペック / 設定ディレクトリの隣にある `test-results/` フォルダーにトレースアーティファクトを書き出します。`session` / `spec` 粒度の場合は `trace-<sessionId>.zip`(または `trace-<sessionId>/` ディレクトリ)となり、`test` 粒度の場合は各テストごとに専用のサブフォルダーが作成されます([トレースの粒度](#trace-granularity--tracegranularity)を参照)。このアーティファクトはポータブルで、オフラインでの再生、AI エージェントによる差分比較、あるいはライブ UI よりもファイルを好むあらゆる利用者に必要なものがすべて含まれています。

トレースモードは**ライブモードと排他的**です。セッションごとにどちらか一方を選択してください。インタラクティブにデバッグする人間にはライブモードが、実行結果を差分比較するエージェントやアーティファクトを収集する CI ボットにはトレースモードが適しています。

## 有効化

```ts
// wdio.conf.ts
services: [
  [
    'devtools',
    {
      mode: 'trace',
      traceFormat: 'zip' // 任意; 'zip'(デフォルト)| 'ndjson-directory'
    }
  ]
]
```

そのままコピーして使える完全なリファレンス設定が [`examples/wdio/wdio.trace.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.trace.conf.ts) に用意されています。

Selenium と Nightwatch にも同じトレースパイプラインが搭載されています — フレームワーク固有の有効化構文については各アダプターのページを参照してください: [Selenium](/docs/devtools/selenium#trace-mode) · [Nightwatch](/docs/devtools/nightwatch#trace-mode)。

## アーティファクトの中身

| ファイル | 内容 |
|---|---|
| `trace.trace` | NDJSON 形式の `context-options` + `before` / `after` アクションイベント。1 レコードにつき 1 行 |
| `trace.network` | HAR 形式のネットワークエントリ。1 行につき 1 件 |
| `transcript.md` | タイミング、セレクター、値の注釈を含む、人間/LLM が読みやすい Markdown サマリー |
| `resources/page@<id>-<ts>.jpeg` | ユーザー向けの各アクション時に撮影されたスクリーンショット |
| `resources/page@<id>-<ts>-elements.json` | そのアクション時点で操作可能な要素のフラットなリスト |
| `resources/page@<id>-<ts>-snapshot.txt` | 深さでインデントされたアクセシビリティツリーのスナップショット(AI フレンドリー) |

### 「アクション」として扱われるもの

コマンドは、トレースエントリを生成する前に許可リストでフィルタリングされます。トレースに記録される例:

- `url` / `get` → `Page.navigate`
- `click` → `Element.click`
- `setValue` / `sendKeys` → `Element.fill`
- `submit`、`clear`、`selectByVisibleText`、…

`findElement`、`waitUntil`、`executeScript` などの内部コマンドは意図的に除外されています — これらはユーザー向けの意図を表すものではなく、タイムラインのノイズになるためです。完全な許可リストは [`@wdio/devtools-core/action-mapping.ts`](https://github.com/webdriverio/devtools/blob/main/packages/core/src/action-mapping.ts) にあります。

## 出力フォーマット — `traceFormat`

```ts
{
  mode: 'trace',
  traceFormat: 'zip' | 'ndjson-directory'  // デフォルト: 'zip'
}
```

- **`zip`**(デフォルト)— `test-results/trace-<sessionId>.zip` に単一のアーカイブを出力します。
- **`ndjson-directory`** — 同じファイルを `test-results/trace-<sessionId>/` に展開した状態で出力します。NDJSON を直接 grep / ストリーム処理したいスクリプトやエージェントにとって、解凍の手間が 1 つ省けます。

どちらのフォーマットも、公式の [`show-trace` プレイヤー](/docs/devtools/trace-player)およびその他の互換トレースビューアーで開けます。

## トレースの粒度 — `traceGranularity`

1 回の実行で生成されるトレースアーティファクトの数を指定します:

```ts
{
  mode: 'trace',
  traceGranularity: 'session' | 'spec' | 'test' // デフォルト: 'session'
}
```

| 値 | 出力 |
|---|---|
| `session`(デフォルト) | ワーカー/セッションごとに 1 つのトレース — `test-results/trace-<sessionId>.zip`。 |
| `spec` | スペックファイルごとに 1 つのトレース。より小さく、ナビゲートしやすくなります。 |
| `test` | **テストごとに** 1 つのトレースを、それぞれ専用のフォルダーに出力: `test-results/<spec>-<title>-<browser>[-retry<N>]/trace.zip`。 |

`test` 粒度の場合、フォルダー名はスペックのベース名、テストタイトルのスラッグ、ブラウザー、そしてリトライ時の `-retry<N>` サフィックスから構成されます — 例: `test-results/login_e2e-logs-in-chrome/trace.zip`、最初のリトライは `test-results/login_e2e-logs-in-chrome-retry1/trace.zip`。テストごとのトレースは最もナビゲートしやすく、必要なトレースだけが書き出されるよう保持ポリシーと組み合わせるのが最適です。

## 保持ポリシー — `tracePolicy`

デフォルトではすべてのトレースが保持されます(`'on'`)。必要なものだけを保持するには — `traceGranularity: 'test'` との組み合わせが理想的です:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure' // デフォルト: 'on'
}
```

| ポリシー | トレースが保持される条件… |
|---|---|
| `'on'`(デフォルト) | 常に — すべてのトレースが書き出されます。 |
| `'retain-on-failure'` | テストの**最終**試行が失敗した場合。失敗→成功というリトライの流れは最終的に `passed` となるため、保持*されません* — 最終的にグリーンになったフレーキーなテストを過剰に保持することはありません。 |
| `'retain-on-first-failure'` | 後のリトライが成功したかどうかに関わらず、**試行 0** が失敗した場合。 |
| `'on-first-retry'` | テストが少なくとも 1 回リトライされた場合(試行 1 が存在する)。 |
| `'on-all-retries'` | リトライされた試行(試行 ≥ 1)が存在する場合。 |
| `'retain-on-failure-and-retries'` | 最終試行が失敗した場合、**または**テストがリトライされた場合。 |

保持対象外と判定されたスライスはディスクに書き出されません。リトライを考慮するポリシーは、アダプターがリトライ間で安定したテスト ID ごとに保持する試行単位の**結果台帳**に基づいて判定するため、`retain-on-failure` と `retain-on-first-failure` は正しい試行を評価します。ランナーが試行ごとのリトライ情報を公開しない場合、`retain-on-failure` 以外のすべてのポリシーは `retain-on-failure` にフォールバックします。結果が一切観測されなかった実行(例: 単純なスタンドアロンスクリプト)は**オープン側に倒れ**、必要なトレースを失うリスクを避けるためにトレースを保持します。

> リトライを考慮した保持は、**WebdriverIO**(mocha / cucumber)と **Selenium**(mocha)でエンドツーエンドに検証済みです。**Nightwatch** では `retain-on-failure` は動作しますが、Nightwatch の `--retries` はテストごとのフックを再発火させずに内部でテストケースを再実行するため、その他のリトライ考慮ポリシーは `retain-on-failure` にフォールバックします。また、WDIO のプロセスをまたぐ `specFileRetries` も(ワーカー単位の)台帳の対象外です。詳細は [Nightwatch アダプターのページ](/docs/devtools/nightwatch#trace-mode)を参照してください。

## 高密度フィルムストリップ — `filmstrip`

**デフォルトでは**、トレースは**高密度で連続的な**スクリーンキャストを記録するため、プレイヤーはフレーム間をジャンプするのではなく滑らかに再生をスクラブできます。高密度フレームは、アクションごとのフレーム(DOM スナップショットを含む)と並んで格納されます。`filmstrip: false` を設定すると、アクションごとに 1 フレームのみを記録します — 連続レコーダーを使わない、より小さなトレースになります:

```ts
{
  mode: 'trace',
  filmstrip: false // オプトアウト — アクションごとに 1 フレーム(デフォルトは true)
}
```

- 高密度フレームはアクションごとのフレーム(DOM スナップショットを含む)に**加えて**追加されるため、DOM データが失われることはありません — 高密度フレームが存在する場合、スクラブ時にはまばらなアクションごとのフィルムストリップよりも優先されます。
- フレームはエクスポート時に間引かれ(100 ms 以上の間隔)、コンテンツアドレス化されるため、同一のフレーム(静的な待機など)は 1 つのリソースにまとめられます。ライブセッションのバッファは `screencast.maxBufferFrames`(デフォルト 2000)で上限が設定されています。
- 記録にはスクリーンキャストレコーダーを使用します — Chrome/Chromium では CDP プッシュ、それ以外ではスクリーンショットのポーリングです。Chrome 以外のブラウザーではポーリングにより多数の `takeScreenshot` コマンドが発行されるため、レポーターのステップ抑制オプションと組み合わせてください([Allure 連携](/docs/devtools/allure)を参照)。

`filmstrip` は 3 つのアダプターすべて(WebdriverIO / Selenium / Nightwatch)で利用できます。

## テストごとのスクリーンショットと動画 — `screenshot` / `video`

`traceGranularity: 'test'` では、各テストがスタンドアロンのスクリーンショットやテストごとの動画スライスを生成することもでき、おなじみの「失敗時にスクリーンショット/動画」という使い勝手を再現します:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  screenshot: 'only-on-failure', // 'off'(デフォルト)| 'on' | 'only-on-failure'
  video: 'retain-on-failure'     // 'off'(デフォルト)| 任意の tracePolicy の値
}
```

| オプション | 値 | 動作 |
|---|---|---|
| `screenshot` | `'off'`(デフォルト)· `'on'` · `'only-on-failure'` | `'on'` はすべてのテストの後にキャプチャし、`'only-on-failure'` は失敗したテストの後にのみキャプチャします。PNG 形式。 |
| `video` | `'off'`(デフォルト)· 任意の `tracePolicy` の値 | スクリーンキャストを連続的に記録し、`tracePolicy` と同じ保持セマンティクスに従って各テストのスライスを保持します。WebM 形式。`off` 以外の値を設定するとレコーダーが単独で起動するため、`filmstrip` や `screencast.enabled` を別途設定する必要はありません。 |

どちらもトレースモード + `traceGranularity: 'test'`(これらが紐づくテスト単位のスコープ)でのみ有効です。より粗い粒度では何も行いません。

- **WebdriverIO** — `screenshot` / `video` はサービスオプションです。`@wdio/allure-reporter` が存在する場合、Allure にインラインで添付されます。
- **Selenium** — `DevToolsOptions` に同じオプションがあります。Allure ランナーアダプターが有効な場合、`allure-js-commons` 経由で Allure にインラインで添付されます。
- **Nightwatch** — **生成のみ**: ファイルはトレース出力ディレクトリに書き出され(マニフェストにも記載されます)ますが、Allure にはインラインで添付されません — Nightwatch にはライブな Allure 添付 API がないためです。[トレースモードの制限事項](/docs/devtools/limitations)を参照してください。

> `screencast.enabled` は別機能である**ライブモード**の連続 `.webm` 記録であり、トレースモードでは無視されます。トレースモードでは `filmstrip`(トレースへの高密度フレーム)またはテストごとの `video` を使用してください。スクリーンキャストの調整フィールド(`quality`、`maxWidth`、`pollIntervalMs`、…)は、実行されるいずれのレコーダーにも引き続き適用されます。

## アーティファクトマニフェスト — `emitArtifactsManifest`

トレースの隣に `devtools-artifacts-<sessionId>.json` を書き出します — レポーターや CI が生成されたアーティファクト(すべてのトレース / スクリーンショット / 動画、および各テストの状態)を検出するために利用する汎用インデックスです:

```ts
{
  mode: 'trace',
  emitArtifactsManifest: true // デフォルト: オフ; Allure が検出されると自動的にオン
}
```

- **デフォルトではオフ**です。Allure レポーターが検出されると**自動的に有効化**されます — 設定内の WebdriverIO の `@wdio/allure-reporter`、またはアクティブな Selenium の `allure-js-commons` ランタイムです。
- **Nightwatch はオプトイン**です: 自動検出の対象となるライブな Allure シグナルがない(`nightwatch-allure` は事後処理)ため、自動的に有効になることはありません — マニフェストが必要な場合は明示的に設定してください。

## アサーション — `captureAssertions`

アサーションはトレース内でファーストクラスのアクション行として表示されます(デフォルトでオン。オプトアウトするには `captureAssertions: false` を設定):

- **`node:assert`** — 3 つのアダプターすべてで `assert.<method>` 行としてキャプチャされます。
- **WebdriverIO `expect`** — 成功*および*失敗した `expect(...)` マッチャー(`expect($el).toHaveText(...)`、`toBeExisting()`、…)が、期待値、要素のソース位置、スナップショットを伴う `expect.<matcher>` 行として表示されます。マッチャー内部のポーリングコマンドは抑制されるため、アサーションのみが表示されます。
- **Nightwatch `browser.assert.*` / `browser.verify.*`** — ネイティブのアサーションが `assert.<m>` / `verify.<m>` 行として表示されます。

成功したアサーションは緑色で、失敗したものはエラーメッセージとともに赤色で表示されます。

## モバイルテスト

トレースモードは `platformName: 'android' | 'ios'`(大文字小文字を区別しない)によってモバイルセッションを検出し、次のように調整します:

- **モバイル Web**(Android の Chrome、iOS の Safari): デスクトップと同じ DOM ベースのスナップショットパイプラインを使用します。
- **ネイティブモバイル**: ページに注入される DOM スクリプトは無効化され、代わりに `getPageSource()` を使用して Appium の XML ツリーを取得し、スナップショットシリアライザーに渡します。

トレースの `context-options` には `title: 'android — <deviceName>'` / `'ios — <deviceName>'` が記録されるため、ビューアーはフレームに正しくラベルを付けられます。Appium 経由で Android Chrome を使用する WDIO のリファレンス設定が [`examples/wdio/wdio.mobile.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.mobile.conf.ts) に用意されています。

## アーティファクトの閲覧

トレースは公式の **[Trace Player](/docs/devtools/trace-player)** で開けます — 専用の読み取り専用プレイヤーモードで動作する WebdriverIO DevTools UI です:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
```

プレイヤーでは、DOM のタイムトラベル、A11y タブとロケーター選択オーバーレイ、Copy-for-LLM 付きの Transcript タブ、Errors / Console / Network / Source のドックタブ、そしてスクラブ可能なタイムラインを利用できます。同じポータブルな `.zip` は、他のスタンドアロンのトレースビューアーや Allure レポートの埋め込みビューアーでも開けます。詳しい使い方、機能、キーボードショートカットについては **[Trace Player](/docs/devtools/trace-player)** のページを参照してください。

## さらに詳しく
各アダプターに同梱されている `show-trace` bin は、同じアーカイブを DevTools プレイヤーで開きます。プレイヤーではさらに **A11y タブ**が利用できます: アクションごとにキャプチャされたアクセシビリティツリーで、行をクリックするとその要素のロケーターがコピーされます。

これらのロケーターは記録したランナー独自の記法で書かれているため、トレースを生成したフレームワークにそのまま貼り付けられます。テキストのみで識別される要素は、WebdriverIO では `a*=Logout`、Selenium では `//a[contains(., "Logout")]` となり、それを解決する呼び出し `By.xpath()` がキャプションとして付きます。Nightwatch は `button[type="submit"]` のようなネイティブ CSS ロケーターを優先します。これは、デフォルトの CSS 戦略のもとで素のセレクター文字列を読み取る唯一のランナーであるためで、一意の CSS ロケーターが存在しない場合にのみ XPath(キャプション `useXpath()` / `locateStrategy: 'xpath'`)にフォールバックします。それ以外のロケーターはすべてポータブルな CSS です。

LLM / エージェントで利用する場合は、`transcript.md` を直接読み込んでください — セレクターと値を含むアクションを簡潔に Markdown でレンダリングしたものです。

- **[Trace Player](/docs/devtools/trace-player)** — `show-trace` プレイヤーの詳しい使い方、機能、キーボードショートカット。
- **[Allure 連携](/docs/devtools/allure)** — トレース / スクリーンショット / 動画のアーティファクトを Allure レポートに添付する方法。
- **[クロスフレームワークサポート](/docs/devtools/cross-framework)** — アダプターごとの機能マトリクス(WebdriverIO / Selenium / Nightwatch)。
- **[トレースモードの制限事項](/docs/devtools/limitations)** — トレースモードで省略されるものと、アダプターごとの既知のギャップ。
- **[設定リファレンス](/docs/devtools/reference)** — すべてのオプションの一覧。