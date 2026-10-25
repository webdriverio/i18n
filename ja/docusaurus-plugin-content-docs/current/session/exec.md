---
id: exec
title: セッションでコードを実行する
description: exec を使用して、稼働中の wdio セッションで WebdriverIO のコードとアサーションを実行します。
---

`exec` は、開いているセッションで WebdriverIO のコードを実行します。ステップが単一の `click` や `fill` では済まない場合や、すべてのアサーションに使用してください。

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

コマンドには必ず `await` を付けてください。`$` は 1 つの要素を返し、要素が見つからない場合はエラーをスローします。`$$` はリストを返します。sync モードや `browser.element` は存在しません。

宣言した名前は、次の `exec` でも引き続き使用できます。トップレベルの `import` は、プロジェクトディレクトリから読み込まれます。

## アサーション

アサーションは `expect-webdriverio` を使って `exec` 内に記述します。プロジェクトにインストールしてください。インストールされていない場合、`expect(...)` はインストールを促すメッセージとともに失敗します。

```sh
npx wdio session exec -e "await expect($('h1')).toHaveText('Cart')"
```

画面の見た目を確認したい場合は、`visual check <tag>` を使用してください。このコマンドには `@wdio/visual-service` が必要です:

```sh
npx wdio session visual check cart
```

`visual accept cart` は、そのタグの最新の実際の画像をベースラインに上書きコピーします。同じタグのプレフィックスを持つ古い画像はコピーしません。

## 代わりにショートカットを使う場合

1 回の操作であれば、`click`、`fill`、`type`、`press`、`tap` のほうが `exec` より短く書け、実行した WebdriverIO の行も出力されます。最新の[スナップショット](/docs/session/snapshots)の ref と組み合わせて、これらを優先的に使用してください。待機、アサーション、および複数のコマンドを必要とする処理には `exec` を使用してください。

## 次のステップ

- [テストをエクスポートする](/docs/session/export) — `exec` を含むステップを保存します
- [コマンド](/docs/session-commands) — `exec` と `visual` のフラグ