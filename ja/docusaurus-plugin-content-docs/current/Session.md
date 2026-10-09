---
id: session
title: wdio session
description: 短い wdio session コマンドでシェルからブラウザ、モバイルアプリ、デスクトップアプリを操作し、その手順をテストとしてエクスポートします。
---

`wdio session` は、多数の短いシェルコマンドにわたって 1 つの WebdriverIO セッションを維持します。UI を探索したり、変更を確認したり、うまくいった手順をテストに変換したりするために使用します。これは `@wdio/cli`（WebdriverIO v10）の一部です。

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
npx wdio session click e3
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio session close
```

セッション名は `default` です。2 つのセッションを同時に使う必要がある場合にのみ `-s <name>` を渡してください。[ターゲット](/docs/session/targets)ページでは、1 つの Expo guinea pig を、ヘッド付きの Chrome ウィンドウと Electron ウィンドウの両方でデスクトップサイズで操作しています。同じアプリ向けの Android および iOS のコマンドもそのページにあります。

## インストール

`wdio session` は WebdriverIO CLI の一部です。`npx wdio` はスコープなしの [`wdio`](https://www.npmjs.com/package/wdio) パッケージをインストールし、その CLI を実行します。`@wdio/session` を自分でインストールする必要はありません。

```sh
npx wdio session --help
npx wdio session click --help
```

`--help` は、ワークフロー、グループ別のアクション、グローバルフラグ、終了コードを出力します。`<action> --help` は、そのアクションの引数、フラグ、プラットフォーム、例、関連アクションを出力します。同じ内容は[コマンド](/docs/session-commands)ページにも掲載されています。エージェントスキルにはコアループのみが含まれ、それ以外についてはエージェントを `--help` に誘導するため、CLI が変更されても内容が古くなりません。

次のコマンドでプロジェクトのひな形を作成します：

```sh
npm init wdio@latest
```

「Set up coding agent support」を承認すると、`.agents/skills/wdio-session/SKILL.md`、`AGENTS.md` のセクション、および `.wdio/session/` の gitignore エントリが書き込まれます。後からスキルをインストールするには次を実行します：

```sh
npx wdio session skill --install .
```

`npx wdio session doctor` は、Node.js、ブラウザ、Appium、SDK、クラウドの認証情報をチェックします。`doctor <target>` は、そのターゲットに必要なものだけをチェックします。チェックが失敗すると、プロセスは終了コード 1 で終了します。

## ページを開いて操作する

ヘッドレス Chrome を開きます（ウィンドウを表示するには `--headed` を追加します）。`open` はページ上のインタラクティブな要素を出力します：

```sh
npx wdio session open chrome http://localhost:3000
```

要素は `button "Add to cart" [ref=e3]` のように表示されます。その ref を使用してください。各アクションはページ上で何が変化したかを、新しい要素の ref とともに報告するため、別途 `snapshot` を実行する必要はほとんどありません：

```sh
npx wdio session click e3
npx wdio session exec -e "await expect($('aria/Cart (1)')).toBeDisplayed()"
```

`open firefox`、`open edge`、`open safari` も同じ URL を受け取ります。Chrome、Firefox、Edge はインストールされていない場合、初回使用時にダウンロードされます。Safari には macOS が必要です。

### Android

Android と iOS は Appium 3 を介して実行されます。`doctor android` は、サーバーやドライバーが不足している場合、インストールコマンドとともに報告します。

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS：`open ios --bundle-id com.example.shop`。ネイティブデスクトップ：`open macos --bundle-id com.example.shop` および `open windows --app Root`。

### Electron

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` と `open dioxus ./my-app` には、それぞれのドライバーが `PATH` 上にある必要があります。`DISPLAY` または `WAYLAND_DISPLAY` のない Linux では、Xvfb または weston をインストールしてください。

## 観察と ref

