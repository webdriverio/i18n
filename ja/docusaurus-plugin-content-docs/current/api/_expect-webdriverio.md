---
id: expect-webdriverio
title: Expect 
custom_edit_url: https://github.com/webdriverio/expect-webdriverio/edit/main/README.md
---



テストを書く際に、値が特定の条件を満たすかどうかを確認する必要があることがよくあります。`expect`を使用すると、`browser`、`element`、`mock`オブジェクトに対して異なる検証を行うための「マッチャー」にアクセスできます。

## デフォルトオプション

以下のデフォルトオプションは、設定で設定されている[`waitforTimeout`](https://webdriver.io/docs/options#waitfortimeout)と[`waitforInterval`](https://webdriver.io/docs/options#waitforinterval)オプションに接続されています。

アサーションに特定のタイムアウトを待機したい場合にのみ、以下のオプションを設定してください。

```js
{
    wait: 2000, // 期待が成功するまで待機するミリ秒
    interval: 100, // 試行間の間隔
}
```

異なるタイムアウトと間隔を選択したい場合は、これらのオプションを次のように設定します：

```js
// wdio.conf.js
import { setOptions } from 'expect-webdriverio'

export const config = {
    // ...
    before () {
        setOptions({ wait: 5000 })
    },
    // ...
}
```

### マッチャーオプション

すべてのマッチャーはアサーションを修正できるいくつかのオプションを取ることができます：

##### コマンドオプション

| 名前 | 型 | 詳細 |
| ---- | ---- | ------- |
| <code><var>wait</var></code> | number | 期待が成功するまで待機する時間（ミリ秒）。デフォルト：`3000` |
| <code><var>interval</var></code> | number | 試行間の間隔。デフォルト：`100` |
| <code><var>beforeAssertion</var></code> | function | アサーションが行われる前に呼び出される関数 |
| <code><var>afterAssertion</var></code> | function | アサーション結果を含むアサーションが行われた後に呼び出される関数 |
| <code><var>message</var></code> | string | アサーションエラーの前に付加するユーザーメッセージ |

##### 文字列オプション

このオプションは、文字列がアサートされる場合にコマンドオプションに加えて適用できます。

| 名前 | 型 | 詳細 |
| ---- | ---- | ------- |
| <code><var>ignoreCase</var></code> | boolean | 実際の値と期待値の両方に`toLowerCase`を適用する |
| <code><var>trim</var></code> | boolean | 実際の値に`trim`を適用する |
| <code><var>replace</var></code> | Replacer \| Replacer[] | 文字列/RegExpに一致する実際の値の部分を置き換えます。置換子は文字列または関数にすることができます。
| <code><var>containing</var></code> | boolean | 実際の値が期待値を含むことを期待し、そうでなければ厳密に等しい。 |
| <code><var>asString</var></code> | boolean | プロパティ値を強制的に文字列に変換するのに役立つ場合があります |
| <code><var>atStart</var></code> | boolean | 実際の値が期待値で始まることを期待する |
| <code><var>atEnd</var></code> | boolean | 実際の値が期待値で終わることを期待する |
| <code><var>atIndex</var></code> | number | 実際の値が指定されたインデックスで期待値を持つことを期待する |

##### 数値オプション

このオプションは、数値がアサートされる場合にコマンドオプションに加えて適用できます。

| 名前 | 型 | 詳細 |
| ---- | ---- | ------- |
| <code><var>eq</var></code> | number | 等しい |
| <code><var>lte</var></code> | number | 以下 |
| <code><var>gte</var></code> | number | 以上 |

### HTMLエンティティの処理

HTMLエンティティはアンパサンド（`&`）で始まりセミコロン（`;`）で終わるテキスト（「文字列」）です。エンティティは、予約文字（そうでなければHTMLコードとして解釈される）や不可視文字（ノンブレークスペースなど、例えば`&nbsp;`）を表示するためによく使用されます。

そのような要素を検索または操作するには、エンティティのユニコード相当を使用します。例：

```html
<div data="Some&nbsp;Value">Some&nbsp;Text</div>
```

```js
const myElem = await $('div[data="Some\u00a0Value"]')
await expect(myElem).toHaveAttribute('data', 'div[Some\u00a0Value')
await expect(myElem).toHaveText('Some\u00a0Text')
```

すべてのユニコード参照は[HTML仕様](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references)で見つけることができます。

**注意：** ユニコードは大文字小文字を区別しないため、`\u00a0`と`\u00A0`の両方が機能します。ブラウザのインスペクトで要素を見つけるには、ユニコードから`u`を削除します（例：`div[data="Some\00a0Value"]`）。

## ブラウザマッチャー

### toHaveUrl

ブラウザが特定のページにあるかどうかを確認します。

##### 使用方法

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl('https://webdriver.io')
```

##### 使用方法

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl(expect.stringContaining('webdriver'))
```

### toHaveTitle

ウェブサイトが特定のタイトルを持っているかどうかを確認します。

##### 使用方法

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js')
await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
```

### toHaveClipboardText

ブラウザのクリップボードに特定のテキストが保存されているかどうかを確認します。

##### 使用方法

```js
import { Key } from 'webdriverio'

await browser.keys([Key.Ctrl, 'a'])
await browser.keys([Key.Ctrl, 'c'])
await expect(browser).toHaveClipboardText('some clipboard text')
await expect(browser).toHaveClipboardText(expect.stringContaining('clipboard text'))
```

## 要素マッチャー

### toBeDisplayed

指定された要素に対して[`isDisplayed`](https://webdriver.io/docs/api/element/isDisplayed/)を呼び出します。

##### 使用方法

```js
const elem = await $('#someElem')
await expect(elem).toBeDisplayed()
```

### toExist

指定された要素に対して[`isExisting`](https://webdriver.io/docs/api/element/isExisting)を呼び出します。

##### 使用方法

```js
const elem = await $('#someElem')
await expect(elem).toExist()
```

### toBePresent

`toExist`と同じです。

##### 使用方法

```js
const elem = await $('#someElem')
await expect(elem).toBePresent()
```

### toBeExisting

`toExist`と同じです。

##### 使用方法

```js
const elem = await $('#someElem')
await expect(elem).toBeExisting()
```

### toBeFocused

要素にフォーカスがあるかどうかを確認します。このアサーションはWebコンテキストでのみ機能します。

##### 使用方法

```js
const elem = await $('#someElem')
await expect(elem).toBeFocused()
```

### toHaveAttribute

要素が特定の値を持つ特定の属性を持つかどうかを確認します。

##### 使用方法

```js
const myInput = await $('input')
await expect(myInput).toHaveAttribute('class', 'form-control')
await expect(myInput).toHaveAttribute('class', expect.stringContaining('control'))
```

### toHaveAttr

`toHaveAttribute`と同じです。

##### 使用方法

```js
const myInput = await $('input')
await expect(myInput).toHaveAttr('class', 'form-control')
await expect(myInput).toHaveAttr('class', expect.stringContaining('control'))
```

### toHaveElementClass

要素が単一のクラス名を持つかどうかを確認します。要素が複数のクラス名を持つことができる場合は、配列をパラメータとして呼び出すこともできます。

##### 使用方法

```js
const myInput = await $('input')
await expect(myInput).toHaveElementClass('form-control', { message: 'Not a form control!' })
await expect(myInput).toHaveElementClass(['form-control' , 'w-full'], { message: 'not full width' })
await expect(myInput).toHaveElementClass(expect.stringContaining('form'), { message: 'Not a form control!' })
```

### toHaveElementProperty

要素が特定のプロパティを持つかどうかを確認します。

##### 使用方法

```js
const elem = await $('#elem')
await expect(elem).toHaveElementProperty('height', 23)
await expect(elem).not.toHaveElementProperty('height', 0)
```

### toHaveValue

入力要素が特定の値を持つかどうかを確認します。

##### 使用方法

```js
const myInput = await $('input')
await expect(myInput).toHaveValue('admin-user', { ignoreCase: true })
await expect(myInput).toHaveValue(expect.stringContaining('user'), { ignoreCase: true })
```

### toBeClickable

要素上で[`isClickable`](https://webdriver.io/docs/api/element/isClickable)を呼び出して、要素をクリックできるかどうかを確認します。

##### 使用方法

```js
const elem = await $('#elem')
await expect(elem).toBeClickable()
```

### toBeDisabled

要素上で[`isEnabled`](https://webdriver.io/docs/api/element/isEnabled)を呼び出して、要素が無効かどうかを確認します。

##### 使用方法

```js
const elem = await $('#elem')
await expect(elem).toBeDisabled()
// same as
await expect(elem).not.toBeEnabled()
```

### toBeEnabled

要素上で[`isEnabled`](https://webdriver.io/docs/api/element/isEnabled)を呼び出して、要素が有効かどうかを確認します。

##### 使用方法

```js
const elem = await $('#elem')
await expect(elem).toBeEnabled()
// same as
await expect(elem).not.toBeDisabled()
```

### toBeSelected

要素上で[`isSelected`](https://webdriver.io/docs/api/element/isSelected)を呼び出して、要素が有効かどうかを確認します。

##### 使用方法

```js
const elem = await $('#elem')
await expect(elem).toBeSelected()
```

### toBeChecked

`toBeSelected`と同じです。

##### 使用方法

```js
const elem = await $('#elem')
await expect(elem).toBeChecked()
```

### toHaveComputedLabel

要素が特定の計算されたWAI-ARIAラベルを持っているかどうかを確認します。要素が異なるラベルを持つ場合、配列をパラメータとして呼び出すこともできます。

##### 使用方法

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel('GitHub repository')
await expect(elem).toHaveComputedLabel(expect.stringContaining('repository'))
```

##### 使用方法

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel(['GitHub repository', 'Private repository'])
await expect(elem).toHaveComputedLabel([expect.stringContaining('GitHub'), expect.stringContaining('Private')])
```

### toHaveComputedRole

要素が特定の計算されたWAI-ARIAロールを持っているかどうかを確認します。要素が異なるラベルを持つ場合、配列をパラメータとして呼び出すこともできます。

##### 使用方法

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole('region')
await expect(elem).toHaveComputedRole(expect.stringContaining('ion'))
```

##### 使用方法

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole(['region', 'section'])
await expect(elem).toHaveComputedRole([expect.stringContaining('reg'), expect.stringContaining('sec')])
```

### toHaveHref

リンク要素が特定のリンクターゲットを持つかどうかを確認します。

##### 使用方法

```js
const link = await $('a')
await expect(link).toHaveHref('https://webdriver.io')
await expect(link).toHaveHref(expect.stringContaining('webdriver.io'))
```

### toHaveLink

`toHaveHref`と同じです。

##### 使用方法

```js
const link = await $('a')
await expect(link).toHaveLink('https://webdriver.io')
await expect(link).toHaveLink(expect.stringContaining('webdriver.io'))
```

### toHaveId

要素が特定の`id`属性を持つかどうかを確認します。

##### 使用方法

```js
const elem = await $('#elem')
await expect(elem).toHaveId('elem')
```

### toHaveText

要素が特定のテキストを持つかどうかを確認します。要素が異なるテキストを持つ場合、配列をパラメータとして呼び出すこともできます。

##### 使用方法

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText('Next-gen browser and mobile automation test framework for Node.js')
await expect(elem).toHaveText(expect.stringContaining('test framework for Node.js'))
await expect(elem).toHaveText(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'])
await expect(elem).toHaveText([expect.stringContaining('test framework for Node.js'), expect.stringContaining('Started')])
```

以下のようなdiv内の要素リストがある場合：

```
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

配列を使用してアサートできます：

```js
const elem = await $$('ul > li')
await expect(elem).toHaveText(['Coffee', 'Tea', 'Milk'])
```

### toHaveHTML

要素が特定のテキストを持つかどうかを確認します。要素が異なるテキストを持つ場合、配列をパラメータとして呼び出すこともできます。

##### 使用方法

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML('<p class="hero__subtitle">Next-gen browser and mobile automation test framework for Node.js</p>')
await expect(elem).toHaveHTML(expect.stringContaining('Next-gen browser and mobile automation test framework for Node.js'))
await expect(elem).toHaveHTML('Next-gen browser and mobile automation test framework for Node.js', { includeSelectorTag: false })
```

##### 使用方法

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'], { includeSelectorTag: false })
await expect(elem).toHaveHTML([expect.stringContaining('automation test framework for Node.js'), expect.stringContaining('Started')], { includeSelectorTag: false })
```

### toBeDisplayedInViewport

要素上で[`isDisplayedInViewport`](https://webdriver.io/docs/api/element/isDisplayedInViewport)を呼び出して、要素がビューポート内にあるかどうかを確認します。

##### 使用方法

```js
const elem = await $('#elem')
await expect(elem).toBeDisplayedInViewport()
```

### toHaveChildren

`element.$('./*')`コマンドを呼び出して、取得された要素の子の数を確認します。

##### 使用方法

```js
const list = await $('ul')
await expect(list).toHaveChildren() // the list has at least one item
// same as
await expect(list).toHaveChildren({ gte: 1 })

await expect(list).toHaveChildren(3) // the list has 3 items
// same as 
await expect(list).toHaveChildren({ eq: 3 })
```

### toHaveWidth

要素が特定の幅を持つかどうかを確認します。

##### 使用方法

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveWidth(32)
```

### toHaveHeight

要素が特定の高さを持つかどうかを確認します。

##### 使用方法

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveHeight(32)
```

### toHaveSize

要素が特定のサイズを持つかどうかを確認します。

##### 使用方法

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveSize({ width: 32, height: 32 })
```

### toBeElementsArrayOfSize

[`$$`](https://webdriver.io/docs/api/element/$)コマンドを使用して取得された要素の数を確認します。

**注意：** このマッチャーはアサーションが成功した場合、最新の要素で渡された配列を更新します。ただし、変数を再割り当てした場合は、要素を再度取得する必要があります。

##### 使用方法

```js
const listItems = await $$('ul>li')
await expect(listItems).toBeElementsArrayOfSize(5) // 5 items in the list

await expect(listItems).toBeElementsArrayOfSize({ lte: 10 })
// same as
assert.ok(listItems.length <= 10)
```

## ネットワークマッチャー

### toBeRequested

モックが呼び出されたかどうかを確認します

##### 使用方法

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequested()
```

### toBeRequestedTimes

モックが期待される回数だけ呼び出されたかどうかを確認します

##### 使用方法

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequestedTimes(2) // await expect(mock).toBeRequestedTimes({ eq: 2 })

await expect(mock).toBeRequestedTimes({ gte: 5, lte: 10 }) // request called at least 5 times but less than 11
```

### toBeRequestedWith

モックが期待されるオプションに従って呼び出されたかどうかを確認します。

ほとんどのオプションは、[expect.objectContaining](https://jestjs.io/docs/en/expect#expectobjectcontainingobject)などのexpect/jasmineの部分マッチャーをサポートしています。

##### 使用方法

```js
const mock = browser.mock('**/api/todo*', { method: 'POST' })

await expect(mock).toBeRequestedWith({
    url: 'http://localhost:8080/api/todo',          // [optional] string | function | custom matcher
    method: 'POST',                                 // [optional] string | array
    statusCode: 200,                                // [optional] number | array
    requestHeaders: { Authorization: 'foo' },       // [optional] object | function | custom matcher
    responseHeaders: { Authorization: 'bar' },      // [optional] object | function | custom matcher
    postData: { title: 'foo', description: 'bar' }, // [optional] object | function | custom matcher
    response: { success: true },                    // [optional] object | function | custom matcher
})

await expect(mock).toBeRequestedWith({
    url: expect.stringMatching(/.*\/api\/.*/i),
    method: ['POST', 'PUT'], // either POST or PUT
    statusCode: [401, 403],  // either 401 or 403
    requestHeaders: headers => headers.Authorization.startsWith('Bearer '),
    postData: expect.objectContaining({ released: true, title: expect.stringContaining('foobar') }),
    response: r => Array.isArray(r) && r.data.items.length === 20
})
```

## スナップショットマッチャー

WebdriverIOは基本的なスナップショットテストとDOMスナップショットテストをサポートしています。

### toMatchSnapshot

任意のオブジェクトが特定の値と一致するかどうかを確認します。[`WebdriverIO.Element`](https://webdriver.io/docs/api/element)を渡すと、自動的に[`outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML)の状態をスナップショットします。

##### 使用方法

```js
// snapshot arbitrary objects (no "await" needed here)
expect({ foo: 'bar' }).toMatchSnapshot()
// snapshot `outerHTML` of WebdriverIO.Element (DOM snapshot, requires "await")
await expect($('elem')).toMatchSnapshot()
// snapshot result of element command
await expect($('elem').getCSSProperty('background-color')).toMatchSnapshot()
```

### toMatchInlineSnapshot

同様に、`toMatchInlineSnapshot()`を使用して、テストファイル内にスナップショットをインラインで保存できます。例えば：

```js
await expect($('img')).toMatchInlineSnapshot()
```

スナップショットファイルを作成する代わりに、WebdriverIOはスナップショットを文字列として更新するためにテストファイルを直接変更します：

```js
await expect($('img')).toMatchInlineSnapshot(`"<img src="/public/apple-touch-icon-precomposed.png">"`)
```

## ビジュアルスナップショットマッチャー

<!--
    These matchers aren't implemented in the `expect-webdriverio` project and can be found
    here: https://github.com/webdriverio-community/visual-testing/blob/e10f7005c1533f5b06811888a9cbb9020e6e765e/packages/service/src/matcher.ts
-->

以下のマッチャーは`@wdio/visual-service`プラグインの一部として実装されており、サービスが設定されている場合にのみ利用できます。[セットアップの指示](https://webdriver.io/docs/visual-testing)に従ってください。

### toMatchElementSnapshot

指定された要素がベースラインのスナップショットと一致するかどうかを確認します。

##### 使用方法

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', 0, {
    // options
})
```

期待される結果はデフォルトで`0`なので、同じアサーションを次のように書くことができます：

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', {
    // options
})
```

または、オプションをまったく渡さないこともできます：

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot()
```

### toMatchScreenSnapshot

現在の画面がベースラインのスナップショットと一致するかどうかを確認します。

##### 使用方法

```js
await expect(browser).toMatchScreenSnapshot('partialPage', 0, {
    // options
})
```

期待される結果はデフォルトで`0`なので、同じアサーションを次のように書くことができます：

```js
await expect(browser).toMatchScreenSnapshot('partialPage', {
    // options
})
```

または、オプションをまったく渡さないこともできます：

```js
await expect(browser).toMatchScreenSnapshot('partialPage')
```

### toMatchFullPageSnapshot

フルページのスクリーンショットがベースラインのスナップショットと一致するかどうかを確認します。

##### 使用方法

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', 0, {
    // options
})
```

期待される結果はデフォルトで`0`なので、同じアサーションを次のように書くことができます：

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', {
    // options
})
```

または、オプションをまったく渡さないこともできます：

```js
await expect(browser).toMatchFullPageSnapshot('fullPage')
```

### toMatchTabbablePageSnapshot

タブマークを含むフルページスクリーンショットがベースラインのスナップショットと一致するかどうかを確認します。

##### 使用方法

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', 0, {
    // options
})
```

期待される結果はデフォルトで`0`なので、同じアサーションを次のように書くことができます：

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', {
    // options
})
```

または、オプションをまったく渡さないこともできます：

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable')
```

