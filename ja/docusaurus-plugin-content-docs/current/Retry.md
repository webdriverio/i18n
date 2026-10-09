---
id: retry
title: 不安定なテストの再試行
description: "Mocha、Jasmine、Cucumberで不安定なテストを再試行し、スペックファイル全体を再実行し、特定のテストを複数回実行して不安定さを検出します。"
---

WebdriverIOのテストランナーでは、不安定なネットワークや競合状態などが原因で不安定になる特定のテストを再実行することができます。（ただし、テストが不安定になったからといって、単に再実行回数を増やすことは推奨されません！）

## Mochaでスイートを再実行する

Mochaのバージョン3以降では、テストスイート全体（`describe`ブロック内のすべて）を再実行できます。Mochaを使用している場合は、特定のテストブロック（`it`ブロック内のすべて）の再実行のみを可能にするWebdriverIOの実装ではなく、こちらの再試行メカニズムを優先して使用すべきです。`this.retries()`メソッドを使用するには、[Mochaのドキュメント](https://mochajs.org/#arrow-functions)で説明されているように、スイートブロック`describe`でアロー関数`() => {}`ではなく、バインドされていない関数`function(){}`を使用する必要があります。Mochaを使用する場合、`wdio.conf.js`の`mochaOpts.retries`を使用して、すべてのスペックに対する再試行回数を設定することもできます。

以下に例を示します：

```js
describe('retries', function () {
    // このスイート内のすべてのテストを最大4回再試行する
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // このテストは最大2回までのみ再試行するよう指定する
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## JasmineまたはMochaで単一のテストを再実行する

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
     * 最大4回実行されるスペック（実際の実行1回 + 再実行3回）
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // 再試行回数を返す
        // ...
    }, 3)
})
```

フックでも同様に機能します：

```js
describe('my flaky app', () => {
    /**
     * 最大2回実行されるフック（実際の実行1回 + 再実行1回）
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
     * 最大4回実行されるスペック（実際の実行1回 + 再実行3回）
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // 再試行回数を返す
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

フックでも同様に機能します：

```js
describe('my flaky app', () => {
    /**
     * 最大2回実行されるフック（実際の実行1回 + 再実行1回）
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Jasmineを使用している場合、2番目のパラメータはタイムアウト用に予約されています。再試行パラメータを適用するには、タイムアウトをデフォルト値の`jasmine.DEFAULT_TIMEOUT_INTERVAL`に設定してから、再試行回数を指定する必要があります。

</TabItem>
</Tabs>

この再試行メカニズムでは、単一のフックまたはテストブロックのみを再試行できます。テストにアプリケーションをセットアップするためのフックが付随している場合、そのフックは実行されません。[Mochaは](https://mochajs.org/#retry-tests)この動作を提供するネイティブのテスト再試行機能を備えていますが、Jasmineにはありません。実行された再試行の回数には、`afterTest`フックでアクセスできます。

## Cucumberでの再実行

### Cucumberでスイート全体を再実行する

cucumber >=6では、[`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests)設定オプションとオプションの`retryTagFilter`パラメータを指定することで、失敗したシナリオのすべてまたは一部を成功するまで追加で再試行させることができます。この機能を動作させるには、`scenarioLevelReporter`を`true`に設定する必要があります。

### Cucumberでステップ定義を再実行する

特定のステップ定義に再実行回数を定義するには、次のように再試行オプションを適用するだけです：

```js
export default function () {
    /**
     * 最大3回実行されるステップ定義（実際の実行1回 + 再実行2回）
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

再実行はステップ定義ファイルでのみ定義でき、featureファイルでは定義できません。

## スペックファイル単位で再試行を追加する

以前は、テストレベルとスイートレベルの再試行のみが利用可能でしたが、ほとんどの場合はそれで十分です。

しかし、状態（サーバーやデータベース上など）を伴うテストでは、最初のテストが失敗した後に状態が無効なまま残される可能性があります。その後の再試行は無効な状態から開始されるため、成功する見込みがない場合があります。

スペックファイルごとに新しい`browser`インスタンスが作成されるため、ここはその他の状態（サーバー、データベース）をフックしてセットアップするのに理想的な場所です。このレベルでの再試行は、新しいスペックファイルの場合と同様に、セットアッププロセス全体が単純に繰り返されることを意味します。

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * スペックファイル全体が失敗した場合に、スペックファイル全体を再試行する回数
     */
    specFileRetries: 1,
    /**
     * スペックファイルの再試行間の遅延（秒）
     */
    specFileRetriesDelay: 0,
    /**
     * 再試行されるスペックファイルはキューの先頭に挿入され、直ちに再試行される
     */
    specFileRetriesDeferred: false
}
```

## 特定のテストを複数回実行する

これは、不安定なテストがコードベースに導入されるのを防ぐためのものです。`--repeat` CLIオプションを追加すると、指定したスペックまたはスイートをN回実行します。このCLIフラグを使用する場合は、`--spec`または`--suite`フラグも指定する必要があります。

コードベースに新しいテストを追加する際、特にCI/CDプロセスを通じて追加する場合、テストが成功してマージされても、後から不安定になることがあります。この不安定さは、ネットワークの問題、サーバー負荷、データベースのサイズなど、さまざまな要因から生じる可能性があります。CD/CDプロセスで`--repeat`フラグを使用すると、これらの不安定なテストがメインのコードベースにマージされる前に検出するのに役立ちます。

活用できる戦略の1つは、CI/CDプロセスで通常どおりテストを実行しつつ、新しいテストを導入する場合には、新しいスペックを`--spec`で指定し、`--repeat`と組み合わせて別のテストセットを実行し、新しいテストをx回実行することです。いずれかの回でテストが失敗した場合、そのテストはマージされず、失敗した原因を調査する必要があります。

```sh
# example.e2e.jsスペックを5回実行します
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```