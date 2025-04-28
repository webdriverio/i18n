---
id: bestpractices
title: ベストプラクティス
---

# ベストプラクティス

このガイドでは、パフォーマンスが高く安定したテストを書くのに役立つベストプラクティスを共有します。

## 堅牢なセレクタを使用する

DOMの変更に対して堅牢なセレクタを使用することで、例えば要素からクラスが削除された場合でも、テストの失敗を減らすか完全になくすことができます。

クラスは複数の要素に適用できるため、そのクラスを持つすべての要素を意図的に取得する場合を除いて、可能であれば避けるべきです。

```js
// 👎
await $('.button')
```

これらのセレクタはすべて単一の要素を返すべきです。

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__注意:__ WebdriverIOがサポートするすべてのセレクタについては、[セレクタ](./Selectors.md)ページをご覧ください。

## 要素クエリの量を制限する

[`$`](https://webdriver.io/docs/api/browser/$)または[`$$`](https://webdriver.io/docs/api/browser/$$)コマンドを使用するたび（それらをチェーンすることも含む）、WebdriverIOはDOMで要素を探そうとします。これらのクエリはコストがかかるため、できるだけ制限するようにしてください。

3つの要素をクエリする例：

```js
// 👎
await $('table').$('tr').$('td')
```

1つの要素だけをクエリする例：

``` js
// 👍
await $('table tr td')
```

チェーンを使用すべき唯一のケースは、異なる[セレクタ戦略](https://webdriver.io/docs/selectors/#custom-selector-strategies)を組み合わせたい場合です。
この例では、要素のシャドウDOMの中に入るための戦略である[Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors)を使用しています。

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### リストから1つを取得するよりも、単一の要素を直接特定することを優先する

これは常に可能ではありませんが、[:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)のようなCSSの疑似クラスを使用することで、親要素の子リスト内のインデックスに基づいて要素を一致させることができます。

すべてのテーブル行をクエリする例：

```js
// 👎
await $$('table tr')[15]
```

単一のテーブル行をクエリする例：

```js
// 👍
await $('table tr:nth-child(15)')
```

## 組み込みのアサーションを使用する

結果が一致するまで自動的に待機しない手動アサーションを使用しないでください。これは不安定なテストの原因となります。

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

WebdriverIOの組み込みアサーションを使用することで、実際の結果が期待される結果と一致するまで自動的に待機し、堅牢なテストになります。
これはアサーションが合格するかタイムアウトするまで自動的に再試行することで実現されます。

```js
// 👍
await expect(button).toBeDisplayed()
```

## 遅延ロードとプロミスチェーン

WebdriverIOはクリーンなコードを書く際に便利なトリックがあります。要素を遅延ロードできるため、プロミスをチェーンして`await`の量を減らすことができます。これにより、要素をElementではなくChainablePromiseElementとして渡し、ページオブジェクトでより簡単に使用できます。

では、いつ`await`を使用する必要があるのでしょうか？
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

expect.toBeDisplayedを使用すると、暗黙的に要素が存在するのを待ちます。既に同じことをするアサーションがある場合、waitForXXXコマンドを使用する必要はありません。

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

要素が明示的に非表示（例：opacity: 0）または明示的に無効化（例：disabled属性）されている場合を除いて、要素のテキストなどを操作したりアサートしたりするときに、要素が存在または表示されるのを待つ必要はありません。

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

秘密の認証情報などの動的なテストデータをテストにハードコードするのではなく、環境変数を使用して環境内に保存します。このトピックの詳細については、[パラメータ化テスト](parameterize-tests)ページをご覧ください。

## コードをリントする

eslintを使用してコードをリントすることで、潜在的なエラーを早期に発見できます。ベストプラクティスが常に適用されるように、私たちの[リントルール](https://www.npmjs.com/package/eslint-plugin-wdio)を使用してください。

## 一時停止しない

pauseコマンドを使いたい誘惑に駆られることがありますが、これは堅牢ではなく、長期的には不安定なテストの原因になるだけなので悪い考えです。

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
例えば、配列のforEachメソッドは[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)で読むことができるように、非同期コールバックを許可していません。

__注意:__ この例のように操作を同期的に行う必要がない場合は、これらのメソッドを使用できます：`console.log(await $$('h1').map((h1) => h1.getText()))`。

以下はこれが意味することの例です。

非同期コールバックがサポートされていないため、次のコードは機能しません。

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

次のコードは機能します。

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## シンプルに保つ

ユーザーがテキストや値などのデータをマップしているのを見ることがあります。これは多くの場合必要なく、コードスメルであることが多いです。なぜそうなのか、以下の例を確認してください。

```js
// 👎 複雑すぎる、同期的なアサーション、不安定なテストを防ぐために組み込みのアサーションを使用する
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

// 👎 テキストによって要素を検索しているが、要素の位置を考慮していない
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 一意の識別子を使用する（多くの場合カスタム要素に使用される）
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 アクセシビリティ名（多くの場合ネイティブHTML要素に使用される）
await expect($('aria/Product Prices')).toHaveText('Prices');
```

また、シンプルなことに対して過度に複雑な解決策を見ることもあります。

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

## コードを並列に実行する

コードの実行順序に関心がない場合は、[`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)を活用して実行速度を向上させることができます。

__注意:__ これによりコードの読みやすさが低下するため、ページオブジェクトや関数を使って抽象化することもできますが、パフォーマンスの向上が読みやすさのコストに見合うかどうかも疑問に思うべきです。

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

抽象化すると、以下のようになります。ロジックはsubmitWithDataOfというメソッドに入れられ、データはPersonクラスから取得されます。

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```