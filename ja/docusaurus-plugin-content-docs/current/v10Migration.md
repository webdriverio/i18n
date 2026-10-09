---
id: v10-migration
title: v9 から v10 へ
description: WebdriverIO v9 プロジェクトを v10 に更新する方法。すべての破壊的変更と、このガイドを適用するコーディングエージェント用スキルを紹介します。
---

このガイドでは、WebdriverIO `v10` の破壊的変更と、それぞれに必要な対応をまとめています。

これまでのメジャーバージョンとは異なり、今回の変更の多くは WebdriverIO の [codemod](https://github.com/webdriverio/codemod) では適用できません。変更が必要かどうかは、テストの実際の意図によって決まるためです。後述の [レガシーなコマンドシグネチャ](#legacy-command-signatures) は機械的に置き換えられます。それ以外のセクションでは、スイート内の影響箇所を見つける方法を説明します。

## コーディングエージェントで移行する

エージェントに v10 移行スキルを渡し、このページに従ってスイートを WebdriverIO v10 に移行するよう依頼してください。スキルには手順が書かれています。何を検索するか、どの codemod を実行するか、どこで止めるかです。各破壊的変更の正しい内容は、このページに記載されています。

アップグレードするプロジェクトでスキルをインストールします。[skills CLI](https://skills.sh) は、このリポジトリの [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) を読み込み、選んだエージェントのスキルディレクトリに書き込みます。

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

`--skill wdio-v10-migration` を指定すると、このスキルがインストールされます。WebdriverIO リポジトリ自体の開発用スキルは internal として扱われ、選択肢には表示されません。CLI はインストール先のエージェントを尋ね、各エージェントのプロジェクトディレクトリにスキルを書き込みます。このファイルをチャットに添付することもできます。

厳格なセレクターと、capability に直接書かれた `specs` / `exclude` リストの問題は、スイートを実行したときにしか表面化しません。スキルはソースコードだけではこれらを判断できません。

## Node.js

WebdriverIO v10 には Node.js 22.19.0 以降が必要です。Node.js 18 と 20 はサポート対象外になりました。CI では Node.js 22、24、26 をテストしています。

## コンポーネントテスト

ブラウザランナーは、引き続き Chrome 90、Edge 90、Firefox 90、Safari 14.1 以降で動作します。[ブラウザサポート](/docs/component-testing#browser-support) を参照してください。

`browser.execute` に渡すコードは ES2021 のままです。テスト対象の古いブラウザでも実行できるようにするためです。この下限は変わっていません。

## Mocha

`@wdio/mocha-framework` と `@wdio/browser-runner` は [Mocha 12](https://mochajs.org/blog/mocha-12-stable/) に依存します。Mocha 12 には Node.js `^20.19.0 || >=22.12.0` が必要です。これは v10 の下限である 22.19.0 で満たされます。

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

`mochaOpts.compilers` は廃止されました。Mocha が長く非推奨だった `--compilers` フラグを削除したため、残っているコンパイラのマッピングは無視されます。トランスパイラやその他のセットアップファイルは `mochaOpts.require` で読み込んでください。

`failHookAffectedTests` のデフォルトは `true` です。`before` または `beforeEach` フックが失敗すると、そのフックのためにスキップされたテストも失敗になります。フックだけを失敗として報告したい場合は、`mochaOpts.failHookAffectedTests` を `false` に設定してください。

`expect-webdriverio` 8 を使用してください。詳しくは [expect-webdriverio 8](#expect-webdriverio-8) を参照してください。Mocha は 1 つのプロセス内でこのパッケージを 2 回読み込むことがありますが、アサーションの状態は両方のコピー間で共有されます([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221))。

`mochaOpts` を通じて影響が出る可能性のある Mocha 12 の変更は次のとおりです。

- `grep` で最新の RegExp フラグを使えるようになりました。
- `ui` は引き続き `bdd`、`tdd`、`qunit`、`exports` のいずれかです。カスタムインターフェースには `*-bdd`、`*-tdd`、`*-qunit` のサフィックスを付けたままにしてください。
- `parallel` は引き続きサポートされません。spec の並列実行は WDIO が管理しており、Mocha のワーカープールを有効にするとエラーになります。

Mocha 12 は ESM ファースト(`"type": "module"`)です。プログラムからの `require('mocha')` は、Node 22 の `require(esm)` により引き続き動作します。WDIO の Mocha CLI(`wdio run … --mochaOpts.*`)は変わっていません。Mocha 自身の CLI は、yargs の代わりに `util.parseArgs` を使うようになりました。

## Cucumber

`@wdio/cucumber-framework` は [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300) に依存します。

Cucumber 13 には Node.js 22、24、26 以降が必要です。Node.js 20、23、25 では動作しません。フレームワークパッケージも同じ範囲を宣言しており、下限は v10 と同じ 22.19.0 です。

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

`tagExpression` にはエイリアスがありません。設定するとエラーがスローされます。古いフィルターが残ったまま、気づかないうちに全シナリオが実行されるのを防ぐためです。

Cucumber 13 は `Cli` をエクスポートしなくなりました。プログラムからの実行には `@cucumber/cucumber/api` の `runCucumber` を使います。アダプターはすでにこれを使用しています。

Cucumber 13 のその他の破壊的変更(曖昧なフォーマッターパス、並列ワーカー、`BeforeAll` / `AfterAll`)は、[Cucumber のアップグレードガイド](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300) に記載されています。

## Jasmine

`@wdio/jasmine-framework` は [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0) に依存します。Jasmine 6 は Node.js 20、22、24 でテストされています。v10 の下限である 22.19.0 は、この範囲に含まれます。

`jasmineNodeOpts` は削除されました。Jasmine の設定には `jasmineOpts` を使ってください。`jasmineNodeOpts` を設定すると、次のエラーがスローされます。

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

`jasmineOpts.failFast` は読み込まれなくなりました。代わりに `jasmineOpts.stopOnSpecFailure` を使ってください。`failFast` が残っていても、スイートは停止しません。Cucumber の `failFast` は別のオプションで、引き続き動作します。

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

`jasmineOpts.stopSpecOnExpectationFailure` は削除されました。代わりに `jasmineOpts.oneFailurePerSpec` を使ってください。古いキーを設定すると、次のエラーがスローされます。

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

Jasmine の同期マッチャーは、再び同期的に動作するようになりました。v9 ではグローバルの `expect` が Jasmine の `expectAsync` だったため、`expect(1).toBe(1)` は Promise を返していました。v10 では、Jasmine の組み込みマッチャーと `jasmine.addMatchers` で追加したマッチャーは `undefined` を返します。WebdriverIO のマッチャー、Jasmine の非同期マッチャー、`jasmine.addAsyncMatchers` で追加したマッチャーは引き続き Promise を返すため、これらには今までどおり `await` を付けてください。`await expect($('#logo')).toBeDisplayed()` を `expectAsync()` に書き換える必要はありません。グローバルの `expect` が、WebdriverIO のマッチャーを自動的に `expectAsync` に渡します。`await expect(1).toBe(1)` も引き続き動作します。

`await` なしの同期アサーションが失敗すると、spec が失敗するようになりました。v9 では、これは reject された Promise になるだけでした。誰も await しなければ spec はパスし、ログに未処理の rejection が残るだけでした。アップグレード後に失敗し始めた spec を確認してください。それらは v9 の時点で失敗が隠れていた spec です。修正すべきなのは `expect` の呼び出しではなく、テストまたはアプリケーションです。

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: `onSave` が呼ばれなくてもパスしていた
    // v10: `onSave` が呼ばれないと失敗する
    expect(onSave).toHaveBeenCalled()
})
```

同期マッチャーの結果は `undefined` になったため、その結果に `.then()` や `.catch()` を呼ぶと `TypeError` がスローされます。

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

この変更によるその他の影響は次のとおりです。

- `oneFailurePerSpec` は、spec 内で最初に失敗したアサーションの時点で spec を停止するようになりました。同期マッチャーではその場で、await した非同期マッチャーでは Promise が確定した時点で停止します。
- Jasmine のスパイマッチャーが `await` なしで動作するようになりました。v9 では、`toHaveBeenCalled`、`toHaveSpyInteractions`、`toHaveNoOtherSpyInteractions` が "Does not take arguments" で失敗し、`await` を付けないと呼ばれていないスパイでもパスしていました。
- `jasmine.addMatchers` が置き換えられなくなったため、Jasmine の "Monkey patching detected" 警告は表示されなくなりました。

`toHaveSize` には 2 つの意味があります。WebdriverIO の値に対しては WebdriverIO のマッチャーとして動作し、要素のサイズをチェックします。対象となる値は、要素、要素配列(`$$().filter()` の結果を含む)、`Element[]`、マルチリモート要素、ブラウザ、ブラウジングコンテキスト、モック、`some()` ラッパー、またはチェーン可能な `$()` のような Promise です。それ以外の値に対しては Jasmine のマッチャーとして動作し、長さをチェックします。v9 では常に Jasmine のマッチャーが実行されていました。

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine、同期
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO、非同期
```

型も同じルールに従います。`@wdio/jasmine-framework` は、グローバルの `expect` に Jasmine のマッチャーの型を付けるようになりました。加えて、Promise を返す WebdriverIO のマッチャーと Jasmine の非同期マッチャーの型も付きます。`tsconfig.json` の `types` から `expect-webdriverio/jasmine-wdio-expect-async` を削除してください。これはすべてのマッチャーを非同期として型付けしてしまうためです。`jasmine` がなければ追加してください。

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

`expect.oneOf()` と `expect.multiRemote()` も Jasmine の spec で動作するようになりました。以前は、実行時の Jasmine の `expect` にこれらは存在しませんでした。

## expect-webdriverio 8

`@wdio/globals`、`@wdio/runner`、`@wdio/browser-runner` は、ピア依存関係として `expect-webdriverio` 8 を必要とします。v9 では `expect-webdriverio` 7 でした。`package.json` に `expect-webdriverio` が含まれている場合は、`@wdio/*` パッケージと同じ変更でバージョン 8 に更新してください。

`expect-webdriverio` 8 には独自の破壊的変更があります。各変更とその置き換え方法は、[v7 から v8 への移行ガイド](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) に記載されています。テストスイートに影響する可能性が特に高いのは、次の変更です。

- `$$()` に対する `toHaveText` は、要素をインデックスごとに比較します。期待値の配列の順序がページと異なると失敗します。ページ上の順序に合わせるか、`expect.oneOf()` または `expect.arrayContaining()` を使ってください。
- 単一の要素に対して期待値の配列を渡すと、`toHaveText`、`toHaveHTML`、`toHaveComputedLabel`、`toHaveComputedRole` は失敗します。`expect.oneOf()` を使ってください。
- `setFeatureFlags()` と `featureFlags` オプションは削除されました。
- 次の非推奨 API が削除されました。`setOptions`(`setDefaultOptions` を使用)、`getConfig`(`getDefaultOptions` を使用)、`matchers`(`wdioCustomMatchers` を使用)、`toHaveAttr`(`toHaveAttribute` を使用)、`toHaveClass`(`toHaveElementClass` を使用)、`toBeRequestedWithResponse()`(`toBeRequestedWith({ response })` を使用)、`expect-webdriverio/types`(`expect-webdriverio/expect-global` を使用)。
- `toBeExisting`、`toBePresent`、`toHaveLink`、`toHaveValue`、`toBeRequested` について、`beforeAssertion` と `afterAssertion` フックは、テストで呼び出したエイリアスの名前を受け取るようになりました。v9 では、エイリアスの背後にあるマッチャーの名前を受け取っていました(例: `toBeExisting` に対して `toExist`)。
- マルチリモートブラウザでは、`$$()` の結果をそのまま `expect` に渡してください。`[...elements]` や `Array.from(elements)` のようなプレーンな配列は要素として認識されず、アサーションが失敗します。

マルチリモートブラウザでは、1 つのアサーションですべてのインスタンスをチェックします。`expect.multiRemote()` を使うと、インスタンスごとに期待値を 1 つずつ指定できます。[マルチリモートのアサーション](/docs/multiremote#assertions) を参照してください。

## マルチリモートのグローバル

小文字の `multiremotebrowser` グローバルは、`@wdio/globals` からも、`eslint-plugin-wdio` のグローバル定義からも削除されました。`multiRemoteBrowser` を使ってください。

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## Capabilities

capabilities 内の `specs` と `exclude` は読み込まれなくなりました。`wdio:specs` と `wdio:exclude` を使ってください。

```diff
  capabilities: [{
      browserName: 'chrome',
-     specs: ['./test/specs/chrome/**/*.js'],
-     exclude: ['./test/specs/chrome/skip.js']
+     'wdio:specs': ['./test/specs/chrome/**/*.js'],
+     'wdio:exclude': ['./test/specs/chrome/skip.js']
  }]
```

設定のトップレベルのキーは、引き続き `specs` と `exclude` です。capability に直接書かれたリストが残っていても、その capability のファイル選択には使われません。その場合、capability はトップレベルの `specs` と `exclude` を使います。

Sauce Labs のオプション型から、`tunnelIdentifier` と `parentTunnel` のエイリアスが削除されました。`tunnelName` と `tunnelOwner` を使ってください。

## TypeScript

`webdriverio` がエクスポートしていた `Element`、`MultiRemoteBrowser`、`MultiRemoteElement` 型は削除されました。グローバルの `WebdriverIO` 名前空間を使ってください。

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

`ChainablePromiseElement` は `then` を宣言するようになり、`ChainablePromiseArray` は `then`、`catch`、`finally` を宣言するようになりました。チェーン可能な型は `await` する前の値を表すため、await した後の値には当てはまらなくなりました。

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

await した値には `WebdriverIO.Element` または `WebdriverIO.ElementArray` の型を付けてください。

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

どちらのチェーン可能な型も `T extends PromiseLike<unknown>` にマッチするようになりました。そのため、`PromiseLike` をチェックする条件型は、`$()` と `$$()` に対して v9 とは異なる分岐を選びます。たとえば、`Awaited<ChainablePromiseElement>` は `WebdriverIO.Element` に、`Awaited<ChainablePromiseArray>` は `WebdriverIO.ElementArray` になりました。

await していない `$$()` のプロパティの型が変わりました。これらはクエリが解決する前から使えるため、`await` や `.then()` なしで読み取ってください。

| プロパティ | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | 親そのもの(Promise ではない。下記参照) |
| `foundWith` | なし | リストを取得したコマンド(例: `$$` や `custom$$`) |
| `props` | なし | そのコマンドの追加引数 |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

`$('form').$$('input')` のようにチェーンしたクエリでは、`parent` はリストが解決するまではチェーン可能な `$('form')` で、解決した後は解決済みの要素になります。`parent` を要素として使う前に、リストを await してください。

実行時には、`$$()` リストに対する `filter()`、`filterSeries()`、`slice()` は、プレーンな配列ではなく要素リストを返します。結果は元のリストの `selector`、`foundWith`、`parent`、`props` を引き継ぎます。v9 では、`filter()` はこれらのプロパティを持たないプレーンな配列を返していました。ただし、型にはまだこれが反映されていません。`filter()` と `filterSeries()` は `Promise<WebdriverIO.Element[]>` を、`slice()` は `WebdriverIO.Element[]` を返すと宣言されているため、結果のこれらのプロパティを読み取ると TypeScript がエラーを報告します。

WebdriverIO は、派生したリストそのもののためにクエリを再実行しません。末尾を超えたインデックスにアクセスしても追加のマッチを待たず、フィルターで除外された要素を返すこともありません。リストのメンバーは元のクエリの要素であり、元の `selector` と `index` を保持しています。メンバーが stale になった場合、WebdriverIO はそのインデックスで元のクエリから要素を再取得します。ページが変わっていれば、別の要素が取得される可能性があります。`parent[foundWith](selector, ...props)` のように、リストのプロパティからクエリを再実行するコードは、フィルター後のリストではなく完全なリストを取得します。

公開パッケージは `typeScriptVersion` を 6.0.3 に設定しています。これは、このリポジトリのコンパイルに使用している TypeScript のバージョンです。

`browser.mock()` は、`urlpattern-polyfill` の `URLPattern` とネイティブの `URLPattern`(Node.js 24 ではグローバルで、TypeScript 6 の `dom` ライブラリで型定義済み)の両方を受け付けます。

TypeScript 6 では `"moduleResolution": "node"` と `"baseUrl"` が非推奨になり、`strict` がデフォルトになりました。`create-wdio` は、ESM プロジェクトでは `"moduleResolution": "bundler"` を、CommonJS プロジェクトでは `"NodeNext"` を生成するようになりました。既存のプロジェクトで TypeScript を更新する場合は、`tsconfig.json` のこれらのオプションを変更してください。

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

CommonJS プロジェクトの場合は、`create-wdio` と同様に、両方のオプションに `NodeNext` を使ってください。

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

TypeScript 6 では `types` のデフォルトも `[]` に変わり、インストール済みの `@types/*` パッケージがすべて読み込まれることはなくなりました。`tsconfig.json` に `types` リストがない場合、Mocha の `describe` や `it` などのグローバルは `Cannot find name` で失敗します。`create-wdio` と同様に、テストで使う型パッケージを列挙してください。たとえば Mocha の場合は次のとおりです。

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

`npm create wdio@latest` は、`compilerOptions.target` と `compilerOptions.lib` を `es2024` として書き込みます。このファイルを型チェックするには、TypeScript 5.7 以降が必要です。設定とテストを実行する `tsx` は型チェックを行わないため、古いコンパイラが問題になるのは、自分で `tsc` を実行する場合だけです。

既存の `tsconfig.json` は書き換えられません。別の設定を継承する生成済みの設定では、親の `target` と `lib` が使われます。

`afterAssertion` フックでは、`params.result` の型が、マッチャーが返すとおりの `{ pass, message }` になりました。v9 では型が `{ result, message }` でしたが、実行時の `params.result.result` は常に `undefined` でした。`params.result.pass` を読み取ってください。

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

`pass` は、値が期待値と一致する場合に `true` になります。これは `.not` を使った場合も同じです。つまり `.not` を使った場合、アサーションは `pass` が `false` のときにパスします。テストが `.not` を使ったかどうかは、フックからはわかりません。

## レポーター

ブラウザの `result` イベントは、`client:afterCommand` としてレポーターに転送されます。そのペイロードと `AfterCommandArgs` 型から `name` プロパティがなくなりました。代わりに `command` を読み取ってください。カスタムコマンドはすでに `command` を送信していました。

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

`@wdio/allure-reporter` の `addEnvironment(name, value)` は削除されました。このメソッドには効果がありませんでした。環境情報の行は、Allure レポーターのオプションの [`reportedEnvironmentVars`](/docs/allure-reporter) で設定してください。

## `$` は厳格になりました

`$` は __ちょうど 1 つ__ の要素を表すようになりました。セレクターが複数の要素にマッチした場合、最初のマッチを黙って使う代わりに、コマンドは `StrictSelectorError` をスローします。

```js
// v9 — ボタンが 12 個あっても、最初のボタンをクリックする
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

この挙動は [Playwright のロケーター](https://playwright.dev/docs/locators#strictness) と同じです。Cypress は異なります。Cypress のクエリは複数の要素に解決されることがあり、複数要素の subject をデフォルトで拒否するのは [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) などのアクションコマンドです。複数の要素に黙って解決されるセレクターは、ほぼ確実に潜在的なバグです。今はパスしていても、誰かがページに 2 つ目のボタンを追加した途端、間違った要素を操作することになります。

このルールは、チェーンのすべてのステップ(`$('form').$('input')`)と、`$` が受け付けるすべてのセレクタータイプに適用されます。文字列セレクター(Shadow DOM を貫通するものを含む)、JS 関数、モバイルセレクター、カスタムストラテジーの参照が対象です。

### 変わっていないこと

- `$$` は引き続き 0 個以上の要素を返します。v10 以降、そのリストは [`ElementArray`](/docs/api/browser/$$) です。これは `await` できる本物の配列で、解決前から `for await` や非同期の `map` / `filter` を使えます。要素数は `await $$('button').length` で取得できます。`$$('button').length > 0` は要素数のチェックになりません。リストが解決するまで、`length` は Promise だからです。`for (const el of $$('button'))` は、リストを await するまでエラーをスローします。`for await` を使うか、`await` した後に `for...of` を使ってください。
- 専用のヘルパーコマンドである `custom$`、`shadow$`、`react$` は厳格ではありません。これらは対応する `$$` 版と同様に、引き続き最初のマッチを返します。
- 何にもマッチしないセレクターは、引き続き遅延解決される要素を返します。そのため、`waitForExist` と [自動待機](/docs/autowait) の動作は以前と同じです。
- `$(await browser.getActiveElement())` のように要素参照を渡した場合は、常に単一のノードを指すため、チェックは行われません。

### スイートの監査方法

これには codemod がありません。2 つ目のマッチがバグなのか意図的なのかは、あなたにしか判断できないからです。実践的なアプローチは 2 つあります。

1. __スイートを実行する。__ 違反があるたびに、セレクターとマッチ数を含むエラーがスローされます。通常はその情報だけで、その場で修正できます。
2. __広すぎるセレクターを事前にチェックする。__ ページオブジェクト内の汎用的な `$(...)` それぞれについて、実際にいくつの要素にマッチするかを出力します。

   ```js
   console.log(await $$('button').length) // 12 → `$('button')` は範囲が広すぎる
   ```

そのうえで、セレクターを絞り込むか(できれば `$('button=Submit')` や `$('aria/Submit')` のようなユーザー視点のクエリにします。[セレクター](/docs/selectors) を参照してください)、最初のマッチが欲しいことを明示してください。

```js
await $('button[type="submit"]').click()
// ...または、本当に最初の要素を意図している場合
await $$('button')[0].click()
```

### オプトアウト

単一のクエリの場合:

```js
await $('button', { strict: false }).click()
```

プロジェクト全体で v9 の動作に戻す場合:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

要素は自身がどのようにクエリされたかを記憶しています。そのため、stale な要素参照の後や `waitForExist` で再取得する場合も、元の呼び出しの厳格さが維持されます。

:::info

内部的には、厳格な `$` は `findElement` の代わりに `findElements` リクエストを送信します。ルールを適用するには、マッチ数を数える以外に方法がないためです。どちらの場合も往復は 1 回ですが、`findElement` コマンドを基準に動作するカスタムサービスや WebDriver のモックからは、この違いが見えます。

:::

## レガシーなコマンドシグネチャ

v9 では古い位置引数の形式も受け付け、警告を出していました。v10 ではオプションオブジェクトのみを受け付けます。

v10 の [codemod](https://github.com/webdriverio/codemod) は、次の箇所を書き換えます。3 番目の引数が boolean の `addCommand` と `overwriteCommand`、`getHTML(true)` と `getHTML(false)`、フィルターが文字列または要素 1 つの配列である `getCookies` です。複数の名前を指定した `getCookies` 呼び出しは、変更されずに残ります。1 つのフィルターは 1 つの名前にしかマッチしないためです。

まず codemod をインストールしてください。WebdriverIO は codemod に依存していません。

```sh
npm install jscodeshift @wdio/codemod
npx jscodeshift -t ./node_modules/@wdio/codemod/v10 ./e2e/
```

TypeScript ファイルには `--parser=tsx` を使ってください。

### `addCommand` と `overwriteCommand`

```diff
- browser.addCommand('myFn', fn, true)
+ browser.addCommand('myFn', fn, { attachToElement: true })

- browser.overwriteCommand('click', fn, true)
+ browser.overwriteCommand('click', fn, { attachToElement: true })
```

3 番目の引数に boolean を渡すと、TypeScript のエラーになります。実行時には次のエラーがスローされます。

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

`proto` と `instances` も、同じオプションオブジェクトに指定します。コマンドをブラウザに追加する場合は、3 番目の引数を省略してください。

### `getCookies`

文字列および文字列配列のフィルターは拒否されます。[Cookie フィルターオブジェクト](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter) を渡してください。1 回の呼び出しでフィルターできる名前は 1 つです。別の名前が必要な場合は、もう一度呼び出してください。

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

引数なしの `getCookies()` は、引き続きページから見えるすべての Cookie を返します。

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

引数なしの `getHTML()` は、引き続き要素自身のタグを含めて返します。

### `newWindow`

`windowName` と `windowFeatures` は廃止されました。これらは WebDriver Classic でのみ有効でした。このコマンドは引き続き `type` を受け付けます。

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

タブを開くには `type: 'tab'` を使ってください。

### `startActivity`

オプションオブジェクトのみを受け付けます。`appWaitPackage`、`appWaitActivity`、`optionalIntentArguments` は廃止されました。これらは削除された Appium の HTTP エンドポイントでのみ有効でした。`mobile: startActivity` はこれらを受け付けず、渡すとエラーがスローされます。

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

`browser.throttle` と、非推奨だった `touchAction` コマンドが削除されました。

| v9 | v10 |
| --- | --- |
| `browser.throttle('Regular3G')` | [`browser.throttleNetwork('Regular3G')`](/docs/api/browser/throttleNetwork) |
| `browser.touchAction(...)` / `element.touchAction(...)` | タッチポインターを使った [Actions API](/docs/api/browser/action)、またはモバイルコマンドの [`tap`](/docs/api/mobile/tap) と [`swipe`](/docs/api/mobile/swipe) |

Actions API を使ったタッチジェスチャーの例:

```js
await browser.action('pointer', { parameters: { pointerType: 'touch' } })
    .move({ x: 100, y: 500 })
    .down()
    .move({ x: 100, y: 100, duration: 300 })
    .up()
    .perform()
```

## `uploadFile`

`browser.uploadFile()` は削除されました。このコマンドは、ローカルファイルを zip 圧縮して Selenium の `file` エンドポイントに送信していましたが、このエンドポイントは WebDriver にも WebDriver BiDi にも含まれていません。ファイル入力の設定には [`element.setFiles()`](/docs/api/element/setFiles) を使ってください。

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

`setFiles` には BiDi セッションが必要です。パスはブラウザによって開かれます。相対パスは `process.cwd()` を基準に解決されます。Selenium Grid のファイルステージングは v10 には含まれていません。`uploadFile` でノードにファイルを送っていたスイートでは、ブラウザが読み取れる場所にファイルを置いてから `setFiles` を呼び出す必要があります。

Classic のローカルセッションでは、`element.setValue('/local/path')` を使って、ローカルのブラウザがすでにアクセスできるパスを引き続き入力できます。Selenium のエンドポイントを直接呼び出す Grid ユーザー向けに、生のエンドポイントは `browser.file()` として残っています。

## `executeAsync`

`browser.executeAsync` と `element.executeAsync` は削除されました。[`execute`](/docs/api/browser/execute) に `async` 関数を渡してください。関数の戻り値(返された Promise を含む)がコマンドの結果になります。`script` タイムアウトは引き続き適用されます。

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

WebDriver の `done` コールバックは削除してください。最後の引数としてこのコールバックを受け取っていた文字列スクリプトは、代わりに Promise を返す必要があります。実行時には、`executeAsync` は関数として存在しません。

## `switchToFrame`

`browser.switchToFrame` は公開コマンドではなくなりました。

WebDriver BiDi セッションでは、`switchFrame` と `switchWindow` はエラーをスローします。タブ、ウィンドウ、フレームはいずれも、手元に保持する `WebdriverIO.BrowsingContext` として扱います。`browser.url()` は、セッションの初期トップレベルコンテキストをナビゲートし、そのコンテキストを返します。`browser.newWindow()` は新しいコンテキストを返しますが、そこに切り替えはしません。`context.frame()` は子フレームを返します。`context.parent` は、そのフレームを開いた元のフレームです。

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` はドキュメントの URL 文字列です。保持しているコンテキストをナビゲートするには、`context.navigate(url)` を使います。`browser.url()` のロードメタデータは `context.request` にあります。

Classic セッションでは、引き続き要素、またはトップフレームを表す `null` を指定して `switchFrame` を呼び出してください。Classic セッションでは、文字列や関数は拒否されます。

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout`

JSON Wire Protocol のキー `page load` は拒否されます。`pageLoad` を使ってください。

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

`implicit` と `script` は変わっていません。

## マルチリモートのインスタンスへのアクセス

マルチリモートブラウザは、各セッションを個別のプロパティとして保持しなくなりました。マルチリモート要素も同様です。1 つのセッションを指定するには、`getInstance` と `select` を使います。

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteBrowser` に `myChromeBrowser: WebdriverIO.Browser` を追加する TypeScript の型拡張は、実行時のプロパティと一致しなくなりました。その型拡張を削除し、`getInstance` を呼び出してください。

テストランナーで `injectGlobals` を有効のままにしている場合、インスタンス名は引き続きグローバルとして使えます(`myChromeBrowser.url(...)`)。このグローバルは単一のセッションであり、`browser.myChromeBrowser` ではありません。

コマンドの結果は capability の順序のままです。最初のエントリは、capabilities オブジェクトの最初のキーに対応します。

マルチリモートブラウザに対する `browser.$$()` は、プレーンな `MultiRemoteElement[]` ではなく `WebdriverIO.MultiRemoteElementArray` を返します。これも配列なので、`elements[0]` のようなインデックスでの読み取りは引き続き動作します。

`WebdriverIO.ElementArray` と同様に、この配列の `map`、`filter`、`forEach`、`find`、`findIndex`、`some`、`every`、`reduce` メソッドは非同期で、`await` した後でも Promise を返します。`custom$$()`、`react$$()`、`shadow$$()` が返すリストも同様です。v9 では、これらはプレーンな配列の同期メソッドでした。

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

`custom$()`、`react$()`、および要素に対する `shadow$()`、`nextElement()`、`previousElement()`、`parentElement()` は、`$()` と同様に `WebdriverIO.MultiRemoteElement` を 1 つ返します。v9 では、インスタンスごとに 1 つの要素をプレーンな配列で返していました。特定のブラウザの要素を読み取るには、`getInstance` を使ってください。

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

`custom$$()`、`react$$()`、および要素に対する `shadow$$()` は、`$$()` と同様に `WebdriverIO.MultiRemoteElementArray` を 1 つ返します。v9 では、インスタンスごとに 1 つのリストをプレーンな配列で返していました。各エントリはすべてのインスタンスを対象にします。見つかった要素が少ないインスタンスには、そのインデックスの要素がありません。

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteElement['selector']` は、`WebdriverIO.Element['selector']` と同様に `Selector` 型になりました。v9 では `string` 型でしたが、実際の値は関数やカスタムストラテジーの参照になることもありました。`element.selector.includes('…')` のように文字列として使っている TypeScript コードでは、先に型をチェックする必要があります。

`WDIO_ENABLE_MULTI_REMOTE_SELECT` と `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY` は削除されました。`select()` は常に使用でき、`$$()` は常に上記の要素配列を返します。両方の変数を削除してください。

## バイナリのモックレスポンス

`mock.respond()` と `mock.respondOnce()` は、`Uint8Array` と `ArrayBuffer` のペイロードを受け付けます。グローバルの `Buffer` がないコンポーネントテストでは、polyfill された `Buffer` も受け付けます。

`mock.getBinaryResponse()` の型は `Uint8Array | null` になりました。Node.js では引き続き `Buffer` を返しますが、ブラウザでは `Uint8Array` を返します。Node.js で Buffer 固有のメソッドを使うには、null でない結果を先に変換してください。

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## マルチリモートのネットワークモック

マルチリモートブラウザに対する `browser.mock()` は、モックの配列ではなく `WebdriverIO.MultiRemoteMock` を返します。`respond`、`restore` などのモックメソッドは、すべてのインスタンスで実行されます。キャプチャしたリクエストは、ブラウザごとのモックから読み取ってください。型には、グローバルの `WebdriverIO` 名前空間にある `WebdriverIO.MultiRemoteMock` を使います。

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

`getInstance` に `instances` に含まれない名前を渡すと、`Multi-remote object has no instance named "<name>"` がスローされます。`browser.select('myFirefoxBrowser', 'myChromeBrowser')` から作成したモックは、インスタンスをその順序で列挙します。この順序は `browser.instances` とは異なる場合があります。`mocks[0]` が特定のブラウザだと決めつけないでください。

## バックエンドを経由しないモックレスポンス

`mock.respond(..., { fetchResponse: false })` はバックエンドを呼び出しません。v9 では、`statusCode` や `responseHeaders` でもフィルターするモックは、そのフィルターを無視して、マッチするすべてのリクエストに応答していました。v10 では、`respond()` と `respondOnce()` がエラーをスローします。これらのフィルターは、バックエンドのレスポンスがなければ判定できないためです。

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

フィルターを維持したい場合は、`fetchResponse` を省略してください。そうすると、モックはレスポンスを取得し、ステータスやヘッダーをチェックしてから、ボディを置き換えます。

## 要素参照

要素 ID には、W3C WebDriver のキー `element-6066-11e4-a52e-4f735466cecf` と `elementId` プロパティを使います。JSON Wire Protocol のフィールド `ELEMENT` は、要素の仕様に含まれなくなりました。

`WebdriverIO.Element` は `ELEMENT` を宣言しなくなりました。要素インスタンスがすでに公開している `element.elementId` を読み取ってください。

`browser.execute` と、要素をページに渡す組み込みスクリプト(`getHTML`、`isClickable`、`isDisplayed`、`scrollIntoView` など)は、W3C の参照のみを渡します。

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

`{ ELEMENT: '...' }` だけを含む find-element のレスポンスボディは、要素として扱われません。W3C のキーを含めてください。両方のキーがある場合、WebdriverIO は W3C の ID を使います。

Jasmine は、チェーンした `$()` の結果を `toJSON` を通じて出力します。その値は同じ W3C の参照 `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }` です。

WebDriver BiDi では、`NodeList`(例: `querySelectorAll` の結果)や `HTMLCollection`(例: `element.children`)を返すスクリプトは、WebDriver Classic と同様に要素参照のリストを返すようになりました。v9 では生の BiDi の値を返していたため、`browser.execute` は要素ではないオブジェクトを返し、`querySelectorAll(...)` を返す `custom$` や `custom$$` のストラテジーは要素を見つけられませんでした。`Array.from(document.querySelectorAll(...))` のような回避策は引き続き動作しますが、削除してもかまいません。

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## React セレクター

`react$` と `react$$` は、`createRoot` と `ReactDOM.render` のどちらで起動するアプリでも、React 16 から 19 で動作するようになりました。以前は、`browser.react$` と `browser.react$$` は React 18 以降で失敗していました(`Could not find the root element of your application`)。また、どのバージョンでも、最後の更新より前のレンダリング結果が返されることがあり、状態の変更によって追加されたコンポーネントが見つかりませんでした。

React がまだルートをレンダリングしていないページでは、コマンドは失敗する前に最大 5 秒間待機するようになりました。以前はすぐに失敗していたため、起動が遅いアプリは見つかりませんでした。

これらのコマンドは [resq](https://github.com/baruchvlz/resq) ライブラリを使わなくなり、WebdriverIO もこのライブラリをインストールしなくなりました。セレクターのルールは変わりませんが([React セレクター](/docs/selectors#react-selectors) を参照)、次の例外があります。

- `props` と `state` の両方を指定した `react$` は、両方にマッチするコンポーネントを見つけます。以前は、`state` も指定すると `props` が無視されていました。
- `react$$` は各 DOM ノードを 1 回だけ返します。以前は、一部のブラウザで高階コンポーネントとその子が同じ要素を 2 回返していました。
- フラグメントを含むフラグメントは、ノードのフラットなリストを 1 つ返します。以前は、`react$` がリストを返すことがありました。
- 値が `null` のフィルターが動作するようになりました。以前は `Cannot convert undefined or null to object` で失敗していました。
- 要素のスコープがない場合、コマンドはページ上のすべての React ルートをドキュメント順に検索します。他のルートの中にあるルートや、オープンな shadow root 内のルートも対象です。`react$` は最初のマッチを返します。以前は最初のルートだけを検索していました。そのルートが React によってまだレンダリングされていなかったりアンマウントされていたりしても同様で、shadow root は検索していませんでした。ルートが複数あるページでは、`react$$` が返す要素が増える可能性があります。1 つのルートだけを検索するには、そのコンテナに対してコマンドを呼び出してください(例: `$('#root').react$$('MyComponent')`)。
- 別のルートの中にあるルートのコンテナに対して呼び出すと、コマンドは内側のルートを検索します。以前は外側のルートを検索していました。
- フレームのブラウジングコンテキスト、およびフレーム内の要素に対してもコマンドが動作するようになりました。以前は、コンテキストのコマンドは `this.executeScript is not a function` で、要素のコマンドは `Could not find instance of React in given element` で失敗していました。

内部スクリプト `webdriverio/scripts/resq` は削除されました。

## コンポーネントテスト

`@wdio/browser-runner` は、`@vitest/spy` 5(以前は 3)の `fn`、`spyOn`、モックの型を再エクスポートします。コードから `new` で呼び出されるモックには、`function` または `class` の実装が必要です。アロー関数を使うと `is not a constructor` がスローされ、`mockReturnValue` を使ったモックは `new` で呼び出されたときにエラーをスローします。

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

スパイに関するその他の変更については、[Vitest の移行ガイド](https://vitest.dev/guide/migration) を参照してください。

## Puppeteer

`webdriverio` は、Puppeteer 25 を含む `puppeteer-core` `>=24 <26` を受け付けます。`getPuppeteer()` と `@wdio/lighthouse-service` は、この範囲のバージョンでテストされています。

## ESLint

`eslint-plugin-wdio` には ESLint 10 が必要です。ESLint 9 は 2026-08-06 に [サポート終了](https://eslint.org/version-support/) を迎えたため、サポート対象外になりました。TypeScript を使う場合は、`typescript-eslint` 8.56.0 以降を使ってください。

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

`eslint-plugin-wdio` がエクスポートするのは、flat config の `flat/recommended` のみです。eslintrc 形式の名前 `plugin:wdio/recommended` は削除されました。

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

`typescript-eslint` パッケージがインストールされている場合、推奨設定は `wdio/await-expect` の代わりに、型情報を使う `wdio/no-floating-promise` ルールを使用します。`@typescript-eslint/eslint-plugin` をインストールするだけでは不十分です。

```sh
npm install --save-dev typescript typescript-eslint
```

このモードでは、設定にマッチするすべてのファイルが TypeScript の project service で解析されます。対象を TypeScript ファイルに限定し、それらのファイルが `tsconfig.json` に含まれていることを確認してください。

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

`wdio.conf.js` のように、マッチしたものの TypeScript プロジェクトに含まれていない JavaScript ファイルは、"was not found by the project service" で失敗します。JavaScript ファイルも lint するには、`"allowJs": true` を設定し、それらのファイルを `tsconfig.json` の `include` に追加したうえで、パターンを `**/*.{js,mjs,cjs,ts,mts,cts,tsx}` に広げてください。

## カスタムフレームワーク

カスタムフレームワークアダプターの `setupExpect` は、マッチャーの `Map` を受け付けなくなりました。また、ランナーはマッチャーオブジェクトに `entries` メソッドを追加しなくなりました。`Object.entries(wdioMatchers)` で反復処理してください。

## Firefox プロファイル

`@wdio/firefox-profile-service` は、`legacy` をサービスオプションとして扱わなくなりました。このフラグは Firefox 55 以前でのみ有効でした。削除してください。`legacy: true` が残っていると、`legacy` という名前の設定項目としてプロファイルに書き込まれます。

## WebDriver プロトコル

すべてのセッションは [W3C WebDriver](https://w3c.github.io/webdriver/) セッションです。WebdriverIO は JSON Wire Protocol や Mobile JSON Wire Protocol を扱いません。それらのコマンドは v9 で削除されました。v10 では、これらのプロトコルで使われていたレスポンスの形式も扱わなくなったため、その形式を返すサーバーではセッションを開始できません。

`browser.isW3C` は削除されました。ワーカーの `sessionStarted` メッセージで転送されていた値も削除されています。`attach` に `isW3C` を渡しても無視されます。BiDi のコマンドセットはクライアントに残っています。BiDi の接続には、引き続き `webSocketUrl` が必要です。

### BiDi での `browser.back()` と `browser.forward()`

呼び出し方は `await browser.back()` と `await browser.forward()` のままです。どちらのコマンドも引数を取らず、値も返しません。

BiDi セッションでは、これらのコマンドはトップレベルのブラウジングコンテキストに対して、`delta` を `-1` または `1` にして `browsingContext.traverseHistory` を呼び出し、`pageLoadStrategy` に対応するドキュメントの準備状態まで待機します。`none` の場合は、トラバーサルコマンドが受け付けられた時点で戻ります。`eager` の場合は `browsingContext.domContentLoaded` を待ちます。デフォルトの `normal` の場合は `browsingContext.load` を待ちます。back-forward キャッシュから復元された場合はこれらのイベントが発生しないため、確定したドキュメントの `readyState` がすでにストラテジーに一致していれば、コマンドは戻ります。待機にはセッションのページロードタイムアウト(`timeouts.pageLoad`。未設定の場合は 300000 ms)が使われます。Classic セッションでは、引き続き `POST /session/:sessionId/back` と `POST /session/:sessionId/forward` に送信します。

履歴エントリがない場合は、引き続き reject されます。BiDi では、エラーメッセージは Classic WebDriver のエラーテキストではなく `browsingContext.traverseHistory` から返され、`no such history entry` を含みます。期待した準備状態に到達しないトラバーサルは、`History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` または `browsingContext.load` で reject されます。

### New Session のレスポンス

Create Session は W3C のボディを返す必要があります。WebdriverIO は `value.sessionId` と `value.capabilities` を読み取ります。

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

JSON Wire Protocol のボディは拒否されます。このボディでは、`sessionId` と `status` が `value` と同じ階層にあり、capabilities が `value` そのものに入っています。

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

この場合、セッションの作成時に `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` がスローされます。`value.sessionId` があっても、`value.capabilities` がなければ同じエラーになります。

設定内のフラットな capability オブジェクトは引き続き有効です。WebdriverIO は、リクエストを送信する前に `{ browserName: 'chrome' }` を `alwaysMatch` でラップします。ベンダープレフィックス付きのキーと、W3C の capability セットに含まれないキーを混在させると、引き続き拒否されます。ベンダー固有の設定は、`sauce:options`、`bstack:options`、`appium:options`、またはその他のプレフィックス付きキーに入れてください。

### コマンドのレスポンス

コマンドの結果は `{ "value": … }` です。HTTP 200 で `value` に `error` がなければ成功です。要素が見つからない場合は、HTTP 404 で `value.error` が `"no such element"` になります。これにより、引き続き要素の遅延検索が可能です。ボディ上の数値の `status` は無視されます。`status: 0` や、古い `status: 7`("no such element")コードも同様です。代わりに W3C のエラーオブジェクトを送信してください。

エクスポートされているエラー型 `JSONWPCommandError` は、`SessionRequestError` になりました。

### サーバー

WebdriverIO が接続するドライバーは、クライアント接続ですでに W3C を使用しています。

- ChromeDriver は、Chrome 75 以降デフォルトで W3C です。Chromium ベースの Edge も同様です。現在の ChromeDriver は `goog:chromeOptions.w3c: false` を引き続き受け付け、そのセッションだけをレガシープロトコルに戻します。WebdriverIO はこの切り替えをサポートしていません。
- geckodriver と Apple の safaridriver は W3C のみに対応しています。`platformName` や `browserVersion` を省略した Safari のレスポンスも W3C です。
- Selenium 4 と Grid 4 は W3C を使用します。Grid は 4.9 で JSON Wire Protocol の変換を終了しました。
- Appium 2 では JSON Wire Protocol と Mobile JSON Wire Protocol が削除されました。Appium 3 では、残っていた古いパラメーター形式も削除されました。v10 には Appium 3 が必要です(後述)。`setWindowRect` を省略したモバイルセッションも W3C です。この capability は、デバイスがウィンドウのサイズを変更できないことを示します。

次のサーバーは引き続き JSON Wire Protocol を使用しており、サポートされていません。Selenium 3、PhantomJS、EdgeHTML(`--jwp`)、直接接続した WinAppDriver です。Appium の Windows ドライバーは、W3C クライアントとして引き続きサポートされます。このドライバーはコマンドを WinAppDriver 向けに変換し、Get Element Property も attribute エンドポイントに変換します。WebdriverIO の接続先は、WinAppDriver のポートではなく Appium にしてください。

[`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) を使っても、これらのサーバーを v10 で動作させることはできません。セッションの起動には引き続き上記の W3C ボディが必要で、コマンドの結果でも数値の `status` は無視されます。そのサーバーがまだ必要な場合は、WebdriverIO 9 を使い続けてください。

`webdriver.remote.sessionid` は、Selenium スタンドアロンセッションの目印として使われなくなりました。Selenium Grid 4 は、引き続き `se:cdp` から検出されます。

`page load` タイムアウトキーについては [`setTimeout`](#settimeout) で説明しています。要素 ID については [要素参照](#element-references) で説明しています。デスクトップでは、`[name="..."]` は CSS セレクターです。`name` ロケーターストラテジーは、モバイルセッション用に残っています。

## Appium

WebdriverIO 10 には **Appium 3** と、最新の公式ドライバー(UiAutomator2、XCUITest、Espresso、Windows、Mac2 など)が必要です。Appium 1.x と 2.x はサポートされません。サーバーをアップグレードできない場合は、WebdriverIO 9 を使い続けてください。

```sh
npm i -D appium@^3
appium driver update installed
```

`@wdio/appium-service` は、`>=3` のオプションの `appium` ピア依存関係を宣言しており、古いサーバーの起動を拒否します。`create-wdio` は、Appium がない場合や 3 より古い場合に `appium@^3` をインストールします。

クラウドベンダーがまだ Appium 2 しか提供していない場合は、Appium 3 のイメージを使うか、WebdriverIO 9 を使い続ける必要があります。

### モバイルコマンドは HTTP にフォールバックしなくなりました

v9 では、多くのモバイルヘルパーが `browser.execute('mobile: …')` を試し、未知のメソッドのエラーが出ると、削除された Appium の HTTP エンドポイントにフォールバックしていました。v10 ではこのフォールバックはなくなり、同じエラーで Appium 3 へのアップグレードを促すメッセージが表示されます。WebdriverIO のモバイルコマンド(`browser.lock()`、`browser.shake()` など)を使うか、`browser.execute('mobile: …')` を直接使ってください。

### 削除されたプロトコルコマンド

Appium 3 では、[非推奨だった多くのベースドライバーのエンドポイントが削除されました](https://appium.io/docs/en/latest/guides/migrating-2-to-3/)。WebdriverIO は、それらのルートの大半に対応するクライアントメソッド(例: `appiumLock`、`touchPerform`、Mobile JSON Wire Protocol のマップ)を公開しなくなりました。代わりに、W3C Actions、対応するモバイルコマンド、またはドライバーの `mobile:` execute メソッドを使ってください。

### Appium の `--allow-insecure` のスコープ

Appium 3 では、`--allow-insecure` の機能にドライバー名または `*` のスコーププレフィックスが必要です。例: `uiautomator2:adb_shell` や `*:adb_shell`。

### プレフィックスのない Appium capability では Appium セッションが選択されなくなりました

`appium:` プレフィックスのない `automationName`、`deviceName`、`appiumVersion` を指定しても、WebdriverIO がブラウザドライバーをスキップして Appium サービスを使うことはなくなりました。プレフィックス付きの capability を使うか、`appium:options` の下にネストしてください。

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

`wdio repl` は、`appium:app`、`appium:platformVersion`、`appium:udid` を含め、プレフィックス付きのキーを出力するようになりました。

### モバイルでの `getValue` は要素のプロパティを読み取ります

`element.getValue()` は、Appium 3 を含むすべてのセッションで Get Element Property を呼び出します。以前は、モバイルセッションでは Get Element Attribute を呼び出していました。

### `stopRecordingScreen` のシグネチャを `startRecordingScreen` に統一

`driver.stopRecordingScreen` は、以前の 4 つの引数ではなく、`options` 引数 1 つだけを受け付けるようになりました。これは `driver.startRecordingScreen` に合わせた変更です。個々の引数をオブジェクトにまとめてください。

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## マルチリモートの命名

`multiremote` または `Multiremote` と表記されていた API は、キャメルケース / パスカルケースの `multiRemote` / `MultiRemote` になりました。古い名前にはエイリアスがありません。

| v9 | v10 |
|----|-----|
| `multiremote()` (`webdriverio`) | `multiRemote()` |
| `WebdriverIO.MultiremoteConfig` | `WebdriverIO.MultiRemoteConfig` |
| ブラウザ、`$` および `$$` の結果の `isMultiremote` | `isMultiRemote` |
| `Capabilities.RequestedMultiremoteCapabilities` | `Capabilities.RequestedMultiRemoteCapabilities` |
| `Capabilities.WithRequestedMultiremoteCapabilities` | `Capabilities.WithRequestedMultiRemoteCapabilities` |
| `runner.isMultiremote`(レポーター) | `runner.isMultiRemote` |
| `Launcher#isMultiremote`、`Launcher#isParallelMultiremote`(`@wdio/cli`) | `isMultiRemote`、`isParallelMultiRemote` |
| `Workers.WorkerMessage`、`WorkerInstance`(`@wdio/local-runner`)、`SpecReporter#getTestLink()` の `isMultiremote` | `isMultiRemote` |
| `browser.multiremoteFetch()`(`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

`multiremote` と `Multiremote` を(大文字と小文字を区別して)検索し、すべてのマッチを置き換えてください。Allure レポートでも、マルチリモートのテストのラベルは `isMultiremote` ではなく `isMultiRemote` になります。

## Linux の仮想ディスプレイ

`@wdio/xvfb` は `@wdio/display-server` に置き換えられました。各ワーカーを `xvfb-run` でラップする代わりに、テストランナーは、どのサービスの `onPrepare` フックよりも前に、実行全体で 1 つのディスプレイサーバーを起動します。ヘッドレスモードの Weston が優先され、使えない場合は Xvfb にフォールバックします。詳しくは [ヘッドレスとディスプレイサーバー](/docs/headless-and-display-servers) を参照してください。

オプション名が変更されました。古い名前も v10 では引き続き動作しますが、非推奨の警告がログに出力され、v11 で削除されます。両方の名前を設定した場合は、新しい名前が優先されます。

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

`xvfbMaxRetries` と `xvfbRetryDelay` は効果がなく、これらも v11 で削除されます。起動のリトライは行われなくなりました。Weston の起動に失敗するとテストランナーは Xvfb を試し、どちらも起動しなければ、ディスプレイなしで実行を続けます。

名前が変更された 4 つのオプションのいずれかを、新しい名前を設定せずに使用していて、かつ `displayServer` も設定していない場合は、v9 と同様に Xvfb が使われます。ディスプレイサーバーを無効にしていない限り、`Preferring Xvfb, as v9 did, because the config sets v9 display keys` というログも出力されます。オプション名を変更した後、Xvfb を使い続けるには `displayServer: 'xvfb'` を追加してください。Weston を優先する場合は、何も追加しないでください。自動モードでは、カスタムのインストールコマンドはまず Weston のために実行されます。Weston がまだ使えないか起動に失敗し、かつ Xvfb もない場合にのみ、Xvfb のために再度実行されます。もう一方のサーバーの試行を省くには、`displayServer` にそのコマンドでインストールされるサーバーを設定してください。

自動インストールは `yum` をサポートしなくなりました。v9 では、`dnf` のないホストで `yum` を使っていました。v10 が検出するのは `apt-get`、`dnf`、`zypper`、`pacman`、`apk`、`xbps-install` のみです。`yum` しかないホストでは、Xvfb を手動でインストールしてください。

v9 では `xvfbAutoInstallCommand` の配列がシェル経由で実行されていたため、`&&` や `VAR=value` のような要素も動作していました。現在は、どちらのオプション名でも配列はシェルを介さずに実行されます。シェル構文を使う場合は文字列を使ってください。

その他に気づく可能性のある変更は次のとおりです。

- すべてのワーカーが 1 つのディスプレイを共有します。v9 では、ワーカーごとに専用のディスプレイがありました。そのため、Chrome と Edge のページがフォーカスを失うことがあります。[ウィンドウフォーカス](/docs/headless-and-display-servers#window-focus) を参照してください。
- Xvfb のディスプレイ番号は固定されていません。`:99` を前提にせず、`DISPLAY` から読み取ってください。
- `WAYLAND_DISPLAY` だけが設定されているホストも、ディスプレイがあるものとして扱われるようになりました。v9 では、`DISPLAY` が未設定だったため、そのようなホストでもワーカーを Xvfb で実行していました。v10 では何も起動せず、ブラウザウィンドウをコンポジター上に開き、実行中は `XDG_SESSION_TYPE`、`GDK_BACKEND`、`ELECTRON_OZONE_PLATFORM_HINT` を `wayland` に設定します。以前と同様に Xvfb で実行するには、`WAYLAND_DISPLAY` の設定を解除し、`displayServer: 'xvfb'` を設定してください。
- デフォルトの画面サイズは 1920x1080 です。v9 では `xvfb-run` のデフォルトが使われていました。これは Debian と Ubuntu では 1280x1024、Fedora、RHEL、Arch では 640x480 です。ベースライン画像のサイズを維持するには、`displayServerWidth` と `displayServerHeight` をそのサイズに設定してください。
- ブラウザは、ディスプレイサーバーが設定する `XDG_SESSION_TYPE` に基づいて Wayland か X11 かを選びます。Weston で実行する場合、WebdriverIO は起動する Chrome と Edge に `--ozone-platform=wayland` も追加します。Chrome と Edge の 140 より前のバージョン(Chrome for Testing では 135 より前)は `XDG_SESSION_TYPE` を無視するためです。Weston は `DISPLAY` を提供しないため、テストやツールで X11 が必要な場合は、`displayServer: 'xvfb'` を設定してください。
- `@wdio/xvfb` の `XvfbManager` や `xvfb` インスタンスを直接使っていた場合は、代わりに `@wdio/display-server` の `DisplayServerManager` を使ってください。`xvfb.init()` を実行してコマンドを `xvfb-run` でラップしていた箇所や、`ProcessFactory` でプロセスを起動していた箇所では、ディスプレイを起動し、その環境変数を必要なプロセスに渡してください。次の例では、v9 の Debian や Ubuntu と同じく、1280x1024 の Xvfb を使っています。`WAYLAND_DISPLAY` だけが設定されているホストでは、先にその設定を解除してください。そうしないと、`startDaemon()` は何も起動しません。

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // ディスプレイがすでに存在する場合も、startDaemon() は null を返す
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

`browser.emulate()` は、現在のトップレベルのブラウジングコンテキストに対して、WebDriver BiDi の emulation モジュールを使います。v9 では、`navigator.geolocation.getCurrentPosition`、`navigator.userAgent`、`window.matchMedia`、`navigator.onLine` にパッチを当てるプリロードスクリプトを注入していました。これらのスクリプトは廃止されました。`browser.emulate('clock', …)` は、引き続き現在のページとその後に開かれるページにフェイクタイマーをインストールします。

BiDi のスコープでは、リロードが不要になりました。

```diff
  await browser.emulate('onLine', false)
- // `navigator.onLine` だけが変わり、通信は引き続き行われていた
+ // fetch、WebSocket、WebTransport を含め、ブラウジングコンテキストがオフラインになる
```

- `onLine: false` は、`{ type: 'offline' }` を指定して `emulation.setNetworkConditions` を呼び出します。`true` を指定するか、スコープを復元すると解除されます。スループットとレイテンシーは、引き続き `browser.throttleNetwork()` で設定します。
- `colorScheme` は `prefers-color-scheme` メディア機能を設定します。そのため、CSS の `@media (prefers-color-scheme)` も `matchMedia` と同じ結果になります。
- `userAgent` は、`navigator.userAgent` プロパティへのパッチではなく、ブラウザのユーザーエージェントのオーバーライドです。
- `geolocation` は、ブラウザの位置情報の仕組みを使います。ページによっては、引き続き `browser.setPermissions({ name: 'geolocation' }, 'granted')` が必要です。`{ error: 'positionUnavailable' }` を指定すると、座標の代わりにそのエラーが報告されます。
- `colorScheme` と `media` は、1 つのメディア機能マップを共有します。後の呼び出しでマップ全体が置き換えられ、どちらかのスコープを復元するとマップがクリアされます。
- `device` は、デバイス記述子に基づいて、ユーザーエージェント、ビューポート、タッチ、モバイル向けテキストレイアウト、viewport meta を設定します。`screen` と `orientation` は変更しません。

新しいスコープは、`media`、`locale`、`timezone`、`touch`、`orientation`、`screen`、`viewportMeta`、`textLayout`、`scripting`、`scrollbar`、`forcedColors` です。コマンドを実装していないブラウザは、独自のエラー(`unknown command` または `unsupported operation`)で呼び出しを拒否します。WebdriverIO は、プリロードスクリプトや CDP にはフォールバックしません。`device` が途中で拒否された場合は、以前のユーザーエージェント、ビューポート、タッチ、テキストレイアウト、viewport meta が元に戻されます。

`wdio session emulate` も同じスコープを受け付けます。すぐに適用されるオーバーライドについて、リロードを促すメッセージは表示されなくなりました。`emulate network` のプリセットと `emulate cpu` は変わっておらず、引き続き Chromium でのみ利用できます。[エミュレーション](/docs/emulation) を参照してください。

## 次のステップ

- [移行スキル](#migrate-with-a-coding-agent) をプロジェクトにコピーし、エージェントに適用を依頼する。
- 新しい v10 のテストを書く場合は、[コーディングエージェント向けの WebdriverIO](/docs/ai-agents) を参照する。
- スイートを Linux で実行する場合は、[ヘッドレスとディスプレイサーバー](/docs/headless-and-display-servers) を参照する。