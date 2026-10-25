---
id: parallel-tests
title: スペックファイル内の並列テスト
description: "mochaOpts.parallelMode または cucumberOpts.parallelMode を使用して、1つのスペックファイル内の Mocha テストや Cucumber シナリオを、それぞれ独自の WebDriver BiDi ブラウジングコンテキストで同時に実行します。これは Playwright の fullyParallel に似たブラウザプーリングの一形態です。"
---

v10 以降、WebdriverIO は1つのスペックファイル内のテストを同時に実行できます。各 Mocha の `it()` または Cucumber のシナリオは、1つのワーカーと1つのブラウザセッションの中で、それぞれ独自のブラウザウィンドウ（WebDriver BiDi の [browsing context](https://w3c.github.io/webdriver-bidi/#browsing-context)）を持ちます。独立したテストを多数含むスペックファイルに使用してください。テストが早く終わり、各テストのコストはウィンドウを開くことだけなので、ワーカープロセスやブラウザセッションを増やす必要もありません。

これはブラウザプーリングの一形態です。テストはブラウザのプールではなく、1つのブラウザ内のウィンドウのプールを共有します。Playwright を使っていた方にとっては、`parallelMode: 'userContexts'` が [`fullyParallel: true`](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file) に最も近いものです。各テストが独自の分離されたコンテキストを持ちます。違いは、Playwright がファイル内のテストを、それぞれ独自のブラウザを持つ複数のワーカープロセスに分散させるのに対し、WebdriverIO はそれらを1つのワーカーと1つのブラウザで同時に実行する点です。

これは、スペックファイル全体を並列に実行する（スペックごとに1つのワーカーと1つのセッション）[`maxInstances`](./OrganizingTestSuites.md) とは別のものです。この2つは組み合わせることができます。`maxInstances` は同時に実行するスペックファイルの数を設定し、`maxParallelContexts` はそれぞれのファイル内で同時に実行するテストの数を設定します。

:::warning 実験的機能
並列モードには実験的な `'wdio:experimentalBiDiCommands'` ケイパビリティが必要です。これは並列テストだけでなく、すべてのテストにおける要素コマンドの実装方法を変更します。[BiDi 要素コマンドの動作の変更](#behavior-changes-of-the-bidi-element-commands)を参照してください。
:::

## 並列モードを有効にする

以下が必要です：

- WebDriver BiDi セッション（`'wdio:enforceWebDriverClassic': true` を設定しない限りデフォルト）
- `'wdio:experimentalBiDiCommands': true` ケイパビリティ
- `@wdio/mocha-framework` または `@wdio/cucumber-framework`。Jasmine は並列モードをサポートしていません。

セッションが BiDi を使用していない場合、またはケイパビリティが設定されていない場合、WebdriverIO は警告をログに出力し、テストを1つずつ順番に実行します。`parallelMode` を設定しなければ、何も変わりません。

### Mocha

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

スペックファイルを変更する必要はありません：

```ts title="test/specs/pages.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('shows the API page', async () => {
        await browser.url('https://webdriver.io/docs/api')
        await expect($('h1')).toHaveText('Introduction')
    })

    it('shows the getting started page', async () => {
        await browser.url('https://webdriver.io/docs/gettingstarted')
        await expect($('h1')).toHaveText('Getting Started')
    })
})
```

両方のテストが、それぞれ独自のウィンドウで同時に実行されます。`browser.url()`、`$()`、`expect()` は、それらを呼び出したテストのウィンドウに対して動作します。

### Cucumber

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./features/**/*.feature'],
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./features/step-definitions/**/*.ts'],
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

フィーチャーファイルの各シナリオは、それぞれ独自のウィンドウで実行されます。プロファイル（`cucumberOpts.profiles`、`cucumberOpts.file`）、行番号付きのスペック（`--spec ./features/login.feature:5`）、および `tags`、`name`、`order`、`strict`、`dryRun`、`failFast`、`retry`、`retryTagFilter` オプションは、順次実行と同じように動作します。フィーチャー、シナリオ、ステップ、フックは、`ignoreUndefinedDefinitions`、`failAmbiguousDefinitions`、`tagsInTitle`、`scenarioLevelReporter` を使用した場合も含め、順次実行と同じようにレポートされます。

## オプション

| オプション | 値 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `parallelMode` | `'contexts'`, `'userContexts'` | 未設定（順次実行） | 並列モードを有効にし、テスト間で共有する範囲を選択します。 |
| `maxParallelContexts` | 数値 | `os.cpus().length` | 同時に実行するテストの数。 |

どちらも `mochaOpts` または `cucumberOpts` で設定します。

`maxParallelContexts` はスロットの数を設定します。各スロットは一度に1つのテストを実行し、現在のテストの実行中に次のテスト用のウィンドウを開き、前のウィンドウをバックグラウンドで閉じます。そのため、短時間ではありますが、最大で 3 × `maxParallelContexts` 個のウィンドウに加えてセッションの最初のウィンドウが開いている場合があります。各スロットは、実行中、事前取得済み、クローズ中のウィンドウをそれぞれ1つずつ保持できるためです。並列モードは、自身が開いたウィンドウのみを閉じます。

## `contexts` と `userContexts` の選択

| | `'contexts'` | `'userContexts'` |
| --- | --- | --- |
| テストごとのウィンドウ | あり | あり |
| Cookie、`localStorage`、Service Worker | すべてのテストで共有 | テストごとに分離（[user context](https://w3c.github.io/webdriver-bidi/#user-context)） |
| ログイン | テストがセッション Cookie を再利用する場合は1回 | テストごとに毎回 |
| ドライバーのサポート | すべての BiDi ブラウザ | `browser.createUserContext()` のサポートが必要。サポートされていない場合は実行が失敗します |

デフォルトでは `'contexts'` を選択してください。異なるユーザーとしてログインするテストなど、テスト同士が互いの Cookie やストレージを参照してはならない場合は `'userContexts'` を選択してください。`'contexts'` と同様に、`'userContexts'` も、セッションが WebDriver BiDi でない場合や、ケイパビリティに `'wdio:experimentalBiDiCommands'` がない場合は、警告を出して順次実行にフォールバックします。ドライバーが `browser.createUserContext` をサポートしていない場合は、フォールバックせずに実行が失敗します。

テストが `browser.newWindow(url)` で開いたタブやウィンドウは、そのテストのウィンドウから開かれるため、テストの Cookie とストレージを持ちます。テストの Cookie とストレージの分離の外側でウィンドウを開くには、`browser.browsingContextCreate()` でウィンドウを作成し、`browser.browsingContexts()` からそのブラウジングコンテキストを取得します：

```js
const { context } = await browser.browsingContextCreate({ type: 'window' })
await browser.browsingContextNavigate({ context, url: 'https://example.com', wait: 'complete' })
const outside = (await browser.browsingContexts()).find((c) => c.contextId === context)
await outside.$('h1').getText()
```

## 各テストが所有するもの

並列テスト内では、以下のコマンドはそのテスト自身のウィンドウに対して動作します：

- ナビゲーション：`url`、`back`、`forward`、`refresh`、`getUrl`、`getTitle`
- 要素コマンド：`$`、`$$`、`shadow$`、`click`、`setValue`、`getText`、`waitFor*` コマンドなど
- `execute`、`actions`、`addInitScript`
- Cookie：`getCookies`、`setCookies`、`deleteCookies` はテストの Cookie パーティションを使用します
- `mock()`：並列テストで作成されたモックは、そのテストのウィンドウとそのフレームのリクエストのみをインターセプトして記録するため、2つのテストが同じ URL をモックできます
- スクリーンショット：`saveScreenshot`、`takeElementScreenshot`

## 並列モードでエラーをスローするコマンド {#commands-that-throw-in-parallel-mode}

一部のコマンドはブラウザ全体またはセッション全体に対して動作するため、単一のテストのウィンドウを対象にすることができません。並列テスト内では、これらのコマンドは他のテストに影響を与える代わりにエラーをスローします：

| コマンド | 理由 | 代替手段 |
| --- | --- | --- |
| `getWindowSize`, `setWindowSize` | OS のウィンドウが共有されているため | テストのページサイズを設定するには `browser.setViewport()` を使用してください。並列テストは1つの OS ウィンドウを共有します |
| `throttleNetwork`, `throttleCPU` | ブラウザ全体に適用されるため | それらのテストは並列モードなしで実行してください |
| `closeWindow`, `switchToParentFrame` | すべてのテストが共有するフォーカス中のウィンドウを変更するため | 各テストをそれぞれのウィンドウ内に留めてください |
| `reloadSession`, `setTimeout` | すべてのテストが共有するセッションを変更するため | `wdio.conf.ts` の `before` フックで呼び出してください |
| `acceptAlert`, `dismissAlert`, `getAlertText`, `sendAlertText` | アラートはブラウジングコンテキストに属するため | `browser.url()` が返すコンテキストに対して呼び出してください：`const page = await browser.url('https://webdriver.io'); await page.acceptAlert()`。`sendAlertText(text)` の代わりに `page.acceptAlert(text)` を使用してください。`dismissAlert()` と `getAlertText()` もコンテキスト上で動作します |
| `getComputedRole`, `getComputedLabel` | WebDriver BiDi ではこれらを読み取れないため | それらのテストは並列モードなしで実行してください |

`switchWindow` は v10 で、並列モードに限らずすべての WebDriver BiDi セッションから削除されました。``switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. Hold the browsing context returned by `browser.url()` or `browser.newWindow()`, or find one with `browser.browsingContexts()`.`` というエラーをスローします。コンテキストに切り替える代わりに、コンテキストオブジェクトを保持してください。

WebdriverIO は、`dialog` イベントをリッスンしているものがない限りプロンプトを自動的に閉じます。そのため、テストからプロンプトに応答する前にリスナー（`browser.on('dialog', () => {})`）を登録してください。

その他の WebDriver Classic コマンドもすべてエラーをスローします。許可されているのは `status`、`getTimeouts`、`getWindowHandles` のみです。Classic コマンドを呼び出していないのに、並列モードで WebdriverIO のコマンドが WebDriver Classic にフォールバックする場合は、[報告してください](https://github.com/webdriverio/webdriverio/issues/new/choose)。

## フックとタイムアウト

### Mocha

- スペックファイル内の `before()` と `after()` は、各テストが独自のウィンドウを持つため、`describe` ごとに1回ではなく**テストごとに1回**実行されます。各テストは、そのウィンドウ内で `before`、`beforeEach`、テスト本体、`afterEach`、`after` を実行します。スペックファイルごとに1回だけ実行すべきセットアップは、`wdio.conf.ts` の `beforeSuite` / `afterSuite` フックに記述してください。これらはテストウィンドウの外側で1回だけ実行されます。
- 各テストが独自のフックを実行するため、失敗したフックはそのテストにのみ影響します。失敗した `before()` は、`describe` に対して1回ではなく、テストごとに1回レポートされます。失敗した `beforeEach()` や `afterEach()` は、同じ `describe` 内の他のテストを停止させません。順次実行では、Mocha はそれらをスキップします。`failHookAffectedTests`（デフォルト）を使用すると、失敗した `before()` または `beforeEach()` によってスキップされたテストは、順次実行と同じテキストで失敗します。異なる可能性があるのはフックのタイトルのみです。失敗した `beforeEach()` は自身のウィンドウのテスト名を示します（`"before each" hook for "t2"`）が、順次実行ではすべてに対して最初のテスト名が示されます。
- 適用されるのは `mochaOpts.timeout` のみです。テストやフック内の `this.timeout()` はエラーをスローし、`it(...).timeout()` や `describe` のタイムアウトは警告とともに無視されます。[Mocha のタイムアウトと WebdriverIO のフック](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks)を参照してください。
- `mochaOpts.bail` と Mocha のリトライはサポートされておらず、実行が失敗します：`mochaOpts.retries`、`describe` 内の `this.retries(n)`、および `it(...).retries(n)`。テストやフック内の `this.retries()` はエラーをスローします。[WebdriverIO のリトライ](./Retry.md)（`it(title, fn, retries)`）は並列モードで動作します。
- `.only()`、`this.skip()`、`grep`、`fgrep`、`invert` は順次実行と同じように動作します。
- どのテストにも await されていないエラー（例えばエラーをスローするタイマー）は、その発生元のウィンドウのテストまたはフックを失敗させ、他のテストは続行されます。順次実行と同様に、未処理の Promise の reject はテストを失敗させず、`mochaOpts.allowUncaught` を使用するとエラーによってワーカーが終了します。テストの終了後、他のテストがまだ実行中のときに発生したエラーは、実行を失敗させてログに出力されますが、どのテストにも表示されません（順次実行ではその時点で実行中のテストに表示されます）。最後のウィンドウが閉じた後は、順次実行と同様に、そのようなエラーによってワーカーが終了します。コードがテストの外側で作成したイベントエミッターからのエラーや、Node.js 22 における `queueMicrotask()` からのエラーについても同様です。これらの場合はテストのウィンドウが特定できないためです。
- `mochaOpts.dryRun`、`forbidPending`、`checkLeaks` は、現時点では並列モードに適用されません。テストは実行され、保留中のテストは失敗せず、グローバルリークはレポートされません。

### Cucumber

- `BeforeAll` / `AfterAll` および `wdio.conf.ts` の `beforeFeature` / `afterFeature` フックは、フィーチャーごとに1回ではなく、ワーカーごとに1回実行されます。`beforeFeature` / `afterFeature` は最初のフィーチャーファイルの uri とフィーチャーのみを受け取ります。これは、グループ化されたスペックなど、1つのワーカーが複数のフィーチャーファイルを実行する場合に問題になります。これらはどのシナリオのウィンドウの外側でも実行されるため、ウィンドウを必要とするコマンドを使用してはいけません。
- `Before` / `After`、`BeforeStep` / `AfterStep`、および `wdio.conf.ts` のシナリオフックとステップフックは、各シナリオごとに、そのシナリオのウィンドウ内で実行されます。
- WebdriverIO では `cucumberOpts.strict` のデフォルトは `false` です。保留中のステップは `strict: true` の場合にのみシナリオを失敗させます。
- `failFast` を使用すると、他のウィンドウですでに実行中のシナリオは、最初の失敗の後も最後まで実行されます。開始されていないシナリオは、順次実行と同様にスキップとしてレポートされます。
- `ignoreUndefinedDefinitions: true` を使用した場合、曖昧なステップ（`failAmbiguousDefinitions: false` の場合）や、`strict: true` での保留中のステップは実行を失敗させます。順次実行ではその場合パスします。
- Cucumber のフォーマッター（`format`、`formatOptions`、`publish`）は実行されないため、ファイルは書き出されません。

### 両フレームワーク共通

テストのウィンドウは、テストが終了するとすぐに閉じられます。テストの終了後も実行され続けるタイマーや Promise を開始しないでください。

## BiDi 要素コマンドの動作の変更 {#behavior-changes-of-the-bidi-element-commands}

`'wdio:experimentalBiDiCommands': true` は、順次実行か並列実行かにかかわらず、セッション内のすべてのテストにおいていくつかの要素コマンドの実装を置き換えます：

- `addValue` と `clearValue` は、信頼されたキーイベントではなく、合成 DOM イベントをディスパッチします。
- `getAttribute` は、プロパティ値と属性値に関する WebDriver のルールに従います。
- `click` は Actions API を通じて送信されます。

Classic の動作に依存しているテストを見つけるために、一度このケイパビリティを有効にし、`parallelMode` なしでスイートを実行してください。

## レポーター

[`@wdio/reporter`](./CustomReporter.md) を拡張したレポーターは、並列テストを正しいスイートの下にレポートし、コマンドをそれを送信したブラウジングコンテキストのテストに紐付けます。

`@wdio/allure-reporter` は Mocha での並列モードをサポートしています。テストとその `afterEach()` および `after()` フックが終了した時点で、テストの結果を書き出します。並列モードでは `before()` と `after()` フックがテストごとに1回実行されるため、レポートにはそれらのフィクスチャがテストごとに1回表示されます。Cucumber では、Allure はまだ並列モードをサポートしていません。重なり合うシナリオの結果、ステップ、添付ファイルが誤ったシナリオの下に記録される可能性があるため、順次実行で使用してください。

`@wdio/spec-reporter` はまだ並列モードをサポートしていません。別の `describe` ブロックの後に来る Mocha の `describe` ブロックや、別のシナリオの実行中に開始された Cucumber シナリオは、その下にネストされて表示されます。また、Cucumber の `retry` を使用すると、パス数が正しくない場合があります。テストの結果と終了コードは正しいです。

`@wdio/cucumberjs-json-reporter` はまだ並列モードをサポートしていません。重なり合うシナリオのステップや添付ファイルが誤ったシナリオに記録される可能性があり、レポーターは警告をログに出力します。順次実行で使用してください。

`@wdio/html-reporter` はまだ並列モードをサポートしていません。別のテストが開始された後にテストが送信したログ、スクリーンショット、動画が、誤ったテストの下に記録される可能性があります。順次実行で使用してください。

`@wdio/video-reporter` は、各並列テストをそれぞれ独自の動画に記録します。Cucumber では、動画を Allure に添付しません。

カスタムレポーターは、次のテストが開始する前にテストが終了すると仮定してはいけません。[レポーターと並列テスト](./CustomReporter.md#reporters-and-parallel-tests)を参照してください。

## クラウドベンダー

クラウドベンダーは、ブラウザセッションごとに1つの動画、1セットのログ、1つのテストステータスを記録します。並列モードでは多数のテストがそのセッションを共有するため、ベンダーのダッシュボードでは動画、ログ、合否ステータスをテストごとに分割できません。また、`userContexts` を使用するには、ベンダーのグリッドが `browser.createUserContext`（Mocha の場合は `browser.removeUserContext` も）をサポートしている必要があります。並列モードは、まだどのクラウドベンダーでもテストされていません。

クラウドベンダー上で実行する場合は、並列モードをオフにし、[`maxInstances`](./OrganizingTestSuites.md) を使用してスペックファイルを並列に実行することをお勧めします。オフにするには、フレームワークのオプションから `parallelMode` を削除してください。`'wdio:experimentalBiDiCommands'` のみを削除した場合、テストは1つずつ順番に実行され、実行のたびに警告がログに出力されます。

## トラブルシューティング

### `parallelMode: "contexts" requires 'wdio:experimentalBiDiCommands': true to be set in capabilities`

ケイパビリティに `'wdio:experimentalBiDiCommands': true` を追加してください。これがないと、テストは1つずつ順番に実行されます。Cucumber では、メッセージは `Parallel mode (cucumberOpts.parallelMode: "contexts") requires "wdio:experimentalBiDiCommands" to be set in capabilities` となります。

### `... is set but the browser session does not support WebDriver Bidi`

セッションが WebDriver Classic を使用しています。ケイパビリティから `'wdio:enforceWebDriverClassic': true` を削除するか、WebDriver BiDi をサポートするブラウザとドライバーを使用してください。Cucumber では、メッセージは `Parallel mode (cucumberOpts.parallelMode: "contexts") requires a WebDriver Bidi session. Falling back to sequential execution.` となります。

### `parallelMode: "userContexts" requires browser.createUserContext and browser.removeUserContext, which this driver does not support`

ドライバーがユーザーコンテキストを作成できません。`parallelMode: 'contexts'` を使用するか、ブラウザとドライバーを更新してください。Cucumber では、メッセージは `cucumberOpts.parallelMode "userContexts" requires browser.createUserContext, which this driver does not provide. Use a driver with BiDi user context support or set parallelMode to "contexts" (shares cookies and storage between scenarios).` となります。

### `... is not supported inside parallel mode tests because ...` または `... is not supported in parallel mode`

テストが[並列モードでエラーをスローするコマンド](#commands-that-throw-in-parallel-mode)に記載されたコマンドを呼び出しました。表に記載された代替手段を使用してください。

### `bail is not supported in parallel mode` / `retries is not supported in parallel mode`

`mochaOpts.bail` または `mochaOpts.retries`、あるいはエラーで示されたテストの `this.retries(n)` / `.retries(n)` を削除するか、スペックファイルを `parallelMode` なしで実行してください。並列モードでテストをリトライするには、[WebdriverIO のリトライ](./Retry.md)（`it(title, fn, retries)`）を使用してください。

### `Suite-level hooks (before()/after()) run once per test in parallel mode`

スペックファイルに `before()` または `after()` フックがあります。これらはテストごとに実行されます。1回だけ実行すべきセットアップは、`wdio.conf.ts` の `beforeSuite` / `afterSuite` に移動してください。

## 関連ページ

- [テストスイートの整理](./OrganizingTestSuites.md)：`maxInstances` を使用してスペックファイルを並列に実行する
- [シャーディング](./Sharding.md)：スイートを複数のマシンに分割する
- [フレームワーク](./Frameworks.md)：Mocha と Cucumber のすべてのオプション
- [自動化プロトコル](./AutomationProtocols.md)：WebDriver BiDi と WebDriver Classic