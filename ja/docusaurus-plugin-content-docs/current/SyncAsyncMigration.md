---
id: async-migration
title: 同期から非同期へ
---

V8の変更により、WebdriverIOチームは2023年4月までに同期コマンド実行を非推奨にすることを[発表](https://webdriver.io/blog/2021/07/28/sync-api-deprecation)しました。チームはこの移行をできるだけ簡単にするために懸命に取り組んでいます。このガイドでは、テストスイートを同期から非同期に徐々に移行する方法を説明します。例として[Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate)プロジェクトを使用しますが、このアプローチは他のすべてのプロジェクトでも同様です。

## JavaScriptのPromise

WebdriverIOで同期実行が人気だった理由は、プロミスを扱う複雑さを排除できるからです。特に、この概念が同じ方法で存在しない他の言語から来た場合、最初は混乱するかもしれません。しかし、Promiseは非同期コードを扱うための非常に強力なツールであり、今日のJavaScriptでは実際にそれを扱うのが簡単になっています。Promiseを使ったことがない場合は、ここで説明するのは範囲外なので、[MDNリファレンスガイド](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)を確認することをお勧めします。

## 非同期への移行

WebdriverIOのテストランナーは、同じテストスイート内で非同期と同期の実行を処理できます。つまり、テストとPageObjectを自分のペースで段階的に移行できます。例えば、Cucumber Boilerplateには[多数のステップ定義](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action)が定義されており、それをプロジェクトにコピーして使用できます。一度に1つのステップ定義または1つのファイルを移行することができます。

:::tip

WebdriverIOは、同期コードを非同期コードにほぼ自動的に変換できる[codemod](https://github.com/webdriverio/codemod)を提供しています。まずドキュメントに記載されているようにcodemodを実行し、必要に応じてこのガイドを使用して手動で移行してください。

:::

多くの場合、必要なのはWebdriverIOコマンドを呼び出す関数を`async`にし、すべてのコマンドの前に`await`を追加することだけです。ボイラープレートプロジェクトで変換する最初のファイル`clearInputField.ts`を見ると、次のように変換します：

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

を以下のように：

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

これだけです。すべての書き換え例を含む完全なコミットはこちらで確認できます：

#### コミット：

- _全ステップ定義の変換_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
この移行は、TypeScriptを使用しているかどうかに関係なく行えます。TypeScriptを使用している場合は、`tsconfig.json`の`types`プロパティを`webdriverio/sync`から`@wdio/globals/types`に変更してください。また、コンパイルターゲットが少なくとも`ES2018`に設定されていることを確認してください。
:::

## 特殊なケース

もちろん、より注意が必要な特殊なケースもあります。

### forEachループ

要素を反復処理するための`forEach`ループがある場合、イテレータコールバックが非同期の方法で適切に処理されるようにする必要があります：

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

`forEach`に渡す関数はイテレータ関数です。同期の世界では、次に進む前にすべての要素をクリックします。これを非同期コードに変換する場合、各イテレータ関数の実行が終了するのを待つ必要があります。`async`/`await`を追加することで、これらのイテレータ関数は待機する必要のあるプロミスを返します。`forEach`はイテレータ関数の結果（私たちが待つ必要のあるプロミス）を返さないため、もはや要素を反復処理するのに理想的ではありません。したがって、`forEach`を`map`に置き換える必要があります。`map`はそのプロミスを返します。`map`や`find`、`every`、`reduce`などの配列のその他のイテレーターメソッドはすべて、イテレーター関数内のプロミスを考慮するように実装されており、非同期コンテキストでの使用が簡略化されています。上記の例は次のように変換されます：

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

例えば、すべての`<h3 />`要素を取得してそのテキスト内容を取得するには、次のように実行できます：

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

これが複雑すぎる場合は、単純なforループの使用を検討してください：

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

### WebdriverIOのアサーション

WebdriverIOのアサーションヘルパー[`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio)を使用する場合は、すべての`expect`呼び出しの前に`await`を設定してください：

```ts
expect($('input')).toHaveAttributeContaining('class', 'form')
```

以下のように変換する必要があります：

```ts
await expect($('input')).toHaveAttributeContaining('class', 'form')
```

### 同期PageObjectメソッドと非同期テスト

テストスイートでPageObjectを同期的に書いていた場合、それらを非同期テストで使用することはできなくなります。PageObjectメソッドを同期と非同期の両方のテストで使用する必要がある場合は、メソッドを複製して両方の環境に対応することをお勧めします：

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
        // MyPageObject.someMethodの非同期バージョン
    }
}
```

移行が完了したら、同期PageObjectメソッドを削除して名前を整理できます。

PageObjectメソッドの2つの異なるバージョンを維持したくない場合は、PageObject全体を非同期に移行し、同期環境でメソッドを実行するために[`browser.call`](https://webdriver.io/docs/api/browser/call)を使用することもできます：

```js
// 変更前:
// MyPageObject.someMethod()
// 変更後:
browser.call(() => MyPageObject.someMethod())
```

`call`コマンドは、非同期の`someMethod`が次のコマンドに進む前に解決されるようにします。

## 結論

[リライトPRの結果](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files)を見ると分かるように、この書き換えの複雑さはかなり簡単です。一度に1つのステップ定義を書き換えることができることを覚えておいてください。WebdriverIOは単一のフレームワーク内で同期実行と非同期実行を完全に処理することができます。