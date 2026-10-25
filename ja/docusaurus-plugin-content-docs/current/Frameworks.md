---
id: frameworks
title: フレームワーク
description: "WDIO テストランナーのテストフレームワークとして Mocha、Jasmine、Cucumber.js を設定する方法、または Serenity/JS のようなサードパーティ製フレームワークを統合する方法について説明します。"
---

WebdriverIO Runner は [Mocha](http://mochajs.org/)、[Jasmine](http://jasmine.github.io/)、[Cucumber.js](https://cucumber.io/) を標準でサポートしています。また、[Serenity/JS](#using-serenityjs) などのサードパーティ製オープンソースフレームワークと統合することもできます。

:::tip WebdriverIO とテストフレームワークの統合
WebdriverIO をテストフレームワークと統合するには、NPM で公開されているアダプターパッケージが必要です。
アダプターパッケージは、WebdriverIO がインストールされているのと同じ場所にインストールする必要があることに注意してください。
そのため、WebdriverIO をグローバルにインストールした場合は、アダプターパッケージも必ずグローバルにインストールしてください。
:::

WebdriverIO をテストフレームワークと統合すると、スペックファイルやステップ定義の中でグローバル変数 `browser` を使って
WebDriver インスタンスにアクセスできるようになります。
また、WebdriverIO が Selenium セッションの生成と終了も処理するため、自分で行う必要はありません。

## Mocha の使用

まず、NPM からアダプターパッケージをインストールします:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

デフォルトで、WebdriverIO にはすぐに使い始められる組み込みの[アサーションライブラリ](assertion)が用意されています:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO v10 には [Mocha 12](https://mochajs.org/) が同梱されており、Mocha の `BDD`（デフォルト）、`TDD`、`QUnit` の[インターフェース](https://mochajs.org/#interfaces)をサポートしています。

TDD スタイルでスペックを書きたい場合は、`mochaOpts` 設定の `ui` プロパティを `tdd` に設定してください。これにより、テストファイルは次のように記述します:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

その他の Mocha 固有の設定を定義したい場合は、設定ファイルの `mochaOpts` キーで行うことができます。すべてのオプションの一覧は [Mocha プロジェクトのウェブサイト](https://mochajs.org/api/mocha)で確認できます。

__注意:__ WebdriverIO は、Mocha における非推奨の `done` コールバックの使用をサポートしていません:

```js
it('should test something', (done) => {
    done() // "done is not a function" がスローされます
})
```

### Mocha オプション

Mocha 環境を設定するために、`wdio.conf.js` で以下のオプションを適用できます。__注意:__ すべての Mocha オプションがサポートされているわけではありません。`parallel` は依然として Mocha 独自のワーカープールに属するため、ここではエラーになります。WDIO テストランナーはすでにケイパビリティとワーカーにまたがってスペックを並列実行しています。1 つのスペックファイル内のテストを同時に実行するには、[`parallelMode`](#parallelmode) を使用してください。また、Mocha 12 の CLI は yargs から Node の `util.parseArgs` に移行しましたが、これは `mocha` を直接呼び出す場合にのみ影響し、`wdio` を通じて渡される `mochaOpts` には影響しません。これらのフレームワークオプションは、次のように引数として渡すことができます:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

これにより、以下の Mocha オプションが渡されます:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

以下の Mocha オプションがサポートされています:

#### require

<Option type="string|string[]" default="[]">

`require` オプションは、基本的な機能を追加または拡張したい場合に便利です（WebdriverIO フレームワークのオプション）。

</Option>

#### allowUncaught

<Option type="boolean" default="false">

キャッチされなかったエラーを伝播させます。

</Option>

#### bail

<Option type="boolean" default="false">

最初のテスト失敗後に中断します。

</Option>

#### checkLeaks

<Option type="boolean" default="false">

グローバル変数のリークをチェックします。

</Option>

#### delay

<Option type="boolean" default="false">

ルートスイートの実行を遅延させます。

</Option>

#### failHookAffectedTests

<Option type="boolean" default="true">

失敗した `before` または `beforeEach` フックによってスキップされた各テストを失敗として報告します。WebdriverIO はこれを有効にしているため、壊れたセットアップフックが、スキップされたすべてのスペックで確認できます。フックのみを報告するには `false` に設定してください。

</Option>

#### fgrep

<Option type="string" default="null">

指定された文字列でテストをフィルタリングします。

</Option>

#### forbidOnly

<Option type="boolean" default="false">

`only` が指定されたテストがあるとスイートを失敗させます。

</Option>

#### forbidPending

<Option type="boolean" default="false">

保留中のテストがあるとスイートを失敗させます。

</Option>

#### fullTrace

<Option type="boolean" default="false">

失敗時に完全なスタックトレースを表示します。

</Option>

#### global

<Option type="string[]" default="[]">

グローバルスコープに存在することが想定される変数。

</Option>

#### grep

<Option type="RegExp|string" default="null">

指定された正規表現でテストをフィルタリングします。Mocha 12 では、このフィルターで最新の RegExp フラグ（例えば `s` や `d`）を使用できます。

</Option>

#### invert

<Option type="boolean" default="false">

テストフィルターのマッチを反転させます。

</Option>

#### maxParallelContexts

<Option type="number" default="os.cpus().length">

[`parallelMode`](#parallelmode) が設定されている場合に同時に実行されるテストの数。[スペックファイル内の並列テスト](./ParallelTests.md#options)を参照してください。

</Option>

#### parallelMode

<Option type="'contexts' | 'userContexts'" default="undefined">

スペックファイル内のテストを、それぞれ独自の WebDriver BiDi ブラウジングコンテキストで同時に実行します。`'contexts'` はテスト間で Cookie とストレージを共有し、`'userContexts'` はそれらを分離します。`'wdio:experimentalBiDiCommands': true` ケイパビリティが必要です。このモードでは `bail` と `retries` はサポートされていません。[スペックファイル内の並列テスト](./ParallelTests.md)を参照してください。

</Option>

#### retries

<Option type="number" default="0">

失敗したテストを再試行する回数。

</Option>

#### timeout

<Option type="number" default="30000">

タイムアウトのしきい値（ミリ秒）。

</Option>

## Jasmine の使用

まず、NPM からアダプターパッケージをインストールします:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

その後、設定ファイルで `jasmineOpts` プロパティを設定することで、Jasmine 環境を構成できます。すべてのオプションの一覧は [Jasmine プロジェクトのウェブサイト](https://jasmine.github.io/api/edge/Configuration.html)で確認できます。

### Jasmine オプション

`jasmineOpts` プロパティを使用して Jasmine 環境を設定するために、`wdio.conf.js` で以下のオプションを適用できます。これらの設定オプションの詳細については、[Jasmine のドキュメント](https://jasmine.github.io/api/edge/Configuration)を参照してください。これらのフレームワークオプションは、次のように引数として渡すことができます:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

これにより、以下の Jasmine オプションが渡されます:

```ts
{
    grep: 'my test',
    failSpecWithNoExpectations: true,
    random: false
}
```

以下の Jasmine オプションがサポートされています:

#### defaultTimeoutInterval

<Option type="number" default="60000">

Jasmine の操作に対するデフォルトのタイムアウト間隔。

</Option>

#### helpers

<Option type="string[]" default="[]">

Jasmine のスペックの前に読み込む、spec_dir からの相対ファイルパス（および glob）の配列。

</Option>

#### requires

<Option type="string[]" default="[]">

`requires` オプションは、基本的な機能を追加または拡張したい場合に便利です。

</Option>

#### random

<Option type="boolean" default="false">

スペックの実行順序をランダムにするかどうか。Jasmine 自体のデフォルトは `true` ですが、このオプションを設定しない限り、WebdriverIO はスペックを順番に実行します。

</Option>

#### seed

<Option type="Function" default="null">

ランダム化の基準として使用するシード。null の場合、シードは実行開始時にランダムに決定されます。

</Option>

#### failSpecWithNoExpectations

<Option type="boolean" default="false">

エクスペクテーションが 1 つも実行されなかったスペックを失敗にするかどうか。デフォルトでは、エクスペクテーションが実行されなかったスペックは成功として報告されます。これを true に設定すると、そのようなスペックは失敗として報告されます。

</Option>

#### oneFailurePerSpec

<Option type="boolean" default="false">

最初に失敗したエクスペクテーションでスペックを停止します。同期マッチャーが失敗するとスペックは即座に停止し、await された非同期マッチャーの場合はその Promise が確定した時点で停止します。他のスペックは引き続き実行されます。

</Option>

#### specFilter

<Option type="Function" default="(spec) => true">

スペックのフィルタリングに使用する関数。

</Option>

#### grep

<Option type="string|Regexp" default="null">

この文字列または正規表現にマッチするテストのみを実行します。（カスタムの `specFilter` 関数が設定されていない場合にのみ適用されます）

</Option>

#### invertGrep

<Option type="boolean" default="false">

true の場合、マッチするテストを反転させ、`grep` で使用された式にマッチしないテストのみを実行します。（カスタムの `specFilter` 関数が設定されていない場合にのみ適用されます）

</Option>

#### stopOnSpecFailure

<Option type="boolean" default="false">

最初に失敗したスペック（`it`）でスペックファイルを停止します。そのファイルの他のスペックは、別の `describe` ブロック内のものも含めて実行されません。他のスペックファイルはそれぞれ独自のワーカーで実行され、継続されます。

</Option>

#### cleanStack

<Option type="boolean" default="true">

失敗時のスタックトレースから `node_modules` パッケージの行を削除します。

</Option>

#### expectationResultHandler

<Option type="Function" default="null">

各エクスペクテーションごとに `(passed, assertion)` を引数として呼び出されます。例えば、エクスペクテーションが失敗したときにスクリーンショットを撮るために使用できます。成功したエクスペクテーションに対してこの関数が例外をスローした場合、そのエクスペクテーションはそのエラーで失敗となります。

</Option>

### アサーション

Jasmine では、グローバルの `expect` は Jasmine のマッチャーと [WebdriverIO マッチャー](/docs/api/expect-webdriverio)を組み合わせたものになります:

- Jasmine のマッチャー（`toBe`、`toEqual`、`toHaveBeenCalled` など）と `jasmine.addMatchers` で追加したマッチャーは同期的です。これらは `undefined` を返すため、`await` は不要です。
- WebdriverIO マッチャー、Jasmine の非同期マッチャー（`toBeResolved`、`toBeRejectedWith` など）、および `jasmine.addAsyncMatchers` で追加したマッチャーは Promise を返します。必ず `await` してください。

どちらの種類にも `expect()` を使用してください。各マッチャーを Jasmine の `expect` または `expectAsync` に自動的に振り分けます。`await expectAsync($('#logo')).toBeDisplayed()` も動作します。TypeScript の場合、`types` に `@wdio/jasmine-framework` を追加すると、`expectAsync()` でも WebdriverIO マッチャーが使えるようになります。

```js
it('checks the page', async () => {
    expect([1, 2]).toHaveSize(2)                                   // Jasmine、同期
    await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO、非同期
    await expect(loadData()).toBeResolved()                        // Jasmine の非同期マッチャー
})
```

`toHaveSize` は両方のライブラリに存在します。WebdriverIO のマッチャーは WebdriverIO の値に対して実行されます: 要素、要素配列または `Element[]`（例えば `$$().filter()` の結果）、マルチリモート要素、ブラウザ、ブラウジングコンテキスト、モック、`some()` ラッパー、またはチェーン可能な `$()` などの Promise です。それ以外のすべての値に対しては Jasmine のマッチャーが実行されます。

両方のライブラリの非対称マッチャーは、Jasmine マッチャーでも WebdriverIO マッチャーでも動作します: `jasmine.any()`、`jasmine.objectContaining()`、`jasmine.stringMatching()` など、および `expect.any()`、`expect.stringContaining()`、`expect.oneOf()`、`expect.multiRemote()`、`expect.not.stringContaining()` などです。`some()` を使用するには、インポートしてください:

```js
import { some } from 'expect-webdriverio/api'

await expect(some($$('li'))).toHaveAttribute('data-state', 'on')
```

Jasmine では `expect` の Jest 部分は使用できません: `toStrictEqual` や `toHaveLength` などの Jest 専用マッチャー、および `expect.soft()` です。カスタムマッチャーを追加するには、スペックファイルまたは `before` フック内で `expect.extend()` を使用するか（[カスタムマッチャー](/docs/custommatchers)を参照）、同期マッチャーには `jasmine.addMatchers`、非同期マッチャーには `jasmine.addAsyncMatchers` を使用してください。

TypeScript の場合は、`types` に `jasmine` を追加してください。[TypeScript のセットアップ](/docs/typescript)を参照してください。

## Cucumber の使用

まず、NPM からアダプターパッケージをインストールします:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Cucumber を使用したい場合は、[設定ファイル](configurationfile)に `framework: 'cucumber'` を追加して、`framework` プロパティを `cucumber` に設定してください。

Cucumber のオプションは、設定ファイルの `cucumberOpts` で指定できます。オプションの全一覧は[こちら](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options)を確認してください。アダプターは Cucumber 13 を使用します。`tagExpression` は削除されたため、`tags` でフィルタリングしてください。[v10 移行ガイド](v10-migration#cucumber)を参照してください。

Cucumber をすぐに使い始めるには、[`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) プロジェクトをご覧ください。開始に必要なすべてのステップ定義が含まれており、すぐにフィーチャーファイルを書き始めることができます。

### Cucumber オプション

`cucumberOpts` プロパティを使用して Cucumber 環境を設定するために、`wdio.conf.js` で以下のオプションを適用できます:

:::tip コマンドラインからのオプション調整
テストをフィルタリングするためのカスタム `tags` などの `cucumberOpts` は、コマンドラインから指定できます。これは `cucumberOpts.{optionName}="value"` の形式を使用して行います。

例えば、`@smoke` タグが付いたテストのみを実行したい場合は、次のコマンドを使用できます:

```sh
# "@smoke" タグを持つテストのみを実行したい場合
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

このコマンドは `cucumberOpts` の `tags` オプションを `@smoke` に設定し、このタグを持つテストのみが実行されるようにします。

:::

#### backtrace

<Option type="Boolean" default="false">

エラーの完全なバックトレースを表示します。

</Option>

#### requireModule

<Option type="string[]" default="[]">

サポートファイルを require する前にモジュールを require します。

</Option>
例:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // または
    requireModule: [
        [
            '@babel/register',
            {
                rootMode: 'upward',
                ignore: ['node_modules']
            }
        ]
    ]
 }
 ```

#### failFast

<Option type="boolean" default="false">

最初の失敗で実行を中止します。

</Option>

#### name

<Option type="RegExp[]" default="[]">

名前が式にマッチするシナリオのみを実行します（繰り返し指定可能）。

</Option>

#### require

<Option type="string[]" default="[]">

フィーチャーを実行する前に、ステップ定義を含むファイルを require します。ステップ定義に glob を指定することもできます。

</Option>
例:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import

<Option type="String[]" default="[]">

ESM 用の、サポートコードが置かれている場所へのパス。

</Option>
例:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict

<Option type="boolean" default="false">

保留中のステップがある場合に実行を失敗させます。未定義のステップは、[`ignoreUndefinedDefinitions`](#ignoreundefineddefinitions) が `true` でない限り、`strict` なしでも実行を失敗させます。

</Option>

#### tags

<Option type="String" default="">

タグが式にマッチするフィーチャーまたはシナリオのみを実行します。マッチするシナリオがないフィーチャーファイルはスキップとして報告され、ブラウザセッションは開始されません。
詳細については [Cucumber のドキュメント](https://docs.cucumber.io/cucumber/api/#tag-expressions)を参照してください。

</Option>

#### timeout

<Option type="Number" default="60000">

ステップ定義のタイムアウト（ミリ秒）。

</Option>

#### retry

<Option type="Number" default="0">

失敗したテストケースを再試行する回数を指定します。

</Option>

#### retryTagFilter

<Option type="String">

タグがタグ式にマッチするシナリオのみを再試行します。[`retry`](#retry) が必要です。

</Option>

#### language

<Option type="String" default="en">

フィーチャーファイルのデフォルト言語

</Option>

#### order

<Option type="String" default="defined">

シナリオをフィーチャーファイルの順序（`'defined'`）またはランダムな順序（`'random'`）で実行します。`'random:<seed>'`（例えば `'random:42'`）を使用すると、ランダムな順序が毎回の実行で同じになります。`'random'` の場合、ログに実行時のシードが表示されます（`Random order using seed: 42`）。

</Option>

#### format

<Option type="string[]">

使用するフォーマッターの名前と出力ファイルパス。
WebdriverIO は主に、出力をファイルに書き込む[フォーマッター](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md)のみをサポートしています。フォーマッターは [`parallelMode`](#parallelmode-1) では実行されません。

</Option>

#### formatOptions

<Option type="object">

フォーマッターに渡すオプション

</Option>

#### tagsInTitle

<Option type="Boolean" default="false">

フィーチャー名またはシナリオ名に Cucumber タグを追加します

</Option>
***これは @wdio/cucumber-framework 固有のオプションであり、cucumber-js 自体では認識されないことに注意してください***<br/>

#### ignoreUndefinedDefinitions

<Option type="Boolean" default="false">

未定義のステップを、タイトルの末尾に ` (undefined step)` を付けて保留中として報告し、それによって実行を失敗させません。

</Option>
***これは @wdio/cucumber-framework 固有のオプションであり、cucumber-js 自体では認識されないことに注意してください***<br/>

#### failAmbiguousDefinitions

<Option type="Boolean" default="false">

曖昧なステップ（複数のステップ定義にマッチするステップ）を、マッチしたステップ定義の一覧とともに失敗として報告します。`false` の場合、そのステップはスキップとして報告され、一覧がその理由として示されます。どちらの場合も実行は失敗します。例外: `parallelMode` を使用しない場合、`ignoreUndefinedDefinitions: true` かつ `failAmbiguousDefinitions: false` であれば実行は成功します。

</Option>
***これは @wdio/cucumber-framework 固有のオプションであり、cucumber-js 自体では認識されないことに注意してください***<br/>

#### profiles

<Option type="string[]" default="[]">

使用する Cucumber 設定ファイルのプロファイル。

</Option>
***`cucumberOpts` が優先されるため、プロファイル内では特定の値（worldParameters、name、retryTagFilter）のみがサポートされることに注意してください。また、プロファイルを使用する場合は、これらの値が `cucumberOpts` 内で宣言されていないことを確認してください。***

#### file

<Option type="string | false" default="undefined">

読み込む Cucumber 設定ファイルのパス、または何も読み込まない場合は `false`。指定しない場合、Cucumber はデフォルトの設定ファイルを探します。

</Option>

#### dryRun

<Option type="Boolean" default="false">

ステップもフックも実行しません: Cucumber は各ステップをステップ定義とマッチさせるだけなので、未定義のステップや曖昧なステップは引き続き報告されます。実行は失敗しません。

</Option>

#### worldParameters

<Option type="object" default="{}">

World のパラメーター。`this.parameters` として利用できます。

</Option>

#### scenarioLevelReporter

<Option type="Boolean" default="false">

各シナリオを 1 つのテストとして報告します。そのステップとフックは報告されません。

</Option>
***これは @wdio/cucumber-framework 固有のオプションであり、cucumber-js 自体では認識されないことに注意してください***<br/>

#### parallelMode

<Option type="'contexts' | 'userContexts'" default="undefined">

フィーチャーファイル内のシナリオを、それぞれ独自の WebDriver BiDi ブラウジングコンテキストで同時に実行します。`'contexts'` はシナリオ間で Cookie とストレージを共有し、`'userContexts'` はそれらを分離します。`'wdio:experimentalBiDiCommands': true` ケイパビリティが必要です。[スペックファイル内の並列テスト](./ParallelTests.md)を参照してください。

</Option>
***これは @wdio/cucumber-framework 固有のオプションであり、cucumber-js 自体では認識されないことに注意してください***<br/>

#### maxParallelContexts

<Option type="number" default="os.cpus().length">

[`parallelMode`](#parallelmode-1) が設定されている場合に同時に実行されるシナリオの数。[スペックファイル内の並列テスト](./ParallelTests.md#options)を参照してください。

</Option>
***これは @wdio/cucumber-framework 固有のオプションであり、cucumber-js 自体では認識されないことに注意してください***<br/>

### Cucumber でのテストのスキップ

`cucumberOpts` で利用できる通常の Cucumber のテストフィルタリング機能を使ってテストをスキップすると、ケイパビリティで設定されたすべてのブラウザとデバイスに対してスキップされることに注意してください。不要な場合にセッションを開始せずに、特定のケイパビリティの組み合わせに対してのみシナリオをスキップできるように、WebdriverIO は Cucumber 向けに以下の特別なタグ構文を提供しています:

`@skip([condition])`

ここで condition は、ケイパビリティのプロパティとその値の組み合わせ（省略可能）であり、それらが**すべて**マッチした場合に、タグが付けられたシナリオまたはフィーチャーがスキップされます。もちろん、シナリオやフィーチャーに複数のタグを追加して、複数の異なる条件でテストをスキップすることもできます。

また、`tags` を変更せずにテストをスキップするために '@skip' アノテーションを使用することもできます。この場合、スキップされたテストはテストレポートに表示されます。

この構文のいくつかの例を示します:
- `@skip` または `@skip()`: タグが付けられた項目を常にスキップします
- `@skip(browserName="chrome")`: テストは Chrome ブラウザに対して実行されません。
- `@skip(browserName="firefox";platformName="linux")`: Linux 上の Firefox での実行時にテストをスキップします。
- `@skip(browserName=["chrome","firefox"])`: タグが付けられた項目は Chrome と Firefox の両方のブラウザでスキップされます。
- `@skip(browserName=/i.*explorer/)`: 正規表現にマッチするブラウザを持つケイパビリティはスキップされます（`iexplorer`、`internet explorer`、`internet-explorer` など）。

### ステップ定義ヘルパーのインポート

`Given`、`When`、`Then` などのステップ定義ヘルパーやフックを使用するには、次のように `@cucumber/cucumber` からインポートする必要があります:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

ただし、WebdriverIO とは関係のない他の種類のテストですでに特定のバージョンの Cucumber を使用している場合は、E2E テストではこれらのヘルパーを WebdriverIO の Cucumber パッケージからインポートする必要があります。例:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

これにより、WebdriverIO フレームワーク内で正しいヘルパーを使用でき、他の種類のテストでは独立した Cucumber のバージョンを使用できるようになります。

### レポートの公開

Cucumber には、テスト実行レポートを `https://reports.cucumber.io/` に公開する機能があり、`cucumberOpts` で `publish` フラグを設定するか、`CUCUMBER_PUBLISH_TOKEN` 環境変数を設定することで制御できます。しかし、テストの実行に `WebdriverIO` を使用する場合、この方法には制限があります。フィーチャーファイルごとに個別にレポートが更新されるため、統合されたレポートを表示するのが困難になります。

この制限を克服するために、`@wdio/cucumber-framework` 内に `publishCucumberReport` という Promise ベースのメソッドを導入しました。このメソッドは、呼び出しに最適な場所である `onComplete` フックで呼び出す必要があります。`publishCucumberReport` には、Cucumber のメッセージレポートが保存されているレポートディレクトリを入力として渡す必要があります。

`cucumberOpts` の `format` オプションを設定することで、`cucumber message` レポートを生成できます。レポートの上書きを防ぎ、各テスト実行が正確に記録されるように、`cucumber message` フォーマットオプションには動的なファイル名を指定することを強くお勧めします。

この関数を使用する前に、以下の環境変数を必ず設定してください:
- CUCUMBER_PUBLISH_REPORT_URL: Cucumber レポートを公開する URL。指定しない場合は、デフォルトの URL 'https://messages.cucumber.io/api/reports' が使用されます。
- CUCUMBER_PUBLISH_REPORT_TOKEN: レポートの公開に必要な認証トークン。このトークンが設定されていない場合、関数はレポートを公開せずに終了します。

実装に必要な設定とコードサンプルの例を以下に示します:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... その他の設定オプション
    cucumberOpts: {
        // ... Cucumber オプションの設定
        format: [
            ['message', `./reports/${uuidv4()}.ndjson`],
            ['json', './reports/test-report.json']
        ]
    },
    async onComplete() {
        await publishCucumberReport('./reports');
    }
}
```

`./reports/` は `cucumber message` レポートが保存されるディレクトリであることに注意してください。

## Serenity/JS の使用 {#using-serenityjs}

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) は、複雑なソフトウェアシステムの受け入れテストと回帰テストを、より速く、よりコラボレーティブに、そしてより簡単にスケールできるように設計されたオープンソースフレームワークです。

WebdriverIO のテストスイート向けに、Serenity/JS は以下を提供します:
- [強化されたレポート](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Serenity/JS を
  WebdriverIO の組み込みフレームワークのドロップイン代替として使用し、詳細なテスト実行レポートとプロジェクトのリビングドキュメントを生成できます。
- [Screenplay Pattern API](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - テストコードをプロジェクトやチーム間で移植・再利用できるように、
  Serenity/JS はネイティブの WebdriverIO API の上にオプションの[抽象化レイヤー](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io)を提供します。
- [統合ライブラリ](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Screenplay Pattern に従うテストスイート向けに、
  Serenity/JS は [API テスト](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io)の作成、
  [ローカルサーバーの管理](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io)、[アサーションの実行](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)などに役立つオプションの統合ライブラリも提供しています！

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### Serenity/JS のインストール

[既存の WebdriverIO プロジェクト](https://webdriver.io/docs/gettingstarted)に Serenity/JS を追加するには、NPM から以下の Serenity/JS モジュールをインストールします:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Serenity/JS モジュールの詳細:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Serenity/JS の設定 {#configuring-serenityjs}

Serenity/JS との統合を有効にするには、WebdriverIO を次のように設定します:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // WebdriverIO に Serenity/JS フレームワークを使用するよう指示します
    framework: '@serenity-js/webdriverio',

    // Serenity/JS の設定
    serenity: {
        // テストランナーに適したアダプターを使用するよう Serenity/JS を設定します
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Serenity/JS のレポートサービス、いわゆる「ステージクルー」を登録します
        crew: [
            // オプション: テスト実行結果を標準出力に出力します
            '@serenity-js/console-reporter',

            // オプション: Serenity BDD レポートとリビングドキュメント (HTML) を生成します
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // オプション: 操作の失敗時に自動的にスクリーンショットを撮影します
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Cucumber ランナーを設定します
    cucumberOpts: {
        // 以下の Cucumber 設定オプションを参照してください
    },

    // ... または Jasmine ランナー
    jasmineOpts: {
        // 以下の Jasmine 設定オプションを参照してください
    },

    // ... または Mocha ランナー
    mochaOpts: {
        // 以下の Mocha 設定オプションを参照してください
    },

    runner: 'local',

    // その他の WebdriverIO の設定
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // WebdriverIO に Serenity/JS フレームワークを使用するよう指示します
    framework: '@serenity-js/webdriverio',

    // Serenity/JS の設定
    serenity: {
        // テストランナーに適したアダプターを使用するよう Serenity/JS を設定します
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Serenity/JS のレポートサービス、いわゆる「ステージクルー」を登録します
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Cucumber ランナーを設定します
    cucumberOpts: {
        // 以下の Cucumber 設定オプションを参照してください
    },

    // ... または Jasmine ランナー
    jasmineOpts: {
        // 以下の Jasmine 設定オプションを参照してください
    },

    // ... または Mocha ランナー
    mochaOpts: {
        // 以下の Mocha 設定オプションを参照してください
    },

    runner: 'local',

    // その他の WebdriverIO の設定
};
```

</TabItem>
</Tabs>

詳細はこちら:
- [Serenity/JS Cucumber 設定オプション](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Jasmine 設定オプション](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Mocha 設定オプション](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [WebdriverIO 設定ファイル](configurationfile)

### Serenity BDD レポートとリビングドキュメントの生成

[Serenity BDD レポートとリビングドキュメント](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports)は [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli) によって生成されます。
これは [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io) モジュールによってダウンロード・管理される Java プログラムです。

Serenity BDD レポートを生成するには、テストスイートで以下を行う必要があります:
- `serenity-bdd update` を呼び出して Serenity BDD CLI をダウンロードし、CLI の `jar` をローカルにキャッシュする
- [設定手順](#configuring-serenityjs)に従って [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) を登録し、中間の Serenity BDD `.json` レポートを生成する
- レポートを生成したいときに `serenity-bdd run` を呼び出して Serenity BDD CLI を実行する

すべての [Serenity/JS プロジェクトテンプレート](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio)で使用されているパターンは、
以下を利用しています:
- Serenity BDD CLI をダウンロードするための [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) NPM スクリプト
- テストスイート自体が失敗した場合でもレポート処理を実行するための [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe)（テストレポートが最も必要になるのはまさにそのときです...）
- 前回の実行で残ったテストレポートを削除する便利な手段としての [`rimraf`](https://www.npmjs.com/package/rimraf)

```json title="package.json"
{
  "scripts": {
    "postinstall": "serenity-bdd update",
    "clean": "rimraf target",
    "test": "failsafe clean test:execute test:report",
    "test:execute": "wdio wdio.conf.ts",
    "test:report": "serenity-bdd run"
  }
}
```

`SerenityBDDReporter` の詳細については、以下を参照してください:
- [`@serenity-js/serenity-bdd` ドキュメント](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)のインストール手順
- [`SerenityBDDReporter` API ドキュメント](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io)の設定例
- [GitHub 上の Serenity/JS のサンプル](https://github.com/serenity-js/serenity-js/tree/main/examples)

### Serenity/JS Screenplay Pattern API の使用

[Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) は、高品質な自動受け入れテストを書くための革新的でユーザー中心のアプローチです。抽象化レイヤーを効果的に使用するよう導き、
テストシナリオがドメインのビジネス用語を捉えられるようにし、チームに優れたテストとソフトウェアエンジニアリングの習慣を促します。

デフォルトでは、`@serenity-js/webdriverio` を WebdriverIO の `framework` として登録すると、
Serenity/JS は [actor](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io) のデフォルトの [cast](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) を設定し、
すべての actor は以下を行うことができます:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

これだけで、既存のテストスイートであっても、Screenplay Pattern に従うテストシナリオの導入を始めるのに十分なはずです。例:

```typescript title="specs/example.spec.ts"
import { actorCalled } from '@serenity-js/core'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, equals } from '@serenity-js/assertions'

describe('My awesome website', () => {
    it('can have test scenarios that follow the Screenplay Pattern', async () => {
        await actorCalled('Alice').attemptsTo(
            Navigate.to(`https://webdriver.io`),
            Ensure.that(
                Page.current().title(),
                equals(`WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO`)
            ),
        )
    })

    it('can have non-Screenplay scenarios too', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser)
            .toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Screenplay Pattern の詳細については、以下をご覧ください:
- [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS による Web テスト](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)