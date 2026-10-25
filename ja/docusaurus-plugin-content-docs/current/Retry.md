---
id: retry
title: 不安定なテストの再試行
description: "Mocha、Jasmine、Cucumberで不安定なテストを再試行し、スペックファイル全体を再実行し、特定のテストを複数回実行して不安定さを検出します。"
---

WebdriverIO テストランナーでは、不安定なネットワークや競合状態などが原因で不安定になる特定のテストを再実行できます。（ただし、テストが不安定になったからといって、単に再実行回数を増やすことは推奨されません！）

## Mocha でスイートを再実行する

Mocha のバージョン 3 以降では、テストスイート全体（`describe` ブロック内のすべて）を再実行できます。Mocha を使用している場合は、特定のテストブロック（`it` ブロック内のすべて）のみを再実行できる WebdriverIO の実装ではなく、この再試行メカニズムを優先して使用してください。`this.retries()` メソッドを使用するには、[Mocha のドキュメント](https://mochajs.org/#arrow-functions)で説明されているように、スイートブロック `describe` でアロー関数 `() => {}` ではなく、バインドされていない関数 `function(){}` を使用する必要があります。Mocha を使用すると、`wdio.conf.js` 内の `mochaOpts.retries` を使用して、すべてのスペックに対して再試行回数を設定することもできます。

以下は例です：

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

## Jasmine または Mocha で単一のテストを再実行する

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

Jasmine を使用している場合、2番目のパラメータはタイムアウト用に予約されています。再試行パラメータを適用するには、タイムアウトをデフォルト値 `jasmine.DEFAULT_TIMEOUT_INTERVAL` に設定してから、再試行回数を指定する必要があります。

</TabItem>
</Tabs>

この再試行メカニズムでは、単一のフックまたはテストブロックのみを再試行できます。テストにアプリケーションをセットアップするためのフックが付随している場合、そのフックは実行されません。[Mocha は](https://mochajs.org/#retry-tests)この動作を提供するネイティブのテスト再試行機能を備えていますが、Jasmine にはありません。実行された再試行回数には `afterTest` フックでアクセスできます。

Mocha では、テストまたはフックのすべての試行がそのタイムアウトを共有します。Mocha はタイマーを一度だけ開始し、すべての試行の合計時間がタイムアウトを超えるとテストを失敗させます。そのため、このメカニズムは失敗したテストやフック（例えば、失敗したアサーションやコマンド）を再試行しますが、タイムアウトに達したものは再試行しません。後続の試行が時間内に完了できないためです。WebdriverIO の再試行を使用したテストまたはフックのタイムアウトエラーには、タイムアウトした試行が示されます（例：`(WDIO attempt 2/3)`）。タイムアウトする可能性のあるテストには、[Mocha の再試行](https://mochajs.org/#retry-tests)（`this.retries()`）を使用してください。Mocha は各試行を完全なタイムアウトで再実行します。

## Cucumber での再実行

### Cucumber でスイート全体を再実行する

cucumber >=6 では、[`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) 設定オプションと、オプションのパラメータ `retryTagFilter` を指定することで、失敗したシナリオのすべてまたは一部を、成功するまで追加で再試行させることができます。

### Cucumber でステップ定義を再実行する

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

再実行はステップ定義ファイルでのみ定義でき、フィーチャーファイルでは定義できません。

## スペックファイル単位で再試行を追加する

以前は、テストレベルおよびスイートレベルの再試行のみが利用可能でしたが、ほとんどの場合はそれで十分です。

しかし、状態（サーバーやデータベースなど）を伴うテストでは、最初のテストが失敗した後に状態が無効なままになる可能性があります。その後の再試行は、無効な状態から開始されるため、成功する見込みがない場合があります。

スペックファイルごとに新しい `browser` インスタンスが作成されるため、ここは他の状態（サーバー、データベース）をフックしてセットアップするのに理想的な場所です。このレベルでの再試行は、新しいスペックファイルの場合と同じように、セットアッププロセス全体が単純に繰り返されることを意味します。

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
     * 再試行されるスペックファイルはキューの先頭に挿入され、すぐに再試行される
     */
    specFileRetriesDeferred: false
}
```

## 特定のテストを複数回実行する

これは、不安定なテストがコードベースに導入されるのを防ぐためのものです。`--repeat` CLI オプションを追加すると、指定したスペックまたはスイートを N 回実行します。この CLI フラグを使用する場合は、`--spec` または `--suite` フラグも指定する必要があります。

コードベースに新しいテストを追加する際、特に CI/CD プロセスを通じて追加する場合、テストが成功してマージされても、後になって不安定になることがあります。この不安定さは、ネットワークの問題、サーバーの負荷、データベースのサイズなど、さまざまな要因から生じる可能性があります。CD/CD プロセスで `--repeat` フラグを使用すると、これらの不安定なテストがメインのコードベースにマージされる前に検出するのに役立ちます。

1つの戦略として、CI/CD プロセスでは通常どおりテストを実行し、新しいテストを導入する場合は、`--spec` で新しいスペックを指定し、`--repeat` と組み合わせて別のテストセットを実行することで、新しいテストを x 回実行させる方法があります。いずれかの回でテストが失敗した場合、そのテストはマージされず、失敗した原因を調査する必要があります。

```sh
# example.e2e.js スペックを5回実行します
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```