---
id: snapshots
title: スナップショットと ref
description: wdio session snapshot でページを読み取り、出力された ref に対して操作を行います。
---

クリックする前にスナップショットを取得してください。スナップショットは、操作可能な要素の一覧です。インタラクティブな各行の末尾には `[ref=e3]` のような ref が付きます。

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
```

各行は `button "Add to cart" [ref=e3]` のようになります。次のコマンドではその ref を使用します。

```sh
npx wdio session click e3
```

ref は最新のスナップショットから取得されます。ナビゲーションの後は、もう一度スナップショットを取得してください。古い ref は `REF_STALE` で失敗します。不明な ref は `REF_NOT_FOUND` で失敗します。

:::caution Experimental

スナップショットのテキストレイアウトと、`--json` が出力するその形式は実験的なものです。マイナーリリースで変更される可能性があります。たとえば、[DevTools トレース](/docs/devtools/wdio/trace-mode)とスナップショットエンジンを共有するための変更などです。ref の構文（`e3`、`@e3`）、ref を受け取るアクション、およびそれらが記録するコードは安定しています。ref はスナップショットから取得し、行のそれ以外の部分はパースしないでください。

:::

## 実行するコマンド

| コマンド | 用途 |
| --- | --- |
| `snapshot --interactive` | 操作可能な要素（それぞれ ref 付き） |
| `find "Add to cart"` | 各マッチを、それを囲むノード（例：リストアイテム全体）とともに表示するため、マッチの隣にある値も一緒に得られます。`-A`、`-B`、`-C` は grep のように単純な行コンテキストを出力します |
| `diff` | 前回のスナップショット以降の変更点 |
| `screenshot` | レイアウト。スナップショットで疑問が解決する場合は省略してください |
| `source` | ページの HTML またはネイティブの XML |

`--interactive` なしの `snapshot` には、ツリーのより多くの部分が含まれます。クリックや入力を行う直前には `--interactive` を使うことをおすすめします。

## アクションによる変更点

Web セッションでは、`open` は開いたページのインタラクティブなスナップショットを出力し、ページを変更し得るすべてのアクション（`click`、`fill`、`type`、`press`、`select`、`check`、`navigate`、`frame` など）は変更点をレポートします。

```text
Clicked e6 (button "Start subscription")
Changes:
+ - status "Subscription started. Confirmation code: 4F2A9C"
```

アクションによってタブが開かれた場合は、レポートにその旨が表示されます（`Opened a new tab [1]: https://…`）。`tabs switch` を実行するまで、セッションは現在のタブに留まります。ページがサイトそのものではなくボットチェック（Cloudflare、DataDome、Akamai など）である場合も、ページごとに一度レポートに表示されます。セッションはそれを突破しようとはしません。ヘッドレスブラウザでは、`--headed` で開き直すよう提案します。

同じページ上では、新規または変更された行が ref とともに得られます。これには、上記の status のようにインタラクティブでないテキストも含まれます。ナビゲーションの後は、新しいページのインタラクティブな要素が得られます。大きなページの場合は、`find` を案内する 1 行の要約が得られます。そのため、アクションの後に別途 `snapshot` を実行する必要はほとんどありません。レポートを無効にするには `WDIO_SESSION_CHANGES=0` を設定し、`open` 後のスナップショットを省略するには `open --no-snapshot` を指定します。

## フレーム

WebDriver BiDi セッションでは、スナップショットにページ内の iframe（クロスオリジンのものも含む）のコンテンツが、それぞれが属する iframe の下に表示されます。

```text
- iframe "Payment" [ref=e4]
  - textbox "Card number" [ref=e5]
  - button "Pay" [ref=e6]
```

これらの ref に対するアクションは、フレームに入り、操作を行い、ページに戻ります。出力されるコードも同じ動作をします。表示される iframe は最大 5 つで、それぞれ 300 要素で打ち切られます。`frame e4` と `snapshot` を使うと、打ち切られたフレームの全体が表示されます。トラッキングピクセルのような 100 平方ピクセル未満の iframe は除外されます。

## Shadow DOM とロールのないクリック可能な要素

WebDriver BiDi では、スナップショットはクローズドな shadow root も対象とし、クリックリスナーのみを持つ要素（`addEventListener` で設定されたアイコンなど）にも ref が付与されます。このような要素にはアクセシブルネームがないため、スナップショットは代わりにその要素を説明します。

```text
- generic [ref=e8] (icon 3 of 3 in "Invoice #1002 · Contoso Ltd · $860.00")
```

Android、iOS、macOS、Windows では、スナップショットは Appium のページソースから生成されます。アクセシビリティ ID を共有する 2 つのコントロールでも、セレクターの他の部分が異なれば別々の ref になります。`snapshot --scope e3` はツリーをその ref に限定します。

## 繰り返されるコントロール

商品テーブルの各行にある「Add to cart」ボタンのように、複数のコントロールがロールと名前を共有している場合、ref の行の末尾に `∈ "<text>"` が付きます。これは、そのコントロールを含み、同じ名前の他のコントロールを含まない行、カード、またはリストアイテムのテキストです。

```text
- button "Add to cart" [ref=e9] ∈ "Desk lamp · Brass · In stock · $49.00"
```

テキストは 80 文字で切り詰められます。アイテムがページのランドマークであるコントロール（ヘッダーとフッターの両方にある「Sign in」リンクなど）には付きません。表示されているフォームコントロールのラベルは一覧に含まれません。コントロール自体が名前を持つためです。

## ネイティブのタップ

Web セッションでは `click` を使用します。モバイルおよびネイティブデスクトップのセッションでは、同じ ref に対して `tap` を使用します。

```sh
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

## トラブルシューティング

| メッセージ | 対処法 |
| --- | --- |
| `REF_STALE` | 前回のスナップショットの要素が存在しなくなっています。`snapshot` を実行し、新しい ref を使用してください。 |
| `REF_NOT_FOUND` | その ID はこのセッションに一度も存在していません。コマンド内の ref が最新のスナップショットと一致していません。 |
| `NO_MATCH` | `find` がそのテキストを見つけられませんでした。スナップショットを取得し、実際に存在する名前を確認してください。 |
| `NOT_EDITABLE` | `fill` の対象が編集可能なフィールドではなく、その内部（または `aria-controls`/`aria-owns`/ラベルの先）に単一の編集可能なフィールドもありません。`snapshot --scope <target>` を実行し、フィールドの ref に対して fill を行ってください。 |

## 次のステップ

- [コードの実行](/docs/session/exec) — 1 つのコマンドでは収まらないアサーションやステップ
- [コマンド](/docs/session-commands) — `snapshot`、`find`、`diff`、`screenshot`、`source` のフラグ