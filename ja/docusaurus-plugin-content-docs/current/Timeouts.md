---
id: timeouts
title: タイムアウト
description: "テストの信頼性を保つために、WebDriverセッションのタイムアウト、WebdriverIOのwaitforタイムアウト、テストフレームワークのタイムアウトを設定します。"
---

WebdriverIOの各コマンドは非同期操作です。リクエストはSeleniumサーバー（または[Sauce Labs](https://saucelabs.com)のようなクラウドサービス）に送信され、そのレスポンスには、アクションが完了または失敗した時点での結果が含まれます。

したがって、時間はテストプロセス全体において重要な要素です。あるアクションが別のアクションの状態に依存している場合、それらが正しい順序で実行されるようにする必要があります。こうした問題に対処する際に、タイムアウトが重要な役割を果たします。

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## WebDriverのタイムアウト

### セッションスクリプトタイムアウト

セッションには、非同期スクリプトの実行を待機する時間を指定するセッションスクリプトタイムアウトが関連付けられています。特に指定がない限り、30秒です。このタイムアウトは次のように設定できます：

```js
await browser.setTimeout({ 'script': 60000 })
await browser.execute(async () => {
    console.log('this should not fail')
    await new Promise((resolve) => setTimeout(resolve, 59000))
})
```

### セッションページロードタイムアウト

セッションには、ページの読み込み完了を待機する時間を指定するセッションページロードタイムアウトが関連付けられています。特に指定がない限り、300,000ミリ秒です。

このタイムアウトは次のように設定できます：

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad`はWebDriverの[タイムアウト](https://www.w3.org/TR/webdriver/#set-timeouts)の名前です。WebdriverIO v10はこのキーのみを受け付けます。

### セッション暗黙的待機タイムアウト

セッションには、セッション暗黙的待機タイムアウトが関連付けられています。これは、[`findElement`](/docs/api/webdriver#findelement)または[`findElements`](/docs/api/webdriver#findelements)コマンド（WDIOテストランナーの有無にかかわらずWebdriverIOを実行する場合は、それぞれ[`$`](/docs/api/browser/$)または[`$$`](/docs/api/browser/$$)）を使用して要素を検索する際に、暗黙的な要素検索戦略で待機する時間を指定します。特に指定がない限り、0ミリ秒です。

このタイムアウトは次のように設定できます：

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## WebdriverIO関連のタイムアウト

### `WaitFor*`タイムアウト

WebdriverIOは、要素が特定の状態（例：有効、表示、存在）になるまで待機するための複数のコマンドを提供しています。これらのコマンドはセレクター引数とタイムアウト値を受け取り、インスタンスがその要素の状態到達をどれだけ待つかを決定します。`waitforTimeout`オプションを使用すると、すべての`waitFor*`コマンドに対するグローバルなタイムアウトを設定できるため、同じタイムアウトを何度も設定する必要がなくなります。_（小文字の`f`に注意してください！）_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

テスト内では、次のように記述できます：

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// you can also overwrite the default timeout if needed
await myElem.waitForDisplayed({ timeout: 10000 })
```

### ページによって削除された要素

ページが要素を削除または再レンダリングすると、WebdriverIOはそのセレクターで要素を再度検索し、最大`waitforTimeout`まで待機します。要素が存在する場合、コマンドはその要素に対して実行されます。存在しない場合、コマンドは次のエラーで失敗します：

- `message`: `Can't call <command> on element with selector "<selector>" because element wasn't found`（`$$()`の項目の場合：`… "<selector>" at index <n> …`、親が削除された場合：メッセージは親についてのものになります）
- `cause`: ドライバーのstale element referenceエラー

`waitUntil`と`waitForEnabled`は独自のエラーで失敗し、そのエラーは`cause`としてこのエラーを持ちます。削除された要素の`isDisplayed`と`isExisting`は待機せず、`false`を返します。削除された親の子要素の場合は、待機した後にこのエラーで失敗します。

```ts title="test/specs/removed.e2e.ts"
import { $, browser, expect } from '@wdio/globals'

describe('a removed element', () => {
    it('gives the error of an element that was not found again', async () => {
        await browser.url('https://webdriver.io')
        const title = await $('h1')
        await browser.execute(() => document.querySelectorAll('h1').forEach((h1) => h1.remove()))

        const error = await title.getText().then(() => null, (err: Error) => err)
        expect(error?.message).toContain('because element wasn\'t found')
    })
})
```

## フレームワーク関連のタイムアウト

WebdriverIOと共に使用するテストフレームワークは、特にすべてが非同期であるため、タイムアウトを扱う必要があります。これにより、何か問題が発生した場合でもテストプロセスが停止したままにならないようにします。

デフォルトでは、タイムアウトは10秒です。つまり、1つのテストがそれより長くかかってはならないということです。

Mochaでの単一のテストは次のようになります：

```js
it('should login into the application', async () => {
    await browser.url('/login')

    const form = await $('form')
    const username = await $('#username')
    const password = await $('#password')

    await username.setValue('userXY')
    await password.setValue('******')
    await form.submit()

    expect(await browser.getTitle()).to.be.equal('Admin Area')
})
```

Cucumberでは、タイムアウトは単一のステップ定義に適用されます。ただし、テストがデフォルト値より長くかかるためにタイムアウトを増やしたい場合は、フレームワークオプションで設定する必要があります。

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'}
  ]
}>
<TabItem value="mocha">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="jasmine">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="cucumber">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'cucumber',
    cucumberOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
</Tabs>

### MochaのタイムアウトとWebdriverIOのフック

Mochaのテストまたはフックは、`this.timeout(ms)`で自身のタイムアウトを変更できます。`this`を取得するには、アロー関数ではなく`function`を使用してください。WebdriverIOはこの変更に追従し、タイムアウトを無効にする`this.timeout(0)`にも対応します。`mochaOpts.parallelMode`を使用する場合は、`mochaOpts.timeout`のみが適用されます：テストまたはフック内の`this.timeout()`は例外をスローし、スイートや`it(...).timeout()`のタイムアウトは警告とともに無視されます。[スペックファイル内の並列テスト](./ParallelTests.md#hooks-and-timeouts)を参照してください。

Mochaはフックの前にタイマーを開始するため、テストのタイムアウトにはその`beforeTest`フックの時間が含まれます。WebdriverIOの[リトライオプション](./Retry.md#rerun-single-tests-in-jasmine-or-mocha)を使用する場合、テストのすべての試行が1つのタイムアウトを共有します。

テストまたはフックがタイムアウトすると、WebdriverIOはMochaが次のテストを開始する前に`afterTest`（または`afterHook`）を実行します。これにより、そのフックが次のテストと同時に実行されることはありません。Mochaはこれらのフックを、テストのタイムアウト1回分まで追加で待機します。