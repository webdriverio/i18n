---
id: retry
title: 不安定なテストの再試行
---

WebdriverIO テストランナーを使用すると、不安定なネットワークや競合状態などにより不安定になる特定のテストを再実行できます。（ただし、テストが不安定になった場合に単に再実行率を上げることはお勧めしません！）

## Mochaでのスイートの再実行

Mochaのバージョン3以降では、テストスイート全体（`describe`ブロック内のすべて）を再実行できます。Mochaを使用している場合は、特定のテストブロック（`it`ブロック内のすべて）のみを再実行できるWebdriverIOの実装よりも、このリトライメカニズムを優先すべきです。`this.retries()`メソッドを使用するには、[Mochaドキュメント](https://mochajs.org/#arrow-functions)で説明されているように、スイートブロック`describe`はファットアロー関数`() => {}`ではなく、アンバウンドの関数`function(){}`を使用する必要があります。Mochaを使用すると、`wdio.conf.js`の`mochaOpts.retries`を使用してすべてのスペックに対して再試行回数を設定することもできます。

以下は例です：

```js
describe('retries', function () {
    // Retry all tests in this suite up to 4 times
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Specify this test to only retry up to 2 times
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## JasmineまたはMochaでの単一テストの再実行

特定のテストブロックを再実行するには、テストブロック関数の後に最後のパラメーターとして再実行回数を適用するだけです：

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
  ]
}>
<TabItem value="mocha">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, 3)
})
```

フックにも同様に機能します：

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, 1)

    // ...
})
```

</TabItem>
<TabItem value="jasmine">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

フックにも同様に機能します：

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Jasmineを使用している場合、2番目のパラメータはタイムアウト用に予約されています。再試行パラメータを適用するには、タイムアウトをデフォルト値の`jasmine.DEFAULT_TIMEOUT_INTERVAL`に設定し、その後に再試行回数を適用する必要があります。

</TabItem>
</Tabs>

この再試行メカニズムでは、単一のフックまたはテストブロックのみを再試行できます。テストにアプリケーションをセットアップするためのフックが付随している場合、このフックは実行されません。[Mochaは](https://mochajs.org/#retry-tests)この動作を提供するネイティブなテスト再試行を提供していますが、Jasmineは提供していません。`afterTest`フックで実行された再試行の回数にアクセスできます。

## Cucumberでの再実行

### Cucumberでの完全なスイートの再実行

cucumber >=6の場合、すべてまたは一部の失敗したシナリオが成功するまで追加の再試行を行うために、[`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests)構成オプションと、オプションパラメータ`retryTagFilter`を提供できます。この機能を動作させるには、`scenarioLevelReporter`を`true`に設定する必要があります。

### Cucumberでのステップ定義の再実行

特定のステップ定義の再実行率を定義するには、次のようにリトライオプションを適用するだけです：

```js
export default function () {
    /**
     * step definition that runs max 3 times (1 actual run + 2 reruns)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

再実行はステップ定義ファイルでのみ定義でき、機能ファイルでは定義できません。

## specファイルごとに再試行を追加する

以前は、テストレベルとスイートレベルの再試行のみが利用可能でしたが、ほとんどの場合はこれで十分です。

しかし、状態を含む任意のテスト（サーバーやデータベース内など）では、最初のテスト失敗後に状態が無効のままになる可能性があります。その後の再試行は、開始時に無効な状態のために成功する可能性がないかもしれません。

各specファイルに対して新しい`browser`インスタンスが作成されるため、これは他の状態（サーバー、データベース）をフックしてセットアップするための理想的な場所です。このレベルでの再試行は、新しいspecファイルの場合と同様に、セットアッププロセス全体が単に繰り返されることを意味します。

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * The number of times to retry the entire specfile when it fails as a whole
     */
    specFileRetries: 1,
    /**
     * Delay in seconds between the spec file retry attempts
     */
    specFileRetriesDelay: 0,
    /**
     * Retried specfiles are inserted at the beginning of the queue and retried immediately
     */
    specFileRetriesDeferred: false
}
```

## 特定のテストを複数回実行する

これは、コードベースに不安定なテストが導入されるのを防ぐのに役立ちます。`--repeat`cliオプションを追加することで、指定されたスペックまたはスイートをN回実行します。このcliフラグを使用する場合、`--spec`または`--suite`フラグも指定する必要があります。

コードベースに新しいテストを追加する場合、特にCI/CDプロセスを通じて、テストが合格してマージされる可能性がありますが、後で不安定になる可能性があります。この不安定性は、ネットワークの問題、サーバーの負荷、データベースのサイズなど、さまざまな要因から生じる可能性があります。CI/CDプロセスで`--repeat`フラグを使用すると、これらの不安定なテストがメインのコードベースにマージされる前に検出するのに役立ちます。

使用する1つの戦略は、CI/CDプロセスで通常通りテストを実行することですが、新しいテストを導入している場合は、`--spec`で新しいスペックを指定し、`--repeat`と一緒に実行して、新しいテストをx回実行するという別のテストセットを実行できます。テストがそれらの時間のいずれかで失敗した場合、テストはマージされず、なぜ失敗したのかを調査する必要があります。

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```