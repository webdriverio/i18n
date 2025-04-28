---
id: retry
title: フラッキーテストの再試行
---

WebdriverIO テストランナーを使用すると、フラッキーネットワークや競合状態などが原因で不安定になった特定のテストを再実行することができます。（ただし、テストが不安定になった場合に、単に再実行率を上げることはお勧めしません！）

## Mochaでのスイートの再実行

Mochaのバージョン3以降では、テストスイート全体（`describe`ブロック内のすべて）を再実行することができます。Mochaを使用している場合は、特定のテストブロック（`it`ブロック内のすべて）のみを再実行できるWebdriverIOの実装よりも、このリトライメカニズムを優先すべきです。`this.retries()`メソッドを使用するためには、[Mochaのドキュメント](https://mochajs.org/#arrow-functions)に記載されているように、スイートブロック`describe`はアロー関数`() => {}`ではなく、バインドされていない関数`function(){}`を使用する必要があります。Mochaを使用すると、`wdio.conf.js`の`mochaOpts.retries`を使用してすべてのスペックの再試行回数を設定することもできます。

以下は例です：

```js
describe('retries', function () {
    // このスイート内のすべてのテストを最大4回まで再試行
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // このテストは最大2回まで再試行するように指定
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## JasmineまたはMochaでの単一テストの再実行

特定のテストブロックを再実行するには、テストブロック関数の後の最後のパラメータとして再実行回数を指定するだけです：

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
     * 最大4回実行されるスペック（1回の実際の実行 + 3回の再実行）
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // 再試行回数を返す
        // ...
    }, 3)
})
```

フックでも同様に動作します：

```js
describe('my flaky app', () => {
    /**
     * 最大2回実行されるフック（1回の実際の実行 + 1回の再実行）
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
     * 最大4回実行されるスペック（1回の実際の実行 + 3回の再実行）
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // 再試行回数を返す
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

フックでも同様に動作します：

```js
describe('my flaky app', () => {
    /**
     * 最大2回実行されるフック（1回の実際の実行 + 1回の再実行）
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Jasmineを使用している場合、2番目のパラメータはタイムアウト用に予約されています。再試行パラメータを適用するには、タイムアウトをデフォルト値の`jasmine.DEFAULT_TIMEOUT_INTERVAL`に設定してから、再試行回数を適用する必要があります。

</TabItem>
</Tabs>

この再試行メカニズムでは、単一のフックまたはテストブロックのみを再試行できます。アプリケーションのセットアップのためのフックがテストに付随している場合、このフックは実行されません。[Mochaは](https://mochajs.org/#retry-tests)この動作を提供するネイティブなテスト再試行機能を提供していますが、Jasmineにはありません。実行された再試行の回数は`afterTest`フックでアクセスできます。

## Cucumberでの再実行

### Cucumberでの完全なスイートの再実行

cucumber >=6の場合、失敗したシナリオを成功するまで追加の再試行を行うために、[`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests)構成オプションと、オプションの`retryTagFilter`パラメータを提供できます。この機能を動作させるには、`scenarioLevelReporter`を`true`に設定する必要があります。

### Cucumberでのステップ定義の再実行

特定のステップ定義の再実行率を定義するには、次のようにリトライオプションを適用するだけです：

```js
export default function () {
    /**
     * 最大3回実行されるステップ定義（1回の実際の実行 + 2回の再実行）
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

再実行はステップ定義ファイルでのみ定義でき、フィーチャーファイルでは定義できません。

## スペックファイル単位での再試行の追加

以前は、テストレベルとスイートレベルの再試行のみが使用可能でしたが、ほとんどの場合はこれで問題ありません。

しかし、状態を扱うテスト（サーバーやデータベース内の状態など）では、最初のテストの失敗後に状態が無効になる可能性があります。その後の再試行は、開始時の無効な状態のため、成功の可能性がない場合があります。

各スペックファイルに対して新しい`browser`インスタンスが作成されるため、これは他の状態（サーバー、データベース）をフックしてセットアップするのに理想的な場所です。このレベルでの再試行は、新しいスペックファイルの場合と同様に、セットアッププロセス全体が単に繰り返されることを意味します。

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * 全体として失敗した場合にスペックファイル全体を再試行する回数
     */
    specFileRetries: 1,
    /**
     * スペックファイルの再試行間の遅延（秒）
     */
    specFileRetriesDelay: 0,
    /**
     * 再試行されたスペックファイルはキューの先頭に挿入され、すぐに再試行される
     */
    specFileRetriesDeferred: false
}
```

## 特定のテストを複数回実行する

これは、フラッキーテストがコードベースに導入されるのを防ぐのに役立ちます。`--repeat`cliオプションを追加すると、指定されたスペックまたはスイートをN回実行します。このcliフラグを使用する場合、`--spec`または`--suite`フラグも指定する必要があります。

新しいテストをコードベースに追加する場合、特にCI/CDプロセスを通じて、テストは合格して統合されるかもしれませんが、後になってフラッキーになる可能性があります。このフラッキーさは、ネットワークの問題、サーバーの負荷、データベースのサイズなど、さまざまな要因から生じる可能性があります。CI/CDプロセスで`--repeat`フラグを使用すると、フラッキーテストがメインのコードベースに統合される前に検出するのに役立ちます。

一つの戦略は、CI/CDプロセスで通常通りテストを実行することですが、新しいテストを導入する場合は、`--spec`で新しいスペックを指定し、`--repeat`と一緒に別のテストセットを実行して、新しいテストをx回実行することです。テストがそのうちの1回でも失敗した場合、テストは統合されず、なぜ失敗したのかを調査する必要があります。

```sh
# これはexample.e2e.jsスペックを5回実行します
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```