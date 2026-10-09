---
id: bestpractices
title: ベストプラクティス
description: "安定したセレクターの使用、要素クエリの削減、組み込みアサーションの活用、手動のpauseの排除により、WebdriverIOで高速かつ堅牢なテストを作成しましょう。"
---

# ベストプラクティス

このガイドは、パフォーマンスが高く堅牢なテストを書くのに役立つベストプラクティスを共有することを目的としています。

## 堅牢なセレクターを使用する

DOMの変更に強いセレクターを使用することで、例えば要素からクラスが削除された場合でも、失敗するテストが少なくなる、あるいはまったくなくなります。

クラスは複数の要素に適用される可能性があるため、そのクラスを持つすべての要素を意図的に取得したい場合を除き、可能な限り避けるべきです。

```js
// 👎
await $('.button')
```

以下のセレクターはすべて単一の要素を返すはずです。

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__注意:__ WebdriverIOがサポートするすべてのセレクターについては、[セレクター](./Selectors.md)ページを確認してください。

## 要素クエリの数を制限する

[`$`](https://webdriver.io/docs/api/browser/$)または[`$$`](https://webdriver.io/docs/api/browser/$$)コマンドを使用するたびに（チェーンする場合も含む）、WebdriverIOはDOM内の要素を探そうとします。これらのクエリはコストが高いため、できる限り制限するようにしてください。

3つの要素をクエリします。

```js
// 👎
await $('table').$('tr').$('td')
```

1つの要素のみをクエリします。

``` js
// 👍
await $('table tr td')
```

チェーンを使用すべきなのは、異なる[セレクター戦略](https://webdriver.io/docs/selectors/#custom-selector-strategies)を組み合わせたい場合のみです。
この例では、要素のShadow DOM内部に入るための戦略である[ディープセレクター](https://webdriver.io/docs/selectors#deep-selectors)を使用しています。

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### リストから1つを取り出すのではなく、単一の要素を特定することを優先する

これが常に可能とは限りませんが、[:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)のようなCSS疑似クラスを使用すると、親の子リスト内での要素のインデックスに基づいて要素をマッチさせることができます。

すべてのテーブル行をクエリします。

```js
// 👎
await $$('table tr')[15]
```

単一のテーブル行をクエリします。

```js
// 👍
await $('table tr:nth-child(15)')
```

## 組み込みアサーションを使用する

結果が一致するまで自動的に待機しない手動のアサーションは、不安定なテスト（flaky test）の原因となるため使用しないでください。

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

組み込みアサーションを使用することで、WebdriverIOは実際の結果が期待される結果と一致するまで自動的に待機し、堅牢なテストを実現します。
これは、アサーションが成功するかタイムアウトするまで自動的にリトライすることで実現されています。

```js
// 👍
await expect(button).toBeDisplayed()
```

## 遅延読み込みとPromiseチェーン

WebdriverIOには、クリーンなコードを書くための工夫があります。要素を遅延読み込みできるため、Promiseをチェーンでき、`await`の数を減らすことができます。また、要素をElementではなくChainablePromiseElementとして渡すことができ、ページオブジェクトでの使用も容易になります。

では、いつ`await`を使う必要があるのでしょうか？
`$`と`$$`コマンドを除き、常に`await`を使用すべきです。

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// or
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// or
await $('div').$('button').click()
```

## コマンドやアサーションを過剰に使用しない

expect.toBeDisplayedを使用すると、暗黙的に要素の存在も待機します。同じことを行うアサーションがすでにある場合、waitForXXXコマンドを使用する必要はありません。

```js
// 👎
await button.waitForExist()
await expect(button).toBeDisplayed()

// 👎
await button.waitForDisplayed()
await expect(button).toBeDisplayed()

// 👍
await expect(button).toBeDisplayed()
```

要素を操作する場合や、テキストなどをアサートする場合に、要素の存在や表示を待つ必要はありません。ただし、要素が明示的に非表示になり得る場合（例えばopacity: 0）や、明示的に無効化され得る場合（例えばdisabled属性）は例外で、その場合は要素が表示されるまで待機することが理にかなっています。

```js
// 👎
await expect(button).toBeExisting()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await button.click()
```

```js
// 👍
await button.click()

// 👍
await expect(button).toHaveText('Submit')
```

## 動的なテスト

秘密の認証情報などの動的なテストデータは、テストにハードコードするのではなく、環境変数を使用して環境内に保存してください。このトピックの詳細については、[テストのパラメータ化](parameterize-tests)ページを参照してください。

## コードをLintする

eslintを使用してコードをLintすることで、エラーを早期に発見できる可能性があります。私たちの[Lintルール](https://www.npmjs.com/package/eslint-plugin-wdio)を使用して、いくつかのベストプラクティスが常に適用されるようにしましょう。

## pauseを使わない

pauseコマンドを使いたくなるかもしれませんが、これは堅牢ではなく、長期的には不安定なテストを引き起こすだけなので、使用するのは良くない考えです。

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // wait for submit button to enable
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## 非同期ループ

繰り返し実行したい非同期コードがある場合、すべてのループがこれに対応しているわけではないことを知っておくことが重要です。
例えば、[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)に記載されているように、ArrayのforEach関数は非同期コールバックに対応していません。

__注意:__ この例`console.log(await $$('h1').map((h1) => h1.getText()))`のように、操作を非同期にする必要がない場合は、これらを引き続き使用できます。

以下は、これが何を意味するかの例です。

以下は、非同期コールバックがサポートされていないため動作しません。

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

以下は動作します。

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## シンプルに保つ

ユーザーがテキストや値などのデータをmapしているのを見かけることがあります。これは多くの場合不要であり、コードの臭い（code smell）であることが多いです。その理由については以下の例を確認してください。

```js
// 👎 複雑すぎる、同期的なアサーション。不安定なテストを防ぐために組み込みアサーションを使用する
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 複雑すぎる
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 テキストで要素を見つけるが、要素の位置を考慮していない
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 一意の識別子を使用する（カスタム要素でよく使われる）
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 アクセシビリティ名（ネイティブHTML要素でよく使われる）
await expect($('aria/Product Prices')).toHaveText('Prices');
```

もう1つよく見かけるのは、単純なことに過度に複雑な解決策が使われていることです。

```js
// 👎
class BadExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasValue = (await element.getValue()) === value;
                if (hasValue) {
                    await $(element).click();
                }
                return hasValue;
            });
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasText = (await element.getText()) === text;
                if (hasText) {
                    await $(element).click();
                }
                return hasText;
            });
    }
}
```

```js
// 👍
class BetterExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $(`option[value=${value}]`).click();
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $(`option=${text}]`).click();
    }
}
```

## コードを並列実行する

一部のコードの実行順序を気にしない場合は、[`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)を活用して実行を高速化できます。

__注意:__ これによりコードが読みにくくなるため、ページオブジェクトや関数を使って抽象化することもできます。ただし、パフォーマンス上の利点が可読性の犠牲に見合うかどうかも検討すべきです。

```js
// 👎
await name.setValue('Bob')
await email.setValue('bob@webdriver.io')
await age.setValue('50')
await submitFormButton.waitForEnabled()
await submitFormButton.click()

// 👍
await Promise.all([
    name.setValue('Bob'),
    email.setValue('bob@webdriver.io'),
    age.setValue('50'),
])
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

抽象化すると、以下のようになります。ロジックはsubmitWithDataOfというメソッドに配置され、データはPersonクラスによって取得されます。

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```