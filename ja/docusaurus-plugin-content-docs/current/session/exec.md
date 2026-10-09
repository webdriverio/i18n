---
id: exec
title: セッションでコードを実行する
description: exec を使用して、実行中の wdio セッションで WebdriverIO のコードとアサーションを実行します。
---

`exec` は、開いているセッションで WebdriverIO のコードを実行します。単一の `click` や `fill` では済まないステップや、すべてのアサーションに使用してください。

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

コマンドには必ず `await` を付けてください。`$` は要素を 1 つ返し、要素が見つからない場合は例外をスローします。`$$` はリストを返します。sync モードや `browser.element` はありません。

宣言した名前は、次の `exec` でも引き続き使用できます。トップレベルの `import` はプロジェクトディレクトリから読み込まれます。

## アサーション

アサーションは `expect-webdriverio` を使って `exec` 内に記述します。プロジェクトにインストールしてください。インストールされていない場合、`expect(...)` はインストールを促すメッセージとともに失敗します。

```sh
npx wdio session exec -e "await expect($('h1')).toHaveText('Cart')"
```

画面の見た目を確認したい場合は `visual check <tag>` を使用します。このコマンドには `@wdio/visual-service` が必要です:

```sh
npx wdio session visual check cart
```

`visual accept cart` は、そのタグの最新の実際の画像をベースラインに上書きコピーします。同じタグのプレフィックスを持つ古い画像はコピーされません。

## 代わりにショートカットを使う場合

1 回の操作であれば、`click`、`fill`、`type`、`press`、`tap` の方が `exec` より短く済み、実行した WebdriverIO の行も出力されます。最新の[スナップショット](/docs/session/snapshots)の ref と組み合わせて、これらを優先的に使用してください。待機、アサーション、および複数のコマンドを必要とする処理には `exec` を使用します。

## 次のステップ

- [テストをエクスポートする](/docs/session/export) — `exec` を含むステップを保存します
- [コマンド](/docs/session-commands) — `exec` と `visual` のフラグ