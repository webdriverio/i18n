---
id: session-commands
title: wdio session コマンド
description: open から doctor、skill まで、wdio session のすべてのアクションとフラグ。
slug: /session-commands
---

<!-- Generated from packages/wdio-session/src/actions/specs.ts by `pnpm run docs:session-commands`. Do not edit by hand. -->

`wdio session` のすべてのアクションを掲載しています。グローバルフラグはすべてのアクションに適用されます。同じ内容は `npx wdio session <action> --help` でも表示されます。[WebdriverIO Session](/docs/session) セクションの他のページでは、[ターゲット](/docs/session/targets)、[スナップショット](/docs/session/snapshots)、[`exec`](/docs/session/exec)、[エクスポート](/docs/session/export)、[デバッグ](/docs/session/debug)について説明しています。

```sh
npx wdio session <action> [arguments] [flags]
```

## グローバルフラグ

| フラグ | 説明 |
| --- | --- |
| `-s, --session` | セッション名（環境変数 WDIO_SESSION、デフォルトは "default"） |
| `--json` | JSON オブジェクトを 1 つ出力する（環境変数 WDIO_SESSION_JSON=1） |
| `--timeout` | リクエストのタイムアウト（ミリ秒、wait 以外は上限 60000） |
| `-q, --quiet` | 成功時は要求されたデータ以外何も出力しない |
| `--color` | --no-color で色を無効化 |

終了コード: 0 成功、1 アクションまたはコードの失敗、2 使用方法の誤り、3 依存関係または認証情報の不足、4 その名前のセッションが存在しない。

## `open`

セッションを開始します: browser、android、ios、macos、windows、electron、tauri、dioxus、または wdio 設定ファイル。

`close` されるまで、または --idle-timeout（デフォルト 30m）の間アイドル状態が続くまで、セッションを維持するバックグラウンドデーモンを起動します。--headed を指定しない限り、ブラウザはヘッドレスで実行されます。セッション名、ターゲット、スナップショット・スクリーンショット・エクスポートが保存される成果物ディレクトリを出力し、URL を指定して開いたブラウザの場合はそのページのインタラクティブスナップショットも出力します。

1 つの名前につき 1 つのセッションです。すでに実行中の名前で開こうとすると失敗します。そのセッションを使うか、閉じるか、--replace を指定してください。`-s <name>` は 2 つのセッションを同時に必要とする場合にのみ指定します。

```sh
npx wdio session open <target> [url]
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `target` | はい | chrome \| firefox \| edge \| safari \| android \| ios \| macos \| windows \| electron `<app>` \| tauri `<app>` \| dioxus `<app>` \| `<wdio.conf>` |
| `url` | いいえ | 開く URL（ブラウザ）、アプリのパス（デスクトップアプリ）、または capability（設定ファイル） |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--replace` | 同じ名前で実行中のセッションを先に閉じる |
| `--launch-timeout <n>` | セッションの準備ができるまで待機するミリ秒 |
| `--idle-timeout <value>` | リクエストがないままこの時間が経過したら終了する（例: 30m、0 で無効） |
| `--capabilities <value>` | 追加の capabilities（JSON または JSON ファイルへのパス） |
| `--hostname <value>` | リモート WebDriver のホスト |
| `--port <n>` | リモート WebDriver のポート |
| `--path <value>` | リモート WebDriver のパス |
| `--protocol <value>` | リモート WebDriver のプロトコル |
| `--log-level <value>` | daemon.log に書き込まれる WebdriverIO のログレベル |
| `--bidi` | WebDriver BiDi を要求する（--no-bidi で無効化） |
| `--headed` | ブラウザウィンドウを表示する |
| `--headless` | ウィンドウなしで実行する（ブラウザのデフォルト。--headed より優先） |
| `--snapshot` | 開いたページのインタラクティブスナップショットを出力する（--no-snapshot でスキップ） |
| `--viewport <value>` | 初期ビューポート（例: 1280x720） |
| `--browser-version <value>` | ブラウザのバージョン |
| `--binary <value>` | ブラウザのバイナリ |
| `--arg <value>` | 追加のブラウザ引数。`-` で始まる値には `=` が必要（例: `--arg=--disable-gpu`）（複数指定可） |
| `--profile <value>` | 永続プロファイルディレクトリ |
| `--attach <value>` | 実行中の Chrome/Edge にアタッチする（デバッグポートまたは URL） |
| `--app <value>` | アプリファイルまたはクラウドアプリの URL |
| `--package <value>` | Android アプリのパッケージ |
| `--activity <value>` | Android アプリのアクティビティ |
| `--bundle-id <value>` | iOS/macOS の bundle id |
| `--browser <value>` | モバイル Web ブラウザ（chrome、safari） |
| `--device <value>` | デバイス名 |
| `--platform-version <value>` | プラットフォームのバージョン |
| `--udid <value>` | デバイスの UDID |
| `--reset` | --no-reset でアプリの状態を保持する（appium:noReset） |
| `--full-reset` | appium:fullReset |
| `--orientation <portrait\|landscape>` | 初期の画面の向き |
| `--appium-url <value>` | 実行中の Appium サーバーを使用する |
| `--app-arg <value>` | デスクトップアプリに渡す引数。`-` で始まる値には `=` が必要（例: `--app-arg=--no-sandbox`）（複数指定可） |
| `--chromedriver <value>` | Electron: Chromedriver のバイナリ |
| `--electron-version <value>` | Electron: バージョン検出を上書きする |
| `--provider <browserstack\|saucelabs\|testingbot\|testmu>` | クラウドプロバイダー |
| `--os <value>` | クラウド: デスクトップ OS |
| `--os-version <value>` | クラウド: デスクトップ OS のバージョン |
| `--region <value>` | クラウド: Sauce Labs のリージョン |
| `--tunnel <value>` | クラウド: プロバイダーのトンネルを起動する（または "external"） |
| `--tunnel-name <value>` | クラウド: トンネル識別子 |
| `--project <value>` | クラウド: プロジェクトラベル |
| `--build <value>` | クラウド: ビルドラベル |
| `--name <value>` | クラウド: セッション名ラベル |

**例**

