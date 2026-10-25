---
id: export
title: セッションをテストとしてエクスポートする
description: wdio session で実行したステップを、spec、ページオブジェクト、カスタムコマンドに変換します。
---

`export` は記録されたステップから spec を書き出します。ref は安定したセレクターに置き換えられます。Web ページの場合、次のうち要素にちょうど 1 つだけ一致する最初のものが使用されます：テスト ID（`data-testid`、`data-test`、`data-qa`）、`role/button[name="Add to cart"]` のような[ロールセレクター](/docs/selectors#role-selector)、アクセシブルネーム（`aria/Add to cart`）、id、ボタンまたはリンクのテキスト、フォームフィールド名、そして最後に CSS パスです。

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

`history` はエクスポート前にステップを表示します。`history clear` はそれらを破棄します。

## ページオブジェクト

`--page-objects` は spec の隣にページオブジェクトを書き出します。セレクターは実行されたパスごとにグループ化されます。記録されたステップ内のリテラルの `$('…')` はゲッターになります。`$$`、たまたま `$('…')` を含む文字列、および動的な `$(selector)` はそのまま残ります。

```sh
npx wdio session export --page-objects --out test/specs/cart.e2e.ts
```

このコマンドは、出力ディレクトリに既に存在するページオブジェクトの上書きを拒否します。先に `--out` を変更するか、そのファイルを削除してください。spec ファイル自体は再度書き出されます。

`exec` ステップの先頭にある `import` は、テスト関数の外側、spec の先頭に巻き上げられます。

## ヘルパー

ステップが `exec` には長すぎる場合は、`.wdio/helpers/` の下にファイルを追加します。各ファイルは、browser を受け取り `addCommand` でコマンドを登録する関数を default export します。相対インポートはそのファイルからの相対パスのままです。ベアパッケージのインポートはプロジェクトから解決されます。

```js title=".wdio/helpers/login.js"
import { mark } from './util.js'

export default function login (browser) {
    browser.addCommand('fillLogin', async (email) => {
        await browser.$('#email').setValue(email + mark)
    })
}
```

ヘルパーはセッションの開始時に読み込まれ、`npx wdio session helpers --reload` で再度読み込まれます。`.wdio/helpers` がまだ存在しない場合、セッションはその作成を監視します。ヘルパーはエクスポートされたテストでカスタムコマンドになります。

## 次のステップ

- [コードを実行する](/docs/session/exec) — `export` が記録するステップ
- [コマンド](/docs/session-commands) — `export`、`history`、`helpers` のフラグ