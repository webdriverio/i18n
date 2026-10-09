---
id: export
title: セッションをテストとしてエクスポートする
description: wdio session で実行したステップを、spec、ページオブジェクト、カスタムコマンドに変換します。
---

`export` は記録されたステップから spec を書き出します。ref は安定したセレクターに置き換えられます。Web ページの場合、次の候補のうち、ちょうど 1 つの要素に一致する最初のものが使用されます：テスト ID（`data-testid`、`data-test`、`data-qa`）、`role/button[name="Add to cart"]` のような[ロールセレクター](/docs/selectors#role-selector)、アクセシブルネーム（`aria/Add to cart`）、id、ボタンまたはリンクのテキスト、フォームフィールド名、そして最後に CSS パスです。

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

`history` はエクスポート前にステップを表示します。`history clear` はそれらを破棄します。

## ページオブジェクト

`--page-objects` を指定すると、spec の隣にページオブジェクトが書き出されます。セレクターは実行されたパスごとにグループ化されます。記録されたステップ内のリテラルの `$('…')` はゲッターになります。`$$`、たまたま `$('…')` を含む文字列、および動的な `$(selector)` はそのまま残ります。

```sh
npx wdio session export --page-objects --out test/specs/cart.e2e.ts
```

このコマンドは、出力ディレクトリにすでに存在するページオブジェクトの上書きを拒否します。先に `--out` の場所を変更するか、そのファイルを削除してください。spec ファイル自体は再度書き出されます。

`exec` ステップの先頭にある `import` は、テスト関数の外側である spec の先頭に巻き上げられます。

## ヘルパー

ステップが `exec` には長すぎる場合は、`.wdio/helpers/` 配下にファイルを追加します。各ファイルは、ブラウザーを受け取り `addCommand` でコマンドを登録する関数をデフォルトエクスポートします。相対インポートはそのファイルからの相対パスのままです。パッケージ名のみのインポートはプロジェクトから解決されます。

```js title=".wdio/helpers/login.js"
import { mark } from './util.js'

export default function login (browser) {
    browser.addCommand('fillLogin', async (email) => {
        await browser.$('#email').setValue(email + mark)
    })
}
```

ヘルパーはセッションの開始時、および `npx wdio session helpers --reload` の実行時に読み込まれます。`.wdio/helpers` がまだ存在しない場合、セッションはその作成を監視します。ヘルパーはエクスポートされたテスト内でカスタムコマンドになります。

## 次のステップ

- [コードを実行する](/docs/session/exec) — `export` が記録するステップ
- [コマンド](/docs/session-commands) — `export`、`history`、`helpers` のフラグ