```sh
# ローカルアプリでヘッドレス Chrome を開く
npx wdio session open chrome http://localhost:3000

# ウィンドウを表示して Firefox を開く
npx wdio session open firefox http://localhost:3000 --headed

# Appium 経由で Android アプリを開く
npx wdio session open android --app ./app.apk

# インストール済みの iOS アプリを開く
npx wdio session open ios --bundle-id com.example.shop

# Electron アプリを開く
npx wdio session open electron ./main.js

# 設定ファイルの最初の capability を開く
npx wdio session open ./wdio.conf.ts 0

# クラウドグリッドで Chrome を開く
npx wdio session open chrome https://example.com --provider browserstack
```

関連項目: [`snapshot`](#snapshot)、[`close`](#close)、[`doctor`](#doctor)。

## `close`

セッションを終了し、そのデーモンを停止します。

`wdio run --debug=agent` で開かれたセッションでは、一時停止中のテストが失敗になります。テストを続行させるには `resume` を使用してください。

```sh
npx wdio session close
```

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--all` | すべてのセッションを閉じる |
| `--clean` | 成果物ディレクトリも削除する |

**例**

```sh
# デフォルトのセッションを閉じる
npx wdio session close

# すべてのセッションを閉じ、その成果物を削除する
npx wdio session close --all --clean
```

関連項目: [`open`](#open)、[`list`](#list)。

## `list`

実行中のセッションを一覧表示します。

セッションごとに 1 行ずつ、名前、ターゲット、URL、経過時間を出力します。終了したセッションが残した状態は削除されます。

```sh
npx wdio session list
```

**例**

```sh
# 実行中のすべてのセッションを表示する
npx wdio session list
```

関連項目: [`info`](#info)、[`status`](#status)。

## `info`

セッションの詳細を表示します。

ターゲット、ブラウザとバージョン、BiDi サポート、成果物ディレクトリ、そして現在の URL、タイトル、ウィンドウサイズ、フレーム（Web）またはコンテキストとアクティビティ（モバイル）を出力します。

```sh
npx wdio session info
```

**例**

```sh
# セッションの現在地と実行対象を表示する
npx wdio session info
```

関連項目: [`list`](#list)、[`get`](#get)。

## `restart`

同じターゲットとフラグで閉じて再度開きます。

記録された履歴は保持されるため、`export` は再起動前のステップも含みます。

```sh
npx wdio session restart
```

**例**

```sh
# 新しいブラウザでやり直す
npx wdio session restart
```

関連項目: [`open`](#open)、[`close`](#close)。

## `status`

セッションが実行中なら 0、そうでなければ 4 で終了します。

```sh
npx wdio session status
```

**例**

```sh
# 実行中のセッションがない場合のみセッションを開く
npx wdio session status || npx wdio session open chrome http://localhost:3000
```

関連項目: [`list`](#list)、[`open`](#open)。

## `exec`

stdin、-e、またはファイルから WebdriverIO のコードを実行します。

`browser`、`$`、`$$`、`expect`、`ref('e3')` がスコープ内にある async 関数として実行されます。トップレベルの変数は呼び出し間で保持されます。アクションなしの `wdio session` は、stdin にコードがパイプされると `exec` を実行します。

コマンドには必ず `await` を付けてください。`$` は要素をちょうど 1 つ返し、複数の要素が一致した場合は StrictSelectorError をスローします。1 つのアクション（click、fill など）で済む場合はそちらを優先し、ループ、条件分岐、アサーションには `exec` を使用してください。

```sh
npx wdio session exec [file]
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `file` | いいえ | スクリプトファイル（.js、.ts、.mjs） |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `-e, --eval <value>` | 実行するコード |
| `--history` | コードを履歴に記録する（--no-history でスキップ） |

**例**

```sh
# ワンライナーを実行する
npx wdio session exec -e "await browser.getTitle()"

# ページに対してアサーションする（シングルクォートでシェルが $ を解釈しないようにする）
npx wdio session exec -e 'await expect($("h1")).toHaveText("Cart")'

# 複数のステップを stdin にパイプする
npx wdio session <<'JS'
await $('aria/Sign in').click()
await expect(browser).toHaveUrl(expect.stringContaining('/dashboard'))
JS

# スクリプトファイルを実行する
npx wdio session exec ./scripts/login.ts
```

関連項目: [`helpers`](#helpers)、[`history`](#history)、[`export`](#export)。

## `helpers`

.wdio/helpers にあるプロジェクトのヘルパーを一覧表示します。

.wdio/helpers 配下の各ファイルは、browser を受け取り addCommand でカスタムコマンドを登録する関数を default export します。ヘルパーはセッションを開いたときに読み込まれ、エクスポートされたテストではカスタムコマンドになります。

```sh
npx wdio session helpers
```

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--reload` | ヘルパーを再インポートする |

**例**

```sh
# ヘルパーと、それらが追加するコマンドを一覧表示する
npx wdio session helpers

# ヘルパーへの変更を反映する
npx wdio session helpers --reload
```

関連項目: [`exec`](#exec)、[`export`](#export)。

## `snapshot`

ref 付きのアクセシビリティスナップショット。Web、ネイティブモバイル、ネイティブデスクトップに適用されます。

アクセシビリティツリーを 1 行に 1 ノードずつ出力します（例: `button "Add to cart" [ref=e3]`）。ref を click、fill、get などのアクションに渡します。ref は要素が存在する間は有効で、削除された要素に対するアクションは REF_STALE で失敗します。

すべてのスナップショットは成果物ディレクトリに書き込まれます。--max-chars より長い出力は分割して出力されます。最初の部分が出力され、次の部分には `--offset <line>` を使用します。`find` はスナップショット全体を検索します。

テキストのレイアウトと --json の形式は実験的なもので、マイナーリリースで変更される可能性があります。ref の構文と ref を受け取るアクションは安定しています。

```sh
npx wdio session snapshot
```

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--depth <n>` | 最大の深さ |
| `--scope <value>` | この ref またはセレクター配下のみをスナップショットする |
| `-i, --interactive` | インタラクティブな要素のみ |
| `--all` | 非表示の要素を含める |
| `--boxes` | バウンディングボックスを付加する |
| `--viewport` | ビューポート内のもののみ（Web: diff のベースラインを更新しない） |
| `--selectors` | 各 ref 行の末尾に最適なセレクターを付ける |
| `--compact` | 内容のない名前なしノードを除外する |
| `-u, --urls` | リンクの href を含める |
| `--file-only` | ファイルへの書き込みのみ行う |
| `--max-chars <n>` | 一度に出力する最大文字数（デフォルト 8000） |
| `--offset <n>` | 長いスナップショットの次の部分として、この行から出力する |

**例**

```sh
# インタラクティブな要素のみ。通常の最初の確認方法
npx wdio session snapshot -i

# リンク先を含むページ全体
npx wdio session snapshot --compact --urls

# ページの一部のみ
npx wdio session snapshot --scope "#checkout" --depth 4

# 現在画面に表示されているもの
npx wdio session snapshot --viewport -i

# テストで使えるセレクター付きの各 ref
npx wdio session snapshot --selectors -i

# 操作してから再度確認する
npx wdio session click e3 && npx wdio session snapshot -i
```

関連項目: [`find`](#find)、[`diff`](#diff)、[`screenshot`](#screenshot)。

## `read`

ページのテキストを Markdown として読み取ります。Web に適用されます。

ページがメインコンテンツ（main、article）を示している場合はそこから、そうでなければページ全体から、見出し、段落、リスト項目、テーブルの行、URL 付きのリンクを読み取ります。ナビゲーション、フッター、非表示のテキストは除外されます。--max-chars（デフォルト 6000）で切り詰められ、切り詰め箇所には次の部分を読むための --offset が示されます。--scope を指定すると、そのセクションがスクロールして表示されます。「ページに何が書かれているか」を知るために使い、操作対象の ref が必要な場合は snapshot や find を使用してください。

```sh
npx wdio session read
```

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--scope <value>` | この ref またはセレクター配下のみを読み取る |
| `--max-chars <n>` | 出力する最大文字数（デフォルト 6000） |
| `--offset <n>` | 長いページの次の部分として、テキストのこの文字位置から開始する |

**例**

```sh
# メインコンテンツを読み取る
npx wdio session read

# 1 つのセクションを読み取る
npx wdio session read --scope e12
```

関連項目: [`find`](#find)、[`snapshot`](#snapshot)、[`get`](#get)。

## `find`

新しいスナップショットからテキストを検索します。Web、ネイティブモバイル、ネイティブデスクトップに適用されます。

新しいスナップショットを取得し、各一致箇所をその周囲のノード（例: リスト項目全体。一致箇所の隣にある値も含まれます）とともに行番号と ref 付きで出力し、最初の一致箇所をスクロールして表示します。マッチングは大文字小文字を無視し、次にスペースを無視し（"SO2" で "SO 2" が見つかります）、さらにすべての単語や類似する単語を探します。ページの非表示部分（閉じたメニュー、タブ、「もっと見る」）にのみ存在するテキストは、その旨が示されます。大きなページのスナップショット全体を読むよりも低コストです。-A/-B/-C を指定すると、grep のように単純な前後の行を出力します。

```sh
npx wdio session find <text>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `text` | はい | 検索するテキスト |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--regex` | テキストを正規表現として扱う |
| `--scope <value>` | この ref またはセレクター配下のみを検索する |
| `-C, --context <n>` | 周囲のノードの代わりに前後のコンテキスト行を出力する |
| `-A, --after-context <n>` | 各一致箇所の後のコンテキスト行数 |
| `-B, --before-context <n>` | 各一致箇所の前のコンテキスト行数 |
| `--offset <n>` | 出力が切り詰められたとき、次の一致箇所のためにこの数だけスキップする |

**例**

```sh
# ボタンの ref を探す
npx wdio session find "Add to cart"

# すべてのリンクを一覧表示する
npx wdio session find "^\s*link" --regex --context 0
```

関連項目: [`snapshot`](#snapshot)、[`wait`](#wait)。

## `diff`

新しいスナップショットを前回のものと比較します。Web、ネイティブモバイル、ネイティブデスクトップに適用されます。

前回のスナップショット以降に変化した内容を unified diff で出力するか、"No changes" を出力します。最初の呼び出しでベースラインが保存されます。アクションの後に使用すると、ページ全体を読み直さずにそのアクションの影響を確認できます。Web では、ベースラインは `--viewport` なしで取得した最後のスナップショットです。

```sh
npx wdio session diff
```

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--baseline <value>` | 比較対象のスナップショットファイル |
| `--scope <value>` | `snapshot --scope` と同様に、この ref またはセレクター内のみをスナップショットする |
| `--interactive` | `snapshot -i` と同様に、インタラクティブな要素のみ |

**例**

```sh
# クリックで何が変わったかを確認する
npx wdio session click e7 && npx wdio session diff

# 保存したスナップショットと比較する
npx wdio session diff --baseline before.yml
```

関連項目: [`snapshot`](#snapshot)、[`find`](#find)。

## `screenshot`

ビューポート、要素、またはページ全体の PNG を保存します。Web、ネイティブモバイル、ネイティブデスクトップに適用されます。

ファイルパスと画像サイズを出力します。レイアウトや見た目に関する確認にはスクリーンショットを使い、テキストや状態の読み取りには `snapshot` と `get` を使用してください。

```sh
npx wdio session screenshot [target]
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `target` | いいえ | キャプチャする要素の ref またはセレクター |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--full` | ページ全体（Web） |
| `--path <value>` | 出力ファイル |

**例**

```sh
# ビューポートをキャプチャする
npx wdio session screenshot

# 1 つの要素をキャプチャする
npx wdio session screenshot e5 --path card.png

# ページ全体をキャプチャする
npx wdio session screenshot --full
```

関連項目: [`visual`](#visual)、[`pdf`](#pdf)、[`snapshot`](#snapshot)。

## `pdf`

現在のページを PDF として保存します。Web に適用されます。

`browser.savePDF` を呼び出します。BiDi セッションでは、Chrome、Edge、Firefox でヘッドあり・ヘッドレスのいずれでも `browsingContext.print` で印刷します。Classic セッションでは `printPage` を使用しますが、古い Chrome ではヘッドレスでのみサポートされます。

```sh
npx wdio session pdf [file]
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `file` | いいえ | 出力ファイル（.pdf で終わる必要があります） |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--path <value>` | 出力ファイル（.pdf で終わる必要があります） |

**例**

```sh
# カレントディレクトリに report.pdf を書き出す
npx wdio session pdf report.pdf
```

関連項目: [`screenshot`](#screenshot)。

## `source`

ページの HTML またはアプリの XML を保存します。Web、ネイティブモバイル、ネイティブデスクトップに適用されます。

ファイルを書き込み、そのパスとサイズを出力します。セレクター用の属性など、スナップショットでは見えない情報が必要な場合に使用してください。

```sh
npx wdio session source
```

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--path <value>` | 出力ファイル |

**例**

```sh
# HTML を手元に保存する
npx wdio session source --path page.html
```

関連項目: [`snapshot`](#snapshot)、[`get`](#get)。

## `get`

テキスト、html、値、属性、タイトル、URL、件数、またはボックスを読み取ります。Web に適用されます。

値を出力し、続いて実行した WebdriverIO のコード（`→ …`）を出力します。値のみを出力するには -q を指定します（例: シェル変数に取り込む場合）。アサーションを書く前に値を読み取ってください。

```sh
npx wdio session get <sub> [target] [name]
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `sub` | はい | text \| html \| value \| attr \| title \| url \| count \| box |
| `target` | いいえ | ref またはセレクター（title と url では使用しない） |
| `name` | いいえ | 属性名（attr のみ） |

**例**

```sh
# ref のテキスト
npx wdio session get text e1

# 現在の URL
npx wdio session get url

# シェル変数用に値のみを取得する
url=$(npx wdio session get url -q)

# リンクの href
npx wdio session get attr e3 href

# 一致する要素の数
npx wdio session get count "aria/Remove"
```

関連項目: [`is`](#is)、[`wait`](#wait)、[`exec`](#exec)。

## `is`

要素が表示されているか、有効か、チェックされているかを確認します。Web に適用されます。

true または false を出力し、続いて実行した WebdriverIO のコードを出力します。値のみを出力するには -q を指定します。終了コードはどちらの場合も 0 です。

```sh
npx wdio session is <sub> <target>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `sub` | はい | visible \| enabled \| checked |
| `target` | はい | ref またはセレクター |

**例**

```sh
# true または false を出力する
npx wdio session is visible e1

# ラベルでボタンを確認する
npx wdio session is enabled "aria/Place order"
```

関連項目: [`get`](#get)、[`wait`](#wait)。

## `logs`

前回の呼び出し以降のコンソール、ページエラー、ネットワーク、デバイスのログを出力します。Web、ネイティブモバイルに適用されます。

呼び出すたびに読み取りカーソルが進むため、次の呼び出しでは新しいエントリのみが表示されます。アクションの後に実行して、そのアクションが引き起こしたエラーを確認してください。

```sh
npx wdio session logs
```

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--errors` | エラーのみ |
| `--network` | ネットワークのエントリのみ |
| `--since <value>` | この期間より新しいエントリのみ（例: 30s） |
| `--peek` | 読み取りカーソルを進めない |
| `--source <browser\|driver\|logcat\|syslog\|main>` | ログのソース |

**例**

```sh
# クリックによって発生したエラー
npx wdio session click e4 && npx wdio session logs --errors

# 最近のエントリを、次の呼び出しのために残しておく
npx wdio session logs --since 30s --peek
```

関連項目: [`requests`](#requests)。

## `navigate`

URL を開きます。Web に適用されます。

`example.com`、完全な URL、および baseUrl からの相対パスを受け付けます。先にフレームから抜けます。新しい URL とタイトルを出力します。

```sh
npx wdio session navigate <url>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `url` | はい | URL（相対 URL は baseUrl を使用） |

**例**

```sh
# ページに移動して確認する
npx wdio session navigate /cart && npx wdio session snapshot -i

# 別のサイトを開く
npx wdio session navigate example.com
```

関連項目: [`back`](#back)、[`reload`](#reload)、[`wait`](#wait)。

## `back`

戻ります。Web に適用されます。

```sh
npx wdio session back
```

**例**

```sh
# 1 ページ戻る
npx wdio session back
```

関連項目: [`forward`](#forward)、[`navigate`](#navigate)。

## `forward`

進みます。Web に適用されます。

```sh
npx wdio session forward
```

**例**

```sh
# 1 ページ進む
npx wdio session forward
```

関連項目: [`back`](#back)、[`navigate`](#navigate)。

## `reload`

ページを再読み込みします。Web に適用されます。

```sh
npx wdio session reload
```

**例**

```sh
# 再読み込みし、ネットワークが落ち着くまで待つ
npx wdio session reload && npx wdio session wait --load networkidle
```

関連項目: [`navigate`](#navigate)、[`wait`](#wait)。

## `wait`

要素、テキスト、URL、読み込み状態、条件、または数ミリ秒を待機します。Web に適用されます。

ref またはセレクター、--text、--url、--load、--fn、ミリ秒のうち、ちょうど 1 つを指定します。--limit を超えると終了コード 1 で失敗します。

ここでも、チェーン内の `sleep` よりも、一時停止より条件を優先してください。30 秒を超える一時停止は拒否されます。

```sh
npx wdio session wait [target]
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `target` | いいえ | ref、セレクター、またはミリ秒 |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--text <value>` | ページにこのテキストが含まれるまで待機する |
| `--url <value>` | URL が一致するまで待機する（部分文字列、または * と ** のグロブ） |
| `--load <value>` | domcontentloaded、load、または networkidle |
| `--fn <value>` | この JavaScript 式が true になるまで待機する |
| `--state <value>` | target と併用: visible（デフォルト）、hidden、enabled、または disabled |
| `--limit <n>` | 待機するミリ秒（デフォルト 10000） |

**例**

```sh
# ref が表示されるまで待つ
npx wdio session wait e1

# スピナーが消えるまで待つ
npx wdio session wait "aria/Loading" --state hidden

# 操作し、結果を待ち、再度確認する
npx wdio session click e3 && npx wdio session wait --text "Cart (1)" && npx wdio session snapshot -i

# URL を待つ
npx wdio session wait --url "**/dashboard"

# 実行中のリクエストがなくなるまで待つ
npx wdio session wait --load networkidle

# 500ms 一時停止する
npx wdio session wait 500
```

関連項目: [`find`](#find)、[`is`](#is)、[`get`](#get)。

## `click`

要素をクリックします。Web、ネイティブモバイル、ネイティブデスクトップに適用されます。

クリックした対象を出力し、クリックによってページ遷移した場合は新しい URL も出力します。次のページで ref を使う前に新しいスナップショットを取得してください。非表示または覆われている要素の場合は、遮っているものを示してすぐに失敗します。`x,y` を指定すると、canvas や地図など ref を持たないものに対して、ビューポートの一点（スクリーンショットと同様に左上からのピクセル）をクリックします。

```sh
npx wdio session click <target>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `target` | はい | ref（e12）、WebdriverIO セレクター、または x,y のビューポート座標 |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--double` | ダブルクリック |
| `--right` | 右クリック |
| `--new-tab` | リンクを新しいタブで開き、そのタブに切り替える |

**例**

```sh
# 最新のスナップショットの ref をクリックする
npx wdio session click e3

# アクセシブルネームでクリックする
npx wdio session click "aria/Add to cart"

# クリックし、待機し、再度確認する
npx wdio session click e3 && npx wdio session wait --load networkidle && npx wdio session snapshot -i

# リンクを新しいタブで開く
npx wdio session click e8 --new-tab

# ビューポートの一点をクリックする（例: 地図上）
npx wdio session click 320,480
```

関連項目: [`tap`](#tap)、[`fill`](#fill)、[`wait`](#wait)、[`snapshot`](#snapshot)。

## `tap`

要素をタップします（モバイル）。ネイティブモバイルに適用されます。

```sh
npx wdio session tap <target>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `target` | はい | ref（e12）または WebdriverIO セレクター |

**例**

```sh
# 最新のスナップショットの ref をタップする
npx wdio session tap e2
```

関連項目: [`click`](#click)、[`long-press`](#long-press)、[`swipe`](#swipe)。

## `fill`

入力欄の値を置き換えます。Web、ネイティブモバイル、ネイティブデスクトップに適用されます。

先にフィールドをクリアします。フォーカスのある要素に入力するには `type` を、Enter などのキーを送信するには `press` を使用してください。

```sh
npx wdio session fill <target> <text..>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `target` | はい | ref（e12）または WebdriverIO セレクター |
| `text` | はい | テキスト（target の後の単語はスペースで連結される） |

**例**

```sh
# フィールドに入力する
npx wdio session fill e2 ada@example.com

# フォームに入力して送信する
npx wdio session fill e2 ada@example.com && npx wdio session fill e4 secret && npx wdio session press Enter
```

関連項目: [`type`](#type)、[`press`](#press)、[`select`](#select)、[`check`](#check)。

## `type`

要素またはフォーカスのある要素に入力します。Web、ネイティブモバイル、ネイティブデスクトップに適用されます。

何もクリアせずにテキストをキー入力として送信します。`type e2 Ada` は e2 に、`type Ada` はフォーカスのある要素に入力します。値を置き換えるには `fill` を使用してください。

```sh
npx wdio session type <text..>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `text` | はい | テキスト（単語はスペースで連結される）。フォーカスのある要素ではなく特定の要素に入力するには、`type e2 Ada` のように ref から始める |

**例**

```sh
# フィールドに入力する
npx wdio session type e5 hello

# フォーカスのある要素に入力する
npx wdio session focus e5 && npx wdio session type "hello"
```

関連項目: [`fill`](#fill)、[`press`](#press)、[`focus`](#focus)。

## `press`

キーを押します（例: Enter、Control+a）。Web、ネイティブデスクトップに適用されます。

キーは + で組み合わせます。名前の大文字小文字は区別されません。ctrl、cmd、esc、up、down、left、right は短縮形として受け付けられます。

```sh
npx wdio session press <keys>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `keys` | はい | キーの組み合わせ |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--times <n>` | この回数だけ押す（最大 100）。例: スライダーを動かす場合 |

**例**

```sh
# フォームを送信する
npx wdio session press Enter

# フォーカスのあるスライダーを 5 ステップ動かす
npx wdio session press ArrowRight --times 5

# すべて選択する
npx wdio session press Control+a

# フォーカスを前に戻す
npx wdio session press Shift+Tab
```

関連項目: [`type`](#type)、[`fill`](#fill)。

## `select`

`<select>` のオプションを選択します。Web に適用されます。

```sh
npx wdio session select <target> <value>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `target` | はい | ref（e12）または WebdriverIO セレクター |
| `value` | はい | オプションのテキスト、値、またはインデックス |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--by <text\|value\|index>` | オプションの照合方法（デフォルトは text） |

**例**

```sh
# 表示テキストで選択する
npx wdio session select e6 Germany

# 値で選択する
npx wdio session select e6 de --by value
```

関連項目: [`fill`](#fill)、[`check`](#check)。

## `upload`

ファイル入力を設定します。Web に適用されます。

パスは作業ディレクトリからの相対パスです。ファイル選択ダイアログを開くボタンではなく、`<input type="file">` 自体を対象にしてください。

```sh
npx wdio session upload <target> <file>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `target` | はい | ref（e12）または WebdriverIO セレクター |
| `file` | はい | アップロードするファイル |

**例**

```sh
# ファイルを添付する
npx wdio session upload e9 ./fixtures/avatar.png
```

関連項目: [`fill`](#fill)。

## `hover`

ポインターを要素の上に移動します。Web、ネイティブデスクトップに適用されます。

```sh
npx wdio session hover <target>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `target` | はい | ref（e12）または WebdriverIO セレクター |

**例**

```sh
# ホバーメニューを開いて確認する
npx wdio session hover e4 && npx wdio session snapshot -i
```

関連項目: [`click`](#click)。

## `focus`

要素にフォーカスします。Web に適用されます。

```sh
npx wdio session focus <target>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `target` | はい | ref（e12）または WebdriverIO セレクター |

**例**

```sh
# `type` の前にフィールドにフォーカスする
npx wdio session focus e5
```

関連項目: [`type`](#type)、[`press`](#press)。

## `check`

チェックボックスまたはラジオボタンをチェックします。Web に適用されます。

すでにチェックされている場合は何もせず、最終的にチェックされなかった場合は失敗します。

```sh
npx wdio session check <target>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `target` | はい | ref（e12）または WebdriverIO セレクター |

**例**

```sh
# 利用規約に同意する
npx wdio session check e7
```

関連項目: [`uncheck`](#uncheck)、[`is`](#is)。

## `uncheck`

チェックボックスのチェックを外します。Web に適用されます。

すでにチェックが外れている場合は何もしません。選択されたラジオボタンのチェックは外せません。

```sh
npx wdio session uncheck <target>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `target` | はい | ref（e12）または WebdriverIO セレクター |

**例**

```sh
# ニュースレターの受信を解除する
npx wdio session uncheck e7
```

関連項目: [`check`](#check)、[`is`](#is)。

## `drag`

要素を別の要素の上にドラッグします。Web、ネイティブモバイル、ネイティブデスクトップに適用されます。

```sh
npx wdio session drag <from> <to>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `from` | はい | ドラッグする ref またはセレクター |
| `to` | はい | ドロップ先の ref またはセレクター |

**例**

```sh
# カードを別の列に移動する
npx wdio session drag e3 e9
```

関連項目: [`scroll`](#scroll)。

## `scroll`

要素をスクロールして表示するか、ページをスクロールします。Web に適用されます。

target を指定しない場合は 600px 下にスクロールします。遅延読み込みされたコンテンツは次のスナップショットに表示されます。

```sh
npx wdio session scroll [target]
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `target` | いいえ | ref、セレクター、up、down、top、または bottom |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--px <n>` | up/down のピクセル数（デフォルト 600） |

**例**

```sh
# 要素を表示領域に入れる
npx wdio session scroll e40

# さらに結果を読み込んで確認する
npx wdio session scroll bottom && npx wdio session snapshot -i

# 2 画面分スクロールする
npx wdio session scroll down --px 1200
```

関連項目: [`swipe`](#swipe)、[`snapshot`](#snapshot)。

## `swipe`

画面をスワイプします（モバイル）。ネイティブモバイルに適用されます。

```sh
npx wdio session swipe <direction>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `direction` | はい | up \| down \| left \| right |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--percent <n>` | スワイプの長さ 0..1 |

**例**

```sh
# リストをスクロールして確認する
npx wdio session swipe up && npx wdio session snapshot
```

関連項目: [`scroll`](#scroll)、[`tap`](#tap)。

## `long-press`

要素を長押しします（モバイル）。ネイティブモバイルに適用されます。

```sh
npx wdio session long-press <target>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `target` | はい | ref（e12）または WebdriverIO セレクター |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--duration <n>` | ミリ秒 |

**例**

```sh
# コンテキストメニューを開く
npx wdio session long-press e4 --duration 1500
```

関連項目: [`tap`](#tap)。

## `tabs`

タブの一覧表示、オープン、切り替え、クローズを行います。Web に適用されます。

サブコマンドなしの場合は、タブをインデックス付きで一覧表示し、現在のタブにはマークが付きます。`new` はタブを開いてそのタブに切り替えます。`switch` と `close` はインデックスまたはハンドルを受け取ります。

```sh
npx wdio session tabs [sub] [arg]
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `sub` | いいえ | switch \| new \| close |
| `arg` | いいえ | インデックス、ハンドル、または URL |

**例**

```sh
# タブを一覧表示する
npx wdio session tabs

# タブを開く
npx wdio session tabs new http://localhost:3000/help

# 最初のタブに戻る
npx wdio session tabs switch 0

# 2 番目のタブを閉じる
npx wdio session tabs close 1
```

関連項目: [`windows`](#windows)、[`frame`](#frame)。

## `windows`

ウィンドウを一覧表示または切り替えます。Web、ネイティブデスクトップに適用されます。

```sh
npx wdio session windows [sub] [arg]
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `sub` | いいえ | switch |
| `arg` | いいえ | インデックスまたはハンドル |

**例**

```sh
# ウィンドウを一覧表示する
npx wdio session windows

# 2 番目のウィンドウに切り替える
npx wdio session windows switch 1
```

関連項目: [`tabs`](#tabs)。

## `frame`

iframe の中、親、またはトップに切り替えます。Web に適用されます。

ページのスナップショットにはすでに iframe の内容が、アクションで直接使える ref 付きで表示されるため、`frame` が必要なのは、しばらく 1 つのフレーム内で作業する場合や、スナップショットで途中までしか表示されなかったフレームを確認する場合だけです。スナップショットとアクションは、元に戻すまで現在のフレームに適用されます。`navigate` はトップのドキュメントに戻ります。

```sh
npx wdio session frame <target>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `target` | はい | ref、セレクター、parent、または top |

**例**

```sh
# iframe に入って中を確認する
npx wdio session frame e12 && npx wdio session snapshot -i

# ページに戻る
npx wdio session frame top
```

関連項目: [`tabs`](#tabs)、[`snapshot`](#snapshot)。

## `contexts`

ネイティブ/webview のコンテキストを一覧表示または切り替えます。ネイティブモバイルに適用されます。

```sh
npx wdio session contexts [sub] [name]
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `sub` | いいえ | switch |
| `name` | いいえ | コンテキスト名 |

**例**

```sh
# NATIVE_APP と WEBVIEW のコンテキストを一覧表示する
npx wdio session contexts

# webview を操作する
npx wdio session contexts switch WEBVIEW_com.example.shop
```

関連項目: [`snapshot`](#snapshot)。

## `dialog`

開いているダイアログを承認、却下、または報告します。Web、ネイティブモバイルに適用されます。

開いている alert、confirm、prompt は他のアクションをブロックし、それらのアクションはこのコマンドを実行するよう促すヒント付きで失敗します。

```sh
npx wdio session dialog <sub>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `sub` | はい | accept \| dismiss \| status |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--text <value>` | プロンプトのテキスト（accept のみ） |

**例**

```sh
# 開いているダイアログを表示する
npx wdio session dialog status

# 確定する
npx wdio session dialog accept

# プロンプトに回答する
npx wdio session dialog accept --text "Ada"
```

関連項目: [`click`](#click)。

## `app`

アプリの起動、終了、インストール、または状態の照会を行います。ネイティブモバイル、ネイティブデスクトップに適用されます。

```sh
npx wdio session app <sub> <id>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `sub` | はい | launch \| terminate \| install \| state |
| `id` | はい | アプリ id、bundle id、またはファイル |

**例**

```sh
# アプリを再起動する
npx wdio session app terminate com.example.shop && npx wdio session app launch com.example.shop

# 実行中か？
npx wdio session app state com.example.shop
```

関連項目: [`deeplink`](#deeplink)、[`background`](#background)。

## `deeplink`

ディープリンクを開きます。ネイティブモバイルに適用されます。

```sh
npx wdio session deeplink <url>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `url` | はい | URL |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--package <value>` | Android のパッケージまたは iOS の bundle id |

**例**

```sh
# 商品画面を開く
npx wdio session deeplink shop://product/42 --package com.example.shop
```

関連項目: [`app`](#app)。

## `rotate`

デバイスを回転させます。ネイティブモバイルに適用されます。

```sh
npx wdio session rotate <orientation>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `orientation` | はい | portrait \| landscape |

**例**

```sh
# デバイスを横向きにする
npx wdio session rotate landscape
```

## `keyboard`

オンスクリーンキーボードを非表示にします。ネイティブモバイルに適用されます。

```sh
npx wdio session keyboard <sub>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `sub` | はい | hide |

**例**

```sh
# キーボードの下にある要素を表示する
npx wdio session keyboard hide
```

## `background`

アプリをバックグラウンドに移動します。ネイティブモバイルに適用されます。

```sh
npx wdio session background <seconds>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `seconds` | はい | 秒数（-1 でバックグラウンドのままにする） |

**例**

```sh
# アプリを 3 秒間バックグラウンドに移動する
npx wdio session background 3
```

関連項目: [`app`](#app)。

## `lock`

デバイスをロックします。ネイティブモバイルに適用されます。

```sh
npx wdio session lock
```

**例**

```sh
# 画面をロックする
npx wdio session lock
```

関連項目: [`unlock`](#unlock)。

## `unlock`

デバイスのロックを解除します。ネイティブモバイルに適用されます。

```sh
npx wdio session unlock
```

**例**

```sh
# 画面のロックを解除する
npx wdio session unlock
```

関連項目: [`lock`](#lock)。

## `geolocation`

位置情報を設定します。Web、ネイティブモバイルに適用されます。

```sh
npx wdio session geolocation <lat> <lon>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `lat` | はい | 緯度 |
| `lon` | はい | 経度 |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--accuracy <n>` | 精度（メートル） |

**例**

```sh
# ベルリンにいるように見せかける
npx wdio session geolocation 52.52 13.405
```

関連項目: [`emulate`](#emulate)。

## `emulate`

デバイス、ビューポート、ネットワーク、CPU、時計、または BiDi のエミュレーションスコープをエミュレートします。Web に適用されます。

エミュレーションは `emulate reset` を実行するかセッションが終了するまで維持され、同じ種類を再度設定すると置き換えられます。値なしの `emulate device` はデバイス名を一覧表示します。ネットワークプリセットと CPU スロットリングには Chromium ブラウザが必要です。

```sh
npx wdio session emulate <sub> [value]
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `sub` | はい | device \| viewport \| network \| cpu \| clock \| color-scheme \| user-agent \| media \| locale \| timezone \| touch \| orientation \| screen \| viewport-meta \| text-layout \| scripting \| scrollbar \| forced-colors \| reset |
| `value` | いいえ | エミュレーションの値 |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--dpr <n>` | デバイスピクセル比（viewport） |
| `--tick <n>` | エミュレートされた時計をミリ秒単位で進める（clock） |

**例**

```sh
# スマートフォンをエミュレートする
npx wdio session emulate device "iPhone 15"

# ビューポートを設定する
npx wdio session emulate viewport 375x812 --dpr 3

# オフラインにする
npx wdio session emulate network offline

# ダークモード
npx wdio session emulate color-scheme dark

# 日付を固定する
npx wdio session emulate clock 2030-01-01T00:00:00Z

# モーションを減らす
npx wdio session emulate media prefersReducedMotion=reduce

# すべてのエミュレーションを元に戻す
npx wdio session emulate reset
```

関連項目: [`geolocation`](#geolocation)、[`screenshot`](#screenshot)。

## `requests`

キャプチャしたネットワークリクエストを一覧表示します（BiDi）。Web に適用されます。

```sh
npx wdio session requests
```

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--filter <value>` | 部分文字列またはグロブ |
| `--failed` | 失敗したリクエストのみ |
| `--since <value>` | この期間より新しいリクエストのみ |
| `--limit <n>` | 最大行数（デフォルト 50） |

**例**

```sh
# API 呼び出しのみ
npx wdio session requests --filter "**/api/**"

# クリックによって失敗したリクエスト
npx wdio session click e3 && npx wdio session requests --failed --since 10s
```

関連項目: [`mock`](#mock)、[`logs`](#logs)。

## `mock`

URL パターンに対するレスポンスをモックします（BiDi）。Web に適用されます。

モック id（m1、m2、…）を出力します。同じパターンを再度モックすると、以前のモックが置き換えられます。

```sh
npx wdio session mock <pattern>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `pattern` | はい | URL パターン |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--status <n>` | ステータスコード |
| `--body <value>` | JSON/テキストまたはファイルパスとしてのボディ |
| `--header <value>` | ヘッダー k:v（複数指定可） |
| `--abort` | 一致するリクエストを中止する |
| `--method <value>` | このメソッドのみ |
| `--once` | 次のリクエストのみ |

**例**

```sh
# 固定の JSON を返す
npx wdio session mock "**/api/user" --body '{"name":"Mocked"}'

# 次のリクエストを失敗させる
npx wdio session mock "**/api/cart" --status 500 --once

# 画像をブロックする
npx wdio session mock "**/*.png" --abort
```

関連項目: [`unmock`](#unmock)、[`requests`](#requests)。

## `unmock`

モックを削除します。Web に適用されます。

```sh
npx wdio session unmock [pattern]
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `pattern` | いいえ | パターンまたはモック id |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--all` | すべてのモックを削除する |

**例**

```sh
# 1 つのモックを削除する
npx wdio session unmock m1

# すべてのモックを削除する
npx wdio session unmock --all
```

関連項目: [`mock`](#mock)。

## `cookies`

Cookie の取得、設定、またはクリアを行います。Web に適用されます。

サブコマンドなしの場合は、すべての Cookie を name=value 形式で出力します。名前なしの `clear` はすべての Cookie を削除します。

```sh
npx wdio session cookies [sub] [name] [value]
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `sub` | いいえ | get \| set \| clear |
| `name` | いいえ | Cookie の名前 |
| `value` | いいえ | Cookie の値 |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--domain <value>` | Cookie のドメイン（set） |
| `--path <value>` | Cookie のパス（set） |
| `--http-only` | HttpOnly Cookie（set） |
| `--secure` | Secure Cookie（set） |
| `--same-site <value>` | lax、strict、none、または default（set） |
| `--expiry <n>` | 有効期限（秒単位の Unix タイムスタンプ）（set） |

**例**

```sh
# Cookie を一覧表示する
npx wdio session cookies

# 1 つの Cookie の値
npx wdio session cookies get session

# Cookie を設定して再読み込みする
npx wdio session cookies set session abc && npx wdio session reload

# すべての Cookie を削除する
npx wdio session cookies clear
```

関連項目: [`storage`](#storage)、[`state`](#state)。

## `storage`

localStorage（または sessionStorage）の取得、設定、またはクリアを行います。Web に適用されます。

サブコマンドなしの場合は、すべてのエントリを出力します。キーなしの `clear` はストアを空にします。

```sh
npx wdio session storage [sub] [key] [value]
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `sub` | いいえ | get \| set \| clear |
| `key` | いいえ | キー |
| `value` | いいえ | 値 |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--session-storage` | sessionStorage を使用する |

**例**

```sh
# localStorage を一覧表示する
npx wdio session storage

# キーを設定する
npx wdio session storage set token abc

# sessionStorage を空にする
npx wdio session storage clear --session-storage
```

関連項目: [`cookies`](#cookies)、[`state`](#state)。

## `state`

Cookie とストレージを保存または読み込みます。Web に適用されます。

`save` は現在のオリジンの Cookie、localStorage、sessionStorage を JSON ファイルに書き込みます。`load` はそのオリジンを開いてそれらを復元します（例: ログインをスキップする場合）。

```sh
npx wdio session state <sub> <file>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `sub` | はい | save \| load |
| `file` | はい | 状態ファイル |

**例**

```sh
# ログイン済みの状態を保存する
npx wdio session state save .wdio/logged-in.json

# ログイン済みの状態で開始する
npx wdio session state load .wdio/logged-in.json && npx wdio session reload
```

関連項目: [`cookies`](#cookies)、[`storage`](#storage)。

## `visual`

@wdio/visual-service によるビジュアルスナップショット。Web、ネイティブモバイル、ネイティブデスクトップに適用されます。

`save` は .wdio/visual/baseline にベースラインを保存し、`check` はそれと比較して不一致を出力し、`accept` は最後の実際の画像をベースラインにし、`list` はタグを表示します。プロジェクトに @wdio/visual-service が必要です。

```sh
npx wdio session visual <sub> [tag]
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `sub` | はい | save \| check \| accept \| list |
| `tag` | いいえ | 画像のタグ |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--element <value>` | この要素のみ |
| `--full` | ページ全体 |
| `--tabbable` | タブ移動可能なページ |
| `--threshold <n>` | 許容される不一致（パーセント、デフォルト 0） |
| `--all` | accept: すべてのタグ |

**例**

```sh
# ベースラインを保存する
npx wdio session visual save cart

# ベースラインと比較する
npx wdio session visual check cart --threshold 0.5

# 意図した変更を承認する
npx wdio session visual accept cart
```

関連項目: [`screenshot`](#screenshot)。

## `trace`

すべてのステップをスクリーンショットとスナップショット付きで記録します。

`stop` はトレースディレクトリとステップの記録を出力します。

```sh
npx wdio session trace <sub>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `sub` | はい | start \| stop |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--screenshots` | 各ステップの後にスクリーンショットを撮る（--no-screenshots でスキップ） |
| `--snapshots` | 各ステップの後にスナップショットを取る（--no-snapshots でスキップ） |

**例**

```sh
# トレースを開始する
npx wdio session trace start

# 停止して記録を出力する
npx wdio session trace stop
```

関連項目: [`record`](#record)、[`history`](#history)。

## `record`

動画を録画します。Web、ネイティブモバイルに適用されます。

```sh
npx wdio session record <sub>
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `sub` | はい | start \| stop |

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--fps <n>` | 1 秒あたりのフレーム数（デフォルト 5） |
| `--path <value>` | 出力ファイル |

**例**

```sh
# 録画を開始する
npx wdio session record start

# 停止して動画を保存する
npx wdio session record stop --path checkout.mp4
```

関連項目: [`trace`](#trace)、[`screenshot`](#screenshot)。

## `history`

記録されたステップを出力します。

ページを変更するすべてのアクションは、実行した WebdriverIO のコードを記録します。`export` はこの履歴をスペックに変換します。

```sh
npx wdio session history
```

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--clear` | 履歴をクリアする |

**例**

```sh
# これまでのステップを表示する
npx wdio session history

# 残したいステップの前に記録をやり直す
npx wdio session history --clear
```

関連項目: [`export`](#export)、[`exec`](#exec)。

## `export`

履歴からスペックを生成します。

記録されたステップを含む describe/it 形式のスペックを書き出します。ref は安定したセレクターに、ヘルパーはカスタムコマンドになります。--out を指定しない場合、ファイルは成果物ディレクトリに保存されます。`wdio run` で実行して、パスすることを確認してください。

```sh
npx wdio session export
```

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--out <value>` | 出力ファイル |
| `--title <value>` | スイートのタイトル |
| `--page-objects` | ページオブジェクトを生成する |
| `--framework <mocha\|jasmine>` | フレームワーク（デフォルトは mocha） |

**例**

```sh
# スペックを書き出す
npx wdio session export --out test/specs/cart.e2e.ts

# スペックを書き出して実行する
npx wdio session export --out test/specs/cart.e2e.ts && npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

関連項目: [`history`](#history)、[`helpers`](#helpers)。

## `resume`

wdio run --debug=agent によって一時停止されたテストを続行します。

`wdio run --debug=agent` は失敗したテストを一時停止し、セッション debug-`<worker>` として公開します。任意のアクションで調査してから resume してください。そのセッションで `close` を実行すると、代わりにテストが失敗になります。

```sh
npx wdio session resume
```

**例**

```sh
# 一時停止したテストを確認してから続行させる
npx wdio session -s debug-0-0 snapshot -i && npx wdio session -s debug-0-0 resume
```

関連項目: [`close`](#close)、[`list`](#list)。

## `doctor`

環境をチェックします。

チェックごとに 1 行を出力し、失敗した各項目には修正方法を示します。チェックが失敗すると 1 で終了します。

```sh
npx wdio session doctor [target]
```

**引数**

| 名前 | 必須 | 説明 |
| --- | --- | --- |
| `target` | いいえ | このターゲットに必要なものだけをチェックする |

**例**

```sh
# すべてをチェックする
npx wdio session doctor

# Android セッションに必要なものをチェックする
npx wdio session doctor android
```

関連項目: [`open`](#open)。

## `skill`

エージェントスキルを出力します。

```sh
npx wdio session skill
```

**フラグ**

| フラグ | 説明 |
| --- | --- |
| `--install <value>` | .agents/skills/wdio-session/SKILL.md（またはこのディレクトリ）に書き込む |

**例**

```sh
# スキルを出力する
npx wdio session skill

# このプロジェクトに追加する
npx wdio session skill --install .
```