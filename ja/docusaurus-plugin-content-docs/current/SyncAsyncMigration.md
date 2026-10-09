---
id: async-migration
title: 同期から非同期へ
description: "WebdriverIO のテストを同期コマンド実行から非同期コマンド実行へ段階的に移行する方法を、forEach ループ、アサーション、同期 PageObject を含めて解説します。"
---

V8 の変更により、WebdriverIO チームは 2023 年 4 月までに同期コマンド実行を非推奨にすることを[発表](https://webdriver.io/blog/2021/07/28/sync-api-deprecation)しました。チームは移行をできるだけ簡単にするために懸命に取り組んできました。このガイドでは、テストスイートを同期から非同期へ少しずつ移行する方法を説明します。サンプルプロジェクトとして [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) を使用しますが、他のすべてのプロジェクトでも同じアプローチが使えます。

## JavaScript における Promise

WebdriverIO で同期実行が人気だった理由は、Promise を扱う複雑さを取り除いてくれるからです。特に、この概念がこのような形で存在しない他の言語から来た場合、最初は戸惑うかもしれません。しかし、Promise は非同期コードを扱うための非常に強力なツールであり、今日の JavaScript では実際に簡単に扱うことができます。Promise を使ったことがない場合は、ここで説明するには範囲外となるため、[MDN リファレンスガイド](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)を確認することをお勧めします。

## 非同期への移行

WebdriverIO テストランナーは、同じテストスイート内で非同期実行と同期実行の両方を扱うことができます。つまり、テストと PageObject を自分のペースで段階的に移行できます。例えば、Cucumber Boilerplate では、プロジェクトにコピーして使える[大量のステップ定義](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action)が定義されています。ステップ定義を 1 つずつ、またはファイルを 1 つずつ移行していくことができます。

:::tip

WebdriverIO は、同期コードをほぼ完全に自動で非同期コードに変換できる [codemod](https://github.com/webdriverio/codemod) を提供しています。まずドキュメントの説明に従って codemod を実行し、必要に応じてこのガイドを使って手動で移行してください。

:::

多くの場合、必要な作業は、WebdriverIO コマンドを呼び出す関数を `async` にし、すべてのコマンドの前に `await` を追加することだけです。ボイラープレートプロジェクトで変換する最初のファイル `clearInputField.ts` を見てみると、次のコードを:

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

次のように変換します:

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

これだけです。すべての書き換え例を含む完全なコミットはこちらで確認できます:

#### コミット:

- _すべてのステップ定義を変換_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
この移行は TypeScript を使用しているかどうかに関係ありません。TypeScript を使用している場合は、最終的に `tsconfig.json` の `types` プロパティを `webdriverio/sync` から `@wdio/globals/types` に変更してください。また、コンパイルターゲットが少なくとも `ES2018` に設定されていることを確認してください。
:::

## 特殊なケース

もちろん、もう少し注意が必要な特殊なケースも常に存在します。

### ForEach ループ

例えば要素を反復処理するための `forEach` ループがある場合、イテレーターのコールバックが非同期で適切に処理されるようにする必要があります。例:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

`forEach` に渡す関数はイテレーター関数です。同期の世界では、次に進む前にすべての要素をクリックします。これを非同期コードに変換する場合、すべてのイテレーター関数の実行が完了するまで待機する必要があります。`async`/`await` を追加すると、これらのイテレーター関数は解決する必要のある Promise を返すようになります。しかし `forEach` はイテレーター関数の結果、つまり待機する必要のある Promise を返さないため、要素の反復処理には適さなくなります。そのため、`forEach` をその Promise を返す `map` に置き換える必要があります。`map` だけでなく、`find`、`every`、`reduce` などの配列の他のすべてのイテレーターメソッドも、イテレーター関数内の Promise を考慮するように実装されているため、非同期コンテキストで簡単に使用できます。上記の例を変換すると次のようになります:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

例えば、すべての `<h3 />` 要素を取得してそのテキスト内容を得るには、次のように実行します:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * 戻り値:
 * [
 *   'Extendable',
 *   'Compatible',
 *   'Feature Rich',
 *   'Who is using WebdriverIO?',
 *   'Support for Modern Web and Mobile Frameworks',
 *   'Google Lighthouse Integration',
 *   'Watch Talks about WebdriverIO',
 *   'Get Started With WebdriverIO within Minutes'
 * ]
 */
```

これが複雑すぎると感じる場合は、シンプルな for ループの使用を検討してください。例:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

`$$` は [`ElementArray`](/docs/api/browser/$$) を返します。リストを await する前に反復処理することもできます:

```js
for await (const elem of $$('div')) {
    await elem.click()
}
```

`for (const elem of $$('div'))` は、同期ループではクエリを待機できないため、リストが解決されるまでエラーをスローします。上記の例のように最初にリストを await するか、`for await` を使用してください。

### WebdriverIO アサーション

WebdriverIO のアサーションヘルパー [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio) を使用している場合は、すべての `expect` 呼び出しの前に `await` を付けてください。例:

```ts
expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

は次のように変換する必要があります:

```ts
await expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

### 同期 PageObject メソッドと非同期テスト

テストスイートで PageObject を同期的に記述してきた場合、それらを非同期テストで使用することはできなくなります。同期テストと非同期テストの両方で PageObject メソッドを使用する必要がある場合は、メソッドを複製して両方の環境向けに提供することをお勧めします。例:

```js
class MyPageObject extends Page {
    /**
     * 要素を定義
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // 同期コード
    }

    someMethodAsync () {
        // MyPageObject.someMethod() の非同期バージョン
    }
}
```

移行が完了したら、同期の PageObject メソッドを削除して名前を整理できます。

PageObject メソッドの 2 つの異なるバージョンを管理したくない場合は、PageObject 全体を非同期に移行し、[`browser.call`](https://webdriver.io/docs/api/browser/call) を使用して同期環境でメソッドを実行することもできます。例:

```js
// 変更前:
// MyPageObject.someMethod()
// 変更後:
browser.call(() => MyPageObject.someMethod())
```

`call` コマンドは、次のコマンドに進む前に非同期の `someMethod` が解決されることを保証します。

## まとめ

[書き換えの結果となる PR](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files) を見るとわかるように、この書き換えの複雑さはかなり低いものです。ステップ定義は 1 つずつ書き換えられることを覚えておいてください。WebdriverIO は、単一のフレームワーク内で同期実行と非同期実行の両方を問題なく扱うことができます。