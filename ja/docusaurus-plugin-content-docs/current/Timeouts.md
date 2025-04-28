---
id: timeouts
title: タイムアウト
---

WebdriverIOの各コマンドは非同期操作です。Seleniumサーバー（または[Sauce Labs](https://saucelabs.com)のようなクラウドサービス）にリクエストが送信され、そのレスポンスには、アクションが完了または失敗したときの結果が含まれています。

したがって、時間はテスト処理全体における重要な要素です。特定のアクションが別のアクションの状態に依存している場合、それらが正しい順序で実行されることを確認する必要があります。タイムアウトは、これらの問題に対処する際に重要な役割を果たします。

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## WebDriverのタイムアウト

### セッションスクリプトタイムアウト

セッションには、非同期スクリプトの実行待機時間を指定するセッションスクリプトタイムアウトが関連付けられています。特に指定がない限り、デフォルトは30秒です。このタイムアウトは以下のように設定できます：

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### セッションページロードタイムアウト

セッションには、ページ読み込みの完了を待機する時間を指定するセッションページロードタイムアウトが関連付けられています。特に指定がない限り、デフォルトは300,000ミリ秒です。

このタイムアウトは以下のように設定できます：

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad`キーワードは公式WebDriverの[仕様](https://www.w3.org/TR/webdriver/#set-timeouts)の一部ですが、使用しているブラウザによっては[サポートされていない](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687)場合があります（以前の名前は`page load`です）。

### セッション暗黙的待機タイムアウト

セッションには、関連するセッション暗黙的待機タイムアウトがあります。これは[`findElement`](/docs/api/webdriver#findelement)または[`findElements`](/docs/api/webdriver#findelements)コマンド（WDIOテストランナーありまたはなしでWebdriverIOを実行する場合は、それぞれ[`$`](/docs/api/browser/$)または[`$$`](/docs/api/browser/$$)）を使用して要素を検索する際の暗黙的な要素検索戦略の待機時間を指定します。特に指定がない限り、デフォルトは0ミリ秒です。

このタイムアウトは以下のように設定できます：

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## WebdriverIO関連のタイムアウト

### `WaitFor*`タイムアウト

WebdriverIOは、要素が特定の状態（有効、可視、存在など）に達するのを待機するための複数のコマンドを提供しています。これらのコマンドはセレクタ引数とタイムアウト値を取り、インスタンスがその要素が状態に達するまでどれだけ待つかを決定します。`waitforTimeout`オプションを使用すると、すべての`waitFor*`コマンドに対してグローバルなタイムアウトを設定できるため、同じタイムアウトを何度も設定する必要がなくなります。_（小文字の`f`に注意してください！）_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

テスト内では、次のようにできます：

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// 必要に応じてデフォルトのタイムアウトを上書きすることもできます
await myElem.waitForDisplayed({ timeout: 10000 })
```

## フレームワーク関連のタイムアウト

WebdriverIOと共に使用するテストフレームワークは、特にすべてが非同期であるため、タイムアウトを処理する必要があります。これにより、何か問題が発生した場合にテストプロセスが停止しないようにします。

デフォルトでは、タイムアウトは10秒に設定されており、これは単一のテストがそれ以上の時間がかからないようにすることを意味します。

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

Cucumberでは、タイムアウトは単一のステップ定義に適用されます。ただし、テストがデフォルト値よりも長くかかるためにタイムアウトを増やしたい場合は、フレームワークオプションで設定する必要があります。

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