---
id: frameworks
title: フレームワーク
---

WebdriverIO Runnerには、[Mocha](http://mochajs.org/)、[Jasmine](http://jasmine.github.io/)、および[Cucumber.js](https://cucumber.io/)の組み込みサポートがあります。また、[Serenity/JS](#using-serenityjs)などのサードパーティのオープンソースフレームワークと統合することもできます。

:::tip WebdriverIOとテストフレームワークの統合
WebdriverIOをテストフレームワークと統合するには、NPMで利用可能なアダプターパッケージが必要です。
アダプターパッケージはWebdriverIOがインストールされているのと同じ場所にインストールする必要があることに注意してください。
したがって、WebdriverIOをグローバルにインストールした場合は、アダプターパッケージもグローバルにインストールするようにしてください。
:::

WebdriverIOをテストフレームワークと統合すると、スペックファイルまたはステップ定義でグローバル`browser`変数を使用してWebDriverインスタンスにアクセスできます。
WebdriverIOはSeleniumセッションのインスタンス化と終了も処理するため、自分で行う必要がないことに注意してください。

## Mochaの使用

まず、NPMからアダプターパッケージをインストールします：

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

デフォルトでは、WebdriverIOは組み込みの[アサーションライブラリ](assertion)を提供しており、すぐに使い始めることができます：

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIOはMochaの`BDD`（デフォルト）、`TDD`、および`QUnit`[インターフェース](https://mochajs.org/#interfaces)をサポートしています。

TDDスタイルでスペックを書きたい場合は、`mochaOpts`設定の`ui`プロパティを`tdd`に設定します。これで、テストファイルは次のように書く必要があります：

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

他のMocha固有の設定を定義したい場合は、設定ファイルの`mochaOpts`キーを使って行うことができます。すべてのオプションのリストは[Mochaプロジェクトのウェブサイト](https://mochajs.org/api/mocha)にあります。

__注意:__ WebdriverIOはMochaでの非推奨の`done`コールバックの使用をサポートしていません：

```js
it('should test something', (done) => {
    done() // "done is not a function"エラーがスローされます
})
```

### Mochaオプション

次のオプションは`wdio.conf.js`で適用して、Mocha環境を設定できます。__注意:__ すべてのオプションがサポートされているわけではありません。例えば、`parallel`オプションを適用するとエラーが発生します。WDIOテストランナーはテストを並行して実行するための独自の方法を持っているためです。これらのフレームワークオプションを引数として渡すことができます：

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

これにより、以下のMochaオプションが渡されます：

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

次のMochaオプションがサポートされています：

#### require
`require`オプションは、基本的な機能を追加または拡張したい場合に役立ちます（WebdriverIOフレームワークオプション）。

型: `string|string[]`<br />
デフォルト: `[]`

#### compilers
ファイルをコンパイルするために指定されたモジュールを使用します。コンパイラはrequireの前に含まれます（WebdriverIOフレームワークオプション）。

型: `string[]`<br />
デフォルト: `[]`

#### allowUncaught
キャッチされない例外を伝播します。

型: `boolean`<br />
デフォルト: `false`

#### bail
最初のテスト失敗後に実行を中止します。

型: `boolean`<br />
デフォルト: `false`

#### checkLeaks
グローバル変数のリークをチェックします。

型: `boolean`<br />
デフォルト: `false`

#### delay
ルートスイートの実行を遅延させます。

型: `boolean`<br />
デフォルト: `false`

#### fgrep
指定された文字列でテストをフィルタリングします。

型: `string`<br />
デフォルト: `null`

#### forbidOnly
`only`としてマークされたテストでスイートが失敗します。

型: `boolean`<br />
デフォルト: `false`

#### forbidPending
保留中のテストでスイートが失敗します。

型: `boolean`<br />
デフォルト: `false`

#### fullTrace
失敗時の完全なスタックトレース。

型: `boolean`<br />
デフォルト: `false`

#### global
グローバルスコープで予想される変数。

型: `string[]`<br />
デフォルト: `[]`

#### grep
指定された正規表現でテストをフィルタリングします。

型: `RegExp|string`<br />
デフォルト: `null`

#### invert
テストフィルタの一致を反転させます。

型: `boolean`<br />
デフォルト: `false`

#### retries
失敗したテストを再試行する回数。

型: `number`<br />
デフォルト: `0`

#### timeout
タイムアウトのしきい値（ミリ秒）。

型: `number`<br />
デフォルト: `30000`

## Jasmineの使用

まず、NPMからアダプターパッケージをインストールします：

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

設定に`jasmineOpts`プロパティを設定することで、Jasmine環境を設定できます。すべてのオプションのリストは[Jasmineプロジェクトのウェブサイト](https://jasmine.github.io/api/3.5/Configuration.html)にあります。

### Jasmineオプション

次のオプションは`wdio.conf.js`の`jasmineOpts`プロパティを使用して、Jasmine環境を設定するために適用できます。これらの設定オプションの詳細については、[Jasmineドキュメント](https://jasmine.github.io/api/edge/Configuration)をご覧ください。これらのフレームワークオプションを引数として渡すことができます：

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

これにより、以下のMochaオプションが渡されます：

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

次のJasmineオプションがサポートされています：

#### defaultTimeoutInterval
Jasmineの操作のデフォルトタイムアウト間隔。

型: `number`<br />
デフォルト: `60000`

#### helpers
Jasmineスペックの前に含めるspec_dirに関連するファイルパス（およびグロブ）の配列。

型: `string[]`<br />
デフォルト: `[]`

#### requires
`requires`オプションは、基本的な機能を追加または拡張したい場合に役立ちます。

型: `string[]`<br />
デフォルト: `[]`

#### random
スペック実行順序をランダム化するかどうか。

型: `boolean`<br />
デフォルト: `true`

#### seed
ランダム化の基礎として使用するシード。nullの場合、実行開始時にシードがランダムに決定されます。

型: `Function`<br />
デフォルト: `null`

#### failSpecWithNoExpectations
期待値を実行しなかった場合にスペックを失敗させるかどうか。デフォルトでは、期待値を実行しなかったスペックは合格として報告されます。これをtrueに設定すると、そのようなスペックは失敗として報告されます。

型: `boolean`<br />
デフォルト: `false`

#### oneFailurePerSpec
スペックが1つの期待値の失敗のみを持つようにするかどうか。

型: `boolean`<br />
デフォルト: `false`

#### specFilter
スペックをフィルタリングするための関数。

型: `Function`<br />
デフォルト: `(spec) => true`

#### grep
この文字列または正規表現に一致するテストのみを実行します。（カスタム`specFilter`関数が設定されていない場合のみ適用）

型: `string|Regexp`<br />
デフォルト: `null`

#### invertGrep
trueの場合、一致するテストを反転させ、`grep`で使用された表現と一致しないテストのみを実行します。（カスタム`specFilter`関数が設定されていない場合のみ適用）

型: `boolean`<br />
デフォルト: `false`

## Cucumberの使用

まず、NPMからアダプターパッケージをインストールします：

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Cucumberを使用したい場合は、[設定ファイル](configurationfile)に`framework: 'cucumber'`を追加して、`framework`プロパティを`cucumber`に設定します。

Cucumberのオプションは、`cucumberOpts`を使って設定ファイルで指定できます。オプションの完全なリストは[こちら](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options)でご確認ください。

Cucumberをすぐに使い始めるには、必要なすべてのステップ定義が付属している[`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate)プロジェクトをご覧ください。これにより、すぐに機能ファイルを書き始めることができます。

### Cucumberオプション

次のオプションは`wdio.conf.js`の`cucumberOpts`プロパティを使用して、Cucumber環境を設定するために適用できます：

:::tip コマンドラインを通じてオプションを調整する
テストをフィルタリングするためのカスタム`tags`などの`cucumberOpts`は、コマンドラインを通じて指定できます。これは`cucumberOpts.{オプション名}="値"`の形式を使用して実現されます。

例えば、`@smoke`というタグが付いたテストのみを実行したい場合は、次のコマンドを使用できます：

```sh
# "@smoke"タグを持つテストのみを実行したい場合
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

このコマンドは、`cucumberOpts`の`tags`オプションを`@smoke`に設定し、このタグを持つテストのみが実行されるようにします。

:::

#### backtrace
エラーの完全なバックトレースを表示します。

型: `Boolean`<br />
デフォルト: `true`

#### requireModule
サポートファイルを要求する前に、モジュールを要求します。

型: `string[]`<br />
デフォルト: `[]`<br />
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
最初の失敗でランを中止します。

型: `boolean`<br />
デフォルト: `false`

#### name
表現に一致する名前を持つシナリオのみを実行します（繰り返し可能）。

型: `RegExp[]`<br />
デフォルト: `[]`

#### require
機能を実行する前に、ステップ定義を含むファイルを要求します。ステップ定義へのグロブも指定できます。

型: `string[]`<br />
デフォルト: `[]`
例:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
ESMのためのサポートコードがある場所へのパス。

型: `String[]`<br />
デフォルト: `[]`
例:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
未定義または保留中のステップがある場合は失敗します。

型: `boolean`<br />
デフォルト: `false`

#### tags
表現に一致するタグを持つ機能またはシナリオのみを実行します。
詳細については、[Cucumberドキュメント](https://docs.cucumber.io/cucumber/api/#tag-expressions)をご覧ください。

型: `String`<br />
デフォルト: ``

#### timeout
ステップ定義のタイムアウト（ミリ秒）。

型: `Number`<br />
デフォルト: `30000`

#### retry
失敗したテストケースを再試行する回数を指定します。

型: `Number`<br />
デフォルト: `0`

#### retryTagFilter
表現に一致するタグを持つ機能またはシナリオのみを再試行します（繰り返し可能）。このオプションには'--retry'の指定が必要です。

型: `RegExp`

#### language
機能ファイルのデフォルト言語

型: `String`<br />
デフォルト: `en`

#### order
定義された順序/ランダムな順序でテストを実行します

型: `String`<br />
デフォルト: `defined`

#### format
使用するフォーマッタの名前と出力ファイルパス。
WebdriverIOは主に、ファイルに出力を書き込む[フォーマッタ](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md)のみをサポートしています。

型: `string[]`<br />

#### formatOptions
フォーマッタに提供されるオプション

型: `object`<br />

#### tagsInTitle
フィーチャーまたはシナリオ名にCucumberタグを追加します

型: `Boolean`<br />
デフォルト: `false`

***これは@wdio/cucumber-frameworkに固有のオプションであり、cucumber-js自体では認識されないことに注意してください***<br/>

#### ignoreUndefinedDefinitions
未定義の定義を警告として扱います。

型: `Boolean`<br />
デフォルト: `false`

***これは@wdio/cucumber-frameworkに固有のオプションであり、cucumber-js自体では認識されないことに注意してください***<br/>

#### failAmbiguousDefinitions
曖昧な定義をエラーとして扱います。

型: `Boolean`<br />
デフォルト: `false`

***これは@wdio/cucumber-frameworkに固有のオプションであり、cucumber-js自体では認識されないことに注意してください***<br/>

#### tagExpression
表現に一致するタグを持つ機能またはシナリオのみを実行します。
詳細については、[Cucumberドキュメント](https://docs.cucumber.io/cucumber/api/#tag-expressions)をご覧ください。

型: `String`<br />
デフォルト: ``

***このオプションは将来的に非推奨になる予定です。代わりに[`tags`](#tags)設定プロパティを使用してください***

#### profile
使用するプロファイルを指定します。

型: `string[]`<br />
デフォルト: `[]`

***プロファイル内では特定の値（worldParameters、name、retryTagFilter）のみがサポートされており、`cucumberOpts`が優先されることに注意してください。また、プロファイルを使用する場合は、上記の値が`cucumberOpts`内で宣言されていないことを確認してください。***

### Cucumberでのテストのスキップ

`cucumberOpts`で利用可能な通常のCucumberテストフィルタリング機能を使用してテストをスキップしたい場合、設定されているすべてのブラウザとデバイスに対してそれを行うことになります。必要がない場合にセッションを開始せずに、特定の機能の組み合わせに対してのみシナリオをスキップできるようにするために、webdriverioはCucumber用に次の特定のタグ構文を提供しています：

`@skip([condition])`

ここで条件は、**すべて**一致した場合にタグ付けされたシナリオまたは機能をスキップさせる機能プロパティとその値のオプションの組み合わせです。もちろん、さまざまな条件下でテストをスキップするために、シナリオや機能に複数のタグを追加することもできます。

また、`tagExpression`を変更せずにテストをスキップするために`@skip`アノテーションを使用することもできます。この場合、スキップされたテストはテストレポートに表示されます。

この構文の例をいくつか示します：
- `@skip`または`@skip()`：タグ付けされた項目を常にスキップします
- `@skip(browserName="chrome")`：テストはChromeブラウザに対して実行されません。
- `@skip(browserName="firefox";platformName="linux")`：Linux上のFirefoxでの実行ではテストをスキップします。
- `@skip(browserName=["chrome","firefox"])`：タグ付けされた項目はChromeとFirefoxの両方のブラウザでスキップされます。
- `@skip(browserName=/i.*explorer/)`：正規表現に一致するブラウザ（`iexplorer`、`internet explorer`、`internet-explorer`など）を持つ機能はスキップされます。

### ステップ定義ヘルパーのインポート

`Given`、`When`、`Then`などのステップ定義ヘルパーやフックを使用するには、それらを`@cucumber/cucumber`からインポートする必要があります。例えば：

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

WebdriverIOに関連しない他のタイプのテストにすでに特定のバージョンのCucumberを使用している場合は、e2eテストでこれらのヘルパーをWebdriverIO Cucumberパッケージからインポートする必要があります：

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

これにより、WebdriverIOフレームワーク内で適切なヘルパーを使用し、他のタイプのテスト用に独立したCucumberバージョンを使用できるようになります。

### レポートの公開

Cucumberは、テスト実行レポートを`https://reports.cucumber.io/`に公開する機能を提供しています。これは`cucumberOpts`の`publish`フラグを設定するか、`CUCUMBER_PUBLISH_TOKEN`環境変数を設定することで制御できます。ただし、テスト実行に`WebdriverIO`を使用する場合、このアプローチには制限があります。各機能ファイルに対して個別にレポートが更新されるため、統合されたレポートを見ることが難しくなります。

この制限を克服するために、`@wdio/cucumber-framework`内に`publishCucumberReport`というプロミスベースのメソッドが導入されました。このメソッドは`onComplete`フックで呼び出すべきであり、これが最適な場所です。`publishCucumberReport`はCucumberメッセージレポートが保存されているレポートディレクトリの入力が必要です。

`cucumberOpts`の`format`オプションを設定することで、`cucumber message`レポートを生成できます。レポートの上書きを防ぎ、各テスト実行が正確に記録されるようにするために、`cucumber message`形式オプション内で動的ファイル名を提供することを強くお勧めします。

この関数を使用する前に、次の環境変数を設定していることを確認してください：
- CUCUMBER_PUBLISH_REPORT_URL：Cucumberレポートを公開したいURL。提供されない場合、デフォルトのURL「https://messages.cucumber.io/api/reports」が使用されます。
- CUCUMBER_PUBLISH_REPORT_TOKEN：レポートを公開するために必要な認証トークン。このトークンが設定されていない場合、関数はレポートを公開せずに終了します。

実装に必要な設定とコードサンプルの例を以下に示します：

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... その他の設定オプション
    cucumberOpts: {
        // ... Cucumberオプションの設定
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

なお、`./reports/`は`cucumber message`レポートが保存されるディレクトリです。

## Serenity/JSの使用

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)は、複雑なソフトウェアシステムの受け入れテストと回帰テストをより速く、より協力的に、そしてより簡単にスケールするように設計されたオープンソースフレームワークです。

WebdriverIOテストスイートに対して、Serenity/JSは以下を提供します：
- [拡張レポート](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Serenity/JSを任意の組み込みWebdriverIOフレームワークの代わりに使用して、詳細なテスト実行レポートとプロジェクトの生きたドキュメントを作成できます。
- [スクリーンプレイパターンAPI](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - テストコードをポータブルで再利用可能にするために、Serenity/JSはネイティブWebdriverIO APIの上にオプションの[抽象化レイヤー](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io)を提供します。
- [統合ライブラリ](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - スクリーンプレイパターンに従うテストスイートに対して、Serenity/JSは[APIテスト](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io)の作成、[ローカルサーバーの管理](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io)、[アサーションの実行](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)などを支援するオプションの統合ライブラリも提供します！

![Serenity BDD レポート例](/img/serenity-bdd-reporter.png)

### Serenity/JSのインストール

Serenity/JSを[既存のWebdriverIOプロジェクト](https://webdriver.io/docs/gettingstarted)に追加するには、NPMから以下のSerenity/JSモジュールをインストールします：

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Serenity/JSモジュールの詳細：
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Serenity/JSの設定

Serenity/JSとの統合を有効にするには、WebdriverIOを以下のように設定します：

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // WebdriverIOにSerenity/JSフレームワークを使用するよう指示
    framework: '@serenity-js/webdriverio',

    // Serenity/JS設定
    serenity: {
        // Serenity/JSに適切なテストランナーアダプターを使用するよう設定
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Serenity/JSレポーティングサービス（「ステージクルー」とも呼ばれる）を登録
        crew: [
            // オプション、テスト実行結果を標準出力に印刷
            '@serenity-js/console-reporter',

            // オプション、Serenity BDDレポートとリビングドキュメント（HTML）を生成
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // オプション、インタラクション失敗時に自動的にスクリーンショットを撮影
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Cucumberランナーの設定
    cucumberOpts: {
        // 以下のCucumber設定オプションを参照
    },


    // ... またはJasmineランナー
    jasmineOpts: {
        // 以下のJasmine設定オプションを参照
    },

    // ... またはMochaランナー
    mochaOpts: {
        // 以下のMocha設定オプションを参照
    },

    runner: 'local',

    // その他のWebdriverIO設定
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // WebdriverIOにSerenity/JSフレームワークを使用するよう指示
    framework: '@serenity-js/webdriverio',

    // Serenity/JS設定
    serenity: {
        // Serenity/JSに適切なテストランナーアダプターを使用するよう設定
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Serenity/JSレポーティングサービス（「ステージクルー」とも呼ばれる）を登録
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Cucumberランナーの設定
    cucumberOpts: {
        // 以下のCucumber設定オプションを参照
    },


    // ... またはJasmineランナー
    jasmineOpts: {
        // 以下のJasmine設定オプションを参照
    },

    // ... またはMochaランナー
    mochaOpts: {
        // 以下のMocha設定オプションを参照
    },

    runner: 'local',

    // その他のWebdriverIO設定
};
```

</TabItem>
</Tabs>

詳細はこちら：
- [Serenity/JS Cucumber設定オプション](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Jasmine設定オプション](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Mocha設定オプション](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [WebdriverIO設定ファイル](configurationfile)

### Serenity BDDレポートとリビングドキュメントの生成

[Serenity BDDレポートとリビングドキュメント](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports)は、[`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)モジュールによってダウンロードおよび管理される[Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli)（Javaプログラム）によって生成されます。

Serenity BDDレポートを生成するには、テストスイートは以下を行う必要があります：
- CLIのjarをローカルにキャッシュする`serenity-bdd update`を呼び出して、Serenity BDD CLIをダウンロードする
- [設定手順](#configuring-serenityjs)に従って[`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io)を登録することで、中間的なSerenity BDD `.json`レポートを生成する
- `serenity-bdd run`を呼び出してレポートを生成したい時にSerenity BDD CLIを呼び出す

すべての[Serenity/JSプロジェクトテンプレート](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio)で使用されるパターンは、以下の使用に依存しています：
- Serenity BDD CLIをダウンロードするための[`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) NPMスクリプト
- テストスイート自体が失敗した場合でもレポーティングプロセスを実行するための[`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe)（これは、テストレポートが最も必要な正確な時です...）。
- 前回の実行から残っているテストレポートを削除するための便利な方法として[`rimraf`](https://www.npmjs.com/package/rimraf)

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

`SerenityBDDReporter`の詳細については、以下を参照してください：
- [`@serenity-js/serenity-bdd`ドキュメント](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)のインストール手順
- [`SerenityBDDReporter` APIドキュメント](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io)の設定例
- [GitHub上のSerenity/JSの例](https://github.com/serenity-js/serenity-js/tree/main/examples)

### Serenity/JSスクリーンプレイパターンAPIの使用

[スクリーンプレイパターン](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)は、高品質な自動受け入れテストを書くための革新的なユーザー中心のアプローチです。これは抽象化の効果的な使用に向けてガイドし、テストシナリオがドメインのビジネス用語を捉えるのを助け、チームの良いテストとソフトウェアエンジニアリングの習慣を促進します。

デフォルトでは、WebdriverIOの`framework`として`@serenity-js/webdriverio`を登録すると、Serenity/JSはデフォルトの[cast](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io)の[アクター](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io)を設定します。すべてのアクターは以下のことができます：
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

これは、既存のテストスイートにもスクリーンプレイパターンに従うテストシナリオを導入するのに役立ちます。例えば：

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

スクリーンプレイパターンの詳細については、以下を確認してください：
- [スクリーンプレイパターン](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JSによるWebテスト](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)