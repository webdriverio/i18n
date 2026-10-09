---
id: snapshots
title: スナップショットと ref
description: wdio session snapshot でページを読み取り、出力された ref を使って操作します。
---

クリックする前にスナップショットを取得してください。スナップショットは、操作可能な要素の一覧です。インタラクティブな各行の末尾には `[ref=e3]` のような ref が付きます。

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
```

行は `button "Add to cart" [ref=e3]` のようになります。次のコマンドでその ref を使います。

```sh
npx wdio session click e3
```

ref は最新のスナップショットから取得されます。ナビゲーションの後は、もう一度スナップショットを取得してください。古い ref は `REF_STALE` で失敗します。不明な ref は `REF_NOT_FOUND` で失敗します。

:::caution Experimental

スナップショットのテキストレイアウトと、`--json` が出力する形式は実験的なものです。マイナーリリースで変更される可能性があります（たとえば、[DevTools トレース](/docs/devtools/wdio/trace-mode)と 1 つのスナップショットエンジンを共有するためなど）。ref の構文（`e3`、`@e3`）、ref を受け取るアクション、およびそれらが記録するコードは安定しています。スナップショットからは ref だけを取得し、行のそれ以外の部分はパースしないでください。

:::

## 何を実行するか

| コマンド | 用途 |
| --- | --- |
| `snapshot --interactive` | 操作可能な要素（それぞれ ref 付き） |
| `find "Add to cart"` | 各一致箇所を、その周囲のノード（例：リスト項目全体）とともに表示するため、一致箇所の隣にある値も一緒に得られます。`-A`、`-B`、`-C` は grep のように単純な行コンテキストを出力します |
| `diff` | 前回のスナップショットから何が変わったか |
| `screenshot` | レイアウト。スナップショットで疑問が解決する場合は省略してください |
| `source` | ページの HTML またはネイティブの XML |

`--interactive` を付けない `snapshot` は、ツリーのより多くの部分を含みます。クリックや入力をしようとしているときは `--interactive` を優先してください。

## アクションが何を変えたか

Web セッションでは、`open` は開いたページのインタラクティブなスナップショットを出力し、ページを変更しうるすべてのアクション（`click`、`fill`、`type`、`press`、`select`、`check`、`navigate`、`frame`、…）は何が変わったかを報告します。

```text
Clicked e6 (button "Start subscription")
Changes:
+ - status "Subscription started. Confirmation code: 4F2A9C"
```

アクションによってタブが開かれた場合は、レポートにそのことが表示されます（`Opened a new tab [1]: https://…`）。`tabs switch` を実行するまで、セッションは現在のタブに留まります。ページがサイト本体ではなくボットチェック（Cloudflare、DataDome、Akamai など）である場合も、ページごとに 1 回、レポートにそのことが表示されます。セッションはそれを突破しようとはしません。ヘッドレスブラウザでは、`--headed` で開き直すことを提案します。

同じページ上では、新規または変更された行が ref とともに得られます。これには上記の status のような、インタラクティブでないテキストも含まれます。ナビゲーションの後は、新しいページのインタラクティブな要素が得られます。大きなページの場合は、`find` を案内する 1 行のサマリーが得られます。そのため、アクションの後に別途 `snapshot` を実行する必要はほとんどありません。レポートをオフにするには `WDIO_SESSION_CHANGES=0` を設定し、`open` の後のスナップショットを省略するには `open --no-snapshot` を指定します。

## フレーム

WebDriver BiDi セッションでは、スナップショットにページ内の iframe（クロスオリジンのものも含む）のコンテンツが、それぞれが属する iframe の下に表示されます。

```text
- iframe "Payment" [ref=e4]
  - textbox "Card number" [ref=e5]
  - button "Pay" [ref=e6]
```

これらの ref に対するアクションは、フレームに入って操作し、ページに戻ってきます。出力されるコードも同様の処理を行います。表示される iframe は最大 5 つで、それぞれ 300 要素で打ち切られます。打ち切られたフレームの全体は `frame e4` と `snapshot` で表示できます。トラッキングピクセルのような 100 平方ピクセル未満の iframe は除外されます。

## Shadow DOM とロールを持たないクリック可能な要素

WebDriver BiDi では、スナップショットはクローズドな shadow root もカバーし、クリックリスナーしか持たない要素（`addEventListener` で設定されたアイコンなど）にも ref が付与されます。このような要素にはアクセシブルな名前がないため、スナップショットは代わりにその要素を説明します。

```text
- generic [ref=e8] (icon 3 of 3 in "Invoice #1002 · Contoso Ltd · $860.00")
```

Android、iOS、macOS、Windows では、スナップショットは Appium のページソースから取得されます。アクセシビリティ ID を共有する 2 つのコントロールは、セレクターの他の部分が異なれば別々の ref のままになります。`snapshot --scope e3` はツリーをその ref に限定します。

## 繰り返されるコントロール

商品テーブルの各行にある「Add to cart」ボタンのように、複数のコントロールがロールと名前を共有している場合、ref の行は `∈ "<text>"` で終わります。これは、そのコントロールを含み、同じ名前の他のコントロールを含まない行、カード、またはリスト項目のテキストです。

```text
- button "Add to cart" [ref=e9] ∈ "Desk lamp · Brass · In stock · $49.00"
```

テキストは 80 文字で切り詰められます。項目がページのランドマークであるコントロール（ヘッダーとフッターの両方にある「Sign in」リンクなど）には付与されません。表示されているフォームコントロールのラベルは一覧に含まれません。コントロール自体がその名前を持つためです。

## ネイティブのタップ

Web セッションでは `click` を使います。モバイルおよびネイティブデスクトップのセッションでは、同じ ref に対して `tap` を使います。

```sh
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

## トラブルシューティング

| メッセージ | 対処法 |
| --- | --- |
| `REF_STALE` | 前回のスナップショットにあった要素はなくなっています。`snapshot` を実行して新しい ref を使ってください。 |
| `REF_NOT_FOUND` | その ID はこのセッションに一度も存在していません。コマンド内の ref が最新のスナップショットと一致していません。 |
| `NO_MATCH` | `find` がそのテキストを見つけられませんでした。スナップショットを取得し、実際に存在する名前を確認してください。 |
| `NOT_EDITABLE` | `fill` の対象が編集可能なフィールドではなく、その内部（または `aria-controls`/`aria-owns`/ラベルの先）に単一の編集可能なフィールドもありません。`snapshot --scope <target>` を実行し、フィールドの ref に対して fill してください。 |

## 次のステップ

- [コードを実行する](/docs/session/exec) — 1 つのコマンドでは収まらないアサーションやステップ
- [コマンド](/docs/session-commands) — `snapshot`、`find`、`diff`、`screenshot`、`source` のフラグ