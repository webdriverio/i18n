---
id: bestpractices
title: ベストプラクティス
---

# ベストプラクティス

このガイドでは、パフォーマンスが高く堅牢なテストを記述するのに役立つベストプラクティスを共有することを目的としています。

## 堅牢なセレクターを使用する

DOMの変更に対して堅牢なセレクターを使用することで、例えば要素からクラスが削除された場合でも、テストの失敗が少なくなるか、まったく失敗しなくなります。

クラスは複数の要素に適用できるため、そのクラスを持つすべての要素を意図的に取得したい場合を除き、可能であれば避けるべきです。

```js
// 👎
await $('.button')
```

これらのセレクターはすべて単一の要素を返すべきです。

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__注意:__ WebdriverIOがサポートするすべての可能なセレクターについては、[セレクター](./Selectors.md)ページをご覧ください。

## 要素クエリの数を制限する

[`$`](https://webdriver.io/docs/api/browser/$)または[`$$`](https://webdriver.io/docs/api/browser/$$)コマンドを使用するたび（これらを連鎖させる場合も含む）、WebdriverIOはDOM内の要素を特定しようとします。これらのクエリはコストがかかるため、できるだけ制限するようにしましょう。

3つの要素をクエリします。

```js
// 👎
await $('table').$('tr').$('td')
```

1つの要素だけをクエリします。

``` js
// 👍
await $('table tr td')
```

連鎖を使用すべき唯一のケースは、異なる[セレクター戦略](https://webdriver.io/docs/selectors/#custom-selector-strategies)を組み合わせたい場合です。
この例では、要素のシャドウDOMの中に入るための戦略である[Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors)を使用しています。

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### リストから一つを取るよりも、単一の要素を特定する方法を優先する

これが常に可能というわけではありませんが、[:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)のようなCSSの疑似クラスを使用することで、親要素の子リスト内のインデックスに基づいて要素を一致させることができます。

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

## 組み込みのアサーションを使用する

結果が一致するのを自動的に待機しない手動アサーションを使用しないでください。これは不安定なテストの原因となります。

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

WebdriverIOの組み込みアサーションを使用することで、実際の結果が期待される結果と一致するまで自動的に待機し、堅牢なテストを実現できます。
これは、アサーションが合格するかタイムアウトするまで自動的に再試行することで実現されます。

```js
// 👍
await expect(button).toBeDisplayed()
```

## 遅延ロードとプロミスチェーン

WebdriverIOは、クリーンなコードを書く際にいくつかの工夫をしています。要素を遅延ロードし、プロミスをチェーンすることで`await`の数を減らすことができます。これにより、要素をElementではなくChainablePromiseElementとして渡すことができ、ページオブジェクトとの使用も容易になります。

では、いつ`await`を使うべきでしょうか？
`$`と`$$`コマンドを除いて、常に`await`を使用するべきです。

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// または
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// または
await $('div').$('button').click()
```

## コマンドとアサーションを過剰に使用しない

expect.toBeDisplayedを使用すると、暗黙的に要素が存在するのを待機します。同じことを行うアサーションがすでにある場合、waitForXXXコマンドを使用する必要はありません。

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

要素が明示的に非表示（例えばopacity: 0）または明示的に無効（例えばdisabled属性）になる可能性がある場合を除き、要素とのやり取りやテキストなどのアサーションの際に、要素が存在するか表示されるのを待つ必要はありません。そのような場合、要素が表示されるのを待つことは理にかなっています。

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

## 動的テスト

秘密の認証情報などの動的なテストデータを環境変数に保存し、テストにハードコードしないようにしましょう。このトピックについての詳細は、[テストのパラメータ化](parameterize-tests)ページをご覧ください。

## コードをリントする

eslintを使用してコードをリントすることで、潜在的なエラーを早期に発見できます。ベストプラクティスが常に適用されるようにするために、[リンティングルール](https://www.npmjs.com/package/eslint-plugin-wdio)を使用してください。

## 一時停止しない

pauseコマンドを使用したくなる場合がありますが、これは堅牢ではなく、長期的には不安定なテストの原因となるため悪い考えです。

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // 送信ボタンが有効になるのを待つ
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## 非同期ループ

繰り返したい非同期コードがある場合、すべてのループがこれを行えるわけではないことを知っておくことが重要です。
例えば、配列のforEachメソッドは非同期コールバックをサポートしていません。これについては[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)で詳しく読むことができます。

__注意:__ この例`console.log(await $$('h1').map((h1) => h1.getText()))`で示されているように、操作が非同期である必要がない場合は、これらを使用することができます。

以下に、これが何を意味するかの例をいくつか示します。

非同期コールバックがサポートされていないため、次のコードは動作しません。

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

次のコードは動作します。

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## シンプルに保つ

時々、テキストや値などのデータをマッピングするユーザーを見かけます。これは多くの場合不要であり、コードの臭いの原因となることがあります。以下の例でなぜそうなのかを確認してください。

```js
// 👎 複雑すぎる、同期的なアサーション、不安定なテストを防ぐために組み込みのアサーションを使用
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
// 👍 一意の識別子を使用（カスタム要素でよく使用される）
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 アクセシビリティ名（ネイティブのHTML要素でよく使用される）
await expect($('aria/Product Prices')).toHaveText('Prices');
```

また、単純なことに過度に複雑な解決策を持つことがあります。

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

## 並列にコードを実行する

一部のコードが実行される順序を気にしない場合は、[`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)を利用して実行速度を上げることができます。

__注意:__ これによりコードが読みづらくなるため、ページオブジェクトや関数を使って抽象化することができますが、パフォーマンスの利点が可読性のコストに見合うかどうかも検討すべきです。

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

抽象化すると、以下のようになります。ロジックはsubmitWithDataOfというメソッドに配置され、データはPersonクラスから取得されます。

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```