## 正規表現の使用

テキスト比較を行うすべてのマッチャーに対して、正規表現を直接使用することもできます。

##### 使用方法

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText(/node\.js/i)
await expect(elem).toHaveText([/node\.js/i, 'Get Started'])
await expect(browser).toHaveTitle(/webdriverio/i)
await expect(browser).toHaveUrl(/webdriver\.io/)
await expect(elem).toHaveElementClass(/Container/i)
```

## デフォルトマッチャー

`expect-webdriverio`マッチャーに加えて、Jestの組み込み[expect](https://jestjs.io/docs/en/expect)アサーションまたはJasmineの[expect/expectAsync](https://jasmine.github.io/api/3.5/global.html#expect)を使用できます。

## 非対称マッチャー

WebdriverIOはテキスト値を比較する場所であれば、どこでも非対称マッチャーの使用をサポートしています。例：

```ts
await expect(browser).toHaveTitle(expect.stringContaining('some title'))
```

または

```ts
await expect(browser).toHaveTitle(expect.not.stringContaining('some title'))
```

## TypeScript

[WDIOテストランナー](https://webdriver.io/docs/clioptions)を使用している場合、すべてが自動的に設定されます。ドキュメントの[セットアップガイド](https://webdriver.io/docs/typescript#framework-setup)に従ってください。ただし、WebdriverIOを異なるテストランナーまたは単純なNode.jsスクリプトで実行する場合は、`tsconfig.json`の`types`に`expect-webdriverio`を追加する必要があります。

- Jasmine/Jestユーザー以外の方には`"expect-webdriverio"`
- Jasmineには`"expect-webdriverio/jasmine"`
- Jestには`"expect-webdriverio/jest"`

## JavaScript（VSCode）

バニラJSでオートコンプリートを機能させるには、プロジェクトルートに`jsconfig.json`を作成し、型定義を参照する必要があります。

```json
{
  "include": [
    "**/*.js",
    "**/*.json",
    "node_modules/expect-webdriverio"
  ]
}
```

## 独自のマッチャーの追加

`expect-webdriverio`がJasmine/Jestマッチャーを拡張する方法と同様に、カスタムマッチャーを追加することも可能です。

- Jasmineについては[カスタムマッチャー](https://jasmine.github.io/2.5/custom_matcher.html)のドキュメントを参照してください
- その他の方はJestの[expect.extend](https://jestjs.io/docs/en/expect#expectextendmatchers)を参照してください

カスタムマッチャーはwdioの`before`フックで追加する必要があります

```js
// wdio.conf.js
{
    async before () {
        const { addCustomMatchers } = await import('./myMatchers')
        addCustomMatchers()
    }
}
```

```js
// myMatchers.js - Jest example
export function addCustomMatchers () {
    if (global.expect.expect !== undefined) { // Temporary workaround. See https://github.com/webdriverio/expect-webdriverio/issues/835
        global.expect = global.expect.expect;
    }

    expect.extend({
        myMatcher (actual, expected) {
            return { pass: actual === expected, message: () => 'some message' }
        }
    })
}
```