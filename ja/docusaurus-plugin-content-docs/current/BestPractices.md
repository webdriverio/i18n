---
id: bestpractices
title: ベストプラクティス
---

# Best Practices

このガイドでは、パフォーマンスが高く堅牢なテストを書くためのベストプラクティスを共有することを目指しています。

## 堅牢なセレクターを使用する

DOMの変更に対して堅牢なセレクターを使用することで、例えば要素からクラスが削除された場合でも、テストの失敗を少なくしたり、完全に防いだりすることができます。

クラスは複数の要素に適用される可能性があるため、特に意図的にそのクラスを持つすべての要素を取得したい場合を除いて、可能であれば避けるべきです。

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

__注意:__ WebdriverIOがサポートするすべての可能なセレクターについては、[Selectors](./Selectors.md)ページをチェックしてください。

## 要素クエリの数を制限する

[`$`](https://webdriver.io/docs/api/browser/$)や[`$$`](https://webdriver.io/docs/api/browser/$$)コマンドを使用するたび（チェーンを含む）、WebdriverIOはDOMで要素を探そうとします。これらのクエリはコストが高いため、可能な限り制限するようにしましょう。

3つの要素をクエリしています。

```js
// 👎
await $('table').$('tr').$('td')
```

1つの要素のみをクエリしています。

``` js
// 👍
await $('table tr td')
```

チェーンを使用すべき唯一の時は、異なる[セレクター戦略](https://webdriver.io/docs/selectors/#custom-selector-strategies)を組み合わせたい場合です。
この例では、[Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors)を使用しています。これは要素のシャドウDOMの内部に移動するための戦略です。

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### リストから一つを取得するよりも、単一の要素を直接特定することを優先する

これは常に可能とは限りませんが、[:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)のようなCSSの疑似クラスを使用すると、親要素の子リスト内のインデックスに基づいて要素を一致させることができます。

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

WebdriverIOの組み込みアサーションを使用することで、実際の結果が期待される結果に一致するまで自動的に待機し、堅牢なテストになります。
これは、アサーションが合格するかタイムアウトするまで自動的に再試行することで実現されます。

```js
// 👍
await expect(button).toBeDisplayed()
```

## 遅延ロードとプロミスチェーン

WebdriverIOはクリーンコードを書く際にいくつかのトリックを持っています。要素を遅延ロードでき、プロミスをチェーンして`await`の数を減らすことができます。これにより、要素をChainablePromiseElementとして渡すことができ、ページオブジェクトでの使用が容易になります。

では、いつ`await`を使用する必要がありますか？
`$`および`$$`コマンドを除いて、常に`await`を使用する必要があります。

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

## コマンドとアサーションを過剰に使用しない

expect.toBeDisplayedを使用する場合、暗黙的に要素が存在するのを待機します。同じことをするアサーションがすでにある場合、waitForXXXコマンドを使用する必要はありません。

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

要素のテキストなどをアサートしたり操作したりする場合、要素が明示的に非表示（例えば、opacity: 0）または明示的に無効化（例えば、disabled属性）できる場合を除いて、要素が存在するか表示されるのを待つ必要はありません。その場合、要素が表示されるのを待機することは理にかなっています。

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

環境変数を使用して、秘密の認証情報などの動的なテストデータをテストにハードコードするのではなく、環境内に保存します。このトピックの詳細については、[Parameterize Tests](parameterize-tests)ページを参照してください。

## コードをリントする

eslintを使用してコードをリントすることで、早期にエラーを発見する可能性があります。当社の[リンティングルール](https://www.npmjs.com/package/eslint-plugin-wdio)を使用して、ベストプラクティスの一部が常に適用されるようにしましょう。

## 一時停止しない

pauseコマンドを使用したくなる場合がありますが、これは堅牢ではなく、長期的には不安定なテストの原因となるため、悪い考えです。

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

繰り返したい非同期コードがある場合、すべてのループがこれを行えるわけではないことを知っておくことが重要です。
例えば、Arrayのforを使用したループは組み込みのサポートがないことが[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)で読むことができます。

__注意:__ この例で示すように`console.log(await $$('h1').map((h1) => h1.getText()))`のように操作を同期的にする必要がない場合は、これらを使用することができます。

以下では、これがどういう意味かを示す例をいくつか示します。

非同期コールバックはサポートされていないため、次のコードは機能しません。

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

ユーザーがテキストや値などのデータをマッピングしているのを見ることがあります。これは多くの場合必要ありませんし、コードの臭いの兆候であることが多いです。なぜそうなのかを以下の例で確認してください。

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

// 👎 テキストで要素を検索するが、要素の位置を考慮していない
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 一意の識別子を使用（カスタム要素によく使用される）
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 アクセシビリティ名（ネイティブHTML要素によく使用される）
await expect($('aria/Product Prices')).toHaveText('Prices');
```

私たちが時々見かけるもう一つのことは、単純なことが過度に複雑な解決策を持っていることです。

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

## 並列でのコード実行

実行順序を気にしないコードがある場合は、[`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)を使用して実行速度を向上させることができます。

__注意:__ これによりコードが読みにくくなるため、ページオブジェクトや関数を使用して抽象化することができますが、パフォーマンスの利点が可読性のコストに見合うかどうかも疑問に思うべきです。

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

抽象化すると、以下のようになります。ロジックはsubmitWithDataOfというメソッドに配置され、データはPersonクラスから取得されています。

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```