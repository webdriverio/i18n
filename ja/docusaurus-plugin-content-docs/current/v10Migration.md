---
id: v10-migration
title: v9 から v10 へ
description: WebdriverIO v9 プロジェクトを v10 に更新します。すべての破壊的変更と、このガイドを適用するコーディングエージェント用スキルを掲載しています。
---

このガイドでは、WebdriverIO `v10` の破壊的変更と、それぞれに必要な対応をまとめています。

これまでのメジャーバージョンとは異なり、これらの変更のほとんどは WebdriverIO の [codemod](https://github.com/webdriverio/codemod) では適用できません。テストが実際に何を意味しているかに依存するためです。後述の[レガシーなコマンドシグネチャ](#legacy-command-signatures)は機械的な置き換えで対応できます。その他のセクションでは、スイート内の影響を受ける箇所の見つけ方を説明します。

## コーディングエージェントで移行する {#migrate-with-a-coding-agent}

エージェントに v10 移行スキルを渡し、このページに従ってスイートを WebdriverIO v10 に移行するよう依頼してください。スキルは手順を定めます。何を検索するか、どの codemod を実行するか、いつ止めるかです。各破壊的変更についての正しい情報源はこのページです。

アップグレードするプロジェクトからインストールします。[skills CLI](https://skills.sh) はこのリポジトリから [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) を読み込み、選択したエージェントのスキルディレクトリに書き込みます:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

`--skill wdio-v10-migration` でこのスキルがインストールされます。WebdriverIO リポジトリでの作業用のスキルは internal とマークされており、選択肢には表示されません。CLI はどのエージェント向けにインストールするかを尋ね、各エージェントのプロジェクトディレクトリにスキルを書き込みます。このファイルをチャットに添付することもできます。

厳格なセレクターと、capability 内の接頭辞なしの `specs` / `exclude` リストは、スイートを実行したときにしか現れません。スキルはソースコードだけからこれらを判断することはできません。

## Node.js

WebdriverIO v10 には Node.js 22.23.4、24.22.1、26.12.1、またはこれらの系列の以降のリリースが必要です。これらは、eMudhra 中間 CA の侵害に対応した[更新済み CA ストア](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)を含む最初のリリースです。Node.js 18 と 20 はサポート対象外となり、Node.js 23 と 25 もサポートされません。CI では Node.js 22、24、26 をカバーしています。

## コンポーネントテスト

ブラウザランナーは引き続き Chrome 90、Edge 90、Firefox 90、Safari 14.1 以降で動作します。[ブラウザサポート](/docs/component-testing#browser-support)を参照してください。

`browser.execute` に渡すコードは ES2021 のままなので、テスト対象の古いブラウザでも実行できます。この下限は変わっていません。

## Mocha

`@wdio/mocha-framework` と `@wdio/browser-runner` は [Mocha 12](https://mochajs.org/blog/mocha-12-stable/) に依存します。Mocha 12 には Node.js `^20.19.0 || >=22.12.0` が必要ですが、これは v10 の下限である Node.js 22.23.4 でカバーされます。

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

`mochaOpts.compilers` は廃止されました。Mocha が長く非推奨だった `--compilers` フラグを削除したため、残っているコンパイラのマッピングは無視されます。トランスパイラやその他のセットアップファイルは `mochaOpts.require` で読み込んでください。

WebdriverIO は Mocha のタイムアウトに従います。テストやフック内の `this.timeout()`、そしてタイムアウトを無効にする `mochaOpts.timeout: 0` です。v9 では、WebdriverIO はテスト内の `this.timeout()` を無視しており、9.22 以降は `mochaOpts.timeout: 0` ですべてのテストが失敗していました（"Timeout after -3ms"）。WebdriverIO の `retry` 引数は、タイムアウト後にテストを再実行しません。[Mocha のタイムアウトと WebdriverIO のフック](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks)を参照してください。`mochaOpts.parallelMode` についてもそちらに記載があります。v10 の新機能: `mochaOpts.parallelMode` または `cucumberOpts.parallelMode` による[スペックファイル内でのテストの並列実行](./ParallelTests.md)。

`failHookAffectedTests` のデフォルトは `true` です。`before` または `beforeEach` フックが失敗すると、そのフックによってスキップされたテストも失敗になります。フックのみを報告したい場合は `mochaOpts.failHookAffectedTests` を `false` に設定してください。

フックのタイトルには、Mocha と同様にフックの説明またはフック関数の名前が入ります。`beforeEach('login', fn)` や `beforeEach(function login () {})` の場合は `"before each" hook: login for "my test"`、無名フックの場合は名前なしで `"before each" hook for "my test"` となります。v9 では WebdriverIO のラッパー名である `wrappedHook` が入っていました。このタイトルは、失敗したフックによってスキップされたテストのエラーや、たとえば Allure におけるルートレベルフックの名前に表示されます。

`expect-webdriverio` 8 を使用してください。[expect-webdriverio 8](#expect-webdriverio-8) を参照してください。Mocha は 1 つのプロセス内でこのパッケージを 2 回読み込むことがありますが、それらのコピー間でアサーションの状態を共有します（[expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221)）。

`mochaOpts` を通じて影響が出る可能性のある Mocha 12 の変更:

- `grep` はモダンな RegExp フラグを受け付けます。
- `ui` は引き続き `bdd`、`tdd`、`qunit`、`exports` のいずれかです。カスタムインターフェースは `*-bdd`、`*-tdd`、`*-qunit` のサフィックスを維持してください。
- `parallel` は引き続きサポートされません。スペックの並列実行は WDIO が担当しており、有効にすると Mocha のワーカープールがエラーになります。

Mocha 12 は ESM ファースト（`"type": "module"`）です。プログラムからの `require('mocha')` は、Node 22 では `require(esm)` によって引き続き動作します。WDIO の Mocha CLI（`wdio run … --mochaOpts.*`）は変わりません。Mocha 自身の CLI は yargs の代わりに `util.parseArgs` を使うようになりました。

## Cucumber

`@wdio/cucumber-framework` は [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300) に依存します。

Cucumber 13 には Node.js 22、24、26 以降が必要です。Node.js 20、23、25 では動作しません。フレームワークパッケージは v10 の範囲を宣言しており、こちらも Node.js 23 と 25 を除外しています。

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

`tagExpression` にエイリアスはありません。設定するとエラーがスローされるため、残ったフィルターが原因で気付かないうちにすべてのシナリオが実行されることはありません。

Cucumber 13 は `Cli` をエクスポートしなくなりました。プログラムからの実行は `@cucumber/cucumber/api` の `runCucumber` を通じて行います。アダプターはすでにこれを使用しています。

Cucumber 13 のその他の破壊的変更（曖昧なフォーマッターのパス、並列ワーカー、`BeforeAll` / `AfterAll`）は [Cucumber のアップグレードガイド](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300)に記載されています。

### フィーチャーの uid

Cucumber フィーチャーの uid は、ファイル名ではなく `rootDir` からのフィーチャーファイルのパスになりました。`login.feature:1:1` ではなく `features/admin/login.feature:1:1` です。別のフォルダーにある同名の 2 つのフィーチャーファイルが uid を共有することはなくなりました。シナリオの `parent` と `fullTitle` はこの uid を使用します。パス内の `%`、`:`、`#` は `%25`、`%3A`、`%23` にエンコードされるため、`uid.split(':')[1]` は引き続き行番号となり、`#` はパート番号の開始のみを示します。ランダムな順序のグループ化されたスペックでは、再度開始されたフィーチャーのスイート uid は `<uid>#2` になります。

`scenarioLevelReporter: true` の場合、Allure の `historyId` は `fullTitle` から生成されるため、この変更により各シナリオの Allure の履歴はリセットされます。`rootDir` やフィーチャーファイルのパスが変わった場合もリセットされます。異なるフォルダーにある設定ファイル間で 1 つの履歴を維持するには、それぞれに同じ `rootDir` を設定してください。

## Jasmine

`@wdio/jasmine-framework` は [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0) に依存します。Jasmine 6 は Node.js 20、22、24 でテストされています。v10 の下限である Node.js 22.23.4 はすでにこの範囲に含まれます。

`jasmineNodeOpts` は削除されました。Jasmine は `jasmineOpts` で設定してください。`jasmineNodeOpts` を設定するとエラーがスローされます:

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

`jasmineOpts.failFast` は読み取られなくなりました。`jasmineOpts.stopOnSpecFailure` を使用してください。残った `failFast` ではスイートは停止しません。Cucumber の `failFast` は別のオプションで、引き続き動作します。

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

`jasmineOpts.stopSpecOnExpectationFailure` は削除されました。`jasmineOpts.oneFailurePerSpec` を使用してください。古いキーを設定するとエラーがスローされます:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

Jasmine の同期マッチャーは再び同期的になりました。v9 ではグローバルの `expect` が Jasmine の `expectAsync` だったため、`expect(1).toBe(1)` は Promise を返していました。v10 では、Jasmine の組み込みマッチャーと `jasmine.addMatchers` で追加したマッチャーは `undefined` を返します。WebdriverIO のマッチャー、Jasmine の非同期マッチャー、`jasmine.addAsyncMatchers` のマッチャーは引き続き Promise を返すため、引き続き `await` してください。`await expect($('#logo')).toBeDisplayed()` を `expectAsync()` に変更する必要はありません。グローバルの `expect` が WebdriverIO のマッチャーを自動的に `expectAsync` に渡します。`await expect(1).toBe(1)` も引き続き動作します。

`await` のない同期アサーションが失敗すると、スペックが失敗するようになりました。v9 ではこれは reject された Promise でした。何も await しなければスペックがパスし、ログに未処理の reject が残るだけでした。アップグレード後は、失敗し始めたスペックを確認してください。それらは v9 で隠れた失敗を抱えていたものであり、修正すべきは `expect` の呼び出しではなく、テストまたはアプリケーションです:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: `onSave` が呼ばれなくてもパスしていた
    // v10: `onSave` が呼ばれないと失敗する
    expect(onSave).toHaveBeenCalled()
})
```

同期マッチャーの結果は `undefined` になったため、それに対する `.then()` や `.catch()` は `TypeError` をスローします:

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

この変更によるその他の影響:

- `oneFailurePerSpec` は、最初に失敗したアサーションでスペックを停止するようになりました。同期マッチャーでは即座に、await された非同期マッチャーでは Promise が確定した時点で停止します。
- Jasmine のスパイマッチャーは `await` なしで動作します。v9 では `toHaveBeenCalled`、`toHaveSpyInteractions`、`toHaveNoOtherSpyInteractions` が "Does not take arguments" で失敗し、呼ばれていないスパイが `await` なしでパスしていました。
- `jasmine.addMatchers` は置き換えられなくなったため、Jasmine の "Monkey patching detected" 警告は表示されなくなりました。

`toHaveSize` には 2 つの意味があります。WebdriverIO の値に対しては WebdriverIO のマッチャーとなり、要素のサイズをチェックします。対象は、要素、要素配列（`$$().filter()` の結果を含む）、`Element[]`、マルチリモート要素、ブラウザ、ブラウジングコンテキスト、モック、`some()` ラッパー、またはチェーン可能な `$()` などの Promise です。それ以外の値に対しては Jasmine のマッチャーとなり、長さをチェックします。v9 では常に Jasmine のマッチャーが実行されていました。

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine、同期
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO、非同期
```

型も同じルールに従います。`@wdio/jasmine-framework` は、グローバルの `expect` に Jasmine のマッチャーに加えて、Promise を返す WebdriverIO のマッチャーと Jasmine の非同期マッチャーの型を付けるようになりました。`tsconfig.json` の `types` から `expect-webdriverio/jasmine-wdio-expect-async` を削除してください。これはすべてのマッチャーを非同期として型付けするためです。`jasmine` がなければ追加してください:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

`expect.oneOf()` と `expect.multiRemote()` も Jasmine のスペックで動作するようになりました。以前は、実行時に Jasmine の `expect` 上に存在しませんでした。

## expect-webdriverio 8

`@wdio/globals`、`@wdio/runner`、`@wdio/browser-runner` は、peer dependency として `expect-webdriverio` 8 を必要とします。v9 では `expect-webdriverio` 5、6、7 でした。`package.json` に `expect-webdriverio` が記載されている場合は、`@wdio/*` パッケージと同じ変更でバージョン 8 に更新してください。

`expect-webdriverio` 8 には独自の破壊的変更があります。その [v7 から v8 への移行ガイド](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8)に、各変更とその代替が記載されています。`expect-webdriverio` 5 または 6 から移行する場合は、[v5 から v6 への移行ガイド](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v5-to-v6)も読んでください。バージョン 8 では、5.6.9 から 6.0.0 で非推奨となった API が削除されています。バージョン 7 には移行ガイドがありません。バージョン 7 ではマルチリモートのサポートが追加され、`$$()` に対する `toMatchSnapshot()` と `toMatchInlineSnapshot()` は各要素の `outerHTML` を保存するようになりました。これらのスナップショットを更新してください。テストスイートに最も影響しやすい変更は以下のとおりです:

- `$$()` に対する `toHaveText` は、要素をインデックスごとに比較します。ページと異なる順序の期待値配列は失敗します。ページの順序、`expect.oneOf()`、または `expect.arrayContaining()` を使用してください。
- 単一要素に対する期待値の配列は、`toHaveText`、`toHaveHTML`、`toHaveComputedLabel`、`toHaveComputedRole`、`toHaveElementClass` で失敗します。`expect.oneOf()` を使用してください。`toHaveElementClass` では、配列は「これらのクラスのいずれかを持つ」という意味でした。`expect.oneOf()` を使うか、要素がすべてのクラスを持つ必要がある場合はクラスごとに 1 つのアサーションを使用してください。
- 単一要素に対する、または `some()` と組み合わせたリストマッチャー（`expect.arrayContaining()`、`expect.arrayOf()`）はエラーをスローします。`$$()` に対しては、すべての要素の値を一度に比較します。
- 存在しない属性やプロパティは決してマッチしません。`expect.not.stringContaining()` のような値なしを受け入れるマッチャーでもマッチしません。
- `URL`、`Set`、`Map`、バイナリ値は内容で比較されます。誤ってパスしていたアサーションが失敗するようになる可能性があります。
- ヘルパー型はグローバルではなくなりました。インポートせずに `Test`、`TestResult`、`Scenario`、`WdioCustomMatchers` を使用するファイルは `Cannot find name` で失敗します。`@wdio/types` の `Frameworks.Test`、`Frameworks.TestResult`、`Frameworks.Scenario`、および `ExpectWebdriverIO.Matchers` を使用してください。
- `setFeatureFlags()` と `featureFlags` オプションは削除されました。
- 次の非推奨 API が削除されました: `setOptions`（`setDefaultOptions` を使用）、`getConfig`（`getDefaultOptions` を使用）、`matchers`（`wdioCustomMatchers` を使用）、`toHaveAttr`（`toHaveAttribute` を使用）、`toHaveClass`（`toHaveElementClass` を使用）、`toBeRequestedWithResponse()`（`toBeRequestedWith({ response })` を使用）、`expect-webdriverio/types`（`expect-webdriverio/expect-global` を使用）。
- `beforeAssertion` と `afterAssertion` フックは、`toBeExisting`、`toBePresent`、`toHaveLink`、`toHaveValue`、`toBeRequested` について、テストが呼び出したエイリアスの名前を受け取ります。v9 では、エイリアスの背後にあるマッチャーの名前を受け取っていました。たとえば `toBeExisting` に対して `toExist` です。
- マルチリモートブラウザでは、`$$()` の結果を `expect` に渡してください。`[...elements]` や `Array.from(elements)` のような通常の配列は要素として認識されず、アサーションは失敗します。

マルチリモートブラウザでは、1 つのアサーションですべてのインスタンスをチェックし、`expect.multiRemote()` でインスタンスごとに 1 つの期待値を指定します。[マルチリモートのアサーション](/docs/multiremote#assertions)を参照してください。

## ドライバーパッケージ

WebdriverIO v10 は、Firefox、Edge、Safari を `geckodriver` 8、`edgedriver` 8、`safaridriver` 3 で起動します。v9 では `geckodriver` と `edgedriver` 6 または 7、`safaridriver` 1 または 2 を使用していました。これらは WebdriverIO がインストールするため、自分で記載する必要はありません。`package.json` にいずれかが記載されている場合は、`@wdio/*` パッケージと同じ変更で更新してください。

`geckodriver` と `edgedriver` は `@wdio/logger` を peer dependency として受け取るため、インストールされている WebdriverIO のロガーを通じてログを出力します。v9 では、`geckodriver` と `edgedriver` が独自の `@wdio/logger` のコピーを持ち込んでおり、その 2 つ目のコピーが `outputDir` 内のログファイルを空にしていました。`npm ls @wdio/logger` を実行してください。すべてのコピーがバージョン 10 である必要があります。バージョン 9 に依存したままのプラグインやサービスも同じ影響を与えます。

[ドライバーのアップグレードノート](https://github.com/webdriverio/driver#upgrading-to-geckodriver-8-edgedriver-8-and-safaridriver-3)にすべての変更が記載されています。WebdriverIO プロジェクトに影響しうる変更は以下のとおりです:

- ドライバーのダウンロードは `HTTPS_PROXY` と `HTTP_PROXY` を使用します。v9 では、`geckodriver` と `edgedriver` のダウンロードはこれらを無視していました。環境にプロキシが設定されているがドライバーの CDN には直接アクセスする必要がある場合は、そのホストを `NO_PROXY` に追加してください。
- `geckodriver` は `GECKODRIVER_FILEPATH` を読み取らなくなりました。`GECKODRIVER_PATH` を使用してください。
- `wdio:edgedriverOptions` と `wdio:safaridriverOptions` は、`wdio:chromedriverOptions` と同様に `spawnOpts` を受け付けます。

## ブラウザのダウンロード

v9 では、WebdriverIO は Chrome、Chromium、Chromedriver の zip ファイルを自前で展開していました。v10 では、Linux と macOS ではシステムの `unzip` コマンド（Windows では `tar.exe` または PowerShell）を使用します。`node:24-slim` などのスリムな Docker イメージにはこれが含まれていないため、インストールしてください。[Docker](/docs/docker#images-where-webdriverio-downloads-the-browser) を参照してください。

v9 では、Chrome、Chromium、Firefox、Chromedriver のダウンロードは `HTTPS_PROXY` と `HTTP_PROXY` を使用していました。v10 では、プロジェクトに `proxy-agent` がインストールされている場合、または Node.js が `NODE_USE_ENV_PROXY=1` で実行されている場合にのみ使用します。プロキシ変数が設定されているのにダウンロードがそれを無視する場合、WebdriverIO は警告をログに出力します。[ブラウザとドライバーのダウンロード用プロキシ](/docs/proxy#proxy-for-browser-and-driver-downloads)を参照してください。

## マルチリモートのグローバル

小文字の `multiremotebrowser` グローバルは、`@wdio/globals` からも `eslint-plugin-wdio` のグローバルからも削除されました。`multiRemoteBrowser` を使用してください。

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## Capabilities

capabilities 内の `specs` と `exclude` は読み取られなくなりました。`wdio:specs` と `wdio:exclude` を使用してください。

```diff
  capabilities: [{
      browserName: 'chrome',
-     specs: ['./test/specs/chrome/**/*.js'],
-     exclude: ['./test/specs/chrome/skip.js']
+     'wdio:specs': ['./test/specs/chrome/**/*.js'],
+     'wdio:exclude': ['./test/specs/chrome/skip.js']
  }]
```

トップレベルの設定キーは引き続き `specs` と `exclude` です。capability に残った接頭辞なしのリストは、その capability のファイルを選択しません。その場合、capability はトップレベルの `specs` と `exclude` を使用します。

Sauce Labs オプションの型から `tunnelIdentifier` と `parentTunnel` のエイリアスが削除されました。`tunnelName` と `tunnelOwner` を使用してください。

## TypeScript

`webdriverio` がエクスポートしていた `Element`、`MultiRemoteBrowser`、`MultiRemoteElement` 型は削除されました。グローバルの `WebdriverIO` 名前空間を使用してください。

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

`ChainablePromiseElement` は `then` を宣言するようになり、`ChainablePromiseArray` は `then`、`catch`、`finally` を宣言するようになりました。チェーン可能な型は `await` する前の値を表します。await された値には適合しなくなりました:

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

await された値は `WebdriverIO.Element` または `WebdriverIO.ElementArray` として型付けしてください:

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

両方のチェーン可能な型は `T extends PromiseLike<unknown>` にマッチするようになりました。`PromiseLike` をチェックする条件型は、`$()` と `$$()` に対して v9 とは別の分岐を通ります。たとえば、`Awaited<ChainablePromiseElement>` は `WebdriverIO.Element` に、`Awaited<ChainablePromiseArray>` は `WebdriverIO.ElementArray` になります。

await されていない `$$()` のプロパティの型が変わりました。これらはクエリが解決される前から即座に利用できるため、`await` や `.then()` なしで読み取ってください:

| プロパティ | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | 親（Promise ではない、下記参照） |
| `foundWith` | なし | リストを見つけたコマンド（例: `$$` や `custom$$`） |
| `props` | なし | そのコマンドの追加引数 |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

`$('form').$$('input')` のようなチェーンされたクエリでは、`parent` はリストが解決されるまではチェーン可能な `$('form')` であり、解決後は解決済みの要素になります。`parent` を要素として使う前にリストを await してください。

実行時、`$$()` リストに対する `filter()`、`filterSeries()`、`slice()` は、通常の配列ではなく要素リストを返します。結果は元のリストの `selector`、`foundWith`、`parent`、`props` を保持します。v9 では、`filter()` はこれらのプロパティを持たない通常の配列を返していました。型にはまだこれが反映されていません。`filter()` と `filterSeries()` は `Promise<WebdriverIO.Element[]>` を返すと宣言され、`slice()` は `WebdriverIO.Element[]` を返すため、結果に対してこれらのプロパティを読み取ると TypeScript がエラーを報告します。

WebdriverIO は派生リスト自体に対してクエリを再実行しません。末尾を超えたインデックスはさらなるマッチを待たず、フィルターで除外された要素を返すこともありません。そのメンバーは依然として元のクエリの要素であり、元の `selector` と `index` を持ちます。メンバーが stale になった場合、WebdriverIO はそのインデックスで元のクエリから再取得します。ページが変わっていれば別の要素になる可能性があります。リストのプロパティからリストのクエリを再実行するコード（たとえば `parent[foundWith](selector, ...props)`）は、フィルター済みのリストではなく完全なリストを取得します。

公開パッケージは `typeScriptVersion` を 6.0.3 に設定しており、このリポジトリがコンパイルに使用している TypeScript のバージョンと一致します。

`browser.mock()` は `urlpattern-polyfill` の `URLPattern` とネイティブの `URLPattern`（Node.js 24 ではグローバルで、TypeScript 6 の `dom` ライブラリで型付けされている）を受け付けます。

TypeScript 6 では `"moduleResolution": "node"` と `"baseUrl"` が非推奨となり、`strict` がデフォルトになりました。`create-wdio` は、ESM プロジェクトには `"moduleResolution": "bundler"` を、CommonJS プロジェクトには `"NodeNext"` を生成するようになりました。既存プロジェクトで TypeScript を更新する場合は、`tsconfig.json` のこれらのオプションを変更してください。

ESM プロジェクトの場合:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
+        "moduleResolution": "bundler",
         "module": "ESNext"
     }
 }
```

CommonJS プロジェクトの場合は、`create-wdio` と同様に両方のオプションに `NodeNext` を使用してください:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
-        "module": "CommonJS"
+        "moduleResolution": "NodeNext",
+        "module": "NodeNext"
     }
 }
```

TypeScript 6 では `types` のデフォルトも `[]` に変わったため、インストールされているすべての `@types/*` パッケージを読み込むことはなくなりました。`tsconfig.json` に `types` リストがない場合、Mocha の `describe` や `it` などのグローバルは `Cannot find name` で失敗します。`create-wdio` と同様に、テストで使用する型パッケージを列挙してください。たとえば Mocha の場合:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

`npm create wdio@latest` は `compilerOptions.target` と `compilerOptions.lib` を `es2024` として書き込みます。このファイルを型チェックするには TypeScript 5.7 以降が必要です。設定とテストを実行する `tsx` は型チェックを行わないため、古いコンパイラが問題になるのは自分で `tsc` を実行する場合だけです。

既存の `tsconfig.json` は書き換えられません。別の設定を継承する生成済みの設定は、親の `target` と `lib` を保持します。

`afterAssertion` フックでは、`params.result` の型がマッチャーが返すとおりの `{ pass, message }` になりました。v9 では型が `{ result, message }` でしたが、実行時には `params.result.result` は常に `undefined` でした。`params.result.pass` を読み取ってください:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

`pass` は、`.not` 付きの場合も含め、値が期待値にマッチすると `true` になります。したがって `.not` 付きの場合、`pass` が `false` のときにアサーションがパスします。フックは、テストが `.not` を使ったかどうかを示しません。

## コマンドフック

要素コマンドは、`beforeCommand` と `afterCommand` フックをコマンドの引数とともに 1 回だけ実行します。v9 では 2 回または 3 回実行され、最初の呼び出しでは `args` として `[]` が渡されていました。別のコマンド内で実行されるコマンド（たとえば `getText` 内の `getElementText`）には、引き続き独自のフックのペアがあります。フックは `emit` イベント関数では実行されません。コマンドを数えたり時間を計測したりするフックは、各コマンドを 1 回だけ見ることになります。

要素コマンドでは、`beforeCommand` は WebdriverIO が要素を待機する前に実行されるため、その時点では要素がまだ存在しない可能性があります。`afterCommand` は待機と再試行の後に、最後の試行の結果またはエラーとともに実行されます。見つかった要素が必要なフックは `afterCommand` を使用してください。

`overwriteCommand()` で変更されたコマンドや、Promise に対するチェーンされたクエリ（`$('a').$('b')`）では、引き続きフックが複数回実行される場合があります。

## レポーター

ブラウザの `result` イベントは、`client:afterCommand` としてレポーターに転送されます。そのペイロードと `AfterCommandArgs` 型には `name` プロパティがなくなりました。代わりに `command` を読み取ってください。カスタムコマンドはすでに `command` を送信していました。

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

`@wdio/allure-reporter` の `addEnvironment(name, value)` は削除されました。これは効果がありませんでした。環境の行は、Allure レポーターのオプションで [`reportedEnvironmentVars`](/docs/allure-reporter) を使って設定してください。

### Cucumber JSON レポーター

`wdio-cucumberjs-json-reporter` は WebdriverIO リポジトリに移され、[`@wdio/cucumberjs-json-reporter`](/docs/cucumberjs-json-reporter) になりました。コミュニティパッケージは v9 専用です。`@wdio/reporter` 9 と `@wdio/logger` 9 をインストールします。

```sh
npm uninstall wdio-cucumberjs-json-reporter
npm install @wdio/cucumberjs-json-reporter --save-dev
```

`reporters: ['cucumberjs-json']` はそのままです。WebdriverIO はこの名前に対して `@wdio/cucumberjs-json-reporter` を読み込みます。ステップファイル内のインポートを置き換えてください:

```diff
- import cucumberJson from 'wdio-cucumberjs-json-reporter'
+ import cucumberJson from '@wdio/cucumberjs-json-reporter'
```

オプションは同じです。JSON ファイルは Cucumber JSON フォーマットにより忠実に従うようになりました。それらを読み込むツールやスクリプトを確認してください:

- シナリオの `id` は Cucumber JSON フォーマットと同様に `<feature id>;<scenario id>`、`Rule:` 内のシナリオでは `<feature id>;<rule id>;<scenario id>` です。以前は各部分に区切り文字がありませんでした。
- フィーチャーの `id` は Cucumber JSON フォーマットと同様に `:` や `/` などの文字を保持します（スペースのみが `-` になります）。JSON ファイルの名前は変わりませんが、200 バイトを超えるフィーチャー部分（たとえば多数の非 ASCII 文字）は切り詰められてハッシュで終わり（Linux ではファイル名に 255 バイトまで使用可能）、`con` のような Windows のデバイス名は `_` で始まります。
- フィーチャーとシナリオの `keyword` は Cucumber JSON フォーマットと同様にファイル内のキーワードです。たとえば `Scenario Outline` や `Fonctionnalité` です。以前は常に `Feature` と `Scenario` でした。
- シナリオとステップには `line` があります。
- タグは Cucumber JSON フォーマットと同様に `{ name, line }` です。シナリオのタグにはフィーチャーファイルの行番号が付きます。以前は `location`、`id`、`astNodeId`（実行ごとにランダム）を持つ Cucumber の内部オブジェクトで、シナリオのタグには行番号がありませんでした。
- フックは `hidden: true` で `name` のないステップです。以前はフックの `name` が空でした。
- ドキュメント文字列の引数は `{ content, line }` です。以前はドキュメント文字列のテキストでした。
- Cucumber がスキップしたフック（失敗したフックの後、または `'skipped'` を返したフック）はステータスが `skipped`、`'pending'` を返したフックは `pending` になります。これも Cucumber JSON フォーマットと同様です。以前は `passed` でした。
- 曖昧なステップのステータスは Cucumber JSON フォーマットと同様に `ambiguous` で、その `error_message` にはマッチしたステップ定義が列挙されます。以前は理由なしの `skipped`、または `cucumberOpts.failAmbiguousDefinitions` 指定時は `failed` でした。
- 未定義のステップのステータスは `undefined` です。以前は `failed`、または `cucumberOpts.ignoreUndefinedDefinitions` 指定時は `pending` でした。
- Cucumber が再実行したシナリオ（`cucumberOpts.retry`）には、最後の試行のステップのみが含まれます。以前はすべての試行のステップが含まれていました。
- `cucumberOpts.tagsInTitle` を指定した場合、フィーチャーとシナリオの名前、id、ファイル名にはタグが含まれません。
- ワーカーが複数のフィーチャーファイルを実行する場合（グループ化されたスペック）、レポーターはフィーチャーごとに 1 つのファイルを書き込みます。以前はすべてのシナリオが最初のフィーチャーのファイルに入っていました。
- マルチリモートセッションでは、メタデータは最初のインスタンスから取得されます。

以下は以前は欠落していたか誤っていたものです: `*` ステップ、`But` ステップのキーワード、WebdriverIO の `before` フックからの添付、`text/plain` として添付されたオブジェクト（`[object Object]` ではなく JSON テキストになります）、`application/json` として添付された JSON 文字列（そのまま保持され、二重にエンコードされません）。ステップのキーワードは、フィーチャーファイルの `# language:` ヘッダー、次に `cucumberOpts.language` に従います（レポーターの `language` オプションは `cucumberOpts.language` が設定されていない場合のみ）。`cucumberOpts.scenarioLevelReporter: true` の場合、レポーターはファイルを書き込まずに警告をログに出力します。このフォーマットにはステップが必要なためです。

### ビデオレポーター

`wdio-video-reporter` は WebdriverIO リポジトリに移され、[`@wdio/video-reporter`](/docs/video-reporter) になりました。コミュニティパッケージは v9 専用です。`@wdio/reporter` 9 と `@wdio/logger` 9 をインストールします。

```sh
npm uninstall wdio-video-reporter
npm install @wdio/video-reporter --save-dev
```

コミュニティパッケージは ffmpeg を自前でインストールしていました。`@wdio/video-reporter` はインストールしません。テストを実行する各マシン（CI や Docker イメージを含む）に [ffmpeg をインストール](/docs/video-reporter#install-ffmpeg)するか、`ffmpegPath` オプションまたは `FFMPEG_PATH` 環境変数を設定してください。ffmpeg がない場合、レポーターは警告をログに出力し、ビデオを作成しません。

```sh
brew install ffmpeg                                         # macOS
sudo apt-get update && sudo apt-get install -y ffmpeg       # Ubuntu, Debian
winget install --id Gyan.FFmpeg -e                          # Windows
```

`reporters: ['video']` はそのままです。WebdriverIO はこの名前に対して `@wdio/video-reporter` を読み込みます。`wdio-video-reporter` からのインポートを `@wdio/video-reporter` に置き換えてください。オプションは同じですが、以下の変更があります:

- `snapshotCommands` は W3C WebDriver エンドポイントの最後の部分を使用します。以前のデフォルトには `buttonup`、`moveto`、`keys`、`accept_alert` などの JSON Wire Protocol の名前も含まれていました。これらの名前は v10 のコマンドには決してマッチしません。[デフォルトリスト](/docs/video-reporter#snapshotcommands)の名前（たとえば `actions`、`value`、`accept`）を使用してください。
- WebDriver BiDi セッションでは、レポーターは `url`、`back`、`forward`、`refresh`、`actions` の後にもフレームを取得します。
- WebDriver BiDi セッションでは、レポーターは WebDriver BiDi でフレームを取得し、次のコマンドは前のコマンドのフレームを待機します（Chrome では約 50〜70 ms）。これにより、各フレームがそのコマンドのページを表示します。以前は Chrome で、WebDriver BiDi のナビゲーション開始時のスクリーンショットによってテストが 10 秒待機することがありました。
- マルチリモートセッションでは、最初のインスタンスのコマンドのみがフレームを取得します。以前は、各インスタンスのコマンドが最初のインスタンスのフレームを取得していました。
- `GET` コマンドはページを読み取るだけなので、`recordAllActions` の場合を除きフレームを生成しません。以前は、`getUrl`、`getSize`、`getValue` がフレームを生成していました。それらのエンドポイントの最後の部分（`url`、`rect`、`value`）が `snapshotCommands` に含まれていたためです。
- ビデオファイル名の日付は、どのマシンでも `YYYY-MM-DD--HH-MM-SS-mmm` になります。以前はマシンのロケールを使用していました。
- `videoFormat` は `webm`（デフォルト）と `mp4` を受け付けます。以前は `videoFormat: 'default'` で mp4 ビデオが作成されていましたが、現在は警告をログに出力して webm ビデオを作成します。`videoFormat: 'mp4'` を使用してください。
- Allure レポーターを使用している場合、ビデオのないテストに空のビデオ添付が付かなくなりました。

### HTML レポーター

`wdio-html-nice-reporter` は WebdriverIO リポジトリに移され、[`@wdio/html-reporter`](/docs/html-reporter) になりました。古いパッケージは v9 専用です。

```sh
npm uninstall wdio-html-nice-reporter
npm install @wdio/html-reporter --save-dev
```

レポーター名は `html` です。`reporters` 内の名前とインポートを変更してください:

```diff
- import { ReportAggregator } from 'wdio-html-nice-reporter'
+ import { ReportAggregator } from '@wdio/html-reporter'

  reporters: [
-     ['html-nice', { outputDir: './reports/html-reports/' }]
+     ['html', { outputDir: './reports/html-reports/' }]
  ]
```

オプションは同じです。以下も変更してください:

- `ReportEvents` は `@wdio/html-reporter` から取得します。`@rpii/wdio-report-events` を引き続き使用しているテストも動作します。どちらも同じイベントを送信するためです。
- コマンドラインスクリプトは `node_modules/@wdio/html-reporter/build/makeReport.js` です。以前は `node_modules/wdio-html-nice-reporter/lib/makeReport.js` でした。
- Cucumber では、レポートはステップではなくシナリオを数え、再試行されたシナリオは最後の試行のみを数えます。

## `$` は厳格になりました

`$` は __ちょうど 1 つ__ の要素を表すようになりました。セレクターが複数の要素に解決された場合、コマンドは黙って最初のマッチを使う代わりに `StrictSelectorError` をスローします:

```js
// v9 — ボタンが 12 個あっても最初のボタンをクリックする
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

これは [Playwright のロケーター](https://playwright.dev/docs/locators#strictness)と同じ挙動です。Cypress は異なります。そのクエリは複数の要素に解決されることがあり、デフォルトで複数要素のサブジェクトを拒否するのは [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) などのアクションコマンドです。黙って複数の要素に解決されるセレクターは、ほぼ常に潜在的なバグです。今日はパスしても、誰かがページに 2 つ目のボタンを追加した途端に誤った要素を操作してしまいます。

このルールは、チェーンのすべてのステップ（`$('form').$('input')`）と、`$` が受け付けるすべてのセレクタータイプに適用されます。文字列セレクター（shadow DOM を貫通するものを含む）、JS 関数、モバイルセレクター、カスタムストラテジーの参照です。

### 変わらない点

- `$$` は引き続き 0 個以上の要素を返します。
- 専用のヘルパーコマンドである `custom$`、`shadow$`、`react$` は厳格ではありません。引き続き最初のマッチを返し、対応する `$$` 版も同様です。
- 何にもマッチしないセレクターは引き続き遅延解決される要素を返すため、`waitForExist` と[自動待機](/docs/autowait)は以前と同じように動作します。
- `$(await browser.getActiveElement())` のように要素参照を渡す場合は、常に単一のノードを指すため、チェックされることはありません。

### スイートの監査方法

これには codemod はありません。2 つ目のマッチがバグなのか意図的なのかは、あなたにしか判断できません。実践的なアプローチは 2 つあります:

1. __スイートを実行する。__ すべての違反はセレクターとマッチ数とともにスローされるため、通常はその場で修正するのに十分です。
2. __広すぎるセレクターを事前にチェックする。__ ページオブジェクト内の汎用的な `$(...)` それぞれについて、実際にいくつの要素にマッチするかを出力します:

   ```js
   console.log(await $$('button').length) // 12 → `$('button')` は広すぎる
   ```

その後、セレクターを絞り込むか（理想的には `$('button=Submit')` や `$('aria/Submit')` のようなユーザー向けのクエリへ。[セレクター](/docs/selectors)を参照）、最初のマッチが欲しいことを明示してください:

```js
await $('button[type="submit"]').click()
// ...または、本当に最初のものが目的の場合
await $$('button')[0].click()
```

### オプトアウト

単一のクエリの場合:

```js
await $('button', { strict: false }).click()
```

プロジェクト全体で v9 の挙動に戻す場合:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

要素は自分がどのようにクエリされたかを記憶しているため、stale な要素参照の後や `waitForExist` を通じて再取得する場合も、元の呼び出しの厳格さが維持されます。

:::info

内部的には、厳格な `$` は `findElement` の代わりに `findElements` リクエストを発行します。マッチ数を数えることがルールを強制する唯一の方法だからです。どちらにしてもラウンドトリップは 1 回ですが、`findElement` コマンドをキーにしているカスタムサービスや WebDriver モックからはこの違いが見えます。

:::

## `await` 前の要素リスト

v10 以降、`$$()` は [`ElementArray`](/docs/api/browser/$$) を返します。これは `await` できる本物の配列です。v9 では、await されていない `$$()` は Promise でした。

| `await` 前の `$$('li')` | v9 | v10 |
| --- | --- | --- |
| `instanceof Promise` | `true` | `false` |
| `Array.isArray()` | `false` | `true` |
| `then`、`catch`、`finally` | 関数 | 関数（リストが読み込まれるまで） |

リストが読み込まれるまでは、`length` は Promise であり、`[...list]`、`Array.from(list)`、`for...of` は `Cannot synchronously iterate over an element list that has not resolved yet` をスローします。

`custom$$`、`shadow$$`、`react$$`、およびマルチリモートブラウザ上の `$$()` についても同様です。await されていない `$()` は引き続き Promise です。

`await` すると、読み込まれて `then` を持たない同じリストが得られます。その後は `length` が数値になり、`for...of`、`[...list]`、`Array.from()` が動作します。`await` の前は、`for await`、インデックス（`$$('li')[0]`）、`at()`、`slice()`、非同期イテレーションメソッド（`map`、`filter`、`forEach` など）を使用できます。これらのメソッドは Promise を返すので、インデックスを読む前に `filter()` の結果を `await` してください。

`$$(selector)` リストの末尾を超えたインデックスは、`await` の後でも `undefined` ではありません。それはリストがそのインデックスに到達するのを待つ要素であり、`await` 前の `$$('li')[5]` と同じです。`isExisting()` は `false` を返し、`getText()` などのコマンドは `Index out of bounds` をスローします。どちらも `waitforTimeout` の後です。v9 では、`(await $$('li'))[5]` は `undefined` でした。そのため `if (list[5])` は常に true になり、`list.at(5)` が `undefined` になることはありません。待機しない `length` とインデックスを比較してください:

```diff
  const list = await $$('li')
- if (list[5]) {
+ if (list.length > 5) {
```

`await` の後では、負のインデックスや、`slice()` または `filter()` によるリストは、末尾を超えると `undefined` を返します。`await` の前では、0 以上の整数インデックスによる `list[i]` と `at()` は Promise を返し、これは常に truthy です。

値が `Promise` の場合にのみ await するコードや、`await` なしで `length` を読み取るコードはスローしません。Promise を長さとして読み取ってしまいます。`list.length > 0` や `for (let i = 0; i < list.length; i++)` のようなループは `false` と判定しますが、`if (list.length)` や `list.length !== 0` は `true` と判定します。常に値を `await` してください。すでに読み込まれた値に対する `await` はその値を返します:

```diff
- if (value instanceof Promise) {
-     value = await value
- }
+ value = await value
```

```diff
- if ($$('button').length > 0) {
+ if (await $$('button').length > 0) {
```

## レガシーなコマンドシグネチャ {#legacy-command-signatures}

v9 は古い位置引数の形式も警告付きで受け付けていました。v10 はオプションオブジェクトのみを受け付けます。

v10 の [codemod](https://github.com/webdriverio/codemod) は、第 3 引数がブール値の `addCommand` と `overwriteCommand`、`getHTML(true)` と `getHTML(false)`、フィルターが文字列または要素 1 つの配列の `getCookies` を書き換えます。複数の名前を持つ `getCookies` の呼び出しは変更されません。1 つのフィルターは 1 つの名前にマッチするためです。

まず codemod をインストールしてください。WebdriverIO はこれに依存していません。

```sh
npm install jscodeshift @wdio/codemod
npx jscodeshift -t ./node_modules/@wdio/codemod/v10 ./e2e/
```

TypeScript ファイルには `--parser=tsx` を使用してください。

### `addCommand` と `overwriteCommand`

```diff
- browser.addCommand('myFn', fn, true)
+ browser.addCommand('myFn', fn, { attachToElement: true })

- browser.overwriteCommand('click', fn, true)
+ browser.overwriteCommand('click', fn, { attachToElement: true })
```

ブール値の第 3 引数は TypeScript のエラーになります。実行時には次のエラーがスローされます:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

`proto` と `instances` も同じオプションオブジェクトに指定します。コマンドをブラウザにアタッチする場合は第 3 引数を省略してください。

### `getCookies`

文字列および文字列配列のフィルターは拒否されます。[クッキーフィルターオブジェクト](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter)を渡してください。1 回の呼び出しでフィルターできるのは 1 つの名前です。別の名前には再度呼び出してください。

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

引数なしの `getCookies()` は、引き続きページから見えるすべてのクッキーを返します。

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

引数なしの `getHTML()` は、引き続き要素自身のタグを含みます。

### `newWindow`

`windowName` と `windowFeatures` は廃止されました。これらは WebDriver Classic にのみ適用されていました。コマンドは引き続き `type` を受け付けます:

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

タブを開くには `type: 'tab'` を使用してください。

WebDriver BiDi セッションでは、`newWindow()` は新しい[ブラウジングコンテキスト](/docs/api/browsingContext)を返し、それに切り替えません。v9 では切り替えていました。そのため、`newWindow()` の後の `browser.closeWindow()` は、新しいタブではなく最初のタブを閉じるようになりました。新しいタブに対するコマンドは `newWindow()` が返すコンテキストで実行し、そのコンテキストの `closeWindow()` で閉じてください:

```diff
- await browser.newWindow('https://webdriver.io', { type: 'tab' })
- console.log(await browser.getTitle())
- await browser.closeWindow()
+ const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })
+ console.log(await tab.getTitle())
+ await tab.closeWindow()
```

TypeScript では、結果の型は `WebdriverIO.BrowsingContext | { handle, type }` です。WebDriver Classic セッションはウィンドウハンドルを返すためです。BiDi セッションでは型を絞り込んでください: `await browser.newWindow(url, { type: 'tab' }) as WebdriverIO.BrowsingContext`。

ブラウザは最初のタブにとどまります。最初のタブに戻るための `switchWindow()` 呼び出しは削除してください。`switchWindow` は BiDi セッションではスローします。ブラウジングコンテキストモデルについては [`switchToFrame`](#switchtoframe) を参照してください。

### `startActivity`

オプションオブジェクトのみを受け付けます。`appWaitPackage`、`appWaitActivity`、`optionalIntentArguments` は廃止されました。これらは削除された Appium の HTTP エンドポイントにのみ適用されていました。`mobile: startActivity` はこれらを受け付けず、渡すとエラーがスローされます。

```diff
- await browser.startActivity('com.example.app', '.MainActivity')
- await browser.startActivity({
-     appPackage: 'com.example.app',
-     appActivity: '.MainActivity',
-     appWaitPackage: 'com.example.app',
-     appWaitActivity: '.MainActivity',
-     optionalIntentArguments: '--ez extra true',
- })
+ await browser.startActivity({
+     appPackage: 'com.example.app',
+     appActivity: '.MainActivity',
+ })
```

## 削除されたコマンド

`browser.throttle` と非推奨の `touchAction` コマンドは削除されました。

| v9 | v10 |
| --- | --- |
| `browser.throttle('Regular3G')` | [`browser.throttleNetwork('Regular3G')`](/docs/api/browser/throttleNetwork) |
| `browser.touchAction(...)` / `element.touchAction(...)` | タッチポインターを使った [Actions API](/docs/api/browser/action)、またはモバイルコマンドの [`tap`](/docs/api/mobile/tap) と [`swipe`](/docs/api/mobile/swipe) |

Actions API によるタッチジェスチャー:

```js
await browser.action('pointer', { parameters: { pointerType: 'touch' } })
    .move({ x: 100, y: 500 })
    .down()
    .move({ x: 100, y: 100, duration: 300 })
    .up()
    .perform()
```

## `uploadFile`

`browser.uploadFile()` は削除されました。これはローカルファイルを zip 圧縮して Selenium の `file` エンドポイントに POST するもので、WebDriver にも WebDriver BiDi にも含まれていません。ファイル入力には [`element.setFiles()`](/docs/api/element/setFiles) を使用してください。

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

`setFiles` には BiDi セッションが必要です。パスはブラウザによって開かれます。相対パスは `process.cwd()` を基準に解決されます。Selenium Grid のファイルステージングは v10 には含まれません。ノードにバイトを送るために `uploadFile` に依存していたスイートは、ブラウザが読み取れる場所にファイルを置いてから `setFiles` を呼び出す必要があります。

クラシックなローカルセッションでは、`element.setValue('/local/path')` は引き続き、ローカルブラウザがすでに参照できるパスを入力します。生の Selenium エンドポイントは、直接呼び出す Grid ユーザー向けに `browser.file()` として残っています。

## `executeAsync`

`browser.executeAsync` と `element.executeAsync` は削除されました。[`execute`](/docs/api/browser/execute) に `async` 関数を渡してください。関数の戻り値（返された Promise を含む）がコマンドの結果になります。`script` タイムアウトは WebDriver BiDi セッションでも引き続き適用され、それより長く実行されるスクリプトは `script timeout` エラーで失敗します。[`bidiResponseTimeout`](/docs/configuration#bidiresponsetimeout)（デフォルトは 180 秒）より長い `script` タイムアウトを設定する場合は、両方を増やしてください。

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

WebDriver の `done` コールバックは削除してください。最後の引数としてそのコールバックを想定していた文字列スクリプトは、代わりに Promise を返す必要があります。実行時、`executeAsync` は関数ではありません。

## `switchToFrame`

`browser.switchToFrame` は公開コマンドではなくなりました。

WebDriver BiDi セッションでは、`switchFrame` と `switchWindow` はスローします。タブ、ウィンドウ、フレームは、保持する `WebdriverIO.BrowsingContext` です。`browser.url()` はセッションの初期トップレベルコンテキストをナビゲートし、それを返します。`browser.newWindow()` は新しいコンテキストを返し、それに切り替えません。`context.frame()` は子フレームを返します。`context.parent` はそれを開いた元のフレームです。

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` はドキュメントの URL 文字列です。保持しているコンテキストは `context.navigate(url)` でナビゲートしてください。`browser.url()` の読み込みメタデータは `context.request` です。

Classic セッションでは、引き続き要素、またはトップフレームには `null` を指定して `switchFrame` を呼び出してください。そこでは文字列や関数は拒否されます。

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout`

JSON Wire Protocol のキー `page load` は拒否されます。`pageLoad` を使用してください。

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

`implicit` と `script` は変わりません。

## マルチリモートのインスタンスへのアクセス

マルチリモートブラウザは、各セッションを独自のプロパティとして保持しなくなりました。マルチリモート要素も同様です。1 つのセッションを指定するには `getInstance` と `select` を使用します。

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteBrowser` に `myChromeBrowser: WebdriverIO.Browser` を追加する TypeScript の拡張は、実行時のプロパティと一致しなくなりました。その拡張を削除し、`getInstance` を呼び出してください。

テストランナーで `injectGlobals` を有効のままにしている場合、インスタンス名は引き続きグローバルです（`myChromeBrowser.url(...)`）。そのグローバルは単一のセッションです。`browser.myChromeBrowser` ではありません。

コマンドの結果は capability の順序のままです。最初のエントリは capabilities オブジェクトの最初のキーに対応します。

マルチリモートブラウザ上の `browser.$$()` は、通常の `MultiRemoteElement[]` ではなく `WebdriverIO.MultiRemoteElementArray` を返します。これも配列なので、`elements[0]` のようなインデックスでの読み取りは引き続き動作します。

その `map`、`filter`、`forEach`、`find`、`findIndex`、`some`、`every`、`reduce` メソッドは、`WebdriverIO.ElementArray` と同様に非同期であり、`await` の後でも Promise を返します。`custom$$()`、`react$$()`、`shadow$$()` が返すリストも同様です。v9 では、これらは通常の配列の同期メソッドでした:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

`custom$()`、`react$()`、および要素上の `shadow$()`、`nextElement()`、`previousElement()`、`parentElement()` は、`$()` と同様に 1 つの `WebdriverIO.MultiRemoteElement` を返します。v9 では、インスタンスごとに 1 つの要素を通常の配列で返していました。1 つのブラウザの要素は `getInstance` で読み取ってください:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

`custom$$()`、`react$$()`、および要素上の `shadow$$()` は、`$$()` と同様に 1 つの `WebdriverIO.MultiRemoteElementArray` を返します。v9 では、インスタンスごとに 1 つのリストを通常の配列で返していました。各エントリはすべてのインスタンスを対象とします。見つかった要素が少ないインスタンスには、そのインデックスの要素がありません:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteElement['selector']` は、`WebdriverIO.Element['selector']` と同様に `Selector` 型を持ちます。v9 では `string` 型でしたが、値は関数やカスタムストラテジーの参照の場合もありました。それを文字列として使う TypeScript コード（たとえば `element.selector.includes('…')`）は、まず型をチェックする必要があります。

`WDIO_ENABLE_MULTI_REMOTE_SELECT` と `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY` は削除されました。`select()` は常に利用可能で、`$$()` は常に上記の要素配列を返します。両方の変数を削除してください。

## バイナリのモックレスポンス

`mock.respond()` と `mock.respondOnce()` は `Uint8Array` と `ArrayBuffer` のペイロードを受け付けます。グローバルの `Buffer` がないコンポーネントテストでの polyfill された `Buffer` も含みます。

`mock.getBinaryResponse()` は `Uint8Array | null` として型付けされるようになりました。Node.js では引き続き `Buffer` を返しますが、ブラウザでは `Uint8Array` を返します。Node.js で Buffer 固有のメソッドを使うには、まず null でない結果を変換してください:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## マルチリモートのネットワークモック

マルチリモートブラウザ上の `browser.mock()` は、モックの配列ではなく `WebdriverIO.MultiRemoteMock` を返します。`respond`、`restore`、その他のモックメソッドはすべてのインスタンスで実行されます。キャプチャされたリクエストは、1 つのブラウザのモックから読み取ってください。グローバルの `WebdriverIO` 名前空間の `WebdriverIO.MultiRemoteMock` 型を使用してください。

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

`getInstance` は、名前が `instances` のいずれでもない場合に `Multi-remote object has no instance named "<name>"` をスローします。`browser.select('myFirefoxBrowser', 'myChromeBrowser')` から作成したモックは、それらのインスタンスをその順序で列挙し、`browser.instances` とは異なる場合があります。`mocks[0]` が特定のブラウザであると想定しないでください。

## バックエンドをスキップするモックレスポンス

`mock.respond(..., { fetchResponse: false })` はバックエンドを呼び出しません。v9 では、`statusCode` や `responseHeaders` でもフィルターするモックはそのフィルターを無視し、マッチするすべてのリクエストに応答していました。v10 では、`respond()` と `respondOnce()` はスローします。これらのフィルターはバックエンドのレスポンスからしか判断できないためです。

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

フィルターを維持するには、`fetchResponse` を省略してください。そうすればモックはレスポンスを取得し、ステータスやヘッダーをチェックしてから、ボディを置き換えます。

## 要素参照 {#element-references}

要素 ID は W3C WebDriver のキー `element-6066-11e4-a52e-4f735466cecf` と `elementId` プロパティを使用します。JSON Wire Protocol のフィールド `ELEMENT` は、要素の契約に含まれなくなりました。

`WebdriverIO.Element` は `ELEMENT` を宣言しなくなりました。要素インスタンスがすでに公開している `element.elementId` を読み取ってください。

`browser.execute`、および要素をページに送る組み込みスクリプト（`getHTML`、`isClickable`、`isDisplayed`、`scrollIntoView` など）は、W3C の参照のみを渡します:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

`{ ELEMENT: '...' }` のみを含む find-element のボディは要素ではありません。W3C のキーを含めてください。両方のキーがある場合、WebdriverIO は W3C の ID を使用します。

Jasmine は、チェーンされた `$()` の結果を `toJSON` を通じて出力します。その値は同じ W3C の参照 `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }` です。

WebDriver BiDi では、`NodeList`（たとえば `querySelectorAll` から）や `HTMLCollection`（たとえば `element.children`）を返すスクリプトは、WebDriver Classic と同様に要素参照のリストを返すようになりました。v9 では生の BiDi 値を返していたため、`browser.execute` は要素ではないオブジェクトを返し、`querySelectorAll(...)` を返す `custom$` や `custom$$` のストラテジーは要素を見つけられませんでした。`Array.from(document.querySelectorAll(...))` のような回避策は引き続き動作しますが、削除できます:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## React セレクター

`react$` と `react$$` は、`createRoot` または `ReactDOM.render` で起動するアプリについて、React 16 から 19 で動作するようになりました。以前は、`browser.react$` と `browser.react$$` は React 18 以降で失敗し（`Could not find the root element of your application`）、またどのバージョンでも結果が最後の更新前のレンダリングから来る可能性があったため、状態の変更によって追加されたコンポーネントが見つかりませんでした。

React がまだルートをレンダリングしていないページでは、コマンドは失敗する前に最大 5 秒間待機するようになりました。以前は即座に失敗していたため、遅れて起動したアプリが見つかりませんでした。

コマンドは [resq](https://github.com/baruchvlz/resq) ライブラリを使用しなくなり、WebdriverIO もそれをインストールしなくなりました。セレクターのルールは変わりませんが（[React セレクター](/docs/selectors#react-selectors)を参照）、以下の例外があります:

- `props` と `state` の両方を指定した `react$` は、両方にマッチするコンポーネントを見つけます。以前は `state` も指定されている場合に `props` を無視していました。
- `react$$` は各 DOM ノードを 1 回だけ返します。以前は、一部のブラウザで高階コンポーネントとその子が同じ要素を 2 回返していました。
- フラグメントを含むフラグメントは、ノードの 1 つのフラットなリストを返します。以前は `react$` がリストを返すことがありました。
- `null` 値を持つフィルターが動作します。以前は `Cannot convert undefined or null to object` で失敗していました。
- 要素スコープがない場合、コマンドはページのすべての React ルートを、ドキュメント順に検索します。他のルート内のルートや、オープンな shadow root 内のルートも含みます。`react$` は最初のマッチを返します。以前は最初のルートのみを検索しており、React がまだレンダリングしていないルートやアンマウントしたルートも対象にし、shadow root は検索しませんでした。複数のルートを持つページでは、`react$$` がより多くの要素を返す可能性があります。1 つのルートのみを検索するには、そのコンテナに対してコマンドを呼び出してください。たとえば `$('#root').react$$('MyComponent')` です。
- 他のルート内にあるルートのコンテナに対しては、コマンドは内側のルートを検索します。以前は外側のルートを検索していました。
- フレームのブラウジングコンテキストや、フレームの要素に対して、コマンドが動作します。以前は、コンテキストのコマンドは `this.executeScript is not a function` で、要素のコマンドは `Could not find instance of React in given element` で失敗していました。

内部スクリプト `webdriverio/scripts/resq` は削除されました。

## コンポーネントテスト

`@wdio/browser-runner` は、`@vitest/spy` 5（以前は 3）から `fn`、`spyOn`、モックの型を再エクスポートします。コードが `new` で呼び出すモックには、`function` または `class` の実装が必要です。アロー関数は `is not a constructor` をスローし、`mockReturnValue` はモックが `new` で呼び出されるとスローします。

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

その他のスパイの変更については、[Vitest の移行ガイド](https://vitest.dev/guide/migration)を参照してください。

## Puppeteer

`webdriverio` は Puppeteer 25 を含む `puppeteer-core` `>=24 <26` を受け付けます。`getPuppeteer()` と `@wdio/lighthouse-service` はこの系列でテストされています。

## ESLint

`eslint-plugin-wdio` には ESLint 10 が必要です。ESLint 9 は 2026-08-06 に [end of life](https://eslint.org/version-support/) を迎え、サポート対象外となりました。TypeScript を使う場合は、`typescript-eslint` 8.56.0 以降を使用してください。

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

`eslint-plugin-wdio` は flat config の `flat/recommended` のみをエクスポートします。eslintrc の名前 `plugin:wdio/recommended` は削除されました。

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

`typescript-eslint` パッケージがインストールされている場合、推奨設定は `wdio/await-expect` の代わりに型情報を使う `wdio/no-floating-promise` ルールに切り替わります。`@typescript-eslint/eslint-plugin` のみをインストールするだけでは不十分です。

```sh
npm install --save-dev typescript typescript-eslint
```

このモードでは、設定はマッチするすべてのファイルを TypeScript のプロジェクトサービスで解析します。対象を TypeScript ファイルに限定し、それらが `tsconfig.json` に含まれていることを確認してください:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

TypeScript プロジェクトに含まれていない、マッチした JavaScript ファイル（`wdio.conf.js` など）は "was not found by the project service" で失敗します。JavaScript ファイルも lint するには、`"allowJs": true` を設定し、それらを `tsconfig.json` の `include` に追加し、パターンを `**/*.{js,mjs,cjs,ts,mts,cts,tsx}` に広げてください。

## カスタムフレームワーク

カスタムフレームワークアダプターの `setupExpect` は、マッチャーの `Map` を受け付けなくなり、ランナーはマッチャーオブジェクトに `entries` メソッドを追加しなくなりました。`Object.entries(wdioMatchers)` で反復処理してください。

## Firefox プロファイル

`@wdio/firefox-profile-service` は `legacy` をサービスオプションとして扱わなくなりました。このフラグは Firefox 55 以前にのみ適用されていました。削除してください。残った `legacy: true` は、`legacy` という名前の設定項目としてプロファイルに書き込まれます。

## WebDriver プロトコル

すべてのセッションは [W3C WebDriver](https://w3c.github.io/webdriver/) セッションです。WebdriverIO は JSON Wire Protocol も Mobile JSON Wire Protocol も話しません。v9 でそれらのコマンドは削除されました。v10 では、それらのプロトコルが使用していたレスポンスのエンベロープも廃止されたため、それをまだ返すサーバーではセッションを開始できません。

`browser.isW3C` は削除されました。以前ワーカーの `sessionStarted` メッセージで転送されていた値も含みます。`attach` に `isW3C` を渡しても無視されます。BiDi のコマンドセットはクライアントに残ります。ライブな BiDi 接続は引き続き `webSocketUrl` に依存します。

### BiDi での `browser.back()` と `browser.forward()`

呼び出し側は引き続き `await browser.back()` と `await browser.forward()` です。どちらのコマンドも引数を取らず、値も返しません。

BiDi セッションでは、これらのコマンドはトップレベルのブラウジングコンテキストに対して `delta` を `-1` または `1` として `browsingContext.traverseHistory` を呼び出し、その後 `pageLoadStrategy` に対応するドキュメントの準備状態を待ちます。`none` は traversal コマンドが受け付けられた時点で戻ります。`eager` は `browsingContext.domContentLoaded` を待ちます。デフォルトの `normal` は `browsingContext.load` を待ちます。back-forward キャッシュからの復元ではこれらのイベントは発生しません。コミットされたドキュメントの `readyState` がすでにストラテジーに一致している場合、コマンドは戻ります。待機にはセッションのページ読み込みタイムアウト（`timeouts.pageLoad`、未設定時は 300000 ms）が使われます。Classic セッションは引き続き `POST /session/:sessionId/back` と `POST /session/:sessionId/forward` に POST します。

履歴エントリが存在しない場合は引き続き reject されます。BiDi では、メッセージは `browsingContext.traverseHistory` から来て、クラシックな WebDriver のエラーテキストではなく `no such history entry` を含みます。期待される準備状態に到達しない traversal は、`History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` または `browsingContext.load` で reject されます。

### 新規セッションのレスポンス

Create Session は W3C のボディを返す必要があります。WebdriverIO は `value.sessionId` と `value.capabilities` を読み取ります:

```json
{
  "value": {
    "sessionId": "8e8a5c2e",
    "capabilities": {
      "browserName": "chrome",
      "browserVersion": "131.0.6778.85"
    }
  }
}
```

JSON Wire Protocol のボディは拒否されます。そのボディは `sessionId` と `status` を `value` の横に置き、capabilities を `value` 自体に置きます:

```json
{
  "sessionId": "8e8a5c2e",
  "status": 0,
  "value": {
    "browserName": "chrome",
    "version": "131.0"
  }
}
```

その場合、セッション作成は `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` をスローします。`value.sessionId` が存在していても、`value.capabilities` がない場合は同じエラーが発生します。

設定内のフラットな capability オブジェクトは引き続き有効です。WebdriverIO はリクエストを送信する前に `{ browserName: 'chrome' }` を `alwaysMatch` でラップします。ベンダー接頭辞付きのキーと W3C capability セット外のキーが混在している場合は、引き続き拒否されます。ベンダーの設定は `sauce:options`、`bstack:options`、`appium:options`、またはその他の接頭辞付きキーに入れてください。

### コマンドのレスポンス

コマンドの結果は `{ "value": … }` です。`value` に `error` がない HTTP 200 が成功です。存在しない要素は、`value.error` が `"no such element"` に設定された HTTP 404 であり、これにより引き続き遅延要素の検索が可能です。ボディ上の数値の `status` は無視されます。`status: 0` や古い `status: 7`（"no such element"）コードも含みます。代わりに W3C のエラーオブジェクトを送信してください。

エクスポートされていたエラー型 `JSONWPCommandError` は `SessionRequestError` になりました。

### サーバー

WebdriverIO が対象とするドライバーは、すでにクライアント接続で W3C を話します:

- ChromeDriver は Chrome 75 以降、デフォルトで W3C です。Chromium ベースの Edge も同様です。現在の ChromeDriver は依然として `goog:chromeOptions.w3c: false` を受け付け、そのセッションだけをレガシープロトコルに戻します。WebdriverIO はその切り替えをサポートしません。
- geckodriver と Apple の safaridriver は W3C のみです。`platformName` や `browserVersion` を省略した Safari のレスポンスも W3C です。
- Selenium 4 と Grid 4 は W3C を話します。Grid は 4.9 で JSON Wire Protocol の変換を停止しました。
- Appium 2 は JSON Wire Protocol と Mobile JSON Wire Protocol を廃止しました。Appium 3 は残っていたパラメーターの形式も廃止しました。v10 には Appium 3 が必要です（後述）。`setWindowRect` を省略したモバイルセッションも W3C です。この capability は、デバイスがウィンドウのサイズを変更できないことを意味します。

次のサーバーは依然として JSON Wire Protocol を話すため、サポートされません: Selenium 3、PhantomJS、EdgeHTML（`--jwp`）、直接接続した WinAppDriver。Appium Windows ドライバーは W3C クライアントとして引き続きサポートされます。これはコマンドを WinAppDriver に変換し、Get Element Property も属性エンドポイントに変換します。WebdriverIO の接続先は WinAppDriver のポートではなく Appium にしてください。

[`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) を使っても、それらのサーバーは v10 で動作しません。セッションの起動には引き続き上記の W3C ボディが必要で、コマンドの結果は引き続き数値の `status` を無視します。そのサーバーが引き続き必要な場合は、WebdriverIO 9 にとどまってください。

`webdriver.remote.sessionid` は Selenium スタンドアロンセッションの目印ではなくなりました。Selenium Grid 4 は引き続き `se:cdp` から検出されます。

`page load` タイムアウトのキーについては [`setTimeout`](#settimeout) を参照してください。要素 ID については[要素参照](#element-references)を参照してください。デスクトップでは、`[name="..."]` は CSS セレクターです。`name` ロケーターストラテジーはモバイルセッション向けに残っています。

## Appium

WebdriverIO 10 には **Appium 3** と現行の公式ドライバー（UiAutomator2、XCUITest、Espresso、Windows、Mac2 など）が必要です。Appium 1.x と 2.x はサポートされません。サーバーをアップグレードできない場合は WebdriverIO 9 にとどまってください。

```sh
npm i -D appium@^3
appium driver update installed
```

`@wdio/appium-service` は `>=3` のオプションの `appium` peer を宣言しており、古いサーバーの起動を拒否します。`create-wdio` は、Appium が存在しないか 3 より古い場合に `appium@^3` をインストールします。

まだ Appium 2 を提供しているクラウドベンダーでは Appium 3 のイメージが必要です。そうでなければ WebdriverIO 9 にとどまる必要があります。

### モバイルコマンドは HTTP にフォールバックしなくなりました

v9 では、多くのモバイルヘルパーが `browser.execute('mobile: …')` を試し、unknown-method エラーの場合は削除された Appium の HTTP エンドポイントにフォールバックしていました。v10 ではそのフォールバックは廃止され、同じエラーが Appium 3 へのアップグレードを促します。WebdriverIO のモバイルコマンド（`browser.lock()`、`browser.shake()` など）か、`browser.execute('mobile: …')` を直接使用してください。

### 削除されたプロトコルコマンド

Appium 3 は[多くの非推奨のベースドライバーのエンドポイントを削除しました](https://appium.io/docs/en/latest/guides/migrating-2-to-3/)。WebdriverIO は、それらのルートのほとんど（たとえば `appiumLock`、`touchPerform`、Mobile JSON Wire Protocol のマップ）についてクライアントメソッドを公開しなくなりました。代わりに W3C Actions、対応するモバイルコマンド、またはドライバーの `mobile:` execute メソッドを使用してください。

### Appium の `--allow-insecure` のスコープ

Appium 3 では、`--allow-insecure` の機能にドライバーまたは `*` のスコープ接頭辞が必要です。たとえば `uiautomator2:adb_shell` や `*:adb_shell` です。

### 接頭辞なしの Appium capabilities は Appium セッションを選択しなくなりました

`appium:` 接頭辞なしの `automationName`、`deviceName`、`appiumVersion` は、WebdriverIO にブラウザドライバーをスキップして Appium サービスをアタッチするよう指示しなくなりました。接頭辞付きの capability を使うか、`appium:options` の下にネストしてください:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

`wdio repl` は、`appium:app`、`appium:platformVersion`、`appium:udid` を含め、これらの接頭辞付きキーを出力するようになりました。

### モバイルでの `getValue` は要素のプロパティを読み取ります

`element.getValue()` は、Appium 3 を含むすべてのセッションで Get Element Property を呼び出します。以前はモバイルセッションで Get Element Attribute を呼び出していました。

### `stopRecordingScreen` のシグネチャが `startRecordingScreen` に揃えられました

`driver.stopRecordingScreen` は、以前の 4 つの引数ではなく、`driver.startRecordingScreen` に揃えて単一の `options` 引数のみを受け付けるようになりました。個々の引数をオブジェクト内に移動してください:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## マルチリモートの命名

`multiremote` または `Multiremote` と綴られていた API は、キャメルケース / パスカルケースの `multiRemote` / `MultiRemote` になりました。古い名前にエイリアスはありません。

| v9 | v10 |
|----|-----|
| `multiremote()` (`webdriverio`) | `multiRemote()` |
| `WebdriverIO.MultiremoteConfig` | `WebdriverIO.MultiRemoteConfig` |
| ブラウザ、`$` と `$$` の結果の `isMultiremote` | `isMultiRemote` |
| `Capabilities.RequestedMultiremoteCapabilities` | `Capabilities.RequestedMultiRemoteCapabilities` |
| `Capabilities.WithRequestedMultiremoteCapabilities` | `Capabilities.WithRequestedMultiRemoteCapabilities` |
| `runner.isMultiremote`（レポーター） | `runner.isMultiRemote` |
| `Launcher#isMultiremote`、`Launcher#isParallelMultiremote` (`@wdio/cli`) | `isMultiRemote`、`isParallelMultiRemote` |
| `Workers.WorkerMessage`、`WorkerInstance` (`@wdio/local-runner`) および `SpecReporter#getTestLink()` の `isMultiremote` | `isMultiRemote` |
| `browser.multiremoteFetch()` (`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

`multiremote` と `Multiremote` を（大文字小文字を区別して）検索し、すべてのマッチを置き換えてください。Allure レポートでも、マルチリモートのテストには `isMultiremote` の代わりに `isMultiRemote` のラベルが付きます。

## Linux の仮想ディスプレイ

`@wdio/xvfb` は `@wdio/display-server` に置き換えられました。各ワーカーを `xvfb-run` でラップする代わりに、テストランナーはどのサービスの `onPrepare` フックよりも前に、実行全体で 1 つのディスプレイサーバーを起動します。ヘッドレスモードの Weston を優先し、Xvfb にフォールバックします。詳細は[ヘッドレスとディスプレイサーバー](/docs/headless-and-display-servers)を参照してください。

オプションの名前が変わりました。古い名前は v10 では引き続き動作しますが非推奨の警告をログに出力し、v11 で削除されます。両方の名前を設定した場合は新しい名前が優先されます:

```diff
- autoXvfb: false,
+ displayServerEnabled: false,
- xvfbAutoInstall: true,
+ displayServerAutoInstall: true,
- xvfbAutoInstallMode: 'sudo',
+ displayServerAutoInstallMode: 'sudo',
- xvfbAutoInstallCommand: 'my-install-command',
+ displayServerAutoInstallCommand: 'my-install-command',
```

`xvfbMaxRetries` と `xvfbRetryDelay` は効果がなく、これらも v11 で削除されます。起動は再試行されなくなりました。Weston の起動に失敗するとテストランナーは Xvfb を試し、どちらも起動しない場合はディスプレイなしで実行を続けます。

名前が変わった 4 つのオプションのいずれかを代替なしで設定し、かつ `displayServer` を設定していない設定は、v9 と同様に Xvfb を使い続けます。ディスプレイサーバーを無効にしていない限り、`Preferring Xvfb, as v9 did, because the config sets v9 display keys` もログに出力されます。オプションの名前を変更したら、Xvfb を維持するには `displayServer: 'xvfb'` を追加し、Weston を優先するには省略してください。auto モードでは、カスタムのインストールコマンドはまず Weston のために実行され、Weston がまだ利用できないか起動に失敗し、かつ Xvfb がまだ存在しない場合にのみ、Xvfb のために再度実行されます。そのため、もう一方のサーバーの試行をスキップするには、`displayServer` をそのコマンドがインストールするサーバーに設定してください。

自動インストールは、v9 が `dnf` のないホストで使用していた `yum` をサポートしなくなりました。v10 は `apt-get`、`dnf`、`zypper`、`pacman`、`apk`、`xbps-install` のみを検出するため、`yum` しかないホストでは Xvfb を自分でインストールしてください。

`xvfbAutoInstallCommand` の配列は v9 ではシェルを通じて実行されていたため、`&&` や `VAR=value` のような要素が動作していました。配列はどちらのオプション名でもシェルなしで実行されるようになったため、シェル構文には文字列を使用してください。

その他、気付く可能性のある変更:

- すべてのワーカーが 1 つのディスプレイを共有します。v9 では各ワーカーが独自のディスプレイを持っていました。Chrome と Edge のページがフォーカスを失う可能性があります。[ウィンドウフォーカス](/docs/headless-and-display-servers#window-focus)を参照してください。
- Xvfb のディスプレイ番号は固定されていません。`:99` と想定せず、`DISPLAY` から読み取ってください。
- `WAYLAND_DISPLAY` のみが設定されたホストは、ディスプレイがあるとみなされるようになりました。v9 では `DISPLAY` が未設定だったため、そこでワーカーを Xvfb で実行していました。v10 は何も起動せず、コンポジター上でブラウザウィンドウを開き、実行中は `XDG_SESSION_TYPE`、`GDK_BACKEND`、`ELECTRON_OZONE_PLATFORM_HINT` を `wayland` に設定します。以前と同様に Xvfb で実行するには、`WAYLAND_DISPLAY` を未設定にして `displayServer: 'xvfb'` を設定してください。
- デフォルトの画面は 1920x1080 です。v9 は `xvfb-run` のデフォルトを使用しており、Debian と Ubuntu では 1280x1024、Fedora、RHEL、Arch では 640x480 でした。ベースラインで使っているサイズを維持するには、`displayServerWidth` と `displayServerHeight` をそのサイズに設定してください。
- ブラウザは、ディスプレイサーバーが設定する `XDG_SESSION_TYPE` から Wayland か X11 かを選択します。Weston の場合、WebdriverIO は起動する Chrome と Edge に `--ozone-platform=wayland` も追加します。140 より前の Chrome と Edge（135 より前の Chrome for Testing）は `XDG_SESSION_TYPE` を無視するためです。Weston は `DISPLAY` を提供しないため、テストやツールが X11 を必要とする場合は `displayServer: 'xvfb'` を設定してください。
- `@wdio/xvfb` の `XvfbManager` や `xvfb` インスタンスを直接使っていた場合は、代わりに `@wdio/display-server` の `DisplayServerManager` を使用してください。`xvfb.init()` を実行してコマンドを `xvfb-run` でラップしていた箇所や、`ProcessFactory` を通じてプロセスを起動していた箇所では、ディスプレイを起動し、その環境を必要とするプロセスに渡してください。この例では、v9 が Debian と Ubuntu で使っていたのと同じ 1280x1024 の Xvfb を使用します。`WAYLAND_DISPLAY` のみが設定されたホストでは、先にそれを未設定にしてください。そうしないと `startDaemon()` は何も起動しません:

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // ディスプレイがすでに存在する場合も startDaemon() は null を返す
  if (!daemon && manager.shouldRun()) {
      throw new Error('Xvfb could not be started')
  }
  try {
      const child = spawn('your-command', { shell: true, stdio: 'inherit', env: { ...process.env, ...daemon?.env } })
      const [code] = await once(child, 'exit')
      process.exitCode = code ?? 1
  } finally {
      await daemon?.stop()
  }
  ```

## エミュレーション

`browser.emulate()` は、現在のトップレベルのブラウジングコンテキストに対して WebDriver BiDi のエミュレーションモジュールを駆動します。v9 では、`navigator.geolocation.getCurrentPosition`、`navigator.userAgent`、`window.matchMedia`、`navigator.onLine` にパッチを当てるプリロードスクリプトを注入していました。これらのスクリプトは廃止されました。`browser.emulate('clock', …)` は引き続き、現在のページとその後に開かれたページにフェイクタイマーをインストールします。

BiDi のスコープではリロードが不要になりました。

```diff
  await browser.emulate('onLine', false)
- // `navigator.onLine` だけが変わり、通信は引き続き流れていた
+ // fetch、WebSocket、WebTransport を含め、ブラウジングコンテキストがオフラインになる
```

- `onLine: false` は `{ type: 'offline' }` で `emulation.setNetworkConditions` を呼び出します。`true` とスコープの復元でこれが解除されます。スループットとレイテンシは引き続き `browser.throttleNetwork()` で扱います。
- `colorScheme` は `prefers-color-scheme` メディア特性を設定するため、CSS の `@media (prefers-color-scheme)` は `matchMedia` に従います。
- `userAgent` は、パッチを当てた `navigator.userAgent` プロパティではなく、ブラウザのユーザーエージェントのオーバーライドです。
- `geolocation` はブラウザの位置情報スタックを使用します。ページによっては引き続き `browser.setPermissions({ name: 'geolocation' }, 'granted')` が必要です。`{ error: 'positionUnavailable' }` は座標の代わりにそのエラーを報告します。
- `colorScheme` と `media` は 1 つのメディア特性マップを共有します。後の呼び出しがマップ全体を置き換え、どちらかのスコープを復元するとマップがクリアされます。
- `device` は、デバイス記述子からユーザーエージェント、ビューポート、タッチ、モバイルのテキストレイアウト、viewport meta を設定します。`screen` や `orientation` は変更しません。

新しいスコープは `media`、`locale`、`timezone`、`touch`、`orientation`、`screen`、`viewportMeta`、`textLayout`、`scripting`、`scrollbar`、`forcedColors` です。コマンドを実装していないブラウザは、独自のエラー（`unknown command` または `unsupported operation`）で呼び出しを拒否します。WebdriverIO はプリロードスクリプトや CDP にフォールバックしません。`device` が途中で拒否された場合は、以前のユーザーエージェント、ビューポート、タッチ、テキストレイアウト、viewport meta が元に戻されます。

`wdio session emulate` も同じスコープを受け付けます。即座に適用されるオーバーライドに対してリロードを促すことはなくなりました。`emulate network` のプリセットと `emulate cpu` は変わらず、引き続き Chromium 専用です。[エミュレーション](/docs/emulation)を参照してください。

## 次のステップ

- [移行スキル](#migrate-with-a-coding-agent)をプロジェクトにコピーし、エージェントに適用を依頼する。
- 新しい v10 テストを書くには [コーディングエージェント向け WebdriverIO](/docs/ai-agents) を参照する。
- スイートを Linux で実行する場合は [ヘッドレスとディスプレイサーバー](/docs/headless-and-display-servers) を参照する。