| コマンド | 用途 |
| --- | --- |
| `snapshot --interactive` | 操作可能な要素（それぞれ ref 付き） |
| `snapshot --compact` | 名前のない空のラッパーを除いた同じツリー |
| `snapshot --urls` | 各リンクのリンク先アドレス |
| `find "Add to cart"` | 新しいスナップショットからの 1 行 |
| `diff` | 前回のスナップショット以降の変更点 |
| `screenshot` | レイアウト。スナップショットで答えが得られる場合は省略してください |
| `pdf` | 現在のページの PDF（`pdf report.pdf`）。BiDi セッションではヘッド付きでもヘッドレスでも印刷できます |
| `source` | ページの HTML またはネイティブの XML |

ref は最新のスナップショットから取得されます。ページ遷移後は、再度スナップショットを取得してください。古い ref は `REF_STALE` で失敗します。不明な ref は `REF_NOT_FOUND` で失敗します。

## `exec`

`exec` は WebdriverIO のコードを実行します。コマンドには必ず `await` を付けてください。`$` は 1 つの要素を返し、見つからない場合は例外をスローします。同期モードや `browser.element` はありません。

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

アサーションは `expect-webdriverio` を使って `exec` 内に記述します。画面の見た目を確認したい場合は、`visual check <tag>`（`@wdio/visual-service` が必要）を使用してください。

## エクスポート

`export` は記録された手順からスペックを書き出します。ref は安定したセレクターに置き換えられます。

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
npx wdio session close
```

`open firefox`、`open edge`、`open safari` も同じ URL を受け取ります。その他のターゲット、スナップショット、`exec`、エクスポート、一時停止したテスト実行については、このセクションの個別のページで説明しています。

## このセクション

| ページ | 用途 |
| --- | --- |
| [ターゲット](/docs/session/targets) | ブラウザ、Android、iOS、デスクトップ、Electron、Tauri、Dioxus、クラウドデバイス（Chrome、Android、Electron でのデモアプリを含む） |
| [スナップショットと ref](/docs/session/snapshots) | 画面上に何があるか、およびクリックに使う ref |
| [コードの実行](/docs/session/exec) | `exec`、アサーション、ビジュアルチェック |
| [テストのエクスポート](/docs/session/export) | スペック、ページオブジェクト、`.wdio/helpers` |
| [テストのデバッグ](/docs/session/debug) | `wdio run --debug=agent` と `wdio repl --session` |
| [コマンド](/docs/session-commands) | すべてのアクションとフラグ |

## トラブルシューティング

| メッセージ | 対処方法 |
| --- | --- |
| `SESSION_EXISTS` | その名前のセッションはすでに実行中です。`-s` で別の名前を指定するか、`open --replace` を使用してください。 |
| `REF_STALE` / `REF_NOT_FOUND` | `snapshot` を再度実行し、その出力に含まれる ref を使用してください。 |
| `NOT_EDITABLE` | `fill` の対象が編集可能なフィールドではなく、その内部（または `aria-controls`/`aria-owns`/ラベルの先）にも単一の編集可能なフィールドがありません。`snapshot --scope <target>` を実行し、フィールドの ref に入力してください。 |
| `MISSING_DEPENDENCY` | エラーに示されたパッケージをインストールするか、`wdio session doctor <target>` を実行してください。 |
| `MISSING_APPIUM_DRIVER` | エラーに示された `npx appium driver install …` の行を実行してください。 |
| `MISSING_CREDENTIALS` | 指定された変数をエクスポートしてください。doctor がその値を出力することはありません。 |
| `Session closed from wdio session` | デバッグセッションが閉じられました。テストを続行する場合は、close ではなく resume を使用してください。 |

終了コード：0 成功、1 アクションの失敗、2 使用方法の誤り、3 依存関係または認証情報の不足、4 その名前のセッションが存在しない。

## 次のステップ

- [ターゲット](/docs/session/targets) — ブラウザ、Android または iOS アプリ、Electron ウィンドウを開く
- [コーディングエージェント向け WebdriverIO](/docs/ai-agents) — スキル、ドキュメント、プロジェクトルール
- [wdio session コマンド](/docs/session-commands) — すべてのアクションとフラグ