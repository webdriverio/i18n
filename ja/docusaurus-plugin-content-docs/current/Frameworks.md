---
id: frameworks
title: フレームワーク
---

WebdriverIO Runnerには、[Mocha](http://mochajs.org/)、[Jasmine](http://jasmine.github.io/)、[Cucumber.js](https://cucumber.io/)の組み込みサポートがあります。また、[Serenity/JS](#using-serenityjs)などのサードパーティのオープンソースフレームワークと統合することもできます。

:::tip WebdriverIOとテストフレームワークの統合
WebdriverIOをテストフレームワークと統合するには、NPMで利用可能なアダプタパッケージが必要です。
アダプタパッケージはWebdriverIOがインストールされている場所と同じ場所にインストールする必要があることに注意してください。
つまり、WebdriverIOをグローバルにインストールした場合は、アダプタパッケージもグローバルにインストールしてください。
:::

WebdriverIOとテストフレームワークを統合すると、スペックファイルやステップ定義でグローバル変数`browser`を使用してWebDriverインスタンスにアクセスできるようになります。
WebdriverIOはSeleniumセッションのインスタンス化と終了も処理するため、自分でこれを行う必要はありません。

## Mochaの使用

まず、NPMからアダプタパッケージをインストールします：

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

デフォルトでWebdriverIOは組み込みの[アサーションライブラリ](assertion)を提供しており、すぐに使用を開始できます：

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIOはMochaの`BDD`（デフォルト）、`TDD`、`QUnit`[インターフェース](https://mochajs.org/#interfaces)をサポートしています。

TDDスタイルでスペックを書きたい場合は、設定ファイルの`mochaOpts`プロパティで`ui`を`tdd`に設定します。これにより、テストファイルは次のように書くことができます：

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

他のMocha固有の設定を定義したい場合は、設定ファイルの`mochaOpts`キーを使用して設定できます。すべてのオプションのリストは[Mochaプロジェクトのウェブサイト](https://mochajs.org/api/mocha)で確認できます。

__注意：__ WebdriverIOはMochaでの廃止された`done`コールバックの使用をサポートしていません：

```js
it('should test something', (done) => {
    done() // "done is not a function"というエラーが発生します
})
```

### Mochaオプション

次のオプションは`wdio.conf.js`で適用して、Mocha環境を設定できます。__注意：__ すべてのオプションがサポートされているわけではありません。例えば、`parallel`オプションを適用するとエラーが発生します。これはWDIOテストランナーにはテストを並行実行する独自の方法があるためです。これらのフレームワークオプションは引数として渡すことができます。例：

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

以下のMochaオプションがサポートされています：

#### require
`require`オプションは、基本的な機能を追加または拡張したい場合に便利です（WebdriverIOフレームワークオプション）。

型: `string|string[]`<br />
デフォルト: `[]`

#### compilers
ファイルをコンパイルするために指定されたモジュールを使用します。コンパイラはrequiresの前に含まれます（WebdriverIOフレームワークオプション）。

型: `string[]`<br />
デフォルト: `[]`

#### allowUncaught
キャッチされないエラーを伝播します。

型: `boolean`<br />
デフォルト: `false`

#### bail
最初のテスト失敗後に終了します。

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
`only`とマークされたテストがスイートを失敗させます。

型: `boolean`<br />
デフォルト: `false`

#### forbidPending
保留中のテストがスイートを失敗させます。

型: `boolean`<br />
デフォルト: `false`

#### fullTrace
失敗時に完全なスタックトレースを表示します。

型: `boolean`<br />
デフォルト: `false`

#### global
グローバルスコープで期待される変数です。

型: `string[]`<br />
デフォルト: `[]`

#### grep
指定された正規表現でテストをフィルタリングします。

型: `RegExp|string`<br />
デフォルト: `null`

#### invert
テストフィルタの一致を反転します。

型: `boolean`<br />
デフォルト: `false`

#### retries
失敗したテストを再試行する回数です。

型: `number`<br />
デフォルト: `0`

#### timeout
タイムアウトのしきい値（ミリ秒単位）です。

型: `number`<br />
デフォルト: `30000`

## Jasmineの使用

まず、NPMからアダプタパッケージをインストールします：

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

設定ファイルで`jasmineOpts`プロパティを設定することで、Jasmine環境を設定できます。すべてのオプションのリストは[Jasmineプロジェクトのウェブサイト](https://jasmine.github.io/api/3.5/Configuration.html)で確認できます。

### Jasmineオプション

次のオプションは`wdio.conf.js`の`jasmineOpts`プロパティを使用してJasmine環境を設定するために適用できます。これらの設定オプションの詳細については、[Jasmineドキュメント](https://jasmine.github.io/api/edge/Configuration)を参照してください。これらのフレームワークオプションは引数として渡すことができます。例：

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

以下のJasmineオプションがサポートされています：

#### defaultTimeoutInterval
Jasmine操作のデフォルトタイムアウト間隔です。

型: `number`<br />
デフォルト: `60000`

#### helpers
Jasmineスペックの前に含めるspec_dirに関連するファイルパス（およびグロブ）の配列です。

型: `string[]`<br />
デフォルト: `[]`

#### requires
`requires`オプションは、基本的な機能を追加または拡張したい場合に便利です。

型: `string[]`<br />
デフォルト: `[]`

#### random
スペック実行順序をランダム化するかどうかです。

型: `boolean`<br />
デフォルト: `true`

#### seed
ランダム化の基礎として使用するシードです。nullの場合、実行開始時にランダムにシードが決定されます。

型: `Function`<br />
デフォルト: `null`

#### failSpecWithNoExpectations
expectationを実行しなかったスペックを失敗させるかどうかです。デフォルトではexpectationを実行しなかったスペックは合格として報告されます。これをtrueに設定すると、そのようなスペックは失敗として報告されます。

型: `boolean`<br />
デフォルト: `false`

#### oneFailurePerSpec
スペックが1つのexpectation失敗のみを持つようにするかどうかです。

型: `boolean`<br />
デフォルト: `false`

#### specFilter
スペックをフィルタリングするために使用する関数です。

型: `Function`<br />
デフォルト: `(spec) => true`

#### grep
この文字列または正規表現に一致するテストのみを実行します。（カスタム`specFilter`関数が設定されていない場合にのみ適用されます）

型: `string|Regexp`<br />
デフォルト: `null`

#### invertGrep
trueの場合、一致するテストを反転し、`grep`で使用された式と一致しないテストのみを実行します。（カスタム`specFilter`関数が設定されていない場合にのみ適用されます）

型: `boolean`<br />
デフォルト: `false`

## Cucumberの使用

まず、NPMからアダプタパッケージをインストールします：

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Cucumberを使用したい場合は、[設定ファイル](configurationfile)に`framework: 'cucumber'`を追加して、`framework`プロパティを`cucumber`に設定します。

Cucumberのオプションは、設定ファイルの`cucumberOpts`で指定できます。オプションの完全なリストは[こちら](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options)で確認できます。

Cucumberをすぐに使い始めるには、必要なすべてのステップ定義が含まれている[`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate)プロジェクトを参照してください。これにより、すぐにフィーチャーファイルを作成できるようになります。

### Cucumberオプション

次のオプションは`wdio.conf.js`の`cucumberOpts`プロパティを使用してCucumber環境を設定するために適用できます：

:::tip コマンドラインによるオプションの調整
`cucumberOpts`（テストをフィルタリングするためのカスタム`tags`など）は、コマンドラインを通じて指定できます。これは`cucumberOpts.{optionName}="value"`形式を使用して行われます。

例えば、`@smoke`タグが付いているテストのみを実行したい場合は、次のコマンドを使用できます：

```sh
# "@smoke"タグが付いているテストのみを実行したい場合
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

このコマンドは`cucumberOpts`の`tags`オプションを`@smoke`に設定し、このタグが付いているテストのみが実行されるようにします。

:::

#### backtrace
エラーの完全なバックトレースを表示します。

型: `Boolean`<br />
デフォルト: `true`

#### requireModule
サポートファイルを要求する前にモジュールを要求します。

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
最初の失敗時に実行を中止します。

型: `boolean`<br />
デフォルト: `false`

#### name
式に一致する名前を持つシナリオのみを実行します（繰り返し可能）。

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
ESMのためのサポートコードがある場所へのパスです。

型: `String[]`<br />
デフォルト: `[]`
例:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
未定義または保留中のステップがある場合に失敗します。

型: `boolean`<br />
デフォルト: `false`

#### tags
式に一致するタグを持つ機能またはシナリオのみを実行します。
詳細については[Cucumberドキュメント](https://docs.cucumber.io/cucumber/api/#tag-expressions)を参照してください。

型: `String`<br />
デフォルト: ``

#### timeout
ステップ定義のタイムアウトをミリ秒単位で指定します。

型: `Number`<br />
デフォルト: `30000`

#### retry
失敗したテストケースを再試行する回数を指定します。

型: `Number`<br />
デフォルト: `0`

#### retryTagFilter
式に一致するタグを持つ機能またはシナリオのみを再試行します（繰り返し可能）。このオプションは'--retry'の指定が必要です。

型: `RegExp`

#### language
フィーチャーファイルのデフォルト言語です。

型: `String`<br />
デフォルト: `en`

#### order
テストを定義された順序またはランダムな順序で実行します。

型: `String`<br />
デフォルト: `defined`

#### format
使用するフォーマッタの名前と出力ファイルパスです。
WebdriverIOは主に出力をファイルに書き込む[フォーマッタ](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md)のみをサポートしています。

型: `string[]`<br />

#### formatOptions
フォーマッタに提供されるオプションです。

型: `object`<br />

#### tagsInTitle
フィーチャーまたはシナリオ名にCucumberタグを追加します。

型: `Boolean`<br />
デフォルト: `false`

***これは@wdio/cucumber-framework固有のオプションであり、cucumber-js自体では認識されないことに注意してください***<br/>

#### ignoreUndefinedDefinitions
未定義の定義を警告として扱います。

型: `Boolean`<br />
デフォルト: `false`

***これは@wdio/cucumber-framework固有のオプションであり、cucumber-js自体では認識されないことに注意してください***<br/>

#### failAmbiguousDefinitions
曖昧な定義をエラーとして扱います。

型: `Boolean`<br />
デフォルト: `false`

***これは@wdio/cucumber-framework固有のオプションであり、cucumber-js自体では認識されないことに注意してください***<br/>

#### tagExpression
式に一致するタグを持つ機能またはシナリオのみを実行します。
詳細については[Cucumberドキュメント](https://docs.cucumber.io/cucumber/api/#tag-expressions)を参照してください。

型: `String`<br />
デフォルト: ``

***このオプションは将来的に廃止される予定です。代わりに[`tags`](#tags)設定プロパティを使用してください***

#### profile
使用するプロファイルを指定します。

型: `string[]`<br />
デフォルト: `[]`

***プロファイル内では特定の値（worldParameters、name、retryTagFilter）のみがサポートされていることに注意してください。これは`cucumberOpts`が優先されるためです。また、プロファイルを使用する場合は、上記の値が`cucumberOpts`内で宣言されていないことを確認してください。***

### Cucumberでのテストのスキップ

`cucumberOpts`で利用可能な通常のCucumberテストフィルタリング機能を使用してテストをスキップする場合、設定されているすべてのブラウザとデバイスに対してテストがスキップされることに注意してください。必要でない場合にセッションを開始せずに、特定の機能の組み合わせに対してのみシナリオをスキップできるようにするために、webdriverioはCucumberに対して以下の特定のタグ構文を提供します：

`@skip([condition])`

ここで、conditionはオプションの機能プロパティとその値の組み合わせで、**すべて**一致すると、タグ付けされたシナリオまたは機能がスキップされます。もちろん、さまざまな条件下でテストをスキップするために、シナリオと機能に複数のタグを追加することができます。

`@skip`アノテーションを使用して、`tagExpression`を変更せずにテストをスキップすることもできます。この場合、スキップされたテストはテストレポートに表示されます。

この構文の例をいくつか紹介します：
- `@skip`または`@skip()`：タグ付けされた項目を常にスキップします
- `@skip(browserName="chrome")`：テストはChromeブラウザに対して実行されません。
- `@skip(browserName="firefox";platformName="linux")`：Linuxでのfirefox実行でテストをスキップします。
- `@skip(browserName=["chrome","firefox"])`：タグ付けされた項目はChromeとFirefoxの両方のブラウザでスキップされます。
- `@skip(browserName=/i.*explorer/)`：正規表現に一致するブラウザを持つ機能はスキップされます（`iexplorer`、`internet explorer`、`internet-explorer`など）。

### ステップ定義ヘルパーのインポート

`Given`、`When`、`Then`などのステップ定義ヘルパーやフックを使用するためには、`@cucumber/cucumber`からインポートする必要があります。例えば：

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

WebdriverIOとは無関係の他のタイプのテストにすでに特定のバージョンのCucumberを使用している場合、e2eテストではWebdriverIO Cucumberパッケージからこれらのヘルパーをインポートする必要があります：

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

これにより、WebdriverIOフレームワーク内で正しいヘルパーを使用し、他のタイプのテスト用に独立したCucumberバージョンを使用できるようになります。

### レポートの公開

Cucumberは`cucumberOpts`の`publish`フラグを設定するか、`CUCUMBER_PUBLISH_TOKEN`環境変数を設定することで、テスト実行レポートを`https://reports.cucumber.io/`に公開する機能を提供しています。ただし、`WebdriverIO`をテスト実行に使用する場合、このアプローチには制限があります。各フィーチャーファイルごとに個別にレポートが更新されるため、統合されたレポートを表示することが難しくなります。

この制限を克服するために、`@wdio/cucumber-framework`内に`publishCucumberReport`というプロミスベースのメソッドを導入しました。このメソッドは、`onComplete`フックで呼び出すべきです。`publishCucumberReport`は、cucumberメッセージレポートが保存されているレポートディレクトリの入力が必要です。

`cucumberOpts`の`format`オプションを設定することで、`cucumber message`レポートを生成できます。レポートの上書きを防ぎ、各テスト実行が正確に記録されるように、`cucumber message`フォーマットオプション内で動的なファイル名を提供することを強くお勧めします。

この関数を使用する前に、以下の環境変数を設定してください：
- CUCUMBER_PUBLISH_REPORT_URL: Cucumberレポートを公開したいURL。指定されていない場合、デフォルトのURL「https://messages.cucumber.io/api/reports」が使用されます。
- CUCUMBER_PUBLISH_REPORT_TOKEN: レポートを公開するために必要な認証トークン。このトークンが設定されていない場合、関数はレポートを公開せずに終了します。

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

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)は、複雑なソフトウェアシステムの受け入れテストと回帰テストをより迅速に、より協力的に、そしてスケーリングしやすくするように設計されたオープンソースフレームワークです。

WebdriverIOテストスイートに対して、Serenity/JSは以下を提供します：
- [拡張レポート](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Serenity/JSを組み込みのWebdriverIOフレームワークの代わりに使用して、詳細なテスト実行レポートとプロジェクトの生きたドキュメントを作成できます。
- [スクリーンプレイパターンAPI](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - テストコードをプロジェクトやチーム間で移植可能かつ再利用可能にするために、Serenity/JSはネイティブのWebdriverIO API上に[抽象化レイヤー](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io)を提供します。
- [統合ライブラリ](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - スクリーンプレイパターンに従うテストスイートのために、Serenity/JSは[APIテスト](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io)の作成、[ローカルサーバーの管理](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io)、[アサーションの実行](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)などを支援するオプションの統合ライブラリも提供しています。

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### Serenity/JSのインストール

Serenity/JSを[既存のWebdriverIOプロジェクト](https://webdriver.io/docs/gettingstarted)に追加するには、以下のSerenity/JSモジュールをNPMからインストールします：

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Serenity/JSモジュールについて詳しく学ぶ：
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
        // テストランナーに適切なアダプターを使用するようSerenity/JSを設定
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Serenity/JSレポートサービス、いわゆる"ステージクルー"を登録
        crew: [
            // オプション、テスト実行結果を標準出力に出力
            '@serenity-js/console-reporter',

            // オプション、Serenity BDDレポートと生きたドキュメント（HTML）を生成
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // オプション、インタラクション失敗時に自動的にスクリーンショットを撮影
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Cucumberランナーを設定
    cucumberOpts: {
        // 以下でCucumber設定オプションを参照
    },


    // ...またはJasmineランナー
    jasmineOpts: {
        // 以下でJasmine設定オプションを参照
    },

    // ...またはMochaランナー
    mochaOpts: {
        // 以下でMocha設定オプションを参照
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
        // テストランナーに適切なアダプターを使用するようSerenity/JSを設定
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Serenity/JSレポートサービス、いわゆる"ステージクルー"を登録
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Cucumberランナーを設定
    cucumberOpts: {
        // 以下でCucumber設定オプションを参照
    },


    // ...またはJasmineランナー
    jasmineOpts: {
        // 以下でJasmine設定オプションを参照
    },

    // ...またはMochaランナー
    mochaOpts: {
        // 以下でMocha設定オプションを参照
    },

    runner: 'local',

    // その他のWebdriverIO設定
};
```

</TabItem>
</Tabs>

詳細は以下を参照してください：
- [Serenity/JS Cucumber設定オプション](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Jasmine設定オプション](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Mocha設定オプション](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [WebdriverIO設定ファイル](configurationfile)

### Serenity BDDレポートと生きたドキュメントの作成

[Serenity BDDレポートと生きたドキュメント](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports)は、[`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)モジュールによってダウンロードおよび管理される[Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli)（Javaプログラム）によって生成されます。

Serenity BDDレポートを生成するには、テストスイートは以下を行う必要があります：
- `serenity-bdd update`を呼び出してSerenity BDD CLIをダウンロードし、CLIの`jar`をローカルにキャッシュします
- [設定手順](#configuring-serenityjs)に従って[`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io)を登録することで、中間のSerenity BDD `.json`レポートを生成します
- レポートを生成したいときに`serenity-bdd run`を呼び出してSerenity BDD CLIを実行します

すべての[Serenity/JSプロジェクトテンプレート](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio)で使用されているパターンは、以下を使用しています：
- Serenity BDD CLIをダウンロードするための[`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) NPMスクリプト
- テストスイート自体が失敗した場合でもレポート処理を実行するための[`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe)（これは、テストレポートが最も必要な場合です）
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

`SerenityBDDReporter`についての詳細は以下を参照してください：
- [`@serenity-js/serenity-bdd`ドキュメント](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)のインストール手順
- [`SerenityBDDReporter` APIドキュメント](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io)の設定例
- [GitHub上のSerenity/JS例](https://github.com/serenity-js/serenity-js/tree/main/examples)

### Serenity/JSスクリーンプレイパターンAPIの使用

[スクリーンプレイパターン](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)は、高品質の自動受け入れテストを書くための革新的なユーザー中心のアプローチです。抽象化の効果的な層の使用に導き、テストシナリオがビジネス用語をキャプチャするのを助け、チームでの優れたテストとソフトウェアエンジニアリングの習慣を促進します。

デフォルトでは、WebdriverIOの`framework`として`@serenity-js/webdriverio`を登録すると、Serenity/JSはデフォルトの[キャスト](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io)の[アクター](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io)を設定し、各アクターは以下のことができます：
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

これは、既存のテストスイートにスクリーンプレイパターンに従うテストシナリオを導入するのに十分なはずです。例えば：

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

スクリーンプレイパターンについて詳しく学ぶには、以下を参照してください：
- [スクリーンプレイパターン](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JSによるWebテスト](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)