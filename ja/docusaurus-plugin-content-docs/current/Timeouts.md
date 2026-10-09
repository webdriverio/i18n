---
id: timeouts
title: タイムアウト
description: "WebDriverセッションタイムアウト、WebdriverIOのwaitforタイムアウト、テストフレームワークのタイムアウトを設定して、テストの信頼性を保ちます。"
---

WebdriverIOの各コマンドは非同期操作です。リクエストはSeleniumサーバー（または[Sauce Labs](https://saucelabs.com)のようなクラウドサービス）に送信され、そのレスポンスには、アクションが完了または失敗した時点での結果が含まれます。

したがって、時間はテストプロセス全体において重要な要素です。あるアクションが別のアクションの状態に依存する場合、それらが正しい順序で実行されることを確認する必要があります。このような問題に対処する際に、タイムアウトは重要な役割を果たします。

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## WebDriverタイムアウト

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

セッションには、ページの読み込みが完了するまで待機する時間を指定するセッションページロードタイムアウトが関連付けられています。特に指定がない限り、300,000ミリ秒です。

このタイムアウトは次のように設定できます：

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad`はWebDriverの[timeouts](https://www.w3.org/TR/webdriver/#set-timeouts)における名前です。WebdriverIO v10ではこのキーのみを受け付けます。

### セッション暗黙的待機タイムアウト

セッションには、セッション暗黙的待機タイムアウトが関連付けられています。これは、[`findElement`](/docs/api/webdriver#findelement)または[`findElements`](/docs/api/webdriver#findelements)コマンド（WDIOテストランナーの有無にかかわらずWebdriverIOを実行する場合は、それぞれ[`$`](/docs/api/browser/$)または[`$$`](/docs/api/browser/$$)）を使用して要素を検索する際に、暗黙的な要素検索戦略で待機する時間を指定します。特に指定がない限り、0ミリ秒です。

このタイムアウトは次のように設定できます：

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## WebdriverIO関連のタイムアウト

### `WaitFor*`タイムアウト

WebdriverIOは、要素が特定の状態（例：有効、表示、存在）になるまで待機するための複数のコマンドを提供しています。これらのコマンドはセレクター引数とタイムアウト値を受け取り、インスタンスがその要素が状態に達するまでどのくらい待機するかを決定します。`waitforTimeout`オプションを使用すると、すべての`waitFor*`コマンドのグローバルタイムアウトを設定できるため、同じタイムアウトを何度も設定する必要がありません。_（小文字の`f`に注意してください！）_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

テストでは、次のように記述できます：

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// 必要に応じてデフォルトのタイムアウトを上書きすることもできます
await myElem.waitForDisplayed({ timeout: 10000 })
```

## フレームワーク関連のタイムアウト

WebdriverIOで使用しているテストフレームワークは、特にすべてが非同期であるため、タイムアウトを処理する必要があります。これにより、何か問題が発生した場合でもテストプロセスが停止しないようにします。

デフォルトでは、タイムアウトは10秒です。つまり、1つのテストがそれ以上かかってはいけないということです。

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

Cucumberでは、タイムアウトは単一のステップ定義に適用されます。ただし、テストがデフォルト値よりも長くかかるためにタイムアウトを延長したい場合は、フレームワークオプションで設定する必要があります。

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